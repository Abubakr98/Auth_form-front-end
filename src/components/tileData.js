import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../index.css';
import Acc from '@material-ui/icons/AccountBox';
import Input from '@material-ui/icons/Input';
import Assignment from '@material-ui/icons/Assignment';
import {Link} from "react-router-dom";
// side bar
export const mailFolderListItems = (<div>
  <Link style={{
      textDecoration: 'none'
    }} to="/User">
<ListItem button>
  <ListItemIcon>
    <Assignment/>
  </ListItemIcon>
  <ListItemText primary="Личные данные"/>
</ListItem>
</Link>
    <Link style={{
        textDecoration: 'none'
      }} to="/SignUp">
  <ListItem button>
    <ListItemIcon>
      <Acc/>
    </ListItemIcon>
    <ListItemText primary="Регистрация"/>
  </ListItem>
  </Link>
  <Link style={{
      textDecoration: 'none'
    }} to="/SignIn">
<ListItem button>
  <ListItemIcon>
    <Input/>
  </ListItemIcon>
  <ListItemText primary="Вход"/>
</ListItem>
</Link>
</div>);

export const otherMailFolderListItems = (<div>
  <div className='author' align="center">Created by Fazilov Abubakr for people with peace</div>
</div>);
