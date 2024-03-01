import express from "express";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { createExel, getCategory, getCompany, getExperiences, save, showCompanys, test, update } from "./company.controller.js";


const api = express.Router()

api.get('/test', [validateJwt], test)
api.post('/save', [validateJwt], save)
api.put('/update/:id', [validateJwt], update)
api.get('/showCompanys', [validateJwt], showCompanys)
api.get('/createExcel', [validateJwt], createExel)
api.get('/getCompany', [validateJwt], getCompany)
api.post('/getCategory', [validateJwt], getCategory)
api.post('/getExperiences', [validateJwt], getExperiences)

export default api