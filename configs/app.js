// Levantar servidor HTTP (express)
//ESModules
'use strict'

//Importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import categoryRoutes from '../src/category/category.routes.js'


//Configuraciones
config();
const app = express()
const port = process.env.PORT || 3056

//Configuración del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes origenes (local, remota) / politicas de acceso
app.use(helmet()) //Aplica capa de seguridad basica al servidor
app.use(morgan('dev')) //Logs de solicitudes al servidor HTTP

app.use('/user', userRoutes)
app.use('/company', companyRoutes)
app.use('/category', categoryRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${(port)}`)
}