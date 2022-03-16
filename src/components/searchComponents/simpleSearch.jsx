import React from "react";
import {  Card, Container, TextField,Grid,Select,MenuItem, Button } from "@mui/material";
import axios from "axios";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


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

        axios.post("http://64.227.177.87:21001/search-content",{...data},{
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
                testData && testData.payload && testData.payload.length == 0 && <div style={{textAlign:'center'}}>No Data Found</div>
            }
            {
                testData && testData.payload && testData.payload.length > 0 &&
                <Grid item container xs={12} spacing={0} style={{marginTop:'20px'}}>
                {
                    testData?.payload &&
                    <div style={{width:'100%',height:'500px'}}>
                        <DataGrid 
                         components={{ Toolbar: GridToolbar }} 
                            rows={testData.payload.map(ele => ({...ele ,id:Math.random()}))}
                            columns={Object.keys(testData.payload[0]).map((ele) => ({id:Math.random(),width:115,field:ele, headerName:ele.toUpperCase(), hide:false}))}
                        />
                    </div>
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