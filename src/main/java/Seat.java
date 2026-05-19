//عبدالرحمن عبدالله بن محمد الغامدي
public abstract class Seat {
    private int seatNumber;
    private String row;
    private boolean isBooked;

    public Seat(int seatNumber, String row, boolean isBooked) {
        this.seatNumber = seatNumber;
        this.row = row;
        this.isBooked = isBooked;
    }

    abstract double getPrice();

    abstract String getType();

    public int getSeatNumber() {
        return seatNumber;
    }

    public String getRow() {
        return row;
    }

    public boolean isBooked() {
        return isBooked;
    }
}