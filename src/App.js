
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Captain from './pages/Team_Dashboard/Captain';
import Registration from './pages/Registation';
import Admin from './pages/Dashboard/Admin_login';
import News from './pages/Dashboard/News';
import Admindash from './pages/Dashboard/Admin_Dashboard';
import Addtournaments from './pages/Dashboard/Addtournaments';
import List_tournaments from './pages/Dashboard/List_tournaments';
import List_team from './pages/Dashboard/List_team';
import Add_teams from './pages/Dashboard/Add_teams';
import Team_Dash from './pages/Team_Dashboard/Dashboard';
import Add_Player from './pages/Team_Dashboard/Add_Player';
import Edit_tournaments from './pages/Dashboard/Edit_tournaments';
import View_Tourna from './pages/Dashboard/View';
import Edit_team from './pages/Dashboard/Edit_team';
import ViewTeamDetail from './pages/Dashboard/ViewTeamDetail';
import ListviewNews from './pages/Dashboard/ListviewNews';
import List_Player from './pages/Team_Dashboard/List_Players';
import List_Player1 from './pages/Dashboard/List_Players1';
import ViewPlayer from "./pages/Team_Dashboard/ViewPlayer";
import ViewPlayer1 from "./pages/Dashboard/ViewPlayer1";
import EditPlayer from './pages/Team_Dashboard/EditPlayer';
import EditPlayer1 from './pages/Dashboard/EditPlayer1';
import Edit_News from './pages/Dashboard/Edit_News'
import ViewNews from './pages/Dashboard/ViewNews';
import Allplayer from './pages/Dashboard/Allplayer';
import Tourn_Enroll from './pages/Team_Dashboard/Tourn_Enroll';
import EnrolledPlayers from './pages/Team_Dashboard/EnrolledPlayers';
import List_Tourn from './pages/Team_Dashboard/List_Tourn';
import AdminEnrollePlayer from './pages/Dashboard/AdminEnrollePlayer';


import Enrolledplay from './pages/Team_Dashboard/Enrolledplay';



function App() {
  
  return (
    <Router>
    
      <Routes>
     
        <Route path='/' element={<Captain />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Admin-dash' element={<Admindash />} />
        <Route path='/Addturnaments' element={<Addtournaments />} />
        <Route path='/List_tournaments' element={<List_tournaments />} />
        <Route path='/List_team' element={<List_team />} />
        <Route path='/Add_teams' element={<Add_teams />} />
        <Route path='/Team_Dash' element={<Team_Dash />} />
        <Route path='/Add_Player' element={<Add_Player />} />
        <Route path='/News' element={<News />} />
        <Route path='/ListviewNews' element={<ListviewNews />} />
        <Route path='/List_Player' element={<List_Player />} />
        <Route path='/List_Player1/:id' element={<List_Player1 />} />
        <Route path='/Edit_tournaments/:id' element={<Edit_tournaments />} />
        <Route path='/view_Tournaments/:id' element={<View_Tourna />} />
        <Route path="/edit-team/:id" element={<Edit_team />} />
        <Route path="/view-team/:id" element={<ViewTeamDetail />} />
        <Route path="/viewplayer/:id" element={<ViewPlayer />} />
        <Route path="/viewplayer1/:id" element={<ViewPlayer1 />} />
        <Route path="/EditPlayer/:id" element={<EditPlayer />} />
        <Route path="/EditPlayer1/:id" element={<EditPlayer1 />} />
        <Route path="/Edit_News/:id" element={<Edit_News />} />
        <Route path="/ViewNews/:id" element={<ViewNews />} />
        <Route path="/Allplayer" element={<Allplayer />} />
        <Route path="/Tourn_Enroll" element={<Tourn_Enroll />} />
        <Route path="/EnrolledPlayers" element={<EnrolledPlayers />} />
        <Route path="/Enrolledplay" element={<Enrolledplay />} />
        <Route path="/List_Tourn" element={<List_Tourn />} />
        <Route path="/AdminEnrollePlayer/:id" element={<AdminEnrollePlayer />} />
      


   
        </Routes>
    </Router>
  );
}

export default App;
