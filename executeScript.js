const mysql = require('mysql2/promise');
const fs = require('fs');

async function executeScript() {
    try {
        // Crear conexión sin especificar base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
        });

        // Leer el script SQL
        const sql = fs.readFileSync('./src/db/script.sql', 'utf8');
        
        // Dividir el script en sentencias individuales
        const statements = sql.split(';').filter(stmt => stmt.trim());

        // Ejecutar cada sentencia
        for (const statement of statements) {
            if (statement.trim()) {
                console.log(`Ejecutando: ${statement.substring(0, 50)}...`);
                try {
                    await connection.query(statement);
                    console.log('✓ Ejecutado correctamente');
                } catch (error) {
                    console.error('✗ Error:', error.message);
                }
            }
        }

        await connection.end();
        console.log('\n✓ Script ejecutado completamente');
    } catch (error) {
        console.error('Error al ejecutar script:', error);
        process.exit(1);
    }
}

executeScript();
