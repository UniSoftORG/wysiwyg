import React, { useEffect, useRef, useState } from "react";
import { DropdownSelectProps } from "../../@wysiwyg";
import { Getters } from "unisoft-utils";
import { colorStyleMap } from "../../definitions/colors";

/**
 * A React functional component that renders a dropdown select.
 *
 * @param {DropdownSelectProps} props - The props object containing the following properties:
 *   - label: The label to be displayed on the button.
 *   - children: The options to be displayed in the dropdown menu.
 *   - value: The currently selected option.
 *   - onFocus: Function to be called when the dropdown receives focus.
 *   - gridRows: The number of grid rows for styling purposes.
 * @return {React.ReactNode} The rendered dropdown select component.
 */
const Dropdown: React.FC<DropdownSelectProps> = ({
  label,
  children,
  value,
  onFocus,
  gridRows,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    /**
     * Handles clicks that occur outside of the dropdown element.
     *
     * @param {MouseEvent} event - The click event object.
     * @return {void} This function does not return anything.
     */
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /**
   * Toggles the dropdown.
   *
   * @return {void} No return value.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className="toolBarItem"
      onFocus={onFocus}
      onClick={toggleDropdown}
    >
      <button
        type="button"
        className="toolBarItem"
        onClick={toggleDropdown}
        style={{
          ...(gridRows && {
            boxShadow: `inset 0px 0px 18px -2px ${
              selectedOption
                ? Getters.getValue(colorStyleMap, `${selectedOption}`)
                : "rgba(255, 255, 255, 0.2)"
            }`,
          }),
        }}
      >
        {gridRows ? label : selectedOption ?? label}
      </button>

      {isOpen && (
        <div
          className={`toolBarDropdownContent`}
          style={{
            ...(gridRows && {
              display: "grid",
              gridTemplateColumns: `repeat(${gridRows}, minmax(32px, 1fr))`,
              borderRadius: "0px",
            }),
          }}
          role="menu"
          aria-labelledby="options-menu"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
