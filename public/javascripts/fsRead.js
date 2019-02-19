'use strict';

const fs = require('fs');
const file = 'real18-19.csv';
let data = fs.readFileSync(file);

let Data = data;

module.exports = Data;