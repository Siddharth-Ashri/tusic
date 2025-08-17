const readline = require('readline');
const fileManager = require('./fileManager');
const player = require('./player.js');

class Interface {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async init() {
    try {
      const tracks = await fileManager.loadTracks();
      player.setTracks(tracks);
      this.showMenu();
    } catch (e) {
      console.error(e.message);
      this.rl.close();

    }
  }
  showMenu() {
    console.log("\nMusic Player Commands:");
    console.log("1. Play current track");
    console.log("2. Next track");
    console.log("3. Previous track");
    console.log("4. Stop playback");
    console.log("5. List tracks");
    console.log("6. Exit");

    this.rl.question('Enter command (1-6): ', async (input) => {

      try {
        switch (input.trim()) {
          case '1':
            await player.play(player.currentTrackIndex);
            console.log(`Playing: ${player.getCurrentTrack()}`);
            break;
          case '2':
            await player.next();
            console.log(`Playing: ${player.getCurrentTrack()}`);
            break;
          case '3':
            await player.previous();
            console.log(`Playing: ${player.getCurrentTrack()}`);
            break;
          case '4':
            player.stop();
            console.log(`Playback Stopped`);
            break;
          case '5':
            console.log(`Available Tracks: ${player.tracks}`);
            break;
          case '6':
            player.stop();
            this.rl.close();
            console.log('Exiting music player');
            process.exit(0);
          default:
            console.log('Invalid command. Please Enter a numver between 1 and 6');
        }

      } catch (e) {
        console.error(e.message);
      }
      console.log("showing menu");
      this.showMenu();
    })
  }
}

module.exports = new Interface();
