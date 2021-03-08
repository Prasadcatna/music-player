

const music = document.querySelector("audio");
    const img =document.querySelector("img");
    const play= document.getElementById("play");
    const title= document.getElementById("title");
    const artist= document.getElementById( "artist");
    const prev= document.getElementById("prev");
    const next= document.getElementById("next");
    const shuffle= document.getElementById("shuffle");
    const dot =document.getElementById("dot");
    const dot1 =document.getElementById("dot1");
    const repeat= document.getElementById("loop");

    let progress = document.getElementById('progress');
    let total_duration= document.getElementById('duration');
    let current_time= document.getElementById('current_time');
    const progress_div=document.getElementById('progress_div');
  

    

    let isplaying =false
    const playMusic =() => {
      isplaying= true
      music.play();
      play.classList.replace('fa-play', "fa-pause")
    };

    const pauseMusic =() => {
      isplaying= false
      music.pause();
      play.classList.replace('fa-pause', "fa-play")
    };

    play.addEventListener("click" , () => {
      // if(isplaying){
      //   pauseMusic();
      // }else{
      //   playMusic();
      // }

      isplaying ? pauseMusic() : playMusic();
    })


    document.addEventListener("keydown" , function(event){
      if(event.keyCode=='32'){
        isplaying ? pauseMusic() : playMusic();
      }
    });

    
    // changing music

    const loadSong=(songs) => {
      title.textContent= songs.title;
      artist.textContent= songs.artist;
      music.src = "audio/"+songs.name+".mp3";
      img.src="images/"+songs.img+".jpg";

    };
    songINdex =0;
    // loadSong(songs[1]);
    
    const nextsong =()=>{
      songINdex = (songINdex + 1)%songs.length;
      loadSong(songs[songINdex]);
      playMusic();
    };

    const prevsong =()=>{
      songINdex = (songINdex - 1+songs.length)% songs.length;
      loadSong(songs[songINdex]);
      playMusic();
    };

    document.addEventListener("keydown", function(event){
      if(event.keyCode=='39'){
        nextsong();
      }
      else if (event.keyCode=='37'){
        prevsong();
      }
    })

    // Shuffle Songs
    isShuffle=false  
    const shuffleSong =()=>{
      isShuffle=true
      song=songs
      shufSong= song.sort(()=>Math.random()-0.5);
      // console.log(shufSong);
      // console.log(shufSong[songINdex]);
      loadSong(shufSong[songINdex]);
      playMusic();
      shuffle.style.color='#52b788'
      dot.style.visibility='visible'
    }

    const notShuffle =()=>{
      isShuffle=false
      // console.log(songs);
      // console.log(songs[songINdex]);
      loadSong(songs[songINdex]);
      playMusic();
      shuffle.style.color='#fff'
      dot.style.visibility='hidden'
    }

    shuffle.addEventListener("click" , ()=>{
      isShuffle ? notShuffle() : shuffleSong();
    })

    // Repeat songs

    isRepeat =false
    const repeatSong=()=>{
      isRepeat=true
      repeat.style.color='#52b788'
      dot1.style.visibility='visible'
    }

    const notRepeat=()=>{
      isRepeat=false
      repeat.style.color='#fff'
      dot1.style.visibility='hidden'
    }

    repeat.addEventListener("click" , ()=>{
      isRepeat ? notRepeat() : repeatSong();
    })

    // progress
    music.addEventListener('timeupdate', (event) => {
      // console.log(event);
      const{currentTime, duration}= event.srcElement;
      // console.log(currentTime);
      // console.log(duration);

      let progress_time=(currentTime/duration)*100;
      progress.style.width=`${progress_time}%`;

      // music duration update
      let min_duration =Math.floor(duration/60);
      let sec_duration = Math.floor(duration%60);
      // console.log(min_duration);
      // console.log(sec_duration);

      if(sec_duration<10){
        sec_duration=`0${sec_duration}`;
      }

      let tot_duration= `${min_duration}:${sec_duration}`;
      if(duration){
        total_duration.textContent=`${tot_duration}`;
      }
      

    // current duration update
    let min_currentTime =Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime%60);
    // console.log(min_currentTime);
    // console.log(sec_currentTime);

    
    if(sec_currentTime<10){
      sec_currentTime= `0${sec_currentTime}`;
    }
    let tot_currentTime= `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent=`${tot_currentTime}`;
    
  });

  // progress onclick
  progress_div.addEventListener('click', (event)=>{
    // console.log(event);
    const{duration}= music;
    let move_progress =(event.offsetX/event.srcElement.clientWidth)*duration;
    // console.log(duration);
    // console.log(move_progress);

    music.currentTime= move_progress;
  });


  // changing to next song after completting the current song
  music.addEventListener('ended', nextsong);

    next.addEventListener('click' , nextsong);
    prev.addEventListener('click' , prevsong);

    
    