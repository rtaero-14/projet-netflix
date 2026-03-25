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

    } catch {
        
    }
};

// @desc    Obtenir les statistiques des locations
// @route   GET /api/rentals/stats
// @access  Private/Admin
export const getRentalStats = async (req, res, next) => {
    try {

    } catch {
        
    }
};
