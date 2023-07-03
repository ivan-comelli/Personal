import workPlanRoutes from './src/routes/workPlan';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = 3001; // Elige el puerto que desees utilizar

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura las rutas de tu API aquí
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.0.100:3000']
}))
app.use(workPlanRoutes);

// Configura el servidor para servir los archivos estáticos de la aplicación CRA
app.use(express.static('build'));

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
