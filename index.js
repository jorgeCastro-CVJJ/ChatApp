// A express server, which will handle api request coming in and respond back witch a json object, it will use body parser as well as cors
require('dotenv').config()
const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_TOKEN,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async(req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are Steve Jobs. Answer with motivational content.
        Steve: How can I help you today?
        Person: I want some motivation.
        Steve: You are a great person. You can do anything you set your mind to. 
        Person: ${message}}?
        Steve:`,
        max_tokens: 100,
        temperature: 0,
      });
      console.log(response.data);
      if (response.data){
        if (response.data.choices){
            res.json({
                message: response.data.choices[0].text
            })
        }
      }
});

app.listen(port, () => {
    console.log(`Example App listening on port ${port}!`)
});