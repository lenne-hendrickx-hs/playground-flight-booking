import React, {useRef, useEffect, useState} from 'react';
import Message, {MessageItem} from './Message';
import {AssistantService} from "../generated/endpoints";
import {MessageInput} from "@vaadin/react-components/MessageInput";
import MessageList from "./MessageList";
import ChatRole from "../generated/ai/spring/demo/ai/playground/data/ChatRole";

interface ChatProps {
    chatId: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ContactChat({chatId, className, style}: ChatProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [working, setWorking] = useState(false);

    useEffect(() => {
            // Join the chat channel
            AssistantService.join().onNext(message => {
                addMessage(message);
                setWorking(false);
            });
        }, []);

// Automatically scroll down whenever the messages change
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    function addMessage(message: MessageItem) {
        setMessages(messages => [...messages, message]);
    }

    async function sendMessage(message: string) {
        setWorking(true);
        await AssistantService.chat(chatId, {
            role: ChatRole.CONTACT,
            text: message
        });
    }

    return (
        <div className={className} style={style}>
            <h3>Brianair customer</h3>
            <MessageList
                messages={messages}
                className="flex-grow overflow-scroll"
                messageTitleMapper={message => message.role === 'CONTACT' ? '🧑‍💻 You' : '🤖 Customer support agent'} />
            <MessageInput onSubmit={e => sendMessage(e.detail.value)} className="px-0" disabled={working}/>
        </div>
    );
}