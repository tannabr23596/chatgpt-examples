const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//
const { Configuration, OpenAIApi } = require("openai");
//
// Set the 'OPENAI_API_KEY  ' variable
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || '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';
//

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY 
});
const openai = new OpenAIApi(configuration);
// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;
  console.log('prompt=',prompt)
  
  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });
  res.send(completion.data.choices[0].text);
  
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//