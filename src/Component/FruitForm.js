import React from "react";
import { push, ref, set } from "firebase/database";
import { realTimeDatabase } from "../firebase";

const REALTIME_DATABASE_KEY = "fruits";

export default class FruitForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
    };
  }

  writeData = () => {
    const fruitListRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);
    const newFruitRef = push(fruitListRef);

    set(newFruitRef, {
      name: this.state.name,
      description: this.state.description,
      date: new Date().toLocaleTimeString(),
    });

    this.setState({
      name: "",
      description: "",
    });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
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
        <button onClick={this.writeData}>Submit Data</button>
      </div>
    );
  }
}
