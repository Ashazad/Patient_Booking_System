import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PhysicianCard from "../components/PhysicianCard";
import AppointmentSlotPicker from "../components/AppointmentSlotPicker";
import BookingForm from "../components/BookingForm";
import { physicians } from "../data/mockData";

const emptyForm = {
  patientName: "",
  email: "",
  phone: "",
  reason: "",
};

export default function Patient() {
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("patientBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem("patientBookings", JSON.stringify(bookings));
  }, [bookings]);

  const bookedSlotsForSelectedPhysician = selectedPhysician
    ? bookings
        .filter(
          (booking) =>
            booking.physicianId === selectedPhysician.id &&
            booking.status !== "cancelled"
        )
        .map((booking) => booking.appointmentTime)
    : [];

  const handleSelectPhysician = (physician) => {
    setSelectedPhysician(physician);
    setSelectedSlot("");
  };

  const handleBookAppointment = (event) => {
    event.preventDefault();

    if (!selectedPhysician || !selectedSlot) {
      alert("Please select a physician and appointment time.");
      return;
    }

    const isSlotAlreadyBooked = bookings.some(
      (booking) =>
        booking.physicianId === selectedPhysician.id &&
        booking.appointmentTime === selectedSlot &&
        booking.status !== "cancelled"
    );

    if (isSlotAlreadyBooked) {
      alert("This appointment time is already booked. Please choose another time.");
      return;
    }

    const newBooking = {
      id: crypto.randomUUID(),
      physicianId: selectedPhysician.id,
      physicianName: selectedPhysician.name,
      specialty: selectedPhysician.specialty,
      appointmentTime: selectedSlot,
      patientName: formData.patientName,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setBookings([newBooking, ...bookings]);
    setSelectedPhysician(null);
    setSelectedSlot("");
    setFormData(emptyForm);
    alert("Appointment requested successfully!");
  };

  return (
    <div className="app">
      <main className="layout">
        <div style={{ gridColumn: "1 / -1", marginBottom: "16px" }}>
          <Link to="/">
            <button type="button" className="primary-button">
              ← Back Home
            </button>
          </Link>
        </div>

        <section className="card">
          <div className="section-title">
            <span className="step">1</span>
            <h2>Choose a Physician</h2>
          </div>

          <div className="physician-grid">
            {physicians.map((physician) => (
              <PhysicianCard
                key={physician.id}
                physician={physician}
                isSelected={selectedPhysician?.id === physician.id}
                onSelect={() => handleSelectPhysician(physician)}
              />
            ))}
          </div>
        </section>

        <section className="card">
          <div className="section-title">
            <span className="step">2</span>
            <h2>Select an Appointment Time</h2>
          </div>

          <AppointmentSlotPicker
            selectedPhysician={selectedPhysician}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            bookedSlots={bookedSlotsForSelectedPhysician}
          />
        </section>

        <section className="card">
          <div className="section-title">
            <span className="step">3</span>
            <h2>Patient Details</h2>
          </div>

          <BookingForm
            formData={formData}
            setFormData={setFormData}
            selectedPhysician={selectedPhysician}
            selectedSlot={selectedSlot}
            onSubmit={handleBookAppointment}
          />
        </section>
      </main>
    </div>
  );
}
