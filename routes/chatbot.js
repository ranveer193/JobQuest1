const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

async function generateResponse(userQuery) {
const apiKey = "AIzaSyDWotEIRYV87q3qS-lO9b_QeCVKwBNFBnA";; // Replace with your actual API Key
const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

const prompt = `You are QueryBot, a chatbot that helps users with information related to jobs and skills. Answer the
following question in a friendly tone: "${userQuery}"`;

const data = {
prompt: {
text: prompt,
},
temperature: 0.7,
maxOutputTokens: 150,
};

try {
const response = await axios.post(endpoint, data, {
headers: {
'Content-Type': 'application/json',
},
});

return response.data.candidates[0].output;
} catch (error) {
return "Sorry, I couldn't fetch the answer right now. Please try again later.";
}
}

router.get('/', (req, res) => {
res.render('chatbot');
});

router.post('/query', async (req, res) => {
const userQuery = req.body.query;
const responseText = await generateResponse(userQuery);
res.json({ response: responseText });
});

module.exports = router;