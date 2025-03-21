import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ChatContext = createContext();
const url = "http://127.0.0.1:5000"

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");
    const [userDetails, setUserDetails] = useState({})

    // Delete chat from API
    const deleteChatByChatId = (chat_id, user_id) => {
        axios.delete(`${url}/delete_chat/${chat_id}?user_id=${user_id}`)
            .then(() => {
                fetchChatHistory(user_id);
            })
            .catch(error => {
                console.error("Error deleting chat:", error);
            });
    };

    const fetchUserDetails = (user_id) => {
        axios.get(`${url}/user/${user_id}`)
            .then((response) => {
                setUserDetails(response.data)
            })
    }

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

    const addMessageStream = (message, chat_id, user_id) => {
        setLoading(true);
        setChats([...chats, message]);

        const updatedURL = `${url}/ask_with_stream?user_id=${encodeURIComponent(user_id)}&question=${encodeURIComponent(message.content)}&chat_id=${encodeURIComponent(chat_id || "")}`;

        const eventSource = new EventSource(updatedURL);

        let accumulatedResponse = "";

        setChats((prevChats) => [
            ...prevChats,
            { role: "assistant", content: "" }  // Placeholder for assistant message
        ]);

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.content) {
                    accumulatedResponse += data.content;

                    setChats((prevChats) => {
                        const updatedChats = [...prevChats];
                        updatedChats[updatedChats.length - 1] = { role: "assistant", content: accumulatedResponse };
                        return updatedChats;
                    });
                }
            } catch (error) {
                console.error("Error parsing SSE message:", error);
            }
        };

        eventSource.onerror = (error) => {
            console.error("SSE error:", error);
            eventSource.close();
            setLoading(false);
        };

        eventSource.onopen = () => console.log("SSE connection opened");

        eventSource.addEventListener("end", () => {
            eventSource.close();
            setLoading(false);
        });
    };

    return (
        <ChatContext.Provider value={{ chats, addMessage, addMessageStream, chatHistory, fetchChatMessages, fetchChatHistory, currentChatId, loading, deleteChatByChatId, currentUserId, setCurrentUserId, clearChats, clearCurrentChatId, userDetails, fetchUserDetails}}>
            {children}
        </ChatContext.Provider>
    );
};
