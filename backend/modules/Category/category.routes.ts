import { Router, Request, Response } from 'express';
import { Category, ICategory } from './category.model';
import { verifyToken } from '../../middlewares/authentication';
import Methods from '../../classes/methods';
import FileSystem from '../../classes/file-system';

const categoryRoutes = Router();
const fileSystem = new FileSystem();

// Crear una categoría (fala el verificar token según nivel)
categoryRoutes.post('/create', [verifyToken], (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.name) errors.push('name');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }
    
    const category = new Category();
    category.name = req.body.name;

    Category.findOne({"name": category.name[0]}, (err, categoryDB) => {

        if (err) res.json({ ok: false, err });

        if (categoryDB) {
            return res.json({
                ok: false,
                desc: 'A category with that name already exists.'
            });
        } else {
            req.body.parent ? category.parent = req.body.parent : delete category.parent;       

            Category
                .create(category)
                .then(categoryDB => {       
                    // @ts-ignore
                    const images = fileSystem.filesFromTempToFolder(req.user._id, 'categories', categoryDB._id.toString());
                    
                    // Now that we have the ID, we can store the Images
                    if (images) {
                        categoryDB.img = images[0];
                        Category.findByIdAndUpdate(categoryDB._id, categoryDB, { new: true }, (err, updatedCategoryDB) => {});
                    }
                    res.json({ ok: true, category: categoryDB });
                })
                .catch(err => res.json({ ok: false, err }));
        }

    }).catch(err => res.json({ ok: false, err }));

});


// Actualizar una categoría (fala el verificar token según nivel)
categoryRoutes.patch('/update', [verifyToken], (req: any, res: Response) => {
    let errors:string[] = [];
    if (!req.body._id) errors.push('ID'); 
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }   

    let category = <ICategory>{
        modified: new Date()
    }

    if (req.body.name) category.name = req.body.name;
    if (req.body.img){
        req.body.img == 'empty' ? category.img = 'category_def.jpg' : category.img = req.body.img;
        fileSystem.filesFromTempToFolder(req.user._id, 'categories', req.body._id.toString());
        let currentImages :string[] = [category.img || ''];
        fileSystem.deleteImagesNotIncludedIn('categories', req.body._id, currentImages);
    } 
    
    // TODO: test this line
    req.body.parent ? category.parent = req.body.parent : delete category.parent;

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
    const lang = req.get('Accept-Language');

    let categories = await Category
        .find()
        .sort({ _id: -1 })
        .populate('parent')
        .exec()
        .catch(err => res.json({ ok: false, err }));

    if (lang != '' && categories) {
        // @ts-ignore
        categories.forEach(c => {
            // @ts-ignore
            c.name = [Methods.filterByLanguage(c.name, lang)];
        });
    }
    
    res.json({
        ok: true,
        categories
    });

});

// Get ById
categoryRoutes.get ('/:categoryid', async (req: any, res: Response) => {
    const id = req.params.categoryid;
    const lang = req.get('Accept-Language');

    console.log(lang);

    let categories = await Category
        .findById(id)
        .exists('deleted', false)
        .sort({ _id: -1 })
        .populate('parent', )
        .exec()
        .catch(err => res.json({ ok: false, err }));
    
    if (!categories) res.json({ok:true, desc: 'No category found'});

    if (lang != '' && categories) {
        // @ts-ignore
        categories.name = [Methods.filterByLanguage(categories.name, lang)];
    }    

    res.json({
        ok: true,
        categories
    });

});

// Delete
categoryRoutes.delete ('/:categoryid', [verifyToken], async (req: any, res: Response) => {
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