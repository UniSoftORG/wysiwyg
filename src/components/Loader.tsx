import React, { useEffect, useState } from "react";
import {IEditor} from "@wysiwyg";
import "../assets/style.css";
import UNIEditor from "./Editor";

/**
 * Generate the function comment for the given function body.
 *
 * @param {IEditor} onChange - The onChange function for handling editor changes.
 * @param {IEditor} initialState - The initial state of the editor.
 * @return {React.FC} The React functional component for the EditorLoader.
 */
const EditorLoader: React.FC<IEditor> = ({ onChange, initialState }) => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (isLoaded) {
    return <UNIEditor onChange={onChange} initialState={initialState} />;
  }

  return null;
};

export default EditorLoader;
