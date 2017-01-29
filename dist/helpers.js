'use strict';

/* eslint no-console:0 */
var path = require('path');
var fs = require('fs');

var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var formatPrettierESLint = require('prettier-eslint');
var minimatch = require('minimatch');
var findCached = require('atom-linter').findCached;

module.exports.format = format;
module.exports.formatOnSaveIfEnabled = formatOnSaveIfEnabled;

var LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

function format(event) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ignoreSelection: false };
  var editor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : atom.workspace.getActiveTextEditor();

  /* eslint complexity:[2, 7] */
  if (!editor) {
    return;
  }

  var filePath = getCurrentFilePath(editor);
  var cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  var selectedText = editor.getSelectedText();
  var isTransformingFile = options.ignoreSelection || !selectedText;

  var textToTransform = isTransformingFile ? editor.getText() : selectedText;

  var transformed = executePrettierESLint(textToTransform, filePath);
  var unchanged = textToTransform === transformed;
  if (!transformed || unchanged) {
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

  var editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    return;
  }

  var filePath = getCurrentFilePath(editor);
  var excludedGlobs = getConfigOption('excludedGlobs');
  var isFilePathExcluded = excludedGlobs.some(function (glob) {
    return minimatch(filePath, glob);
  });
  if (isFilePathExcluded) {
    return;
  }

  var respectEslintignore = getConfigOption('respectEslintignore');
  if (respectEslintignore && isFilePathMatchedByEslintignore(filePath)) {
    return;
  }

  format(null, { ignoreSelection: true }, editor);
}

function getConfigOption(key) {
  return atom.config.get('prettier-eslint.' + key);
}

function getCurrentScope() {
  return atom.workspace.getActiveTextEditor().getGrammar().scopeName;
}

function getCurrentFilePath(editor) {
  var _editor$buffer = editor.buffer;
  _editor$buffer = _editor$buffer === undefined ? {} : _editor$buffer;
  var _editor$buffer$file = _editor$buffer.file;
  _editor$buffer$file = _editor$buffer$file === undefined ? {} : _editor$buffer$file;
  var filePath = _editor$buffer$file.path;

  return filePath;
}

function getNearestEslintignorePath(filePath) {
  var dir = path.parse(filePath).dir;
  return findCached(dir, '.eslintignore');
}

function isFilePathMatchedByEslintignore(filePath) {
  var eslintignorePath = getNearestEslintignorePath(filePath);
  if (!eslintignorePath) {
    return false;
  }

  var eslintignoreDir = path.parse(eslintignorePath).dir;
  var filePathRelativeToEslintignoreDir = path.relative(eslintignoreDir, filePath);
  var ignoredGlobs = fs.readFileSync(eslintignorePath, 'utf8').split(LINE_SEPERATOR_REGEX);

  return ignoredGlobs.some(function (glob) {
    return minimatch(filePathRelativeToEslintignoreDir, glob);
  });
}

function executePrettierESLint(text, filePath) {
  var transformed = void 0;
  allowUnsafeNewFunction(function () {
    // please someone figure out how I can avoid
    // needing to wrap this in allowUnsafeNewFunction!
    try {
      transformed = formatPrettierESLint({ text: text, filePath: filePath });
    } catch (error) {
      if (!error.message.includes('No ESLint configuration')) {
        var message = 'prettier-eslint-atom: ' + error.toString();
        var detail = error.stack.toString();
        atom.notifications.addError(message, { detail: detail, dismissable: true });
      }
      console.log('Error executing prettier-eslint-atom:', error);
      transformed = false;
    }
  });
  return transformed;
}