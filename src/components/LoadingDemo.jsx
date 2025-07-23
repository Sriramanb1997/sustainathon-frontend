import React, { useState } from 'react';
import { Button, Card, Space, Typography, Divider } from 'antd';
import LoadingIndicator from './LoadingIndicator';
import './styles.css';

const { Title, Text } = Typography;

const LoadingDemo = () => {
    const [activeDemo, setActiveDemo] = useState(null);

    const loadingVariations = [
        {
            key: 'enhanced',
            title: 'Enhanced Loading (Default)',
            description: 'Complete loading experience with spinner and typing indicator'
        },
        {
            key: 'dots',
            title: 'Simple Dots',
            description: 'Classic three-dot bouncing animation'
        },
        {
            key: 'spinner',
            title: 'AI Response Spinner',
            description: 'Advanced spinner with inner pulse animation'
        },
        {
            key: 'brain',
            title: 'Brain Thinking',
            description: 'Brain-wave animation suggesting AI thinking process'
        },
        {
            key: 'stream',
            title: 'Streaming Response',
            description: 'Wave animation indicating real-time streaming'
        },
        {
            key: 'minimal',
            title: 'Minimal Loading',
            description: 'Subtle loading indicator for space-constrained areas'
        }
    ];

    const positionVariations = ['inline', 'absolute', 'sticky', 'full-width'];

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <Title level={2} style={{ textAlign: 'center', color: '#059669' }}>
                Enhanced Loading Animations Demo
            </Title>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
                Showcase of all available loading indicators for BioSphere AI responses
            </Text>

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Loading Type Variations */}
                <Card title="Loading Animation Types" style={{ marginBottom: '1rem' }}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {loadingVariations.map((variation) => (
                            <div key={variation.key} style={{ 
                                padding: '1rem', 
                                border: '1px solid #e5e7eb', 
                                borderRadius: '0.75rem',
                                backgroundColor: '#ffffff'
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginBottom: '0.5rem'
                                }}>
                                    <div>
                                        <Title level={5} style={{ margin: 0, color: '#374151' }}>
                                            {variation.title}
                                        </Title>
                                        <Text type="secondary">{variation.description}</Text>
                                    </div>
                                    <Button 
                                        type={activeDemo === variation.key ? 'primary' : 'default'}
                                        onClick={() => setActiveDemo(activeDemo === variation.key ? null : variation.key)}
                                        style={{ 
                                            background: activeDemo === variation.key ? '#059669' : undefined,
                                            borderColor: '#059669'
                                        }}
                                    >
                                        {activeDemo === variation.key ? 'Stop' : 'Demo'}
                                    </Button>
                                </div>
                                {activeDemo === variation.key && (
                                    <div style={{ 
                                        marginTop: '1rem', 
                                        padding: '1rem', 
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '0.5rem'
                                    }}>
                                        <LoadingIndicator 
                                            type={variation.key} 
                                            message="Analyzing your sustainability query..." 
                                            position="inline"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </Space>
                </Card>

                {/* Position Variations */}
                <Card title="Position Variations" style={{ marginBottom: '1rem' }}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {positionVariations.map((position) => (
                            <div key={position} style={{ 
                                padding: '1rem', 
                                border: '1px solid #e5e7eb', 
                                borderRadius: '0.75rem',
                                backgroundColor: '#ffffff',
                                position: 'relative',
                                minHeight: position === 'absolute' ? '100px' : 'auto'
                            }}>
                                <Title level={5} style={{ margin: 0, color: '#374151' }}>
                                    Position: {position}
                                </Title>
                                <LoadingIndicator 
                                    type="enhanced" 
                                    message={`Loading with ${position} positioning...`} 
                                    position={position}
                                />
                            </div>
                        ))}
                    </Space>
                </Card>

                {/* Chat Context Demo */}
                <Card title="In Chat Context" style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                        backgroundColor: '#f9fdf8', 
                        padding: '1rem', 
                        borderRadius: '0.75rem',
                        border: '1px solid #d1fae5'
                    }}>
                        {/* User Message */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            marginBottom: '1rem' 
                        }}>
                            <div className="user-card-style" style={{ maxWidth: '70%' }}>
                                How can I reduce my carbon footprint at home?
                            </div>
                        </div>

                        {/* AI Loading Response */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'flex-start', 
                            marginBottom: '1rem' 
                        }}>
                            <LoadingIndicator 
                                type="enhanced" 
                                message="BioSphere AI is analyzing sustainable home solutions..." 
                                position="inline"
                            />
                        </div>
                    </div>
                </Card>

                {/* Usage Instructions */}
                <Card title="Usage Instructions" style={{ marginBottom: '1rem' }}>
                    <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.5rem' }}>
                        <Title level={5} style={{ color: '#047857' }}>How to Use:</Title>
                        <pre style={{ 
                            backgroundColor: '#ffffff', 
                            padding: '1rem', 
                            borderRadius: '0.5rem',
                            border: '1px solid #d1fae5',
                            fontSize: '0.875rem'
                        }}>
{`import LoadingIndicator from './LoadingIndicator';

// Basic usage
<LoadingIndicator />

// With custom type and message
<LoadingIndicator 
    type="brain" 
    message="Processing your request..." 
    position="inline"
/>

// Available types: enhanced, dots, spinner, brain, stream, minimal
// Available positions: inline, absolute, sticky, full-width`}
                        </pre>
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export default LoadingDemo;
