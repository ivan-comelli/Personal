import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import { WorkPlanModel } from './workPlan.model';
import { FeeType } from '@interfaces/fee.interface';
import { InputCatalogModel } from './inputCatalog.model';

interface FeeModelInterface extends FeeType {
    workPlans?: WorkPlanModel[],
    inputCatalog?: InputCatalogModel[]
}

export class FeeModel extends Model<FeeModelInterface> implements FeeModelInterface {
    declare id: number;
    declare title: string;
    declare percentage: number | null;
    declare updated_at: Date;

    declare workPlans: WorkPlanModel[];
    declare inputCatalog: InputCatalogModel[];

    public static associate(models: any): void {
        this.hasOne(models.WorkPlanModel, {
            foreignKey: 'feeId',
            as: 'workPlans',
        });

        this.hasOne(models.InputCatalogModel, {
            foreignKey: 'feeId',
            as: 'inputCatalog',
        });
    }
}

FeeModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'title',
        },
        percentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'percentage',
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
    },
    {
        sequelize,
        tableName: 'fee',
        timestamps: false,
    }
);