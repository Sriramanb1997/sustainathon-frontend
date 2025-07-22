import { useContext, useState } from "react";
import {Modal, Button, Layout, Menu, Typography, Popconfirm, FloatButton, Avatar, Space, Flex} from "antd";
import { ChatContext } from "../context/ChatContext";
import { DeleteOutlined, DatabaseOutlined, QuestionCircleOutlined, UploadOutlined, LinkOutlined } from '@ant-design/icons';
import './styles.css'

const { Sider } = Layout;
const { Text } = Typography;

const ChatHistory = () => {
    const { chatHistory, clearChats, clearCurrentChatId, fetchChatMessages, deleteChatByChatId, userDetails } = useContext(ChatContext);
    const handleDelete = (chatId, user_id) => {
        console.log(`Deleting chat with ID: ${chatId}`);
        deleteChatByChatId(chatId, user_id); // Assuming `deleteChat` is a method in your context for deleting a chat
    };

    // Convert chat history into Ant Design's `items` format
    const menuItems = chatHistory.map((chat) => ({
        key: chat.chat_id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span
                    style={{ flex: 1, minWidth: 0, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    onClick={() => fetchChatMessages(chat.chat_id, chat.user_id)}
                >
                    <Text style={{ fontWeight: 500, fontStyle: "italic" }}>
                        {chat.heading}
                    </Text>
                </span>
                <Popconfirm
                    title={'Delete the Chat'}
                    description="Are you sure to delete this chat?"
                    onConfirm={() => handleDelete(chat.chat_id, chat.user_id)}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                    <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
                </Popconfirm>
            </div>
        ),
    }));

    return (
        <Sider width={400} style={{ background: "#fff", padding: "20px", width: "100%", maxWidth: "500px" }}>

            <h2>Chat History</h2>
            <Flex justify="space-between" vertical style={{height: "94vh"}}>
                <div>
                    <Menu mode="vertical" items={menuItems} style={{ border: '0px solid black', minWidth: 0, flex: "auto" }} />
                </div>


                <h2 style={{display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", padding: "10px"}}>
                    <Avatar
                        src={userDetails.profile_picture}
                        style={{
                            verticalAlign: 'middle',
                            marginRight: 20
                        }}
                        size="medium"
                    />
                    {userDetails.first_name + " " + userDetails.last_name}
                </h2>
            </Flex>


            <FloatButton.Group
                style={{     top: "-1116px", right: "22px" }}
                trigger="click"
                type="primary"
                icon={<UploadOutlined />}
                placement="top"
            >
                <FloatButton icon={<DatabaseOutlined />} tooltip="Manage URL's"/>
                <FloatButton icon={<LinkOutlined />} tooltip="Add URL"/>
            </FloatButton.Group>

        </Sider>
    );
};

export default ChatHistory;
