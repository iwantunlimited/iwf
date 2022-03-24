import React from "react";
import {  Card, Container, TextField,Grid,Select,MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './main.css'

function SearchInstances(){

   

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
<<<<<<< HEAD
        console.log("api called");
        axios.post("http://64.227.177.87:21001/search-content",{...data},{
=======

        axios.post("http://136.232.113.214:21001/search-content",{...data},{
>>>>>>> 04b95ca2141bf0206db0b6dfb769f5da3d41510e
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
            <Card elevation={2} className="card-css">
                {/* <div style={{fontSize:'20px'}}>
                    Search Instance
                </div> */}
                <form onSubmit={handlesubmit}>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={3}>
                            {/* <TextField required placeholder="Driver Id" name="driverId" value={driverId} onChange={handleChange}  /> */}
                            <FormControl fullWidth>
                                <InputLabel  id="demo-simple-select-label">DriverId</InputLabel>
                                <Select
                                    className="select-css"
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField className="textField-css" required placeholder="Keyword" name="content" label="Keyword" value={content} onChange={handleChange}  />
                        </Grid>
                        <Grid item xs={2}>
                            {/* <InputLabel id="demo-simple-select-label">Limit</InputLabel> */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Limit</InputLabel>
                                <Select
                                    className="select-css"
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Button 
                                // fullWidth
                                type="submit" 
                                variant="contained" 
                                style={{borderRadius:'20px',background:'#23395d',textTransform:'none'}}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
            <div style={{fontSize: '20px',color:'grey',marginTop:'20px',marginBottom:'20px'}}>Output :</div>
            {
                testData && testData.payload && testData.payload.length === 0 && <div style={{textAlign:'center'}}>No Data Found</div>
            }
            {
                testData && testData.payload && testData.payload.length > 0 &&
                <Grid item container xs={12} spacing={0} style={{marginTop:'20px'}}>
                {
                    testData?.payload &&
                    <Card className="output-card" >
                        <DataGrid 
                            components={{ Toolbar: GridToolbar }} 
                            rows={testData.payload.map(ele => ({...ele ,id:Math.random()}))}
                            columns={Object.keys(testData.payload[0]).map((ele) => ({id:Math.random(),align:'center',width:115,field:ele, headerName:ele.toUpperCase(), hide:false}))}
                        />
                    </Card>
                }
            {/* {
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
            } */}
            </Grid>
            }
            </Container>
        </>
    )
}

export default SearchInstances;
