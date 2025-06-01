const axios = require('../api/axiosClient');
const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
  try {
    const { email, salleId } = req.body;
    const token = req.headers.authorization;
    const userResponse = await axios.get(`http://localhost:4000/user/${email}`, {
  headers: { Authorization: token }
});
    if (!userResponse.data) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    const salleResponse = await axios.get(`http://localhost:4002/salle/${salleId}`, {
  headers: { Authorization: token }
});
    if (!salleResponse.data) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    const reservation = await Reservation.create(req.body);
    res.status(200).json(reservation);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: err.response.data.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET /reservation/:email
exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ email: req.params.email });
    if (!reservations.length) return res.status(404).json({ message: "Aucune réservation" });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /reservation/salle/:id
exports.getSalleReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ salleId: req.params.id });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /reservation/:id
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /reservation/:id
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
    res.status(200).json({ message: "Réservation annulée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
