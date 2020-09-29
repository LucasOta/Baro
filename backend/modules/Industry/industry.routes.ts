import { Router, Request, Response } from 'express';
import { Industry, IIndustry } from './industry.model';
import { verifyToken } from '../../middlewares/authentication';
import Methods from '../../classes/methods';
import FileSystem from '../../classes/file-system';

const industryRoutes = Router();
const fileSystem = new FileSystem();

// TODO: verify Token by level
industryRoutes.post('/create', [verifyToken], (req: Request, res: Response) => {
    let errors:string[] = [];
    if (!req.body.name) errors.push('name');
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }
    
    const industry = new Industry();
    industry.name = req.body.name;

    Industry.findOne({"name": industry.name[0]}, (err, industryDB) => {

        if (err) res.json({ ok: false, err });

        if (industryDB) {
            return res.json({
                ok: false,
                desc: 'A industry with that name already exists.'
            });
        } else {

            Industry
                .create(industry)
                .then(industryDB => {
                    res.status(201);
                    return res.json({ ok: true, desc: 'Industry', industry: industryDB });
                })
                .catch(err => { return res.json({ ok: false, err }) } );
        }

    }).catch(err => { return res.json({ ok: false, err }) } );

});


// TODO: verify Token by level
industryRoutes.patch('/update', [verifyToken], (req: any, res: Response) => {
    let errors:string[] = [];
    if (!req.body._id) errors.push('ID'); 
    
    if (errors.length){
        return res.json({
            ok: false,
            desc: Methods.emptyFieldsMsg(errors)
        });
    }   

    let industry = <IIndustry>{ modified: new Date() }

    if (req.body.name) industry.name = req.body.name;

    Industry
        .findByIdAndUpdate(req.body._id, industry, { new: true }, (err, industryDB) => {

            if (err) return res.json({ ok: false, err });

            if (!industryDB)  return res.json({ ok: false, desc: 'There is no industry with that ID' });

            res.status(200);
            return res.json({ ok: true, desc:'Industry updated', industry: industryDB });

        })
        .catch(err => { return res.json({ ok: false, err }) } );

});

// Get All
industryRoutes.get ('/', async (req: any, res: Response) => {    
    const lang = req.get('Accept-Language');

    let industries = await Industry
        .find()
        .sort({ _id: -1 })
        .populate('parent')
        .exec()
        .catch(err => res.json({ ok: false, err }));

    if (lang != '' && industries) {
        // @ts-ignore
        industries.forEach(c => {
            // @ts-ignore
            c.name = [Methods.filterByLanguage(c.name, lang)];
        });
    }
    
    return res.json({ ok: true, industries });

});

// Get ById
industryRoutes.get ('/:industryid', async (req: any, res: Response) => {
    const id = req.params.industryid;
    const lang = req.get('Accept-Language');

    let industries = await Industry
        .findById(id)
        .exists('deleted', false)
        .sort({ _id: -1 })
        .populate('parent', )
        .exec()
        .catch(err => res.json({ ok: false, err }));
    
    if (!industries) return res.json({ok:true, desc: 'No industry found'});

    if (lang != '' && industries) {
        // @ts-ignore
        industries.name = [Methods.filterByLanguage(industries.name, lang)];
    }    

    return res.json({ ok: true, industries });

});

// Delete
industryRoutes.delete ('/:industryid', [verifyToken], async (req: any, res: Response) => {
    const id = req.params.industryid;
    await Industry
        .findByIdAndDelete(id)
        .catch(err => res.json({ ok: false, err }));;

    // TODO: Erase industry references
    res.json({ ok: true, desc: 'Industry deleted' });
})


export default industryRoutes;