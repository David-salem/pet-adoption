import "./Sidebar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import { PicUser } from "../../Ukits/PicUser/PicUser";
import EmailIcon from '@mui/icons-material/Email';
import PetsIcon from '@mui/icons-material/Pets';

export const Sidebar = () => {
    return (
            <div className="sidebar">
                <PicUser />
                <hr />
                <div className="sidebar-personal">
                    <p>Menu</p>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/profile">
                <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Profile</h3>}>
                        <PersonIcon fontSize="large"/>
                    </Tooltip> 
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/contact">
                <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Contact</h3>}>
                        <EmailIcon fontSize="large"/>
                    </Tooltip> 
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/my-pets">
                    <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>My Pets</h3>}>
                            <PetsIcon fontSize="large"/>
                    </Tooltip> 
                </NavLink>
                </div>
                <div className="sidebar-socialMedia">
                <NavLink to="/#">
                <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Instagram</h3>}>
                        <InstagramIcon fontSize="large"/>
                    </Tooltip> 
                    </NavLink>
                    <NavLink to="/#">
                    <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Facebook</h3>}>
                        <FacebookIcon fontSize="large"/>
                    </Tooltip>
                    </NavLink>
                    <NavLink to="/#"> 
                    <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Twitter</h3>}>
                        <TwitterIcon fontSize="large"/>
                    </Tooltip>
                    </NavLink> 
                </div>
            </div>
    );
}