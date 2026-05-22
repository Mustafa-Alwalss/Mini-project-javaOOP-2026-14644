//عبدالعزيز محمد حداد
class VIPTicket extends Ticket {
    public VIPTicket(String movieName, double price, Seat seat , Hall hall) {
        super(movieName, price, seat, hall);
    }

    @Override
    public void printTicket() {
        System.out.println("================================");
        System.out.println("       ⭐ VIP MOVIE TICKET ⭐    ");
        System.out.println("================================");
        System.out.println("Movie : " + getMovieName());
        System.out.println("Hall  : " + getHall().getHallNumber());
        System.out.println("Seat  : " + getSeat().getRow() + getSeat().getSeatNumber());
        System.out.println("Type  : VIP");
        System.out.println("Price : " + getPrice() + " SAR");
        System.out.println("================================");
    }
}