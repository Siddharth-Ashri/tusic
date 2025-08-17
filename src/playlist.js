const fs = require('fs').promises;

class PlaylistManager {
  async savePlaylist(name, tracks) {
    try {
      const playlist = { name, tracks }
      await fs.writeFile(`playlists/${name}.json`, JSON.stringify(playlist, null, 2));
      return true;

    } catch (error) {
      throw new Error(`Failed to save playlist: ${error.message}`);
    }
  }
  async loadPlaylist(name) {
    try {
      const data = await fs.readFile(`playlists/${name}.json`, 'utf8');
      const playlist = JSON.parse(data);
      return playlist.tracks;
    } catch (error) {
      throw new Error(`Failed to load playlist: ${error.message}`)
    }
  }
}

module.exports = new PlaylistManager();
