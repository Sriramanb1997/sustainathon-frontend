import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);

    // Fetch chat history from API
    const fetchChatHistory = () => {
        axios.get("http://127.0.0.1:5000/list_chats")
            .then(response => {
                const data = response.data;
                setChatHistory(data.chats);
            })
            .catch(error => {
                console.error("Error fetching chat history:", error);
            });
    };

    // Fetch current chat messages
    const fetchChatMessages = (chat_id) => {
        axios.get(`http://127.0.0.1:5000/get_chat/${chat_id}`)
            .then(response => {
                const data = response.data;
                setChats(data.messages); // Directly set messages from backend
            })
            .catch(error => {
                console.error("Error fetching chat messages:", error);
            });
    };

    useEffect( () => {
        fetchChatHistory();
    }, []);

    const addMessage = (message, chat_id) => {
        axios.post("http://127.0.0.1:5000/ask", {
            question: message.content,
        }, {
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        })
        .then(() => fetchChatMessages(chat_id))
        .catch(error => {
            console.error("Error sending message:", error);
        });
    };

    return (
        <ChatContext.Provider value={{ chats, addMessage, chatHistory, fetchChatMessages }}>
            {children}
        </ChatContext.Provider>
    );
};
