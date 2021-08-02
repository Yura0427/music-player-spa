import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function UploadProgress() {
  const classes = useStyles();

  const { progress } = useSelector((state) => state.fileUpload);
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
