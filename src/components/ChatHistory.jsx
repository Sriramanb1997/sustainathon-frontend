import { useContext, useState } from "react";
import { Layout, Menu, Typography, Popconfirm, FloatButton, Avatar, Flex, Dropdown } from "antd";
import { ChatContext } from "../context/ChatContext";
import { DeleteOutlined, DatabaseOutlined, QuestionCircleOutlined, UploadOutlined, LinkOutlined, DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './styles.css';

const { Sider } = Layout;
const { Text } = Typography;

const ChatHistory = () => {
    const { chatHistory, fetchChatMessages, deleteChatByChatId, userDetails, logout, currentChatId } = useContext(ChatContext);
    const [expandedGroups, setExpandedGroups] = useState({ 'Today': true, 'Recent': true, 'Yesterday': true });
    
    const handleDelete = (chatId, user_id) => {
        console.log(`Deleting chat with ID: ${chatId}`);
        deleteChatByChatId(chatId, user_id);
    };

    const toggleGroup = (groupKey) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupKey]: !prev[groupKey]
        }));
    };

    // Group chats by date
    const groupChatsByDate = (chats) => {
        if (!chats || chats.length === 0) {
            return {};
        }

        // Get current date in IST
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const nowIST = new Date(now.getTime() + istOffset);
        const today = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        const groups = {
            'Today': [],
            'Yesterday': [],
            'Last 7 days': [],
        };

        const monthGroups = {};

        chats.forEach(chat => {
            // Try multiple date fields and fallback to current date if none exist
            let chatDate;
            if (chat.created_at) {
                chatDate = new Date(chat.created_at);
            } else if (chat.updated_at) {
                chatDate = new Date(chat.updated_at);
            } else if (chat.date) {
                chatDate = new Date(chat.date);
            } else {
                // Fallback to today if no date is available
                chatDate = new Date();
            }

            // Handle invalid dates
            if (isNaN(chatDate.getTime())) {
                chatDate = new Date();
            }

            // Convert chat date to IST
            const chatDateIST = new Date(chatDate.getTime() + istOffset);
            const chatDateOnly = new Date(chatDateIST.getFullYear(), chatDateIST.getMonth(), chatDateIST.getDate());

            console.log('Chat:', chat.heading, 'Date (IST):', chatDateIST, 'Today (IST):', today); // Debug log

            if (chatDateOnly.getTime() === today.getTime()) {
                groups['Today'].push(chat);
            } else if (chatDateOnly.getTime() === yesterday.getTime()) {
                groups['Yesterday'].push(chat);
            } else if (chatDateOnly >= weekAgo) {
                groups['Last 7 days'].push(chat);
            } else {
                const monthKey = chatDateIST.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
                if (!monthGroups[monthKey]) {
                    monthGroups[monthKey] = [];
                }
                monthGroups[monthKey].push(chat);
            }
        });

        // Filter out empty groups
        Object.keys(groups).forEach(key => {
            if (groups[key].length === 0) {
                delete groups[key];
            }
        });

        console.log('Grouped chats (IST):', { ...groups, ...monthGroups }); // Debug log

        return { ...groups, ...monthGroups };
    };

    const createChatMenuItem = (chat) => ({
        key: chat.chat_id,
        className: currentChatId === chat.chat_id ? 'selected-chat-item' : '',
        label: (
            <div 
                className="chat-history-item"
                onClick={() => fetchChatMessages(chat.chat_id, chat.user_id)}
            >
                <span className="chat-title">
                    <Text className="chat-heading-text">
                        {chat.heading}
                    </Text>
                </span>
                <Popconfirm
                    title={'Delete the Chat'}
                    description="Are you sure to delete this chat?"
                    onConfirm={(e) => {
                        e.stopPropagation();
                        handleDelete(chat.chat_id, chat.user_id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                    <DeleteOutlined 
                        className="delete-chat-btn" 
                        onClick={(e) => e.stopPropagation()}
                    />
                </Popconfirm>
            </div>
        ),
    });

    const groupedChats = groupChatsByDate(chatHistory);

    // If no chats are grouped, show all in "Recent" group
    const hasGroupedChats = Object.keys(groupedChats).length > 0;
    const finalGroupedChats = hasGroupedChats ? groupedChats : { 'Recent': chatHistory };

    // User dropdown menu items
    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
            disabled: true, // Profile functionality can be added later
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: logout,
        },
    ];

    return (
        <Sider className="chat-history-sidebar" width="100%">
            <h2 className="chat-history-title">Chat History</h2>
            
            <Flex justify="space-between" vertical className="chat-history-container">
                <div className="chat-history-menu">
                    {Object.entries(finalGroupedChats).map(([groupName, chats]) => (
                        <div key={groupName} className="date-group">
                            <div 
                                className="date-group-header"
                                onClick={() => toggleGroup(groupName)}
                            >
                                <span>{groupName} ({chats.length})</span>
                                <DownOutlined 
                                    className={`date-group-toggle ${expandedGroups[groupName] ? 'expanded' : ''}`}
                                />
                            </div>
                            <div className={`date-group-content ${expandedGroups[groupName] ? 'expanded' : 'collapsed'}`}>
                                <Menu 
                                    mode="vertical" 
                                    items={chats.map(createChatMenuItem)}
                                    className="grouped-chat-menu"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="user-profile-section">
                    <Dropdown 
                        menu={{ items: userMenuItems }} 
                        trigger={['click']} 
                        placement="topLeft"
                    >
                        <div className="user-profile-clickable">
                            <Avatar
                                src={userDetails.profile_picture}
                                className="user-avatar"
                                size="medium"
                            />
                            <span className="user-name">
                                {userDetails.first_name + " " + userDetails.last_name}
                            </span>
                        </div>
                    </Dropdown>
                </div>
            </Flex>

            <FloatButton.Group
                className="chat-actions-float"
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
