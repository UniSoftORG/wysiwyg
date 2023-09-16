<div align="center">

# UniSoft WYSIWYG Editor

![unisoft-logo.png](unisoft-logo.png)

</div>

## About

This WYSIWYG editor package is an extraction from UniSoft's robust website builder. It will be actively maintained and updated. Currently, the package provides basic text editing functionality. However, many more features from the full UniSoft builder will be ported over in future updates.

## Features

- **Text**: Functions to make selected text bold, italic, underline, strikethrough, and align
- **Lists**: Create a numeric or dotted list

## Coming Soon
- Code Block Support
- Image & File Uploading
- Image Editing (Resize, Crop, Position)
- Emoji Support
- ...and much more

## Installation

To install the package, run:

`npm install unisoft-wysiwyg`

Or

`yarn add unisoft-wysiwyg`

## Usage Example

```
import "unisoft-wysiwyg/dist/index.css"
import { EditorLoader } from "unisoft-wysiwyg"


const MyComponent = () => {
return <EditorLoader onChange={handleChange} />;
};
```

## Render HTML Example


```
import "unisoft-wysiwyg/dist/index.css";
import { RenderHTML } from "unisoft-wysiwyg";


const MyComponent = () => {
return <RenderHTML rawString={test} />;
};
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about how you can contribute to this project.

## License

This project is licensed under [MIT License](LICENSE).
