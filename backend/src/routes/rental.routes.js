import express from 'express';
import { 
    createRental, 
    getMyRentals, 
    getAllRentals, 
    cancelRental, 
    getRentalStats, 
    getRecommendations 
} from '../controllers/rental.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/my-rentals', getMyRentals);
router.get('/recommendations', getRecommendations);

router.post('/', createRental);
router.delete('/:id', cancelRental);
router.get('/', admin, getAllRentals);
router.get('/stats', admin, getRentalStats);

export default router;