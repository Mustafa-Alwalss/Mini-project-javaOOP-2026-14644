//عبدالرحمن عبدالله بن محمد الغامدي
class VIPSeat extends Seat {

    public VIPSeat(int seatNumber, String row) {
        super(seatNumber, row, false);
    }

    @Override
    double getPrice() {
        return 80.0;
    }

    @Override
    String getType() {
        return "VIP";
    }
}

