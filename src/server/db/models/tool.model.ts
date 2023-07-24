import { Model, DataTypes, ModelValidateOptions, UpdateOptions } from 'sequelize';
import sequelize from '../database';
import { WorkPlanModel } from './workPlan.model';
import { ToolModelInterface } from '@interfaces/tool.interface';
import { ModelHooks } from 'sequelize/types/hooks';

export class ToolModel extends Model<ToolModelInterface> {

    public static associate(models: any): void {
        this.belongsTo(models.WorkPlanModel, {
            foreignKey: 'workPlanId',
            as: 'workPlan',
        });
        this.belongsTo(models.WorkPlanModel, {
            foreignKey: 'inputCatalogId',
            as: 'inputCatalog',
        });
    }

    
}

ToolModel.init(
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
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'index',
        },
        upkeepCost: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'upkeep_cost',
        },
        breakpoint: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'breakpoint',
        },
        fix: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'fix',
        },
        workPlanId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'work_plan_id',
        },
        inputCatalogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'input_catalog_id',
        },
    },
    {
        sequelize,
        tableName: 'tool',
        timestamps: false,
        validate: {
            validateIndexGreaterThanZero(this: ToolModel) {
                const index = this.get().index;
                if (index < 0) {
                    throw new Error('Index must be greater than or equal to zero');
                }
            },
        } as ModelValidateOptions,
        hooks: {
            beforeBulkUpdate: (options) => {
                console.log(options);
            }
        }
    }
);