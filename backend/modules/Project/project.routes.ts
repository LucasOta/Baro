import { Router, Request, Response } from 'express';
import { Project, IProject } from './project.model';
import bcrypt from 'bcrypt';
import Token from '../../classes/token';
import Methods from '../../classes/methods';
import { verifyToken } from '../../middlewares/authentication';
import FileSystem from '../../classes/file-system';

const projectRoutes = Router();
const fileSystem = new FileSystem();

// Create an Project
projectRoutes.post('/create', [verifyToken], (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.title)        errors.push('title');
    if (!req.body.description)  errors.push('description');
    if (!req.body.clients)      errors.push('clients');
    if (!req.body.industries)   errors.push('industries');
    if (!req.body.disciplines)  errors.push('disciplines');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }

    Project.findOne({"name": req.body.title[0]}, (err, projectDB) => {

        if (err) res.json({ ok: false, err });

        if (projectDB) {
            return res.json({
                ok: false,
                desc: 'An project with that title already exists.'
            });
        } else {
            let project = new Project();
            project.title = req.body.title;
            project.description = req.body.description;
            project.clients = req.body.clients;
            project.industries = req.body.industries;
            project.disciplines = req.body.disciplines;
            project.blocks = req.body.blocks || [];
            if (req.body.featured) project.featured = req.body.featured;
            if (req.body.playground) project.playground = req.body.playground;

            Project
                .create(project)
                .then(projectDB => {                
                    
                    // @ts-ignore
                    // const images = fileSystem.filesFromTempToFolder(req.project._id, 'projects', projectDB._id.toString());

                    // Now that we have the ID, we can store the Images
                    // if (images) {
                    //     projectDB.img = images[0];
                    //     Project.findByIdAndUpdate(projectDB._id, projectDB, { new: true }, (err, updatedProjectDB) => {});
                    // }

                    res.status(201);
                    res.json({ ok: true, project: projectDB });
                })
                .catch(err => res.json({ ok: false, err }));
        }

    })

});


// Update Project
// projectRoutes.patch('/update', [verifyToken], (req: any, res: Response) => {
//     let errors:string[] = [];
//     if (!req.body._id) errors.push('id');
    
//     if (errors.length){
//         return res.json({
//             ok: false,
//             desc: Methods.emptyFieldsMsg(errors)
//         });
//     }

//     let project = <IProject>{ _id: req.body._id, modified: new Date() }

//     if (req.body.name) project.name = req.body.name;
//     if (req.body.email) project.email = req.body.email;
//     if (req.body.img){
//         req.body.img == 'empty' ? project.img = 'category_def.jpg' : project.img = req.body.img;
//         fileSystem.filesFromTempToFolder(req.project._id, 'projects', req.body._id.toString());
//         let currentImages :string[] = [project.img || ''];
//         fileSystem.deleteImagesNotIncludedIn('projects', req.body._id, currentImages);
//     }

//     Project.findByIdAndUpdate(project._id, project, { new: true }, (err, projectDB) => {
//         //TODO: Update password
//         if (err) return Methods.sendErr(res, Methods.prettyMongooseErr(err));
        
//         if (!projectDB) {
//             return res.json({
//                 ok: false,
//                 desc: 'No existe un usuario con ese ID'
//             });
//         }

//         if (req.project._id == project._id) { //The logged project is updating is own profile

//             res.json({ ok: true, });
//         } else {
//             res.json({ ok: true, token: '' });
//         }
//     });

// });


// // Get ById
// projectRoutes.get ('/:projectid', async (req: any, res: Response) => {
//     const id = req.params.projectid;

//     let projects = await Project
//         .findById(id)
//         .exists('deleted', false)
//         .sort({ _id: -1 })
//         .populate('project', '-password')
//         .exec()
//         .catch(err => Methods.sendErr(res, err) );
    
//     if (!projects) return res.json({ok:true, desc: 'No project found'});

//     return res.json({ ok: true, projects });
// }); 

// // Get All Projects
// projectRoutes.get('/', [verifyToken], async (req: any, res: Response) => {

//     const projects = await Project.find()
//         .sort({ _id: -1 })
//         .populate('project', '-password')
//         // .select('+password') //in case is needed a field with select:false
//         .exec();

//     res.json({
//         ok: true,
//         projects
//     });

// });

// // Delete
// projectRoutes.delete ('/:projectid', [verifyToken], async (req: any, res: Response) => {
//     const id = req.params.projectid;
//     await Project
//         .findByIdAndDelete(id)
//         .catch(err => Methods.sendErr(res, err) );

//     // TODO: Erase project references and call fs.deleteFolder
//     res.json({ ok: true, desc: 'Project deleted' });
// })

export default projectRoutes;