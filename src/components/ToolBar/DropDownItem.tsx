import { colorStyleMap } from "../../definitions/colors";
import { IDropDownItemProps } from "../../@wysiwyg";

/**
 * Renders a dropdown item component.
 *
 * @param {IDropDownItemProps} props - The props object containing the following properties:
 *   - label: The label to be displayed.
 *   - onClick: The function to be called when the item is clicked.
 *   - style: The style of the item.
 *   - isGrid: Flag indicating whether the item is displayed in a grid layout.
 * @return {ReactElement} The rendered dropdown item.
 */
export const DropDownItem: React.FC<IDropDownItemProps> = ({
  label,
  onClick,
  style,
  isGrid,
}) => {
  let styles: React.CSSProperties;

  if (isGrid) {
    styles = {
      backgroundColor: colorStyleMap[style.toLowerCase() as string],
      display: "inline-block",
      padding: "16px",
    };
  } else {
    styles = {
      fontSize: `${style}px`,
      whiteSpace: "nowrap",
      lineHeight: `${parseInt(style) * (parseInt(style) > 16 ? 1.5 : 1.8)}px`,
    };
  }

  return (
    <span
      onClick={() => {
        onClick(style);
      }}
      className={`toolBarDropdownItem`}
      style={styles}
    >
      {isGrid ? "" : label}
    </span>
  );
};

export default DropDownItem;
