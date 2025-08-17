const player = require('play-sound')();

class Player {
  constructor() {
    this.currentTrackIndex = 0;
    this.audioProcess = null;
    this.tracks = [];
  }

  setTracks(tracks) {
    this.tracks = tracks;
  }
  play(index) {
    if (index < 0 || index >= this.tracks.length) {
      throw new Error('Invalid tracks index');
    }
    this.currentTrackIndex = index;
    this.stop();
    return new Promise((resolve, reject) => {
      this.audioProcess = player.play(`music/${this.tracks[index]}`,
        (err) => {
          console.error(err);
          if (err) reject(new Error(`Playback error: ${err.message}`));
          else resolve();
        })
    })
  }
  stop() {
    if (this.audioProcess) {
      this.audioProcess.kill();
      this.audioProcess = null;
    }
  }

  next() {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    return this.play(nextIndex);
  }

  previous() {
    const previousIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    return this.play(previousIndex);
  }
  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex] || null;
  }
}

module.exports = new Player();

