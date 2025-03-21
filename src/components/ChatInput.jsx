import { Input, Button } from "antd";
import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { MessageOutlined } from '@ant-design/icons';
import './styles.css'
const ChatInput = () => {
    const [input, setInput] = useState("");
    const { clearChats, clearCurrentChatId, currentChatId, addMessage, addMessageStream, currentUserId } = useContext(ChatContext);

    const sendMessage = () => {
        if (input.trim()) {
            addMessageStream({ role: "user", content: input }, currentChatId, currentUserId);
            setInput("");
        }
    };

    return (
        <div style={{ padding: "20px", display: "flex", gap: "10px" }}>
            <Button icon={<MessageOutlined />} className="rounded-button newchat" onClick={() => {clearChats(); clearCurrentChatId();}}>
                New Chat
            </Button>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onPressEnter={sendMessage}
                className="inputchat"
            />
            <Button className="sendbtn" onClick={sendMessage}>
                Send
            </Button>
        </div>
    );
};

export default ChatInput;
