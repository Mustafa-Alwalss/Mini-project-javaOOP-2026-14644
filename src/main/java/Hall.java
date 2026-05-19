import java.util.ArrayList;

public class Hall {
    private int             hallNumber  ;
    private ArrayList<Seat> seats       ;

    public Hall(int hallNumber) {
        this.hallNumber = hallNumber        ;
        this.seats      = new ArrayList<>() ;
    }

//    ADD SEATS
    public void addSeat(Seat seat){
        seats.add(seat);
    }

//    GETTERS
    public int getHallNumber(){return this.hallNumber;}


}
