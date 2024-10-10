import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    playlists: [Playlist]
  }

  type Song {
    id: ID!
    title: String!
    artist: String!
    album: String
    duration: Int
    releaseDate: String
    genre: Genre
  }

  type Genre {
    id: ID!
    name: String!
    songs: [Song]
  }

  type Playlist {
    id: ID!
    name: String!
    user: User!
    songs: [Song]
  }

  type Query {
    searchSongs(title: String!): [Song]
    getGenres: [Genre]
    getPlaylist(id: ID!): Playlist
    recommendSongs(userId: ID!): [Song]
    recommendPlaylists(userId: ID!): [Playlist]
  }

  type Mutation {
    createPlaylist(userId: ID!, name: String!): Playlist
    addSongToPlaylist(playlistId: ID!, songId: ID!): Playlist
    removeSongFromPlaylist(playlistId: ID!, songId: ID!): Playlist
    # Additional mutations like user registration can be added here
  }
`;
