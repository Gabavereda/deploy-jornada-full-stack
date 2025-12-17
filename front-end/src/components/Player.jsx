import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatTime = (seconds = 0) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");

  const durationInSeconds =
    duration?.includes(":")
      ? Number(duration.split(":")[0]) * 60 +
        Number(duration.split(":")[1])
      : 0;

  const playPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    } catch (err) {
      console.error("Erro ao tocar áudio:", err);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const interval = setInterval(() => {
      if (!isPlaying) return;

      const current = audioRef.current.currentTime;
      setCurrentTime(formatTime(current));

      if (progressRef.current && durationInSeconds) {
        progressRef.current.style.setProperty(
          "--_progress",
          `${(current / durationInSeconds) * 100}%`
        );
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, durationInSeconds]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime("00:00");
  }, [audio]);

  return (
    <div className="player">
      <div className="player__controllers">
        {randomIdFromArtist && (
          <Link to={`/song/${randomIdFromArtist}`}>
            <FontAwesomeIcon icon={faBackwardStep} />
          </Link>
        )}

        <FontAwesomeIcon
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />

        {randomId2FromArtist && (
          <Link to={`/song/${randomId2FromArtist}`}>
            <FontAwesomeIcon icon={faForwardStep} />
          </Link>
        )}
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div
            ref={progressRef}
            className="player__bar-progress"
          />
        </div>

        <p>{duration}</p>
      </div>

      <audio ref={audioRef} src={audio} preload="metadata" />
    </div>
  );
};

export default Player;
