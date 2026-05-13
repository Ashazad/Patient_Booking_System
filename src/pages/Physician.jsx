import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminBookings from "../components/AdminBookings";

export default function Physician() {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("patientBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem("patientBookings", JSON.stringify(bookings));
  }, [bookings]);

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
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
    </div>
  );
}