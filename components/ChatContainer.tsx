import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <h1>Chat Container</h1>
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatContainer;