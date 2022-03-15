import React from "react";
import {  Card, Container, TextField,Grid,Select,MenuItem,InputLabel, Button } from "@mui/material";
import axios from "axios";


function SearchInstance(){

    const trialData = [
        {
            "SerialNumber": "108",
            "general4": "53058",
            "private-ip-address": "100.111.254.30",
            "port-id": "53058",
            "public-ip-address": "42.108.235.67",
            "General6": "53",
            "Timestamp": "2021-12-15 08:46:02",
            "General7": "271",
            "General5": "8.8.8.8",
        },
        {
            "SerialNumber": "108",
            "general4": "53058",
            "private-ip-address": "100.111.254.30",
            "port-id": "53058",
            "public-ip-address": "42.108.235.67",
            "General6": "53",
            "Timestamp": "2021-12-15 08:46:02",
            "General7": "271",
            "General5": "8.8.8.8",
        },
        {
            "SerialNumber": "108",
            "general4": "53058",
            "private-ip-address": "100.111.254.30",
            "port-id": "53058",
            "public-ip-address": "42.108.235.67",
            "General6": "53",
            "Timestamp": "2021-12-15 08:46:02",
            "General7": "271",
            "General5": "8.8.8.8",
        },
        {
            "SerialNumber": "108",
            "general4": "53058",
            "private-ip-address": "100.111.254.30",
            "port-id": "53058",
            "public-ip-address": "42.108.235.67",
            "General6": "53",
            "Timestamp": "2021-12-15 08:46:02",
            "General7": "271",
            "General5": "8.8.8.8",
        },
        {
            "SerialNumber": "108",
            "general4": "53058",
            "private-ip-address": "100.111.254.30",
            "port-id": "53058",
            "public-ip-address": "42.108.235.67",
            "General6": "53",
            "Timestamp": "2021-12-15 08:46:02",
            "General7": "271",
            "General5": "8.8.8.8",
        },
        {
            "SerialNumber": "108",
            "general4": "53058",
            "private-ip-address": "100.111.254.30",
            "port-id": "53058",
            "public-ip-address": "42.108.235.67",
            "General6": "53",
            "Timestamp": "2021-12-15 08:46:02",
            "General7": "271",
            "General5": "8.8.8.8",
        }
    ]

    const [data,setData] = React.useState({
        driverid: '',
        keyword:'',
        limit: '10'

    })

    const { driverid, keyword,limit } = data

    function handleChange(event) {
        const { name,value  } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const apiCall = React.useCallback(() => {
        axios.post("http://localhost:21001/search-content").then((res) => {
            console.log(res);
        }).catch((err) => console.log(err))
    },[])

    React.useEffect(() => {
        apiCall()
    },[apiCall])

    console.log(data);


    return(
        <>
            <Container maxWidth="lg" style={{paddingBottom: '30px'}}>
                <Card elevation={4} style={{padding:'20px',marginTop:'20px'}}>
                    <div style={{fontSize:'20px'}}>
                        Search Instance
                    </div>
                    <form onSubmit={() => alert("submitted",data.driverid)}>
                        <Grid item container xs={12} spacing={2} style={{marginTop:'20px'}}>
                            <Grid item xs={3}>
                                <TextField required placeholder="Driver Id" name="driverid" value={driverid} onChange={handleChange}  />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField required placeholder="Keyword" name="keyword" value={keyword} onChange={handleChange}  />
                            </Grid>
                            <Grid item xs={2}>
                                {/* <InputLabel id="demo-simple-select-label">Limit</InputLabel> */}
                                <Select
                                    required
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={limit}
                                    name="limit"
                                    placeholder="Limit"
                                    label="Limit"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={4} style={{display:'flex',alignItems:'center'}}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    style={{borderRadius:'20px'}}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
                <div style={{fontSize: '20px',color:'grey',marginTop:'20px',marginBottom:'20px'}}>Output</div>
                
                {/* <Card> */}
                <Grid item container xs={12} spacing={4}>
                {
                    trialData.map((ele) => {
                        return(
                            <Grid item xs={6}>
                            <Card elevation={4} style={{padding:'20px'}}>
                                <div> 
                                    <div>
                                        {
                                            Object.entries(ele).map(([key, value]) => (
                                            <div style={{display:'flex'}}>
                                            <div style={{marginRight:'10px'}}>{key + " : "}</div><div>{value}</div>
                                            </div>
                                            )) 
                                        }
                                    </div>
                                </div>
                            </Card>
                            </Grid>
                        )
                    })
                }
                </Grid>
                {/* </Card> */}
                
            </Container>
        </>
    )
}

export default SearchInstance;