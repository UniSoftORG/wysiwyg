import {
  Modifier,
  getDefaultKeyBinding,
  DraftHandleValue,
  EditorState,
  RichUtils,
  ContentBlock,
} from "draft-js";

/**
 * Handles a key command and updates the editor state accordingly.
 *
 * @param {string} command - The key command to handle.
 * @param {EditorState} editorState - The current state of the editor.
 * @param {number} eventTimeStamp - The timestamp of the key event.
 * @param {(newState: EditorState) => void} setState - The function to update the editor state.
 * @return {DraftHandleValue} The handle value indicating whether the key command was handled or not.
 */
export const handleKeyCommand = (
  command: string,
  editorState: EditorState,
  eventTimeStamp: number,
  setState: (newState: EditorState) => void,
): DraftHandleValue => {
  const newState = RichUtils.handleKeyCommand(editorState, command);
  if (newState) {
    setState(newState);
    return "handled";
  }
  return "not-handled";
};

/**
 * Handles the tab key press event.
 *
 * @param {React.KeyboardEvent | React.KeyboardEvent<{}>} e - The keyboard event.
 * @param {EditorState} editorState - The current state of the editor.
 * @param {(editorState: EditorState) => void} setEditorState - The function to update the editor state.
 * @return {void} No return value.
 */
export const handleTab = (
  e: React.KeyboardEvent | React.KeyboardEvent<{}>,
  editorState: EditorState,
  setEditorState: (editorState: EditorState) => void,
): void => {
  e.preventDefault();

  const selectionState = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  if (!selectionState.isCollapsed()) {
    return;
  }

  const newContentState = Modifier.replaceText(
    currentContent,
    selectionState,
    "\t",
  );

  setEditorState(
    EditorState.push(editorState, newContentState, "insert-fragment"),
  );
};

/**
 * Generates the key binding function for the editor.
 *
 * @param {React.KeyboardEvent | React.KeyboardEvent<{}>} e - The keyboard event.
 * @param {EditorState} editorState - The current editor state.
 * @param {(editorState: EditorState) => void} setEditorState - The function to update the editor state.
 * @return {string | null} The key binding or null.
 */
export const keyBindingFn = (
  e: React.KeyboardEvent | React.KeyboardEvent<{}>,
  editorState: EditorState,
  setEditorState: (editorState: EditorState) => void,
): string | null => {
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === "z" || e.key === "Z" || e.key === "y")
  ) {
    return getDefaultKeyBinding(e);
  }

  if (e.key === "Tab") {
    handleTab(e, editorState, setEditorState);
  }

  return getDefaultKeyBinding(e);
};

/**
 * Returns the block style class name based on the given content block type.
 *
 * @param {ContentBlock} contentBlock - The content block object.
 * @return {string} The block style class name.
 */
export const myBlockStyleFn = (contentBlock: ContentBlock): string => {
  const type = contentBlock.getType();

  switch (type) {
    case "blockQuote":
      return "superFancyBlockquote";
    case "align-left":
      return "align-left";
    case "align-center":
      return "align-center";
    case "align-right":
      return "align-right";
    case "justifyAlign":
      return "justifyAlign";
    case "code-block":
      return "code-block";
    default:
      return "";
  }
};
