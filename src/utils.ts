import fs from 'fs'
import { pathExistsSync } from 'extra-filesystem'

const ELECTRON_IGNORE_FILE = '.electronignore'

export function readElectronIgnores(): string[] {
  if (!pathExistsSync(ELECTRON_IGNORE_FILE)) return []

  const text = fs.readFileSync(ELECTRON_IGNORE_FILE, 'utf-8')
  return text.split('\n')
    .filter(x => !x.startsWith('#'))
    .filter(x => x.trim() !== '')
    .map(x => globToRegExpString(x))
}

function globToRegExpString(globRule: string): string {
  return globRule
    .replace(/\./g, String.raw`\.`)
    .replace(/\*\*/g, String.raw`.*`)
    .replace(/\*/g, String.raw`[^/\\]*`) + '$'
}
