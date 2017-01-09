var player = {};

player.elements                = {};
player.elements.container      = document.querySelector('.player');
player.elements.controls       = player.elements.container.querySelector('.controls');
player.elements.audio          = player.elements.container.querySelector('audio');
player.elements.toggle_play    = player.elements.controls.querySelector('.toggle-play img');
player.elements.button_prev    = player.elements.controls.querySelector('.prev img');
player.elements.button_next    = player.elements.controls.querySelector('.next img');
player.elements.track_title    = player.elements.container.querySelector('.trackTitle h3');
player.elements.present_time   = player.elements.controls.querySelector('.actual-time');
player.elements.all_time       = player.elements.controls.querySelector('.total-time');

// PLAY PAUSE
// on click
player.elements.toggle_play.addEventListener('click', function(event){
  if(player.elements.audio.paused){
    player.elements.audio.play();
    player.elements.toggle_play.setAttribute('src','assets/images/pause-icon-2x.png');
  }
  else{
    player.elements.audio.pause();
    player.elements.toggle_play.setAttribute('src','assets/images/play-icon-2x.png');
    event.preventDefault();}
} );

// on keypress
document.onkeypress = function(event){
  if(event.keyCode == 32){
    if( player.elements.audio.paused){
      player.elements.audio.play();
      player.elements.toggle_play.setAttribute("src", 'assets/images/pause-icon-2x.png');
    }
    else{
      player.elements.audio.pause();
      player.elements.toggle_play.setAttribute("src", 'assets/images/play-icon-2x.png');
    }
  }
  event.preventDefault();
};

// PREV AND NEXT SONG
// on click
var currentTrack = 0;

player.elements.button_next.addEventListener('click', function(event){
  currentTrack ++;
  if (currentTrack > playlist.length)
    currentTrack = 0;
  player.elements.audio.setAttribute("src", playlist[currentTrack]["src"]);
  player.elements.all_time.innerHTML=(playlist[currentTrack]["length"]);
  player.elements.track_title.innerHTML=(playlist[currentTrack]["title"]);
  player.elements.toggle_play.setAttribute("src", 'assets/images/pause-icon-2x.png');
  player.elements.audio.play();
  event.preventDefault();
});

player.elements.button_prev.addEventListener('click', function(event){
  currentTrack --;
  if (currentTrack < 0)
    currentTrack=playlist.length-1;
  player.elements.audio.setAttribute("src", playlist[currentTrack]["src"]);
  player.elements.all_time.innerHTML=(playlist[currentTrack]["length"]);
  player.elements.track_title.innerHTML=(playlist[currentTrack]["title"]);
  player.elements.toggle_play.setAttribute("src", 'images/pause-icon-2x.png');
  player.elements.audio.play();
  event.preventDefault();
});