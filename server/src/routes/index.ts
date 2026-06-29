import path from "path";
import { Router } from "express";

// Helpers
import { d, logInfo, logWarn, formatDate, upper } from "@utils";
import LogManager from "@services/log-manager";

// Routes
import userRoutes from "./User";

// Others
import { ROUTE_PREFIX } from "./config/Constant";

//--------------------------------------------------------------
const route = Router();
//--------------------------------------------------------------

// API Routes
route.use(`/${ROUTE_PREFIX.API}`, userRoutes);

route.all("*", (req, res) => {
  res.status(404).send("Not Found");
});
export default route;
