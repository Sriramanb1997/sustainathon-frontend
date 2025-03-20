import { Layout, Splitter } from "antd";
import ChatHistory from "../components/ChatHistory";
import ChatPane from "../components/ChatPane";
import ChatInput from "../components/ChatInput";


const { Content } = Layout;

const ChatPage = () => {
    return (
        <div>
            <Splitter
                style={{
                    height: '100vh',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Splitter.Panel defaultSize="20%" min="10%" max="70%">
                    <ChatHistory />
                </Splitter.Panel>
                <Splitter.Panel>
                    <ChatPane />
                    <ChatInput />
                </Splitter.Panel>
            </Splitter>

            {/*         
        <Layout style={{ height: "100vh" }}>
            <ChatHistory />
            <Layout>
                <Content style={{ padding: "20px", background: "#fff" }}>
                    <ChatPane />
                    <ChatInput />
                </Content>
            </Layout>
        </Layout> */}
        </div>
    );
};

export default ChatPage;
