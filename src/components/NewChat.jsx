import { useContext} from "react";
import './styles.css';
import { ChatContext } from '../context/ChatContext';

const NewChat = () => {

    const { addMessageStream, currentUserId } = useContext(ChatContext);

    const onSuggestionClick = (suggestion) => {
        addMessageStream({ role: "user", content: suggestion }, undefined, currentUserId);
    }

    const suggestions = [
        "Tell me about Tiger reserve forests in India",
        "Generate a table of Tigers count with State",
        "List the different projects maintained by CWSIndia",
        "What are the sanctuaries that are maintaining endangered birds?"
    ];

    return (
        <div className='new-chat-container'>
            <div className="welcome-header">
                <div className="logo-section">
                    <span className="logo-icon">🌱</span>
                    <h1 className="welcome-title">BioSphere AI</h1>
                </div>
                <h2 className="welcome-subtitle">Start a new conversation here</h2>
                <p className="welcome-description">Ask me anything about wildlife conservation, environmental protection, or sustainability</p>
            </div>
            
            <div className="suggestions-section">
                <h3 className="suggestions-title">Try these suggestions to get started:</h3>
                <div className="suggestions-grid">
                    {suggestions.map((suggestion, index) => (
                        <div 
                            key={index} 
                            className="suggestion-card" 
                            onClick={() => onSuggestionClick(suggestion)}
                        >
                            <div className="suggestion-icon">💡</div>
                            <span className="suggestion-text">{suggestion}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewChat;