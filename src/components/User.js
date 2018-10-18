import React from 'react';
import './App.css';
import {getUserData} from '../actions/actions.js';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class User extends React.Component {
  componentDidUpdate=()=>{
    if (this.props.state.allState.userVerify.auth===false) {  //Если пользователь
      this.props.history.push("/SignIn")                      // не аторизован
    }                                                         // то редирект на
  }                                                           // авторизацию
  componentDidMount=()=>{
    if (this.props.state.allState.userVerify.auth===false) {  // не аторизован
      this.props.history.push("/SignIn")                      // то редирект на
    }
    else{                                                    // авторизацию
      // Подготовка данных с формы на сревер
      var data = new FormData();
        var forGet={"getData":true,
        "email":this.props.state.allState.userVerify.verifyLogin,
        "token":this.props.state.allState.userVerify.verifyToken}
        data.append('form', JSON.stringify(forGet));
      // Подготовка данных с формы на сревер

        fetch("https://someweathenews.000webhostapp.com/server/getData.php", { // Запрос на сервер с последущей обработкой ответа
          method: 'POST',
          body: data
        }).then(response => response.json())
        .then(json =>{
              this.props.getUserData(json);
        })
        .catch((err) => {
          console.log('Fetch Error :-S', err); // Перехват ошыбок с сревера
        });
    }
  }
  render() {
    //  Подготавка личных данных пользователя на отображение
    let nameAndLastName,email,dateOfBirth,gender,city,phoneNumber,aboutSelf;
      if (this.props.state.allState.userData!==null) {
        nameAndLastName =this.props.state.allState.userData.name+" "+this.props.state.allState.userData.last_name;
        email =this.props.state.allState.userData.user;
        dateOfBirth =this.props.state.allState.userData.date_of_birth;
        gender =this.props.state.allState.userData.gender;
        city =this.props.state.allState.userData.city;
        phoneNumber =this.props.state.allState.userData.phone_number;
        aboutSelf =this.props.state.allState.userData.about_self;
      }
    //  Подготавка личных данных пользователя на отображение

    return (<div className="User">
      <Paper className="User__paper">
        <Typography variant="headline" gutterBottom>
          Личные данные
        </Typography>
          {this.props.state.allState.userData === null?(// Показать прелодер
          <CircularProgress size={50} />                // пока данные не
        ):(                                             // пришли с сревера
            <div className="userData">
              <div className="myRow">
              <div className="myTitel">Имя и Фамилия:</div><div className="myValue">{nameAndLastName}</div>
              </div>
              <div className="myRow">
              <div className="myTitel">Почта:</div><div className="myValue">{email}</div>
              </div>
              <div className="myRow">
              <div className="myTitel">Дата рождения:</div><div className="myValue">{dateOfBirth}</div>
              </div>
              <div className="myRow">
              <div className="myTitel">Пол:</div><div className="myValue">{gender}</div>
              </div>
              <div className="myRow">
              <div className="myTitel">Город:</div><div className="myValue">{city}</div>
              </div>
              <div className="myRow">
              <div className="myTitel">Телефон:</div><div className="myValue">{phoneNumber}</div>
              </div>
              <div className="myRow">
              <div className="myTitel">О себе:</div><div className="myValue">{aboutSelf}</div>
              </div>
            </div>
          )}
      </Paper>
    </div>);
  }
}
export default connect(state => ({state: state}), {getUserData})(User);
