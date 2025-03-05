import {ServerData} from '../data-source';
import {Department} from '../entities/department';
import {app} from '../server';
export {departmentRequests};
import {Employee} from '../entities/employee';

async function departmentRequests(){
    // get all departments
    // BUTTS
    app.get('/departments', async (req, res)=> {
        try{
            const departments = await ServerData.getRepository(Department).find();
            res.json(departments);
        }
        catch(e){
            res.status(500).json({
                message: "Error getting departments from database"
            });
        }
    });

    // get department by id
    // BUTTS
    app.get('/departments/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: `Error getting this department from database`
            });
        }
    });

    // update a specific department based on an id
    // BUTTS
    app.put('/departments/:id', async (req, res) => {
        try {
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

                await departmentRepository.save(department);

                res.json(department);
            }
        }
        catch (e) {
            res.status(500).json({
                message: `Error updating this department`
            });
        }
    });

    // delete a specific department based on an id
    // BUTTS
    app.delete('/departments/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const department = await ServerData.getRepository(Department).findOneBy({
                departmentId: id
            });

            if (!department) {
                res.status(404).json({
                    message: `Department with ID ${id} not found`
                });
            } else {
                await ServerData.getRepository(Department).delete(department);
                res.json({
                    message: `Department with ID ${id} has been deleted`
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: `Error deleting this department...Employees may still work here`
            });
        }
    });

    // create a new department
    // BUTTS
    app.post('/departments', async (req, res) => {
        try {
            const departmentData = req.body;


            const departmentRepository = ServerData.getRepository(Department);
            const newDepartment = departmentRepository.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName,
                employeeID: departmentData.employeeID,
            });

            await departmentRepository.save(newDepartment);

            res.json(newDepartment);
        }
        catch (e) {
            res.status(500).json({
                message: `Error creating this department`
            });
        }
    });


    // Employees can view departments with employees from their plant.
    // BUTTS
    app.get('/our-departments/:id', async (req, res) => {
        try {
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
                plantid = employee.departmentID;
                if (plantid) {
                    const departments: Department[] = await ServerData.getRepository(Department).find({
                        where: {departmentId: plantid}
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
        }
        catch (e) {
            res.status(500).json({
                message: `Error getting this department from database`
            });
        }
    });
}