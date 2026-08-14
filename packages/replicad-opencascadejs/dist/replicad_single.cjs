module.exports = (...args) =>
  import("./replicad_single.js").then(({ default: init }) => init(...args));
