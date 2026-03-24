import express from 'express'
import {
    createRental,
    getMyRentals,
    getAllRentals,
    cancelRental,
    getRentalStats,
    getRecommendations
} from '../controllers/rental.controller'

const router = express.Router();

routes.get('/', getAllRentals);
routes.get('/my-rentals', getMyRentals);
routes.get('/stats', getRentalStats);
routes.post('/', createRental);
routes.delete('/:id', cancelRental)