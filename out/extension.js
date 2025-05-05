"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    // Register a completion provider for MAIUI files
    const provider = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'maiui' }, {
        provideCompletionItems(document, position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            // Element suggestions
            if (linePrefix.endsWith('<')) {
                const elements = [
                    createCompletionItem('container', 'Container element for layout', 'container id="${1:id}" direction="${2:top_to_bottom}" width="${3:grow}" height="${4:grow}">\n\t$0\n</container'),
                    createCompletionItem('text', 'Text element', 'text id="${1:id}" font_size="${2:16}" color="${3:255,255,255,255}">${4:Text content}</text'),
                    createCompletionItem('button', 'Button element', 'button id="${1:id}" width="${2:shrink}" height="${3:shrink}" background_color="${4:60,100,200,255}">${5:Button text}</button'),
                    createCompletionItem('image', 'Image element', 'image id="${1:id}" src="${2:image_path}" width="${3:100}" height="${4:100}" /'),
                    createCompletionItem('window', 'Window element', 'window id="${1:id}" title="${2:Window Title}" initial_width="${3:400}" initial_height="${4:300}">\n\t$0\n</window')
                ];
                return elements;
            }
            // Attribute suggestions for container
            if (linePrefix.match(/<container[^>]*$/i)) {
                return [
                    createCompletionItem('id', 'Element identifier', 'id="${1:container_id}"'),
                    createCompletionItem('direction', 'Layout direction', 'direction="${1|top_to_bottom,left_to_right,right_to_left,bottom_to_top|}"'),
                    createCompletionItem('width', 'Width of the container', 'width="${1|grow,shrink,screen_width|}"'),
                    createCompletionItem('height', 'Height of the container', 'height="${1|grow,shrink,screen_height|}"'),
                    createCompletionItem('background_color', 'Background color (R,G,B,A)', 'background_color="${1:30,30,35,255}"'),
                    createCompletionItem('padding', 'Padding (left,right,top,bottom)', 'padding="${1:10,10,10,10}"'),
                    createCompletionItem('child_gap', 'Gap between children', 'child_gap="${1:10}"'),
                    createCompletionItem('child_alignment', 'Alignment of children', 'child_alignment="${1|center,left,right,top,bottom|}"'),
                    createCompletionItem('corner_radius', 'Corner radius', 'corner_radius="${1:5}"'),
                    createCompletionItem('border_color', 'Border color (R,G,B,A)', 'border_color="${1:60,60,70,255}"'),
                    createCompletionItem('border_width', 'Border width', 'border_width="${1:1}"'),
                    createCompletionItem('scroll_horizontal', 'Enable horizontal scrolling', 'scroll_horizontal="${1|false,true|}"'),
                    createCompletionItem('scroll_vertical', 'Enable vertical scrolling', 'scroll_vertical="${1|false,true|}"'),
                    createCompletionItem('vertical_alignment', 'Vertical alignment', 'vertical_alignment="${1|center,top,bottom|}"'),
                    createCompletionItem('horizontal_alignment', 'Horizontal alignment', 'horizontal_alignment="${1|center,left,right|}"')
                ];
            }
            // Attribute suggestions for text
            if (linePrefix.match(/<text[^>]*$/i)) {
                return [
                    createCompletionItem('id', 'Element identifier', 'id="${1:text_id}"'),
                    createCompletionItem('font_size', 'Font size', 'font_size="${1:16}"'),
                    createCompletionItem('color', 'Text color (R,G,B,A)', 'color="${1:255,255,255,255}"'),
                    createCompletionItem('bind:text', 'Bind text to data variable', 'bind:text="${1:variable_name}"')
                ];
            }
            // Attribute suggestions for window
            if (linePrefix.match(/<window[^>]*$/i)) {
                return [
                    createCompletionItem('id', 'Window identifier', 'id="${1:window_id}"'),
                    createCompletionItem('title', 'Window title', 'title="${1:Window Title}"'),
                    createCompletionItem('initial_x', 'Initial X position', 'initial_x="${1:100}"'),
                    createCompletionItem('initial_y', 'Initial Y position', 'initial_y="${1:100}"'),
                    createCompletionItem('initial_width', 'Initial width', 'initial_width="${1:400}"'),
                    createCompletionItem('initial_height', 'Initial height', 'initial_height="${1:300}"'),
                    createCompletionItem('min_width', 'Minimum width', 'min_width="${1:150}"'),
                    createCompletionItem('min_height', 'Minimum height', 'min_height="${1:100}"'),
                    createCompletionItem('modal', 'Modal window', 'modal="${1|false,true|}"'),
                    createCompletionItem('show_title_bar', 'Show title bar', 'show_title_bar="${1|true,false|}"'),
                    createCompletionItem('can_close', 'Can be closed', 'can_close="${1|true,false|}"'),
                    createCompletionItem('can_maximize', 'Can be maximized', 'can_maximize="${1|true,false|}"'),
                    createCompletionItem('can_resize', 'Can be resized', 'can_resize="${1|true,false|}"')
                ];
            }
            return undefined;
        }
    }, '<' // Trigger character
    );
    context.subscriptions.push(provider);
    // Register a hover provider for MAIUI files
    const hoverProvider = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'maiui' }, {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) {
                return null;
            }
            const word = document.getText(range);
            // Element descriptions
            const elements = {
                'container': 'A layout container element that can contain other UI elements.',
                'text': 'A text element for displaying text content.',
                'button': 'An interactive button element.',
                'image': 'An image element for displaying images.',
                'window': 'A window element that can be shown as a separate window.'
            };
            // Attribute descriptions
            const attributes = {
                'id': 'Unique identifier for the element.',
                'direction': 'Layout direction for container elements (top_to_bottom, left_to_right, etc.).',
                'width': 'Width of the element (grow, shrink, fixed value, or percentage).',
                'height': 'Height of the element (grow, shrink, fixed value, or percentage).',
                'background_color': 'Background color in RGBA format (e.g., 30,30,35,255).',
                'padding': 'Padding around the element content (left,right,top,bottom).',
                'child_gap': 'Gap between child elements in a container.',
                'child_alignment': 'Alignment of child elements within a container.',
                'font_size': 'Font size for text elements.',
                'color': 'Text color in RGBA format (e.g., 255,255,255,255).',
                'corner_radius': 'Radius for rounded corners.',
                'border_color': 'Border color in RGBA format.',
                'border_width': 'Width of the border.',
                'title': 'Title for window elements.',
                'initial_x': 'Initial X position for window elements.',
                'initial_y': 'Initial Y position for window elements.',
                'initial_width': 'Initial width for window elements.',
                'initial_height': 'Initial height for window elements.',
                'min_width': 'Minimum width for window elements.',
                'min_height': 'Minimum height for window elements.',
                'modal': 'Whether the window is modal (blocks interaction with other windows).',
                'show_title_bar': 'Whether to show the window title bar.',
                'can_close': 'Whether the window can be closed by the user.',
                'can_maximize': 'Whether the window can be maximized.',
                'can_resize': 'Whether the window can be resized by the user.',
                'vertical_alignment': 'Vertical alignment of content (center, top, bottom).',
                'horizontal_alignment': 'Horizontal alignment of content (center, left, right).',
                'src': 'Source path for image elements.'
            };
            if (elements[word]) {
                return new vscode.Hover(`**${word}** - ${elements[word]}`);
            }
            if (attributes[word]) {
                return new vscode.Hover(`**${word}** - ${attributes[word]}`);
            }
            return null;
        }
    });
    context.subscriptions.push(hoverProvider);
}
exports.activate = activate;
function createCompletionItem(label, detail, insertText) {
    const item = new vscode.CompletionItem(label);
    item.detail = detail;
    item.insertText = new vscode.SnippetString(insertText);
    return item;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map