exports.stringToBoolean = (str) => {
  switch (str) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return undefined;
  }
};
