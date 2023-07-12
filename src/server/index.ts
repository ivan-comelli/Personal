import bodyParser from 'body-parser';
import express from 'express';
import workPlanRoutes from './routes/workPlan';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();

// Configura el servidor para servir los archivos estáticos de la aplicación CRA

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para agregar el encabezado CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api", workPlanRoutes);

app.listen(process.env.REACT_APP_SERVER_PORT);

export default app;