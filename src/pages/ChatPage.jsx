import React, { useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { Layout, Splitter } from "antd";
import ChatHistory from "../components/ChatHistory";
import ChatPane from "../components/ChatPane";
import ChatInput from "../components/ChatInput";
import {ChatContext} from "../context/ChatContext.jsx";

const { Content } = Layout;

const ChatPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('user_id');

    const { setCurrentUserId, fetchChatHistory, fetchUserDetails } = useContext(ChatContext);

    useEffect(() => {
        if(!userId) {
            window.location.href = "http://localhost:5174/"
        } else {
            fetchChatHistory(userId);
            setCurrentUserId(userId);
            fetchUserDetails(userId);
        }
        // Functions are memoized with useCallback, safe to exclude from deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <div style={{ background: 'linear-gradient(135deg, #ffffff, #f8fffe)' }}>
            <Splitter
                style={{
                    height: '100vh',
                    boxShadow: '0 0 20px rgba(45, 106, 79, 0.1)',
                    background: 'linear-gradient(135deg, #ffffff, #f1fdf4)'
                }}
            >
                <Splitter.Panel 
                    defaultSize="22.5%"
                    min="20%" 
                    max="35%" 
                    style={{
                        backgroundColor: "#ffffff",
                        borderRight: '1px solid #e8f5e8',
                        boxShadow: 'inset -1px 0 0 rgba(45, 106, 79, 0.05)'
                    }}
                >
                    <ChatHistory />
                </Splitter.Panel>
                <Splitter.Panel style={{
                    backgroundColor: "#f9fdf8",
                    background: 'linear-gradient(180deg, #f9fdf8 0%, #ffffff 100%)'
                }}>
                    <ChatPane />
                    <ChatInput />
                </Splitter.Panel>
            </Splitter>

            {/*         
        <Layout style={{ height: "100vh" }}>
            <ChatHistory />
            <Layout>
                <Content style={{ padding: "20px", background: "#fff" }}>
                    <ChatPane />
                    <ChatInput />
                </Content>
            </Layout>
        </Layout> */}
        </div>
    );
};

export default ChatPage;
