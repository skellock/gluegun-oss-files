// @cliDescription Copies common OSS files into the current directory.

module.exports = async function (context) {
  const { prompt, filesystem, print } = context

  // whatever we put in the ../files directory is our options
  const choices = filesystem.cwd(`${__dirname}/../files`).list()

  // the question
  const question = {
    name: 'files',
    type: 'checkbox',
    default: choices,
    message: 'Select some files to copy:',
    choices
  }

  // ask it
  const { files } = await prompt.ask(question)

  // with each file in the answer
  files.forEach(file => {
    // copy the file
    filesystem.copy(
      `${__dirname}/../files/${file}`,
      `${file}`,
      { overwrite: true }
    )
    print.success(`${print.checkmark} ${file}`)
  })
}
