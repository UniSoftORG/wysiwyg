import React, { useEffect, useRef, useState } from "react";
import { IEditor } from "../@wysiwyg";
import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import {
  handleKeyCommand,
  keyBindingFn,
  myBlockStyleFn,
} from "../utils/keyUtils";
import Toolbar from "./ToolBar";
import { styleMap } from "../definitions/style";

/**
 * Renders a UNIEditor component.
 *
 * @param {IEditor} onChange - A function to handle changes in the editor state.
 * @param {IEditor} initialState - The initial state of the editor.
 * @return {React.FC} The rendered UNIEditor component.
 */
const UNIEditor: React.FC<IEditor> = ({ onChange, initialState }) => {
  const editor = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() => {
    if (initialState) {
      return EditorState.createWithContent(convertFromRaw(initialState));
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    onChange(editorState);
  }, [editorState]);

  return (
    <div className={`unisoft editorWrapper`}>
      {/*{JSON.stringify(convertToRaw(editorState.getCurrentContent()))}*/}
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <div
        className={`editorContainer`}
        onFocus={() => editor.current && editor.current.focus()}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          customStyleMap={styleMap}
          handleKeyCommand={(
            command: string,
            editorState: EditorState,
            eventTimeStamp: number,
          ) =>
            handleKeyCommand(
              command,
              editorState,
              eventTimeStamp,
              setEditorState,
            )
          }
          keyBindingFn={(e: React.KeyboardEvent<{}>) =>
            keyBindingFn(e, editorState, setEditorState)
          }
          blockStyleFn={myBlockStyleFn}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default UNIEditor;
