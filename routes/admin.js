const express = require("express");
const jwt = require("jsonwebtoken");
const admin = express.Router();
const db = require("../config/database");

admin.post("/signin", async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion, clave } = req.body;
    if (nombre && apellidos && telefono && correo && direccion && clave) {
        let query =
            "INSERT INTO administrador (nombre, apellidos, telefono,correo_electronico,direccion,clave) ";
        query += `VALUES ('${nombre}','${apellidos}','${telefono}','${correo}','${direccion}','${clave}');`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res
                .status(201)
                .json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});

admin.post("/login", async (req, res, next) => {
    const { correo_electronico, clave } = req.body;
    let query = `SELECT * FROM administrador WHERE correo_electronico= '${correo_electronico}' AND clave = '${clave}';`;
    const rows = await db.query(query);
    if (correo_electronico && clave) {
        if (rows.length == 1) {
            console.log(rows);
            const token = jwt.sign(
                {
                    id_admin: rows[0].id_admin,
                    correo_electronico: rows[0].correo_electronico,
                },
                "debugkey"
            );
            return res.status(200).json({ code: 200, message: token });
        } else {
            return res
                .status(200)
                .json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});


admin.delete(
    "/:id(\\d{1,3})/:correo([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,})/:clave([A-Za-z0-9]+)",
    async (req, res, next) => {
      console.log(req.params);
      const query = `DELETE FROM EMPLEADOS WHERE id_empleado=${req.params.id} AND correo='${req.params.correo}' AND clave='${req.params.clave}'`;
  
      try {
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
          return res
            .status(200)
            .json({ code: 200, message: "Empleado borrado correctamente" });
        }
        return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: "Error en el servidor" });
      }
    }
  );
  

/* 
admin.delete("/:id([0-9]{1,3})/:correo([A-Za-z]+)/:clave([A-Za-z]+)", async (req, res, next) => {
    console.log(req.params);
    const query = `DELETE FROM EMPLEADOS WHERE id_empleado=${req.params.id} AND correo=${req.params.correo} AND clave=${req.params.clave}`;

    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        return res
            .status(200)
            .json({ code: 200, message: "Empleado borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});
*/
/*admin.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion, clave } = req.body;
    if (nombre && apellidos && telefono && correo && direccion && clave) {
        let query = `UPDATE empleados SET ='${nombre}' ,apellidos= ${apellidos},`;
        query += `telefono= ${telefono} ,correo= ${correo}, direccion = ${direccion}, clave = ${clave} WHERE id = ${req.params.id};`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res
                .status(200)
                .json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});*/

admin.put("/modify/:id([0-9]{1,3})", async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion, clave } = req.body;
    console.log(req.body);
    if (nombre && apellidos && telefono && correo && direccion && clave) {
        let query = `UPDATE empleados SET nombre ='${nombre}' ,apellidos= '${apellidos}',`;
        query += `telefono= '${telefono}' ,correo= '${correo}', direccion = '${direccion}', clave = '${clave}' WHERE id_empleado = ${req.params.id};`;
        console.log(req.params.id);
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res
                .status(200)
                .json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

admin.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    if (req.body.nombre) {
        let query = `UPDATE empleados SET nombre='${req.body.nombre}' WHERE id = ${req.params.id};`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res
                .status(200)
                .json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});

admin.get("/", async (req, res, next) => {
    const query = "SELECT * FROM empleados;";
    const rows = await db.query(query);
    return res.status(200).json({ code: 200, message: rows });
});

admin.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name;
    const rows = await db.query('SELECT * FROM empleados WHERE nombre = ?', [name]);  
    if(rows.length > 0) {
       return  res.status(200).json({code: 200, message: pkmn});
      }
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    
  });

module.exports = admin;

//CAMBIAR SENTENCIAS SQL
