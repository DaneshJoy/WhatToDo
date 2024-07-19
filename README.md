 

# WhatToDo
A personal ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&style=plastic) and ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB&style=plastic) project to help me randomly choose a task to do from my pile of tasks

## Install

- Install Node.js

- Install pm2

  - ```shell
    npm install pm2 -g
    ```

- Run the following command inside the project dir to install dependencies:

  - ```shell
    npm install
    ```


## Run

### From CLI

- #### Using node:

	Will be terminated if you close the terminal window 

	- ```shell
		node app.js
		```

- #### Using PM2:

	Runs in background, and you can close the terminal window.

	App can be stopped using ```pm2 stop whattodo``` and can be removed from pm2 list using ```pm2 delete whattodo```
  
  - ```shell
  	pm2 start app.js --name whattodo
  	```
		or
		``` shell
		pm2 start app.js --name whattodo --watch
		```
	
	> [!note]
	>
	> Using **--watch** option, pm2 will automatically restart app when a file is modified in the current directory or its subdirectories.
	
	> [!note]
	>
	> Using **--watch** option, stopping the app will not prevent it to be restarted on file change. To totally disable the watch feature, do: 
	> ```shell
	> pm2 stop app --watch
	> ```

---

### Using Script

 - #### Linux:
	
	- Run ```run.sh``` script


 - #### Windows:

	- Run ```run.bat``` script

---

> to start a similar project, first initialize a node.js + express.js project
> ```shell
> npm init -y
> npm install express	
> ```
> then, work on codes

