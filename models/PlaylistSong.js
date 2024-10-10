import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('PlaylistSong', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // Additional fields can be added here if needed
  });
};
