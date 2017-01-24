/* eslint no-console:0 */
const {allowUnsafeNewFunction} = require('loophole')
const formatPrettierESLint = require('prettier-eslint')
const minimatch = require('minimatch')

module.exports.format = format
module.exports.formatOnSaveIfEnabled = formatOnSaveIfEnabled

function format(
  event,
  options = {ignoreSelection: false},
  editor = atom.workspace.getActiveTextEditor(),
) {
  /* eslint complexity:[2, 7] */
  if (!editor) {
    return
  }

  const filePath = getCurrentFilePath(editor)
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition()
  const selectedText = editor.getSelectedText()
  const isTransformingFile = options.ignoreSelection || !selectedText

  const textToTransform = isTransformingFile ? editor.getText() : selectedText

  const transformed = executePrettierESLint(textToTransform, filePath)
  if (!transformed) {
    return
  }

  if (isTransformingFile) {
    editor.setText(transformed)
  } else {
    editor.setTextInBufferRange(editor.getSelectedBufferRange(), transformed)
  }

  editor.setCursorScreenPosition(cursorPositionPriorToFormat)
}

function formatOnSaveIfEnabled() {
  const shouldFormatOnSave = getConfigOption('formatOnSave')
  if (!shouldFormatOnSave) {
    return
  }

  const currentScope = getCurrentScope()
  const isInScope = getConfigOption('formatOnSaveScopes').includes(
    currentScope,
  )
  if (!isInScope) {
    return
  }

  const editor = atom.workspace.getActiveTextEditor()
  if (!editor) {
    return
  }

  const filePath = getCurrentFilePath(editor)
  const excludedGlobs = getConfigOption('excludedGlobs')
  const isFilePathExcluded = excludedGlobs.some(
    glob => minimatch(filePath, glob),
  )
  if (isFilePathExcluded) {
    return
  }

  format(null, {ignoreSelection: true}, editor)
}

function getConfigOption(key) {
  return atom.config.get(`prettier-eslint.${key}`)
}

function getCurrentScope() {
  return atom.workspace.getActiveTextEditor().getGrammar().scopeName
}

function getCurrentFilePath(editor) {
  const {buffer: {file: {path: filePath} = {}} = {}} = editor
  return filePath
}

function executePrettierESLint(text, filePath) {
  let transformed
  allowUnsafeNewFunction(() => {
    // please someone figure out how I can avoid
    // needing to wrap this in allowUnsafeNewFunction!
    try {
      transformed = formatPrettierESLint({text, filePath})
    } catch (error) {
      const message = `prettier-eslint-atom: ${error.toString()}`
      const detail = error.stack.toString()
      atom.notifications.addError(message, {detail, dismissable: true})
      console.log('Error executing prettier-eslint-atom:', error)
      transformed = false
    }
  })
  return transformed
}
