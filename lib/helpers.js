'use strict';

/* eslint no-console:0 */
var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var formatPrettierESLint = require('prettier-eslint');

module.exports.format = format;
module.exports.formatOnSaveIfEnabled = formatOnSaveIfEnabled;

function format(event) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ignoreSelection: false };

  /* eslint complexity:[2, 7] */
  var editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    return;
  }

  var _editor$buffer = editor.buffer;
  _editor$buffer = _editor$buffer === undefined ? {} : _editor$buffer;
  var _editor$buffer$file = _editor$buffer.file;
  _editor$buffer$file = _editor$buffer$file === undefined ? {} : _editor$buffer$file;
  var filePath = _editor$buffer$file.path;

  var cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  var selectedText = editor.getSelectedText();
  var isTransformingFile = options.ignoreSelection || !selectedText;

  var textToTransform = isTransformingFile ? editor.getText() : selectedText;

  var transformed = executePrettierESLint(textToTransform, filePath);
  if (!transformed) {
    return;
  }

  if (isTransformingFile) {
    editor.setText(transformed);
  } else {
    editor.setTextInBufferRange(editor.getSelectedBufferRange(), transformed);
  }

  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
}

function formatOnSaveIfEnabled() {
  var shouldFormatOnSave = getConfigOption('formatOnSave');
  if (!shouldFormatOnSave) {
    return;
  }

  var currentScope = getCurrentScope();
  var isInScope = getConfigOption('formatOnSaveScopes').includes(currentScope);
  if (!isInScope) {
    return;
  }

  format(null, { ignoreSelection: true });
}

function getConfigOption(key) {
  return atom.config.get('prettier-eslint.' + key);
}

function getCurrentScope() {
  return atom.workspace.getActiveTextEditor().getGrammar().scopeName;
}

function executePrettierESLint(text, filePath) {
  var transformed = void 0;
  allowUnsafeNewFunction(function () {
    // please someone figure out how I can avoid
    // needing to wrap this in allowUnsafeNewFunction!
    try {
      transformed = formatPrettierESLint({ text: text, filePath: filePath });
    } catch (error) {
      var message = 'prettier-eslint-atom: ' + error.toString();
      var detail = error.stack.toString();
      atom.notifications.addError(message, { detail: detail, dismissable: true });
      console.log('Error executing prettier-eslint-atom:', error);
      transformed = false;
    }
  });
  return transformed;
}