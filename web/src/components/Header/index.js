import React from 'react';
import * as S from './styles';

import { Link } from 'react-router-dom';

function Header() {

  return (
    <S.Container>
        <S.LeftSide>
            <p> CUSTOMERS LIST </p>
        </S.LeftSide>
        <S.RightSide>
            <Link to="/">INÍCIO</Link>

            <span className="dividir"></span>
            
            <Link to="/">ADICIONAR CLIENTE</Link>

            <span className="dividir"></span>

            <Link to="/">SAIR</Link>

        </S.RightSide>
    </S.Container> 
  )
}

export default Header;
