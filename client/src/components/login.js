import React, { Component } from "react";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pwd: ""
    };
  }
  changeValue(e, type) {
    if (type === "name") {
      this.setState({ name: e.target.value });
    } else {
      this.setState({ pwd: e.target.value });
    }
  }
  submit() {
    axios
      .post("/login", {
        name: this.state.name,
        pwd: this.state.pwd
      })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
          console.log(this.props, "props");
          this.props.history.replace("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h1>登录</h1>
        <label>
          <span>username</span>
          <input
            placeholder="name"
            onChange={e => this.changeValue(e, "name")}
          />
        </label>
        <hr />
        <label>
          <span>password</span>
          <input
            placeholder="password"
            onChange={e => this.changeValue(e, "pwd")}
          />
        </label>
        <hr />
        <button onClick={this.submit.bind(this)}>login</button>
      </div>
    );
  }
}
