import * as React from 'react';
import Admin from '../admin/admin';
import ThingCategory from '../category/category';
import {
    getDB,
    ThingItem
} from '../data/data';
import './app.css';
import { FormEvent } from 'react';

interface AppState {
    categories: string[];
    data:  Map<string, ThingItem[]>;
    newCat: string;
    newTitle: string;
}

export default class App extends React.Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = {categories: [], data: new Map(), newCat: '', newTitle: ''}
    }

    componentDidMount(): void {
        this.fetchData();
    }

    parseData(data: ThingItem[]) {
        data.forEach((item: ThingItem) => {
            let category = this.state.data.get(item.category);
            if (!category) {
                category = [];
                this.state.data.set(item.category, category);
                this.state.categories.push(item.category);
            }
            category.push(item);
        });
        this.setState({
            categories: this.state.categories,
            data: this.state.data
        });
    }


    fetchData() {
        getDB()
        .collection("things")
        .get()
        .then(querySnapshot => {
            const data: ThingItem[] = [];
            querySnapshot.forEach(doc => {
                data.push(doc.data() as ThingItem);
            });
            this.parseData(data);
        });
    }

    loopCats() {
        if (this.state.categories) {
            return this.state.categories.map((cat: string) => {
                const data = this.state.data.get(cat) || [];
                return <ThingCategory category={cat} data={data}/>
            })
        }
    }

    handleSubmit(event: FormEvent) {
        event.preventDefault();
        getDB()
        .collection('things')
        .add({
            title: this.state.newTitle,
            category: this.state.newCat
        })
        .then(() => {
            this.fetchData();
        });
    }

    handleCatChange(event: FormEvent) {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({ newCat: target.value });
    }

    handleTitleChange(event: FormEvent) {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({ newTitle: target.value });
    }

  render() {
    return (
      <div className="main">
        <Admin />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
              type="text"
              value={this.state.newCat}
              onChange={this.handleCatChange.bind(this)}
              placeholder={"New Category..."}
          />
            <input
                type="text"
                value={this.state.newTitle}
                onChange={this.handleTitleChange.bind(this)}
                placeholder={"New Title..."}
            />
            <button type="submit">Submit</button>
        </form>
        <div className="category-list">
          {this.loopCats()}
        </div>
      </div>
    );
  }
}
