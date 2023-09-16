import React from "react";
import {transformedColorStyleMap} from "./colors";

interface StyleMap {
    [key: string]: React.CSSProperties;
}
export const styleMap: StyleMap = {
    HIGHLIGHT: {
        backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
        textTransform: "uppercase",
    },
    LOWERCASE: {
        textTransform: "lowercase",
    },
    SUPERSCRIPT: {
        verticalAlign: "super",
        fontSize: "80%",
    },
    SUBSCRIPT: {
        verticalAlign: "sub",
        fontSize: "80%",
    },
    ...transformedColorStyleMap,
};
