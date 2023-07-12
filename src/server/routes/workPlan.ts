import { WorkPlanInterface, WorkPlanModelInterface, TasksType, ToolsType, MaterialsType } from '../interfaces/WorkPlan';
import { Request, Response, Router } from 'express';
import { WorkPlanModel, TaskModel, ToolModel, MaterialModel } from '../db/models/WorkPlan';
import { useState } from 'react';


const router = Router();

// Obtener todos los usuarios
router.get('/planes-de-trabajo', async (req: Request, res: Response) => {
  try {
    const plan = await WorkPlanModel.findAll({
      include: [{model: TaskModel, as: 'tasks'}, {model: ToolModel, as: 'tools'}, {model: MaterialModel, as: 'materials'}]
    });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los planes' });
  }
});

router.post('/planes-de-trabajo', async (req: Request, res: Response) => {
  const {
    id, workname, workdays, totaltime, fidelitypercentage, startdate, expirationdate, note, tasks, tools, materials
  }: WorkPlanInterface = req.body; 
  const workPlan: WorkPlanModelInterface = { id: undefined, workname, workdays, totaltime, fidelitypercentage, note, startdate, expirationdate };
  const newTasks: Array<TasksType> = [];
  const newTools: Array<ToolsType> = [];
  const newMaterials: Array<MaterialsType> = []; 

  try {
    const newWorkPlan = await WorkPlanModel.create(workPlan).then(res => {
      let workPlanId: number = res.id;
      // TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS
      (tasks.map(async (item) => {
        try {
          const newTask = await TaskModel.create({
            title: item.title,
            breakpoint: false,
            workplanid: workPlanId,
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
      }));

      // Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools
      (tools.map(async (item) => {
        try {
          const newTool = await ToolModel.create({
            name: item.name,
            breakpoint: false,
            fix: false,
            index: item.index,
            workplanid: workPlanId
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
      }));

      // MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS
      (materials.map(async (item, index) => {
        try {
          const newMaterial = await MaterialModel.create({
            name: item.name,
            fix: false,
            index: item.index,
            workplanid: workPlanId
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
      }));
    });

    return res.status(200).json({ message: 'Plan de trabajo actualizado correctamente', lists: {tasks: newTasks, tools: newTools, materials: newMaterials}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el plan de trabajo' });
  }
});

router.put('/planes-de-trabajo/:id', async (req: Request, res: Response) => {
  const {
    id, workname, workdays, totaltime, fidelitypercentage, note, tasks, tools, materials
  }: WorkPlanInterface = req.body; 
  const workplanid: string = req.params.id;
  const newTasks: Array<TasksType> = [];
  const newTools: Array<ToolsType> = [];
  const newMaterials: Array<MaterialsType> = []; 

  try {
    const plan = await WorkPlanModel.findByPk(workplanid, {
      include: [{model: TaskModel, as: 'tasks'}, {model: ToolModel, as: 'tools'}, {model: MaterialModel, as: 'materials'}]
    });
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan de trabajo no encontrado' });
    }
    
    workname && (plan.set("workname", workname));
    plan.set("totaltime", totaltime);
    plan.set("workdays", workdays);
    plan.set("fidelitypercentage", fidelitypercentage);
    plan.set("note", note);
    // TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS
    await Promise.all (tasks.map(async (item) => {
      if (item.title && !item.id) {
        try {
          const newTask = await TaskModel.create({
            title: item.title,
            breakpoint: false,
            workplanid: parseInt(workplanid),
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
          if (editTask) {            
            editTask.set('title', item.title);
            await editTask.save();
            console.log('Tarea actualizada:', editTask.toJSON());
          } else {
            console.log('No se encontró la tarea');
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
            workplanid: parseInt(workplanid)
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
          editTool.set('name', item.name);
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
            workplanid: parseInt(workplanid)
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
          editMaterial.set('name', item.name);
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