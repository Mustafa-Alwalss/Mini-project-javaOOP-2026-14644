
import me.friwi.jcefmaven.CefAppBuilder;
import me.friwi.jcefmaven.MavenCefAppHandlerAdapter;
import org.cef.CefApp;
import org.cef.CefClient;
import org.cef.browser.CefBrowser;

import javax.swing.*;
import java.awt.*;
import java.io.File;

public class Main {

    public static void main(String[] args) throws Exception {

        CefAppBuilder builder = new CefAppBuilder();
        builder.setInstallDir(new File("jcef-bundle"));
        builder.setAppHandler(new MavenCefAppHandlerAdapter() {});

        // This fixes mouse/keyboard input on Windows
        builder.getCefSettings().windowless_rendering_enabled = false;

        CefApp cefApp = builder.build();
        CefClient client = cefApp.createClient();
        CefBrowser browser = client.createBrowser(
                "http://localhost:5173/", false, false
        );

        Component browserUI = browser.getUIComponent();

        JFrame frame = new JFrame("Mini-project");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(1200, 800);
        frame.add(browserUI, BorderLayout.CENTER);
        frame.setVisible(true);

//         Give focus to the browser after window opens
        SwingUtilities.invokeLater(() -> {
            browserUI.requestFocusInWindow();
            browser.setFocus(true);
        });
    }
}