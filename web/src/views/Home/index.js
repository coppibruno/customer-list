import React, { useState, useEffect } from 'react';
import * as S from './styles';

import api from '../../services/api';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';


import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Alert from '@material-ui/lab/Alert';
import Toast from '../../components/Toast'

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from 'moment';

function Home() {

  const [filterName, setFilterName] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataColumns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'value', headerName: 'Valor', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = params.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return valueFormatted;
      } 
    },
    { field: 'since', headerName: 'Desde', type: 'date', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = moment(params.value).format('DD/MM/YYYY')
        return valueFormatted;
      } 
    } 
  ];
  async function getCustomers(filter){
    let last_endpoint = '';
    
    if (filter){

      if (!filterName){
        Toast({
          type: 'info',
          title: 'É necessário preencher um valor no campo de busca'
        })
        return false;
      }

       last_endpoint = `filter/${filterName}`;
    }
    
    await api.get(`/customers/${last_endpoint}`)
    .then(response => {
        
        setColumns(dataColumns);

        const result = response.data;
        var customerList = result.map(function (customer) {
          customer.id = parseInt(customer.id);
          return customer;
        });
        
        setRows(customerList);

        setLoading(false);
      
    }).catch(error => {
      const msg = !!error.response.data.msg ? error.response.data.msg : 'Ocorreu um erro na busca de clientes :(';
      Toast({
        type: 'error',
        title: msg
      })
      

    });

  }

  useEffect(() => {
    getCustomers(false);
  }, []);

  return (
    <S.Container>
      <Header />

      {loading &&
        <Spinner />
      }

      <S.FilterArea>
        <TextField onChange={e => setFilterName(e.target.value)} id="standard-basic" label="Busque pelo nome" />
        <Button onClick={() => getCustomers(true)} variant="contained" color="primary">
          OK
        </Button>
        <Button onClick={() => getCustomers(false)} variant="contained" >
          <RotateLeftIcon />
        </Button>
      </S.FilterArea>

      <S.Title>
        <h3>CLIENTES INADIMPLENTES</h3>
      </S.Title>

      {loading && 
        <p style={{textAlign: 'center'}}>Buscando clientes da base de dados. Por favor, aguarde :)</p>
      }
      
      { rows.length > 0 && columns.length > 0 && 
      <S.ContainerCustomers>
        <div style={{ height: 600, width: 650 }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick={true} />
        </div>
      </S.ContainerCustomers>
      }
      

      <Footer/>
    </S.Container>
  )
}

export default Home;
