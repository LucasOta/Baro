import { Router, Response } from 'express';
import { verifyToken } from '../../middlewares/authentication';
import { Post } from './post.model';
import { FileUpload } from '../../interfaces/file-upload';
import FileSystem from '../../classes/file-system';
import Methods from '../../classes/methods';


const postRoutes = Router();
const fileSystem = new FileSystem();

// Obtener POST paginados
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('user', '-password')
        .exec()
        .catch(err => res.json({ ok: false, err }));;

    res.json({
        ok: true,
        pagina,
        posts
    });

});

// Crear POST
postRoutes.post('/', [verifyToken], (req: any, res: Response) => {

    const body = req.body;
    body.user = req.user._id;

    // const imagenes = fileSystem.filesFromTempToFolder(req.user._id, 'posts', PostId);
    // body.imgs = imagenes;


    Post
        .create(body)
        .then(async postDB => {

            await postDB.populate('user', '-password').execPopulate();

            res.json({ ok: true, post: postDB });

        })
        .catch(err => res.json({ ok: false, err }));

});


// Servicio para subir archivos
postRoutes.post('/upload', [verifyToken], async (req: any, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            desc: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            desc: 'No se subió ningun archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            desc: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.saveTempImage(file, req.user._id);

    res.json({
        ok: true,
        file: file.mimetype
    });

});


postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFileUrl('posts', userId, img);

    res.sendFile(pathFoto);

});


export default postRoutes;