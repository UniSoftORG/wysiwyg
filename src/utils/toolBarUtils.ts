import { EditorState, RichUtils } from "draft-js";
import { MethodType } from "../@wysiwyg";

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

  return {
    applyStyle,
    isActive,
  };
}
