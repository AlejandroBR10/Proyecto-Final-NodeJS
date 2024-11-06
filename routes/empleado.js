const express = require('express');
const jwt = require('jsonwebtoken');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/signin", async (req, res, next) => {
    const { nombre, apellidos, telefono,correo,direccion,clave } = req.body;
    if ( nombre && apellidos && telefono && correo && direccion && clave) {
        let query = "INSERT INTO empleados (nombre, apellidos, telefono,correo,direccion,clave) ";
        query += `VALUES ('${nombre}','${apellidos}','${telefono}','${correo}','${direccion}','${clave}');`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});

empleado.post("/login", async (req, res, next) => {
    const { correo, clave } = req.body;
    let query = `SELECT * FROM empleados WHERE correo= '${correo}' AND clave = '${clave}';`;
    const rows = await db.query(query);
    if (correo && clave) {
        if (rows.length == 1) {
            const token = jwt.sign({
                id_empleado: rows[0].id_empleado,
                correo: rows[0].correo
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } 
        else {
            return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(500).json({code: 500, message: "Campos Incompletos"});
});
empleado.delete("/:id([0-9]{1,3})",async (req,res,next) => {
    const query = `DELETE FROM EMPLEADOS WHERE id=${req.params.id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
      return res.status(200).json({code: 200, message: "Pokemon borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

empleado.put("/:id([0-9]{1,3})",async (req,res,next) => {
    const { nombre, apellidos, telefono,correo,direccion,clave } = req.body;
  if(nombre && apellidos && telefono && correo && direccion && clave){
  let query = `UPDATE empleados SET ='${nombre}' ,apellidos= ${apellidos},`;
  query += `telefono= ${telefono} ,correo= ${correo}, direccion = ${direccion}, clave = ${clave} WHERE id = ${req.params.id};`;
  const rows = await db.query(query);
  if(rows.affectedRows == 1){
      return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
  }
      return res.status(500).json({code: 500, message: "Ocurrio un error"});
  }
  return res.status(500).json({code: 500, message: "Campos incompletos"});

});

empleado.patch("/:id([0-9]{1,3})",async (req,res,next) => {
  if(req.body.nombre){
  let query = `UPDATE empleados SET nombre='${req.body.nombre}' WHERE id = ${req.params.id};`;
  const rows = await db.query(query);
  if(rows.affectedRows == 1){
      return res.status(200).json({code: 200, message: "empleado actualizado correctamente"});
  }
  return res.status(500).json({code: 500, message: "Ocurrio un error"});
}
return res.status(500).json({code: 500, message: "Campos Incompletos"});
});

empleado.get("/", async (req, res, next) => {
    const query = "SELECT * FROM empleados;";
    const rows = await db.query(query);
    return res.status(200).json({ code: 200, message: rows });
});



module.exports = empleado;


//CAMBIAR SENTENCIAS SQL
