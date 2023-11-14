import React, { useState } from 'react';
import { 
    TextField, 
    Button, Grid
} from '@material-ui/core';
import {
    Visibility, 
    VisibilityOff 
} from '@material-ui/icons';
import{
    itemsDomicilio,
    itemsNauta
} from '../../Card/Selection/CardSelected/data'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { v4 as uuidv4 } from 'uuid';
//Styles
import { useStyles } from "../styles/ModalStyles";

function generateUUID() {
    return uuidv4();
}

function BodyContainer({state, selectedId, closeModal, data, dataPlan}){

   console.log('bodyDataPlan', dataPlan);
   console.log('bodyData', data);

    const styles = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState();
    const [showData, setShowData] = useState(false);
    //const[catalogo, setCatalogo] = useState('');
    const[changeSubscription, setChangeSubscription] = useState({});
    

    const handleMenuItemClick = (plan) => {
        setSelectedPlan(plan);
        setAnchorEl(null);
    };

    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
        
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleCloseModal = () => {
        closeModal();
    };

    const handlePlanChange = async () => {
        console.log(selectedPlan)
        console.log(selectedId)

        for(const index of data ){
            for(const item of index.products){
                if(item.name === selectedPlan){
                    //console.log(item);
                    setChangeSubscription(item)
                    console.log(changeSubscription)
                }
            }
        }
        

        let cadena = changeSubscription.plans[0].name;
        console.log(cadena)
        const primerFragmento = obtenerPrimerFragmento(cadena);
        console.log( primerFragmento )

        const url = "http://localhost:8080/1.0/kb/subscriptions/" + selectedId;
        console.log(url);

        const bundleId = generateUUID();
        const subscriptionId = generateUUID();

        const fecha = new Date();
        const fechaFormateada = fecha.toISOString();

        let chargeThroughDate = new Date();
            chargeThroughDate.setMonth(fecha.getMonth() + 1);
            const formattedDate = chargeThroughDate.toISOString().split('T')[0];
            console.log(formattedDate);

        if(primerFragmento === 'nauta'){
            const headers1 = {
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Killbill-ApiKey": "tesisreact",
                "X-Killbill-ApiSecret": "tesisreact",
                "X-Killbill-CreatedBy": "subscription", 
            };

            const requestData = { 
                accountId: localStorage.getItem('userNautaID'),
                bundleId: bundleId,
                bundleExternalKey: bundleId,
                subscriptionId: subscriptionId,
                startDate: fechaFormateada,
                productName: changeSubscription.name,
                productCategory: changeSubscription.type ,
                billingPeriod: changeSubscription.plans[0].billingPeriod,
                planName: changeSubscription.plans[0].name,
                state: "ACTIVE",
                sourceType: "NATIVE",
                
                quantity: 1,
            }

            console.log('requestData',requestData)
            const jsonData = JSON.stringify(requestData);
            console.log(jsonData)

            try{
                const response = await fetch(url, {
                method: "PUT",
                headers: headers1,
                body: jsonData,
                });
                if (response.ok) {
                    console.log("Change subscription succes", response.body);
                } else {
                    console.error("Failed to change subscription.");
                }
            }catch (error){
                console.error("An error ocurred:", error)
            }

            handleCloseModal();

          }if(primerFragmento === 'domicilio'){

            const headers = {
                "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=",
                "Content-Type": "application/json",
                "X-Killbill-ApiKey": "tesisdomicilio",
                "X-Killbill-ApiSecret": "tesisdomicilio",
                "X-Killbill-CreatedBy": "subscription"
            };

            const requestData = { 
                accountId: localStorage.getItem('userNautaID'),
                bundleId: bundleId,
                bundleExternalKey: bundleId,
                subscriptionId: subscriptionId,
                startDate: fechaFormateada,
                productName: changeSubscription.name,
                productCategory: changeSubscription.type ,
                billingPeriod: changeSubscription.plans[0].billingPeriod,
                planName: changeSubscription.plans[0].name,
                state: "ACTIVE",
                sourceType: "NATIVE",
                
                quantity: 1,
            }

            console.log('requestData',requestData)
            const jsonData = JSON.stringify(requestData);
            console.log(jsonData)

            try{
                const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: jsonData,
                });
                if (response.ok) {
                    console.log("Change subscription succes", response.body);
                } else {
                    console.error("Failed to change subscription.");
                }
            }catch (error){
                console.error("An error ocurred:", error)
            }

            handleCloseModal();

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

    
    

    return(
        <div className={styles.modal}>
            <h3>Cambiar Subscripción</h3>
            <br/>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                    <TextField
                        className={styles.inputMaterial}
                        label="Plan"
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                    />
                </Grid>
                <Grid item style={{ marginTop: '19px' }}>
                    <Button
                        variant="outlined"
                        onClick={handleButtonClick}
                    >
                        {showData ? <VisibilityOff /> : <Visibility />}
                    </Button>
                </Grid>
            </Grid>

            <br/>

            <div 
                style={{ textAlign: 'right' }}
            >
                <Button 
                    color="primary"
                    onClick={handlePlanChange}
                >
                    Cambiar
                </Button>
                <Button 
                    onClick={handleCloseModal}
                >
                    Cancelar
                </Button>
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {dataPlan.map((item) => (
                    <MenuItem 
                        onClick={() => handleMenuItemClick(item.name)}
                        key={item.name}
                    >
                        {item.name}
                    </MenuItem>
                ))}             
            </Menu>
        </div>
    )
}

export default BodyContainer;