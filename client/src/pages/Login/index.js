import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Style from "./index.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: true
    };
    this.toggleSign = this.toggleSign.bind(this);
  }
  toggleSign() {
    console.log(this);
    
    this.setState({
      isSignUp: !this.state.isSignUp
    });
  }
  render() {
    return (
      <main className={Style.login}>
        <article className="login-info">
          <section className="descript">
            <div className="photo" />
          </section>
          <section className="login_dialog">
            {this.state.isSignUp ? <SignIn /> : <SignUp toggleSign={this.toggleSign}/>}
            <div className="toggle-ways">
              {this.state.isSignUp ? (
                <span>
                  没有账号？<a onClick={this.toggleSign.bind(this)}>注册</a>
                </span>
              ) : (
                <span>
                  有账号了？<a onClick={this.toggleSign.bind(this)}>请登录</a>
                </span>
              )}
            </div>
          </section>
        </article>

        <footer>底部</footer>
      </main>
    );
  }
}

export default Login;
