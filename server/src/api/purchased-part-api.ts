import {ServerData} from '../data-source';
import {PurchasedPart} from '../entities/purchased-part';
import {app} from '../server';
export {purchasedPartRequests};
import {Employee} from '../entities/employee';

async function purchasedPartRequests() {
    // get all purchased parts
    // BUTTS
    app.get('/purchased-parts', async (req, res) => {
        try {
            const purchasedParts = await ServerData.getRepository(PurchasedPart).find();
            res.json(purchasedParts);
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching all purchased parts"
            });
        }
    });

    // get purchased part by composite key {partID, plantID}
    // BUTTS
    app.get('/purchased-parts/:partID/:plantID', async (req, res) => {
        try {
            const partID = Number(req.params.partID);
            const plantID = Number(req.params.plantID);

            const purchasedPart = await ServerData.getRepository(PurchasedPart).findOneBy({
                partID: partID,
                plantID: plantID
            });

            if (!purchasedPart) {
                res.status(404).json({
                    message: `Purchased Part with Part ID ${partID} and Plant ID ${plantID} not found`
                });
            } else {
                res.json(purchasedPart);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching purchased part by ID"
            });
        }
    });

    // update a specific purchased part based on an id
    // BUTTS
    app.put('/purchased-parts/:partID/:plantID', async (req, res) => {
        try {
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
            } else {
                purchasedPart.plantID = purchasedPartData.plantID;
                purchasedPart.partID = purchasedPartData.partID;
                purchasedPart.date = purchasedPartData.date;

                await purchasedPartRepository.save(purchasedPart);
                res.json(purchasedPart);
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error updating purchased part by ID"
            });
        }
    });

    // delete a specific purchased part based on an id
    // BUTTS
    app.delete('/purchased-parts/:partID/:plantID', async (req, res) => {
        try {
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
            } else {
                await purchasedPartRepository.delete(purchasedPart);
                res.json({
                    message: `Purchased Part with partID ${partID} and plantID ${plantID} has been deleted`
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Error deleting purchased part by ID"
            });
        }
    });

    // create a new purchased part
    // BUTTS
    app.post('/purchased-parts', async (req, res) => {
        try {
            const purchasedPartData = req.body;

            const purchasedPartRepository = ServerData.getRepository(PurchasedPart);
            const newPurchasedPart = purchasedPartRepository.create({
                plantID: purchasedPartData.plantID,
                partID: purchasedPartData.partID,
                date: purchasedPartData.date
            });

            await purchasedPartRepository.save(newPurchasedPart);
            res.json(newPurchasedPart);
        }
        catch (e) {
            res.status(500).json({
                message: "Error creating purchased part"
            });
        }
    });

    // Employees can only view purchased parts from their plant - DONE
    // BUTTS
    app.get('/our-purchased-parts/:id', async (req, res) => {
        try {
            // GET EMPLOYEE BY ID
            const id = Number(req.params.id);
            let plantIdentification: number | undefined;
            let found = true;

            const employee: Employee | null = await ServerData.getRepository(Employee).findOneBy({
                employeeID: id
            });
            let message;

            if (!employee) {
                found = false;
                message = `Employee with ID ${id} not found`;

/*                res.status(404).json({
                    message: message
                });*/
            } else {
                plantIdentification = employee.plantID;

                // GET PURCHASED PARTS BY PLANT ID
                const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
                    where: {
                        plantID: plantIdentification
                    }
                });

                if (!purPart) {
                    found = false;
                    message = `Purchased Parts with Plant ID ${plantIdentification} not found`
                    /*                res.status(404).json({
                                        message: `Purchased Parts with Plant ID ${plantIdentification} not found`
                                    });*/
                } else {
                    message = purPart;
                    /*res.json(purPart);*/
                }
            }

            if (found) {
                res.json(message);
            } else {
                res.status(404).json({
                    message: message
                });
            }




        }
        catch (e) {
            res.status(500).json({
                message: "Error fetching purchased parts by plant ID"
            });
        }
    });
}