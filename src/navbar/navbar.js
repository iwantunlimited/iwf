import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import {Drawer,Hidden,Toolbar,List,Typography,IconButton} from '@mui/material'; 
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from '@mui/material/styles';  
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import routing from './navRouting';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Sidebar from './sidebar';
import Logo from '../logo.png'
import LogoMain from '../logoMain.png'

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 17,
    },
  }));

function Navbar(props){

    let navigate = useNavigate();

    const [id ,setId] = React.useState('')

    console.log(id);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleIdFun(event){
        setId(event)
    }

    const drawerWidth = window.innerWidth < 700 ? 170 : 190;

    const desktop = (
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <Sidebar handleId={handleIdFun} handleClick={handleDrawerToggle} />
                </List>
            </Box>
        </Drawer>
    )

    const mobile=(
        <Drawer
        //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <Sidebar handleId={handleIdFun} handleClick={handleDrawerToggle} />
                </List>
            </Box>
        </Drawer>

    )


    return(
        <div>
            <Helmet>
                <title>IWF</title>
            </Helmet>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{background: '#203354',zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit" 
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { lg: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <div style={{display:'flex',width: '100%',justifyContent: 'center'}}>
                        <div style={{display:'flex',alignItems: 'center',width:'100%'}}>
                            <img src={LogoMain} style={{ width: window.innerWidth <520 ? '80px' : '110px' }} alt="BanjeeLogo" />
                            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                <div style={{textAlign:'center',fontSize:'25px'}}>IWF</div>
                            </div>
                            {/* <Hidden mdDown>
                            {
                                routing.map((ele) => {
                                    if(ele.id === id){
                                        return(
                                            <Typography variant="h6" style={{marginLeft: '4em',fontFamily:'inherit'}} noWrap component="div">
                                                {ele.name}
                                            </Typography>
                                        )
                                    }else{
                                        return null
                                    }
                                })
                            }
                            </Hidden> */}
                        </div>
                        {/* <div style={{display:'flex',justifyContent:'flex-end'}} >
                            <LightTooltip title="Logout">
                                <IconButton onClick={() => localStorage.clear()} style={{paddingTop: '3px',paddingBottom: '3px'}}>
                                    <Link to="/login">
                                        <LogoutIcon style={{color:'white'}} />
                                    </Link>
                                </IconButton>
                            </LightTooltip>
                        </div> */}
                    </div>
                    </Toolbar>
                </AppBar>
                <Hidden mdDown>
                    {desktop}
                </Hidden>
                <Hidden mdUp>
                    {mobile}
                </Hidden>
                <Box component="main" style={{width:'100%',height: '100%',minHeight:'100vh',background: '#EFF1F4'}} sx={{p : 2}}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default Navbar;