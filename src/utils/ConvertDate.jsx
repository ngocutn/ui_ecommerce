export const ConvertDate = (dateStr) => {
  const dateString = dateStr.replace("Z", "+0000");
  const date = new Date(dateString);

  let formattedDate = "Invalid Date"; // Giá trị mặc định

  // Kiểm tra xem ngày có hợp lệ không
  if (!isNaN(date.getTime())) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    formattedDate = date.toLocaleDateString("en-US", options);
  } else {
    console.error("Invalid Date");
  }

  return formattedDate;
};

export default ConvertDate;
