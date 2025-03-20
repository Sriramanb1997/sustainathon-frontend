import { Card } from "antd";
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ChatPane = () => {
    const {chats, fetchChatHistory, loading } = useContext(ChatContext);

    useEffect(() => {
        fetchChatHistory("sriramanb1997");
    }
    , []);
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
                    <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
                </Card>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ChatPane;
