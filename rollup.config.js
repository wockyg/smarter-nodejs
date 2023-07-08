import run from "@rollup/plugin-run";

export default {
  input: "server.js",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
  plugins: [run()],
};