const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nom,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(200).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /user/:email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// PUT /user/:email
exports.updateUser = async (req, res) => {
  try {
    const updatedData = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      updatedData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({ message: 'Utilisateur mis à jour', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// DELETE /user/:email
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ email: req.params.email });
    if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

