const fs = require('node:fs').promises;

class FileManager {
  async loadTracks(directory = 'music') {
    try {
      const allFiles = await fs.readdir(directory);
       const musicFiles = allFiles.filter(file => file.endsWith('.mp3'));
      if(!musicFiles) {
        throw new Error('No Mp3 files found')
      }
    return musicFiles;
    } catch (error) {
      console.log("error reading from: " + directory);
    }
  }
}

module.exports = new FileManager();

