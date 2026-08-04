module.exports = (...args) =>
  import("./replicad_multi.js").then(({ default: init }) => init(...args));
