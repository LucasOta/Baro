import { Router, Request, Response } from 'express';
import { Category, ICategory } from './category.model';
import { verifyToken } from '../../middlewares/autenticacion';
import Methods from '../../classes/methods';

const categoryRoutes = Router();



// Crear una categoría (fala el verificar token según nivel)
categoryRoutes.post('/create', (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.name) errors.push('nombre');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }

    Category.findOne({ name: req.body.name }, (err, categoryDB) => {

        if (err) throw err;

        if (categoryDB) {
            return res.json({
                ok: false,
                desc: 'Ya existe una categoría con ese nombre.'
            });
        } else {
            const category = {
                name: req.body.name,
                // Falta ver el tema con las subCategories
            };

            Category
                .create(category)
                .then(categoryDB => {
                    res.json({ ok: true, category: categoryDB });
                })
                .catch(err => res.json({ ok: false, err }));
        }

    })

});


// Actualizar una categoría (fala el verificar token según nivel)
categoryRoutes.patch('/update', (req: any, res: Response) => {

    let category = <ICategory>{
        // Falta ver el tema con las supCategories
        // Falta ver el tema con las imgs
        modified: new Date()
    }

    if (req.body.name) category.name = req.body.name;

    Category
        .findByIdAndUpdate(req.body._id, category, { new: true }, (err, categoryDB) => {

            if (err) throw err;

            if (!categoryDB) {
                return res.json({
                    ok: false,
                    desc: 'No existe una categoría con ese ID'
                });
            }

            res.json({
                ok: true,
                category: categoryDB
            });


        })
        .catch(err => res.json({ ok: false, err }));

});


// categoryRoutes.get('/', [verifyToken], (req: any, res: Response) => {

//     const user = req.user;

//     res.json({
//         ok: true,
//         user
//     });

// });

// Falta el Get de mains y el de las categorías relacionadas

export default categoryRoutes;