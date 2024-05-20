import React, { useState } from "react";
import { List, Space } from "antd";
import "./foodList.css";
import FoodMenu from "./foodMenu";
import showAlert from "../../utils/alert";
import { useIsLogin } from "../../utils/isLogin";
import { HeartIcon, HeartIconSelected } from "./heartIcon";

function FoodList(props) {
  const isLogin = useIsLogin();
  const [selected, setSelected] = useState(false);
  const [tmp, setTmp] = useState(-1);

  const handleHeartClick = (index, place) => {
    if (!isLogin) {
      showAlert({
        text: "If you want to save place, LOGIN First",
        footer: "Go to login page",
        link: "/login",
      });
    } else {
      props.heartClick(index, place);
    }
  };
  const pageSize = 3;
  const [page, setPage] = useState(0);

  const handleNameClick = (idx, x_coor, y_coor) => {
    let calculatedIndex;
    if (page === 0) {
      calculatedIndex = idx;
    } else {
      calculatedIndex = (page - 1) * pageSize + idx;
    }

    props.onClickName(calculatedIndex, x_coor, y_coor);
    setSelected(!selected);
  };
  const handleNameClickVer2 = (idx, x_coor, y_coor) => {
    let calculatedIndex;
    if (page === 0) {
      calculatedIndex = idx;
    } else {
      calculatedIndex = (page - 1) * pageSize + idx;
    }
    props.onClickName(calculatedIndex, x_coor, y_coor);
  };

  const IconText = ({ icon: IconComponent, text, item, iconStyle }) => (
    <Space
      onClick={() => {
        handleHeartClick(item.id - 1, item);
      }}
    >
      {React.createElement(IconComponent, { className: iconStyle })}
      {text}
    </Space>
  );
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
        align: "center",
        onChange: (page) => {
          setPage(page);
          console.log(page);
        },
      }}
      dataSource={props.filteredData}
      renderItem={(item, idx) => (
        <List.Item
          key={idx}
          actions={[
            <IconText
              icon={props.hearts[item.id - 1] ? HeartIconSelected : HeartIcon}
              item={item}
              iconStyle={
                props.hearts[item.id - 1]
                  ? "map-heart-selected"
                  : "map-heart-default"
              }
            />,
          ]}
          extra={
            idx === tmp ? <FoodMenu food={item} selected={selected} /> : null
          }
        >
          <List.Item.Meta
            title={
              <div>
                <a
                  className="list-item-meta-title"
                  href={item.href}
                  onClick={(e) => {
                    if (!selected) {
                      handleNameClick(idx, item.x_coor, item.y_coor);
                    }
                    setTmp(idx);
                    handleNameClickVer2(idx, item.x_coor, item.y_coor);
                    setSelected(!selected);
                  }}
                >
                  {item.name}
                </a>
              </div>
            }
            description={
              <div className="list-item-meta-description">{item.sentence}</div>
            }
          />
        </List.Item>
      )}
    />
  );
}
export default FoodList;
