import { ContentBlock } from "draft-js";
import { fontSizeMap } from "../definitions/fontSizes";
import { transformedColorStyleMap } from "../definitions/colors";

export const options = {
  /**
   * Generates an inline style object based on the provided styles.
   *
   * @param {Array} styles - The array of styles to be transformed into an inline style object.
   * @return {Object} - The resulting inline style object.
   */
  inlineStyleFn: (styles: any) => {
    let resultStyle: any = {};
    styles.forEach((style: string) => {
      if (transformedColorStyleMap[style as string]) {
        resultStyle = {
          ...resultStyle,
          color: transformedColorStyleMap[style as string].color,
        };
      } else {
        let parsedFontSize = parseInt(style, 10);
        if (!isNaN(parsedFontSize) && fontSizeMap[parsedFontSize as number]) {
          resultStyle = {
            ...resultStyle,
            fontSize: `${fontSizeMap[parsedFontSize as number].fontSize}px`,
          };
        }
      }
    });

    return { style: resultStyle };
  },
  /**
   * Generate the blockStyleFn function.
   *
   * @param {ContentBlock} block - the content block to style
   * @return {object} - an object with element and attributes properties
   */
  blockStyleFn: (block: ContentBlock) => {
    const type = block.getType();
    if (type === "text-center") {
      return {
        element: "p",
        attributes: {
          style: "text-align: center;",
        },
      };
    } else if (type === "text-left") {
      return {
        element: "p",
        attributes: {
          style: "text-align: left;",
        },
      };
    } else if (type === "text-right") {
      return {
        element: "p",
        attributes: {
          style: "text-align: right;",
        },
      };
    }
  },
};
