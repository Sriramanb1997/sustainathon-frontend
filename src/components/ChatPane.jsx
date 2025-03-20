import { Card } from "antd";
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css'

const ChatPane = () => {
    const { chats, fetchChatHistory, loading } = useContext(ChatContext);

    useEffect(() => {
        fetchChatHistory("sriramanb1997");
    }
        , []);
    return (
        <div style={{ padding: "20px", height: "90vh", overflowY: "auto", backgroundColor: "#f9fdf8;" }}>
            {/* {chats.map((msg, index) => (
                <Card
                    key={index}
                    style={{
                        marginBottom: "10px",
                        textAlign: msg.role === "user" ? "right" : "left",
                        background: msg.role === "user" ? "#e6f7ff" : "#f5f5f5",
                        fontSize: msg.role === "user" ? "16px" : "14px",

                    }}
                >
                    {msg.role === "user" ? msg.content: <Markdown components={{
                        table: ({ node, ...props }) => <table className="markdown-table" {...props} />,
                    }} remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>}
                    
                </Card>
            ))} */}

            {chats.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                        marginBottom: "10px",
                    }}
                >
                    <Card
                       className={msg.role === "user" ? "user-card-style" : "other-card-style"}
                    >
                        {msg.role === "user" ? (
                            <span>{msg.content}</span>
                        ) : (
                            <Markdown
                                components={{
                                    table: ({ node, ...props }) => (
                                        <table className="markdown-table" {...props} />
                                    ),
                                }}
                                remarkPlugins={[remarkGfm]}
                            >
                                {msg.content}
                            </Markdown>
                        )}
                    </Card>
                </div>
            ))}
            {loading && <div style={{ display: 'block', margin: 'auto', width: '10%', scale: '2' }}><LoadingOutlined /></div>}
        </div>
    );
};

export default ChatPane;
