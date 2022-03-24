import React from "react";
import {  Card, Container, TextField,Grid,Select,MenuItem, Button, Box, FormControl, InputLabel, IconButton } from "@mui/material";
import axios from "axios";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import './main.css'

function FilterSearch(){

    const [toggleButton,setToggleButton] = React.useState([{
        index: 0,
        name: 'value'
    }])
    const [inputFieldsState, setInputFieldsState] = React.useState([
        {
            fields: [
                {
                    name: 'FieldName',
                    label: 'FieldName',
                    value: ''
                },
                {
                    name: 'value',
                    label: 'Value',
                    value: '',
                }
            ]
        }
    ])

    console.log(
        "inutsdfcxdscsdd",inputFieldsState.map((ele) => {
            return {
                ...ele?.fields?.map((eleName) => {
                    return{
                        ...eleName,
                    }
                })
            }
        })
    );

    const newDataFields = inputFieldsState.map((ele) => {
        return {
            ...ele?.fields?.map((eleName) => {
                return{
                    ...eleName,
                }
            })
        }
    })

    const newTwoData = newDataFields.map((ele, eIndex) => {
            if(toggleButton.filter((tbEle, tBIndex) => tbEle.index === eIndex).length > 0 && toggleButton.filter((tbEle, tBIndex) => tbEle.index === eIndex)[0].name === 'value'){
                return{
                    fieldName: ele[0].value, value: ele[1].value
                }
            } else {
                return{
                    fieldName: ele[0].value, rangeValue: {  from: parseInt(ele[1].value), to:parseInt(ele[2].value) }
                }
            }
        })

    console.log('newTwoData', ...newTwoData)

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
            ...newTwoData,
            ]
    })

    
    const { driverId,filters } = data

    console.log("date>>>>>>>>>>>",filters);

    const [testData,setTestData] = React.useState('')

    console.log("testData",testData);

    function handleChnage1(event){ 
        setData((prev) => ({
            ...prev,
            'filters': prev.filters.map((ele, index) => {
                    
                    if(index === 0) {
                        return ele
                    }else{
                        return({
                            ...ele,
                            [event.target.name]:event.target.value
                        })
                    }
            })
        }))
    }

    console.log(data);

    function handlesubmit(event){
        event.preventDefault()

        axios.post("http://136.232.113.214:21001/correlate-search",{...data},{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            setTestData(res.data)
        }).catch((err) => console.log(err))
    }

    // console.log(data);
    console.log('inputFieldsState', inputFieldsState)

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
                            {/* <TextField required placeholder="Driver Id" name="driverId" value={driverId} onChange={handleChange}  /> */}
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
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                className="dateRange-css"
                                inputFormat="dd/MM/yyyy"
                                startText="From"
                                endText="TO"
                                value={[data.filters[0].rangeValue.from ,data.filters[0].rangeValue.to]}
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
                                    <TextField className="textField-css" {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField className="textField-css" {...endProps} />
                                </React.Fragment>
                                )}
                            />
                            </LocalizationProvider>
                        </Grid>
                        
                        {/* <Grid item container xs={12} spacing={4}> */}
                            {
                                inputFieldsState && inputFieldsState.length > 0 && inputFieldsState.map((ele, index) => (
                                    <>
                                        <Grid item key={index} container xs={12} spacing={2}>
                                            {
                                                ele?.fields?.map((item, itemIndex) => (
                                                    <Grid item xs={2}>
                                                        <TextField
                                                            fullWidth
                                                            className="textField-css"
                                                            type={item.name === "to" || item.name ==="from" ? "number" : "text"}
                                                            key={itemIndex}
                                                            name={item.name}
                                                            min={item.name === 'to' ? ele?.fields?.[1]?.value : ''}
                                                            value={item.value}
                                                            label={item.label}
                                                            inputProps={{ min : inputFieldsState?.filter((ele,iPIndex) => iPIndex === index).length > 0 && inputFieldsState?.filter((ele,iPIndex) => iPIndex === index)[0]?.fields?.[1]?.value}}
                                                            onChange={(e) => {
                                                                setInputFieldsState((prev) => prev.map((cEle, cIndex) => {
                                                                    if(cIndex === index){
                                                                        console.log('cEle', cEle, 'Yes')
                                                                        // return cEle
                                                                        if(cEle && cEle.fields && cEle.fields.length > 0){
                                                                            return {
                                                                                fields: cEle.fields.map((cItem, cItemIndex) => {
                                                                                    if(cItem.name === item.name){
                                                                                        return{
                                                                                            ...cItem,
                                                                                            value: e.target.value
                                                                                        }
                                                                                    } else return cItem
                                                                                })
                                                                            }
                                                                        } else return cEle
                                                                    } else return cEle;
                                                                }))
                                                            }}
                                                        />
                                                    </Grid>
                                                ))
                                            
                                            }
                                            <Grid item xs={3} style={{display:'flex',alignItems:'center'}}>
                                                <div>
                                                    <Button
                                                        variant={toggleButton && toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'value').length > 0 ? "contained" : "outlined"} 
                                                        onClick={() => 
                                                            {
                                                                setToggleButton((prev) => prev.map((bPEle, bPIndex) => {
                                                                    if(bPIndex === index){
                                                                        return {
                                                                            index: index,
                                                                            name: 'value'
                                                                        }
                                                                    } else return bPEle
                                                                }))
                                                                setInputFieldsState((prev) => prev.map((pEle, pIndex) => {
                                                                    if(pIndex === index){
                                                                        return {
                                                                                fields: [
                                                                                    {
                                                                                        name: 'fieldName',
                                                                                        label: 'FieldName',
                                                                                        value: ''
                                                                                    },
                                                                                    {
                                                                                        name: 'value',
                                                                                        label: 'value',
                                                                                        value: ''
                                                                                    }
                                                                                ]
                                                                            }
                                                                    } else return pEle
                                                                }))
                                                        }} 
                                                        // className="value-btn-toggle"
                                                        style={{
                                                                background: toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'range').length > 0 ? "white" : '#203354',
                                                                color:     toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'range').length > 0 ? "#203354" : 'white',
                                                                border:     toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'range').length > 0 ? "1px solid #203354" : '1px solid #203354',
                                                                borderTopLeftRadius: '20px',
                                                                borderBottomLeftRadius:'20px',
                                                                borderTopRightRadius:'0px',
                                                                borderBottomRightRadius:'0px',
                                                                textTransform:'none',
                                                                padding:'3px 9px'
                                                            }} 
                                                        size="small"
                                                    >
                                                        Value
                                                    </Button>
                                                    <Button 
                                                        variant={toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'range').length > 0 ? "contained" : "outlined"} 
                                                        onClick={() => {
                                                                setToggleButton((prev) => prev.map((bPEle, bPIndex) => {
                                                                    if(bPEle.index === index){
                                                                        return {
                                                                            index: index,
                                                                            name: 'range'
                                                                        }
                                                                    } else return bPEle
                                                                }))
                                                                setInputFieldsState((prev) => prev.map((pEle, pIndex) => {
                                                                    if(pIndex === index){
                                                                        return {
                                                                            fields: [
                                                                                    {
                                                                                        name: 'fieldName',
                                                                                        label: 'FieldName',
                                                                                        value: ''
                                                                                    },
                                                                                    {
                                                                                        name: 'from',
                                                                                        label: 'From',
                                                                                        value: ''
                                                                                    },
                                                                                    {
                                                                                        name: 'to',
                                                                                        label: 'To',
                                                                                        value: ''
                                                                                    }
                                                                                ]
                                                                        }
                                                                    } else return pEle
                                                                }))
                                                        }} 
                                                        // className="range-btn-toggle" 
                                                        
                                                        style={{
                                                                background: toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'value').length > 0 ? "white" : '#203354',
                                                                color:     toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'value').length > 0 ? "#203354" : 'white',
                                                                border:     toggleButton.filter((tEle, tIndex) => tEle.index === index && tEle.name === 'value').length > 0 ? "1px solid #203354" : '1px solid #203354',
                                                                borderTopLeftRadius: '0px',
                                                                borderBottomLeftRadius:'0px',
                                                                borderTopRightRadius:'20px',
                                                                borderBottomRightRadius:'20px',
                                                                textTransform:'none',
                                                                padding:'3px 9px'
                                                            }} 
                                                        size="small"
                                                    >
                                                        Range
                                                    </Button>
                                                </div>
                                            </Grid>
                                            <Grid item xs={2} style={{display:'flex',alignItems:'center'}}>
                                                <IconButton
                                                    disabled={index === 0}
                                                    onClick={() => {
                                                        setInputFieldsState((prev) => prev.filter((rEle, rIndex) => rIndex !== index))
                                                    }}
                                                >
                                                    <RemoveCircleOutline style={{color: index === 0 ? 'grey' : 'brown'}}  />
                                                </IconButton>
                                                {
                                                    inputFieldsState.length -1 === index &&
                                                    <IconButton
                                                        onClick={() => {
                                                            setToggleButton((prev) => ([...prev, {index: index + 1, name: 'value'}]))
                                                        setInputFieldsState((prev) => ([
                                                            ...prev,
                                                            {
                                                                fields: [
                                                                    {
                                                                        name: 'fieldName',
                                                                        label: 'FieldName',
                                                                        value: ''
                                                                    },
                                                                    {
                                                                        name: 'value',
                                                                        label: 'Value',
                                                                        value: 0
                                                                    }
                                                                ]
                                                            }
                                                        ]))
                                                    }}
                                                >
                                                    <AddCircleOutline style={{color: '#203354'}}  />
                                                </IconButton>
                                                }
                                            </Grid>
                                        </Grid>
                                    </>
                                ))
                            }
                            {/* <Grid item xs={2}>
                                {
                                    data.filters.map((ele, index) =>{
                                        if(index > 0){
                                            return <TextField required type="text" placeholder="Keyword" label="Keyword" value={ele.fieldName} name={"fieldName"}  onChange={handleChnage1}  />
                                        }else{
                                            return null
                                        }}
                                    )
                                }
                            </Grid>
                            <Grid item xs={3}>
                                {
                                    data.filters.map((ele, index) =>{
                                        if(index > 0){
                                            return <TextField required type="text" placeholder="Value" label="Value" name={"value"} value={ele.value}  onChange={handleChnage1}  />
                                        }else{
                                            return null
                                        }}
                                    )
                                }
                            </Grid> */}
                        {/* </Grid> */}
                        <Grid item xs={2} style={{display:'flex',alignItems:'center'}}>
                            <Button 
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
                <Grid item container xs={12} style={{marginTop:'20px'}}>
                {
                    testData?.payload &&
                    <div style={{width:'100%',height:'440px',background:'white',padding:'10px'}}>
                        <DataGrid 
                         components={{ Toolbar: GridToolbar }} 
                            rows={testData.payload.map(ele => ({...ele ,id:Math.random()}))}
                            columns={Object.keys(testData.payload[0]).map((ele) => ({id:Math.random(),align:'center',width:150,field:ele, headerName:ele.toUpperCase(), hide:false}))}
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

export default FilterSearch;
