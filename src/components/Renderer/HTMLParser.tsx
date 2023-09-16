import parse from "html-react-parser";

/**
 * Parses the provided HTML string and replaces certain elements based on their attributes.
 *
 * @param {Object} params - An object containing the following parameters:
 *   - {any} htmlFromServer: The HTML string to parse.
 *   - {any} content: Additional content to use during parsing.
 *   - {boolean} withoutImages: Optional. If set to true, images will not be replaced.
 * @return {any} The parsed HTML with replaced elements.
 */
const ParseHtml = ({
  htmlFromServer,
  content,
}: {
  htmlFromServer: string;
  content: string;
}) => {
  return parse(htmlFromServer, {
    replace: (domNode) => {
      const elementNode = domNode as any;

      // This is still a work in progress. Provided code works, but it's not used anywhere yet.
      if (
        elementNode.attribs &&
        elementNode.attribs["data-src"] &&
        elementNode.attribs["data-width"] &&
        elementNode.attribs["data-height"] &&
        elementNode.attribs["data-align"]
      ) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: elementNode.attribs["data-align"],
            }}
          >
            <img
              src={elementNode.attribs["data-src"]}
              width={elementNode.attribs["data-width"]}
              height={elementNode.attribs["data-height"]}
              alt=""
            />
          </div>
        );
      }
    },
  });
};

export default ParseHtml;
