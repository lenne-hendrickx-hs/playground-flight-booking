import React, { useRef, useEffect } from 'react';
import SuggestedReply, {SuggestedReplyItem} from './SuggestedReply';

interface SuggestedReplyListProps {
  messages: SuggestedReplyItem[];
  className?: string;
}

export default function SuggestedReplyList({ messages, className }: SuggestedReplyListProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Automatically scroll down whenever the messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={className}>
      {messages.map((msg, index) => (
        <SuggestedReply key={index} message={msg} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
}