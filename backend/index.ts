import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import Server from "./classes/server";
import clientRoutes from "./modules/Client/client.routes";
import contactRoutes from "./modules/Contact/contact.routes";
import disciplineRoutes from "./modules/Discipline/discipline.routes";
import fileRoutes from "./modules/File/file.routes";
import industryRoutes from "./modules/Industry/industry.routes";
import projectRoutes from "./modules/Project/project.routes";
import userRoutes from "./modules/User/user.routes";

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// FileUpload
server.app.use(fileUpload({ useTempFiles: true }));

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Endpoints
server.app.use("/client", clientRoutes);
server.app.use("/contact", contactRoutes);
server.app.use("/discipline", disciplineRoutes);
server.app.use("/file", fileRoutes);
server.app.use("/industry", industryRoutes);
server.app.use("/project", projectRoutes);
server.app.use("/user", userRoutes);

// Local
// mongoose.connect('mongodb://localhost/barobranding',

// Server
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => {
    console.log("MongoDB On-Line");
  })
  .catch((err) => {
    throw new Error(err);
  });

// Run Express
server.start(() => {
  console.log(`Server running on port ${server.port}`);
});
