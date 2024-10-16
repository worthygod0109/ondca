import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
function Sidebar() {
  return (
    <>
     
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User"
          />
          <div>
            <p className="app-sidebar__user-name">Admin</p>
          </div>
        </div>
        <ul className="app-menu">
          <li>
            <NavLink className="app-menu__item" to='/Admin-dash'>
              <i className="app-menu__icon bi bi-speedometer"></i>
              <span className="app-menu__label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/Addturnaments'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">Add Tournament</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/List_tournaments'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">List of Tournaments</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/Add_teams'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">Add Club</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/List_team'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">List Club</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/Allplayer'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">All Player</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/News'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">News</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/ListviewNews'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">View News</span>
            </NavLink>
          </li>
        </ul>
      </aside>
      
    </>
  );
}

export default Sidebar;
