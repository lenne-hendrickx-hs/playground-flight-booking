package ai.spring.demo.ai.playground.client;

import ai.spring.demo.ai.playground.services.CustomerSupportAssistant;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import reactor.core.publisher.Flux;

@BrowserCallable
@AnonymousAllowed
public class AssistantService {

    private final CustomerSupportAssistant agent;

    public AssistantService(CustomerSupportAssistant agent) {
        this.agent = agent;
    }

    public void chat(String chatId, String userMessage) {
        agent.chat(chatId, userMessage);
    }

    public Flux<String> join() {
        return agent.join();
    }
}
