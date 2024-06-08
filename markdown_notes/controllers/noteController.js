require("dotenv").config()
const multer = require("multer")
const fs = require("fs")
const md = require("markdown-it")()

/* Reads contents from a file */

const readFile = (filePath) => {
  if (filePath) {
    return fs.promises.readFile(filePath, 'utf-8')
  }
}
/* Controller function to check the grammar of a markdown doc */
const checkGrammar = async (req, res) => {
  try {
    if (req.file.mimetype != 'text/markdown') {
      return res.status(409).json({ "message": "File must be a markdown document" })
    }
    const pathToFile = req.file.path
    const fileContents = await readFile(pathToFile)
    const requestFormat = encodeURI(fileContents)
    /* Call the WebSpellChecker API on the contents of the file */
    const response = await fetch(`https://svc.webspellchecker.net/api?cmd=grammar_check&customerid=${process.env.WSKEY}&format=json&text=${requestFormat}&slang=en_US&out_type=words`)
    const results = await response.json()
    return res.status(200).json(results)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: "An error occurred while checking grammar." })
  }
}
/* Controller function to render markdown as HTML*/
const renderAsHTML = async (req, res) => {
  try {
    if (req.file.mimetype != 'text/markdown') {
      return res.status(409).json({ "message": "File must be a markdown document" })
    }
    const pathToFile = req.file.path
    const fileContents = await readFile(pathToFile)
    const parsedMarkdown = md.render(JSON.stringify(fileContents))
    return res.status(200).json({ parsedMarkdown })
  } catch (e) {
    res.status(500).json({ error: "An error occurred while rendering markdown to HTML" })
  }
}
module.exports = { checkGrammar, renderAsHTML }