"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
//Routes
const index_1 = __importDefault(require("./modules/index"));
dotenv_1.default.config();
const modules_1 = __importDefault(require("./modules"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT;
const uri = process.env.MONGO_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};
// mongoose.set("useFindAndModify", false)
mongoose_1.default
    .connect(uri)
    .then((result) => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use(index_1.default);
    (0, modules_1.default)(app);
    app.get("/", (req, res) => res.status(200).json({ data: "I am the Backend API, happy hacking" }));
    app.get("**", (req, res) => res.status(404).json({ "Not Found": "Not Found" }));
    app.listen(PORT, () => {
        console.log(`Application successfully connected in ${process.env.NODE_ENV} mode at ${PORT}`);
    });
})
    .catch((err) => console.log(err));
