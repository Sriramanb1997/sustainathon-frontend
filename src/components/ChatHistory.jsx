import { Button, Layout, Menu, Typography, Popconfirm } from "antd";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const ChatHistory = () => {
    const { chatHistory, fetchChatMessages, deleteChatByChatId } = useContext(ChatContext);
    const handleDelete = (chatId, user_id) => {
        console.log(`Deleting chat with ID: ${chatId}`);
        deleteChatByChatId(chatId, user_id); // Assuming `deleteChat` is a method in your context for deleting a chat
    };

    // Convert chat history into Ant Design's `items` format
    const menuItems = chatHistory.map((chat) => ({
        key: chat.chat_id,
        label: (
            <span>
                <span style={{ height: 'auto', width: 'vw' }} onClick={() => fetchChatMessages(chat.chat_id, chat.user_id)}>
                    <Text>{chat.heading}</Text>
                    {/* <br /> */}
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(chat.created_at).toLocaleString()}
                    </Text>
                </span>
                <span style={{ float: 'right' }}>
                    <Popconfirm
                        title="Delete the Chat"
                        description="Are you sure to delete this chat?"
                        onConfirm={() => handleDelete(chat.chat_id, chat.user_id)}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <DeleteOutlined style={{color: 'red'}}/>
                    </Popconfirm>
                </span>
            </span>
        ),
    }));

    return (
        <Sider width={505} style={{ background: "#f0f2f5", padding: "20px", width: "100%", maxWidth: "500px" }}>
            <h2>Chat History</h2>
            <Menu mode="vertical" items={menuItems} />
        </Sider>
    );
};

export default ChatHistory;
