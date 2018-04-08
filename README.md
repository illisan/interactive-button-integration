#Slash Command with Interactive Button

For this we'll need a another request URL. Remember, that all request URLs must point to a TLS-enabled HTTPS URL located on a publicly accessible server with a valid SSL certificate.
If you don't have an SSL certificate yet but want to test your app Slack recommends that you use an HTTP proxy tool such as ngrok. This allows you to set up a secure tunnel on your localhost. I used ngrok for this particualr integration. You can find the downloading instructions here. 

To process HTTP requests you'll need to set up a a web server, I used this using express. 
https://api.slack.com/tutorials/tunneling-with-ngrok

