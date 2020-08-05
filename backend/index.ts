import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './modules/User/user.routes';
import postRoutes from './modules/Post/post.routes';
import categoryRoutes from './modules/Category/category.routes';

import cors from 'cors';

const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());


// FileUpload
server.app.use(fileUpload({ useTempFiles: true }));

// CORS
server.app.use(cors({ origin: true, credentials: true }));


// Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
server.app.use('/category', categoryRoutes);


// Conectar DB
mongoose.connect('mongodb://localhost/barobranding',
    // mongoose.connect('mongodb+srv://admin:admin@comments-y6qqv.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true }, (err) => {

        if (err) throw err;

        console.log('MongoDB On-Line');
    })

// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});