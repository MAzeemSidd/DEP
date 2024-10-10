import { Sequelize } from 'sequelize';
import UserModel from './User.js';
import SongModel from './Song.js';
import GenreModel from './Genre.js';
import PlaylistModel from './Playlist.js';
import PlaylistSongModel from './PlaylistSong.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Define Models
const User = UserModel(sequelize);
const Song = SongModel(sequelize);
const Genre = GenreModel(sequelize);
const Playlist = PlaylistModel(sequelize);
const PlaylistSong = PlaylistSongModel(sequelize);

// Define Relationships
Genre.hasMany(Song);
Song.belongsTo(Genre);

User.hasMany(Playlist, { onDelete: 'CASCADE', hooks: true });
Playlist.belongsTo(User, { onDelete: 'CASCADE', allowNull: false });

Playlist.belongsToMany(Song, { through: PlaylistSong });
Song.belongsToMany(Playlist, { through: PlaylistSong });

// Sync Models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error syncing database:', err));

export { sequelize, User, Song, Genre, Playlist, PlaylistSong };
