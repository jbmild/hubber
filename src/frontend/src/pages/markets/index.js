//En algun lado (aca o en el component) tengo que importar el servicio
import { getPosiciones, tabla_ima } from "services/marketsService";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
    LinearProgress
  } from '@mui/material';

const Markets = () => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPosiciones = async () => {
      try {
        const posiciones = await getPosiciones();
        setOptions(posiciones);
      } catch (error) {
        console.error("Error fetching data from MongoDB", error);
      }
    };
    fetchPosiciones();
  }, []);


  const handleSelection = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    
    tabla_ima(selectedValue).then(res => {
        setLoading(false);
        setData(res);
        console.log(res);
    })
  };

  return (
    <div>
      <h2>Seleccione el producto</h2>
      <select onChange={handleSelection} value={selectedValue}>
        <option value="">Seleccione</option>
        {options.map((option) => (
          <option key={option._id} value={option.posicion}>
            {option.posicion}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} disabled={!selectedValue}>Buscar</button>

      <TableContainer
          sx={{
            flex: 1,
            overflowY: 'auto',
            maxHeight: 'calc(80vh - 12.5em)', // Ajuste basado en em para altura
            marginTop: '2em',
            '&::-webkit-scrollbar': {
              width: '0.5em',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '0.25em',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <Table>
            {
              loading ? <></> : 
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: { xs: '100%', sm: '20%' } }}>Pais</TableCell>
                  {!isSmallScreen && (
                    <>
                    <TableCell sx={{ width: '65%' }}>Indice de Mercado Atractivo</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
            }
            <TableBody>
            {
              loading ? 
                <TableRow key={'spinner'}>
                  <TableCell colSpan={12}>
                    <LinearProgress color="primary" />
                  </TableCell>
                </TableRow>  
              :              
                <>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ width: { xs: '100%', sm: '50%' } }}> <img src={row.bandera} alt="bandera" style={{"width":"30px"}}/> {row.pais}</TableCell>
                    {!isSmallScreen && (
                      <>
                        <TableCell>{Number(row.puntaje).toFixed(2)}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                </>
              }   
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default Markets;