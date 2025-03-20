import { Layout, Menu, Typography } from "antd";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const { Sider } = Layout;
const { Text } = Typography;

const ChatHistory = () => {
    const { chatHistory, fetchChatMessages } = useContext(ChatContext);

    // Convert chat history into Ant Design's `items` format
    const menuItems = chatHistory.map((chat) => ({
        key: chat.chat_id,
        label: (
            <div onClick={() => fetchChatMessages(chat.chat_id)}>
                <Text>{chat.heading}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                    {new Date(chat.created_at).toLocaleString()}
                </Text>
            </div>
        ),
    }));

    return (
        <Sider width={250} style={{ background: "#f0f2f5", padding: "20px" }}>
            <h2>Chat History</h2>
            <Menu mode="vertical" items={menuItems} />
        </Sider>
    );
};

export default ChatHistory;
