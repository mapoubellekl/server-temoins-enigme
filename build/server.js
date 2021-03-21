"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require('express-bearer-token');
const enigmeService_1 = require("./enigmeService");
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(bearerToken())
    .use(enigmeService_1.router);
app.listen(process.env.PORT, () => {
    console.log(`My Node App listening on port ${process.env.PORT}`);
});
