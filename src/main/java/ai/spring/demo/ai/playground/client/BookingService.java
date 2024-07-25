package ai.spring.demo.ai.playground.client;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.util.List;

import ai.spring.demo.ai.playground.services.BookingTools.BookingDetails;
import ai.spring.demo.ai.playground.services.FlightBookingService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@BrowserCallable
@AnonymousAllowed
public class BookingService {
    private final FlightBookingService flightBookingService;

    public BookingService(FlightBookingService flightBookingService) {
        this.flightBookingService = flightBookingService;
    }

    public List<BookingDetails> getBookings() {
        return flightBookingService.getBookings();
    }

    public Flux<List<BookingDetails>> join() {
        return flightBookingService.join();
    }
}
