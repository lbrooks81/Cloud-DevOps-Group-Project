import express from "express"
import cors from 'cors';
import bodyParser from "body-parser";
import {ServerData} from "./data-source";
import {Company} from './entities/company';
import {Employee} from './entities/employee';
import {ManufacturedPart} from './entities/manufactured-part';
import {PermissionLevel} from './entities/permission-level';
import {Plant} from './entities/plant';
import {Vendor} from './entities/vendor';


const app = express();
const port: number = 3000;

app.use(cors());

app.use(bodyParser.json()); // take a request body and turn it into a json object

app.listen(port, ()=>
{
  console.log(`Server is listening at http://localhost:${port}`);
});

// Initialize my data source
ServerData.initialize()
  .then(()=>{
    console.log("Data source has been initialized");

    //================================= COMPANY =================================
    // get all companies
    app.get('/companies', async (req, res)=> {
      const companies = await ServerData.getRepository(Company).find();
      res.json(companies);
    });

    // get company by id
    app.get('/companies/:id', async(req,res) =>
    {
      const id = Number(req.params.id);
      console.log(id);

      const company = await ServerData.getRepository(Company).findOneBy({
        companyID: id
      });

      if(!company)
      {
        res.status(404).json({
          message: `Company with ID ${id} not found`
        });
      }
      else
      {
        res.json(company);
      }
    });

    // update a specific company based on an id
    app.put('/companies/:id', async(req,res) => {
      const id = Number(req.params.id);
      const companyData = req.body;

      const companyRepository = ServerData.getRepository(Company);
      const company = await companyRepository.findOneBy({
        companyID: id
      });

      if(!company)
      {
        res.status(404).json({
          message: `Company with ID ${id} not found`
        });
      }
      else
      {
        company.companyName = companyData.companyName;
        company.companyLocation = companyData.companyLocation;

        await companyRepository.save(company);

        res.json(company);
      }
    });

    // delete a specific company based on an id
    app.delete('/companies/:id', async(req,res) => {
      const id = Number(req.params.id);
      const companyRepository = ServerData.getRepository(Company);
      const company = await companyRepository.findOneBy({
        companyID: id
      });

      if(!company)
      {
        res.status(404).json({
          message: `Company with ID ${id} not found`
        });
      }
      else
      {
        await companyRepository.delete(company);
        res.json({
          message: `Company with ID ${id} has been deleted`
        });
      }
    });

    // create a new company
    app.post('/companies', async(req,res) => {
      const companyData = req.body;

      const companyRepository = ServerData.getRepository(Company);
      const newCompany = companyRepository.create({
        companyID: companyData.companyID,
        companyName: companyData.companyName,
        companyLocation: companyData.companyLocation
      });

      await companyRepository.save(newCompany);

      res.json(newCompany);
    });

    //================================= DEPARTMENT =================================


    //================================= EMPLOYEE =================================
    // get all employees
    app.get('/employees', async(req,res) => {
      const employees = await ServerData.getRepository(Employee).find();
      res.json(employees);
    });

    // get employee by id
    app.get('/employees/:id', async(req,res) => {
      const id = Number(req.params.id);

      const employee = await ServerData.getRepository(Employee).findOneBy({
        employeeID: id
      });

      if(!employee)
      {
        res.status(404).json({
          message: `Employee with ID ${id} not found`
        });
      }
      else
      {
        res.json(employee);
      }
    });

    // update a specific employee based on an id
    app.put('/employees/:id', async(req,res) => {
      const id = Number(req.params.id);
      const employeeData = req.body;

      const employeeRepository = ServerData.getRepository(Employee);
      const employee = await employeeRepository.findOneBy({
        employeeID: id
      });

      if(!employee)
      {
        res.status(404).json({
          message: `Employee with ID ${id} not found`
        });
      }
      else {
        employee.employeeID = employeeData.employeeID;
        employee.firstName = employeeData.firstName;
        employee.lastName = employeeData.lastName;
        employee.email = employeeData.email;
        employee.username = employeeData.username;
        employee.password = employeeData.password;
        employee.phoneNum = employeeData.phoneNum;
        employee.roleID = employeeData.roleID;
        employee.departmentID = employeeData.departmentID;

        await employeeRepository.save(employee);

        res.json(employee);
      }
    });

    // delete a specific employee based on an id
    app.delete('/employees/:id', async(req,res) => {
      const id = Number(req.params.id);
      const employeeRepository = ServerData.getRepository(Employee);
      const employee = await employeeRepository.findOneBy({
        employeeID: id
      });

      if(!employee)
      {
        res.status(404).json({
          message: `Employee with ID ${id} not found`
        });
      }
      else
      {
        await employeeRepository.delete(employee);
        res.json({
          message: `Employee with ID ${id} has been deleted`
        });
      }
    });

    // create a new employee
    app.post('/employees', async(req,res) => {
      const employeeData = req.body;

      const employeeRepository = ServerData.getRepository(Employee);
      const newEmployee = employeeRepository.create({
        employeeID: employeeData.employeeID,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        username: employeeData.username,
        password: employeeData.password,
        phoneNum: employeeData.phoneNum,
        roleID: employeeData.roleID,
        departmentID: employeeData.departmentID
      });

      await employeeRepository.save(newEmployee);

      res.json(newEmployee);
    });

    //================================= MANUFACTURED PART =================================
    // get all manufactured parts
    app.get('/manufactured-parts', async(req,res) => {
      const manufacturedParts = await ServerData.getRepository(ManufacturedPart).find();
      res.json(manufacturedParts);
    });

    // get manufactured part by id
    app.get('/manufactured-parts/:id', async(req,res) => {
      const id = Number(req.params.id);

      const manufacturedPart = await ServerData.getRepository(ManufacturedPart).findOneBy({
        plantID: id
      });

      if(!manufacturedPart)
      {
        res.status(404).json({
          message: `Manufactured Part with ID ${id} not found`
        });
      }
      else
      {
        res.json(manufacturedPart);
      }
    });

    // update a specific manufactured part based on an id
    app.put('/manufactured-parts/:id', async(req,res) => {
      const id = Number(req.params.id);
      const manufacturedPartData = req.body;

      const manufacturedPartRepository = ServerData.getRepository(ManufacturedPart);
      const manufacturedPart = await manufacturedPartRepository.findOneBy({
        plantID: id
      });

      if (!manufacturedPart) {
        res.status(404).json({
          message: `Manufactured Part with ID ${id} not found`
        });
      } else {
        manufacturedPart.plantID = manufacturedPartData.plantID;
        manufacturedPart.partID = manufacturedPartData.partID;
        manufacturedPart.manufactureDate = manufacturedPartData.manufactureDate;

        await manufacturedPartRepository.save(manufacturedPart);
        res.json(manufacturedPart);
      }
    });

    // delete a specific manufactured part based on an id
    app.delete('/manufactured-parts/:id', async(req,res) => {
      const id = Number(req.params.id);
      const manufacturedPartRepository = ServerData.getRepository(ManufacturedPart);
      const manufacturedPart = await manufacturedPartRepository.findOneBy({
        plantID: id
      });

      if (!manufacturedPart) {
        res.status(404).json({
          message: `Manufactured Part with ID ${id} not found`
        });
      }
      else {
        await manufacturedPartRepository.delete(manufacturedPart);
        res.json({
          message: `Manufactured Part with ID ${id} has been deleted`
        });
      }
    });

    // create a new manufactured part
    app.post('/manufactured-parts', async(req,res) => {
      const manufacturedPartData = req.body;

      const manufacturedPartRepository = ServerData.getRepository(ManufacturedPart);
      const newManufacturedPart = manufacturedPartRepository.create({
        plantID: manufacturedPartData.plantID,
        partID: manufacturedPartData.partID,
        manufactureDate: manufacturedPartData.manufactureDate
      });

      await manufacturedPartRepository.save(newManufacturedPart);
      res.json(newManufacturedPart);
    });

    //================================= MICRO COMPONENT =================================


    //================================= ORDERS =================================


    //================================= PART =================================


    //================================= PERMISSION LEVEL =================================
    // TODO remove unnecessary endpoints after database is populated
    // get all permission levels
    app.get('/permission-levels', async(req,res) => {
      const permissionLevels = await ServerData.getRepository(PermissionLevel).find();
      res.json(permissionLevels);
    });

    // get permission level by id
    app.get('/permission-levels/:id', async(req,res) => {
      const id = Number(req.params.id);

      const permissionLevel = await ServerData.getRepository(PermissionLevel).findOneBy({
        permissionLevelID: id
      });

      if(!permissionLevel)
      {
        res.status(404).json({
          message: `Permission Level with ID ${id} not found`
        });
      }
      else
      {
        res.json(permissionLevel);
      }
    });

    // update a specific permission level based on an id
    app.put('/permission-levels/:id', async(req,res) => {
      const id = Number(req.params.id);
      const permissionLevelData = req.body;

      const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
      const permissionLevel = await permissionLevelRepository.findOneBy({
        permissionLevelID: id
      });

      if(!permissionLevel)
      {
        res.status(404).json({
          message: `Permission Level with ID ${id} not found`
        });
      }
      else
      {
        permissionLevel.permissionLevelID = permissionLevelData.permissionLevelID;
        permissionLevel.permissionLevel = permissionLevelData.permissionLevel;

        await permissionLevelRepository.save(permissionLevel);
        res.json(permissionLevel);
      }
    });

    // delete a specific permission level based on an id
    app.delete('/permission-levels/:id', async(req,res) => {
      const id = Number(req.params.id);
      const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
      const permissionLevel = await permissionLevelRepository.findOneBy({
        permissionLevelID: id
      });

      if(!permissionLevel)
      {
        res.status(404).json({
          message: `Permission Level with ID ${id} not found`
        });
      }
      else
      {
        await permissionLevelRepository.delete(permissionLevel);
        res.json({
          message: `Permission Level with ID ${id} has been deleted`
        });
      }
    });

    // create a new permission level
    app.post('/permission-levels', async(req,res) => {
      const permissionLevelData = req.body;

      const permissionLevelRepository = ServerData.getRepository(PermissionLevel);
      const newPermissionLevel = permissionLevelRepository.create({
        permissionLevelID: permissionLevelData.permissionLevelID,
        permissionLevel: permissionLevelData.permissionLevel
      });

      await permissionLevelRepository.save(newPermissionLevel);
      res.json(newPermissionLevel);
    });

    //================================= PLANT =================================
    // get all plants
    app.get('/plants', async(req,res) => {
      const plants = await ServerData.getRepository(Plant).find();
      res.json(plants);
    });

    // get plant by id
    app.get('/plants/:id', async(req,res) => {
      const id = Number(req.params.id);

      const plant = await ServerData.getRepository(Plant).findOneBy({
        plantId: id
      });

      if(!plant)
      {
        res.status(404).json({
          message: `Plant with ID ${id} not found`
        });
      }
      else
      {
        res.json(plant);
      }
    });

    // update a specific plant based on an id
    app.put('/plants/:id', async(req,res) => {
      const id = Number(req.params.id);
      const plantData = req.body;

      const plantRepository = ServerData.getRepository(Plant);
      const plant = await plantRepository.findOneBy({
        plantId: id
      });

      if(!plant)
      {
        res.status(404).json({
          message: `Plant with ID ${id} not found`
        });
      }
      else
      {
        plant.plantId = plantData.plantId;
        plant.plantAddress = plantData.plantAddress;
        plant.plantZipcode = plantData.plantZipcode;
        plant.managerID = plantData.managerID;

        await plantRepository.save(plant);
        res.json(plant);
      }
    });

    // delete a specific plant based on an id
    app.delete('/plants/:id', async(req,res) => {
      const id = Number(req.params.id);
      const plantRepository = ServerData.getRepository(Plant);
      const plant = await plantRepository.findOneBy({
        plantId: id
      });

      if(!plant)
      {
        res.status(404).json({
          message: `Plant with ID ${id} not found`
        });
      }
      else
      {
        await plantRepository.delete(plant);
        res.json({
          message: `Plant with ID ${id} has been deleted`
        });
      }
    });

    // create a new plant
    app.post('/plants', async(req,res) => {
      const plantData = req.body;

      const plantRepository = ServerData.getRepository(Plant);
      const newPlant = plantRepository.create({
        plantId: plantData.plantId,
        plantAddress: plantData.plantAddress,
        plantZipcode: plantData.plantZipcode,
        managerID: plantData.managerID
      });

      await plantRepository.save(newPlant);
      res.json(newPlant);
    });

    //================================= ROLES =================================


    //================================= VENDOR =================================
    // get all vendors
    app.get('/vendors', async(req,res) => {
      const vendors = await ServerData.getRepository(Vendor).find();
      res.json(vendors);
    });

    // get vendor by id
    app.get('/vendors/:id', async(req,res) => {
      const id = Number(req.params.id);

      const vendor = await ServerData.getRepository(Vendor).findOneBy({
        vendorID: id
      });

      if(!vendor)
      {
        res.status(404).json({
          message: `Vendor with ID ${id} not found`
        });
      }
      else {
        res.json(vendor);
      }
    });

    // update a specific vendor based on an id
    app.put('/vendors/:id', async(req,res) => {
      const id = Number(req.params.id);
      const vendorData = req.body;

      const vendorRepository = ServerData.getRepository(Vendor);
      const vendor = await vendorRepository.findOneBy({
        vendorID: id
      });

      if(!vendor)
      {
        res.status(404).json({
          message: `Vendor with ID ${id} not found`
        });
      }
      else
      {
        vendor.vendorID = vendorData.vendorID;
        vendor.vendorName = vendorData.vendorName;
        vendor.vendorAddress = vendorData.vendorAddress;
        vendor.vendorZipcode = vendorData.vendorZipcode;

        await vendorRepository.save(vendor);
        res.json(vendor);
      }
    });

    // delete a specific vendor based on an id
    app.delete('/vendors/:id', async(req,res) => {
      const id = Number(req.params.id);
      const vendorRepository = ServerData.getRepository(Vendor);
      const vendor = await vendorRepository.findOneBy({
        vendorID: id
      });

      if(!vendor)
      {
        res.status(404).json({
          message: `Vendor with ID ${id} not found`
        });
      }
      else
      {
        await vendorRepository.delete(vendor);
        res.json({
          message: `Vendor with ID ${id} has been deleted`
        });
      }
    });

    // create a new vendor
    app.post('/vendors', async(req,res) => {
      const vendorData = req.body;

      const vendorRepository = ServerData.getRepository(Vendor);
      const newVendor = vendorRepository.create({
        vendorID: vendorData.vendorID,
        vendorName: vendorData.vendorName,
        vendorAddress: vendorData.vendorAddress,
        vendorZipcode: vendorData.vendorZipcode
      });

      await vendorRepository.save(newVendor);
      res.json(newVendor);
    });
  })
  .catch((error)=>{
    console.error("Error during data source initialization", error);
  });
