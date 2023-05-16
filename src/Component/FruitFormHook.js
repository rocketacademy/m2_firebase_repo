import { push, ref, set } from "firebase/database";
import { realTimeDatabase, storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";

const REALTIME_DATABASE_KEY = "fruits";
const STORAGE_KEY = "images/";

export default function FruitForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileInputFile, setFileInputFile] = useState("");
  const [fileInputValue, setFileInputValue] = useState("");

  const writeData = (url) => {
    const fruitListRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
    const newFruitRef = push(fruitListRef);

    set(newFruitRef, {
      name: name,
      description: description,
      date: new Date().toLocaleTimeString(),
      url: url,
    });

    setName("");
    setDescription("");
    setFileInputFile(null);
    setFileInputValue("");
  };

  const submit = () => {
    const fullStorageRef = storageRef(
      storage,
      STORAGE_KEY + fileInputFile.name
    );

    uploadBytes(fullStorageRef, fileInputFile).then((snapshot) => {
      getDownloadURL(fullStorageRef, fileInputFile.name).then((url) => {
        writeData(url);
      });
    });
  };
  return (
    <div>
      <h1>Fruit Form</h1>

      <label>Name</label>
      <br />
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Insert Fruit Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Description</label>
      <br />
      <input
        type="text"
        name="description"
        value={description}
        placeholder="Insert Fruit Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Image</label>
      <br />
      <input
        type="file"
        name="file"
        value={fileInputValue}
        onChange={(e) => {
          setFileInputFile(e.target.files[0]);
          setFileInputValue(e.target.file);
        }}
      />
      <br />
      <button onClick={submit}>Submit Data</button>
    </div>
  );
}
