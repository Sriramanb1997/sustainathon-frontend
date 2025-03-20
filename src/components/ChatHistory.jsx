import { Modal, Layout, Menu, Typography, Popconfirm, FloatButton } from "antd";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { DeleteOutlined, DatabaseOutlined, QuestionCircleOutlined, UploadOutlined, LinkOutlined } from '@ant-design/icons';
import './styles.css'

const { Sider } = Layout;
const { Text } = Typography;

const ChatHistory = () => {
    const { chatHistory, clearChats, clearCurrentChatId, fetchChatMessages, deleteChatByChatId } = useContext(ChatContext);
   
    const handleDelete = (chatId, user_id) => {
        console.log(`Deleting chat with ID: ${chatId}`);
        deleteChatByChatId(chatId, user_id); // Assuming `deleteChat` is a method in your context for deleting a chat
    };

    // Convert chat history into Ant Design's `items` format
    const menuItems = chatHistory.map((chat) => ({
        key: chat.chat_id,
        label: (
            <span>
                <span style={{ height: 'auto', width: '100%' }} onClick={() => fetchChatMessages(chat.chat_id, chat.user_id)}>
                    <Text style={{ fontWeight: 500, fontStyle: "italic" }}>{chat.heading}</Text>
                    {/* <br /> */}
                    {/* <Text type="secondary" style={{ fontSize: "12px" }}>
                        {new Date(chat.created_at).toLocaleString()}
                    </Text> */}
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
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>
                </span>
            </span>
        ),
    }));

    return (
        <Sider width={505} style={{ background: "#fff", padding: "20px", width: "100%", maxWidth: "500px" }}>

            <h2>Chat History</h2>
            <Menu mode="vertical" items={menuItems} style={{ border: '0px solid black' }} />

            
            <FloatButton.Group 
                style={{ bottom: '20px', right: '96%' }}
                trigger="click"
                type="primary"
                icon={<UploadOutlined />}
                placement="top"
            >
                <FloatButton icon={<DatabaseOutlined />} />
                <FloatButton icon={<LinkOutlined />} />
            </FloatButton.Group>
           
        </Sider>
    );
};

export default ChatHistory;
