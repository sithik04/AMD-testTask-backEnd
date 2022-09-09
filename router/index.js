// var express = require('express');
import express from 'express';
import weatherController from "../src/controller/weatherController.js"
import smsController from "../src/controller/smsController.js"

const routes = express.Router();

routes.get("/getWeather", weatherController.getWeather)
routes.post("/sendSms", smsController.sendSms)

export default routes;
