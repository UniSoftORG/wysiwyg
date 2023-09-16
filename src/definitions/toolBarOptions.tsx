import React from "react";
import Icons from "../assets/icons";
import {ToolBarItem} from "@wysiwyg";
import {MethodType} from "../@wysiwyg/enums";
import {selectColorOptions} from "../definitions/colors";

export const toolBarOptions: ToolBarItem[] = [
  {
    label: "bold",
    style: "BOLD",
    icon: <Icons.BoldIcon />,
    method: MethodType.Inline,
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: <Icons.ItalicIcon />,
    method: MethodType.Inline,
  },
  {
    label: "underline",
    style: "UNDERLINE",
    icon: <Icons.UnderlineIcon />,
    method: MethodType.Inline,
  },
  {
    label: "strike-through",
    style: "STRIKETHROUGH",
    icon: <Icons.StrikethroughIcon />,
    method: MethodType.Inline,
  },
  {
    label: "Unordered-List",
    style: "unordered-list-item",
    icon: <Icons.ListUlIcon />,
    method: MethodType.Block,
  },
  {
    label: "Ordered-List",
    style: "ordered-list-item",
    icon: <Icons.ListOlIcon />,
    method: MethodType.Block,
  },
  {
    label: "Left",
    style: "align-left",
    icon: <Icons.AlignLeftIcon />,
    method: MethodType.Block,
  },
  {
    label: "Center",
    style: "align-center",
    icon: <Icons.AlignCenterIcon />,
    method: MethodType.Block,
  },
  {
    label: "Right",
    style: "align-right",
    icon: <Icons.AlignRightIcon />,
    method: MethodType.Block,
  },
  {
    label: "Font Color",
    method: MethodType.Color,
    icon: <Icons.FontColorIcon />,
    select: selectColorOptions
  },
];
