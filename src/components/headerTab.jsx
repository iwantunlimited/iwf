import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchInstances from "./searchComponents/simpleSearch";
import FilterSearch from "./searchComponents/filterSearch";
import AdvanceSearch from "./searchComponents/AdvanceSearch";
import Logo from '../logo.png'
import CorelateSearch from "./searchComponents/CorelateSearch";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function HeaderTab(){

    const [value, setValue] = React.useState(0);

    const handleChangetab = (event, newValue) => {
        setValue(newValue);
    };


    return(
        <>
          <Box>
            <AppBar>
              <Toolbar>
  
                  <div style={{display:'flex',width:'100%'}}>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                      <img src={Logo} alt="logo"  style={{width: '81px' ,height:'51px'}} />
                    </div>
                    <div style={{color:'white',width:'100%',fontSize:'30px',textAlign:'center',display:'flex',justifyContent:'center'}}>
                      <div>IWF</div>
                    </div>
                  </div>
              </Toolbar>
            </AppBar>
          </Box>
          <Container maxWidth="lg" style={{paddingBottom: '30px',marginTop:'70px '}}>
            <Box sx={{ width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChangetab} aria-label="basic tabs example">
                    <Tab label="Search" {...a11yProps(0)} />
                    <Tab label="Co-Relate Search" {...a11yProps(1)} />
                    <Tab label="Advance Search" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                   <SearchInstances  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <FilterSearch  /> */}
                    <CorelateSearch  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* <AdvanceSearch  /> */}
                    <FilterSearch  />>
                </TabPanel>
            </Box>
                
                
            </Container>
        </>
    )
}

export default HeaderTab;