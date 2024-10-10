import { User, Song, Genre, Playlist, PlaylistSong } from '../models/index.js';
import { Op } from 'sequelize';

export const resolvers = {
  Query: {
    searchSongs: async (_, { title }) => {
      return await Song.findAll({
        where: {
          title: { [Op.like]: `%${title}%` },
        },
        include: [Genre],
      });
    },
    getGenres: async () => {
      return await Genre.findAll();
    },
    getPlaylist: async (_, { id }) => {
      return await Playlist.findByPk(id, {
        include: [Song, User],
      });
    },
    recommendSongs: async (_, { userId }) => {
      // Simple recommendation: top 10 songs
      return await Song.findAll({ limit: 10 });
      // Implement more sophisticated algorithms as needed
    },
    recommendPlaylists: async (_, { userId }) => {
      // Simple recommendation: top 10 playlists
      return await Playlist.findAll({ limit: 10, include: [User, Song] });
      // Implement personalized recommendations as needed
    },
  },
  Mutation: {
    createPlaylist: async (_, { userId, name }) => {
      return await Playlist.create({ name, UserId: userId });
    },
    addSongToPlaylist: async (_, { playlistId, songId }) => {
      const playlist = await Playlist.findByPk(playlistId);
      const song = await Song.findByPk(songId);
      if (playlist && song) {
        await playlist.addSong(song);
        return await Playlist.findByPk(playlistId, { include: [Song, User] });
      }
      throw new Error('Playlist or Song not found');
    },
    removeSongFromPlaylist: async (_, { playlistId, songId }) => {
      const playlist = await Playlist.findByPk(playlistId);
      const song = await Song.findByPk(songId);
      if (playlist && song) {
        await playlist.removeSong(song);
        return await Playlist.findByPk(playlistId, { include: [Song, User] });
      }
      throw new Error('Playlist or Song not found');
    },
  },
  User: {
    playlists: async (parent) => {
      return await Playlist.findAll({ where: { UserId: parent.id } });
    },
  },
  Genre: {
    songs: async (parent) => {
      return await Song.findAll({ where: { GenreId: parent.id } });
    },
  },
  Playlist: {
    user: async (parent) => {
      return await User.findByPk(parent.UserId);
    },
    songs: async (parent) => {
      return await parent.getSongs();
    },
  },
  Song: {
    genre: async (parent) => {
      return await Genre.findByPk(parent.GenreId);
    },
  },
};
