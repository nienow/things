import * as React from "react";
import ThingList from "../list/list";
import Admin from "../admin/admin";

export default class App extends React.Component<{}, any> {
  render() {
    return (
      <div>
        <Admin />
        <ThingList />
      </div>
    );
  }
}
