import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User"
          />
          <div>
            <p className="app-sidebar__user-name">Club Dashboard</p>
          </div>
        </div>
        <ul className="app-menu">
          <li>
            <NavLink className="app-menu__item" to='/Team_dash'>
              <i className="app-menu__icon bi bi-speedometer"></i>
              <span className="app-menu__label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/Add_Player'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">Add Player</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/List_Player'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">List of Players</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to='/Tourn_Enroll'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">Tournaments Enroll</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="app-menu__item" to='/EnrolledPlayers'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">Enrolled Players</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink className="app-menu__item" to='/Enrolledplay'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">Enrolledplay</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="app-menu__item" to='/List_Tourn'>
              <i className="app-menu__icon bi bi-trophy-fill"></i>
              <span className="app-menu__label">List Tournaments</span>
            </NavLink>
          </li> */}
          
          
         
        </ul>
      </aside>
    </>
  )
}

export default Sidebar