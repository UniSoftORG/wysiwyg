import { MethodType } from "./enums";
import {RawDraftContentState} from "draft-js";

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
