/* eslint func-style:0 */
// local helpers
let commands = null
let editorObserver = null
let helpers = null

const format = () => requireHelpers().format()
const createSaveHandler = editor =>
  () => requireHelpers().formatOnSaveIfEnabled(editor)
const handleEvents = editor =>
  editor.getBuffer().onWillSave(createSaveHandler(editor))

// public API
module.exports = {
  activate() {
    commands = atom.commands.add(
      'atom-workspace',
      'prettier-eslint:format',
      format,
    )
    editorObserver = atom.workspace.observeTextEditors(handleEvents)
  },
  deactivate() {
    if (commands) {
      commands.dispose()
    }
    if (editorObserver) {
      editorObserver.dispose()
    }
  },
}

// HACK: lazy load most of the code we need for performance
//       Inspired by: https://github.com/lee-dohm/tabs-to-spaces
function requireHelpers() {
  if (!helpers) {
    // eslint-disable-next-line global-require
    helpers = require('./helpers')
  }
  return helpers
}
