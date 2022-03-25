import React from "react";
import {  Card, Container, TextField,Grid,Select,MenuItem, Button, Box, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DateTimePicker from "@mui/lab/DateTimePicker";
import './main.css'
import { portId } from "../../env";


function CorelateSearch(){

    const [data,setData] = React.useState({
        driverId: 'CGNAT',
        "filters" : [
            {
                "fieldName" : "Timestamp",
                "rangeValue" :
                {
                    "from" : new Date().getTime(),
                    "to" :  new Date().getTime()
                }
            },
            {
                "fieldName" : "",
                "value" : "",
                // "fieldName" : "private-ip-address",
                // "value" : "100.111.254.30"
            }
            ]
    })

    
    const { driverId,filters } = data

    // console.log("date>>>>>>>>>>>",filters);

    const [testData,setTestData] = React.useState('')

    // console.log("testData",testData);

    function handleChnage1(event){ 
        setData((prev) => ({
            ...prev,
            'filters': prev.filters.map((ele, index) => {
                    if(index === 0) {
                        return({
                            ...ele,
                            [event.target.name]: null
                        })
                    }else{
                        // console.log('event', event.target.value)
                        return({
                            ...ele,
                            [event.target.name]: event.target.value.length>0 ? event.target.value : null
                        })
                    }
            })
        }))
    }

    // console.log(data);

    function handlesubmit(event){
        event.preventDefault()

        axios.post( portId +"/correlate-search",{...data},{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            setTestData(res.data)
        }).catch((err) => console.log(err))
    }

    // console.log(data);


    return(
        <>
            <Container maxWidth="lg" style={{paddingBottom: '30px'}}>
            <Card elevation={2} className="card-css">
                {/* <div style={{fontSize:'20px'}}>
                    Search Instance
                </div> */}
                <form onSubmit={handlesubmit}>
                    <Grid item container xs={12} spacing={2} >
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">DriverId</InputLabel>
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
                                    onChange={(event) => setData((prev)=>({...prev, driverId: event.target.value }))}
                                >
                                    <MenuItem value={"CGNAT"}>CGNAT</MenuItem>
                                    <MenuItem value={"CGF"}>CGF</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
    
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField className="dateTime-css" fullWidth {...props} />}
                                fullWidth
                                label="start From"  
                                ampm={false}
                                inputFormat="dd/MM/yyyy HH:mm"
                                value={data?.filters?.[0]?.rangeValue?.from}
                                onChange={(newValue) => {
                                    setData((prev) =>({
                                        ...prev,
                                        filters:  prev.filters.map((ele , index) =>{
                                            if(index === 0){
                                                return {
                                                    ...ele,
                                                    rangeValue: {
                                                        ...ele.rangeValue,
                                                        from: newValue.getTime()
                                                    }
                                                }
                                            }else{
                                                return ele
                                            }
                                        })
                                    }))
                                }}
                            />
                            {/* <DateRangePicker
                                startText="From"
                                inputFormat="dd/MM/yyyy"
                                endText="TO"
                                value={[data?.filters?.[0]?.rangeValue?.from , data?.filters?.[0]?.rangeValue?.to]}
                                onChange={(newValue) => {
                                    const newDate = {
                                        "fieldName" : "Timestamp",
                                        "rangeValue" :
                                        {
                                            "from" :newValue[0].getTime(),
                                            "to" :  newValue[1].getTime()
                                        }
                                    };
                                    setData((prev) =>({
                                        ...prev,
                                        filters:  prev.filters.map((ele , index) =>{
                                            if(index === 0){
                                                return newDate
                                            }else{
                                                return ele
                                            }
                                        })
                                    }))
                                }}
                                renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                                )}
                            /> */}
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                fullWidth
                                ampm={false}
                                minDate={data?.filters?.[0]?.rangeValue?.from}
                                renderInput={(props) => <TextField className="dateTime-css" fullWidth {...props} />}
                                label="End to"  
                                inputFormat="dd/MM/yyyy HH:mm"
                                value={data?.filters?.[0]?.rangeValue?.to}
                                onChange={(newValue) => {
                                    setData((prev) =>({
                                        ...prev,
                                        filters:  prev.filters.map((ele , index) =>{
                                            if(index === 0){
                                                return {
                                                    ...ele,
                                                    rangeValue: {
                                                        ...ele.rangeValue,
                                                        to: newValue.getTime()
                                                    }
                                                }
                                            }else{
                                                return ele
                                            }
                                        })
                                    }))
                                }}
                            />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                        <Grid item xs={4}>
                            {
                                data?.filters?.map((ele, index) =>{
                                    if(index > 0){
                                        return <TextField className="textField-css" fullWidth type="text" placeholder="Keyword" label="Keyword" value={ele.fieldName} name={"fieldName"}  onChange={(e) => handleChnage1(e, null)}  />
                                    }else{
                                        return null
                                    }}
                                )
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                data?.filters?.map((ele, index) =>{
                                    if(index > 0){
                                        return <TextField className="textField-css" fullWidth type="text" placeholder="Value" label="Value" name={"value"} value={ele.value}  onChange={(e) => handleChnage1(e, null)}  />
                                    }else{
                                        return null
                                    }}
                                )
                            }
                        </Grid>
                        <Grid item xs={12} style={{display:'flex',alignItems:'center'}}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                style={{borderRadius:'20px',background:'#23395d',textTransform:'none'}}
                            >
                                Search
                            </Button>
                        </Grid>
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
                <Grid item container xs={12} style={{marginTop:'20px'}}>

                {
                    testData?.payload &&
                    <div style={{width:'100%',height:'600px',background:'white',padding:'10px'}}>
                        <DataGrid 
                            components={{ Toolbar: GridToolbar }} 
                            rows={testData.payload.map(ele => ({...ele ,id:Math.random()}))}
                            columns={Object.keys(testData.payload[0]).map((ele) => ({id:Math.random(),align:'center',width:120,field:ele, headerName:ele.toUpperCase(), hide:false}))}
                        />
                    </div>
                }
            {/* {
                testData && testData.payload.map((ele) => {
                    return(
                        <>
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
                        </>
                    )
                })
            } */}
            </Grid>
            }
            </Container>
        </>
    )
}

export default CorelateSearch;