import React, { Component } from "react";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      list: []
    };
  }
  getData() {
    axios
      .post("http://localhost:8000/bearList", {})
      .then(res => {
        console.log(res);
        this.setState({ list: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  valueChange(e) {
    this.setState({ name: e.target.value });
  }
  submit() {
    if (this.state.name.length) {
      axios
        .post("http://localhost:8000/bear", {
          name: this.state.name
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  load() {
    this.getData();
  }
  render() {
    return (
      <div>
        <input
          placeholder="please input"
          onChange={this.valueChange.bind(this)}
        />
        <button onClick={this.submit.bind(this)}>submit name</button>
        <p onClick={this.load.bind(this)}>加载数据</p>
        {this.state.list.length ? (
          <div>{this.state.list.map((m, i) => <p key={i}>{m.name}</p>)}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
