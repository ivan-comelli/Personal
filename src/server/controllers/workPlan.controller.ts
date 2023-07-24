import { SupplyModel } from '@models/supply.model';
import { TaskModel, SubTaskModel } from '@models/task.model';
import { ToolModel } from '@models/tool.model';
import { UniqueTitleModel } from '@models/uniqueTitle.model';
import { WorkPlanModel } from '@models/workPlan.model';
import { Request, Response } from 'express';

export const getAllWorkPlan = async (req: Request, res: Response) => {
    try {
        const workPlan = await WorkPlanModel.findAll();
        res.status(200).json(workPlan);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export const getWorkPlanById = async (req: Request, res: Response) => {
    const workPlanId: string = req.params.id;
    try {
        const WorkPlanByPK = await WorkPlanModel.findByPk(workPlanId ,{
            include: [
                {
                    model: UniqueTitleModel,
                    as: 'uniqueTitle'
                },
                {
                    model: TaskModel,
                    as: 'tasks',
                    include: [
                        {
                            model: SubTaskModel,
                            as: 'subTasks'
                        }
                    ]
                },
                {
                    model: ToolModel,
                    as: 'tools'
                },
                {
                    model: SupplyModel,
                    as: 'supplies'
                }
            ]
        });
        res.json(WorkPlanByPK);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



export const getWorkPlanByTitleOrPartName = () => {
    
}

export const setWorkPlan = () => {

} 

export const editWorkPlan = () => {

}

export const dropWorkPlan = () => {

}