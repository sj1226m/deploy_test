import React from "react";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import {
  FaRegGrinHearts,
  FaRegSadTear,
  FaRegUser,
} from "react-icons/fa";

function EmotionIcon({ onClick, className, emotion }) {
  const iconStyle = {
    fontSize: "72px",
    color: "black",
  };
  let EmotionName;

  if (emotion === "happy") {
    EmotionName = SmileOutlined;
  } else if (emotion === "sad") {
    EmotionName = FaRegSadTear;
  } else if (emotion === "angry") {
    EmotionName = FrownOutlined;
  } else if (emotion === "love") {
    EmotionName = FaRegGrinHearts;
  } else if (emotion === "everything") {
    EmotionName = FaRegUser;
  } else {
    // 기본값이나 예외 처리를 추가할 수 있습니다.
    EmotionName = <div>Unknown Emotion</div>;
  }
  return (
    <EmotionName style={iconStyle} onClick={onClick} className={className} />
  );
}
export default EmotionIcon;
