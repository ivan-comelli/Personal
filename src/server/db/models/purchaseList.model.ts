import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import { PurchaseListType, PurchaseInputCatalogType } from '@interfaces/purchaseList.interface';
import { InputCatalogModel } from './inputCatalog.model';
import { UniqueTitleModel } from './uniqueTitle.model';

export class PurchaseListModel extends Model<PurchaseListType> implements PurchaseListType {
    public id!: number | undefined;
    public title!: string | undefined;
    public amountAvailable!: number;
    public createdAt!: Date;
    public uniqueTitle!: UniqueTitleModel;

    public purchases?: PurchaseInputCatalogModel[];
    public static associate(models: any): void {
        PurchaseListModel.belongsTo(models.UniqueTitleModel, {
            foreignKey: 'uniqueTitleId',
            as: 'uniqueTitle',
        });
    }
}

PurchaseListModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        amountAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amount_available',
        },
        uniqueTitleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'unique_title_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
    },
    {
        sequelize,
        tableName: 'purchase_list',
        timestamps: false,
    }
);

export class PurchaseInputCatalogModel extends Model<PurchaseInputCatalogType> implements PurchaseInputCatalogType {
    public id!: number;
    public quantity!: number;
    public cost!: number;
    public purchaseListId!: number;
    public inputCatalogId!: number;

    public inputCatalog?: InputCatalogModel;
    public purchaseList?: PurchaseListModel;
}

PurchaseInputCatalogModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'quantity',
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'cost',
        },
        purchaseListId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'purchase_list_id',
        },
        inputCatalogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'input_catalog_id',
        },
    },
    {
        sequelize,
        tableName: 'purchase_input_catalog',
        timestamps: false,
    }
);

PurchaseListModel.belongsToMany(InputCatalogModel, {
    through: PurchaseInputCatalogModel,
    foreignKey: 'purchaseListId',
    otherKey: 'inputCatalogId',
    as: 'purchases',
});