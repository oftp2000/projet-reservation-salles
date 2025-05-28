const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');
const auth = require('../middlewares/verifyToken');

router.post('/reservation', auth, controller.createReservation);
router.get('/reservation/:email', auth, controller.getUserReservations);
router.get('/reservation/salle/:id', auth, controller.getSalleReservations);
router.put('/reservation/:id', auth, controller.updateReservation);
router.delete('/reservation/:id', auth, controller.deleteReservation);

module.exports = router;
