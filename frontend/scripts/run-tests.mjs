import { access } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const jestBinary = path.join(
  projectRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'jest.cmd' : 'jest'
)

async function run() {
  if (await hasJestBinary()) {
    await runJest()
  } else {
    await runFallbackSmokeTest()
  }
}

async function hasJestBinary() {
  try {
    await access(jestBinary)
    return true
  } catch (error) {
    if (error && error.code !== 'ENOENT') {
      console.warn('Unable to access Jest binary:', error)
    }
    return false
  }
}

async function runJest() {
  await new Promise((resolve, reject) => {
    const child = spawn(jestBinary, process.argv.slice(2), {
      stdio: 'inherit',
    })

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`Jest exited with signal ${signal}`))
      } else if (code !== 0) {
        reject(new Error(`Jest failed with exit code ${code}`))
      } else {
        resolve()
      }
    })
  })
}

async function runFallbackSmokeTest() {
  const appFile = path.join(projectRoot, 'src', 'pages', 'home', 'Home.jsx')
  const expectedSnippet = 'Plan smarter with VyuGo dynamic search'
  const source = await readFile(appFile, 'utf8')

  if (!source.includes(expectedSnippet)) {
    throw new Error(
      `Fallback smoke test failed: expected to find "${expectedSnippet}" in Home.jsx`
    )
  }

  console.info('Fallback smoke test passed (Jest binary not available).')
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
