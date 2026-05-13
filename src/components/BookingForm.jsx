// Booking form for entering patient details and reason for visit.
// Shows the selected physician/time and submits the appointment request.

export default function BookingForm({
  formData,
  setFormData,
  selectedPhysician,
  selectedSlot,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="booking-form">
      <div className="summary-box">
        <strong>Selected appointment</strong>
        <p>
          {selectedPhysician
            ? `${selectedPhysician.name} — ${selectedPhysician.specialty}`
            : "No physician selected"}
        </p>
        <p>{selectedSlot || "No time selected"}</p>
      </div>

      <label>
        Full Name
        <input
          type="text"
          required
          placeholder="Enter patient name"
          value={formData.patientName}
          onChange={(event) =>
            setFormData({ ...formData, patientName: event.target.value })
          }
        />
      </label>

      <label>
        Email
        <input
          type="email"
          required
          placeholder="patient@example.com"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
      </label>

      <label>
        Phone
        <input
          type="tel"
          required
          placeholder="123-456-7890"
          value={formData.phone}
          onChange={(event) =>
            setFormData({ ...formData, phone: event.target.value })
          }
        />
      </label>

      <label>
        Reason for Visit
        <textarea
          required
          rows="4"
          placeholder="Briefly describe the reason for the appointment"
          value={formData.reason}
          onChange={(event) =>
            setFormData({ ...formData, reason: event.target.value })
          }
        />
      </label>

      <button type="submit" className="primary-button">
        Request Appointment
      </button>
    </form>
  );
}
