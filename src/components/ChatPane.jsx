import { Card } from "antd";
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css'

const ChatPane = () => {
    const {chats, fetchChatHistory, loading } = useContext(ChatContext);

    useEffect(() => {
        fetchChatHistory("sriramanb1997");
    }
    , []);
    return (
        <div style={{ padding: "20px", height: "90vh", overflowY: "auto" }}>
            {chats.map((msg, index) => (
                <Card
                    key={index}
                    style={{
                        marginBottom: "10px",
                        textAlign: msg.role === "user" ? "right" : "left",
                        background: msg.role === "user" ? "#e6f7ff" : "#f5f5f5",
                    }}
                >
                    <Markdown components={{
          table: ({ node, ...props }) => <table className="markdown-table" {...props} />,
        }} remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
                </Card>
            ))}
            {loading && <div style={{display : 'block', margin : 'auto', width: '10%', scale: '2'}}><LoadingOutlined /></div>}
        </div>
    );
};

export default ChatPane;
