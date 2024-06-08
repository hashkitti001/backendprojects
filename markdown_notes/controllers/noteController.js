require("dotenv").config()
const multer = require("multer")
const fs = require("fs")

/* Controller function to check the grammar of a markdown doc */
const checkGrammar = async (req, res) => {
  try {
    const readFile = (filePath) => {
      if (filePath) {
        return fs.promises.readFile(filePath)
      }
    }
    const pathToFile = req.file.path
    const fileContents = await readFile(pathToFile)
    const requestFormat = encodeURI(fileContents)
    //console.log(requestFormat)
    /* Call the WebSpellChecker API on the contents of the file */

    const response = await fetch(`https://svc.webspellchecker.net/api?cmd=grammar_check&customerid=${process.env.WSKEY}&format=json&text=${requestFormat}&slang=en_US&out_type=words`)
    const results = await response.json()
    return res.status(200).json(results)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: "An error occurred while checking grammar." })
  }
}
module.exports = { checkGrammar }