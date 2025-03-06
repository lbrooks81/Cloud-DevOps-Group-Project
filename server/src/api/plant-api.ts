import {ServerData} from '../data-source';
import {Plant} from '../entities/plant';
import {app} from '../server';
import {Employee} from "../entities/employee";
export {plantRequests};

async function plantRequests() {
    //================================= PLANT =================================
    // get all plants
    // BUTTS
    app.get('/plants', async (req, res) => {
        try {
            const plants = await ServerData.getRepository(Plant).find();
            res.json(plants);
        }
        catch (e) {
            res.status(500).json({
                message: "Error getting all plants"
            });
        }
    });

    // get plant by id
    // BUTTS
    app.get('/plants/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error getting plant by ID"
            });
        }
    });

    // update a specific plant based on an id
    // BUTTS
    app.put('/plants/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error updating plant by ID"
            });
        }
    });

    // delete a specific plant based on an id
    // BUTTS
    app.delete('/plants/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error deleting plant by ID"
            });
        }
    });

    // create a new plant
    // BUTTS
    app.post('/plants', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating plant"
            });
        }
    });

    // Employees can view only their plant
    // BUTTS
    app.get('/myplant/:id', async (req, res) => {
        try {
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
        }
        catch (e) {
            res.status(500).json({
                message: "Error getting plant by ID"
            });
        }
    });

}