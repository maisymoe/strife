import { lowlight, Root, Text, Span } from "lowlight/lib/core";
import json from "highlight.js/lib/languages/json";
import { React, ReactNative } from "@vendetta/metro/common";

lowlight.registerLanguage("json", json);

const { StyleSheet, Text } = ReactNative;

const scheme = StyleSheet.create({
  punctuation: { color: "#da70d6" },
  attr: { color: "#c79cea" },
  string: { color: "#c3e88d" },
  number: { color: "#f78c6c" },
  keyword: { color: "#7bc4e1" },
  default: {},
});

// These are the colors for the old highlighter.
// brackets: "#da70d6", // {}[]
// punctuation: "#7bc4e1", // ,.:"
// key: "#c79cea", // object key content
// string: "#c3e88d", // string content
// number: "#f78c6c", // numbers
// special: "#7bc4e1", // true, false, null

const spanToReact = (span: Span) =>
  React.createElement(Text, {
    style: scheme[span.properties.className[0]] ?? scheme.default
  }, span.children.map((child) => childToReact(child)));
const textToReact = (text: Text) => React.createElement(Text, undefined, text.value);
const childToReact = (child: Span | Text) => child.type === "text" ? textToReact(child) : spanToReact(child);

const hastToText = (hast: Root) =>
  hast.children.flatMap((child) => childToReact(child));

export const highlightJson = (json: string) => hastToText(lowlight.highlight("json", json, { prefix: "" }));