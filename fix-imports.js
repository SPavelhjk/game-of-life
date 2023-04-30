const fs = require('fs')
const path = require('path')

const distPath = path.join(__dirname, 'dist')

function fixImports(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const updatedContent = fileContent.replace(/from\s+['"](\.\/\w+)(?<!\.js)['"]/g, 'from "$1.js"')
  fs.writeFileSync(filePath, updatedContent)
}

function processDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory "${directory}":`, err)
      process.exit(1)
    }

    files.forEach(file => {
      const fullPath = path.join(directory, file)
      const fileStats = fs.statSync(fullPath)

      if (fileStats.isDirectory()) {
        processDirectory(fullPath)
      } else if (path.extname(file) === '.js') {
        fixImports(fullPath)
      }
    })
  })
}

processDirectory(distPath)
