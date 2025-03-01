import {ServerData} from '../data-source';
import {Department} from '../entities/department';
import {app} from '../server';
export {departmentRequests};
import {Employee} from '../entities/employee';

async function departmentRequests(){
    // get all departments
    app.get('/departments', async (req, res)=> {
        const departments = await ServerData.getRepository(Department).find();
        res.json(departments);
    });

    // get department by id
    app.get('/departments/:id', async (req, res) => {
        const id = Number(req.params.id);
        console.log(id);

        const department = await ServerData.getRepository(Department).findOneBy({
            departmentId: id
        });

        if (!department) {
            res.status(404).json({
                message: `Department with ID ${id} not found`
            });
        } else {
            res.json(department);
        }
    });

    // update a specific department based on an id

    app.put('/departments/:id', async (req, res) => {
        const id = Number(req.params.id);
        const departmentData = req.body;

        const departmentRepository = ServerData.getRepository(Department);
        const department = await departmentRepository.findOneBy({
            departmentId: id
        });

        if (!department) {
            res.status(404).json({
                message: `Department with ID ${id} not found`
            });
        } else {
            department.departmentName = departmentData.departmentName;
            department.employeeID = departmentData.employeeID;
            department.plantID = departmentData.plantID;

            await departmentRepository.save(department);

            res.json(department);
        }
    });

    // delete a specific department based on an id

    app.delete('/departments/:id', async (req, res) => {
        const id = Number(req.params.id);
        const departmentRepository = ServerData.getRepository(Department);
        const department = await departmentRepository.findOneBy({
            departmentId: id
        });

        if (!department) {
            res.status(404).json({
                message: `Department with ID ${id} not found`
            });
        } else {
            await departmentRepository.delete(department);
            res.json({
                message: `Department with ID ${id} has been deleted`
            });
        }
    });

    // create a new department

    app.post('/departments', async (req, res) => {
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


    // Employees can view departments with employees from their plant.
    app.get('/our-departments/:id', async (req, res) => {
        const id = Number(req.params.id);
        let plantid: number | undefined;

        const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
            employeeID: id
        });

        if (!employee) {
            res.status(404).json({
                message: `Employee with ID ${id} not found`
            });
        } else {
            plantid = employee.plantID;
            if (plantid) {
                const departments: Department[] = await ServerData.getRepository(Department).find({
                    where: {plantID: plantid}
                });

                if (!departments) {
                    res.status(404).json({
                        message: 'Department not found'
                    })
                } else {
                    res.json(departments);
                }
            }
        }
    });
}