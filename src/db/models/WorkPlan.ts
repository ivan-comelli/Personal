import { Model, DataTypes, HasManyGetAssociationsMixin  } from 'sequelize';
import sequelize from '../database';
import { WorkPlanModelInterface, TasksType, ToolsType, MaterialsType } from '../../interfaces/WorkPlan';

export class WorkPlanModel extends Model<WorkPlanModelInterface> implements WorkPlanModelInterface {
    public id!: number;
    public workName!: string;
    public totalTime!: number;
    public workDays!: number;
    public fidelityPercentage!: number;
    public startDate!: string;
    public expirationDate!: string;
    public note!: string;
    public getTasks!: HasManyGetAssociationsMixin<TaskModel>;
    public getTools!: HasManyGetAssociationsMixin<ToolModel>;
    public getMaterials!: HasManyGetAssociationsMixin<MaterialModel>;

    public readonly tasks?: TaskModel[];
    public readonly tools?: ToolModel[];
    public readonly materials?: MaterialModel[];
}

export class MaterialModel extends Model<MaterialsType> implements MaterialsType {
    public id!: number | undefined;
    public name!: string | undefined;
    public fix!: boolean;
    public index!: number;
    public workPlanId!: number;
}

export class ToolModel extends Model<ToolsType> implements ToolsType {
    public id!: number | undefined;
    public name!: string | undefined;
    public breakpoint!: boolean;
    public fix!: boolean;
    public index!: number;
    public workPlanId!: number;
}

export class TaskModel extends Model<TasksType> implements TasksType {
    public id!: number | undefined;
    public title!: string | undefined;
    public breakpoint!: boolean;
    public index!: number;
    public workPlanId!: number;
}

WorkPlanModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        workName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workDays: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fidelityPercentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: "WorkPlan",
        timestamps: false,
        sequelize
    }
); 

TaskModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breakpoint: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: true,    
        },
        workPlanId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'WorkPlan',
              key: 'id'
            } 
        }
    },
    {
        tableName: "Task",
        timestamps: false,
        sequelize
    }
); 

ToolModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breakpoint: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        fix: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: true,    
        },
        workPlanId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'WorkPlan',
              key: 'id'
            } 
        }
    },
    {
        tableName: "Tool",
        timestamps: false,
        sequelize
    }
); 

MaterialModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fix: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: true,    
        },
        workPlanId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'WorkPlan',
              key: 'id'
            }
        }
    },
    {
        tableName: "Material",
        timestamps: false,
        sequelize
    }
); 

WorkPlanModel.hasMany(TaskModel, {
    sourceKey: 'id',
    foreignKey: 'workPlanId',
    as: 'tasks'
});
WorkPlanModel.hasMany(ToolModel, {
    sourceKey: 'id',
    foreignKey: 'workPlanId',
    as: 'tools'
});
WorkPlanModel.hasMany(MaterialModel, {
    sourceKey: 'id',
    foreignKey: 'workPlanId',
    as: 'materials'
});

TaskModel.belongsTo(WorkPlanModel, { foreignKey: 'workPlanId' });
ToolModel.belongsTo(WorkPlanModel, { foreignKey: 'workPlanId' });
MaterialModel.belongsTo(WorkPlanModel, { foreignKey: 'workPlanId' });

export default WorkPlanModel;