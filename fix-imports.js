const fs = require('fs')
const path = require('path')

const distPath = path.join(__dirname, 'dist')

function fixImports(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const updatedContent = fileContent.replace(/from\s+['"](\.\/\w+)(?<!\.js)['"]/g, 'from "$1.js"')
  fs.writeFileSync(filePath, updatedContent)
}

fs.readdir(distPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory "${distPath}":`, err)
    process.exit(1)
  }

  files.forEach(file => {
    if (path.extname(file) === '.js') {
      fixImports(path.join(distPath, file))
    }
  })
})
