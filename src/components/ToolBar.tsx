import React, {useState} from "react";
import {loadToolBar} from "../utils/toolBarUtils";
import DropdownField from "../../../ui-toolkit/src/components/Molecules/Select";
import {EditorState, SelectionState} from "draft-js";
import {toolBarOptions} from "../definitions/toolBarOptions";
import DropdownSelect from "./ToolBar/ColorSelector";

const SelectTool: React.FC<{
    item: any,
    handleSelectChange: any,
    handleActiveStyle: any,
    setTempSelection: any,
    tempSelection: SelectionState | null
}> = ({item, handleSelectChange, handleActiveStyle, setTempSelection, tempSelection}) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleDropdownFocus = () => {
        setTempSelection(tempSelection);
    };

    const activeStyle = handleActiveStyle(item.select.map((select: any) => select.style), item.method);

    if (activeStyle !== selected) {
        setSelected(activeStyle);
    }

    return (
        <div>
            <DropdownSelect
                label={item.icon}
                value={selected}
                            onFocus={handleDropdownFocus}
                            onChange={(e) => {
                                setSelected(e)
                                handleSelectChange({label: e, style: e, method: item.method});
                            }}
                            options={item.select.map((select: any) => select.style)}
            />
            {/*<DropdownField*/}
            {/*    label={item.label}*/}
            {/*    value={selected}*/}
            {/*    onFocus={handleDropdownFocus}*/}
            {/*    setValue={(e) => {*/}
            {/*        setSelected(e);*/}
            {/*        handleSelectChange({label: e, style: e, method: item.method});*/}
            {/*    }}*/}
            {/*    options={item.select.map((select: any, index: number) => {*/}
            {/*        return select.style*/}
            {/*    })}*/}
            {/*/>*/}
        </div>
    );
}

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
}> = ({editorState, setEditorState}) => {
    const {isActive, applyStyle, handleSelectChange, activeStyles} = loadToolBar(editorState, setEditorState);
    const [tempSelection, setTempSelection] = useState<SelectionState | null>(null);

    return (
        <div className={`toolBarItems`}>
            {toolBarOptions.map((item, idx) => (
                item.select && item.select.length ?
                    <SelectTool
                        item={item}
                        handleSelectChange={handleSelectChange}
                        handleActiveStyle={activeStyles}
                        setTempSelection={setTempSelection}
                        tempSelection={tempSelection}
                        key={`${item.label}-${idx}`}
                    /> :
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
