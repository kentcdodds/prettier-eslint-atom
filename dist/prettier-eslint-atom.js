'use strict';

/* eslint func-style:0, no-alert:0 */
alert('This plugin has been merged with prettier-atom. ' + 'Uninstall prettier-eslint, install prettier-atom, ' + 'and enable ESLint integration.');

// local helpers
var commands = null;
var editorObserver = null;
var helpers = null;

var format = function format() {
  return requireHelpers().format();
};
var createSaveHandler = function createSaveHandler(editor) {
  return function () {
    return requireHelpers().formatOnSaveIfEnabled(editor);
  };
};
var handleEvents = function handleEvents(editor) {
  return editor.getBuffer().onWillSave(createSaveHandler(editor));
};

// public API
module.exports = {
  activate: function activate() {
    commands = atom.commands.add('atom-workspace', 'prettier-eslint:format', format);
    editorObserver = atom.workspace.observeTextEditors(handleEvents);
  },
  deactivate: function deactivate() {
    if (commands) {
      commands.dispose();
    }
    if (editorObserver) {
      editorObserver.dispose();
    }
  }
};

// HACK: lazy load most of the code we need for performance
//       Inspired by: https://github.com/lee-dohm/tabs-to-spaces
function requireHelpers() {
  if (!helpers) {
    // eslint-disable-next-line global-require
    helpers = require('./helpers');
  }
  return helpers;
}