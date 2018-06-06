import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.pageSize = 10;
    this.pageIndex = 2;
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios
      .post("/lists", {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      })
      .then(res => {
        let resData = res.data;
        this.setState({ list: this.state.list.concat(resData) });
      })
      .catch(err => {
        console.log(err);
      });
  }
  loadMore() {
    this.pageIndex++;
    this.getData();
  }
  delete() {}
  render() {
    return (
      <div>
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
        <button onClick={this.loadMore.bind(this)}>加载下一页</button>
      </div>
    );
  }
}
