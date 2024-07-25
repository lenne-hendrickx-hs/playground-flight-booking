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

export default function Chat({chatId, className, style}: ChatProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<MessageItem[]>([{
        role: 'AGENT',
        text: 'Welcome to Brianair! How can I help you?'
    }]);
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
            role: ChatRole.AGENT,
            text: message
        });
    }

    return (
        <div className={className} style={style}>
            <h3>Brianair customer</h3>
            <MessageList messages={messages} className="flex-grow overflow-scroll"/>
            <MessageInput onSubmit={e => sendMessage(e.detail.value)} className="px-0" disabled={working}/>
        </div>
    );
}