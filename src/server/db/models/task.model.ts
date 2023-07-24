import { Model, DataTypes, Association, ModelValidateOptions } from 'sequelize';
import sequelize from '../database';
import { WorkPlanModel } from './workPlan.model';
import { SubTaskType, TaskModelInterface } from '@interfaces/task.interface';
import { TaskInterface } from '@interfaces/supply.interface';

export class TaskModel extends Model<TaskModelInterface> {
    public static associate(models: any): void {
        TaskModel.belongsTo(models.WorkPlanModel, {
            foreignKey: 'workPlanId',
            as: 'workPlan',
        });
        
        TaskModel.hasMany(models.SubTaskModel, {
            sourceKey: 'id',
            foreignKey: 'taskId',
            as: 'subTasks',
        });
    }
}

TaskModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(18),
            allowNull: false,
            field: 'name',
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'description',
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'index',
        },
        breakpoint: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'breakpoint',
        },
        doing: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'doing',
        },
        timeCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'time_cost',
        },
        workPlanId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'work_plan_id',
        },
    },
    {
        sequelize,
        tableName: 'task',
        timestamps: false,
        validate: {
            validateIndexGreaterThanZero(this: TaskModel) {
                const index = this.get().index;
                if (index < 0) {
                    throw new Error('Index must be greater than or equal to zero');
                }
            },
        } as ModelValidateOptions,
    }
);

export class SubTaskModel extends Model<SubTaskType> {
    public static associate(models: any): void {
        SubTaskModel.belongsTo(models.TaskModel, {
            foreignKey: 'taskId',
            as: 'task',
        });
    }
}

SubTaskModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        name: {
            type: DataTypes.STRING(18),
            allowNull: false,
            field: 'name',
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'description',
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'index',
        },
        breakpoint: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'breakpoint',
        },
        doing: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'doing',
        },
        timeCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'time_cost',
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'task_id',
        },
    },
    {
        sequelize,
        tableName: 'sub_task',
        timestamps: false,
    }
);
