const mysql = require('mysql2');

console.time('Tiempo de conexion: ');
//crear la conexion a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_docente',
});
console.timeEnd('Tiempo de conexion: ');

//conexion a la base de datos:
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL database!');

    //example query
    connection.query('SELECT * FROM docente', (err, results, fields) => {
        if(err) throw err;
        console.log(results);
    });
    //cerrar la conexion:
    connection.end();

})
module.exports = connection;

