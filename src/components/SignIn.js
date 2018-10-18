import React from 'react';
import './App.css';
import {verifyUser} from '../actions/actions.js';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      do_login:true
    };
  }
  // Обработка инпутов
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handleRememberMe = (e) => {
    this.setState({rememberMe: e.target.checked});
  }
  // Обработка инпутов

  handleSubmit = (e) => {
    e.preventDefault();
        // Подготовка данных с формы для отправки на сервер
        var data = new FormData();
        var show;
          data.append('form', JSON.stringify(this.state));
          // Подготовка данных с формы для отправки на сервер

          fetch("https://someweathenews.000webhostapp.com/server/signIn.php", { // Запрос на сервер с последущей обработкой ответа
            method: 'POST',
            body: data
          }).then(response => response.json())
          .then(json =>{
            if (json.status === 'OK') {
              this.props.verifyUser({auth:true,verifyLogin:json.user,verifyToken:json.token});
              this._updateLocalStorage();
                    this.props.history.push("/User"); //Redirect
            }else{
                var alert2=`<strong>${json}</strong> Попробуйте еще!`;
                show = document.getElementsByClassName('alert2');
                document.getElementById('alert2').innerHTML=alert2;
                show[0].classList.remove('alertClose');
            }
          })
          .catch((err) => {
            console.log('Fetch Error :-S', err); // Перехват ошыбок от сревера
          });
          this.setState({password: ''}); //reset password
  }
  componentDidMount=()=>{ // Берем даные пользователя с localHost если они есть
    let regForm = JSON.parse(localStorage.getItem('regForm'));
    if (regForm) {
      this.props.verifyUser(regForm);
    }
  }
  closeAlert = () => {
    let show2 = document.getElementsByClassName('alert2');
    show2[0].classList.add('alertClose');
  }
  render() {
    return (<div className="SignIn">
      <div>
        <div className="alert2 alert alert-danger alert-dismissible fade show alertClose" role="alert">
          <div id="alert2">

          </div>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span onClick={this.closeAlert} aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <Paper className="SignIn__paper">
        <Typography variant="title" gutterBottom>
          Авторизация
        </Typography>
        <form onSubmit={this.handleSubmit} id="login-form1">
          <div className="row">
            <div className="input-group  col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text asd" htmlFor="exampleInputEmail1">Почта</label>
              </div>
              <input  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourEmail@exampl.com" value={this.state.email} required="required" onChange={this.handleEmailChange}/>
            </div>
            <div className="input-group col-md-12 mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text asd" htmlFor="exampleInputPassword1">Пароль</label>
              </div>
              <input type="password" onChange={this.handlePasswordChange} value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Пароль" required="required"/>
            </div>
          </div>
          <div className="col-auto my-1">
        <div className="custom-control custom-checkbox mr-sm-2">
          <input type="checkbox" onChange={this.handleRememberMe} className="custom-control-input" id="customControlAutosizing" />
          <label className="custom-control-label" htmlFor="customControlAutosizing">Запомнить меня</label>
        </div>
    </div>
          <button type="submit" className="btn btn-primary col-md-12 mb-3">Войти</button>
        </form>
      </Paper>
    </div>);
  }
  _updateLocalStorage=()=>{ // Сохранияе данные пользователя в localHost если тот дал добро
    let regForm = JSON.stringify(this.props.state.allState.userVerify);
    if (this.state.rememberMe) {
          localStorage.setItem('regForm', regForm);
    }
  }
}
export default connect(state => ({state: state}), {verifyUser})(SignIn);
