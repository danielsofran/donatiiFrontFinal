const axios = require('axios');

let conversationId = null;

async function getChatGPTResponse(conversationId, question) {
    try {
        if (!conversationId) {
            const response = await axios.post('https://api.openai.com/v1/conversations', {
                'model': 'gpt-3.5-turbo',
                'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'}]
            }, {
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json'
                }
            });
            conversationId = response.data.id;
        }

        // Send a user message/question to the conversation
        const userMessageResponse = await axios.post(`https://api.openai.com/v1/conversations/${conversationId}/messages`, {
            'messages': [{'role': 'user', 'content': question}]
        }, {
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
        });
        return userMessageResponse.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get response from ChatGPT');
    }
}

async function main() {
    try {
        const response1 = await getChatGPTResponse(conversationId, 'What is the weather today?');
        console.log(response1);

        const response2 = await getChatGPTResponse(conversationId, 'Tell me a joke.');
        console.log(response2);
    } catch (error) {
        console.error(error);
    }
}


//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