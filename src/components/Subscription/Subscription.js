import React, { useEffect, useState } from 'react';
import './subscription.css'
import { 
  Table, 
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow 
} from '@material-ui/core';

function SubscriptionTable() {

  const[data, setData] = useState([]);



  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Fecha de Inicio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
  );
}

export default SubscriptionTable;