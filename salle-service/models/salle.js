const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  capacité: { type: Number, required: true },
  equipements: [String],
  statut: { type: String, default: "disponible" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Salle', salleSchema);
