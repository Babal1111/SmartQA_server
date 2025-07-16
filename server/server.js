require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const roomRoutes = require('./src/routes/roomRoutes');
const http = require('http');
const {Server} = require('socket.io');

app.use(express.json());

const CorsOptions= {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(cors(CorsOptions));
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('Connected to db')).catch((error)=> console.log(error));

const server = http.createServer(app); //createserver is a handles function, app here acts as a handler
// app , instance of express here will take care of the incomin req
const io = new Server(server,{
    cors:{
        origin: process.env.CLIENT_URL,
        methods:["GET","POST","DELETE","PUT"]
    }
})

io.on("connection",(socket)=>{  // on connection event // and we recieve a socket object with http protocols,ids etc
    console.log("New Client Connection :",socket.id);

    socket.on("join-room",(roomCode)=>{ //ie when we recieve a event "join-room" well execute this
        socket.join(roomCode);
        console.log("Client Joined Room :",roomCode);
    }) 
    // it will  create a space, clients with same roomcode will be placed in the same pool(like an array of same data typre) and then if one sends msg all will get it

    socket.on("disconnect",()=>{
        console.log("Client Disconnected", socket.id);
        // here we can add other features like, LAST SEEN(time of disconnect)
    })

    // these evens like join-room and disconnects will be emited by Client side
}) 

app.set("io",io); // by thi our server will be able to send all the connected clients, the msg on every new question

app.use('/room',roomRoutes);

const port = process.env.PORT;
server.listen(port,(error)=>{ 
    if(error) console.log(error);
    else console.log(`server is running at ${port}`);
})