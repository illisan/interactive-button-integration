# Interactive Button

For this app the key compontents are: 

1. Slash Commands
2. Message attachments & payloads
3. Interactive Buttons

First, you'll need a request URL that slack can use to post to. Remember, that all request URLs must point to a TLS-enabled HTTPS URL located on a publicly accessible server with a valid SSL certificate.
If you don't have an SSL certificate yet but want to test your app, Slack recommends that you use an HTTP proxy tool such as ngrok. This allows you to set up a secure tunnel on your localhost. I used ngrok for this particualr integration. You can find the downloading instructions [here](https://ngrok.com/download). 

To process HTTP requests you'll need to set up a a web server, I did this using express. 


1. Once you've set up your server make sure you create a slack app if you don't already have one. 
2. The app will provide you with a client id and client secret these are important for slack oAuth process. Keep this information safe! I created envoirment variables that store that information for me. I found [this tutorial helpful](https://codeburst.io/how-to-easily-set-up-node-environment-variables-in-your-js-application-d06740f9b9bd) for that.
3. Create a new slash command and activate interactive messaging.
4. Provide it with a request url from your ngrok server. 
5. Assign your response url to a varible you can use throughout the app. 
6. You will need this variable to decode the JSON message you send and recieve. 
7. Your post request will have a message with attachments. This is what will display in the slack GUI for the user to interact with. 
8. Slack offer thorough documentation on the capabilities of messages and message attachments. When using interactive features make sure to include the "actions" key this will track the user's behaviour and allow you to respond to it. 
9. This interactive meassage features a joke of the day, when the button is clicked, the "confirm" key is triggered and a pop-up window appears with the answer to the joke. Clicking the "no" button triggers a follow-up response from the /slack/actions endpoint. 

![Alt text](/imgs/sample1.png?raw=true)

![Alt text](/imgs/sample2.png?raw=true)

![Alt text](/imgs/sample3.png?raw=true)