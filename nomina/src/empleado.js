import express, { response } from "express";

import conexion from "./conexion.js";


let empleado = express.Router();


empleado.get("/verEmpleados", async (req, res) => {
    const consulta = "SELECT * FROM empleado ORDER BY direccion DESC";

    try {
        let [resultado] = await conexion.query(consulta);
        
        if (resultado.lenght < 1) {
            res.status(200).send({
                estado: "Ok",
                data: "No hay empleados para mostrar"
            })
        }
        else {
             res.status(200).send({
                estado: "OK",
                data: resultado
            })
        }
    }
    catch (err) {
        res.status(500).send({
            estado: "Error",
            error: err
        })
    }
});



empleado.put("/actulizarEmpleado/:codigo", async (req, res) => {
    try {
        let codigo = req.params.codigo
        let datosEmpleado = {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            email: req.body.email,
            telefono: req.body.telefono,
            fecha_nacimiento: req.body.fecha,
            estado: req.body.estado
        }

        let consulta = "UPDATE empleado SET ? WHERE codigo = ?";

        let [resultado] = await conexion.query(consulta, [datosEmpleado, codigo]);

        res.status(200).send({
            estado: "OK",
            data: resultado
        })
    }
    catch (err) {
        res.status(500).send({
            estado: "Error",
            error: err
        })
    }
});


empleado.post("/agregarEmpleado", async (req, res) => {
    try {
        
        let datosEmpleado = {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            email: req.body.email,
            telefono: req.body.telefono,
            fecha_nacimiento: req.body.fecha,
            estado: req.body.estado
        }

        let consulta = "INSERT INTO empleado SET ?";

        let [resultado] = await conexion.query(consulta, [datosEmpleado]);

        res.status(200).send({
            estado: "OK",
            data: resultado
        })
    }
    catch (err) {
        res.status(500).send({
            estado: "Error",
            error: err
        })
    }
});



empleado.get("/buscarEmpleado/:nombre", async (req, res) => {
    try {
        let nombre = req.params.nombre;

        let consulta = "SELECT * FROM empleado WHERE nombre = ?";
        let [resultado] = await conexion.query(consulta, [nombre]);

        if (resultado.lenght ==0) {
            res.status(200).send({
                estado: "Ok",
                data: "No hay empleados llamados " + nombre
            })
        }
        else {
             res.status(200).send({
                estado: "OK",
                data: resultado
            })
        }
    }
    catch (err) {
         res.status(500).send({
            estado: "Error",
            error: err
        })
    }
})


empleado.delete("/eliminarEmpleado/:codigo", async (req, res) => {
    try {
        let codigo = req.params.codigo;
        let consulta = "DELETE FROM empleado WHERE codigo = ?";
        let [resultado] = await conexion.query(consulta, [codigo]);

        res.status(200).send({
            estado: "OK",
            data: resultado
        })

    }
    catch (err) {
        res.status(500).send({
            estado: "Error",
            error: err
        })
    }
})




export default empleado;