import { Card, Avatar } from "antd";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './styles.css'
import rehypeRaw from 'rehype-raw';
import NewChat from "./NewChat";
import LoadingIndicator from "./LoadingIndicator";

const ChatPane = () => {
    const endOfMessagesRef = useRef(null);
    const {chats, userDetails } = useContext(ChatContext);

    const { Meta } = Card;
    useEffect(() => {
        // Scroll to the bottom when chats change
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    return (
        <div style={{ padding: "20px", height: "90vh", overflowY: "auto", backgroundColor: "#f9fdf8" }}>
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
                        <Meta title={msg.role === "user" ? userDetails.first_name : "BioSphere AI"} avatar={
                            msg.role === "user" ?
                            <Avatar
                                src={userDetails.profile_picture}
                                style={{
                                    backgroundColor: msg.role === "user" ? '#1890ff' : '#059669',
                                    verticalAlign: 'middle',
                                }}
                                size="default"

                            >
                            </Avatar>
                                : <Avatar
                                    style={{
                                        backgroundColor: '#e8f3efff',
                                        verticalAlign: 'middle',
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    size="default"

                                >
                                    {"🌱"}
                                </Avatar>
                        }
                        style={{marginBottom: "12px"}}/>

                        {msg.role === "user" ? (
                            <div className="user-message-content">
                                {msg.content}
                            </div>
                        ) : (
                            <div className="assistant-message-content">
                                {msg.content ? (
                                    <Markdown
                                        components={{
                                            table: ({ ...props }) => (
                                            <table className="markdown-table" {...props} />
                                            ),
                                            a: ({...props}) => (
                                                <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>
                                            ),
                                        }}
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        children={msg.content}
                                    >
                                    </Markdown>
                                ) : (
                                    <LoadingIndicator 
                                        type="enhanced" 
                                        message="Analyzing your query..." 
                                        position="chat"
                                    />
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            ))}
            <div ref={endOfMessagesRef} />
            {chats.length === 0 && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '80vh',
                    width: '100%'
                }}>
                    <NewChat />
                </div>
            )}
        </div>
    );
};

export default ChatPane;
