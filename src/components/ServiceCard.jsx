// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service, selected, onClick }) => {
  return (
    <div 
      className={`service-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{service.name}</h3>
      <p className="service-description">{service.description}</p>
      <div className="service-details">
        <p>Harga: <span>Rp {service.pricePerKg.toLocaleString('id-ID')}/kg</span></p>
        <p>Min. berat: <span>{service.minWeight} kg</span></p>
        {service.timeRestriction && (
          <p>Jam: <span>{service.timeRestriction.start} - {service.timeRestriction.end}</span></p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;