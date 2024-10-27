const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const omnis_calls = require('omnis_calls');
const {errorCodes, newErrorWithCode} = require('../errors.js');
const fs = require('fs');



let autoSendResponse = true; // Set to false in methods which should not send a response to Omnis when they exit. (e.g. async methods)

    // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
    //const key = "YOUR_KEY";
    //const endpoint = "YOUR_ENDPOINT";
    // sample document from MS over https URL
    //const formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"

    module.exports = {
        call: function (method, param, response) { // The only requirement of an Omnis module is that it implement this function.
    
            autoSendResponse = true;
    
            if (methodMap[method]) {
                const result = methodMap[method](param, response);
                if (autoSendResponse)
                    omnis_calls.sendResponse(result, response);
                return true;
            }
            else {
                throw newErrorWithCode(errorCodes.METHOD_NOT_FOUND, "");
            }
    
        }
    };


    // Omnis method to function mapping
    const methodMap = {

        // Upload a document to and endpoint and retrieve recognized form fields from given pretrained model
        evaluateFields: async function(param, response) {

            autoSendResponse = false;   
            const apikey = param.key;
            const endpoint = param.endpoint;
            const documentPath = param.path;
            const modelId = param.modelId;
    
        const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apikey));
        const fileStream = fs.createReadStream(documentPath);
    
        const poller = await client.beginAnalyzeDocument(modelId, fileStream, "application/pdf");
        // Wait for the process to complete
        const result = await poller.pollUntilDone();
       
        // send the response to Omnis
         omnis_calls.sendResponse(result, response);
            
           return 1;
          
        },

        // classify your document upload
        classify: async function(param, response) {

            autoSendResponse = false;   
            const apikey = param.key;
            const endpoint = param.endpoint;
            const documentPath = param.path;
            const modelId = param.modelId;
    
        const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apikey));
        const fileStream = fs.createReadStream(documentPath);
    
        const poller = await client.beginClassifyDocument(modelId, fileStream);
        
        // Wait for the process to complete
        const result = await poller.pollUntilDone();
       
        // send the response to Omnis
        omnis_calls.sendResponse(result, response);
            
           return 1;
          
        }

    };




    
