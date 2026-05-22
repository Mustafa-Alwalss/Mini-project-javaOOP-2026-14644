public class Showtime {
    private int     showtimeId  ;
    private Movie   movie       ;
    private Hall    hall        ;
    private String  date        ;
    private String  time        ;

    public Showtime(int showtimeId, Movie movie, Hall hall, String date, String time) {
        this.showtimeId = showtimeId;
        this.movie      = movie     ;
        this.hall       = hall      ;
        this.date       = date      ;
        this.time       = time      ;
    }

//    GETTERS
    public int getShowtimeId()  { return showtimeId; }
    public Movie getMovie()     { return movie; }
    public Hall getHall()       { return hall; }
    public String getDate()     { return date; }
    public String getTime()     { return time; }


    @Override
    public String toString() {
        return  "Showtime ID: " + showtimeId        +
                " | Movie: "    + movie.getTitle()  +
                " | Date: "     + date              +
                " | Time: "     + time              ;
    }
}
