import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow, 
  Modal  
} from '@material-ui/core';
import { 
  
  Button, 
  
} from '@material-ui/core';
import {
  Edit,
  Delete
}from '@material-ui/icons';
//Styles
import './styles/subscription.css';
import { stylesTable } from './styles/ModalStyles';
//Components
import BodyContainer from './BodyContainer/BodyContainer';

function SubscriptionTable({data, dataPlan}) {
  console.log('dataSubs', data)
  console.log('dataPlanSubs', dataPlan)

  const [selectedId, setSelectedId] = useState(null);

  const productsArray = []

  for(const item of dataPlan){
    
    productsArray.push(...item.products);
   
  }

  console.log(productsArray)

  const classes = stylesTable();
  
  const[modalState,setModalState] = useState(false);
  /*const[consoleSelect,setConsoleSelect] = useState({
    selection:''
  });*/

  const openCloseModal = (id) => {
    setModalState(!modalState);
    setSelectedId(id)
    console.log(selectedId)
  };
  
  const cancelSubscription = async (item) => {
    console.log(item)

    let cadena = item.subscriptions[0].planName;
    console.log(cadena)
    const primerFragmento = obtenerPrimerFragmento(cadena);
    console.log( primerFragmento )

    if(primerFragmento === 'nauta'){
    const headers1 = {
      "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Killbill-ApiKey": "tesisreact",
      "X-Killbill-ApiSecret": "tesisreact",
      "X-Killbill-CreatedBy": "subscription", 
    };

    let url = "http://localhost:8080/1.0/kb/bundles/" + item.bundleId + "/pause";
    console.log(url)

    try{
      const response = await fetch(url, {
      method: "PUT",
      headers: headers1,
      });
      if (response.ok) {
          console.log("Change subscription succes", response.body);
      } else {
          console.error("Failed to change subscription.");
      }
    }catch (error){
      console.error("An error ocurred:", error)
    }
    }if(primerFragmento === 'domicilio'){

      const headers = {
          "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
          "Content-Type": "application/json",
          "X-Killbill-ApiKey": "tesisdomicilio",
          "X-Killbill-ApiSecret": "tesisdomicilio",
          "X-Killbill-CreatedBy": "subscription"
      };

      let url = "http://localhost:8080/1.0/kb/bundles/" + item.bundleId + "/pause";
    console.log(url)

    try{
      const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      });
          if (response.ok) {
              console.log("Change subscription succes", response.body);
          } else {
              console.error("Failed to change subscription.");
          }
      }catch (error){
          console.error("An error ocurred:", error)
      }

    }else {
      console.error('No hay datos en la posición index');
    }


  }

  const obtenerPrimerFragmento = (cadena) => {
    const indiceGuionBajo = cadena.indexOf('_');
  
    if (indiceGuionBajo !== -1) {
      return cadena.substring(0, indiceGuionBajo);
    }
  
    // Si no se encuentra un guion bajo, devolver la cadena original
    return cadena;
  };

  /*const handleChange = e => {
    const { value } = e.target;
    setConsoleSelect(prevState =>({
      ...prevState,
      [selection]: value
    }))
  };*/

  return (
    <div>
      <h3>Suscripciones activas</h3>
      <TableContainer>
        <Table className={classes.tableMaterial}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Fecha de Carga</TableCell>
              <TableCell align='rigth'>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              item.subscriptions[0].state === 'ACTIVE' ? (
              <TableRow key={item.subscriptions[0].subscriptionId}>
                <TableCell>
                  {item.subscriptions.map((items) => (
                    items.subscriptionId
                  ))}
                </TableCell>
                <TableCell>
                  {item.subscriptions.map((items) => (
                    items.productCategory
                  ))}
                </TableCell>
                <TableCell>
                  {item.subscriptions.map((items) => (
                    items.productName
                  ))}
                </TableCell>
                <TableCell>
                  {item.subscriptions.map((items) => (
                    items.phaseType
                  ))}
                </TableCell>
                <TableCell>
                  {item.subscriptions.map((items) => (
                    items.startDate.split('T')[0]
                  ))}
                </TableCell>
                <TableCell>
                  {item.subscriptions.map((items) => (
                    items.chargedThroughDate
                  ))}
                </TableCell>
                <TableCell>
                  <Edit onClick={() => openCloseModal(item.subscriptions[0].subscriptionId)}/>
                    &nbsp;&nbsp;
                  <Delete onClick={() => cancelSubscription(item)}/>
                </TableCell>
              </TableRow>
            ) : null
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalState}
        onClose={openCloseModal}
      >
        <BodyContainer 
          state={modalState} 
          closeModal={openCloseModal}
          data={dataPlan}
          dataPlan={productsArray}
          selectedId={selectedId}
        />
        
      </Modal>
    </div>
  );
}

export default SubscriptionTable;