import React from "react";
import { withRouter } from "react-router";
import { Form, Icon, Input, Button, notification } from "antd";
import API from "@common/api.js";
import Style from "./index.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let response = await API.login(values);
        if (response.success) {
          notification["success"]({
            message: "登录成功"
          });
          const { history } = this.props;
          setTimeout(() => {
            history.push("/");
          }, 500);
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <main className={Style.signin}>
        <header>
          <Icon type="video-camera" />
        </header>
        <h2>分享精彩世界</h2>
        <article className="content">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <Form.Item hasFeedback>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "请输入邮箱!" }]
              })(
                <Input
                  placeholder="邮箱"
                  prefix={
                    <Icon type="inbox" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input.Password
                  placeholder="密码"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </article>
      </main>
    );
  }
}

const WrappedSignIn = Form.create({ name: "normal_login" })(SignIn);

export default withRouter(WrappedSignIn);
