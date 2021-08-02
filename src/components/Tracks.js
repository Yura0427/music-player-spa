import { Box, Button, Card, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TrackList from "./TrackList";
import { fetchTracks } from "../store/actions-creators/track";

const Tracks = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { tracks, error } = useSelector((state) => state.track);
  let style = {};
  const { active } = useSelector((state) => state.player);
  if (active) style={ height: "82vh", overflow: "auto" };
  React.useEffect(() => {
    async function fetchData() {
      dispatch(await fetchTracks()).then(() => {
        setLoading(false);
      });
    }
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Grid container justifyContent="center" style={style}>
      <Card style={{ width: "90%" }}>
        <Box p={3}>
          <Grid container justifyContent="space-between">
            <h1>Track list</h1>
            <Button onClick={() => history.push("/create")}>Download</Button>
          </Grid>
        </Box>
        {error ? <h1>{error}</h1> : <TrackList tracks={tracks} />}
      </Card>
    </Grid>
  );
};

export default Tracks;
