import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [started, setStarted] = useState(false);
  const [media, setMedia] = useState({ video: '', audio: '' });
  const [nameError, setNameError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [muted, setMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const validate = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!time.trim()) {
      setTimeError('Time is required');
      valid = false;
    } else {
      setTimeError('');
    }

    return valid;
  };

  const handleStart = () => {
    if (!validate()) return;

    const hour = parseInt(time.split(':')[0], 10);
    const base = process.env.PUBLIC_URL;

    let videoPath = `${base}/videos/morning.mp4`;
    let audioPath = `${base}/audio/morning.mp3`;

    if (hour >= 5 && hour < 12) {
      videoPath = `${base}/videos/morning.mp4`;
      audioPath = `${base}/audio/morning.mp3`;
    } else if (hour >= 12 && hour < 18) {
      videoPath = `${base}/videos/evening.mp4`;
      audioPath = `${base}/audio/evening.mp3`;
    } else {
      videoPath = `${base}/videos/night.mp4`;
      audioPath = `${base}/audio/night.mp3`;
    }

    setMedia({ video: videoPath, audio: audioPath });
    setStarted(true);
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        <div className="glass-toggle">
          {isDarkMode ? '☀️' : '🌙'}
        </div>
      </div>

      {!started ? (
        <div className="welcome-overlay">
          <div className="welcome-box">
            <h1>
              Welcome to <span className="zen-highlight">ZenZone</span>
            </h1>

            <label>
              Name<span className="required">*</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={nameError ? 'input-error' : ''}
              />
            </label>
            {nameError && <div className="error-message">{nameError}</div>}

            <label>
              Time of Session<span className="required">*</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={timeError ? 'input-error' : ''}
              />
            </label>
            {timeError && <div className="error-message">{timeError}</div>}

            <button onClick={handleStart}>Start My Break</button>
          </div>
        </div>
      ) : (
        <>
          <video className="bg-video" autoPlay loop muted playsInline>
            <source src={media.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <audio ref={audioRef} autoPlay loop muted={muted}>
            <source src={media.audio} type="audio/mp3" />
          </audio>

          <div className="music-controller" onClick={toggleMute}>
            <div className="glass-circle">
              {muted ? (
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="white" d="M16 7H14V17H16V7ZM10 7H8V17H10V7Z" />
                </svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="white" d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
