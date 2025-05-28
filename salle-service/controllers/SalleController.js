const Salle = require('../models/salle');

// GET /salle/:id
exports.getSalleById = async (req, res) => {
  try {
    const salle = await Salle.findById(req.params.id);
    if (!salle) return res.status(404).json({ message: "Salle non trouvée" });
    res.status(200).json(salle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /salle
exports.createSalle = async (req, res) => {
  try {
    const salle = await Salle.create(req.body);
    res.status(200).json(salle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /salle/:id
exports.updateSalle = async (req, res) => {
  try {
    const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salle) return res.status(404).json({ message: "Salle non trouvée" });
    res.status(200).json(salle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /salle/:id
exports.deleteSalle = async (req, res) => {
  try {
    const salle = await Salle.findByIdAndDelete(req.params.id);
    if (!salle) return res.status(404).json({ message: "Salle non trouvée" });
    res.status(200).json({ message: "Salle supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /salles/disponibles?date=...
exports.getSallesDisponibles = async (req, res) => {
  try {
    const salles = await Salle.find({ statut: "disponible" });
    res.status(200).json(salles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /salles/filtrer?capacite=...&equipement=...
exports.filtrerSalles = async (req, res) => {
  try {
    const { capacite, equipement } = req.query;
    const query = {
      ...(capacite && { capacité: { $gte: parseInt(capacite) } }),
      ...(equipement && { equipements: { $in: [equipement] } }),
    };
    const salles = await Salle.find(query);
    res.status(200).json(salles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /salle/statut/:id
exports.changeStatut = async (req, res) => {
  try {
    const salle = await Salle.findByIdAndUpdate(req.params.id, { statut: req.body.statut }, { new: true });
    if (!salle) return res.status(404).json({ message: "Salle non trouvée" });
    res.status(200).json(salle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
