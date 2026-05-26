import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function RoomCard({ room }) {
  return (
    <Card className="room-card h-100 border-0 shadow-sm">
      <Card.Img
        variant="top"
        style={{
          height: "220px",
          objectFit: "cover",
        }}
        src={room.image}
      />

      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">{room.roomName}</h5>

          <span
            className={`badge ${
              room.status === "Available"
                ? "text-bg-success"
                : "text-bg-danger"
            }`}
          >
            {room.status}
          </span>
        </div>

        <p className="mb-1 text-secondary">{room.roomType}</p>
        <p className="mb-3 fw-semibold">Rs {room.price} / night</p>

        <Link
          to={`/room/${room.id}`}
          className="btn btn-primary w-100"
        >
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RoomCard;
