import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Playlist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    // You can add more fields like description, createdAt, etc.
  });
};
