package ai.spring.demo.ai.playground.data;

import java.util.Date;

public record ChatMessageEvent(ChatRole role, String text, Date timestamp) {

    public static ChatMessageEvent from(ChatMessage message) {
        return new ChatMessageEvent(message.role(), message.text(), new Date());
    }
}
