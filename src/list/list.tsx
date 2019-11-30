import * as React from "react";
import { getDB } from "../data/data";
import { FormEvent } from 'react';

interface ThingListState {
  data: any[];
  value: string;
}

export default class ThingList extends React.Component<{}, ThingListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [
        {
          title: "Blah"
        }
      ],
      value: ""
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    getDB()
      .collection("things")
      .get()
      .then(querySnapshot => {
        const data: any[] = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
        this.setState({ data });
      });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    getDB()
      .collection("things")
      .add({
        title: this.state.value,
        category: "Animal"
      })
      .then(() => {
        this.refreshData();
      });
  }

  handleChange(event: FormEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.setState({ value: target.value });
  }

  render() {
    let itemList = this.state.data.map(function(item) {
      return (
        <li className="item" key={item.title}>
          {item.title}
        </li>
      );
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </form>
        <ul>{itemList}</ul>
      </div>
    );
  }
}
