import React, { useState } from "react";
import "./foodMenu.css";

function FoodMenu({ food, selected }) {
  return (
    <>
      {selected && (
        <div className="container">
          <div className="message-container">
            <div className="message-box">
              <a href={food.tag} className="foodMenu-card-text">
                Link to Kakao Map
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodMenu;
