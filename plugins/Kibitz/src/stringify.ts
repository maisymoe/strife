import { ReactNative } from "@vendetta/metro/common";
import { React } from "@vendetta/metro/common";

const { Text } = ReactNative;

const scheme = {
  brackets: "#da70d6", // {}[]
  punctuation: "#7bc4e1", // ,.:"
  key: "#c79cea", // object key content
  string: "#c3e88d", // string content
  number: "#f78c6c", // numbers
  special: "#7bc4e1", // true, false, null
};

const text = (text: string, key?: keyof typeof scheme) => {
  const style = key
    ? {
      color: scheme[key],
    }
    : {};
  return React.createElement(Text, { style }, text);
};

function stringify(obj: any, indent: number, d) {
  if (typeof obj !== "object") {
    const stringified = JSON.stringify(obj);
    if (typeof obj === "boolean") return [text(stringified, "special")];
    if (typeof obj === "number") return [text(stringified, "number")];
    if (typeof obj === "string") return [
      text('"', "punctuation"), 
      text(stringified.slice(1, -1), "string"),
      text('"', "punctuation")
    ];
    // unknown
    return [text(obj)];
  }
  if (obj === null) return [text("null", "special")];
  if (obj === undefined) return [text("<oh god this should never happen seek help>")];
  if (Array.isArray(obj)) {
    if (obj.length === 0) return [text("[]", "brackets")];
    const inner = [text("[", "brackets")];
    if (indent) inner.push(text("\n"));
    for (let i = 0; i < obj.length; i++) {
      if (indent) inner.push(text(" ".repeat(d * indent)));
      inner.push(...stringify(obj[i], indent, d + 1));
      if (i !== obj.length - 1) {
        inner.push(text(",", "punctuation"));
        if (indent) inner.push(text("\n"));
      }
    }
    if (indent) inner.push(text("\n"), text(" ".repeat((d - 1) * indent)));
    inner.push(text("]", "brackets"));
    return inner;
  } else {
    const keys = Object.keys(obj);
    if (keys.length === 0) return [text("{}", "brackets")];
    const vals = Object.values(obj);
    const inner = [text("{", "brackets")];
    if (indent) inner.push(text("\n"));
    for (let i = 0; i < keys.length; i++) {
      if (indent) inner.push(text(" ".repeat(d * indent)));
      inner.push(text('"', "punctuation"), text(keys[i], "key"), text('":', "punctuation"));
      if (indent) inner.push(text(" "));
      inner.push(...stringify(vals[i], indent, d + 1));
      if (i !== keys.length - 1) {
        inner.push(text(",", "punctuation"));
        if (indent) inner.push(text("\n"));
      }
    }
    if (indent) inner.push(text("\n"), text(" ".repeat((d - 1) * indent)));
    inner.push(text("}", "brackets"));
    return inner;
  }
}

export default (obj: any, indent: number = 2) => stringify(obj, indent, 1);
