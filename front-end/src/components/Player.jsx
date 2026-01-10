import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

const formatTime = (seconds = 0) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const Player = ({ randomIdFromArtist, randomId2FromArtist, audio }) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioUrl = audio?.startsWith("http")
    ? audio
    : `${API_URL}${audio?.startsWith("/") ? audio : "/" + audio}`;

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Erro ao tocar áudio:", err);
    }
  };

  // Eventos nativos do áudio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl]);


  const incrementPlayCount = async (songId) => {
    try {
      await fetch(`${API_URL}/api/songs/${songId}/play`, {
        method: "POST",
      });

    } catch (error) {
      console.error("Erro ao incrementar o player", error);
    }
  };


  // Quando muda de música - COM AUTO-PLAY ADICIONADO
  useEffect(() => {
    if (!audioRef.current || !audioUrl) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);

    // AUTO-PLAY ao trocar de música
    audioRef.current.load();
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);

        if (songId) { // songid prop
          incrementPlayCount(songId);
        }
      })
      .catch(err => console.error("Auto-play bloqueado:", err));
  }, [audioUrl]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player">
      <div className="player__controllers">
        {randomIdFromArtist && (
          <Link to={`/song/${randomIdFromArtist}`}>
            <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
          </Link>
        )}

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={togglePlay}
        />

        {randomId2FromArtist && (
          <Link to={`/song/${randomId2FromArtist}`}>
            <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
          </Link>
        )}
      </div>

      <div className="player__progress">
        <p>{formatTime(currentTime)}</p>

        <div className="player__bar">
          <div
            className="player__bar-progress"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>{formatTime(duration)}</p>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

export default Player;