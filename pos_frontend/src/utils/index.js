export const getRanDomBG = () => {
  const colors = ["bg-yellow-500", "bg-blue-600", "bg-red-600", "bg-green-600"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getBgColor = () => {
  const bgarr = [
    "#FFB6C1",
    "#87CEFA",
    "#98FB98",
    "#FFD700",
    "#FFA07A",
    "#DDA0DD",
  ];
  const randomBg = Math.floor(Math.random() * bgarr.length);
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const formatDate = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()}`;
};

// Hàm format lại tiền VND
export const formatVND = (price) => {
  return (price * 1000).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND"
  });
};

