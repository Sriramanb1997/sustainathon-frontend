import React, { useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { Layout, Splitter } from "antd";
import ChatHistory from "../components/ChatHistory";
import ChatPane from "../components/ChatPane";
import ChatInput from "../components/ChatInput";
import {ChatContext} from "../context/ChatContext.jsx";

const url = "http://127.0.0.1:5000"

const { Content } = Layout;

const ChatPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('user_id');

    const { setCurrentUserId, fetchChatHistory, fetchUserDetails } = useContext(ChatContext);

    useEffect(() => {
        if(!userId) {
            window.location.href = "http://localhost:5173/"
        } else {
            fetchChatHistory(userId);
            setCurrentUserId(userId);
            fetchUserDetails(userId);
        }
    }, []);

    return (
        <div>
            <Splitter
                style={{
                    height: '100vh',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Splitter.Panel defaultSize="22%" min="10%" max="70%" style={{backgroundColor: "#fff"}}>
                    <ChatHistory />
                </Splitter.Panel>
                <Splitter.Panel style={{backgroundColor: "#f9fdf8"}}>
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
