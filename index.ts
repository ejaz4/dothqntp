import express from 'express';
import { resolve } from 'path';

import backgrounds from './backgrounds';

const app = express();

const port = process.env.PORT || 1337;

app.set('view engine', 'pug');

app.use(express.static(resolve(__dirname, "static")))

app.get("/*", (req, res) => {
    const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    res.render("index", { data: { bg } })
})

app.listen(port, () => {
    console.log(`Started NTP at http://127.0.0.1:${port}`)
})