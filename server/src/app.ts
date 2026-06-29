import expressLayouts from "express-ejs-layouts";
import flash from "express-flash-message";
import session from "express-session";
import express from "express";
import useragent from "express-useragent";
import cors from "cors";
import path from "path";

// Others
import Config from "@config";
import { RESOURCE_CONFIG } from "@routes/config/Constant";

// Middleware
import BodyParser from "@middleware/BodyParser";
import PayloadValidator from "@middleware/PayloadValidator";
import Context from "@middleware/Context";
import AllowOrigin from "@middleware/AllowOrigin";
import BotGuard from "@middleware/BotGuard";
import BodyTrimmer from "@middleware/BodyTrimmer";

// Routes
import routes from "@routes/index";
import Payment from "@controllers/User/Payment";
//--------------------------------------------------------------

//--------------------------------------------------------------
const app: express.Application = express();
//--------------------------------------------------------------

//--------------------------------------------------------------
app.set("trust proxy", true);

app.use(cors());
app.use(expressLayouts);
//Note: Stripe Webhook route MUST come BEFORE body parser
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }), // Important!
  Payment.Main.webhookHandler,
);
// Body Parsing Middleware
app.use(BodyParser);
// app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// setup express session
app.use(session(Config.EXPRESS_SESSION));

// setup flash
app.use(flash({ sessionKeyName: "express-flash-message" }));

// custom middleware
app.use(PayloadValidator);
app.use(Context);
app.use(AllowOrigin);
app.use(BotGuard);
app.use(BodyTrimmer);
app.use(useragent.express());

// serving static resources
app.use(
  `/${RESOURCE_CONFIG.STORAGE.PREFIX}`,
  express.static(
    path.join(Config.BASE_ROOT_DIR, RESOURCE_CONFIG.STORAGE.FOLDER),
  ),
);
app.use(
  `/${RESOURCE_CONFIG.STATIC_ASSETS.PREFIX}`,
  express.static(
    path.join(Config.APP.ROOT_DIR, RESOURCE_CONFIG.STATIC_ASSETS.FOLDER),
  ),
);

app.set("views", [path.join(Config.APP.ROOT_DIR, "views")]);
app.set("view engine", "ejs");
//--------------------------------------------------------------

//--------------------------------------------------------------
// Routes {
app.use("/", routes);
// } Routes
//--------------------------------------------------------------

//--------------------------------------------------------------
export default app;
