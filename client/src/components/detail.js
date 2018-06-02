import React, { Component } from "react";
import axios from "axios";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      content: ""
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
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
  fixed() {
    if (this.state.content) {
      axios
        .post("/update", {})
        .then(res => {
          console.log(res);
          this.setState({ list: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    const { content, date, id } = this.state.user;
    return (
      <div>
        <p>
          {" "}
          {content} {date} {id}
        </p>
        <input />
        <button onClick={this.fixed.bind(this)}>修改</button>
      </div>
    );
  }
}
export default Detail;
