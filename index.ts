import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

type SpecifyPathsProps = {
  dir: string
  postCommand?: string
  command?: string
}

type AllProjectsInFolderProps = {
  dir: string
  postCommand?: string
  executeCommandInFolderName?: string
  command: string
}

const execCommand = (
  directory: string,
  command?: string,
  postCommand?: string
) => {
  if (command) {
    const outputCommand = execSync(command, {
      cwd: directory,
      encoding: 'utf8',
    })

    console.log(outputCommand)
  }

  if (postCommand) {
    const outputPostCommand = execSync(postCommand, {
      cwd: directory,
      encoding: 'utf8',
    })

    console.log(outputPostCommand)
  }
}

export const specifyPaths = (arrayOfDirOptions: SpecifyPathsProps[]) => {
  arrayOfDirOptions.forEach(options => {
    const lastFolderNameInDirectory = path.basename(options.dir)

    console.log(`-> Pulling ${lastFolderNameInDirectory}`)

    execCommand(options.dir, options.command, options?.postCommand)
  })
}

export const allProjectsInFolder = (dirOption: AllProjectsInFolderProps) => {
  try {
    const projects: string[] = []
    const foldersInDirectory = fs.readdirSync(dirOption.dir)

    foldersInDirectory.forEach(directory => {
      const filePath = path.join(dirOption.dir, directory)
      const stats = fs.lstatSync(filePath)

      if (stats.isDirectory()) {
        projects.push(filePath)
      }
    })

    projects.forEach(projectDirectory => {
      try {
        const lastFolderNameInDirectory = path.basename(projectDirectory)

        const postCommand =
          dirOption?.executeCommandInFolderName === lastFolderNameInDirectory
            ? dirOption?.postCommand
            : undefined

        execCommand(projectDirectory, dirOption.command, postCommand)

        console.log(
          `\n-> Executing command '${dirOption.command}' in ${lastFolderNameInDirectory}`
        )
      } catch (error) {
        console.log(`ERROR: ${error}`)
      }
    })

    return projects
  } catch (error) {
    console.log(error)
  }
}
