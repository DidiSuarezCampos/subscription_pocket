import React, { useState } from "react";
import Modal from 'react-modal';
import PropTypes from "prop-types";
import { FaTimes } from 'react-icons/fa';

import "././styles/card.css";

import { prototype } from "react-modal";

import { items } from "./data";
import { SelectedPlanDomicilio } from "./Selection/SelectedPlan/SelectedPlanDomicilio";
import { SelectedPlanNauta } from "./Selection/SelectedPlan/SelectedPlanNauta";

function Card({data, imageSource, name,datacomp}) {
  console.log("card",name)
  console.log("data",data)

  const matchingItem = items.find(item => item.id === name );
  console.log(matchingItem)
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    setClicked(false)
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        {matchingItem ? (
          <h1 className="card-title">{matchingItem.name}</h1>
        ) : (
          <h1 className="card-title">Undefined</h1>
        )}
        <p>{matchingItem.description}</p>
        <a
          onClick={handleOpenModal}
          target="_blank"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Suscribirse a {matchingItem.name}
        </a>
      </div>
    </div>

    <div className="modal">
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="custom-overlay"
    >
      <div className='custom-modal-content'>
        <div className="bottom-container">
          <FaTimes onClick={handleCloseModal} style={{ cursor: 'pointer' }} />
        </div>
          {matchingItem.id === 0 ? (
            <SelectedPlanNauta data={data} datacomp={datacomp[0]}/>
          ) : matchingItem.id ===1 ? (
            <SelectedPlanDomicilio data={data} datacomp={datacomp[1]}/>
          ) : (
            <p>Undefined</p>
          )}
          
      </div>
    </Modal>
    </div>
    </>
  );
}

Card.propTypes = {
  name: PropTypes.number.isRequired,
  imageSource: PropTypes.string,
};

export default Card;