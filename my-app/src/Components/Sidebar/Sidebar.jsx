import "./Sidebar.css";
import { useContext } from 'react';
import { userContext } from '../../Context/userContext';
import { PicUser } from "../../UIkits";
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import EmailIcon from '@mui/icons-material/Email';
import PetsIcon from '@mui/icons-material/Pets';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export const Sidebar = () => {
    const { infoUser } = useContext(userContext);

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
                {infoUser.Permissions?.includes("admin") &&  <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/manage-pets">
                    <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Manage Pets</h3>}>
                            <BookmarkAddIcon fontSize="large"/>
                    </Tooltip> 
                </NavLink>}
                {infoUser.Permissions?.includes("admin") && <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/admin">
                    <Tooltip placement="right" TransitionComponent={Fade}TransitionProps={{ timeout: 600 }} title={<h3 style={{ color: "white", fontSize: "15px", fontFamily: "'Barlow', sans-serif" }}>Dashboard</h3>}>
                            <ManageAccountsIcon fontSize="large"/>
                    </Tooltip> 
                </NavLink>}
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