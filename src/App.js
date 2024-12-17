import './App.css';
import { useState } from 'react';
import songs from './mvb-json.json';
import secondSongs from './mvb-json-2.json';

function generateYouTubeEmbedUrl({ videoUrl, startTime, endTime }) {
  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  const startSeconds = timeToSeconds(startTime);
  const endSeconds = timeToSeconds(endTime);

  const urlParams = new URLSearchParams(new URL(videoUrl).search);
  const videoId = urlParams.get("v");

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  return `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&end=${endSeconds}&autoplay=1&rel=0`;
}

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(undefined);
  const [currentSongs, setCurrentSongs] = useState(songs); // State to manage active song list

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => prevIndex - 1);
  };

  const startGameClick = () => {
    setCurrentSongIndex(0); // Start game from the first song
  };

  const startNewGameClick = () => {
    setCurrentSongs(secondSongs); // Switch to secondSongs
    setCurrentSongIndex(0); // Reset the index to 0
  };

  const YoutubeFrame = () => {
    return (
      <div className="player-container">
        <div className="frosty-blur"></div>
        <iframe
          width="100%"
          height="100%"
          src={generateYouTubeEmbedUrl(currentSongs[currentSongIndex])}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  const StartGameButton = () => {
    return <button onClick={startGameClick}>Start Game</button>;
  };

  return (
    <div style={{ textAlign: 'center', height: '100%' }}>
      <span>{`${currentSongIndex !== undefined ? currentSongIndex + 1 : 1} / ${currentSongs.length}`}</span>
      <h1>🧠 BIAC Music Video Bingo 🎶</h1>

      {currentSongIndex !== undefined &&
      currentSongIndex >= 0 &&
      currentSongIndex < currentSongs.length ? (
        <YoutubeFrame />
      ) : (
        <StartGameButton />
      )}


      <button
        onClick={handlePrevious}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
        disabled={currentSongIndex <= 0}
      >
        ⏪ Previous Video
      </button>
      <button
        onClick={handleNext}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
        disabled={currentSongIndex === undefined || currentSongIndex >= currentSongs.length - 1}
      >
        Next Video ⏩
      </button>
      <button
        onClick={startNewGameClick}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        New Game 👶
      </button>
    </div>
  );
}

export default App;
