import { Model, DataTypes, HasManyGetAssociationsMixin  } from 'sequelize';
import sequelize from '../database';
import { WorkPlanModelInterface, TasksType, ToolsType, MaterialsType } from '../../interfaces/WorkPlan';

export class WorkPlanModel extends Model<WorkPlanModelInterface> implements WorkPlanModelInterface {
    public id!: number;
    public workname!: string;
    public totaltime!: number;
    public workdays!: number;
    public fidelitypercentage!: number;
    public startdate!: string;
    public expirationdate!: string;
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
    public workplanid!: number;
}

export class ToolModel extends Model<ToolsType> implements ToolsType {
    public id!: number | undefined;
    public name!: string | undefined;
    public breakpoint!: boolean;
    public fix!: boolean;
    public index!: number;
    public workplanid!: number;
}

export class TaskModel extends Model<TasksType> implements TasksType {
    public id!: number | undefined;
    public title!: string | undefined;
    public breakpoint!: boolean;
    public index!: number;
    public workplanid!: number;
}

WorkPlanModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        workname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totaltime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workdays: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fidelitypercentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        expirationdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: "workplan",
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
        workplanid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'workplan',
              key: 'id'
            } 
        }
    },
    {
        tableName: "task",
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
        workplanid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'workplan',
              key: 'id'
            } 
        }
    },
    {
        tableName: "tool",
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
        workplanid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'workplan',
              key: 'id'
            }
        }
    },
    {
        tableName: "material",
        timestamps: false,
        sequelize
    }
); 

WorkPlanModel.hasMany(TaskModel, {
    sourceKey: 'id',
    foreignKey: 'workplanid',
    as: 'tasks'
});
WorkPlanModel.hasMany(ToolModel, {
    sourceKey: 'id',
    foreignKey: 'workplanid',
    as: 'tools'
});
WorkPlanModel.hasMany(MaterialModel, {
    sourceKey: 'id',
    foreignKey: 'workplanid',
    as: 'materials'
});

TaskModel.belongsTo(WorkPlanModel, { foreignKey: 'workplanid' });
ToolModel.belongsTo(WorkPlanModel, { foreignKey: 'workplanid' });
MaterialModel.belongsTo(WorkPlanModel, { foreignKey: 'workplanid' });

export default WorkPlanModel;