import React, {useEffect, useState} from 'react';
import * as S from './styles';

import { Link } from 'react-router-dom';


import api from '../../services/api';
import isConnected from '../../utils/isConnected';


function Header({ clickNotification }) {

  const [lateCount, setLateCount] = useState();

  async function lateVerify(){
    await api.get(`/task/filter/late/${isConnected}`)
    .then(response => {
      
      setLateCount(response.data.length)

    }).catch(error => {

      console.error(error);

    });
  }

  useEffect( () => {
    lateVerify();
  });

  async function Logout(){
    localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  }

  return (
    <S.Container>
        <S.LeftSide>
            <p> CUSTOMERS LIST </p>
        </S.LeftSide>
        <S.RightSide>
            <Link to="/">INÍCIO</Link>

            <span className="dividir"></span>
            
            <Link to="/task">ADICIONAR CLIENTE</Link>

            <span className="dividir"></span>

            <input type="button" onClick={Logout} value="SAIR" />

        </S.RightSide>
    </S.Container> 
  )
}

export default Header;
