import express from "express";
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import productRouter from "../api/routers/products/product.router.js";
import cartRouter from "../api/routers/carts/cart.router.js";
import viewRouter from "../api/routers/main/view.router.js";
import chatRouter from "../api/routers/chat/chat.router.js"
import chatManager from "../api/controllers/dao/ChatManager.js";

const app = express();
const chat = new chatManager();

/**
* Set the templates engine
*/
app.engine('handlebars', handlebars.engine());
app.set('views', './api/routers/views');
app.set('view engine', 'handlebars');

/**
* Middleware for parse to JSON 
*/
app.use(express.json())

/**
* Set the static folder
*/
app.use('/content', express.static('./public'));

// API ROUTES
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);

// VIEW ROUTER
app.use('/', viewRouter);

/**
* Establish database connection
*/
let serverHttp;

try {
    await mongoose.connect('mongodb+srv://gonzaS:Gyr$$2310@cluster0.frrn8pq.mongodb.net/ecommerce')
    serverHttp = app.listen(8080, () => console.log(`Running server`));                                                      
} catch(err) {
    console.log(err)
}

/**
* Establish websocket 
*/
const io = new Server(serverHttp);  

app.set('socketio', io);

io.on('connection', socket => {
    console.log("Client connected");
    socket.on('productList', data => {
        io.emit('updateProducts', data);
    });
    socket.on('messages', data => {
        io.emit('logs', data);
    })
})
