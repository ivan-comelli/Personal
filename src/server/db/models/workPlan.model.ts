import { Model, DataTypes, TransactionOptions, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Association, HasManySetAssociationsMixin, UpdateOptions, Options, Attributes  } from 'sequelize';
import sequelize from '../database';
import { ToolModel } from './tool.model';
import { TaskModel } from './task.model';
import { SupplyModel } from './supply.model';
import { UniqueTitleModel } from './uniqueTitle.model';
import { FeeModel } from './fee.model';
import { WorkPlanModelInterface } from '@interfaces/workPlan.interface';
import { ToolType } from '@interfaces/tool.interface';

export class WorkPlanModel extends Model<WorkPlanModelInterface> {
        
    public recalculateCountersWithSave(shouldSave: boolean ,T?: TransactionOptions) {
        //falta aplicar la trasaccion
        let data = this.get();
        let stack = 0;
        let toolUpkeepFix = 0;
        let toolUpkeepByNotFix: Array<number> = [];
        data.tools?.forEach((tool) => {
            let value =  tool.get();
            
            if(!value.breakpoint && !value.fix) {
                stack += value.upkeepCost;
            } else if(!value.fix) {
                toolUpkeepByNotFix.push(stack);
                stack = value.upkeepCost;
            } else {
                toolUpkeepFix += value.upkeepCost;
            }
        });
        if (stack > 0) {
            toolUpkeepByNotFix.push(stack);
            stack = 0;
        }
        
        let taskTimeByBreakpoint: Array<number> = [];
        data.tasks?.forEach((task) => {
            let value = task.get();
        
            if(!value.breakpoint) {
                stack += value.timeCost;
            } else {
                taskTimeByBreakpoint.push(stack);
                stack = value.timeCost;
            }
        });
        if (stack > 0) {
            taskTimeByBreakpoint.push(stack);
            stack = 0;
        }

        let totalSupplyCost = 0;
        data.supplies?.forEach((supply) => {
            let value = supply.get();
            totalSupplyCost += value.cost;
        });
        let plusAmountCostByBreakpoint = taskTimeByBreakpoint.reduce((sum, timeCost, index) => {
            let value = toolUpkeepByNotFix[index];
            return sum + (timeCost * (value ? value : 0));
        }, 0);

        let totalTimeCost = taskTimeByBreakpoint.reduce((sum, timeCost) => sum + timeCost, 0);      
        let percentage = data.percentage ? data.percentage : 0;
        let totalAmountCost = (totalSupplyCost + plusAmountCostByBreakpoint + (totalTimeCost * toolUpkeepFix) + (totalTimeCost * percentage));
    
        this.set('totalAmount', totalAmountCost);
        this.set('timeCost', totalTimeCost);         
    }

    toJSON() {
        const { id, ...restData } = this.get();
        const title = restData.uniqueTitle ? restData.uniqueTitle.dataValues.title : '';
        const percentage = restData.fee ? restData.fee.dataValues.percentage : 0;
        delete restData.uniqueTitle;
        delete restData.fee;

        return {
            id: id,
            title: title,
            percentage: percentage,
            ...restData            
        };
    }
}

WorkPlanModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        partIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'part_index'
        },
        partName: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'part_name'
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: '0000-00-00',
            field: 'start_date',
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: '0000-00-00',
            field: 'expiration_date',
        },
        timeCost: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'time_cost',
        },
        workDays: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'work_days',
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'total_amount',
        },
        note: {
            type: DataTypes.TEXT({ length: 'medium' }),
            allowNull: true,
            defaultValue: null,
            field: 'note',
        },
        feeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'fee_id',
        },
        uniqueTitleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'unique_title_id',
        },
    },
    {
        sequelize,
        tableName: 'work_plan',
        timestamps: false,
        hooks: {
            beforeSave: async (M, options) => {
               // M.recalculateCountersWithSave(false);
               console.log(M.changed());
            }            
        },
        defaultScope: {
            attributes: {
                exclude: ['uniqueTitleId', 'feeId']
            },
            include: [
                {
                    model: FeeModel,
                    as: 'fee',
                },
                {
                    model: UniqueTitleModel,
                    as: 'uniqueTitle',
                },
                {
                    model: TaskModel,
                    as: 'tasks',
                    attributes: {
                        exclude: ['workPlanId']
                    },
                },
                {
                    model: ToolModel,
                    as: 'tools',
                    attributes: {
                        exclude: ['workPlanId', 'inputCatalogId']
                    },
                },
                {
                    model: SupplyModel,
                    as: 'supplies',
                    attributes: {
                        exclude: ['workPlanId', 'inputCatalogId']
                    },
                },
            ],
            
        }
    }
);