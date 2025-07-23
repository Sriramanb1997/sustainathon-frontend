import { createContext, useState, useCallback } from "react";
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

    const fetchUserDetails = useCallback((user_id) => {
        axios.get(`${url}/user/${user_id}`)
            .then((response) => {
                setUserDetails(response.data)
            })
    }, []);

    // Fetch chat history from API
    const fetchChatHistory = useCallback((user_id) => {
        axios.get(`${url}/list_chats?page=&limit=&search=&start_date&end_date&user_id=${user_id}`)
            .then(response => {
                const data = response.data;
                setChatHistory(data.chats);
            })
            .catch(error => {
                console.error("Error fetching chat history:", error);
            });
    }, []);

    // Delete chat from API
    const deleteChatByChatId = useCallback((chat_id, user_id) => {
        axios.delete(`${url}/delete_chat/${chat_id}?user_id=${user_id}`)
            .then(() => {
                fetchChatHistory(user_id);
            })
            .catch(error => {
                console.error("Error deleting chat:", error);
            });
    }, [fetchChatHistory]);

    // Fetch current chat messages
    const fetchChatMessages = useCallback((chat_id, user_id) => {
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
    }, []);

    const clearChats = useCallback(() => {
        setChats([]);
    }, []);

    const clearCurrentChatId = useCallback(() => {
        setCurrentChatId(undefined);
    }, []);

    const logout = useCallback(() => {
        // Clear all state
        setChats([]);
        setChatHistory([]);
        setCurrentChatId("");
        setCurrentUserId("");
        setUserDetails({});
        setLoading(false);
        
        // Redirect to login page
        window.location.href = "/login";
    }, []);

    const addMessage = useCallback((message, chat_id, user_id) => {
        setLoading(true);
        setChats([...chats, message]);
        const isNewChat = !chat_id || chat_id === "";
        
        axios.post(`${url}/ask?user_id=${user_id}`, {
            question: message.content,
            chat_id: chat_id
        }, {
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => { 
                chats.pop();
                setChats([...chats]);
                fetchChatMessages(response.data.chat_id, user_id);
                
                // Refresh chat history if this was a new chat
                if(isNewChat){
                    // Add a small delay to ensure backend has saved the chat
                    setTimeout(() => {
                        fetchChatHistory(user_id);
                    }, 500);
                }
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
    }, [chats, fetchChatMessages, fetchChatHistory]);

    const addMessageStream = useCallback((message, chat_id, user_id) => {
        setLoading(true);
        setChats([...chats, message]);

        const updatedURL = `${url}/ask_with_stream?user_id=${encodeURIComponent(user_id)}&question=${encodeURIComponent(message.content)}&chat_id=${encodeURIComponent(chat_id || "")}`;

        const eventSource = new EventSource(updatedURL);

        let accumulatedResponse = "";
        let newChatId = null;
        let isNewChat = !chat_id || chat_id === "";

        setChats((prevChats) => [
            ...prevChats,
            { role: "assistant", content: "" }  // Placeholder for assistant message
        ]);

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                
                // Handle chat_id from backend response
                if (data.chat_id && isNewChat) {
                    newChatId = data.chat_id;
                    setCurrentChatId(data.chat_id);
                }
                
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
            
            // Refresh chat history after assistant response is complete for new chats
            if (isNewChat && newChatId) {
                // Add a small delay to ensure backend has saved the chat
                setTimeout(() => {
                    fetchChatHistory(user_id);
                }, 500);
            }
        });
    }, [chats, fetchChatHistory]);

    return (
        <ChatContext.Provider value={{ 
            chats, 
            addMessage, 
            addMessageStream, 
            chatHistory, 
            fetchChatMessages, 
            fetchChatHistory, 
            currentChatId, 
            loading, 
            deleteChatByChatId, 
            currentUserId, 
            setCurrentUserId, 
            clearChats, 
            clearCurrentChatId, 
            userDetails, 
            fetchUserDetails, 
            logout,
            setCurrentChatId
        }}>
            {children}
        </ChatContext.Provider>
    );
};
