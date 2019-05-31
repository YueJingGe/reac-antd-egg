import React from "react";
import axios from "axios";
import Nav from '@components/Nav/index.js'

class Instagram extends React.Component {
  render() {
    return <main>
      <Nav />
    </main>;
  }
  componentDidMount() {
    axios.get("/api").then(data => {
      console.log(data);
    });
    let params = {
      username: 'kangkang',
      email: '12@163.com',
      password: '123456'
    }
    axios.post("/api/v2/login", params).then(data => {
      console.log(data);
    });
  }
}
export default Instagram;
