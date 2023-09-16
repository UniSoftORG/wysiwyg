import React from "react";
import { EditorState } from "draft-js";
import { toolBarOptions } from "../utils/ToolBarOptions";
import { loadToolBar } from "../utils/toolBarUtils";

/**
 * Renders the toolbar component for the editor.
 *
 * @param {EditorState} editorState - The current state of the editor.
 * @param {(state: EditorState) => void} setEditorState - A function to update the editor state.
 * @param {any} editor - The editor component.
 * @return {ReactElement} The rendered toolbar component.
 */
const Toolbar: React.FC<{
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  editor?: any;
}> = ({ editorState, setEditorState }) => {
  const { isActive, applyStyle } = loadToolBar(editorState, setEditorState);

  return (
    <div className={`toolBarItems`}>
      {toolBarOptions.map((item, idx) => (
        <div
          key={`${item.label}-${idx}`}
          className={`${`toolBarItem`} ${
            isActive(item.style ? item.style : "", item.method)
              ? `active`
              : ""
          }`}
          onClick={(e) => applyStyle(item.style ? item.style : "", item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <p title={item.label}>{item.icon || item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
