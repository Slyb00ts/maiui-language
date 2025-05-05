# MAIUI Language Support

This extension provides language support for MAIUI, an XML-based UI markup language.

## Features

- Syntax highlighting for MAIUI files (`.maiui` extension)
- Code completion for MAIUI elements and attributes
- Hover information for elements and attributes

### Code Completion

The extension provides intelligent code completion for:

- MAIUI elements (`container`, `text`, `button`, `image`, `window`)
- Element attributes with appropriate options
- Snippets for quickly creating common UI structures

### Hover Information

Hover over MAIUI elements and attributes to see detailed information about their purpose and usage.

## Supported Elements

The extension provides support for the following MAIUI elements:

- `container` - A layout container element that can contain other UI elements
- `text` - A text element for displaying text content
- `button` - An interactive button element
- `image` - An image element for displaying images
- `window` - A window element that can be shown as a separate window

## Supported Attributes

The extension provides support for various attributes including:

- Layout attributes: `direction`, `width`, `height`, `padding`, etc.
- Styling attributes: `background_color`, `corner_radius`, `border_color`, etc.
- Text attributes: `font_size`, `color`
- Window attributes: `title`, `initial_width`, `initial_height`, etc.

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension does not contribute any VS Code settings.

## Known Issues

### Double Angle Brackets Issue

There is a known issue where code completion for elements adds double angle brackets. For example:

```
<<container id="id" direction="top_to_bottom" width="grow" height="grow">
    
</container>>
```

### How to Fix the Double Angle Brackets Issue

To fix this issue, you need to modify the `src/extension.ts` file:

1. Locate the code completion provider in `extension.ts` (around line 12-26)
2. The issue is that when you type `<` and select a completion item, the extension inserts the full snippet including another opening `<` character
3. Modify the completion items to not include the opening `<` in the snippet

Here's how to fix the code:

```typescript
// Element suggestions
if (linePrefix.endsWith('<')) {
  const elements = [
    createCompletionItem('container', 'Container element for layout', 
      'container id="${1:id}" direction="${2:top_to_bottom}" width="${3:grow}" height="${4:grow}">\n\t$0\n</container>'),
    createCompletionItem('text', 'Text element', 
      'text id="${1:id}" font_size="${2:16}" color="${3:255,255,255,255}">${4:Text content}</text>'),
    createCompletionItem('button', 'Button element', 
      'button id="${1:id}" width="${2:shrink}" height="${3:shrink}" background_color="${4:60,100,200,255}">${5:Button text}</button>'),
    createCompletionItem('image', 'Image element', 
      'image id="${1:id}" src="${2:image_path}" width="${3:100}" height="${4:100}" />'),
    createCompletionItem('window', 'Window element', 
      'window id="${1:id}" title="${2:Window Title}" initial_width="${3:400}" initial_height="${4:300}">\n\t$0\n</window>')
  ];
  return elements;
}
```

Notice that the opening `<` has been removed from each snippet. This way, when you type `<` and select a completion item, you won't get double angle brackets.

## Release Notes

### 0.1.0

- Initial release
- Basic syntax highlighting for MAIUI files
- Code completion for elements and attributes
- Hover information for elements and attributes

---

**Note:** Before publishing your extension, make sure to fix the double angle brackets issue and add a repository field to your package.json file.
