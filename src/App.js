import './App.css';
import { useState } from 'react'
import songs from './mvb-json.json'

function generateYouTubeEmbedUrl({ videoUrl, startTime, endTime }) {
  // Helper function to convert MM:SS to seconds
  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  // Convert startTime and endTime to seconds
  const startSeconds = timeToSeconds(startTime);
  const endSeconds = timeToSeconds(endTime);

  // Extract the video ID from the YouTube URL
  const urlParams = new URLSearchParams(new URL(videoUrl).search);
  const videoId = urlParams.get("v");

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  // Construct the embed URL with start and end times
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&end=${endSeconds}&autoplay=1&rel=0`;
  return embedUrl;
}


function App() {

//   const songs = [{
//     videoUrl: "https://www.youtube.com/watch?v=tUNbhYcY9Ik",
//     startTime: "01:30", 
//     endTime: "02:45",
//     nameAndArtist: 'Troll Tongue - Kygo',
//     hasNotBeenPlayed: true
//   }, {
//     videoUrl: 'https://www.youtube.com/watch?v=k85mRPqvMbE',
//     startTime: "01:30", 
//     endTime: "02:45",
//     nameAndArtist: 'Crazy Frog - Annoying',
//     hasNotBeenPlayed: true
//   }
// ]

  const [currentSongIndex, setCurrentSongIndex] = useState(undefined)

  // Function to get a random URL
  // function getRandomSong() {
  //   const randomIndex = Math.floor(Math.random() * songs.length);
  //   if (songs[randomIndex].hasNotBeenPlayed){
  //     songs[randomIndex].hasNotBeenPlayed = false
  //     return songs[randomIndex]
  //   } else {
  //     getRandomSong()
  //   }
  // }

  console.log(songs.length)

  // Function to handle button click
  const handleNext = () => {
    setCurrentSongIndex(currentSongIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentSongIndex(currentSongIndex - 1)
  }

  const startGameClick = () => {
    setCurrentSongIndex(0)
  }

  const YoutubeFrame = () => {
    return <div className='player-container'>
      <div className="frosty-blur"></div>
      <iframe
        width="100%"
        height="100%"
        src={generateYouTubeEmbedUrl(songs[currentSongIndex])}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      </div>
  }

  const StartGameButton = () => {
    return <button onClick={startGameClick}>Start Game</button>
  }

  return (
    <div style={{ textAlign: "center", height: '100%' }}>
      <h1>🧠 BIAC Music Video Bingo 🎶</h1>
      {/* {currentSongIndex >= songs.length ? <GameOver /> : ''} */}
      {currentSongIndex >= 0 && currentSongIndex < songs.length ? <YoutubeFrame /> : <StartGameButton />}
      
      <div>
        
      </div>
      <br />
      <button onClick={handlePrevious} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
      ⏪ Previous Video
      </button>
      <button onClick={handleNext} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
        Next Video ⏩
      </button>
      <button onClick={handleNext} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
        New Game 👶
      </button>
    </div>
  );
}

export default App;
