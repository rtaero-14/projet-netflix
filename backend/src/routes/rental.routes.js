import express from 'express'
import {
    createRental,
    getMyRentals,
    getAllRentals,
    cancelRental,
    getRentalStats,
    getRecommendations
} from '../controllers/rental.controller.js'

const router = express.Router();

router.get('/', getAllRentals);
router.get('/my-rentals', getMyRentals);
router.get('/stats', getRentalStats);
router.post('/', createRental);
router.delete('/:id', cancelRental);

router.get('/recommendations', getRecommendations);

export default router;
