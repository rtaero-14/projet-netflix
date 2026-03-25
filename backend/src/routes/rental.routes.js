import express from 'express';
import { 
    rentMovie, 
    getMyRentals, 
    getAllRentals 
} from '../controllers/rental.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/my', getMyRentals);
router.post('/', rentMovie);

router.get('/all', admin, getAllRentals);

export default router;