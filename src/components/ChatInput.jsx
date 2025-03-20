import { Input, Button } from "antd";
import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatInput = ({ chat_id }) => {
    const [input, setInput] = useState("");
    const { addMessage } = useContext(ChatContext);

    const sendMessage = () => {
        if (input.trim()) {
            addMessage({ role: "user", content: input }, chat_id);
            setInput("");
        }
    };

    return (
        <div style={{ padding: "20px", display: "flex", gap: "10px" }}>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onPressEnter={sendMessage}
            />
            <Button type="primary" onClick={sendMessage}>
                Send
            </Button>
        </div>
    );
};

export default ChatInput;
