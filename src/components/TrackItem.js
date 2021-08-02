import { Card, Grid, IconButton } from "@material-ui/core";
import React from "react";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useSelector } from "react-redux";
const TrackItem = ({ track }) => {
  const history = useHistory();
  const { setActiveTrack } = useActions();
  const { active, pause } = useSelector((state) => state.player);

  const playTrack = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    // playTrack();
  };

  const pauseTrack = (e) => {
    e.stopPropagation();
  };
  const style =
    active?._id !== track._id ? {} : { backgroundColor: "lightgrey" };

  return (
    <Card
      style={style}
      className={styles.track}
      onClick={() => {
        history.push("/tracks/" + track._id);
      }}
    >
      <IconButton>
        {active?._id !== track._id ? (
          <PlayArrow onClick={playTrack} />
        ) : pause ? (
          <PlayArrow onClick={playTrack} />
        ) : (
          <Pause onClick={pauseTrack} />
        )}
      </IconButton>
      <img width={70} height={70} src={track.picture} alt="cover" />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active?._id === track._id && <div>02:22 / 03:33</div>}
      <IconButton
        style={{ marginLeft: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
