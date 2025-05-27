import { IoChatbox } from "react-icons/io5";

const EmptyChat = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <IoChatbox className="text-green-700 size-8" />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to the Chat Application</h2>
                <p className="text-base-content/60">
                    Select a conversation to start chatting
                </p>
            </div>
        </div>
    );
}

export default EmptyChat;