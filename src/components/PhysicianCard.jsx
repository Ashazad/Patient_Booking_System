// Reusable card for displaying a physician’s name, specialty, and location.

export default function PhysicianCard({ physician, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={isSelected ? "physician-card selected" : "physician-card"}
      onClick={onSelect}
    >
      <h3>{physician.name}</h3>
      <p>{physician.specialty}</p>
      <span>{physician.location}</span>
    </button>
  );
}
