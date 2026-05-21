// محمد مقداد بن قاسم عبده
public class Movie {

    // Fields
    String title;
    String[] genre;
    double rating;
    String overview;
    int movieId;

    // Constructor
    public Movie(String title, String[] genre,double rating, String overview, int movieId) {
        this.title = title;
        this.genre = genre;
        this.rating = rating;
        this.overview = overview;
        this.movieId = movieId;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public String[] getGenre() {
        return genre;
    }


    public double getRating() {
        return rating;
    }



    public String getOverview() {
        return overview;
    }

    public int getMovieId() {
        return movieId;
    }


    // Convert genre array to text
    public String getGenresAsText() {

        String result = "";

        for (int i = 0; i < genre.length; i++) {

            result += genre[i];

            if (i < genre.length - 1) {
                result += ", ";
            }
        }

        return result;
    }

    // toString
    @Override
    public String toString() {

        return "Movie ID: " + movieId +
                " | Title: " + title +
                " | Genre: " + getGenresAsText() +
                " | Rating: " + rating +
                " | Overview: " + overview;
    }
}
