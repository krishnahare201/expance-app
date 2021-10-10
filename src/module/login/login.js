import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Cookies } from "react-cookie";
import { withRouter } from "react-router";
import { Form, Icon, Input, Button, } from 'antd';
import { postRequest } from '../../utils/request';
const cookie = new Cookies();
class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.expanseLoginFunc(values)
      }
    });
  };
  expanseLoginFunc = async (values) => {
    postRequest(`/login`, { ...values }).then(resp => {
      console.log(resp)
      const { props } = this;
      if (resp.status === 200) {
        const { data = {} } = resp
        cookie.set("token", data.token);
        props.history.push("/expanse");
      } else {
        cookie.remove("token")
        props.history.push("/login");
      }

    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: "flex", marginTop: 150, justifyContent: "center" }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: 'login' })(withRouter(LoginForm));


export default Login;