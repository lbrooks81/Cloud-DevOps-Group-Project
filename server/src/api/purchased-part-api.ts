import {ServerData} from '../data-source';
import {PurchasedPart} from '../entities/purchased-part';
import {app} from '../server';
export {purchasedPartRequests};
import {Employee} from '../entities/employee';

async function purchasedPartRequests() {
    // get all purchased parts
    app.get('/purchased-parts', async (req, res) => {
        const purchasedParts = await ServerData.getRepository(PurchasedPart).find();
        res.json(purchasedParts);
    });

    // get purchased part by composite key {partID, plantID}
    app.get('/purchased-parts/:partID/:plantID', async (req, res) => {
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
    });

    // update a specific purchased part based on an id
    app.put('/purchased-parts/:partID/:plantID', async (req, res) => {
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
    });

    // delete a specific purchased part based on an id
    app.delete('/purchased-parts/:partID/:plantID', async (req, res) => {
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
    });

    // create a new purchased part
    app.post('/purchased-parts', async (req, res) => {
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

    // Employees can only view purchased parts from their plant - DONE
    app.get('/our-purchased-parts/:id', async (req, res) => {
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

        // GET PURCHASED PARTS BY PLANT ID
        const purPart: PurchasedPart[] | null = await ServerData.getRepository(PurchasedPart).find({
            where: {
                plantID: plantIdentification
            }
        });

        if (!purPart) {
            res.status(404).json({
                message: `Purchased Parts with Plant ID ${plantIdentification} not found`
            });
        } else {
            res.json(purPart);
        }
    });

}