import express from "express"
import cors from 'cors';
import bodyParser from "body-parser";
import {ServerData} from "./data-source";
import {Employee} from './entities/employee';
import {PurchasedPart} from './entities/purchased-part';
import {PermissionLevel} from './entities/permission-level';
import {Plant} from './entities/plant';
import {Vendor} from './entities/vendor';
import {Department} from './entities/department';
import {Part} from './entities/part';
import {Roles} from './entities/roles';
import fs from "fs";
import https from "https";
import bcrypt from "bcrypt";
import {In} from "typeorm";
import {departmentRequests} from "./api/department-api";
import {employeeRequests} from "./api/employee-api";
import {purchasedPartRequests} from "./api/purchased-part-api";
import {partRequests} from "./api/part-api";
import {permissionLevelRequests} from "./api/permission-level-api";
import {plantRequests} from "./api/plant-api";
import {roleRequests} from "./api/role-api";
import {vendorRequests} from "./api/vendor-api";

export {app, PEPPER};


const app = express();
const port: number = 3000;
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}
const PEPPER = "theW0rld3nd5n0tW1thAB@ngButAWh1mp3r"

https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});

app.use(cors());

app.use(bodyParser.json()); // take a request body and turn it into a json object
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Initialize my data source
ServerData.initialize()
  .then(async () => {
    console.log("Data source has been initialized");

    await departmentRequests();
    await employeeRequests();
    await purchasedPartRequests();
    await partRequests();
    await permissionLevelRequests();
    await plantRequests();
    await roleRequests();
    await vendorRequests();
  })
  .catch((error)=>{
    console.error("Error during data source initialization", error);
  });



