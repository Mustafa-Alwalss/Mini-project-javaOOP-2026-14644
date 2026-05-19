//عبدالرحمن عبدالله بن محمد الغامدي
class StandardSeat extends Seat {

    public StandardSeat(int seatNumber, String row) {
        super(seatNumber, row, false);
    }

    @Override
    double getPrice() {
        return 50.0;
    }

    @Override
    String getType() {
        return "Standard";
    }
}