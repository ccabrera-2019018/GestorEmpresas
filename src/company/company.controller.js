'use strict'

import Company from './company.model.js';
import ExcelJS from 'exceljs';

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const save = async (req, res) => {
    try {
        //Capturar formulario
        let data = req.body
        //Guardar info en DB
        let company = new Company(data)
        await company.save()
        //Responder
        return res.send({ message: `${company.name} correctly registered` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering company' })
    }

}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = rq.body
        let update = (data, id)
        if (!update) return res.status(400).send({ message: 'Have submit some data that cannot be update or missing data' })
        let updatedCompany = await Company.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedCompany) return res.status(401).send({ message: 'Company not found and not updated' })
        return res.send({ message: 'Updated company', updatedCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating company' })
    }
}

export const showCompanys = async (req, res) => {
    try {
        let results = await Company.find()
        if (!results) return res.status(400).send({ message: 'Empty colleection' })
        return res.send({ results })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Nothing to show' })
    }
}

export const createExel = async (req, res) => {
    try {

        // Manda a llamar a los datos guardados de compañia
        const companies = await Company.find();

            // Si no se encuentran compañias las cuales agregar al excel, se enviara un mensaje
        if (companies.length === 0) {
            return res.status(404).send({ message: 'No companies found to export' });
        }
        // Crea un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        // Crea una nueva hoja de excel llamada Companies
        const worksheet = workbook.addWorksheet('Companies');

        // Crea las columnas Junto con la descripcion que llevara cada una
        worksheet.columns = [
            // El header indica el texto que llevara la columna, el key es la forma de identificar a la columna y el width le asigna un tamaño
            { header: 'Nombre de la Empresa', key: 'companyName', width: 30 },
            { header: 'Descripcion', key: 'companyDescription', width: 50 },
            { header: 'Contacto', key: 'companyContact', with: 15},
            { header: 'Nivel de Impacto', key: 'levelOfImpact', width: 15 },
            { header: 'Trayectoria', key: 'trayectory', width: 15 },
            { header: 'Categoria', key: 'category', width: 20 },
        ];

        // Usando la funcion de iteracion forEcah, recorre el arreglo llamado company
        companies.forEach((company) => {
            // Agrega una columna por cada grupo de datos que el forEach posea, este contiene y manda a llamar a los atributos de las empresas
            worksheet.addRow({
                companyName: company.name,
                companyDescription: company.description,
                companyContact: company.contact,
                levelOfImpact: company.impactLevel,
                trayectory: company.yearsOfExperience,
                category: company.businessCategory,
            });
        });

        // Genera el nombre para el Excel(se usa el Date.now() para que este le agregue la fecha exacta al nombre del archivo ya que esta es unica al llevar incluidos los segundos)
        const filename = `Compañias_${Date.now()}.xlsx`

        // Guarda el archivo Excel
        await workbook.xlsx.writeFile(filename);

        return res.send({ message: 'The Excel has been created succesfully', filename });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error exporting to Excel' });
    }
}

//Filtro por experiencia
export const getExperiences = async(req, res) => {
    try {
        //Obtener el parametro de busqueda
        let { search } = req.body
        //Buscar
        let company = await Company.find(
            {yearsOfExperience: search}
        )
        //Validar la respuesta
        if(!company) return res.status(404).send({message: 'Category not found'})
        //Responder
        return res.send({message: 'Company found', company})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Companies not found'})
    }
}

//Filtro de A-Z y Z-A
export const getCompany = async(req, res) => {
    try {
        let { search } = req.body
        if(search == 'ascendente') {
            //Obtener todas las empresas en orden A-Z
            let company = await Company.find().sort({ name: 1 })

            return res.send({ company })
        }else if (search == 'descendente') {
            let company = await Company.find().sort({ name: -1 })

            return res.send({ company })
        }else{
            return res.status(400).send({message: 'Invalid words, please write the correct word'})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Companies not found'})
    }
}

//Filtro por categoria
export const getCategory = async(req, res) => {
    try {
        //Obtener el parametro de busqueda
        let { search } = req.body
        //Buscar
        let company = await Company.find(
            {businessCategory: search}
        )
        //Validar la respuesta
        if(!company) return res.status(404).send({message: 'Category not found'})
        //Responder
        return res.send({message: 'Company found', company})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Companies not found'})
    }
}