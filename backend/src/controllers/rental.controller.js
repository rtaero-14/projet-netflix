import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

// @desc    Louer un film
// @route   POST /api/rentals
// @access  Private
export const createRental = async (req, res, next) => {
    try {
        const { user, movie } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Utilisateur introuvable !" });
        }

        const existingMovie = await Movie.findById(movie);
        if (!existingMovie) {
            return res.status(404).json({ success: false, message: "Film introuvable !" });
        }

        if (!existingMovie.isAvailable) {
            return res.status(400).json({ success: false, message: "Ce film n'est pas disponible à la location !" });
        }

        const activeRental = await Rental.findOne({
            user,
            movie,
            status: 'active',
            expiryDate: { $gt: new Date() }
        });

        if (activeRental) {
            return res.status(400).json({ success: false, message: "Ce film est déjà loué par cet utilisateur !" });
        }

        const rental = await Rental.create({
            user,
            movie,
            price: existingMovie.price
        });

        await existingMovie.incrementRentalCount();

        await rental.populate('movie', 'title poster durationFormatted');

        res.status(201).json({
            success: true,
            message: "Location créée avec succès !",
            rental
        });
    } catch (error) {
        next(error); 
    }
};

// @desc    Obtenir les locations d'un utilisateur
// @route   GET /api/rentals/my-rentals
// @access  Private
export const getMyRentals = async (req, res, next) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Veuillez fournir un userId dans l'URL pour tester (?userId=TON_ID)" 
            });
        }

        const activeRentals = await Rental.getActiveRentals(userId);
        const expiredRentals = await Rental.getExpiredRentals(userId);

        res.status(200).json({
            success: true,
            activeCount: activeRentals.length,
            expiredCount: expiredRentals.length,
            activeRentals,
            expiredRentals
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir toutes les locations (admin)
// @route   GET /api/rentals
// @access  Private/Admin
export const getAllRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find()
            .populate('user', 'name email')
            .populate('movie', 'title price poster')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: rentals.length,
            rentals
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Annuler une location
// @route   DELETE /api/rentals/:id
// @access  Private
export const cancelRental = async (req, res, next) => {
    try {
        // On cherche la location avec l'ID passé dans l'URL
        const rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({ success: false, message: "Location introuvable !" });
        }

        // On vérifie si elle est annulable
        if (rental.status !== 'active') {
            return res.status(400).json({ 
                success: false, 
                message: `Impossible d'annuler cette location car son statut est : ${rental.status}` 
            });
        }

        // "Soft delete" : on change le statut au lieu de détruire la donnée
        rental.status = 'cancelled';
        await rental.save();

        res.status(200).json({
            success: true,
            message: "Location annulée avec succès !",
            rental
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les statistiques des locations
// @route   GET /api/rentals/stats
// @access  Private/Admin
export const getRentalStats = async (req, res, next) => {
    try {
        const totalRentals = await Rental.countDocuments();
        const activeRentals = await Rental.countDocuments({ status: 'active' });
        
        // Calcul du chiffre d'affaires total généré par les locations grâce à l'agrégation MongoDB
        const revenueAggregation = await Rental.aggregate([
            { 
                $group: { 
                    _id: null, 
                    totalRevenue: { $sum: '$price' } 
                } 
            }
        ]);

        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

        res.status(200).json({
            success: true,
            stats: {
                totalRentals,
                activeRentals,
                // Arrondi à 2 décimales
                totalRevenue: Math.round(totalRevenue * 100) / 100 
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir des recommandations personnalisées
// @route   GET /api/rentals/recommendations
// @access  Private
export const getRecommendations = async (req, res, next) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Veuillez fournir un userId dans l'URL pour tester (?userId=TON_ID)" 
            });
        }
        const userRentals = await Rental.find({ user: userId }).populate('movie');

        //Si l'utilisateur n'a aucune location, recommander films plus populaires
        if (!userRentals || userRentals.length === 0) {
            const popularMovies = await Movie.getPopularMovies(5); 
            return res.status(200).json({
                success: true,
                message: "Pas d'historique. Voici les films les plus populaires.",
                recommendations: popularMovies
            });
        }

        const rentedMovieIds = userRentals.map(rental => rental.movie._id);

        //Compter et trier les genres préférés
        const genreCounts = {};
        
        userRentals.forEach(rental => {
            if (rental.movie && rental.movie.genre) {
                rental.movie.genre.forEach(g => {
                    genreCounts[g] = (genreCounts[g] || 0) + 1;
                });
            }
        });

        const topGenres = Object.entries(genreCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)                 
            .map(entry => entry[0]);

        //Recommandations des films de ces genres non loués
        const recommendations = await Movie.find({
            genre: { $in: topGenres },
            _id: { $nin: rentedMovieIds },
            isAvailable: true
        })
        .sort({ rating: -1, rentalCount: -1 })
        .limit(5);

        if (recommendations.length === 0) {
             const popularMovies = await Movie.find({
                 _id: { $nin: rentedMovieIds },
                 isAvailable: true
             }).sort({ rentalCount: -1 }).limit(5);

             return res.status(200).json({
                 success: true,
                 message: "Recommandations basées sur la popularité générale.",
                 recommendations: popularMovies
             });
        }

        res.status(200).json({
            success: true,
            message: `Recommandations basées sur vos genres favoris : ${topGenres.join(', ')}`,
            recommendations
        });

    } catch (error) {
        next(error);
    }
};
