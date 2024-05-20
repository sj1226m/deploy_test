import React, { useState } from "react";
import "./login.css";
import { Form, Input, Button, notification } from "antd";
import {
  SmileOutlined,
  FrownOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import useLocalStorage, { setStorageItem } from "../../utils/useLocalStorage";

function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");
  const [fieldErrors, setFieldErrors] = useState({});

  console.log("loaded token: ", token);

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/",
          data
        );

        setToken(response.data);
        setStorageItem("username", username);

        notification.open({
          message: "Login SUCCESS",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        navigate("/");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "Login FAILED",
            description: "Check your ID/PW",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                if (!Array.isArray(errors)) {
                  errors = [errors];
                }
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  return (
    <div className="login-container">
      <div className="login-title-container">
        <h1 className="login-title">Welcome to Our Website</h1>
      </div>
      <div className="login">
        <h2 className="login-subtitle">Login</h2>
        <Form className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username! " },
            ]}
            // 무슨 역할인지 ?
            hasFeedback
            {...fieldErrors.username}
            {...fieldErrors.non_field_errors}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password! " },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <div className="login-button-container">
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            <div className="login-text-new-user">New user?</div>
            <Link to="/signup">
              <div type="primary" className="login-text-create-account">
                Create an account
              </div>
            </Link>
            <Link to="/">
              <div className="login-text-create-account">Go back to Home</div>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default Login;
