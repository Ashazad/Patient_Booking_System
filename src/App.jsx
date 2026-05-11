import { useEffect, useState } from "react";
import Header from "./components/Header";
import PhysicianCard from "./components/PhysicianCard";
import AppointmentSlotPicker from "./components/AppointmentSlotPicker";
import BookingForm from "./components/BookingForm";
import AdminBookings from "./components/AdminBookings";
import { physicians } from "./data/mockData";
import appointmentImg from "./assets/appointment.png";

const emptyForm = {
  patientName: "",
  email: "",
  phone: "",
  reason: "",
};

function App() {
  const [role, setRole] = useState("");
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
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div className="app">

      {!role && (
  <>
    <div className="header-card">
      <Header />
    </div>

    <main className="role-page">
      <section className="card role-card">
        <div className="section-title">
          <h2>Choose Your View</h2>
        </div>

        <img
          src={appointmentImg}
          alt="Appointment"
          className="role-image"
        />

        <div className="role-buttons">
          <button
            type="button"
            className="primary-button"
            onClick={() => setRole("patient")}
          >
            Patient
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() => setRole("physician")}
          >
            Physician
          </button>
        </div>
      </section>
    </main>
  </>
)}

      {role === "patient" && (
        <main className="layout">
          <button type="button" onClick={() => setRole("")}>
            Back
          </button>

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
      )}

      {role === "physician" && (
        <main className="layout">
          <button type="button" onClick={() => setRole("")}>
            Back
          </button>

          <section className="card admin-card">
            <div className="section-title">
              <span className="step">1</span>
              <h2>Physician/Admin View</h2>
            </div>

            <AdminBookings
              bookings={bookings}
              onUpdateStatus={updateBookingStatus}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;