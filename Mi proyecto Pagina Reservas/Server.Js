const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'tu_servidor',
    database: 'HotelDB',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

async function insertarReserva(reserva) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Nombre', sql.NVarChar, reserva.nombre)
            .input('Apellido', sql.NVarChar, reserva.apellido)
            .input('Email', sql.NVarChar, reserva.email)
            .input('Telefono', sql.NVarChar, reserva.telefono)
            .input('Fecha', sql.Date, reserva.fecha)
            .input('Hora', sql.Time, reserva.hora)
            .input('Personas', sql.Int, reserva.personas)
            .input('Mensaje', sql.NVarChar, reserva.mensaje)
            .query('INSERT INTO Reservas (Nombre, Apellido, Email, Telefono, Fecha, Hora, Personas, Mensaje) VALUES (@Nombre, @Apellido, @Email, @Telefono, @Fecha, @Hora, @Personas, @Mensaje)');
        console.log('Reserva insertada con éxito:', result);
    } catch (err) {
        console.error('Error al insertar la reserva:', err);
    }
}

app.post('/api/reservar', async (req, res) => {
    console.log('Datos recibidos:', req.body);  // Imprime los datos recibidos en la consola

    try {
        await insertarReserva(req.body);
        res.json({ message: 'Reserva realizada con éxito.' });
    } catch (err) {
        console.error('Error al procesar la reserva:', err);
        res.status(500).json({ message: 'Hubo un error al realizar la reserva.' });
    }
});