const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // cambia si tienes contraseña
    database: 'bd_crud'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

// CRUD
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0] || {});
    });
});

app.post('/users', (req, res) => {
    const { nombres, apellidos, carnet, direccion, email } = req.body;
    db.query(
        'INSERT INTO users (nombres, apellidos, carnet, direccion, email) VALUES (?, ?, ?, ?, ?)',
        [nombres, apellidos, carnet, direccion, email],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, nombres, apellidos, carnet, direccion, email });
        }
    );
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, carnet, direccion, email } = req.body;
    db.query(
        'UPDATE users SET nombres = ?, apellidos = ?, carnet = ?, direccion = ?, email = ? WHERE id = ?',
        [nombres, apellidos, carnet, direccion, email, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Usuario actualizado' });
        }
    );
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Usuario eliminado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
