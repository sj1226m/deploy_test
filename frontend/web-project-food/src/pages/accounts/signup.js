import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  SmileOutlined,
  FrownOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./login.css";

function Signup() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      const data = { username, password };
      try {
        await Axios.post("http://localhost:8000/accounts/signup/", data);
        notification.open({
          message: "Sign up SUCCESS",
          description: "Go to Login Page",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        navigate("/login");
      } catch (error) {
        if (error.response) {
          let errorDecription = "";

          //이미 존재하는 username을 입력한 경우
          if (
            error.response.data.username[0].includes("username already exists")
          ) {
            errorDecription = "Already existed user";
          } else {
            errorDecription = "Can't use that ID/PW";
          }

          notification.open({
            message: "Sign Up Failed",
            description: errorDecription,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        }
      }
    }
    fn();
  };

  return (
    <div className="login-container">
      <div className="login-title-container">
        <h1 className="login-title">Welcome to Our Website </h1>
      </div>
      <div className="login">
        <h2 className="login-subtitle">Sign Up</h2>
        <Form className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username! " },
            ]}
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
                Signup
              </Button>
            </Form.Item>
          </div>
          <div className="login-text-new-user">Already have an account?</div>

          <Link to="/login">
            <div className="login-text-create-account">Go back to Login</div>
          </Link>
          <Link to="/">
            <div className="login-text-create-account">Go back to Home</div>
          </Link>
        </Form>
      </div>
    </div>
  );
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default Signup;
