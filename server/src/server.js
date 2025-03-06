"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEPPER = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./data-source");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const department_api_1 = require("./api/department-api");
const employee_api_1 = require("./api/employee-api");
const purchased_part_api_1 = require("./api/purchased-part-api");
const part_api_1 = require("./api/part-api");
const permission_level_api_1 = require("./api/permission-level-api");
const plant_api_1 = require("./api/plant-api");
const role_api_1 = require("./api/role-api");
const vendor_api_1 = require("./api/vendor-api");
const http_errors_1 = __importDefault(require("http-errors"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
exports.app = app;
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const options = {
    key: fs_1.default.readFileSync("key.pem"),
    cert: fs_1.default.readFileSync("cert.pem")
};
const PEPPER = "theW0rld3nd5n0tW1thAB@ngButAWh1mp3r";
exports.PEPPER = PEPPER;
https_1.default.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json()); // take a request body and turn it into a json object
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// Initialize my data source
data_source_1.ServerData.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data source has been initialized");
    yield (0, department_api_1.departmentRequests)();
    yield (0, employee_api_1.employeeRequests)();
    yield (0, purchased_part_api_1.purchasedPartRequests)();
    yield (0, part_api_1.partRequests)();
    yield (0, permission_level_api_1.permissionLevelRequests)();
    yield (0, plant_api_1.plantRequests)();
    yield (0, role_api_1.roleRequests)();
    yield (0, vendor_api_1.vendorRequests)();
    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.render('index', { title: "Don't Look Here" });
    });
    app.get("*", (req, res) => {
        res.status(404).send("Page not found");
    });
}))
    .catch((error) => {
    console.error("Error during data source initialization", error);
});
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
