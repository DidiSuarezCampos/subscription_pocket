import React, { useEffect, useState }from 'react';

import './services.css'

import Cards from '../../components/Cards/Cards';
import Navbar from '../../components/NavBar/NavBar';


export const ThemeContext = React.createContext(null);

export const Services = () =>  {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //console.log('localStorage', localStorage.getItem('userID'))

    useEffect(() => {
      const fetchData = async () => {
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
    
        const url = `http://localhost:8080/1.0/kb/catalog`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: headers1,                  
          });

          const response1 = await fetch(url, {
            method: "GET",
            headers: headers2,
          });
          if (response.ok) {
            const jsonData = await response.json();
            const jsonData1 = await response1.json();
            // Combina los resultados de ambas peticiones 
            const combinedData = [...jsonData, ...jsonData1];
            console.log(combinedData);
            setData(combinedData);
            setIsLoading(false);              
          } else {
            console.error('Error al obtener los datos');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
      fetchData();
    },[]);
  
  return (
    <div className="Services">
      <Navbar/> 
      {isLoading ? (
        <p>Cargando...</p> 
      ) : (
        <Cards data={data}/>
      )}
    </div>
  );

};

/*

*/