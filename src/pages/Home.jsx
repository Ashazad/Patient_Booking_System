// Home page that shows the main booking system landing screen.
// Lets users navigate to either the patient or physician view.

import { Link } from "react-router-dom";
import Header from "../components/Header";
import appointmentImg from "../assets/appointment.png";

export default function Home() {
  return (
    <div className="app">
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
            <Link to="/patient" style={{ textDecoration: "none" }}>
              <button type="button" className="primary-button">
                Patient
              </button>
            </Link>

            <Link to="/physician" style={{ textDecoration: "none" }}>
              <button type="button" className="primary-button">
                Physician
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}