package ai.spring.demo.ai.playground.client;

import ai.spring.demo.ai.playground.data.ChatMessage;
import ai.spring.demo.ai.playground.data.ChatMessageEvent;
import ai.spring.demo.ai.playground.services.CustomerSupportAssistant;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import reactor.core.publisher.Flux;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class AssistantService {

    private final CustomerSupportAssistant agent;

    public AssistantService(CustomerSupportAssistant agent) {
        this.agent = agent;
    }

    public void chat(String chatId, ChatMessage message) {
        agent.chat(chatId, message);
    }

    public Flux<ChatMessageEvent> join() {
        return agent.join();
    }

    public Flux<List<ChatMessage>> suggestedReplies() {
        return agent.suggestedReplies();
    }
}
