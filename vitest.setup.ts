// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'test_secret_key_1234567890'
