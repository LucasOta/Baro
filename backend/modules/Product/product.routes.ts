import { Router, Response } from 'express';
import { verifyToken } from '../../middlewares/authentication';
import { Product } from './product.model';
import { FileUpload } from '../../interfaces/file-upload';
import FileSystem from '../../classes/file-system';



const productRoutes = Router();
const fileSystem = new FileSystem();

// Obtener POST paginados
// productRoutes.get('/', async (req: any, res: Response) => {

//     let pagina = Number(req.query.pagina) || 1;
//     let skip = pagina - 1;
//     skip = skip * 10;

//     const posts = await Post.find()
//         .sort({ _id: -1 })
//         .skip(skip)
//         .limit(10)
//         .populate('user', '-password')
//         .exec();


//     res.json({
//         ok: true,
//         pagina,
//         posts
//     });


// });

// Crear PRODUCT
productRoutes.post('/create', [verifyToken], (req: any, res: Response) => {

    // const imagenes = fileSystem.filesFromTempToFolder(req.user._id);

    const product = {
        name: req.body.name,
        description: req.body.description,
        user: req.user._id, //mmm, a esto no le tengo fe
        // imgs: imagenes //a esto tampoco
    };

    Product
        .create(product)
        .then(async productDB => {
            await productDB.populate('user', '-password').execPopulate()

            res.json({ ok: true, product: productDB });
        })
        .catch(err => res.json({ ok: false, err }));

});


//Falta todo estoooo de abajo

// Servicio para subir archivos
// productRoutes.post('/upload', [verifyToken], async (req: any, res: Response) => {

//     if (!req.files) {
//         return res.status(400).json({
//             ok: false,
//             desc: 'No se subió ningun archivo'
//         });
//     }

//     const file: FileUpload = req.files.image;

//     if (!file) {
//         return res.status(400).json({
//             ok: false,
//             desc: 'No se subió ningun archivo - image'
//         });
//     }

//     if (!file.mimetype.includes('image')) {
//         return res.status(400).json({
//             ok: false,
//             desc: 'Lo que subió no es una imagen'
//         });
//     }

//     await fileSystem.saveTempImage(file, req.user._id);

//     res.json({
//         ok: true,
//         file: file.mimetype
//     });

// });



// productRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

//     const userId = req.params.userid;
//     const img = req.params.img;

//     const pathFoto = fileSystem.getFileUrl(userId, img);

//     res.sendFile(pathFoto);

// });




export default productRoutes;