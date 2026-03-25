import express from 'express';
import { 
    getMovies, 
    getMovie, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} from '../controllers/movie.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Routes publiques (Tout le monde peut voir les films)
router.get('/', getMovies);
router.get('/:id', getMovie);

// Routes admin (Seul un admin connecté peut modifier le catalogue)
router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

export default router;