import React from "react";
import {Slider,Grid } from "@material-ui/core";

const TrackProgress = ({ left, right, onChange, width }) => {
  const formatDuration = (duration) =>
  `${("0" + Math.floor((duration / 60) % 60)).slice(-2)}:${(
    "0" + Math.floor(duration % 60)
  ).slice(-2)}`;

  return (
    <div style={{ width }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>{formatDuration(left)}</Grid>
        <Grid item xs>
          <Slider  min={0} max={right} value={left} onChange={onChange} />
        </Grid>
        <Grid item>{formatDuration(right)}</Grid>
      </Grid>
    </div>
  );
};

export default TrackProgress;

