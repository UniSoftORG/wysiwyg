import {ColorStyleMap, MethodType} from "../@wysiwyg";
import {generateObjectOptions} from "../utils/styleUtils";

export const colorStyleMap: ColorStyleMap = {
    white: '#FFF',
    black: '#000000',
    red: '#E23F33',
    orange: '#ff7849',
    yellow: '#D9932B',
    green: '#24B25D',
    blue: '#399DE5',
    pink: '#FFC0CB',
    purple: '#800080',
    gray: '#808080',
    brown: '#A52A2A',
    teal: '#008080',
    gold: '#FFD700',
    silver: '#C0C0C0',
    navy: '#000080',
};

export const transformedColorStyleMap: {
    [key in string]: {
        color: string;
    }
} = Object.keys(colorStyleMap).reduce((acc, colorKey) => {
    acc[colorKey as string] = { color: colorStyleMap[colorKey as string] };
    return acc;
}, {} as { [key in string]: { color: string } });

// Generate the options for select
export const selectColorOptions = generateObjectOptions(colorStyleMap, MethodType.Color);
