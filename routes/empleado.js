const express = require('express');
const jwt = require('jsonwebtoken');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/signin", async (req, res, next) => {
    const { nombre, apellidos, telefono,correo_electronico,direccion,clave } = req.body;
    if (id_empleado && nombre && apellidos && telefono && correo_electronico && direccion && clave) {
        let query = "INSERT INTO empleado (nombre, apellidos, telefono,correo_electronico,direccio,clave) ";
        query += `VALUES ('${id_empleado}','${nombre}','${apellidos}','${telefono}','${correo_electronico}','${direccion}','${clave}');`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});

empleado.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body;
    let query = `SELECT * FROM user WHERE user_mail= '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);
    if (user_mail && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail:rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } 
        else {
            return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(500).json({code: 500, message: "Campos Incompletos"});
});

empleado.get("/", async (req, res, next) => {
    const query = "SELECT * FROM user;";
    const rows = await db.query(query);
    return res.status(200).json({ code: 200, message: rows });
});



module.exports = user;


//CAMBIAR SENTENCIAS SQL
