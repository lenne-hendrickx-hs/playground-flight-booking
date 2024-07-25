import Markdown from "react-markdown";

export interface SuggestedReplyItem {
  role: 'AGENT' | 'CONTACT';
  text: string;
}

interface SuggestedReplyProps {
  message: SuggestedReplyItem;
}

export default function SuggestedReply({message}: SuggestedReplyProps) {
  return (
    <div className="mb-l">
      <div>
        <Markdown>
          {message.text}
        </Markdown>
      </div>
    </div>
  )
};