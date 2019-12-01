import * as React from 'react';
import {
  getDB,
  ThingItem
} from '../data/data';
import { FormEvent } from 'react';
import './category.css';
import ThingList from '../list/list';

interface CategoryState {
  data: any[];
  value: string;
}

interface CategoryProps {
  category: string;
  data: ThingItem[];
}

export default class ThingCategory extends React.Component<CategoryProps, CategoryState> {
  constructor(props: CategoryProps) {
    super(props);
    this.state = {
      data: props.data,
      value: ''
    };
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    getDB()
      .collection('things')
      .add({
        title: this.state.value,
        category: this.props.category
      })
      .then(() => {
        this.state.data.push({
          title: this.state.value,
          category: this.props.category
        });
        this.setState({
          data: this.state.data,
          value: ''
        });
      });
  }

  handleChange(event: FormEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.setState({ value: target.value });
  }

  render() {
    return (
      <div className="category-item">
        <div>{this.props.category}</div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            placeholder={"New " + this.props.category + "..."}
          />
        </form>
        <ThingList data={this.state.data}></ThingList>
      </div>
    );
  }
}
