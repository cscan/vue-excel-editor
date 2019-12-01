var stripTagsRegex = /(<([^>]+)>)/gi; // Removes any thing that looks like an HTML tag from the supplied string

export var stripTags = function stripTags() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(text).replace(stripTagsRegex, '');
}; // Generate a domProps object for either innerHTML, textContent or nothing

export var htmlOrText = function htmlOrText(innerHTML, textContent) {
  return innerHTML ? {
    innerHTML: innerHTML
  } : textContent ? {
    textContent: textContent
  } : {};
};