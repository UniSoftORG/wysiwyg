import { MethodType } from "../@wysiwyg";

// Create a map of font sizes.
export const fontSizeMap: { [K in number]: { fontSize: number } } = {
  10: { fontSize: 10 },
  14: { fontSize: 14 },
  16: { fontSize: 16 },
  18: { fontSize: 18 },
  24: { fontSize: 24 },
  32: { fontSize: 32 },
};

export const fontSizeLabels: { [K in number]: string } = {
  10: "Tiny",
  14: "Small",
  16: "Normal",
  18: "Large",
  24: "Extra Large",
  32: "Super Large",
};

// Function to generate the select options
function generateSelectOptions(sizeMap: typeof fontSizeMap) {
  return Object.keys(sizeMap).map((sizeKey: number | string) => ({
    label: fontSizeLabels[sizeKey as number],
    style: sizeKey,
    method: MethodType.FontSize,
  }));
}

// Generate the select options
export const selectFontOptions = generateSelectOptions(fontSizeMap);
