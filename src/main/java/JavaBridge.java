import org.cef.browser.CefBrowser;

public class JavaBridge {

    private final CefBrowser browser;

    public JavaBridge(CefBrowser browser) {
        this.browser = browser;
    }

    // React calls this: window.javaApp.receiveFromReact("hello")
    public void receiveFromReact(String message) {
        System.out.println("Received from React: " + message);

        // Process the message and send something back
        String response = "Java got your message: " + message.toUpperCase();

        // Call back into React
        sendToReact(response);
    }

    // Pushes data into React by executing JavaScript
    private void sendToReact(String message) {
        String js = "window.receiveFromJava('" + message + "')";
        browser.executeJavaScript(js, browser.getURL(), 0);
    }
}