import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";

const App = () => {
    return (
        <ChatProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                </Routes>
            </Router>
        </ChatProvider>
    );
};

export default App;
