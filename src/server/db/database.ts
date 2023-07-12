require('pg');
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const database = process.env.POSTGRES_DATABASE || '';
const username = process.env.POSTGRES_USER || '';
const password = process.env.POSTGRES_PASSWORD || '';
const host = process.env.POSTGRES_HOST;
const port = parseInt(process.env.POSTGRES_PORT || '');

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Puedes cambiar esto según tus necesidades de seguridad
    }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((error: any) => {
    console.error('Error al conectar a la base de datos:', error);
  });

export default sequelize;
