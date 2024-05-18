module.exports = {
  error: (...args) => console.error("E:", ...args),
  info: (...args) => console.log("I:", ...args),
  warn: (...args) => console.warn("W:", ...args),
  debug: (...args) => console.debug("D:", ...args),
};
