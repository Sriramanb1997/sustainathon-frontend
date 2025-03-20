import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
import ManagePage from "./pages/ManagePage";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
    return (
        <ChatProvider>
            <Router>
                <Routes>
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/manage" element={<ManagePage />} />
                </Routes>
            </Router>
        </ChatProvider>
    );
};

export default App;
