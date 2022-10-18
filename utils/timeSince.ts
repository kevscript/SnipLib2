const timeSince = (timeStamp: Date) => {
  let now = new Date();
  let secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast.toString()) + "s ago";
  }
  if (secondsPast < 3600) {
    return parseInt((secondsPast / 60).toString()) + "m ago";
  }
  if (secondsPast <= 86400) {
    return parseInt((secondsPast / 3600).toString()) + "h ago";
  }

  if (secondsPast > 86400) {
    let day = timeStamp.getDate();
    let month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)![0]
      .replace(" ", "");
    let year =
      timeStamp.getFullYear() == now.getFullYear()
        ? ""
        : " " + timeStamp.getFullYear();

    return "the " + day + " " + month + year;
  }
};

// d = new Date(1000000000000);
// console.log(timeSince(d));

export default timeSince;
