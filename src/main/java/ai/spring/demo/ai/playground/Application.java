package ai.spring.demo.ai.playground;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.reader.TextReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.client.RestClientCustomizer;
import org.springframework.boot.web.reactive.function.client.WebClientCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;

@SpringBootApplication
@Theme(value = "customer-support-agent")
public class Application implements AppShellConfigurator {

	private static final Logger logger = LoggerFactory.getLogger(Application.class);

	public static void main(String[] args) {
		new SpringApplicationBuilder(Application.class).run(args);
	}

	// In the real world, ingesting documents would often happen separately, on a CI
	// server or similar.
	@Bean
	CommandLineRunner ingestTermOfServiceToVectorStore(
			VectorStore vectorStore,
			@Value("classpath:rag/terms-of-service.txt") Resource termsOfServiceDocs) {

		return args -> {
			// Ingest the document into the vector store
			var textReader = new TextReader(termsOfServiceDocs);
			textReader.getCustomMetadata().put("organizationId", "123");
			var documents = textReader.read();
			var transform = new TokenTextSplitter().transform(documents);
			vectorStore.write(transform);

			vectorStore.similaritySearch("Cancelling Bookings")
					.forEach(doc -> logger.info("Similar Document: {}", doc.getContent()));
		};
	}

	@Bean
	public ChatMemory chatMemory() {
		return new InMemoryChatMemory();
	}

	@Bean
	RestClientCustomizer restClientCustomizer() {
		return restClientBuilder -> restClientBuilder.defaultHeader("identity-name", "hackathon");
    }

	@Bean
	WebClientCustomizer webClientCustomizer() {
		return webClientBuilder -> webClientBuilder.defaultHeader("identity-name", "hackathon");
	}

}
