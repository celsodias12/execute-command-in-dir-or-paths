# Auto git pull

Use for specific directories:

```js
const projectsPaths = [
  {
    // OR C:/Users/user/projects/project-01
    dir: '/home/user/projects/project-01',
    command: 'git pull'
  },
  {
    dir: '/home/user/projects/project-02',
    command: 'git pull'
    postCommand: 'mvn clean install',
  },
]

specifyPaths(projectsPaths)
```

For projects inside a folder:

```js
allProjectsInFolder({
  dir: '/home/user/projects',
  command: 'git pull',
  executeCommandInFolderName: 'project-01',
  // postCommand will only execute on project project-01 inside /home/user/projects
  postCommand: 'echo run only in project-01',
})
```
