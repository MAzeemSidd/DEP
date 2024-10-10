import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Song', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    artist: { type: DataTypes.STRING, allowNull: false },
    album: { type: DataTypes.STRING },
    duration: { type: DataTypes.INTEGER }, // Duration in seconds
    releaseDate: { type: DataTypes.DATE },
    // Add more fields as needed
  });
};
