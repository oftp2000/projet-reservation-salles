const express = require('express');
const router = express.Router();
const controller = require('../controllers/SalleController');
const auth = require('../middlewares/verifyToken');

router.get('/salle/:id', auth, controller.getSalleById);
router.post('/salle', auth, controller.createSalle);
router.put('/salle/:id', auth, controller.updateSalle);
router.delete('/salle/:id', auth, controller.deleteSalle);
router.get('/salles/disponibles', auth, controller.getSallesDisponibles);
router.get('/salles/filtrer', auth, controller.filtrerSalles);
router.put('/salle/statut/:id', auth, controller.changeStatut);

module.exports = router;
