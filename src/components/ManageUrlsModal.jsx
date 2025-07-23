import React, { useState, useEffect } from "react";
import { Modal, Tabs, Button, Form, Input, InputNumber, message, Table, Popconfirm } from "antd";
import { LinkOutlined, DatabaseOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from "axios";

const url = "http://127.0.0.1:5000";

const ManageUrlsModal = ({ isOpen, onClose }) => {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('add');

    useEffect(() => {
        if (isOpen) {
            fetchLinks();
        }
    }, [isOpen]);

    const fetchLinks = () => {
        axios.get(`${url}/links`)
            .then(response => {
                setData(response.data.links);
            })
            .catch(error => {
                console.error("Error fetching links:", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${url}/link/${id}`)
            .then(() => {
                message.success('Deleted successfully');
                fetchLinks();
            })
            .catch(error => {
                console.error("Error deleting link:", error);
                message.error('Failed to delete link');
            });
    };

    const handleSubmit = async (values) => {
        try {
            const { url, childLevels, excludeKeywords } = values;
            
            // Split URLs by comma and trim whitespace
            const urls = url.split(',').map(u => u.trim()).filter(u => u.length > 0);
            
            if (urls.length === 0) {
                message.error("Please enter at least one valid URL");
                return;
            }

            // Validate each URL
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            const invalidUrls = urls.filter(u => !urlPattern.test(u));
            
            if (invalidUrls.length > 0) {
                message.error(`Invalid URL(s): ${invalidUrls.join(', ')}`);
                return;
            }

            // Add protocol if missing
            const normalizedUrls = urls.map(u => {
                if (!u.startsWith('http://') && !u.startsWith('https://')) {
                    return 'https://' + u;
                }
                return u;
            });

            // Submit each URL
            const promises = normalizedUrls.map(normalizedUrl => 
                axios.post(`${url}/link`, {
                    url: normalizedUrl,
                    childLevels,
                    excludeKeywords
                })
            );

            await Promise.all(promises);
            
            const successMessage = urls.length === 1 
                ? "URL added successfully" 
                : `${urls.length} URLs added successfully`;
            
            message.success(successMessage);
            fetchLinks();
            form.resetFields();
            setActiveTab('manage'); // Switch to manage tab after adding
        } catch (error) {
            console.error("Error adding link(s):", error);
            message.error("Failed to add URL(s)");
        }
    };

    const handleClose = () => {
        form.resetFields();
        setActiveTab('add');
        onClose();
    };

    const columns = [
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            ellipsis: true,
            width: '60%',
        },
        {
            title: 'Child Levels',
            dataIndex: 'childLevels',
            key: 'childLevels',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '20%',
            render: (_, record) => (
                <Popconfirm
                    title="Delete URL"
                    description="Are you sure you want to delete this URL?"
                    onConfirm={() => handleDelete(record.id)}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                    <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />}
                        size="small"
                    >
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const tabItems = [
        {
            key: 'add',
            label: (
                <span>
                    <LinkOutlined />
                     {' '}
                    Add URL(s)
                </span>
            ),
            children: (
                <div style={{ padding: '20px 0' }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ maxWidth: '100%' }}
                    >
                        <Form.Item
                            name="url"
                            label="URL(s)"
                            rules={[
                                { required: true, message: "Please enter at least one URL" },
                            ]}
                            validateTrigger="onSubmit"
                        >
                            <Input.TextArea 
                                placeholder="Enter URL(s) - separate multiple URLs with commas&#10;Examples:&#10;https://example.com&#10;https://site1.com, https://site2.com, site3.com" 
                                size="large"
                                rows={5}
                                style={{
                                    '--ant-color-primary': '#059669',
                                    '--ant-color-primary-hover': '#10b981'
                                }}
                                onFocus={(e) => {
                                    // Target the actual textarea and its wrapper
                                    const textarea = e.target;
                                    const wrapper = textarea.closest('.ant-input-data-count') || textarea.parentElement;
                                    
                                    textarea.style.borderColor = '#059669';
                                    textarea.style.boxShadow = '0 0 0 2px rgba(5, 150, 105, 0.2)';
                                    textarea.style.outline = 'none';
                                    
                                    if (wrapper) {
                                        wrapper.style.borderColor = '#059669';
                                        wrapper.style.boxShadow = '0 0 0 2px rgba(5, 150, 105, 0.2)';
                                    }
                                }}
                                onBlur={(e) => {
                                    const textarea = e.target;
                                    const wrapper = textarea.closest('.ant-input-data-count') || textarea.parentElement;
                                    
                                    textarea.style.borderColor = '';
                                    textarea.style.boxShadow = '';
                                    
                                    if (wrapper) {
                                        wrapper.style.borderColor = '';
                                        wrapper.style.boxShadow = '';
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="childLevels"
                            label="Child Levels"
                            initialValue={1}
                            rules={[{ required: false, message: "Please enter a number" }]}
                            validateTrigger="onSubmit"
                        >
                            <InputNumber 
                                style={{ width: "100%" }} 
                                min={1} 
                                max={10}
                                placeholder="Enter number of child levels to crawl" 
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item 
                            name="excludeKeywords" 
                            label="Exclude Keywords (Optional)"
                        >
                            <Input 
                                placeholder="Enter keywords to exclude (comma separated)" 
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                style={{ 
                                    width: '100%',
                                    backgroundColor: '#059669',
                                    borderColor: '#059669'
                                }}
                            >
                                Add URL(s)
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: 'manage',
            label: (
                <span>
                    <DatabaseOutlined />
                    {' '}
                    Manage URLs
                </span>
            ),
            children: (
                <div style={{ padding: '20px 0' }}>
                    {data.length > 0 ? (
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey="id"
                            pagination={{
                                pageSize: 5,
                                showSizeChanger: false,
                                showQuickJumper: false,
                            }}
                            style={{ 
                                background: '#fafafa',
                                borderRadius: '8px'
                            }}
                        />
                    ) : (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '40px 0',
                            color: '#999'
                        }}>
                            <DatabaseOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                            <p>No URLs added yet</p>
                            <Button 
                                type="link" 
                                onClick={() => setActiveTab('add')}
                                style={{
                                    color: '#059669',
                                    fontWeight: '500'
                                }}
                            >
                                Add your first URL
                            </Button>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <style>{`
                .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #059669 !important;
                    font-weight: 600;
                }
                .ant-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
                    color: #10b981 !important;
                }
                .ant-tabs .ant-tabs-ink-bar {
                    background: #059669 !important;
                }
                .ant-tabs .ant-tabs-tab-btn {
                    color: #4b5563;
                    transition: color 0.3s ease;
                }
                .ant-tabs-tab {
                    padding: 12px 0 !important;
                }
                .ant-input:focus, 
                .ant-input-focused,
                .ant-input:focus-within {
                    border-color: #059669 !important;
                    box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
                }
                .ant-input:hover {
                    border-color: #10b981 !important;
                }
                .ant-input-number:focus, 
                .ant-input-number-focused,
                .ant-input-number:focus-within {
                    border-color: #059669 !important;
                    box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
                }
                .ant-input-number:hover {
                    border-color: #10b981 !important;
                }
                .ant-input-number .ant-input-number-input:focus {
                    box-shadow: none !important;
                }
                /* Ultra-specific TextArea overrides */
                .ant-modal .ant-tabs .ant-form .ant-input:focus,
                .ant-modal .ant-tabs .ant-form .ant-input-focused,
                .ant-modal .ant-tabs .ant-form .ant-input:focus-within,
                .ant-modal textarea:focus,
                .ant-modal textarea.ant-input:focus,
                .ant-modal .ant-input-data-count:focus-within textarea,
                .ant-input-data-count:focus-within .ant-input,
                .ant-input-data-count.ant-input-data-count-focus .ant-input,
                span.ant-input-affix-wrapper:focus-within textarea,
                span.ant-input-affix-wrapper.ant-input-affix-wrapper-focused textarea {
                    border-color: #059669 !important;
                    box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
                    outline: none !important;
                }
                .ant-modal textarea:hover,
                .ant-modal .ant-input-data-count:hover textarea {
                    border-color: #10b981 !important;
                }
                /* Force override any blue focus colors */
                * {
                    --ant-color-primary: #059669 !important;
                    --ant-color-primary-hover: #10b981 !important;
                }
            `}</style>
            <Modal
                title={
                    <div style={{ 
                        fontSize: '18px', 
                        fontWeight: '600',
                        color: '#2f4f4f'
                    }}>
                        Source Management
                    </div>
                }
                open={isOpen}
                onCancel={handleClose}
                footer={null}
                width={800}
                style={{ top: 20 }}
                styles={{
                    body: { 
                        padding: '24px',
                        background: 'linear-gradient(135deg, #ffffff, #f8fffe)'
                    }
                }}
            >
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                size="large"
                style={{
                    background: 'transparent'
                }}
                tabBarStyle={{
                    borderBottom: '1px solid #e8f5e8'
                }}
                tabBarGutter={32}
                animated={{ inkBar: true, tabPane: false }}
                indicatorStyle={{
                    color: '#059669'
                }}
            />
            </Modal>
        </>
    );
};export default ManageUrlsModal;
