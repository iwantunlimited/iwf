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
        }
    ]

    const [data,setData] = React.useState({
        driverId: 'CGNAT',
        content:'',
        limit: '10'

    })

    const [testData,setTestData] = React.useState('')

    console.log("testData",testData);

    const { driverId, content,limit } = data

    function handleChange(event) {
        const { name,value  } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    console.log(data);

    function handlesubmit(event){
        event.preventDefault()

        axios.post("http://136.232.113.214:21001/search-content",{...data},{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            // console.log(res);
            setTestData(res.data)
        }).catch((err) => console.log(err))
    }

    console.log(data);


    return(
        <>
            <Container maxWidth="lg" style={{paddingBottom: '30px'}}>
                <Card elevation={4} style={{padding:'20px',marginTop:'20px'}}>
                    <div style={{fontSize:'20px'}}>
                        Search Instance
                    </div>
                    <form onSubmit={handlesubmit}>
                        <Grid item container xs={12} spacing={2} style={{marginTop:'20px'}}>
                            <Grid item xs={3}>
                                {/* <TextField required placeholder="Driver Id" name="driverId" value={driverId} onChange={handleChange}  /> */}
                                <Select
                                    required
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={driverId}
                                    name="driverId"
                                    placeholder="driverId"
                                    label="driverId"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"CGNAT"}>CGNAT</MenuItem>
                                    <MenuItem value={"CGF"}>CGF</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField required placeholder="Keyword" name="content" value={content} onChange={handleChange}  />
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
                <div style={{fontSize: '20px',color:'grey',marginTop:'20px',marginBottom:'20px'}}>Output :</div>
                {
                     testData?.payload?.length === 0 && <div>No Data Found</div>
                }
                {
                    testData && testData.payload && testData.payload.length > 0 &&
                    <Grid item container xs={12} spacing={4}>
                {
                    testData && testData.payload.map((ele) => {
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
                }
                
            </Container>
        </>
    )
}

export default SearchInstance;
