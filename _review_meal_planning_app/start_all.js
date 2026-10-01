import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, "..", "mongodb-data")
const mongodPath = "C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe"

console.log("========================================================")
console.log("       KHOI DONG HE THONG FOODVD FULLSTACK + MONGODB    ")
console.log("========================================================")

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// 1. Spawn MongoDB
console.log("\n[1/3] Khoi dong MongoDB (Port 27017)...")
const mongo = spawn(mongodPath, [
  "--dbpath", dataDir,
  "--port", "27017",
  "--wiredTigerCacheSizeGB", "0.5"
], { stdio: ["ignore", "pipe", "pipe"] })

let mongoStarted = false
mongo.stdout.on("data", (data) => {
  const line = data.toString()
  if (!mongoStarted && (line.includes("Waiting for connections") || line.includes("msg\":\"Waiting for connections"))) {
    mongoStarted = true
    console.log("🟢 [MongoDB] Da san sang tai: mongodb://localhost:27017/foodvd")
  }
})

mongo.stderr.on("data", (data) => {
  console.error("🔴 [MongoDB]", data.toString().trim())
})

// Wait for Mongo to be ready
setTimeout(() => {
  // 2. Spawn Backend Server
  console.log("[2/3] Khoi dong Backend API Server (Port 5000)...")
  const backend = spawn("node", ["server/server.js"], {
    cwd: __dirname,
    stdio: ["ignore", "pipe", "pipe"],
  })

  backend.stdout.on("data", (data) => {
    const text = data.toString().trim()
    if (text) console.log(`🚀 [Backend] ${text}`)
  })

  backend.stderr.on("data", (data) => {
    const text = data.toString().trim()
    if (text) console.error(`🔴 [Backend Error] ${text}`)
  })

  // 3. Spawn Frontend Vite
  setTimeout(() => {
    console.log("[3/3] Khoi dong Web Frontend Vite (Port 8443)...")
    const frontend = spawn("npm", ["run", "dev"], {
      cwd: __dirname,
      shell: true,
      stdio: "inherit",
    })

    frontend.on("close", (code) => {
      console.log(`Web server ket thuc voi ma: ${code}`)
      mongo.kill()
      backend.kill()
      process.exit(code || 0)
    })
  }, 1500)
}, 2000)

process.on("SIGINT", () => {
  console.log("\nDang dung tat ca dich vu...")
  mongo.kill()
  process.exit(0)
})

