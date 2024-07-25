import React, {useEffect, useRef} from 'react';
import {MessageList} from "@vaadin/react-components";
import ChatMessage from "../generated/ai/spring/demo/ai/playground/data/ChatMessage";
import ChatMessageEvent from "../generated/ai/spring/demo/ai/playground/data/ChatMessageEvent";

interface AgentMessageListProps {
    messages: ChatMessageEvent[];
    className?: string;
}

export default function AgentMessageList({messages, className}: AgentMessageListProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    // Automatically scroll down whenever the messages change
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return (
        <div className={`conversation ${className}`}>
            <MessageList items={messages.map(message => ({
                text: message.text,
                time: `${Intl.DateTimeFormat('be', {dateStyle:'short', timeStyle:'medium'}).format(new Date(message.timestamp))}`,
                userName: message.role === 'AGENT' ? 'You' : 'Customer',
                userColorIndex: message.role === 'AGENT' ? 1 : 2,
                userImg: message.role === 'AGENT' ? 'https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif' : '',
                className: message.role === 'AGENT' ? 'current-user' : 'other-user',
            }))}
            />
            <div ref={endOfMessagesRef} />
        </div>
    )
}