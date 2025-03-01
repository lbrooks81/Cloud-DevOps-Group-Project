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
  .then(()=>{
    console.log("Data source has been initialized");

    //================================= DEPARTMENT =================================

    app.get('/departments', async (req, res)=> {
      const departments = await ServerData.getRepository(Department).find();
      res.json(departments);
    });

    // get department by id
    app.get('/departments/:id', async(req,res) =>
    {
      const id = Number(req.params.id);
      console.log(id);

      const department = await ServerData.getRepository(Department).findOneBy({
        departmentId: id
      });

      if(!department)
      {
        res.status(404).json({
          message: `Department with ID ${id} not found`
        });
      }
      else
      {
        res.json(department);
      }
    });

    // update a specific department based on an id

    app.put('/departments/:id', async(req,res) => {
      const id = Number(req.params.id);
      const departmentData = req.body;

      const departmentRepository = ServerData.getRepository(Department);
      const department = await departmentRepository.findOneBy({
        departmentId: id
      });

      if(!department)
      {
        res.status(404).json({
          message: `Department with ID ${id} not found`
        });
      }
      else
      {
        department.departmentName = departmentData.departmentName;
        department.employeeID = departmentData.employeeID;
        department.plantID = departmentData.plantID;

        await departmentRepository.save(department);

        res.json(department);
      }
    });

    // delete a specific department based on an id

    app.delete('/departments/:id', async(req,res) => {
      const id = Number(req.params.id);
      const departmentRepository = ServerData.getRepository(Department);
      const department = await departmentRepository.findOneBy({
        departmentId: id
      });

      if(!department)
      {
        res.status(404).json({
          message: `Department with ID ${id} not found`
        });
      }
      else
      {
        await departmentRepository.delete(department);
        res.json({
          message: `Department with ID ${id} has been deleted`
        });
      }
    });

    // create a new department

    app.post('/departments', async(req,res) => {
      const departmentData = req.body;

      const departmentRepository = ServerData.getRepository(Department);
      const newDepartment = departmentRepository.create({
        departmentId: departmentData.departmentId,
        departmentName: departmentData.departmentName,
        employeeID: departmentData.employeeID,
        plantID: departmentData.plantID
      });

      await departmentRepository.save(newDepartment);

      res.json(newDepartment);
    });


    //================================= EMPLOYEE =================================
    // get all employees
    app.get('/employees', async(req,res) => {
      const employees = await ServerData.getRepository(Employee).find();
      res.status(200).json(employees);
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
        let bcryptPassword = bcrypt.hashSync(employeeData.password + PEPPER, 5);

        employee.employeeID = employeeData.employeeID;
        employee.firstName = employeeData.firstName;
        employee.lastName = employeeData.lastName;
        employee.email = employeeData.email;
        employee.username = employeeData.username;
        employee.password = bcryptPassword;
        employee.phoneNum = employeeData.phoneNum;
        employee.plantID = employeeData.plantID;
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
      try{
        const employeeData = req.body;

        const employeeRepository = ServerData.getRepository(Employee);
        const newEmployee = employeeRepository.create({
          employeeID: employeeData.employeeID,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          email: employeeData.email,
          username: employeeData.username,
          password: bcrypt.hashSync(employeeData.password + PEPPER, 5),
          phoneNum: employeeData.phoneNum,
          plantID: employeeData.plantID,
          roleID: employeeData.roleID,
          departmentID: employeeData.departmentID
        });

        await employeeRepository.save(newEmployee);
        res.json(newEmployee);
      } catch (error) {
        console.error("Error creating new employee:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //================================= PURCHASED PART =================================
    // get all purchased parts
    app.get('/purchased-parts', async(req,res) => {
      const purchasedParts = await ServerData.getRepository(PurchasedPart).find();
      res.json(purchasedParts);
    });

    // get purchased part by composite key {partID, plantID}
    app.get('/purchased-parts/:partID/:plantID', async(req,res) => {
      const partID = Number(req.params.partID);
      const plantID = Number(req.params.plantID);

      const purchasedPart = await ServerData.getRepository(PurchasedPart).findOneBy({
        partID: partID,
        plantID: plantID
      });

      if(!purchasedPart)
      {
        res.status(404).json({
          message: `Purchased Part with Part ID ${partID} and Plant ID ${plantID} not found`
        });
      }
      else
      {
        res.json(purchasedPart);
      }
    });

    // update a specific purchased part based on an id
    app.put('/purchased-parts/:partID/:plantID', async(req,res) => {
      const partID = Number(req.params.partID);
      const plantID = Number(req.params.plantID);
      const purchasedPartData = req.body;

      const purchasedPartRepository = ServerData.getRepository(PurchasedPart);
      const purchasedPart = await ServerData.getRepository(PurchasedPart).findOneBy({
        partID: partID,
        plantID: plantID
      });

      if (!purchasedPart) {
        res.status(404).json({
          message: `Purchased Part with partID ${partID} and plantID ${plantID} not found`
        });
      }
      else {
        purchasedPart.plantID = purchasedPartData.plantID;
        purchasedPart.partID = purchasedPartData.partID;
        purchasedPart.date = purchasedPartData.date;

        await purchasedPartRepository.save(purchasedPart);
        res.json(purchasedPart);
      }
    });

    // delete a specific purchased part based on an id
    app.delete('/purchased-parts/:partID/:plantID', async(req,res) => {
      const partID = Number(req.params.partID);
      const plantID = Number(req.params.plantID);

      const purchasedPartRepository = ServerData.getRepository(PurchasedPart);
      const purchasedPart = await ServerData.getRepository(PurchasedPart).findOneBy({
        partID: partID,
        plantID: plantID
      });

      if (!purchasedPart) {
        res.status(404).json({
          message: `Purchased Part with partID ${partID} and plantID ${plantID} not found`
        });
      }
      else {
        await purchasedPartRepository.delete(purchasedPart);
        res.json({
          message: `Purchased Part with partID ${partID} and plantID ${plantID} has been deleted`
        });
      }
    });

    // create a new purchased part
    app.post('/purchased-parts', async(req,res) => {
      const purchasedPartData = req.body;

      const purchasedPartRepository = ServerData.getRepository(PurchasedPart);
      const newPurchasedPart = purchasedPartRepository.create({
        plantID: purchasedPartData.plantID,
        partID: purchasedPartData.partID,
        date: purchasedPartData.date
      });

      await purchasedPartRepository.save(newPurchasedPart);
      res.json(newPurchasedPart);
    });


    //================================= PART =================================

    // get all parts
    app.get('/parts', async(req,res) => {
      const parts = await ServerData.getRepository(Part).find();
      res.json(parts);
    });

    // get part by id
    app.get('/parts/:id', async(req,res) => {
      const id = Number(req.params.id);

      const part = await ServerData.getRepository(Part).findOneBy({
        partId: id
      });

      if(!part)
      {
        res.status(404).json({
          message: `Part with ID ${id} not found`
        });
      }
      else
      {
        res.json(part);
      }
    });

    // update a specific part based on an id
    app.put('/parts/:id', async(req,res) => {
      const id = Number(req.params.id);
      const partData = req.body;

      const partRepository = ServerData.getRepository(Part);
      const part = await partRepository.findOneBy({
        partId: id
      });

      if(!part)
      {
        res.status(404).json({
          message: `Part with ID ${id} not found`
        });
      }
      else
      {
        part.partId = partData.partId;
        part.partName = partData.partName;
        part.partDescription = partData.partDescription;
        part.partCost = partData.partCost;
        part.partQoh = partData.partQoh;
        part.vendorId = partData.vendorId;

        await partRepository.save(part);
        res.json(part);
      }
    });

    // delete a specific part based on an id

    app.delete('/parts/:id', async(req,res) => {
      const id = Number(req.params.id);
      const partRepository = ServerData.getRepository(Part);
      const part = await partRepository.findOneBy({
        partId: id
      });

      if(!part)
      {
        res.status(404).json({
          message: `Part with ID ${id} not found`
        });
      }
      else
      {
        await partRepository.delete({ partId: id });
        res.json({
          message: `Part with ID ${id} has been deleted`
        });
      }
    });

    //================================= PERMISSION LEVEL =================================
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

/*  // update a specific permission level based on an id
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
    });*/

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

    // get all roles
    app.get('/roles', async(req,res) => {
      const roles = await ServerData.getRepository(Roles).find();
      res.json(roles);
    });

    // get role by id
    app.get('/roles/:id', async(req,res) => {
      const id = Number(req.params.id);

      const role = await ServerData.getRepository(Roles).findOneBy({
        roleId: id
      });

      if (!role) {
        res.status(404).json({
          message: `Role with ID ${id} not found`
        });
      } else {
        res.json(role);
      }
    });

    // update a specific role based on an id
    app.put('/roles/:id', async(req,res) => {
      const id = Number(req.params.id);
      const roleData = req.body;

      const roleRepository = ServerData.getRepository(Roles);
      const role = await roleRepository.findOneBy({
        roleId: id
      });

      if (!role) {
        res.status(404).json({
          message: `Role with ID ${id} not found`
        });
      } else {
        role.roleId = roleData.roleId;
        role.roleTitle = roleData.roleTitle;

        await roleRepository.save(role);
        res.json(role);
      }
    });

    // delete a specific role based on an id
    app.delete('/roles/:id', async(req,res) => {
      const id = Number(req.params.id);
      const roleRepository = ServerData.getRepository(Roles);
      const role = await roleRepository.findOneBy({
        roleId: id
      });

      if (!role) {
        res.status(404).json({
          message: `Role with ID ${id} not found`
        });
      } else {
        await roleRepository.delete(role);
        res.json({
          message: `Role with ID ${id} has been deleted`
        });
      }
    });

    // create a new role
    app.post('/roles', async(req,res) => {
      const roleData = req.body;

      const roleRepository = ServerData.getRepository(Roles);
      const newRole = roleRepository.create({
        roleId: roleData.roleId,
        roleTitle: roleData.roleTitle
      });

      await roleRepository.save(newRole);
      res.json(newRole);
    });

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

    //================================= IGNORE THIS BUT DON'T DELETE =================================
    app.put('/emp-info', async(req, res) => {
      const [thisUsername, thisPassword] = req.body;
      try {
        const user = await ServerData.getRepository(Employee).findOneBy({
          username: thisUsername
        });

        if (user) {
          const valid = bcrypt.compareSync(thisPassword + PEPPER, user.password);
          if(valid) {
            res.json({
              validLogin: true,
              empId: user.employeeID
            });
          }
          else{
            res.json({
              validLogin: false,
              empId: null
            });
          }
        } else {
          res.json({
            validLogin: false,
            empId: null
          });
        }
      }
      catch(e) {
        console.log(e);
        res.status(500).json({
          validLogin: false,
          empId: null,
          error: 'Internal Server Error'
        });
      }
    });


    // Employees can only view employees at their own plant - DONE
    app.get('/myplantemployees/:id', async(req, res) => {
      // GET EMPLOYEE BY ID
      const id = Number(req.params.id);
      let plantIdentification: number | undefined;

      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
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
        plantIdentification = employee.plantID;
        /*res.json(plantIdentification);*/
      }

      // GET EMPLOYEES BY PLANT ID
      if(plantIdentification) {
        const employees = await ServerData.getRepository(Employee).find({
          where: {
            plantID: plantIdentification
          },
          select: ["employeeID", "firstName", "lastName", "email", "phoneNum", "plantID", "roleID", "departmentID"]
        });
        if(!employees)
        {
          res.status(404).json({
            message: 'Employees not found from this plant'
          })
        }
        else{
          res.json(employees);
        }
      }
    });

    // Employees can view only their plant - DONE
    app.get('/myplant/:id', async(req, res) => {
      // GET EMPLOYEE BY ID
      const id = Number(req.params.id);
      let plantIdentification: number | undefined;

      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
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
        plantIdentification = employee.plantID;
        /*res.json(plantIdentification);*/
      }

      // GET PLANTS BY PLANT ID
      if(plantIdentification) {
        const plants = await ServerData.getRepository(Plant).find({
          where: { plantId: plantIdentification }

        });
        if(!plants)
        {
          res.status(404).json({
            message: 'Plant not found'
          })
        }
        else{
          res.json(plants);
        }
      }
    });

    // Employees can only view purchased parts from their plant - DONE
    app.get('/our-purchased-parts/:id', async(req, res) => {
      // GET EMPLOYEE BY ID
      const id = Number(req.params.id);
      let plantIdentification: number | undefined;

      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
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
        plantIdentification = employee.plantID;
        /*res.json(plantIdentification);*/
      }

      // GET PURCHASED PARTS BY PLANT ID
      const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
        where: {
          plantID: plantIdentification
        }
      });

      if(!purPart)
      {
        res.status(404).json({
          message: `Purchased Parts with Plant ID ${plantIdentification} not found`
        });
      }
      else
      {
        res.json(purPart);
      }
    });

    // Employees can only view parts from their plant - DONE
    app.get('/our-parts/:id', async(req, res) => {
      // GET EMPLOYEE BY ID
      const id = Number(req.params.id);
      let plantIdentification: number | undefined;

      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
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
        plantIdentification = employee.plantID;
        /*res.json(plantIdentification);*/
      }

      // GET PURCHASED PARTS BY PLANT ID
      const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
        where: {
          plantID: plantIdentification
        }
      });

      if(!purPart)
      {
        res.status(404).json({
          message: `Purchased Parts with Plant ID ${plantIdentification} not found`
        });
      }
      else
      {
        const partIDs: number[] = purPart.map((part) => part.partID);
        /*res.json(purPart);*/
        const parts: Part[] | null = await ServerData.getRepository(Part).find({
          where: {
            partId: In(partIDs)
          }
        });

        if (!parts) {
          res.status(404).json({
            message: `Parts with Plant ID ${plantIdentification} not found`
          });
        }
        else{
          res.json(parts);
        }
      }
    });

    // Employees can only view vendors that supplied parts in their plant - DONE
    app.get('/our-vendors/:id', async(req, res) => {
      // GET EMPLOYEE BY ID
      const id = Number(req.params.id);
      let plantIdentification: number | undefined;

      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
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
        plantIdentification = employee.plantID;
        /*res.json(plantIdentification);*/
      }

      // GET PURCHASED PARTS BY PLANT ID
      const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
        where: {
          plantID: plantIdentification
        }
      });

      if(!purPart)
      {
        res.status(404).json({
          message: `Purchased Parts with Plant ID ${plantIdentification} not found`
        });
      }
      else
      {
        const partIDs: number[] = purPart.map((part) => part.partID);
        /*res.json(purPart);*/
        const parts: Part[] | null = await ServerData.getRepository(Part).find({
          where: {
            partId: In(partIDs)
          }
        });

        if (!parts) {
          res.status(404).json({
            message: `Parts with Plant ID ${plantIdentification} not found`
          });
        }
        else{
          /*res.json(parts);*/
            const vendorIDs: (number | null)[] = parts.map((part) => part.vendorId);
            const vendors: Vendor[] | null = await ServerData.getRepository(Vendor).find({
              where: {
                vendorID: In(vendorIDs)
              }
            });

            if(!vendors)
            {
              res.status(404).json({
                message: `Vendors with Plant ID ${plantIdentification} not found`
              });
            }
            else{
              res.json(vendors);
            }
        }
      }
    });

    // Employees can only view their own role - DONE
    app.get('/my-role/:id', async(req, res) => {
      const id = Number(req.params.id);
      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
        employeeID: id
      });
      if(!employee)
      {
        res.status(404).json({
            message: `Employee with ID ${id} not found`
        });
      }
      else{
        const emp_roleID = employee.roleID;
        const role: Roles | null = await ServerData.getRepository(Roles).findOneBy({
          roleId: emp_roleID
        });

        if(!role)
        {
          res.status(404).json({
            message: `Role with ID ${emp_roleID} not found`
          });
        }
        else{
          res.json([role]);
        }
      }

    });


    // Employees can only view their own permission level - DONE
    app.get('/my-permission-level/:id', async(req, res) => {
      const id = Number(req.params.id);
      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
        employeeID: id
      });
      if(!employee)
      {
        res.status(404).json({
          message: `Employee with ID ${id} not found`
        });
      }
      else{
        const emp_roleID = employee.roleID;
        const role: Roles | null = await ServerData.getRepository(Roles).findOneBy({
          roleId: emp_roleID
        });

        if(!role)
        {
          res.status(404).json({
            message: `Role with ID ${emp_roleID} not found`
          });
        }
        else{
          /*res.json([role]);*/
            const role_permissionLevelID = role.permissionLevelId;
            const permissionLevel: PermissionLevel | null = await ServerData.getRepository(PermissionLevel).findOneBy({
              permissionLevelID: role_permissionLevelID
            });

            if(!permissionLevel)
            {
              res.status(404).json({
                message: `Permission Level with ID ${role_permissionLevelID} not found`
              });
            }
            else{
              res.json([permissionLevel]);
            }
        }
      }

    });

    // Employees can view departments with employees from their plant.
    app.get('/our-departments/:id', async(req, res) => {
      const id = Number(req.params.id);
      let plantid: number | undefined;

      const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
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
        plantid = employee.plantID;
        if(plantid) {
          const departments: Department[] = await ServerData.getRepository(Department).find({
              where: {plantID: plantid}
          });

            if(!departments)
            {
                res.status(404).json({
                message: 'Department not found'
                })
            }
            else{
                res.json(departments);
            }
        }
      }
    });
  })
  .catch((error)=>{
    console.error("Error during data source initialization", error);
  });



