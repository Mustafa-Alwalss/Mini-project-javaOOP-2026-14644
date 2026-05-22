import com.google.gson.Gson;
import com.sun.net.httpserver.HttpServer;
import me.friwi.jcefmaven.CefAppBuilder;
import me.friwi.jcefmaven.MavenCefAppHandlerAdapter;
import org.cef.CefApp;
import org.cef.CefClient;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.browser.CefMessageRouter;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefMessageRouterHandlerAdapter;

import javax.swing.*;
import java.awt.*;
import java.io.File;

import java.io.InputStream;
import java.net.InetSocketAddress;
import java.time.LocalDate;
import java.util.Random;

public class Main {

    public static void main(String[] args) throws Exception {

        CefAppBuilder builder = new CefAppBuilder();
        builder.setInstallDir(new File("jcef-bundle"));
        builder.setAppHandler(new MavenCefAppHandlerAdapter() {});
        builder.getCefSettings().windowless_rendering_enabled = false;

        CefApp cefApp = builder.build();
        CefClient client = cefApp.createClient();

        // 1. Create the message router
        CefMessageRouter.CefMessageRouterConfig config = new CefMessageRouter.CefMessageRouterConfig();
        config.jsQueryFunction = "cefQuery";       // React calls window.cefQuery(...)
        config.jsCancelFunction = "cefQueryCancel"; // React calls window.cefQueryCancel(...)
        CefMessageRouter router = CefMessageRouter.create(config);

        client.addMessageRouter(router);



        // 3. Starting and Creating browser and window
        startServer(5173);
        CefBrowser browser = client.createBrowser(
                "http://localhost:5173/", false, false
        );


        Component browserUI = browser.getUIComponent();

        JFrame frame = new JFrame("Movie swamp");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(1400, 1000);
        frame.add(browserUI, BorderLayout.CENTER);
        frame.setVisible(true);

        SwingUtilities.invokeLater(() -> {
            browserUI.requestFocusInWindow();
            browser.setFocus(true);
        });

        router.addHandler(new CefMessageRouterHandlerAdapter() {
            @Override
            public boolean onQuery(CefBrowser browser, CefFrame frame,
                                   long queryId, String request,
                                   boolean persistent, CefQueryCallback callback) {

                System.out.println("Received from React: " + request );
                Gson gson = new Gson();
                BookingInfo bookingInfo = gson.fromJson(request, BookingInfo.class);
                applyBookinkInfo(bookingInfo);
                callback.success("success");

                return true; // true means we handled it
            }
        }, false);
    }


    public static void applyBookinkInfo( BookingInfo bookingInfo) {
//        MOVIE.
        Movie movie =  new Movie(
                bookingInfo.movie.title,
                bookingInfo.movie.genre,
                bookingInfo.movie.rating,
                bookingInfo.movie.overview,
                bookingInfo.movie.movieId
        );
        System.out.printf("--- MOVIE --- \n %s\n" , movie);
//        HALL.
        Random rnd  = new Random();
        Hall hall = new Hall(rnd.nextInt(10));

//        TICKETS.
        if (bookingInfo.booking.isItVIP) {
            VIPSeat VIP_seat    = new VIPSeat(bookingInfo.booking.seatNumber, bookingInfo.booking.seatRow);
            VIPTicket VIP_Ticket  = new VIPTicket(bookingInfo.movie.title, bookingInfo.booking.price, VIP_seat,hall );
            VIP_Ticket.printTicket();
        }else {
           StandardSeat seat    = new StandardSeat(bookingInfo.booking.seatNumber, bookingInfo.booking.seatRow);
           NormalTicket Ticket  = new NormalTicket(bookingInfo.movie.title, bookingInfo.booking.price, seat, hall);
           Ticket.printTicket();
        }
//        SHOWTIME.
        Showtime showtime = new Showtime( rnd.nextInt(100) ,movie, hall, LocalDate.now().toString(), bookingInfo.booking.time );
        System.out.printf("--- SHOWTIME ---\n %s\n" , showtime);

    }

//    SERVER
    public static void startServer(int port) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.createContext("/", exchange -> {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/")) path = "/index.html";

            InputStream file = Main.class.getResourceAsStream("/ui" + path);
            if (file == null) file = Main.class.getResourceAsStream("/ui/index.html");

            // Detect content type
            String contentType = "text/plain";
            if (path.endsWith(".html")) contentType = "text/html";
            if (path.endsWith(".js"))   contentType = "application/javascript";
            if (path.endsWith(".css"))  contentType = "text/css";
            if (path.endsWith(".png"))  contentType = "image/png";
            if (path.endsWith(".jpg"))  contentType = "image/jpeg";
            if (path.endsWith(".svg"))  contentType = "image/svg+xml";
            if (path.endsWith(".ico"))  contentType = "image/x-icon";
            if (path.endsWith(".json")) contentType = "application/json";

            byte[] bytes = file.readAllBytes();
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes);
            exchange.getResponseBody().close();
        });

        server.start();
        System.out.println("Server started at http://localhost:" + port);
    }
}