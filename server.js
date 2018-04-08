require('dotenv').config();
const express = require('express')
const app = express()
const request = require('request')
const bodyParser = require('body-parser')
const PORT = 4390

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.send('Ngrok is working! Path Hit: ' + req.url)
})

//This endpoint handles the Slack oAuth process of the app.
//When a user authorizes an app, a code query parameter is passed on the oAuth endpoint.
//Using a conditional, if code query is missing return an error.
//If code query is NOT missing, function runs a GET call to Slack's `oauth.access` endpoint

app.get('/oauth', (req, res) => {

    if (!req.query.code) {
        res.status(500)
        res.send('Error, query code is missing.')
    } else {
        request({
            url: 'https://slack.com/api/oauth.access',
            qs: {
                code: req.query.code,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET
            },
            method: 'GET'
        }, (error, response, body) => {
            if (error) {
                console.log(error)
            } else {
                res.json(body)
            }
        })
    }
})

sendMessageToSlackResponseURL = (responseURL, JSONmessage) => {
    let postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error) {
            console.log(error)
        }
    })
}


app.post('/command', urlencodedParser, (req, res) => {
    res.status(200).end() // best practice to respond with empty 200 status code
    let jokeJSON = {
        "randomJoke": [
            {
                "title": "What do you call it when Batman skips Church? :church:",
                "answer": "Christian Bale.", 
            },
            { 
                "title": "What's Batman's Favorite Part Of A Joke? :laughing:", 
                "answer": "The PUNCH line!" 
            },
            { 
                "title": "What's Batman's Favorite Fruit? :apple:", 
                "answer": "Ba na na na na na na na grapefruit." 
            },
            { 
                "title": "What Happened When Batman & Robin Were Run Over By A Steam Roller? :tractor:", 
                "answer": "They became Flatman and Ribbon." 
            },
            { 
                "title": "Where Do Batman's Goldfish Live? :fish:", 
                "answer": "In the Bat Tub!" 
            },
            { 
                "title": "Why Did Bruce's Date Go Badly? :broken_heart:", 
                "answer": "He had BAT breath!" 
            }
        ]
    }
    let jokePicker = jokeJSON.randomJoke[Math.floor(Math.random() * jokeJSON.randomJoke.length)];
    console.log(jokePicker)
    console.log()
    let body = req.body
    //console.log(req.body)
    let responseURL = body.response_url
    if (body.token != 'hL91GL1dIVVZTjcuUYFsGwmv') {
        res.status(403).end("Access forbidden")
    } else {
        let message = {
            "title": "Bat Joke of the Day",
            "attachments": [
                {
                    "title": "Bat Joke of the Day",
                    "image_url": "https://media.giphy.com/media/u1r17BYXVodfW/giphy.gif",
                    "text": jokePicker.title,
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "answer",
                            "text": "See Answer!",
                            "type": "button",
                            "value": "yes",
                            "style": "primary",
                            "confirm": {
                                "title": jokePicker.answer,
                                "text": "Did you have a laugh?",
                                "dismiss_text": "Yes",
                                "ok_text": "No"
                            }
                        },
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})

app.post('/slack/actions', urlencodedParser, (req, res) => {
    res.status(200).end() // best practice to respond with 200 status
    let actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    console.log(actionJSONPayload)
    let message = {
        "text": `Why so serious? ${actionJSONPayload.user.name}???`,
        "replace_original": false,
    }
    //console.log(message)
    sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
})



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})
