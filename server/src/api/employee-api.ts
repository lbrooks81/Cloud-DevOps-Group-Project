import {ServerData} from '../data-source';
import {Employee} from '../entities/employee';
import {app, PEPPER} from '../server';
import bcrypt from "bcrypt";
export {employeeRequests};

async function employeeRequests() {
//================================= EMPLOYEE =================================
    // get all employees
    // BUTTS
    app.get('/employees', async (req, res) => {
        try {
            const employees = await ServerData.getRepository(Employee).find();
            res.status(200).json(employees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    // get employee by id
    // BUTTS
    app.get('/employees/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const employee = await ServerData.getRepository(Employee).findOneBy({
                employeeID: id
            });

            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            } else {
                res.json(employee);
            }
        } catch (error) {
            console.error(`Error fetching employee with ID ${req.params.id}:`, error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    // update a specific employee based on an id
    // BUTTS
    app.put('/employees/:id', async (req, res) => {
            try {
                const id = Number(req.params.id);
                const employeeData = req.body;

                const employeeRepository = ServerData.getRepository(Employee);
                const employee = await employeeRepository.findOneBy({
                    employeeID: id
                });

                if (!employee) {
                    res.status(404).json({
                        message: `Employee with ID ${id} not found`
                    });
                } else {
/*
                    let bcryptPassword = bcrypt.hashSync(employeeData.password + PEPPER, 5);
*/

                    employee.employeeID = employeeData.employeeID;
                    employee.firstName = employeeData.firstName;
                    employee.lastName = employeeData.lastName;
                    employee.email = employeeData.email;
                    employee.username = employeeData.username;
                    employee.password = "password";
                    employee.phoneNum = employeeData.phoneNum;
                    employee.plantID = employeeData.plantID;
                    employee.roleID = employeeData.roleID;
                    employee.departmentID = employeeData.departmentID;

                    await employeeRepository.save(employee);

                    res.json(employee);
                }
            } catch (error) {
                console.error(`Error updating employee with ID ${req.params.id}:`, error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });

    // delete a specific employee based on an id
    // BUTTS
    app.delete('/employees/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const employeeRepository = ServerData.getRepository(Employee);
            const employee = await employeeRepository.findOneBy({
                employeeID: id
            });

            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            } else {
                await employeeRepository.delete(employee);
                res.json({
                    message: `Employee with ID ${id} has been deleted`
                });
            }
        } catch (error) {
            console.error(`Error deleting employee with ID ${req.params.id}:`, error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    // create a new employee
    // BUTTS
    app.post('/employees', async (req, res) => {
            try {
                const employeeData = req.body;
                const bcryptPassword = bcrypt.hashSync(employeeData.password + PEPPER, 5);
                const employeeRepository = ServerData.getRepository(Employee);
                const newEmployee = employeeRepository.create({
                    employeeID: employeeData.employeeID,
                    firstName: employeeData.firstName,
                    lastName: employeeData.lastName,
                    email: employeeData.email,
                    username: employeeData.username,
                    password: bcryptPassword,
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

    // Validates employee login and returns employee ID
    // BUTTS
    app.put('/emp-info', async (req, res) => {
        try {
            const { thisUsername, thisPassword } = req.body;
            let vl;
            let empId;
            const user = await ServerData.getRepository(Employee).findOneBy({
                username: thisUsername
            });

            if (user) {
                vl = true;
                empId = user.employeeID;

                const match = bcrypt.compareSync(thisPassword + PEPPER, user.password);
                if (!match) {
                    vl = false;
                    empId = null;
                }
            } else {
                vl = false;
                empId = null;
            }

            res.json({
                validLogin: vl,
                empId: empId
            });
        } catch (error) {
            console.error("Error validating employee login:", error);
            res.status(500).json({
                validLogin: false,
                empId: null,
                error: 'Internal Server Error'
            });
        }
    });

    // Employees can only view employees at their own plant (employee, not manager)
    // BUTTS
    app.get('/myplantemployees/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            let plantIdentification: number | undefined;

            const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
                employeeID: id
            });

            if (!employee) {
                res.status(404).json({
                    message: `Employee with ID ${id} not found`
                });
            } else {
                plantIdentification = employee.plantID;
            }

            if (plantIdentification) {
                const employees = await ServerData.getRepository(Employee).find({
                    where: {
                        plantID: plantIdentification
                    },
                    select: ["employeeID", "firstName", "lastName", "email", "phoneNum", "plantID", "roleID", "departmentID"]
                });
                if (!employees) {
                    res.status(404).json({
                        message: 'Employees not found from this plant'
                    });
                } else {
                    res.json(employees);
                }
            }
        } catch (error) {
            console.error(`Error fetching employees for plant ID ${req.params.id}:`, error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}