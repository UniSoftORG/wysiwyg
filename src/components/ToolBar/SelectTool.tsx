import React, { useState } from "react";
import { SelectionState } from "draft-js";
import Dropdown from "./DropDown";
import { MethodType } from "../../@wysiwyg";
import DropDownItem from "./DropDownItem";

/**
 * Renders a select tool component.
 *
 * @param {React.FC} props - The props for the component.
 * @param {any} props.item - The item prop.
 * @param {any} props.handleSelectChange - The handleSelectChange prop.
 * @param {any} props.handleActiveStyle - The handleActiveStyle prop.
 * @param {any} props.setTempSelection - The setTempSelection prop.
 * @param {SelectionState | null} props.tempSelection - The tempSelection prop.
 * @return {React.FC} The rendered select tool component.
 */
const SelectTool: React.FC<{
  item: any;
  handleSelectChange: any;
  handleActiveStyle: any;
  setTempSelection: any;
  tempSelection: SelectionState | null;
}> = ({
  item,
  handleSelectChange,
  handleActiveStyle,
  setTempSelection,
  tempSelection,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  /**
   * Handles the focus event for the dropdown.
   *
   * @param {type} - No parameters.
   * @return {type} - No return value.
   */
  const handleDropdownFocus = () => {
    setTempSelection(tempSelection);
  };

  const activeStyle = handleActiveStyle(
    item.select.map((select: any) => select.style),
    item.method,
  );

  if (activeStyle !== selected) {
    setSelected(activeStyle);
  }

  return (
    <Dropdown
      label={item.icon}
      value={selected}
      onFocus={handleDropdownFocus}
      gridRows={item.method === MethodType.Color ? 4 : undefined}
    >
      {item.select.map((select: any, index: number) => (
        <DropDownItem
          key={index}
          label={item.label}
          style={select.style}
          isGrid={item.method === MethodType.Color}
          onClick={(e) => {
            setSelected(e);
            handleSelectChange({
              label: e,
              style: e,
              method: item.method,
            });
          }}
        />
      ))}
    </Dropdown>
  );
};

export default SelectTool;
