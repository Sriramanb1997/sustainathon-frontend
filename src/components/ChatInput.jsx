import { Input, Button } from "antd";
import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatInput = () => {
    const [input, setInput] = useState("");
    const { currentChatId, addMessage } = useContext(ChatContext);

    const sendMessage = () => {
        if (input.trim()) {
            addMessage({ role: "user", content: input }, currentChatId, "sriramanb1997");
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
            <Button style={{background: "#12a363", color: "#fff"}} onClick={sendMessage}>
                Send
            </Button>
        </div>
    );
};

export default ChatInput;
