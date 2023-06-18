const {  Configuration,OpenAIApi  } = require('openai');
var express = require('express');
var router = express.Router();
var config = require('config');

const configuration = new Configuration({
    apiKey: config.get("key"),
});
    const openai = new OpenAIApi (configuration);

router.post('/chatgpt', async (req, res) => {
  const prompt = req.body.prompt;
  console.log("Propmt",prompt);
  
  try {
    const completion = await openai.createCompletion({
        model: "ada",
        prompt: prompt,
        maxTokens: 150,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0.6,
        frequencyPenalty: 0.6,
    });
    console.log("Response",completion.data.choices[0].text);
    console.log(completion.data.choices[0].text);
    res.json({ text: completion.data.choices[0].text });
    } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).json({ error: 'An error occurred while generating response.' });
    } else {
      console.log(error.message);
      res.status(400).json({ error: 'Internal Server Error.' });
    }
  }
});
module.exports = router;
