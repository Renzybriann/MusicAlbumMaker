import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function CustomMusicPlayer({ selectedMusic }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = e.target.value;
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume;
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-black neon-glow rounded-lg">
      <audio ref={audioRef} src={selectedMusic} />

      {/* Custom Controls */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none neon-glow"
          onClick={togglePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <input
          ref={progressBarRef}
          type="range"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleProgressChange}
          className="w-full h-2 rounded-lg neon-progress-bar"
        />
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none neon-glow"
          onClick={toggleMute}
        >
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 rounded-lg neon-progress-bar"
        />
      </div>

      {/* Time Info */}
      <div className="text-white mt-2">
        {Math.floor(currentTime / 60)}:
        {("0" + Math.floor(currentTime % 60)).slice(-2)} /{" "}
        {Math.floor(duration / 60)}:
        {("0" + Math.floor(duration % 60)).slice(-2)}
      </div>

      <style jsx>{`
        .neon-glow {
          box-shadow: 0 0 10px #9b5de5, 0 0 20px #9b5de5, 0 0 30px #9b5de5;
        }
        .neon-progress-bar {
          background: linear-gradient(to right, #9b5de5 0%, #240046 100%);
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default CustomMusicPlayer;
