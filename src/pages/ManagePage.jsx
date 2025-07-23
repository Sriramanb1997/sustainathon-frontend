import React, { useState } from "react";
import { Layout, Splitter, Button } from "antd";
import ChatHistory from "../components/ChatHistory";
import ManageUrlsModal from "../components/ManageUrlsModal";

const ManagePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    background: 'linear-gradient(180deg, #f9fdf8 0%, #ffffff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h1 style={{ 
                            fontSize: '32px', 
                            color: '#2f4f4f',
                            marginBottom: '16px'
                        }}>
                            URL Management
                        </h1>
                        <p style={{ 
                            fontSize: '16px', 
                            color: '#666',
                            marginBottom: '32px'
                        }}>
                            Manage your URLs for better chat experience
                        </p>
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                backgroundColor: '#059669',
                                borderColor: '#059669',
                                padding: '8px 32px',
                                height: 'auto'
                            }}
                        >
                            Open URL Manager
                        </Button>
                    </div>
                </Splitter.Panel>
            </Splitter>

            <ManageUrlsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ManagePage;
