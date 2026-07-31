package ro.facultate.orar.Service;
import ro.facultate.orar.Entity.Room;
import ro.facultate.orar.Repository.RepoRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceRoom {
    @Autowired
    private RepoRoom repoRoom;

    public Room addRoom(Room room) {
        return repoRoom.save(room);
    }

    public List<Room> getAllRooms() {
        return repoRoom.findAll();
    }

    public Room getRoomById(Integer id) {
        return repoRoom.findById(id)
                .orElseThrow(() -> new RuntimeException("Room inexistent cu id-ul: " + id));
    }

    public Room updateRoom(Integer id, Room roomNou) {
        Room room = repoRoom.findById(id)
                .orElseThrow(() -> new RuntimeException("Room inexistent cu id-ul: " + id));

        room.setName(roomNou.getName());
        room.setBuilding(roomNou.getBuilding());
        room.setFloor(roomNou.getFloor());
        room.setSeatCount(roomNou.getSeatCount());
        room.setRoomType(roomNou.getRoomType());

        return repoRoom.save(room);
    }
}
