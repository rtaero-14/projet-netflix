import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validation des champs obligatoire name, email, password
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir un nom, un email et un mot de passe'
            });
        }

        // Validation du mot de passe > 6 caract
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Le mot de passe doit contenir au moins 6 caractères'
            });
        }

        // Vérifier si l'email existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Cet utilisateur existe déjà'
            });
        }

        // Créer l'utilisateur (le hashing est géré par le middleware pre-save du modèle)
        const user = await User.create({
            name,
            email,
            password
        });

        // Générer le token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Inscription réussie',
            token,
            user: user.toJSON()
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Erreur de validation',
                errors: messages
            });
        }
        next(error);
    }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir un email et un mot de passe'
            });
        }

        // Trouver l'utilisateur (inclure le password pour la comparaison)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Identifiants invalides'
            });
        }

        // Vérifier le mot de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Identifiants invalides'
            });
        }

        // Vérifier si le compte est actif
        if (user.status === 'inactive') {
            return res.status(403).json({
                success: false,
                message: 'Votre compte est inactif'
            });
        }

        // Générer le token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            token,
            user: user.toJSON()
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir le profil de l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        // NB : req.user est ajouté par le middleware protect
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mettre à jour le profil
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Profil mis à jour',
            user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Changer le mot de passe
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        if (!(await user.comparePassword(req.body.currentPassword))) {
            return res.status(401).json({
                success: false,
                message: 'Mot de passe actuel incorrect'
            });
        }

        user.password = req.body.newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Mot de passe changé avec succès'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Déconnexion (côté client principalement)
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
    try {
        // Avec JWT, la déconnexion se fait principalement côté client
        res.status(200).json({
            success: true,
            message: 'Déconnexion réussie'
        });
    } catch (error) {
        next(error);
    }
};