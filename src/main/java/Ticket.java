//عبدالعزيز محمد حداد
abstract class Ticket {
    private String movieName;
    private double price;
    private Seat seat;
    private Hall hall;

    public Ticket(String movieName, double price, Seat seat, Hall hall) {
        this.movieName = movieName;
        this.price = price;
        this.seat = seat;
        this.hall = hall;
    }

    public abstract void printTicket();

    public String getMovieName() { return movieName; }
    public double getPrice()     { return price; }
    public Seat getSeat()        { return seat; }
    public Hall getHall()        {return hall; }

}
