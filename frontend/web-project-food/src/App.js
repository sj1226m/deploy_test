import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/accounts/login";
import Signup from "./pages/accounts/signup";
import MainMap from "./pages/map/mainMap";
import MyMap from "./pages/myMap/myMap";
import BasicMap from "./pages/prac/prac";

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map/:emotion/:place" element={<MainMap />} />
        <Route path="/myMap" element={<MyMap />} />
        <Route path="*" element={<p>Not Found</p>} />
        <Route path="/prac" element={<BasicMap />} />
      </Routes>
    </Router>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    --line-color: #999999;
    --background-color: #fbfbfb;
    height: 100vh;
    margin:0;

    
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    background-color: #fbfbfb;
    height: 100vh ;

  }
  //
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: moirai, jua;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  button {
    background-color: white;
    border: none;
  }

  input {
    border: none;
  }

  h1 {
    font-size: 17px;
    font-weight: 500;
  }
  h2 {
    font-size: 16px;
    font-weight: 500;
  }
  h3 {
    font-size: 15px;
    font-weight: 400;
  }
  p {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }

  // 영문 폰트
  @font-face {
    font-family: "moirai";
    src: url("/font/MoiraiOne-Regular.ttf"); //public 폴더
    font-display: swap;
    unicode-range: U+0041-005A, U+0061-007A;
  }

  // 한글 폰트
  @font-face {
    font-family: "jua";
    src: url("/font/Jua-Regular.ttf");
    font-display: swap;
    unicode-range: U+AC00-D7A3;
  }

  @font-face {
      font-family: "montserrat";
      src: url("/font/Montserrat-Light.ttf");
      font-display: swap;
      unicode-range: U+AC00-D7A3;
  }
  @font-face {
      font-family: "NotoSans";
      src: url("/font/NotoSansKR-SemiBold.ttf");
      font-display: swap;
      unicode-range: U+AC00-D7A3;
  }

`;
