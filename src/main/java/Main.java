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

        // 2. Add a handler — this is where React messages arrive in Java
        router.addHandler(new CefMessageRouterHandlerAdapter() {
            @Override
            public boolean onQuery(CefBrowser browser, CefFrame frame,
                                   long queryId, String request,
                                   boolean persistent, CefQueryCallback callback) {

                System.out.println("Received from React: " + request);

                // Send response back to React
                String response = "Java got: " + request.toUpperCase();
                callback.success(response);

                return true; // true means we handled it
            }
        }, false);

        client.addMessageRouter(router);

        // 3. Create browser and window
        CefBrowser browser = client.createBrowser(
                "http://localhost:5173/", false, false
        );

        Component browserUI = browser.getUIComponent();

        JFrame frame = new JFrame("My Desktop App");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(1200, 800);
        frame.add(browserUI, BorderLayout.CENTER);
        frame.setVisible(true);

        SwingUtilities.invokeLater(() -> {
            browserUI.requestFocusInWindow();
            browser.setFocus(true);
        });
    }
}