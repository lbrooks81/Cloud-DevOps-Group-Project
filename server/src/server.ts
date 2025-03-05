import express from "express"
import cors from 'cors';
import bodyParser from "body-parser";
import {ServerData} from "./data-source";
import https from "https";
import fs from "fs";
import {departmentRequests} from "./api/department-api";
import {employeeRequests} from "./api/employee-api";
import {purchasedPartRequests} from "./api/purchased-part-api";
import {partRequests} from "./api/part-api";
import {permissionLevelRequests} from "./api/permission-level-api";
import {plantRequests} from "./api/plant-api";
import {roleRequests} from "./api/role-api";
import {vendorRequests} from "./api/vendor-api";
import compression from 'compression';

export {app, PEPPER};

const app = express();
//const port: number =  normalizePort(process.env.PORT || '3000');
const port: number =  8080;
app.set('port', port);

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}
const PEPPER = "theW0rld3nd5n0tW1thAB@ngButAWh1mp3r";

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors());
app.use(compression());

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

      /* GET home page. */
      app.get('/', function(req, res, next) {
          res.render('index', { title: "Don't Look Here" });
      });

    app.get("*", (req, res) => {
        res.status(404).send("Page not found");
    });
  })
  .catch((error)=>{
    console.error("Error during data source initialization", error);
  });

function normalizePort(val: any) {
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


