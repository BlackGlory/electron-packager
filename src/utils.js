'use strict'

const fs = require('fs')
const extraFilesystem = require('extra-filesystem')

const ELECTRON_IGNORE_FILE = '.electronignore'

function readElectronIgnores () {
  if (!extraFilesystem.pathExistsSync(ELECTRON_IGNORE_FILE)) return []

  const text = fs.readFileSync(ELECTRON_IGNORE_FILE, 'utf-8')
  return text.split('\n')
    .filter(x => !x.startsWith('#'))
    .filter(x => x.trim() !== '')
    .map(x => globToRegExpString(x))
}

function globToRegExpString (globRule) {
  return globRule
    .replace(/\./g, String.raw`\.`)
    .replace(/\*\*/g, String.raw`.*`)
    .replace(/\*/g, String.raw`[^/\\]*`) + '$'
}

module.exports = { readElectronIgnores }
