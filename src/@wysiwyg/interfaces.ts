import { MethodType } from "./enums";
import { RawDraftContentState } from "draft-js";
import React from "react";

export interface IEditor {
  onChange: (editorState: any) => void;
  initialState?: RawDraftContentState;
}

export interface ToolBarItem {
  label: string;
  style?: string;
  icon?: React.ReactNode;
  method: MethodType;
  select?: any;
  handleFunction?: any;
}

export interface StyleMap {
  [key: string]: React.CSSProperties;
}

export interface IDropDownItemProps {
  label: string;
  style: string;
  onClick: (e: string) => void;
  isGrid?: boolean;
}

export interface DropdownSelectProps {
  label: string;
  children: React.ReactElement<IDropDownItemProps>[];
  value: string | null;
  onFocus?: any;
  gridRows?: number;
}
