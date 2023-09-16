import React, { useState } from "react";
import { ToolBarProps } from "../@wysiwyg";
import { loadToolBar } from "../utils/toolBarUtils";
import { SelectionState } from "draft-js";
import { toolBarOptions } from "../definitions/toolBarOptions";
import SelectTool from "./ToolBar/SelectTool";

/**
 * Renders the toolbar component for the editor.
 *
 * @param {EditorState} editorState - The current state of the editor.
 * @param {(state: EditorState) => void} setEditorState - A function to update the editor state.
 * @param {any} editor - The editor component.
 * @return {ReactElement} The rendered toolbar component.
 */
const Toolbar: React.FC<ToolBarProps> = ({ editorState, setEditorState }) => {
  const { isActive, applyStyle, handleSelectChange, activeStyles } =
    loadToolBar(editorState, setEditorState);
  const [tempSelection, setTempSelection] = useState<SelectionState | null>(
    null,
  );

  return (
    <div className={`toolBarItems`}>
      {toolBarOptions.map((item, idx) =>
        item.select && item.select.length ? (
          <SelectTool
            item={item}
            handleSelectChange={handleSelectChange}
            handleActiveStyle={activeStyles}
            setTempSelection={setTempSelection}
            tempSelection={tempSelection}
            key={`${item.label}-${idx}`}
          />
        ) : (
          <div
            key={`${item.label}-${idx}`}
            className={`${`toolBarItem`} ${
              isActive(item.style ? item.style : "", item.method)
                ? `active`
                : ""
            }`}
            onClick={(e) =>
              applyStyle(item.style ? item.style : "", item.method)
            }
            onMouseDown={(e) => e.preventDefault()}
          >
            <p title={item.label}>{item.icon || item.label}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default Toolbar;
