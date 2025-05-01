const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const progressRoutes = require('./routes/progressRoutes');
const ConnectDB=require('./utils/db')

dotenv.config();

const app = express();
app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());

app.use('/api/progress', progressRoutes);



 app.listen(process.env.PORT, () => {
      ConnectDB()
      console.log(`Server running on port ${process.env.PORT}`);
 });
