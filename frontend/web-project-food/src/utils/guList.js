function GuList({ guNum }) {
  let guName;
  if (guNum === 3) {
    guName = "강남";
  } else if (guNum === 4) {
    guName = "관악";
  } else if (guNum === 5) {
    guName = "마포";
  } else if (guNum === 6) {
    guName = "서초";
  } else if (guNum === 7) {
    guName = "성동";
  } else if (guNum === 8) {
    guName = "종로";
  } else {
    guName = "미정";
  }
  return guName;
}

export default GuList;
