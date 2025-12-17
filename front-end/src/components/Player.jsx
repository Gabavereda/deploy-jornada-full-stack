import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));

  const durationInSeconds = timeInSeconds(duration);

  const playPause = () => {
    if (!audioPlayer.current) return;

    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }

    setIsPlaying((prev) => !prev);
  };

  // ⏱ Atualiza tempo e barra
  useEffect(() => {
    if (!audioPlayer.current || !progressBar.current) return;

    const intervalId = setInterval(() => {
      if (!isPlaying) return;

      const current = audioPlayer.current.currentTime;

      setCurrentTime(formatTime(current));

      progressBar.current.style.setProperty(
        "--_progress",
        `${(current / durationInSeconds) * 100}%`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, durationInSeconds]);

  // 🔁 Resetar player ao trocar de música
  useEffect(() => {
    if (!audioPlayer.current) return;

    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(formatTime(0));
  }, [audio]);

  return (
    <div className="player">
      <div className="player__controllers">
        {randomIdFromArtist && (
          <Link to={`/song/${randomIdFromArtist}`}>
            <FontAwesomeIcon
              className="player__icon"
              icon={faBackwardStep}
            />
          </Link>
        )}

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />

        {randomId2FromArtist && (
          <Link to={`/song/${randomId2FromArtist}`}>
            <FontAwesomeIcon
              className="player__icon"
              icon={faForwardStep}
            />
          </Link>
        )}
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div
            ref={progressBar}
            className="player__bar-progress"
          />
        </div>

        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio} />
    </div>
  );
};

export default Player;
