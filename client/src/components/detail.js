import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function isEmpty(obj) {
  for (var i in obj) {
    return true;
  }
  return false;
}

@withRouter
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      content: ""
    };
    this.id = this.props.match.params.id;
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    console.log(this.props.match.params.id);
    axios
      .post("/detail", { date: this.id })
      .then(res => {
        console.log(res);
        this.setState({ user: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  valueChange(e) {
    this.setState({ content: e.target.value });
  }
  fixed() {
    if (this.state.content) {
      axios
        .post("/update", {
          content: this.state.content,
          date: this.id
        })
        .then(res => {
          if (res.data.code === 200) {
            console.log(this.props, "props");
            this.props.history.replace("/index");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    // if (!Object.keys(this.state.user).length) return <div />;
    // if (!isEmpty(this.state.user)) return <div />;
    return (
      <div>
        <p>
          {this.state.user.content} {this.state.user._id}
        </p>
        <input onChange={this.valueChange.bind(this)} />
        <button onClick={this.fixed.bind(this)}>修改</button>
      </div>
    );
  }
}
export default Detail;
