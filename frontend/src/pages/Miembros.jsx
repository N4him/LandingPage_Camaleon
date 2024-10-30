import React, { useState } from "react";
import "../assets/styles/Miembros.css";

const TeamMembers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const members = [
    {
      name: "Santiago Gutierrez",
      role: "Product Owner",
      image: "/placeholder.jpg",
    },
    {
      name: "Esteban Hernadez",
      role: "Developer Scrum",
      image: "/placeholder.jpg",
    },
    {
      name: "Brayan Urrea",
      role: "Developer Scrum",
      image: "/placeholder.jpg",
    },
       {
      name: "Brayan Urrea",
      role: "Developer Scrum",
      image: "/placeholder.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(members.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(members.length / 3)) %
        Math.ceil(members.length / 3)
    );
  };

  const totalSlides = Math.ceil(members.length / 3); // Cambiar para calcular las páginas


  return (
    <section className="team-members">
      <h2>Our Members</h2>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {members.map((member, index) => (
            <div key={index} className="member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
        <button className="nav-button prev" onClick={prevSlide}>
          &lt;
        </button>
        <button className="nav-button next" onClick={nextSlide}>
          &gt;
        </button>
      </div>
      <div className="carousel-dots">
  {Array.from({ length: totalSlides }, (_, index) => ( // Modificar para crear dots según totalSlides
    <button
      key={index}
      className={`dot ${currentSlide === index ? "active" : ""}`}
      onClick={() => setCurrentSlide(index)}
    />
  ))}
</div>
    </section>
  );
};

export default TeamMembers;
