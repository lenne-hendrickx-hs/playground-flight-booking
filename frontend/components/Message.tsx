import Markdown from "react-markdown";


export interface MessageItem {
  role: 'AGENT' | 'CONTACT';
  text: string;
  timestamp: string;
}

interface MessageProps {
  message: MessageItem;
  title: string
}

export default function Message({message, title}: MessageProps) {
    var formattedTimestamp = Intl.DateTimeFormat('be', {dateStyle:'short', timeStyle:'medium'}).format(new Date(message.timestamp))
  return (
    <div className="mb-l">
      <div className="font-bold">{title}</div>
      <div>
          {formattedTimestamp}
        <Markdown>
          {message.text}
        </Markdown>
      </div>
    </div>
  )
};