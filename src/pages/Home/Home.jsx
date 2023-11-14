import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/NavBar/NavBar';
import SubscriptionTable from '../../components/Subscription/Subscription';

export const Home = () => {
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [dataPlan, setDataPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('userNautaId', localStorage.getItem('userNautaID'));
  console.log('userDomicilioId', localStorage.getItem('userDomicilioID'))

  useEffect(() => {
    // Verifica si los estilos se han cargado
    const styleSheets = document.styleSheets;
    const allStylesLoaded = Array.from(styleSheets).every(sheet => sheet.cssRules.length > 0);

    if (allStylesLoaded) {
      setStylesLoaded(true);
    }

    const fetchData = async () =>{
      const headers1 = {
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Killbill-ApiKey": "tesisreact",
        "X-Killbill-ApiSecret": "tesisreact",
        "X-Killbill-CreatedBy": "subscription", 
      };

      const headers2 = {
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Killbill-ApiKey": "tesisdomicilio",
        "X-Killbill-ApiSecret": "tesisdomicilio",
        "X-Killbill-CreatedBy": "subscription", 
      };

      let accountID = localStorage.getItem('userNautaID')
      const url1 = "http://localhost:8080/1.0/kb/accounts/" + accountID+ "/bundles";
      //console.log(url1);

      let accountID1 = localStorage.getItem('userDomicilioID')
      const url2 = "http://localhost:8080/1.0/kb/accounts/" + accountID1+ "/bundles";
      //console.log(url2);

      const urlData = `http://localhost:8080/1.0/kb/catalog`;

      try {
        const response = await fetch(url1, {
          method: "GET",
          headers: headers1,                  
        });

        const response1 = await fetch(url2, {
          method: "GET",
          headers: headers2,
        });

        const responseData = await fetch(urlData, {
          method: "GET",
          headers: headers1,                  
        });

        const responseData1 = await fetch(urlData, {
          method: "GET",
          headers: headers2,
        });
        if (response.ok && response1.ok && responseData && responseData1) {
          const jsonData = await response.json();
          const jsonData1 = await response1.json();
          const jsonData2 = await responseData.json();
          const jsonData3 = await responseData1.json();
          console.log(jsonData3)
          const combinedData = [...jsonData, ...jsonData1];
          const combinedDataPlan = [...jsonData2, ...jsonData3];
          console.log('dataHome',combinedData);
          setData(combinedData);
          console.log('dataPlanHome',combinedDataPlan);
          setDataPlan(combinedDataPlan);
          setIsLoading(false);              
        } else {
          console.error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <Navbar />
      {isLoading ? (
        <p>Cargando...</p> 
      ) : (
        <div className='table-container'>
          <SubscriptionTable data={data} dataPlan={dataPlan}/>
        </div>
      )}
    </>
  );
};




