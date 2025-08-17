/**
  Copyright (C) 2025 Siddharth-Ashri
          _____                   _______                   _____                    _____          
         /\    \                 /::\    \                 /\    \                  /\    \         
        /::\____\               /::::\    \               /::\____\                /::\____\        
       /::::|   |              /::::::\    \             /::::|   |               /:::/    /        
      /:::::|   |             /::::::::\    \           /:::::|   |              /:::/    /         
     /::::::|   |            /:::/~~\:::\    \         /::::::|   |             /:::/    /          
    /:::/|::|   |           /:::/    \:::\    \       /:::/|::|   |            /:::/    /           
   /:::/ |::|   |          /:::/    / \:::\    \     /:::/ |::|   |           /:::/    /            
  /:::/  |::|   | _____   /:::/____/   \:::\____\   /:::/  |::|___|______    /:::/    /      _____  
 /:::/   |::|   |/\    \ |:::|    |     |:::|    | /:::/   |::::::::\    \  /:::/____/      /\    \ 
/:: /    |::|   /::\____\|:::|____|     |:::|    |/:::/    |:::::::::\____\|:::|    /      /::\____\
\::/    /|::|  /:::/    / \:::\    \   /:::/    / \::/    / ~~~~~/:::/    /|:::|____\     /:::/    /
 \/____/ |::| /:::/    /   \:::\    \ /:::/    /   \/____/      /:::/    /  \:::\    \   /:::/    / 
         |::|/:::/    /     \:::\    /:::/    /                /:::/    /    \:::\    \ /:::/    /  
         |::::::/    /       \:::\__/:::/    /                /:::/    /      \:::\    /:::/    /   
         |:::::/    /         \::::::::/    /                /:::/    /        \:::\__/:::/    /    
         |::::/    /           \::::::/    /                /:::/    /          \::::::::/    /     
         /:::/    /             \::::/    /                /:::/    /            \::::::/    /      
        /:::/    /               \::/____/                /:::/    /              \::::/    /       
        \::/    /                 ~~                      \::/    /                \::/____/        
         \/____/                                           \/____/                  ~~              

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE. */

const term = require('terminal-kit').terminal;
import fileManager from './src/fileManager.js'
import { loadConfiguration, center, centerAscii } from './utils.js';
var readline = require('readline');
const __APPLE__ = process.platform === 'darwin';

const CONFIGURATION = loadConfiguration();

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

console.log('press q to exit, or any key to print log');

process.stdin.on('keypress', (chunk, key) => {
  if (key && key.name == 'q'){
    term.processExit();
  }
});

const defaultTracksDir = "~/music";
const userTracksDir = process.argv[2];
const tracksDir =  userTracksDir || defaultTracksDir;
// load tracks from the users directory
const displaySongs = (tracks) => {
  return new Promise((resolve, reject) => {
    term.singleColumnMenu(tracks, (error, response) => {
      if(error) {
        return reject(error);
      }
      resolve(response);
    });
  })

}
function displayDefaultDirectoryScreen() {
    term('NOT IMPLEMENTED YET!!');

}

function displayWelcomeScreen() {
  const title = `
 ___ ___ _____ _ _ 
|   | . |     | | |
|_|_|___|_|_|_|___|
                   
`;
    const titleWidth = 19;
    const titleMessage = 'A music player for your terminal';
    centerAscii(term, title);
    center(term, titleMessage);
}


function displayMainScreen() {



  term.fullscreen(true);
  // save the default directory path in a configuration file
  // let's save this in a file called ~/library/Preferences/
  const isDefaultDirectorySelected = CONFIGURATION.defaultDir;
  if (isDefaultDirectorySelected) {
    displayDefaultDirectoryScreen()
  } else {
    displayWelcomeScreen()
  }

}

async function startMusicPlayer() {
  displayMainScreen()
  // const tracks = await fileManager.loadTracks(tracksDir)
  // const selectedTrack  = await displaySongs(tracks);

}
startMusicPlayer();
