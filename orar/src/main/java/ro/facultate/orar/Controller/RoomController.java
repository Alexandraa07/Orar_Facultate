package ro.facultate.orar.Controller;
import ro.facultate.orar.Entity.Room;
import ro.facultate.orar.Service.ServiceRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")

public class RoomController {
    @Autowired
    private ServiceRoom serviceRoom;

    @PostMapping("/add")
    public Room addRoom(@RequestBody Room room) {
        return serviceRoom.addRoom(room);
    }

    @GetMapping("/all")
    public List<Room> getAllRooms() {
        return serviceRoom.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Integer id) {
        return serviceRoom.getRoomById(id);
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Integer id, @RequestBody Room room) {
        return serviceRoom.updateRoom(id, room);
    }
}
