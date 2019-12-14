const storage = require('node-persist');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


async function start() {
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    };
    await storage.init();
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({extended: false}));
    app.post('/', async (req, res) => {
        console.log(req.body.url);
        let counter = 1;
        if (!await storage.getItem(req.body.url)) {
            await storage.setItem(req.body.url, counter);
        } else {
            counter = await storage.getItem(req.body.url);
            await storage.setItem(req.body.url, ++counter);
        }
        res.status(200).json(counter);
    });

    app.get('/', async (req, res) => {
        console.log(req.query.url);
        const result = !(await storage.getItem(req.query.url)) ? 0 : await storage.getItem(req.query.url);
        res.status(200).json(result);
    });
    app.listen(12345);
}

start();
