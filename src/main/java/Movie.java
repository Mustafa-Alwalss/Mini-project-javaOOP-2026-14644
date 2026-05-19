// محمد مقداد بن قاسم عبده
public class Movie {

    // Fields
    String title;
    String[] genre;
    int duration;
    double rating;

    // Constructor
    public Movie(String title, String[] genre, int duration, int rating) {
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.rating = rating;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public String[] getGenre() {
        return genre;
    }

    public int getDuration() {
        return duration;
    }

    public double getRating() {
        return rating;
    }

    // Format duration
    public String getFormattedDuration() {
        int hours = duration / 60;
        int minutes = duration % 60;
        return hours + "h " + minutes + "m";
    }

    // toString
    @Override
    public String toString() {
        return "Title: " + title +
                " | Genre: " + genre +
                " | Duration: " + getFormattedDuration() +
                " | Rating: " + rating;
    }
}
