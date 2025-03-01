import {ServerData} from '../data-source';
import {Plant} from '../entities/plant';
import {app} from '../server';
import {Employee} from "../entities/employee";
export {plantRequests};

async function plantRequests() {
    //================================= PLANT =================================
    // get all plants
    app.get('/plants', async (req, res) => {
        const plants = await ServerData.getRepository(Plant).find();
        res.json(plants);
    });

    // get plant by id
    app.get('/plants/:id', async (req, res) => {
        const id = Number(req.params.id);

        const plant = await ServerData.getRepository(Plant).findOneBy({
            plantId: id
        });

        if (!plant) {
            res.status(404).json({
                message: `Plant with ID ${id} not found`
            });
        } else {
            res.json(plant);
        }
    });

    // update a specific plant based on an id
    app.put('/plants/:id', async (req, res) => {
        const id = Number(req.params.id);
        const plantData = req.body;

        const plantRepository = ServerData.getRepository(Plant);
        const plant = await plantRepository.findOneBy({
            plantId: id
        });

        if (!plant) {
            res.status(404).json({
                message: `Plant with ID ${id} not found`
            });
        } else {
            plant.plantId = plantData.plantId;
            plant.plantAddress = plantData.plantAddress;
            plant.plantZipcode = plantData.plantZipcode;
            plant.managerID = plantData.managerID;

            await plantRepository.save(plant);
            res.json(plant);
        }
    });

    // delete a specific plant based on an id
    app.delete('/plants/:id', async (req, res) => {
        const id = Number(req.params.id);
        const plantRepository = ServerData.getRepository(Plant);
        const plant = await plantRepository.findOneBy({
            plantId: id
        });

        if (!plant) {
            res.status(404).json({
                message: `Plant with ID ${id} not found`
            });
        } else {
            await plantRepository.delete(plant);
            res.json({
                message: `Plant with ID ${id} has been deleted`
            });
        }
    });

    // create a new plant
    app.post('/plants', async (req, res) => {
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

    // Employees can view only their plant
    app.get('/myplant/:id', async (req, res) => {
        // GET EMPLOYEE BY ID
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
            /*res.json(plantIdentification);*/
        }

        // GET PLANTS BY PLANT ID
        if (plantIdentification) {
            const plants = await ServerData.getRepository(Plant).find({
                where: {plantId: plantIdentification}

            });
            if (!plants) {
                res.status(404).json({
                    message: 'Plant not found'
                })
            } else {
                res.json(plants);
            }
        }
    });

}