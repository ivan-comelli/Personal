import express, { Router } from 'express';
import { WorkPlanInterface, TasksType, ToolsType, MaterialsType } from '../interfaces/WorkPlan';
import { Request, Response } from 'express';
import { WorkPlanModel, TaskModel, ToolModel, MaterialModel } from '../db/models/WorkPlan';


const router = Router();

// Obtener todos los usuarios
router.get('/api/planes-de-trabajo', async (req: Request, res: Response) => {
  try {
    const plan = await WorkPlanModel.findAll({
      include: [{model: TaskModel, as: 'tasks'}, {model: ToolModel, as: 'tools'}, {model: MaterialModel, as: 'materials'}]
    });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

router.put('/api/planes-de-trabajo/:id', async (req: Request, res: Response) => {
  const {
    id, workName, workDays, totalTime, fidelityPercentage, note, tasks, tools, materials
  }: WorkPlanInterface = req.body; 
  const workPlanId: string = req.params.id;
  const newTasks: Array<TasksType> = [];
  const newTools: Array<ToolsType> = [];
  const newMaterials: Array<MaterialsType> = []; 

  try {
    const plan = await WorkPlanModel.findByPk(workPlanId, {
      include: [{model: TaskModel, as: 'tasks'}, {model: ToolModel, as: 'tools'}, {model: MaterialModel, as: 'materials'}]
    });
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan de trabajo no encontrado' });
    }
    
    // TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS
    workName && (plan.workName = workName);
    plan.totalTime = totalTime;
    plan.workDays = workDays;
    plan.fidelityPercentage = fidelityPercentage;
    plan.note = note;
    await Promise.all (tasks.map(async (item) => {
      if (item.title && !item.id) {
        try {
          const newTask = await TaskModel.create({
            title: item.title,
            breakpoint: false,
            workPlanId: parseInt(workPlanId),
            index: item.index
          });
          newTasks.push({
            ...newTask.dataValues,
            index: item.index
          });
          console.log('Tarea creada:', newTask.toJSON());
        }
        catch (error) {
          console.error('Error al crear la tarea:', error);
        }
      }
      else if(item.title && item.id)  {
        try {
          const editTask = await TaskModel.findByPk(item.id);
          if(editTask) {
            editTask.title = item.title;
            console.log('Tarea actualizada:', editTask.toJSON());
            await editTask.save();
          }
        }
        catch (error) {
          console.error('Error al actualizar la tarea:', error);
        }
      }
      if (!item.title && item.id) {
        try {
          const destroyTask = await TaskModel.findByPk(item.id) as TaskModel;
          console.log('Tarea destruida:', destroyTask.toJSON());
          await destroyTask.destroy();
        }
        catch (error) {
          console.error('Error al destruir la tarea:', error);
        }
      }
    }));

    // Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools
    await Promise.all (tools.map(async (item) => {
      if (item.name && !item.id) {
        try {
          const newTool = await ToolModel.create({
            name: item.name,
            breakpoint: false,
            fix: false,
            index: item.index,
            workPlanId: parseInt(workPlanId)
          });
          newTools.push({
            ...newTool.dataValues,
            index: item.index
          });
          console.log('Herramienta creada:', newTool.toJSON());
        }
        catch (error) {
          console.error('Error al crear la herramienta:', error);
        }
      }
      else if(item.name && item.id)  {
        try {
          const editTool = await ToolModel.findByPk(item.id) as ToolModel;
          editTool.name = item.name;
          console.log('Herramienta actualizada:', editTool.toJSON());
          await editTool.save();
        }
        catch (error) {
          console.error('Error al actualizar la herramienta:', error);
        }
      }
      if (!item.name && item.id) {
        try {
          const destroyTool = await ToolModel.findByPk(item.id) as ToolModel;
          console.log('Herramienta destruida:', destroyTool.toJSON());
          await destroyTool.destroy();
        }
        catch (error) {
          console.error('Error al destruir la herramienta:', error);
        }
      }
    }));

    // MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS
    await Promise.all (materials.map(async (item, index) => {
      if (item.name && !item.id) {
        try {
          const newMaterial = await MaterialModel.create({
            name: item.name,
            fix: false,
            index: item.index,
            workPlanId: parseInt(workPlanId)
          });
          newMaterials.push({
            ...newMaterial.dataValues,
            index: index
          });
          console.log('Material creado:', newMaterial.toJSON());
        }
        catch (error) {
          console.error('Error al crear el material:', error);
        }
      }
      else if(item.name && item.id)  {
        try {
          const editMaterial = await MaterialModel.findByPk(item.id) as MaterialModel;
          editMaterial.name = item.name;
          console.log('Material actualizada:', editMaterial.toJSON());
          await editMaterial.save();
        }
        catch (error) {
          console.error('Error al actualizar la material:', error);
        }
      }
      if (!item.name && item.id) {
        try {
          const destroyMaterial = await MaterialModel.findByPk(item.id) as MaterialModel;
          console.log('Material destruida:', destroyMaterial.toJSON());
          await destroyMaterial.destroy();
        }
        catch (error) {
          console.error('Error al destruir la material:', error);
        }
      }
    }));
    
    note && (plan.note = note);

    // SAVE   SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE
    await plan.save();
    return res.status(200).json({ message: 'Plan de trabajo actualizado correctamente', lists: {tasks: newTasks, tools: newTools, materials: newMaterials}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el plan de trabajo' });
  }
});

export default router;