const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connecté'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

app.use('/user', userRoutes);

// 👉 Lancement du serveur ici :
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Auth-service lancé sur http://localhost:${PORT}`);
});
