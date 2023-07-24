import { Model, DataTypes, Association, ModelValidateOptions } from 'sequelize';
import sequelize from '../database';
import { WorkPlanModel } from './workPlan.model';
import { SupplyModelInterface } from '@interfaces/supply.interface';

export class SupplyModel extends Model<SupplyModelInterface> {
    public static associate(models: any): void {
        SupplyModel.belongsTo(models.WorkPlanModel, {
            foreignKey: 'workPlanId',
            as: 'workPlan',
        });
    }
}

SupplyModel.init(
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            field: 'quantity',
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'cost',
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
        tableName: 'supply',
        timestamps: false,
        validate: {
            validateIndexGreaterThanZero(this: SupplyModel) {
                const index = this.get().index;
                if (index < 0) {
                    throw new Error('Index must be greater than or equal to zero');
                }
            },
        } as ModelValidateOptions,
    }
);

