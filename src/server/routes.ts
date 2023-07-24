import { WorkPlanInterface } from '@interfaces/workPlan.interface';
import { Request, Response, Router } from 'express';
import { WorkPlanModel } from '@models/workPlan.model';
import { SubTaskModel, TaskModel } from '@models/task.model';
import { ToolModel } from '@models/tool.model';
import { SupplyModel } from '@models/supply.model';
import { getAllWorkPlan } from './controllers/workPlan.controller';

const router = Router();

router.get('/planes-de-trabajo', getAllWorkPlan);

router.post('/planes-de-trabajo', async (req: Request, res: Response) => {
  const workPlan: WorkPlanInterface = req.body;

  try {
    const newWorkPlan = await WorkPlanModel.create(workPlan, {
      include: [
        { model: ToolModel, as: 'tools' },
        { model: TaskModel, as: 'tasks', include: [{ model: SubTaskModel, as: 'subTasks' }] },
        { model: SupplyModel, as: 'supplies' }
      ]
    });

    return res.status(200).json({ message: 'Plan de trabajo actualizado correctamente', payload: newWorkPlan});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el plan de trabajo' });
  }
});

router.put('/planes-de-trabajo/:id', async (req: Request, res: Response) => {
  const updatedWorkPlan: WorkPlanInterface = req.body; 
  const workplanid: string = req.params.id;

  try {
    const existingWorkPlan = await WorkPlanModel.findByPk(workplanid, {
      include: [TaskModel, ToolModel, SupplyModel]
    });
  
    if (!existingWorkPlan) {
      return res.status(404).json({ message: 'Plan de trabajo no encontrado' });
    }

    await existingWorkPlan.update(updatedWorkPlan);

    return res.status(200).json({ message: 'Plan de trabajo actualizado correctamente', payload: existingWorkPlan});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el plan de trabajo' });
  }
});

router.delete('/planes-de-trabajo/:id', async (req: Request, res: Response) => {
  const workplanid: string = req.params.id;

  try {
    const deleteWorkPlan = await WorkPlanModel.findByPk(workplanid);

    if (deleteWorkPlan) {
      await deleteWorkPlan.destroy();
      res.status(200).json({ message: 'Plan de trabajo eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Plan de trabajo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el plan de trabajo:', error);
    res.status(500).json({ error: 'Error al eliminar el plan de trabajo' });
  }
});


export default router;