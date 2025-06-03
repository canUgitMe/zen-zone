import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [started, setStarted] = useState(false);
  const [media, setMedia] = useState({ video: '', audio: '' });

  const [nameError, setNameError] = useState('');
  const [timeError, setTimeError] = useState('');

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
    let videoPath = '/videos/morning.mp4';
    let audioPath = '/audio/morning.mp3';

    if (hour >= 5 && hour < 12) {
      videoPath = '/videos/morning.mp4';
      audioPath = '/audio/morning.mp3';
    } else if (hour >= 12 && hour < 18) {
      videoPath = '/videos/evening.mp4';
      audioPath = '/audio/evening.mp3';
    } else {
      videoPath = '/videos/night.mp4';
      audioPath = '/audio/night.mp3';
    }

    setMedia({ video: videoPath, audio: audioPath });
    setStarted(true);
  };

  return (
    <div className="app">
      {!started ? (
        <div className="welcome-overlay">
          <div className="welcome-box">
            <h1>
              Welcome to <span className="zen-highlight">ZenZone</span>
            </h1>

            <label>
              Name<span className="required"></span>
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
              Time of Session<span className="required"></span>
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
          <audio autoPlay loop>
            <source src={media.audio} type="audio/mp3" />
          </audio>
        </>
      )}
    </div>
  );
};

export default App;