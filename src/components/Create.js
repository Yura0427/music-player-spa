import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FileUpload from "./FileUpload";
import StepWrapper from "./StepWrapper";
import { firestore } from "../firebase";
import { useInput } from "../hooks/useInput";
import UploadProgress from "./UploadProgress";
import { useSelector } from "react-redux";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const history = useHistory();
  const { progress } = useSelector((state) => state.fileUpload);

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const data = {
        name: name.value,
        artist: artist.value,
        text: text.value,
        picture: picture,
        audio: audio,
        comments: [],
      };
      console.log(data);

      firestore
        .collection("trackListDemo")
        .add(data)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          history.push("/tracks");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label={"Track name"}
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label={"Author's name"}
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label={"Track text"}
              multiline
              rows={5}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <>
            <FileUpload setFile={setPicture} accept="image/*">
              <Button style={{ width: "100%", height: 300 }}>
                Download cover
              </Button>
            </FileUpload>
            <UploadProgress />
          </>
        )}
        {activeStep === 2 && (
          <>
            <FileUpload setFile={setAudio} accept="audio/*">
              <Button style={{ width: "100%", height: 300 }}>
                Loading track
              </Button>
            </FileUpload>
            <UploadProgress />
          </>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Back
        </Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </>
  );
};

export default Create;
