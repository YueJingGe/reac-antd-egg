import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Login from "./Login/index";
import NotFound from "./NotFound/index";
import Style from './index.scss';

class Layout extends React.Component {
  render() {
    return (
      <div className={Style['layout']}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
  // componentDidMount() {
  //   axios.get("/api").then(data => {
  //     console.log(data);
  //   });
  //   let params = {
  //     username: 'kangkang',
  //     email: '12@163.com',
  //     password: '123456'
  //   }
  //   axios.post("/api/v2/login", params).then(data => {
  //     console.log(data);
  //   });
  // }
}
export default Layout;
