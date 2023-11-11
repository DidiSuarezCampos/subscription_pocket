import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/NavBar/NavBar';
import SubscriptionTable from '../../components/Subscription/Subscription';

export const Home = () => {
  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    // Verifica si los estilos se han cargado
    const styleSheets = document.styleSheets;
    const allStylesLoaded = Array.from(styleSheets).every(sheet => sheet.cssRules.length > 0);

    if (allStylesLoaded) {
      setStylesLoaded(true);
    }
  }, []);

  console.log('localStorage', localStorage.getItem('userID'),localStorage.getItem('userPass'))

  return (
    <>
      <Navbar />
      {stylesLoaded ? (
        <div className='table-container'>
          <SubscriptionTable />
        </div>
      ) : (
        // Muestra un indicador de carga o mensaje mientras se cargan los estilos
        <p>Cargando estilos...</p>
      )}
    </>
  );
};




