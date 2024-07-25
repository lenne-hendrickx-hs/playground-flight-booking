import React, {useRef, useEffect, useState} from 'react';
import {AssistantService} from "../generated/endpoints";
import {MessageInput} from "@vaadin/react-components/MessageInput";
import AgentMessageList from "./AgentMessageList";
import ChatRole from "../generated/ai/spring/demo/ai/playground/data/ChatRole";
import ChatMessage from "../generated/ai/spring/demo/ai/playground/data/ChatMessage";
import ContactMessageList from "./ContactMessageList";
import ChatMessageEvent from "../generated/ai/spring/demo/ai/playground/data/ChatMessageEvent";

interface ChatProps {
    chatId: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ContactChat({chatId, className, style}: ChatProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatMessageEvent[]>([]);
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

    function addMessage(message: ChatMessageEvent) {
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
            <h3>Bryanair customer</h3>
            <ContactMessageList
                messages={messages}
                className="flex-grow overflow-scroll" />
            <MessageInput onSubmit={e => sendMessage(e.detail.value)} className="px-0" disabled={working}/>
        </div>
    );
}