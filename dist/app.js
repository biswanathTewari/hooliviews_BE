"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
//^ db connection
mongoose_1.default
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/hooliviews")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
//^ routes
app.get("/", (_, res) => {
    res.send("Welcome to HooliViews Server!");
});
app.use("/api/videos", routes_1.videos);
app.use("/api/auth", routes_1.auth);
app.use("/api/user/likes", routes_1.likes);
app.use("/api/user/watchlater", routes_1.watchlater);
app.use("/api/user/history", routes_1.history);
app.use("/api/user/playlist", routes_1.playlist);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    return console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=app.js.map