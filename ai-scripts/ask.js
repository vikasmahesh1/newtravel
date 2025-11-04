import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY not set. Copy .env.example to .env and add your key.')
  process.exit(1)
}

const client = new OpenAI({ apiKey })

const fileArg = process.argv[2]
const question = process.argv.slice(3).join(' ') || 'Please summarize this file and point out any issues.'

if (!fileArg) {
  console.error('Usage: node ai-scripts/ask.js <path-to-file> [question]')
  process.exit(1)
}

const filePath = path.resolve(process.cwd(), fileArg)
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`)
  process.exit(1)
}

const content = fs.readFileSync(filePath, 'utf8')

const system = `You are an expert developer assistant. Analyze the provided file contents and answer the user's question concisely.`
const user = `File path: ${fileArg}\n\n${content}\n\nQuestion: ${question}`

async function run() {
  try {
    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 1200
    })

    const out = resp.choices && resp.choices[0] && resp.choices[0].message && resp.choices[0].message.content
    console.log('\n=== ChatGPT response ===\n')
    console.log(out || JSON.stringify(resp, null, 2))
  } catch (err) {
    console.error('OpenAI request failed:', err.message || err)
    process.exit(1)
  }
}

run()
