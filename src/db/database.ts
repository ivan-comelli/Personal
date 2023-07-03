import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: "./src/db/database.sqlite" 
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos SQLite establecida correctamente');
  })
  .catch((error: any) => {
    console.error('Error al conectar a la base de datos:', error);
  });

export default sequelize;
