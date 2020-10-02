import { Router, Request, Response } from 'express';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import Token from '../../classes/token';
import Methods from '../../classes/methods';
import { verifyToken } from '../../middlewares/authentication';

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;
    
    let errors:string[] = [];
    if (!req.body.email) errors.push('email');
    if (!req.body.password) errors.push('contraseña');
    
    if (errors.length) {
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });    
    }

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) res.json({ ok: false, err });

        if (!userDB) {
            return res.json({
                ok: false,
                desc: 'Usuario/contraseña no son correctos'
            });
        }

        if (userDB.matchPassword(body.password)) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email
            });

            userDB.password = '';

            res.json({
                ok: true,
                token: tokenUser,
                user: userDB
            });

        } else {
            return res.json({
                ok: false,
                desc: 'Usuario/contraseña no son correctos ***'
            });
        }

    }).select('+password')

});


// Create an User
userRoutes.post('/create', (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.name)      errors.push('nombre');
    if (!req.body.email)     errors.push('email');
    // if (!req.body.level)     errors.push('nivel');
    if (!req.body.password)  errors.push('contraseña');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }

    User.findOne({ email: req.body.email }, (err, userDB) => {

        if (err) res.json({ ok: false, err });

        if (userDB) {
            return res.json({
                ok: false,
                desc: 'Ya existe un usuario registrado con ese email.'
            });
        } else {
            const user = {
                name: req.body.name,
                email: req.body.email,
                // level: req.body.level,
                level: 1,
                password: bcrypt.hashSync(req.body.password, 10)
            };

            User
                .create(user)
                .then(userDB => {
                    const tokenUser = Token.getJwtToken({
                        _id: userDB._id,
                        name: userDB.name,
                        email: userDB.email,
                        level: userDB.level,
                    });

                    res.json({ ok: true, token: tokenUser });
                })
                .catch(err => res.json({ ok: false, err }));
        }

    })

});


// Update User
userRoutes.patch('/update', [verifyToken], (req: any, res: Response) => {

    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        level: req.body.level || req.user.level,
        modified: new Date()
    }

    User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {

        if (err) res.json({ ok: false, err });

        if (!userDB) {
            return res.json({
                ok: false,
                desc: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });

});


userRoutes.get('/', [verifyToken], async (req: any, res: Response) => {

    const users = await User.find()
        .sort({ _id: -1 })
        .populate('user', '-password')
        // .select('+password') //in case is needed a field with select:false
        .exec();

    res.json({
        ok: true,
        users
    });

});


export default userRoutes;