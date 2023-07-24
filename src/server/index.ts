import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

import { WorkPlanModel } from '@models/workPlan.model';
import { TaskModel, SubTaskModel } from '@models/task.model';
import { ToolModel } from '@models/tool.model';
import { SupplyModel } from '@models/supply.model';
import { FeeModel } from '@models/fee.model';
import { UniqueTitleModel } from '@models/uniqueTitle.model';
import { PurchaseListModel } from '@models/purchaseList.model';

WorkPlanModel.belongsTo(FeeModel, {
  foreignKey: 'feeId',
  as: 'fee',
});
WorkPlanModel.belongsTo(UniqueTitleModel, {
  foreignKey: 'uniqueTitleId',
  as: 'uniqueTitle',
});
WorkPlanModel.hasMany(TaskModel, {
  sourceKey: 'id',
  foreignKey: 'workPlanId',
  as: 'tasks',
});

WorkPlanModel.hasMany(ToolModel, {
  sourceKey: 'id',
  foreignKey: 'workPlanId',
  as: 'tools',
});

WorkPlanModel.hasMany(SupplyModel, {
  sourceKey: 'id',
  foreignKey: 'workPlanId',
  as: 'supplies',
});



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

app.use("/api", routes);

app.listen(process.env.REACT_APP_SERVER_PORT);

export default app;