import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
import ManagePage from "./pages/ManagePage";

const App = () => {
    return (
        <ChatProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                </Routes>
                 <Routes>
                     <Route path="/manage" element={<ManagePage />} />
                 </Routes>
            </Router>
        </ChatProvider>
    );
};

export default App;
