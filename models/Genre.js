import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  });
};
