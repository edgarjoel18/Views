import ReactDOM from 'react-dom';
import React from 'react';
import NavToggle from './components/nav-toggle';

ReactDOM.render(
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a class = "text-white h4"  href="/new-page"> View News <span class="sr-only">(current)</span></a>
      <a class ="text-white h4"> Tech Views </a>
      <a class ="text-white h4"> Your Tech </a>
      <a class ="text-white h4"> Your View</a>
    </div>
    <NavToggle/>
    <div class="pos-f-t">
      <div class="collapse" id="navbarToggleExternalContent">
        <span class="text-muted">Toggleable via the navbar brand.</span>
      </div>
    </div>
  </div>,
  document.getElementById('root')
);
