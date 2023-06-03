import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const apiKey = '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';

const client = axios.create({
    headers: {
        Authorization: "Bearer " + apiKey,
    },
});

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const sendMessage = async () => {
        if (inputText.trim() === '') {
            return;
        }

        const params = {
            prompt: messages.map((message) => message.text).join('\n') + '\nUser: ' + inputText,
            model: "text-davinci-003",
            max_tokens: 10,
            temperature: 0,
        };

        try {
            const response = await client
                .post("https://api.openai.com/v1/completions", params)
                .then((result) => {
                    const assistantReply = result.data.choices[0].text.trim();
                    console.log(assistantReply);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { role: 'user', text: inputText },
                        { role: 'assistant', text: assistantReply }
                    ]);
                })
                .catch((err) => {
                    console.log(err);
                });
            setInputText('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.role === 'user' ? 'You: ' : 'Assistant: '}{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.messageList}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    messageList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 8,
        padding: 8,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        fontSize: 16,
    },
});

export default ChatPage;
