import type { Configuration } from "webpack/types";
import path from "path";

const getRelPath = (...paths: string[]) => path.resolve(__dirname, ...paths);
const SRC = getRelPath("src");
const DIST = getRelPath("lib");
const ENTRY = getRelPath("src", "index.ts");

const config: Configuration = {
  mode: "production",

  devtool: "source-map",

  entry: ENTRY,

  output: {
    path: DIST,
    library: "index",
    libraryTarget: "umd",
    filename: "index.js",
    clean: true,
    globalObject: "this",
  },

  resolve: {
    extensions: [".js", ".ts", ".json"],
    alias: {
      "@": SRC,
    },
  },

  module: {
    rules: [
      {
        test: /.ts?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};

export default config;
