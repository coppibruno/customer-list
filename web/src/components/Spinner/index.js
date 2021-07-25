import React from 'react';
import * as S from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';


function Spinner() {
  return (
    <S.Spinner>
      <CircularProgress size={200} /> 
    </S.Spinner>
  )
}

export default Spinner;
