import {MethodType} from "@wysiwyg";

export function generateObjectOptions(simpleColorStyleMap: object, method: MethodType) {
    return Object.keys(simpleColorStyleMap).map(colorKey => ({
        label: colorKey.charAt(0).toUpperCase() + colorKey.slice(1),
        style: colorKey,
        method: method
    }));
}

export function generateMapOptions<T>(inputMap: number[], methodType: MethodType) {
    return inputMap.map(key => ({
        label: key.toString(),
        style: { fontSize: key },
        method: methodType
    }));
}
