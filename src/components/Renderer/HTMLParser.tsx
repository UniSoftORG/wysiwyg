import parse from 'html-react-parser';

const ParseHtml  = ({htmlFromServer, content, withoutImages}: {
    htmlFromServer: any;
    content: any;
    withoutImages?: boolean
}) => {
    return parse(htmlFromServer, {
        replace: (domNode) => {
            const elementNode = domNode as any;

            if (elementNode.attribs && elementNode.attribs['data-src'] && elementNode.attribs['data-width'] && elementNode.attribs['data-height'] && elementNode.attribs['data-align']) {
                if (withoutImages) {
                    return null;
                } else {
                    return (
                        <div style={{display: 'flex', justifyContent: elementNode.attribs['data-align']}}>
                            <img src={elementNode.attribs['data-src']} width={elementNode.attribs['data-width']}
                                 height={elementNode.attribs['data-height']} alt=''/>
                        </div>
                    );
                }
            }
        }
    });
};

export default ParseHtml;
