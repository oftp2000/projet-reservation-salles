const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  salleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: String, required: true },
  heureDébut: { type: String, required: true },
  heureFin: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
