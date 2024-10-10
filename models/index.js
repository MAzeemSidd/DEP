import { Sequelize } from 'sequelize';
import UserModel from './User.js';
import SongModel from './Song.js';
import GenreModel from './Genre.js';
import PlaylistModel from './Playlist.js';
import PlaylistSongModel from './PlaylistSong.js';

// Initialize Sequelize
const sequelize = new Sequelize('music_db', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Models
const User = UserModel(sequelize);
const Song = SongModel(sequelize);
const Genre = GenreModel(sequelize);
const Playlist = PlaylistModel(sequelize);
const PlaylistSong = PlaylistSongModel(sequelize);

// Define Relationships
Genre.hasMany(Song);
Song.belongsTo(Genre);

User.hasMany(Playlist);
Playlist.belongsTo(User);

Playlist.belongsToMany(Song, { through: PlaylistSong });
Song.belongsToMany(Playlist, { through: PlaylistSong });

// Sync Models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error syncing database:', err));

export { sequelize, User, Song, Genre, Playlist, PlaylistSong };
