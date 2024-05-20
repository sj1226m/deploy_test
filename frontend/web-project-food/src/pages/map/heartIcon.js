// HeartIcon.js
import React from "react";

export const HeartIcon = ({ alt }) => {
  const width = "24px";
  const height = "24px";
  const cursor = "pointer";
  return (
    <img src="/img/heartGray.png" alt={alt} style={{ width, height, cursor }} />
  );
};
export const HeartIconSelected = ({ alt }) => {
  const width = "24px";
  const height = "24px";
  return <img src="/img/heartBlue.png" alt={alt} style={{ width, height }} />;
};
