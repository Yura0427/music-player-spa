import { Grid, IconButton } from "@material-ui/core";
import {
  Pause,
  PlayArrow,
  VolumeUp,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeOff,
} from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import VolumeProgress from "./VolumeProgress";
let audio;

const Player = () => {
  const { tracks } = useSelector((state) => state.track);
  const { pause, volume, active, duration, currentTime } = useSelector(
    (state) => state.player
  );

  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();

  React.useEffect(() => {
    console.log("audio", audio);
    console.log("active", active);
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      // play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
      audio.onended = (event) => {
        let index = tracks.findIndex((track) => track._id === active._id) + 1;
        if (index === tracks.length) index = 0;
        setActiveTrack(tracks[index]);
      };
      play();
    }
  };

  const play = () => {
    playTrack();
    audio.play();
  };
  const playNext = () => {
    let index = tracks.findIndex((track) => track._id === active._id) + 1;
    if (index === tracks.length) index = 0;
    setActiveTrack(tracks[index]);
  };
  const playPrevious = () => {
    let index = tracks.findIndex((track) => track._id === active._id) - 1;
    if (index < 0) index = tracks.length - 1;
    setActiveTrack(tracks[index]);
  };

  const changeVolume = (e, newValue) => {
    audio.volume = Number(newValue) / 100;
    setVolume(Number(newValue));
  };

  const changeCurrentTime = (e, newValue) => {
    // audio.currentTime = Number(e.target.value);
    // setCurrentTime(Number(e.target.value));
    audio.currentTime = Number(newValue);
    setCurrentTime(Number(newValue));
  };
  if (!active) return null;
  return (
    <div className={styles.player}>
      <IconButton>
        <SkipPrevious onClick={playPrevious} />
      </IconButton>
      <IconButton>
        {pause ? (
          <PlayArrow onClick={play} />
        ) : (
          <Pause
            onClick={() => {
              pauseTrack();
              audio.pause();
            }}
          />
        )}
      </IconButton>
      <IconButton>
        <SkipNext onClick={playNext} />
      </IconButton>

      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        width="100%"
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <div className={styles.volume}>
        <IconButton
          onClick={() => {
            audio.volume = 0;
            setVolume(0);
          }}
        >
          {volume > 49 ? (
            <VolumeUp />
          ) : volume === 0 ? (
            <VolumeOff />
          ) : (
            <VolumeDown />
          )}
        </IconButton>

        <div className={styles.volProgress}>
          <VolumeProgress left={volume} right={100} onChange={changeVolume} />
        </div>
      </div>
    </div>
  );
};

export default Player;
