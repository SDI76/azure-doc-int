# AzureDocumentIntelligence

Azure JS SDK wrapper für Omnis JSWorker

After cloning the project, run "npm install" to install dependencies.

The project will not run as standalone JS. 
It is build to only run with omnis_calls.js and has to be deployed to the JSWorker Folder inside either the APP Path or the Install Path of Omnis.

Before Omnis 11, any module had to be manually added to the omnis_modules.js.
Unsupported hint: Copy or deploy the new omnis_modules.js and the other .js files out of an Omnis 11 installation to the jsworker folder of previous Omnis versions to benefit from automated module discovery and registration.
