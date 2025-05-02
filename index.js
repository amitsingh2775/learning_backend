const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const progressRoutes = require('./routes/progressRoutes');
const ConnectDB=require('./utils/db')

dotenv.config();

const app = express();
app.use(cors({origin:"https://learning-frontend-ebon.vercel.app", credentials: true}));
app.use(express.json());

app.use('/api/progress', progressRoutes);



ConnectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failed', err);
});

