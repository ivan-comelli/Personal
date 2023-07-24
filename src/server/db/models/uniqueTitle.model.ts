import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import { UniqueTitleType } from '@interfaces/uniqueTitle.interface';

export class UniqueTitleModel extends Model<UniqueTitleType>{
  
}

UniqueTitleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'title'
    },
  },
  {
    sequelize,
    tableName: 'unique_title',
    timestamps: false,
  }
);
