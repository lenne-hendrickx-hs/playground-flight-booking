import React, {useEffect, useRef} from 'react';
import SuggestedReply, {SuggestedReplyItem} from "./SuggestedReply";

interface SuggestedReplyListProps {
  suggestedReplies: SuggestedReplyItem[];
  className?: string;
  onReplySelected?: (text: string) => void
}

export default function SuggestedReplyList({ suggestedReplies, className, onReplySelected }: SuggestedReplyListProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Automatically scroll down whenever the messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [suggestedReplies]);

  return (
    <div className={`suggested-replies ${className}`}>
      {suggestedReplies.map((reply, index) => (
        <SuggestedReply key={index} suggestedReply={reply} className={'mb-m'} onReplySelected={onReplySelected}/>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
}