import { Request, Response, Router } from "express";
import Methods from "../../classes/methods";
import { verifyToken } from "../../middlewares/authentication";
import { IIndustry, Industry } from "./industry.model";

const industryRoutes = Router();

industryRoutes.post("/create", [verifyToken], (req: Request, res: Response) => {
  const industry = <IIndustry>{ ...req.body };

  Industry.findOne({ name: industry.name[0] })
    .then((industryDB) => {
      if (industryDB) {
        return Methods.sendErr(
          res,
          "An industry with that name already exists."
        );
      }

      Industry.create(industry).then((industryDB) => {
        return Methods.sendSuccess(res, "Industry created", industryDB, 201);
      });
    })
    .catch((err) => {
      Methods.sendErr(res, err);
    });
});

industryRoutes.patch("/update", [verifyToken], (req: any, res: Response) => {
  const industry = <IIndustry>{ ...req.body, modified: new Date() };

  Industry.findByIdAndUpdate(industry["_id"], industry, { new: true })
    .then((industryDB) => {
      return industryDB
        ? Methods.sendSuccess(res, "Industry updated", industryDB)
        : Methods.sendErr(res, "There is no industry with that ID");
    })
    .catch((err) => Methods.sendErr(res, err));
});

// Get All
industryRoutes.get("/", async (req: any, res: Response) => {
  const lang = req.get("Accept-Language");

  const industries = await Industry.find()
    .sort({ _id: -1 })
    .exec()
    .catch((err) => {
      return Methods.sendErr(res, err);
    });

  // TODO: create Methods.translate(lang, data);
  if (lang != "" && industries) {
    industries.forEach((c) => {
      c.name = [Methods.filterByLanguage(c.name, lang)];
    });
  }

  Methods.sendSuccess(res, "", { industries });
});

// Get ById
industryRoutes.get("/:industryId", async (req: any, res: Response) => {
  const id = req.params.industryId;
  const lang = req.get("Accept-Language");
  const ObjectId = require("mongoose").Types.ObjectId;
  if (!ObjectId.isValid(id)) {
    return res.json({ ok: false, desc: "No industry found" });
  }

  const industries = await Industry.findById(id)
    .exists("deleted", false)
    .sort({ _id: -1 })
    .exec()
    .catch((err) => Methods.sendErr(res, err));

  if (!industries) return res.json({ ok: true, desc: "No industry found" });

  if (lang != "" && industries) {
    // @ts-ignore
    industries.name = [Methods.filterByLanguage(industries.name, lang)];
  }

  return res.json({ ok: true, industries });
});

// Delete
industryRoutes.delete(
  "/:industryId",
  [verifyToken],
  async (req: any, res: Response) => {
    const id = req.params.industryId;
    await Industry.findByIdAndDelete(id).catch((err) =>
      Methods.sendErr(res, err)
    );

    // TODO: Erase industry references
    res.json({ ok: true, desc: "Industry deleted" });
  }
);

export default industryRoutes;
