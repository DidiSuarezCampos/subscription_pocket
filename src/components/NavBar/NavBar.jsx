import React, { useState } from 'react'
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
//Components
import BurguerButton from './BurguerButton/BurguerButton';
import { PaymentMethodForm } from './Forms/PaymentMethodForm/PymentMethodForm';
//Styles
import { NavContainer } from './styles/NavbarContainer'
import { BgDiv } from './styles/BgDiv'
import './styles/Modal.css'


function Navbar() {

  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleClick = () => {setClicked(!clicked)};
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    setClicked(false)
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavContainer>
        <h2>subs
            <span>Pocket</span>
        </h2>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <a onClick={handleClick} href="/home">Inicio</a>
          <a onClick={handleClick} href="/services">
            Servicios
          </a>
          <a onClick={handleOpenModal} href="#paymentMethod">
            Método de Pago
          </a>
          
          <a onClick={handleClick} href="https://drive.google.com/drive/folders/15_W4qHR2VUwL2nLJfei7417aYwtX29kB?usp=sharing">Manual de Usiario</a>
            <a onClick={handleClick} href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path 
                        fill-rule="evenodd" 
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path 
                        fill-rule="evenodd" 
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                </svg>
                Log Out
            </a>
        </div>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
      </NavContainer>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="custom-overlay"
        
      >
        <div className='custom-modal-content'>
        <div className="bottom-container">
            <FaTimes onClick={handleCloseModal} style={{ cursor: 'pointer' }} />
        </div>
        
            <PaymentMethodForm/>
    
        </div>
      </Modal>
    </>
  )
}

export default Navbar