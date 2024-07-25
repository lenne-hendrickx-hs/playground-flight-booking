import Markdown from "react-markdown";

export interface MessageItem {
  role: 'AGENT' | 'CONTACT';
  text: string;
}

interface MessageProps {
  message: MessageItem;
}

export default function Message({message}: MessageProps) {
  return (
    <div className="mb-l">
      <div className="font-bold">{message.role === 'CONTACT' ? '🧑‍💻 You' : '🤖 Assistant'}</div>
      <div>
        <Markdown>
          {message.text}
        </Markdown>
      </div>
    </div>
  )
};