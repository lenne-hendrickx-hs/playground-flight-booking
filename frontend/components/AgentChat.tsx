import React, {useEffect, useRef, useState} from 'react';
import {AssistantService} from "../generated/endpoints";
import {MessageInput} from "@vaadin/react-components/MessageInput";
import AgentMessageList from "./AgentMessageList";
import ChatRole from "../generated/ai/spring/demo/ai/playground/data/ChatRole";
import SuggestedReplyList from "./SuggestedReplyList";
import {SuggestedReplyItem} from "./SuggestedReply";
import ChatMessageEvent from "../generated/ai/spring/demo/ai/playground/data/ChatMessageEvent";
import {TextAreaElement} from "@vaadin/react-components";

interface ChatProps {
    chatId: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function AgentChat({chatId, className, style}: ChatProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatMessageEvent[]>([]);
    const [replies, setReplies] = useState<SuggestedReplyItem[]>([]);
    const [working, setWorking] = useState(false);

    useEffect(() => {
        // Join the chat channel
        AssistantService.join().onNext(message => {
            addMessage(message);
            setWorking(false);
        });
        // Send welcome message
        AssistantService.chat(chatId, {
            role: ChatRole.AGENT,
            text: 'Welcome to Bryanair! How can I help you?'
        })
        AssistantService.suggestedReplies().onNext(message => {
            setReplies(replies => message)
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
            role: ChatRole.AGENT,
            text: message
        });
    }

    function selectSuggestedReply(text:string) {
        const textInput = document.querySelector('.agent-message-input vaadin-text-area') as TextAreaElement;
        if (textInput !== null) {
            textInput.value = text;
        }
    }

    return (
        <div className={className} style={style}>
            <h3>Bryanair agent</h3>

            <AgentMessageList
                messages={messages}
                className="flex-grow overflow-scroll"/>
            <MessageInput onSubmit={e => sendMessage(e.detail.value)} className="px-0 agent-message-input"
                          disabled={working}/>
            <SuggestedReplyList
                suggestedReplies={replies}
                onReplySelected={selectSuggestedReply}
                className="flex-grow overflow-scroll"
            />
        </div>
    );
}