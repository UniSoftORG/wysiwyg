import {ContentBlock} from "draft-js";
import {fontSizeMap} from "../definitions/fontSizes";
import {transformedColorStyleMap} from "../definitions/colors";

export const options = {
    inlineStyleFn: (styles: any) => {
        let resultStyle: any = {};
        styles.forEach((style: string) => {
            if (transformedColorStyleMap[style as string]) {
                resultStyle = {
                    ...resultStyle,
                    color: transformedColorStyleMap[style as string].color
                };
            } else {
                let parsedFontSize = parseInt(style, 10);
                if (!isNaN(parsedFontSize) && fontSizeMap[parsedFontSize as number]) {
                    resultStyle = {
                        ...resultStyle,
                        fontSize: `${fontSizeMap[parsedFontSize as number].fontSize}px`
                    };
                }
            }
        });

        return {style: resultStyle};
    },
    blockStyleFn: (block: ContentBlock) => {
        const type = block.getType();
        if (type === 'text-center') {
            return {
                element: 'p',
                attributes: {
                    style: 'text-align: center;',
                },
            };
        } else if (type === 'text-left') {
            return {
                element: 'p',
                attributes: {
                    style: 'text-align: left;',
                },
            };
        } else if (type === 'text-right') {
            return {
                element: 'p',
                attributes: {
                    style: 'text-align: right;',
                },
            };
        }
    }
};


