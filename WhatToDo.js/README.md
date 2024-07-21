 

# WhatToDo (js)
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

## Deploy on CPanel

- **Upload the content**

  - Upload all files in a directory named "whattodo" in the root of the server.
    - e.g.: /home/gamehous/whattodo

- **Create a Node.js App**

  - Create app using "Setup Node.js App" section and give the 

  - Stop the app after creation and click on "RunNPM Install" button

  - Start the app and click on "Run JS script" button, select "run" and lick on  "Run JS script"

    - You should see the pm2 output

  - You can use Terminal to monitor/manage your app and modules

    - in the Terminal you should run the given command, which will appear on the top of the window after creating the app

      - e.g. : *source /home/gamehous/nodevenv/whattodo/20/bin/activate && cd /home/gamehous/whattodo*

    - You may need to install pm2 after activation of nodevenv in terminal, to be able to manage the running app:

      - ```
        npm install pm2 -g
        ```

- **Register the App**

  - From the "Application Manager", create a new app.

  - This will create a .htaccess file inside the whattodo directory. Add the following lines to this file:

    - ```
      RewriteEngine On
      RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
      ```

    - If the .htaccess file is not present, manually create it with the following content, and change paths based on your server and nodevenv:

      - ```
        # DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
        PassengerAppRoot "/home/gamehous/whattodo"
        PassengerBaseURI "/whattodo"
        PassengerNodejs "/home/gamehous/nodevenv/whattodo/20/bin/node"
        PassengerAppType node
        PassengerStartupFile app.js
        # DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END
        
        RewriteEngine On
        RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
        ```

        

---

> to start a similar project, first initialize a node.js + express.js project
> ```shell
> npm init -y
> npm install express	
> npm install pm2 -g
> ```
> then, work on codes

