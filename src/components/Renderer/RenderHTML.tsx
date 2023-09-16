import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { options } from "../../utils/renderUtils";
import ParseHtml from "./HTMLParser";

/**
 * Renders an HTML view based on the provided editor string.
 *
 * @param {string} rawString - The editor string containing the HTML content.
 * @return {JSX.Element} The JSX element representing the HTML view.
 */
const HTMLView = ({ rawString }: { rawString: string }) => {
  const content = JSON.parse(rawString);
  let contentState = convertFromRaw(content);
  const editorState = EditorState.createWithContent(contentState);
  const htmlFromServer = stateToHTML(editorState.getCurrentContent(), options);

  return (
    <section className="unisoft">
      <ParseHtml htmlFromServer={htmlFromServer} content={content} />
    </section>
  );
};

HTMLView.displayName = "HTMLView";

export default HTMLView;
