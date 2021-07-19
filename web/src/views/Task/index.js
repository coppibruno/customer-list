import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles';
import {format} from 'date-fns';
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

import typeIcons from '../../utils/typeIcons';

function Task({ match }) {
  
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();


  async function LoadTaskDetails(){
    await api.get(`/task/${match.params.id}`)
    .then( (response) => {
      setType(response.data.type);
      setDone(response.data.done);
      setTitle(response.data.tittle);
      setDescription(response.data.description);
      setDate( format( new Date(response.data.when), 'yyyy-MM-dd' ) );
      setHour( format( new Date(response.data.when), 'HH:mm') );
    });
  }

  async function save(){

    //Validação de dados
    if (!title)
      return alert("Você precisa informar o título");
    else if(!description)
      return alert("Você precisa informar a descrição");
    else if(!type)
      return alert("Você precisa informar o tipo");
    else if(!date)
      return alert("Você precisa informar a data");
    else if(!hour)
      return alert("Você precisa informar a hora");

    if(match.params.id){
        await api.put(`/task/${match.params.id}`, {
          macaddress: isConnected,
          done,
          type,
          tittle: title,
          description,
          when: `${date}T${hour}:00.000` 
      }).then( () =>
        setRedirect(true)
      )
    }else{

        await api.post('/task', {
          macaddress: isConnected,
          type,
          tittle: title,
          description,
          when: `${date}T${hour}:00.000` 
      }).then( () =>
        setRedirect(true)
      )

    }

  }

  async function Remove(){

    const res = window.confirm('Deseja excluir a tarefa?');

    if (res){
      await api.delete(`/task/${match.params.id}`)
      .then( () => setRedirect(true))
    }
  }

  //AO RECARREGAR A TELA OU O ESTADO FILTERACTIVED MUDAR CHAMA ESSE BLOCO
  useEffect(() => {
    if (!isConnected)
    setRedirect(true);

    LoadTaskDetails();

  }, []);

  return (
    <S.Container>
      { redirect && <Redirect to="/" /> } 

      <Header />

      <S.Form>

          <S.TypeIcons>
              {
                  typeIcons.map((icon, index) => (
                      
                    index > 0 && 
                      <button type="button" onClick={ () => setType(index)}>
                         <img src={icon} alt="Ícone" className={type && type != index && 'inative'}/>
                     </button>
                  ))
              }
          </S.TypeIcons>

          <S.Input>
            <span>Título</span>
            <input  type="text" placeholder="Título da tarefa..." 
              onChange={e => setTitle(e.target.value)} value={title}/> 
          </S.Input>

          <S.TextArea>
            <span>Descrição</span>
            <textarea 
            rows={5} placeholder="Detalhes da tarefa.." 
            onChange={e => setDescription(e.target.value)} value={description}
            ></textarea>
          </S.TextArea>

          <S.Input>
            <span>Data</span>
            <input type="date" placeholder="Data"
            onChange={e => setDate(e.target.value)} value={date}
            /> 
            <img src={iconCalendar} alt="Calendário" />
          </S.Input>

          <S.Input>
            <span>Hora</span>
            <input type="time" placeholder="Hora"
            onChange={e => setHour(e.target.value)} value={hour}/> 
            <img src={iconClock} alt="Relógio" />
          </S.Input>

          <S.Options>
            <div>
              <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
              <span>CONCLUÍDO</span>
            </div>
            { match.params.id && <button type="button" onClick={Remove}>EXCLUIR</button> }
          </S.Options>

          <S.Save>
            <button type="button" onClick={save}>SALVAR</button>
          </S.Save>

      </S.Form>

      <Footer/>
    </S.Container>
  )
}

export default Task;
