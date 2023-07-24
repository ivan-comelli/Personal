import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import { FeeModel } from './fee.model';
import { PurchaseListModel, PurchaseInputCatalogModel } from './purchaseList.model';
import { InputCatalogType } from '@interfaces/inputCatalog.interface';
import { SupplyModel } from './supply.model';

export class InputCatalogModel extends Model<InputCatalogType> implements InputCatalogType {
    public id!: number;
    public name!: string;
    public unitCost!: number;
    public units!: number;
    public bulkCost!: number;
    public feeId!: number;
    public updatedAt!: Date;

    public supplies?: SupplyModel[];
    public purchases?: PurchaseInputCatalogModel[];
    public readonly fee?: FeeModel;

    public static associate(models: any): void {    
        InputCatalogModel.belongsTo(models.FeeModel, {
            foreignKey: 'feeId',
            as: 'fee',
        });

        InputCatalogModel.belongsToMany(models.PurchaseListModel, {
            through: models.PurchaseInputCatalogModel,
            foreignKey: 'inputCatalogId',
            otherKey: 'purchaseListId',
            as: 'purchaseLists',
        });

        InputCatalogModel.hasOne(models.SupplyModel, {
            foreignKey: 'inputCatalogId',
            as: 'supply',
        });
    }
}

InputCatalogModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(18),
            unique: true,
            field: 'name',
        },
        unitCost: {
            type: DataTypes.INTEGER,
            field: 'unit_cost',
        },
        units: {
            type: DataTypes.INTEGER,
            field: 'units',
        },
        bulkCost: {
            type: DataTypes.INTEGER,
            field: 'bulk_cost',
        },
        feeId: {
            type: DataTypes.INTEGER,
            field: 'fee_id',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    },
    {
        sequelize,
        tableName: 'supply_catalog',
        timestamps: false,
    }
);
