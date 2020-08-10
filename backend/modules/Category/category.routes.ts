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

        if (err) res.json({ ok: false, err });

        if (categoryDB) {
            return res.json({
                ok: false,
                desc: 'Ya existe una categoría con ese nombre.'
            });
        } else {
            const category = {
                name: req.body.name,
                subCategories: []
            };

            if (req.body.subCategories) category.subCategories = req.body.subCategories;            

            Category
                .create(category)
                .then(categoryDB => {
                    res.json({ ok: true, category: categoryDB });
                })
                .catch(err => res.json({ ok: false, err }));
        }

    }).catch(err => res.json({ ok: false, err }));

});


// Actualizar una categoría (fala el verificar token según nivel)
categoryRoutes.patch('/update', (req: any, res: Response) => {
    let errors:string[] = [];
    if (!req.body._id) errors.push('ID'); 
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }

    let category = <ICategory>{
        // Falta ver el tema con las imgs
        modified: new Date()
    }

    if (req.body.name) category.name = req.body.name;
    req.body.subCategories ? category.subCategories = req.body.subCategories : category.subCategories = [];

    Category
        .findByIdAndUpdate(req.body._id, category, { new: true }, (err, categoryDB) => {

            if (err) res.json({ ok: false, err });

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

// Get All
categoryRoutes.get ('/', async (req: any, res: Response) => {

    const categories = await Category
        .find()
        .sort({ _id: -1 })
        .populate('subCategories')
        .exec()
        .catch(err => res.json({ ok: false, err }));

    res.json({
        ok: true,
        categories
    });

});

// Get ById
categoryRoutes.get ('/:categoryid', async (req: any, res: Response) => {
    const id = req.params.categoryid;

    const categories = await Category
        .findById(id)
        .exists('deleted', false)
        .sort({ _id: -1 })
        .populate('subCategories', )
        .exec()
        .catch(err => res.json({ ok: false, err }));
    
    if (!categories) res.json({ok:true, desc: 'No category found'});

    res.json({
        ok: true,
        categories
    });

});

// Delete
categoryRoutes.delete ('/:categoryid', async (req: any, res: Response) => {
    const id = req.params.categoryid;
    await Category
        .findByIdAndDelete(id)
        .catch(err => res.json({ ok: false, err }));;

    // TODO: Erase category references
    res.json({
        ok: true,
        desc: 'Category deleted'
    });
})


// Falta el Get de mains

export default categoryRoutes;