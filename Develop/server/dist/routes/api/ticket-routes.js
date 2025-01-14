import express from 'express';
import { getAllTickets } from '../../controllers/ticket-controller.js';
const router = express.Router();
// GET /tickets/user/:userId - Get tickets for a specific user
router.get('/user/:userId', getAllTickets);
export { router as ticketRouter };
