import {convertFromRaw, EditorState} from 'draft-js';
import {stateToHTML} from "draft-js-export-html";
import {options} from "../../utils/renderUtils";
import ParseHtml from "./HTMLParser";

const HTMLView = ({editorString, noImage = false}: {
    editorString: string;
    noImage?: boolean;
}) => {
    const content = JSON.parse(editorString);
    let contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState);
    const htmlFromServer = stateToHTML(editorState.getCurrentContent(), options);

    return (
        <section className="unisoft">
            <ParseHtml htmlFromServer={htmlFromServer} content={content} withoutImages={noImage}/>
        </section>
    );
};

HTMLView.displayName = "HTMLView";

export default HTMLView;
