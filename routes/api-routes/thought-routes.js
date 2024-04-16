// start with importing controllers & dependencies
const route = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    create