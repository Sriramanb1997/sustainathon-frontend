import React from 'react';
import './styles.css';

const LoadingIndicator = ({ type = 'enhanced', message = 'AI is thinking...', position = 'inline' }) => {
    const renderLoadingContent = () => {
        switch (type) {
            case 'dots':
                return (
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                );
            
            case 'spinner':
                return (
                    <div className="ai-response-spinner">
                        <div className="spinner-ring"></div>
                        <div className="spinner-inner"></div>
                    </div>
                );
            
            case 'brain':
                return (
                    <div className="thinking-animation">
                        <div className="brain-dots">
                            <div className="brain-dot"></div>
                            <div className="brain-dot"></div>
                            <div className="brain-dot"></div>
                            <div className="brain-dot"></div>
                            <div className="brain-dot"></div>
                            <div className="brain-dot"></div>
                        </div>
                        <span className="thinking-text">Processing your request...</span>
                    </div>
                );
            
            case 'stream':
                return (
                    <div className="streaming-indicator">
                        <div className="stream-wave">
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                        </div>
                        <span>Streaming response...</span>
                    </div>
                );
            
            case 'minimal':
                return (
                    <div className="loading-minimal">
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                                                                        <span>{message}</span>
                    </div>
                );
            
            case 'enhanced':
            default:
                return (
                    <div className={position === 'chat' ? 'chat-loading-container' : 'enhanced-loading-container'}>
                        <div className="ai-response-spinner">
                            <div className="spinner-ring"></div>
                            <div className="spinner-inner"></div>
                        </div>
                        <div className="typing-indicator">
                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="typing-text">{message}</span>
                        </div>
                    </div>
                );
        }
    };

    const getContainerClass = () => {
        switch (position) {
            case 'absolute':
                return 'loading-absolute';
            case 'sticky':
                return 'loading-sticky';
            case 'full-width':
                return 'loading-full-width';
            case 'chat':
                return 'chat-loading-wrapper';
            case 'inline':
            default:
                return 'loading-inline';
        }
    };

    return (
        <div className={`loading-container ${getContainerClass()}`}>
            {renderLoadingContent()}
        </div>
    );
};

export default LoadingIndicator;
