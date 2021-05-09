//initial imports
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/queries');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get('/', (req, res) => {
    return res.send('Welcome to the Scratch Bling API!');
});

app.get('/backscratchers/:id', (req, res) => {
    if (req.params.id) {
        console.log("finding by id");
        const id = parseInt(req.params.id);
        console.log(`select * from backscratchers where id = ${id}`);
        db.getBackscratcherById(id)
            .then((item) => {
                return res.send(item);
            })
            .catch((err) => {
                // handle errors
                return res.status(400).send(err.message);
            });
    }
    else {
        console.log("gathering all records");
        console.log(`select * from backscratchers`);
        db.getAllBackscratchers()
            .then((items) => {
                return res.send(items);
            })
            .catch((err) => {
                // handle errors
                return res.status(400).send(err.message);
            });
    }
});

app.post('/backscratchers', (req, res) => {
    console.log("creating backscratcher");
    const { name, description, price, sizes } = req.body;
    if (!name || !description || !price || !sizes) {
        return res.status(400).send('Unable to process create request. All product details must be provided.');
    }
    else {
        let readableSizes = sizes.map(size => `'${size}'`);
        console.log(`insert into backscratchers (item_name, item_description, item_size, item_cost)
        values ('${name}','${description}', array [${readableSizes}], '${price}') returning *`);
        db.createBackscratcher(name, description, readableSizes, price)
            .then((item) => {
                return res.send({
                    "action": "created",
                    ...item
                });
            })
            .catch((err) => {
                // handle errors
                return res.status(400).send(err.message);
            });
    }
});

app.put('/backscratchers/:id', async (req, res) => {
    console.log("updating backscratcher");
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).send('Unable to process update request. Product id must be provided.');
    }
    else {
        const { name, description, price, sizes } = req.body;
        if (!name || !description || !price || !sizes) {
            return res.status(400).send('Unable to process update request. All product details must be provided.');
        }
        else {
            let readableSizes = sizes.map(size => `'${size}'`);
            console.log(`update backscratchers set item_name = '${name}', item_description = '${description}',
            item_size = array [${readableSizes}], item_cost = '${price}' where id = ${id} returning *`);
            db.updateBackscratcherById(id, name, description, readableSizes, price)
                .then((item) => {
                    return res.send({
                        "action": "updated",
                        ...item
                    });
                })
                .catch((err) => {
                    // handle errors
                    return res.status(400).send(err.message);
                });
        }
    }
});

app.delete('/backscratchers/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).send('Unable to process delete request. Product id must be provided.');
    }
    else {
        db.deleteBackscratcherById(id)
            .then((item) => {
                if (!item) {
                    return res.send('Product id does not exist.');
                }

                return res.send({
                    "action": "deleted",
                    ...item
                });
            })
            .catch((err) => {
                // handle errors
                return res.status(400).send(err.message);
            });
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log('server running on port 3000', '');
});