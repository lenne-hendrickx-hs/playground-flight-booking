import Markdown from "react-markdown";

export interface MessageItem {
  role: 'AGENT' | 'CONTACT';
  text: string;
}

interface MessageProps {
  message: MessageItem;
  title: string
}

export default function Message({message, title}: MessageProps) {
  return (
    <div className="mb-l">
      <div className="font-bold">{title}</div>
      <div>
        <Markdown>
          {message.text}
        </Markdown>
      </div>
    </div>
  )
};