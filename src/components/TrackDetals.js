import { Box, Button,  Grid, TextField } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../firebase";

const TrackDetals = ({ match }) => {
  const { params } = match;

  const [track, setTrack] = React.useState({});
  React.useEffect(() => {
    async function fetchData() {
      console.log(params._id);
      firestore
        .collection("trackListDemo")
        .doc(`${params._id}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let data = { ...doc.data(), _id: doc.id };
            firestore
              .collection("comments")
              .where("_id", "==", params._id)
              .onSnapshot((querySnapshot) => {
                var comments = [];
                querySnapshot.forEach((doc) => {
                  comments.push(doc.data());
                });
                data = { ...data, comments };
                setTrack(data);
              });
          }
        });
    }
    fetchData();
  }, [params._id]);

  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [text, setText] = React.useState("");

  const addComment = async () => {
    await firestore.collection("comments").add({
      username: username,
      text: text,
      _id: track._id,
    });
    setUsername("");
    setText("");
  };
  React.useEffect(() => {}, []);
  return (
    <Box m={2}>
      <Button
        style={{ fontSize: 32 }}
        variant="outlined"
        onClick={() => history.push("/tracks")}
      >
        Back
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img src={track.picture} width={200} height={200} alt="cover" />
        <div style={{ marginLeft: 30 }}>
          <h1>Track name - {track.name}</h1>
          <h1>Artist - {track.artist}</h1>
          <h1>Listens - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Track text</h1>
      <p>{track.text}</p>
      <h1>Coments</h1>
      <Grid container>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Your name"
          fullWidth
        />
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Comment"
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments?.map((coment, index) => (
          <div key={index}>
            <div>Name - {coment.username}</div>
            <div>Comment - {coment.text}</div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default TrackDetals;
