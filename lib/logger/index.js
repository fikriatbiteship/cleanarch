module.exports = {
  error: (...args) => console.error("ERROR:", ...args),
  info: (...args) => console.log("INFO:", ...args),
  warn: (...args) => console.warn("WARN:", ...args),
  debug: (...args) => console.debug("DEBUG:", ...args),
};
