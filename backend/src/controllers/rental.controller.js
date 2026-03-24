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
            return res.status(404).json({ message: "Utilisateur introuvable !" });
        }

        const existingMovie = await Movie.findById(movie);
        if (!existingMovie) {
            return res.status(404).json({ message: "Film introuvable !" });
        }

        if (!existingMovie.isAvailable) {
            return res.status(400).json({ message: "Ce film n'est pas disponible à la location !" });
        }

        const activeRental = await Rental.findOne({
            user,
            movie,
            status: 'active',
            expiryDate: { $gt: new Date() }
        });

        if (activeRental) {
            return res.status(400).json({ message: "Ce film est deja loue par cet utilisateur !" });
        }

        const rental = await Rental.create({
            user,
            movie,
            price: existingMovie.price
        });

        await existingMovie.incrementRentalCount();

        res.status(201).json({
            success: true,
            message: "Location creee !",
            rental
        });
    } catch {
        res.status(400).json({ message: "Creation de la location impossible !" });
    }
};

// @desc    Obtenir les locations d'un utilisateur
// @route   GET /api/rentals/my-rentals
// @access  Private
export const getMyRentals = async (req, res, next) => {
    try {

    } catch {
        
    }
};

// @desc    Obtenir toutes les locations (admin)
// @route   GET /api/rentals
// @access  Private/Admin
export const getAllRentals = async (req, res, next) => {
    try {

    } catch {
        
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
