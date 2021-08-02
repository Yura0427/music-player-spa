import { Box, Grid } from "@material-ui/core";
import React from "react";
import TrackItem from "./TrackItem";


const TrackList = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {
          tracks.map((track) => {
            return <TrackItem key={track._id} track={track} />;
          })}
      </Box>
    </Grid>
  );
};

export default TrackList;
