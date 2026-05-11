export default function AdminBookings({ bookings, onUpdateStatus }) {
  if (bookings.length === 0) {
    return <p className="muted">No bookings yet. Submitted appointments will appear here.</p>;
  }

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <article key={booking.id} className="booking-item">
          <div>
            <div className="booking-heading">
              <h3>{booking.patientName}</h3>
              <span className={`status ${booking.status}`}>{booking.status}</span>
            </div>

            <p>
              <strong>Physician:</strong> {booking.physicianName} — {booking.specialty}
            </p>
            <p>
              <strong>Time:</strong> {booking.appointmentTime}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Phone:</strong> {booking.phone}
            </p>
            <p className="reason">
              <strong>Reason:</strong> {booking.reason}
            </p>
          </div>

          <label className="status-select">
            Status
            <select
              value={booking.status}
              onChange={(event) => onUpdateStatus(booking.id, event.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </article>
      ))}
    </div>
  );
}
