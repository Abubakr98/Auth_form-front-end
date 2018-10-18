import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {getUserData,verifyUser} from '../actions/actions.js';
import Typography from '@material-ui/core/Typography';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_2: '',
      name: '',
      lastName: '',
      phoneNumber: '',
      dateOfBirth: '',
      city: 'Киев',
      aboutSelf: '',
      gender:'',
      do_signup: true
    };
  }

  // Обработка инпутов
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handlePassword_2Change = (e) => {
    this.setState({password_2: e.target.value});
  }
  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }
  handleLastNameChange = (e) => {
    this.setState({lastName: e.target.value});
  }
  handleDateOfBirth = (e) => {
    this.setState({dateOfBirth: e.target.value});
  }
  handleCity = (e) => {
    this.setState({city: e.target.value});
  }
  handleAboutSelf= (e) => {
    this.setState({aboutSelf: e.target.value});
  }
  handlePhoneNumber = (e) => {
    var checkingRegExp = /^\d{1,9}$/;
    var myPhone = +e.target.value;
    var valid = checkingRegExp.test(myPhone);
  if (valid) {
    this.setState({phoneNumber: e.target.value});
  }
  }
  handleGender= (e) => {
    this.setState({gender: e.target.value});
  } // Обработка инпутов

  handleSubmit = (e) => {
    e.preventDefault();
        var checkingRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/;
        var show;

        //Обработка данных с формы для отправки на сервер
        var data = new FormData();
        data.append('form', JSON.stringify(this.state));
        //Обработка данных с формы для отправки на сервер

        if (checkingRegExp.test(this.state.password)) {
          if (this.state.password===this.state.password_2) {
              fetch("https://someweathenews.000webhostapp.com/server/signUp.php", { // запрос на сервер для регистрации пользователя
                method: 'POST',
                body: data
              }).then(response => response.json()).then(json => {
                if (json === 'OK') {
                      this.props.history.push("/") //Здесь редирект
                }
              })
              .catch((err) => {
                console.log('Fetch Error :-S', err); // Перехват ошыбок с сервера
              });
              //reset passwords
              this.setState({password: ''});
              this.setState({password_2: ''});
              //reset passwords

              // logOut
              this.handleLogOut();
              // logOut

          }else{
            show = document.getElementsByClassName('alert4');
            show[0].classList.remove('alertClose');
          }
        }else{
          show = document.getElementsByClassName('alert3');
          show[0].classList.remove('alertClose');
        }
  }
  handleLogOut = () => {
      this.props.getUserData(null);
      this.props.verifyUser({auth:false,verifyLogin:null,verifyToken:null});
      let regForm = JSON.stringify({auth:false,verifyLogin:null,verifyToken:null});
      localStorage.setItem('regForm', regForm);
  };
  closeAlert = () => {
    let show3 = document.getElementsByClassName('alert3');
    let show4 = document.getElementsByClassName('alert4');
    show3[0].classList.add('alertClose');
    show4[0].classList.add('alertClose');
  }
  render() {
    return (<div className="SignUp">
      <div id="alert3">
        <div className="alert3 alert alert-danger alert-dismissible fade show alertClose" role="alert">
          <strong>Пароль должен содержать символы верхнего и нижнего регистра, числа, спец символы, и не менее 6 символов</strong>
          Пример: Primer1$.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span onClick={this.closeAlert} aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div id="alert4">
        <div className="alert4 alert alert-danger alert-dismissible fade show alertClose" role="alert">
          <strong>Пароли должны совпадать!</strong>
          Попробуйте еще.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span onClick={this.closeAlert} aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <Paper className="SignUp__paper">
        <Typography variant="title" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={this.handleSubmit} id="login-form1">
          <div className="row">
            <div className="input-group col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="Name">Имя и Фамилия</label>
              </div>
              <input type="text" aria-label="First name" onChange={this.handleNameChange} value={this.state.name} className="form-control" id="Name" required="required" placeholder="Имя"/>
              <input type="text" aria-label="Last name" onChange={this.handleLastNameChange} value={this.state.lastName} className="form-control" id="lastName" required="required" placeholder="Фамилия"/>
            </div>
            <div className="input-group  col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="exampleInputEmail1">Почта</label>
              </div>
              <input  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourEmail@exampl.com" value={this.state.email} required="required" onChange={this.handleEmailChange}/>
            </div>

            <div className="input-group  col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="phoneNumber">Телефон +380</label>
              </div>
              <input type="text"  className="form-control" onChange={this.handlePhoneNumber} value={this.state.phoneNumber} id="phoneNumber" placeholder="Номер телефона"/>
            </div>
            <div className="input-group col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="date">Дата рождения  </label>
              </div>
              <input type="date"  className="form-control" onChange={this.handleDateOfBirth} value={this.state.dateOfBirth} id="date" placeholder="Дата рождения" required/>
            </div>
            <div className="input-group col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="city">Город</label>
              </div>
              <select onChange={this.handleCity} value={this.state.city} className="custom-select" id="city">
                  <option  value="Киев">Киев</option>
                  <option value="Одесса">Одесса</option>
                <option value="Львов">Львов</option>
              </select>
          </div>
          <div className="input-group  col-md-12 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Пол</span>
            </div>
            <div className="custom-control custom-radio">
              <input value="Мужской" onChange={this.handleGender}  type="radio" id="customRadio1" name="genderRadio" className="custom-control-input" required />
              <label className="custom-control-label" htmlFor="customRadio1">Мужской</label>
            </div>
            <div className="custom-control custom-radio">
              <input value="Женский" onChange={this.handleGender}  type="radio" id="customRadio2" name="genderRadio" className="custom-control-input" required />
              <label className="custom-control-label" htmlFor="customRadio2">Женский</label>
            </div>
        </div>
          <div className="input-group  col-md-12 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">О себе</span>
            </div>
            <textarea  className="form-control"  onChange={this.handleAboutSelf} value={this.state.aboutSelf} maxLength="300" rows="1"></textarea>
        </div>
            <div className="input-group col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="exampleInputPassword1">Пароль</label>
              </div>
              <input type="password" onChange={this.handlePasswordChange} value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Пароль" required="required"/>
              <input type="password" onChange={this.handlePassword_2Change} value={this.state.password_2} className="form-control" id="exampleInputPassword2" placeholder="Повторите пароль" required="required"/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary col-md-12 mb-3">Регистрация</button>
        </form>
      </Paper>
    </div>);
  }
}
export default connect(state => ({state: state}), {getUserData,verifyUser})(SignUp);
