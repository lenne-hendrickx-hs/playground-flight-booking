import Markdown from "react-markdown";

export interface SuggestedReplyItem {
    role: 'AGENT' | 'CONTACT';
    text: string;
}

interface SuggestedReplyProps {
    suggestedReply: SuggestedReplyItem;
    className?: string;
    onReplySelected?: (text: string) => void
}

export default function SuggestedReply({suggestedReply, className, onReplySelected}: SuggestedReplyProps) {
    return (
        <div className={`suggested-reply ${className}`}>
            <div>
                <p onClick={(e) => onReplySelected?.(suggestedReply.text)}>
                    {suggestedReply.text}
                </p>
            </div>
        </div>
    )
};