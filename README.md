# AzureDocumentIntelligence

Azure JS SDK wrapper für Omnis JSWorker.

Check your node environment and update to the latest version and set the environment version accordingly:

- List packages: nvm ls
- Install latest: nvm install node --latest-npm
- List current: nvm current
- Change current: nvm alias default 23.1.0 or nvm alias default node (latest)
- Use specific: nvm use 23.1.0 or nvm use node (latest)


After cloning the project, run "npm install" to install the dependencies.
Make sure you do not rename the project folder, it's name has to be: azure-doc-ai 
If you changed the name of the folder, you will have to update the name in the omnis demo library: method "analyzeDocument", line 21 "Do iJSW.$callmethod('azure-doc-int'...."

When pointing to file for upload, whitespaces in paths are not accepted. Use only paths without whitespace

The project will not run as standalone JS! 
It is build to only run with omnis_calls.js and has to be deployed to the JSWorker Folder inside either the APP Path or the Install Path of Omnis.
Copy the hole project folder to either directory.


