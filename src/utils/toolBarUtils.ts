import { EditorState, Modifier, RichUtils, SelectionState } from "draft-js";
import { MethodType, ToolBarItem } from "../@wysiwyg";
import { colorStyleMap } from "../definitions/colors";
import { fontSizeMap } from "../definitions/fontSizes";

/**
 * Generates a function comment for the given function body.
 *
 * @param {EditorState} editorState - the current state of the editor
 * @param {function} setEditorState - a function to update the editor state
 * @return {object} an object with two functions: `applyStyle` and `isActive`
 */
export function loadToolBar(
  editorState: EditorState,
  setEditorState: (state: EditorState) => void,
) {
  /**
   * Applies a specified style to the editor state.
   *
   * @param {string} style - The style to apply.
   * @param {MethodType} method - The method type (Block or Inline).
   */
  const applyStyle = (style: string, method: MethodType) => {
    const toggle =
      method === MethodType.Block ? "toggleBlockType" : "toggleInlineStyle";
    setEditorState(RichUtils[toggle](editorState, style));
  };

  /**
   * Applies styles to the editor state.
   *
   * @param {string} style - The style to apply.
   * @param {Record<string, any>} styleMap - A map of styles.
   * @param {EditorState} editorState - The current editor state.
   * @param {any} setEditorState - A function to set the editor state.
   */
  const applyStyles = (
    style: string,
    styleMap: Record<string, any>,
    editorState: EditorState,
    setEditorState: any,
  ) => {
    let selection = editorState.getSelection();
    let currentContent = editorState.getCurrentContent();

    // Early return if no currentBlock
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    if (!currentBlock) return;

    if (selection.isCollapsed()) {
      selection = selection.merge({
        anchorOffset: 0,
        focusOffset: currentBlock.getLength(),
      }) as SelectionState;
    }

    const currentStyles = editorState.getCurrentInlineStyle();
    const styleList = Object.keys(styleMap);
    const currentStyleList = currentStyles
      .toArray()
      .filter((style) => style !== undefined && styleList.includes(style));
    console.log("applyStyles", currentStyles);

    // Removing styles in one go
    let nextContentState = currentContent;
    for (const style of currentStyleList) {
      nextContentState = Modifier.removeInlineStyle(
        nextContentState,
        selection,
        style,
      );
    }

    nextContentState = Modifier.applyInlineStyle(
      nextContentState,
      selection,
      style,
    );
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style",
    );

    if (!selection.isCollapsed()) {
      const newSelection = selection.merge({
        anchorOffset: selection.getEndOffset(),
        focusOffset: selection.getEndOffset(),
      }) as SelectionState;
      nextEditorState = EditorState.forceSelection(
        nextEditorState,
        newSelection,
      );
    }
    setEditorState(nextEditorState);
  };

  /**
   * Handles the change event of the select element.
   *
   * @param {ToolBarItem} select - The selected tool bar item.
   * @return {void} No return value.
   */
  const handleSelectChange = (select: ToolBarItem) => {
    const style = select.style || "";
    if (select.method === MethodType.Color) {
      applyStyles(style, colorStyleMap, editorState, setEditorState);
    } else if (select.method === MethodType.FontSize) {
      applyStyles(style, fontSizeMap, editorState, setEditorState);
    } else {
      applyStyle(style, select.method);
    }
  };

  /**
   * Retrieves the data of a block based on the provided key.
   *
   * @param {string} key - The unique key of the block.
   * @param {string} [dataKey] - The optional key to retrieve specific data from the block.
   * @return {string} - The retrieved data of the block, or the block type if no dataKey is provided.
   */
  const getBlockData = (key: string, dataKey?: string) => {
    const block = editorState.getCurrentContent().getBlockForKey(key);
    return dataKey ? block.getData().get(dataKey) : block.getType();
  };

  /**
   * Checks if the given style and method are active for the current editor state.
   *
   * @param {string} style - The style to check for.
   * @param {MethodType} method - The method type to check for.
   * @return {boolean} - Returns true if the style and method are active, otherwise false.
   */
  const isActive = (style: string, method: MethodType) => {
    try {
      const selection = editorState.getSelection();
      const startKey = selection.getStartKey();

      if (method === MethodType.Block || method === MethodType.Alignment) {
        const blockDataKey =
          method === MethodType.Alignment ? "textAlign" : undefined;
        const blockType = getBlockData(startKey, blockDataKey);
        return blockType === style;
      } else {
        return editorState.getCurrentInlineStyle().has(style);
      }
    } catch (e: any) {
      throw new Error(`Unable to determine active selection: ${e.message}`);
    }
  };

  /**
   * Checks if the given style and method are active for the current editor state.
   *
   * @param styles
   * @param {MethodType} method - The method type to check for.
   * @return {boolean} - Returns true if the style and method are active, otherwise false.
   */
  const activeStyles = (styles: string[], method: MethodType) => {
    try {
      const selection = editorState.getSelection();
      const startKey = selection.getStartKey();

      if (method === MethodType.Block || method === MethodType.Alignment) {
        const blockDataKey =
          method === MethodType.Alignment ? "textAlign" : undefined;
        const blockType = getBlockData(startKey, blockDataKey);
        return styles.includes(blockType) ? blockType : null;
      } else {
        const currentStyles = editorState.getCurrentInlineStyle();
        for (const style of styles) {
          if (currentStyles.has(style)) {
            return style;
          }
        }
        return null;
      }
    } catch (e: any) {
      throw new Error(`Unable to determine active selection: ${e.message}`);
    }
  };

  return {
    activeStyles,
    applyStyle,
    isActive,
    handleSelectChange,
  };
}
