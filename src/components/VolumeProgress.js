import { Grid, Slider } from "@material-ui/core";
import { VolumeDown } from "@material-ui/icons";
import React from "react";

const VolumeProgress = ({ left, right, onChange, width }) => {
  return (
    <div style={{ position: "absolute", right: 10 , bottom: 40, height: 100,  }}>
      <Slider
        orientation="vertical"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
    </div>
  );
};

export default VolumeProgress;
