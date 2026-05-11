export default function AppointmentSlotPicker({
  selectedPhysician,
  selectedSlot,
  onSelectSlot,
  bookedSlots,
}) {
  if (!selectedPhysician) {
    return <p className="muted">Select a physician to see available appointment times.</p>;
  }

  return (
    <div className="slot-grid">
      {selectedPhysician.availableSlots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);

        return (
          <button
            key={slot}
            type="button"
            disabled={isBooked}
            className={selectedSlot === slot ? "slot selected" : "slot"}
            onClick={() => onSelectSlot(slot)}
          >
            {slot}
            {isBooked && <span className="slot-note">Already booked</span>}
          </button>
        );
      })}
    </div>
  );
}
