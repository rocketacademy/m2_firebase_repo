import React from "react";

import { onChildAdded, ref } from "firebase/database";
import { realTimeDatabase } from "../firebase";

const REALTIME_DATABASE_KEY = "fruits";

export default class FruitList extends React.Component {
  constructor() {
    super();

    this.state = {
      fruits: [],
    };
  }

  componentDidMount() {
    const fruitListRef = ref(realTimeDatabase, REALTIME_DATABASE_KEY);

    onChildAdded(fruitListRef, (data) => {
      this.setState((state) => ({
        fruits: [...state.fruits, { key: data.key, val: data.val() }],
      }));
    });
  }

  render() {
    return (
      <div>
        <ol>
          {this.state.fruits && this.state.fruits.length > 0 ? (
            this.state.fruits.map((fruitItem) => (
              <li key={fruitItem.key}>
                <div>
                  <h2>
                    {fruitItem.val.name} - {fruitItem.val.date}
                  </h2>
                  <p>{fruitItem.val.description}</p>

                  {fruitItem.val.url ? (
                    <img src={fruitItem.val.url} alt={fruitItem.val.name} />
                  ) : (
                    <p>No images</p>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No fruit here</p>
          )}
        </ol>
      </div>
    );
  }
}
