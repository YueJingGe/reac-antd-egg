import React from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import API from '@common/api.js';
import Style from "./index.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        let response = await API.signup(values);
        if (response.success) {
          notification["success"]({
            message: "注册成功"
          });
          setTimeout(() => {
            this.props.toggleSign();
          }, 500);
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <main className={Style.signup}>
        <header><Icon type="video-camera" /></header>
        <h2>分享精彩世界</h2>
        <Button type="primary" className="login-form-button">使用Facebook登录</Button>
        <p>或</p>
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
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input
                  placeholder="用户名"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </Form.Item>
          </Form>
        </article>
      </main>
    );
  }
}

const WrappedSignUp = Form.create({ name: "normal_login" })(SignUp);
export default WrappedSignUp;
