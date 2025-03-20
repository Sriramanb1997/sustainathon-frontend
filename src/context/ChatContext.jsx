import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ChatContext = createContext();
const url = "http://127.0.0.1:5000"

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState("");
    const [loading, setLoading] = useState(false);

    // Delete chat from API
    const deleteChatByChatId = (chat_id, user_id) => {
        axios.delete(`${url}/delete_chat/${chat_id}?user_id=${user_id}`)
            .then(() => {
                fetchChatHistory();
            })
            .catch(error => {
                console.error("Error deleting chat:", error);
            });
    };

    // Fetch chat history from API
    const fetchChatHistory = (user_id) => {
        axios.get(`${url}/list_chats?page=&limit=&search=&start_date&end_date&user_id=${user_id}`)
            .then(response => {
                const data = response.data;
                setChatHistory(data.chats);
            })
            .catch(error => {
                console.error("Error fetching chat history:", error);
            });
    };

    // Fetch current chat messages
    const fetchChatMessages = (chat_id, user_id) => {
        setCurrentChatId(chat_id);
        setLoading(true);
        axios.get(`${url}/get_chat/${chat_id}?user_id=${user_id}`)
            .then(response => {
                const data = response.data;
                setChats(data.messages); // Directly set messages from backend
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching chat messages:", error);
                setLoading(false);
            });
    };

    // useEffect( () => {

    //     fetchChatHistory();
    // }, []);

    const clearChats = () => {
        setChats([]);
    }

    const clearCurrentChatId = () => {
        setCurrentChatId(undefined);
    }

    const addMessage = (message, chat_id, user_id) => {
        setLoading(true);
        setChats([...chats, message]);
        axios.post(`${url}/ask?user_id=${user_id}`, {
            question: message.content,
            chat_id: chat_id
        }, {
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => { 
                chats.pop();
                setChats([...chats]);
                fetchChatMessages(response.data.chat_id, user_id)
                if(!chat_id || chat_id === ""){
                    fetchChatHistory(user_id);
                }
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
    };

    return (
        <ChatContext.Provider value={{ chats, addMessage, chatHistory, fetchChatMessages, fetchChatHistory, currentChatId, loading, deleteChatByChatId, clearChats, clearCurrentChatId }}>
            {children}
        </ChatContext.Provider>
    );
};
