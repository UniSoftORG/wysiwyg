<div align="center">
  <img src="https://github.com/UniSoftORG/scripts/assets/102993606/22fa58b6-a04e-4bd4-912d-653cfda22281">
</div>

# UniSoft WYSIWYG Editor

## About

This WYSIWYG editor package is an extraction from UniSoft's robust website builder. It will be actively maintained and updated. Currently, the package provides basic text editing functionality. However, many more features from the full UniSoft builder will be ported over in future updates.

## Features

- **Text**: Functions to make selected text bold, italic, underline, strikethrough, and align
- **Lists**: Create a numeric or dotted list

## Coming Soon
- Text Color Change
- Font Size Adjustment
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

`import { EditorLoader } from 'unisoft-wysiwyg';';
`

`const MyComponent = () => {
return <EditorLoader onChange={handleChange} initialState={initialState} />;
};`

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about how you can contribute to this project.

## License

This project is licensed under [MIT License](LICENSE).
