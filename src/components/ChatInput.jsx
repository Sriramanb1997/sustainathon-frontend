import { Input, Button } from "antd";
import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { MessageOutlined } from '@ant-design/icons';
import './styles.css'
const ChatInput = () => {
    const [input, setInput] = useState("");
    const { clearChats, clearCurrentChatId, currentChatId, addMessage } = useContext(ChatContext);

    const sendMessage = () => {
        if (input.trim()) {
            addMessage({ role: "user", content: input }, currentChatId, "sriramanb1997");
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
            />
            <Button className="sendbtn" onClick={sendMessage}>
                Send
            </Button>
        </div>
    );
};

export default ChatInput;
