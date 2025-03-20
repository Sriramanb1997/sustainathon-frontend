import { Card } from "antd";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatPane = () => {
    const { chats } = useContext(ChatContext);

    return (
        <div style={{ padding: "20px", height: "80vh", overflowY: "auto" }}>
            {chats.map((msg, index) => (
                <Card
                    key={index}
                    style={{
                        marginBottom: "10px",
                        textAlign: msg.role === "user" ? "right" : "left",
                        background: msg.role === "user" ? "#e6f7ff" : "#f5f5f5",
                    }}
                >
                    {msg.content}
                </Card>
            ))}
        </div>
    );
};

export default ChatPane;
