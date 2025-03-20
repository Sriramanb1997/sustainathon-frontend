import { useContext} from "react";
import './styles.css';
import { ChatContext } from '../context/ChatContext';

const NewChat = () => {

    const { addMessage, addMessageStream, currentUserId } = useContext(ChatContext);

    const onSuggestionClick = (suggestion) => {
        addMessage({ role: "user", content: suggestion }, undefined, currentUserId);
    }

    const suggestions = [
        "Tell me about Tiger reserve forests in India",
        "Generate a table of Tigers count with State",
        "What does NGO's do ?"
    ];

    return (
        <div className='centered-element'>
            <div>
                <div>
                    <h1>Start a new conversation here</h1>
                </div>
                <div>
                    <p>Here are some of the suggestions...</p>
                </div>
                <div>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="new-card-suggestions" onClick={() => onSuggestionClick(suggestion)}>{suggestion}</div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default NewChat;