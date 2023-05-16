import React from "react";
import { push, ref, set } from "firebase/database";
import { realTimeDatabase, storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const REALTIME_DATABASE_KEY = "fruits";
const STORAGE_KEY = "images/";

export default class FruitForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      fileInputFile: null,
      fileInputValue: "",
    };
  }

  writeData = (url) => {
    const fruitListRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
    const newFruitRef = push(fruitListRef);

    set(newFruitRef, {
      name: this.state.name,
      description: this.state.description,
      date: new Date().toLocaleTimeString(),
      url: url,
    });

    this.setState({
      name: "",
      description: "",
      fileInputFile: null,
      fileInputValue: "",
    });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  submit = () => {
    const fullStorageRef = storageRef(
      storage,
      STORAGE_KEY + this.state.fileInputFile.name
    );

    uploadBytes(fullStorageRef, this.state.fileInputFile).then((snapshot) => {
      getDownloadURL(fullStorageRef, this.state.fileInputFile.name).then(
        (url) => {
          this.writeData(url);
        }
      );
    });
  };

  render() {
    return (
      <div>
        <h1>Fruit Form</h1>

        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Insert Fruit Name"
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          type="text"
          name="description"
          value={this.state.description}
          placeholder="Insert Fruit Description"
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <label>Image</label>
        <br />
        <input
          type="file"
          name="file"
          value={this.state.fileInputValue}
          onChange={(e) => {
            this.setState({
              fileInputFile: e.target.files[0],
              fileInputValue: e.target.file,
            });
          }}
        />
        <br />
        <button onClick={this.submit}>Submit Data</button>
      </div>
    );
  }
}
