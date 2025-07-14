require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const roomRoutes = require('./src/routes/roomRoutes');

app.use(express.json());

const CorsOptions= {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(cors(CorsOptions));
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('Connected to db')).catch((error)=> console.log(error));
app.use('/room',roomRoutes);

const port = process.env.PORT;
app.listen(port,(error)=>{
    if(error) console.log(error);
    else console.log(`server is running at ${port}`);
})