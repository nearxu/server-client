import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      list: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios
      .post("/bearList", {})
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
        .post("/bear", {
          content: this.state.name,
          date: new Date().getTime()
        })
        .then(res => {
          console.log(res.data, "data");
          this.setState({ list: res.data }, () => {
            this.value.value = "";
            this.state.list = [];
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  deleteAll() {
    if (this.state.list.length) {
      axios
        .post("/deleteAll", {})
        .then(res => {
          console.log(res);
          this.setState({ list: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  delete(data) {
    console.log(data, "index");
    axios
      .post("/delete", { date: data.date })
      .then(res => {
        console.log(res);
        this.setState({ list: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  fixed() {}
  render() {
    return (
      <div>
        <input
          ref={value => (this.value = value)}
          placeholder="please input"
          onChange={this.valueChange.bind(this)}
        />
        <button onClick={this.submit.bind(this)}>submit content</button>
        <button onClick={this.deleteAll.bind(this)}>删除所有</button>
        {this.state.list.length ? (
          <div>
            {this.state.list.map((data, index) => {
              return (
                <div key={index}>
                  <span>{data.content}</span>
                  <button onClick={this.delete.bind(this, data)}> 删除 </button>
                  <Link to={`/detail/${data.date}`}> 修改</Link>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* <p onClick={this.load.bind(this)}>load-more</p> */}
      </div>
    );
  }
}
