import React from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";
import { useActions } from "../hooks/useActions";

const FileUpload = ({ setFile, accept, children }) => {
  const { setProgress } = useActions();

  const ref = React.useRef();
  const onChange = (e) => {
    const file = e.target.files[0];
    const fileName = `${uuidv4()}.${file.type.split("/")[1]}`;
    const storageRef = storage
      .ref()
      .child(`${accept.split("/")[0]}/` + fileName);
    const uploadTask = storageRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.ceil(progress));
        setProgress(Math.ceil(progress));
      },
      (error) => {
        console.error("Upload error ", error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((photoURL) => {
          console.log(photoURL);
          setFile(photoURL);
        });
      }
    );
  };
  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
