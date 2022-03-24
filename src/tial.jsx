import React from "react";
import { render } from "react-dom";
import { Formik, Field, Form, FieldArray } from "formik";
import { Card, Container, Grid, Button, Box,TextField,IconButton, Toolbar } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import './trial.css'
import axios from "axios";
import { format } from "date-fns";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const initialValues = {
  driverId: "",
  filters: [
    {
        fieldName: "Timestamp",
        rangeValue: {
            
            from: Date.now(),
            to: Date.now(),
        }
    },
    {
        fieldName: "",
        value: ""
    }
  ]
};


const TrialF = () =>{

    const [ data,setData] = React.useState({
        binary: '',
        filters: ''
    })

    const [testData,setTestData ] =React.useState('')

    console.log("data ",data);
    console.log(testData);

    const apiCall = React.useCallback(() => {
        axios.post("http://64.227.177.87:21001/search-all",{...data},{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            setTestData(res.data)
        }).catch((err) => console.log(err))
    })


    const renderDate = (values , index , type) =>{
        const newDate =new Date(values?.filters?.[index]?.rangeValue?.[type]).toLocaleDateString().split("/").reverse().map((ele, index) => {
            if(index === 0 ){
                return ele
            }else if(index === 1){
                if( ele <10){
                    return `0${ele}`
            }else{
                return ele
            }
            }else{
                if( ele <10){
                    return `0${ele}`
            }else{
                return ele
            }
            }
        })
       return  typeof(values?.filters?.[index]?.rangeValue?.[type]) === 'number' ? `${newDate[0]}-${newDate[2]}-${newDate[1]}`: values?.filters?.[index]?.rangeValue?.[type]   
    }

    return(
    <Container maxWidth="lg">
        <Card style={{padding:'20px'}}>
            <h4>Search Instance</h4>
            <Formik
                initialValues={initialValues}
                validate={() => ({ foo: true })}
                onSubmit={(values) => {
                    // alert(JSON.stringify(values, null, 2));
                    setData(values)
                    apiCall()
                }}
                render={({ values, errors, touched, handleReset, setFieldValue }) => {
                    // console.group("formik");
                    // console.log("touched", touched);
                    console.log("values", values);
                    setData(values)
                    // console.groupEnd("formik");
                    return (
                        <>
                        <Form>
                            <Grid item container xs={12} spacing={2}>
                                <Grid item xs={3}>
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <label>Binary Id</label>
                                        {/* <Field class="textField" name={`driverId`} placeholder="Driver Id" type="select" /> */}
                                        <Field 
                                            class="textField" 
                                            as="select" 
                                            name={`driverId`}
                                            onChange={(e) => {setFieldValue(`driverId`, e.target.value)}}
                                        >
                                            <option value={"CGNAT"}>CGNAT</option>
                                            <option value={"CGF"}>CGF</option>
                                        </Field>
                                    </div>
                                </Grid>
                                <Grid item xs={9}>
                                    <div>
                                        {values.filters.map((friend, index) => {
                                            if (index === 0) {
                                            return (
                                                <Grid item container xs={12} spacing={2}>
                                                    <Grid item xs={4}>
                                                        <div style={{display:'flex',flexDirection:'column'}}>
                                                            <label>From</label>
                                                            <Field
                                                                id="txtDate"
                                                                placeholder="dd-mm-yyyy"
                                                                class="textField"
                                                                name={`filters.${index}.rangeValue.from`}
                                                                type="Date"
                                                                value={renderDate(values, index , 'from')}
                                                                onChange={(e) =>{
                                                                    setFieldValue(`filters.${index}.rangeValue.from`, new Date(e.target.value.split("-")).getTime())
                                                                }}
                                                            />
                                                            {/* <Field name={`filters.${index}.rangeValue.from`}>
                                                                {({
                                                                    field, // { name, value, onChange, onBlur }
                                                                    }) => (
                                                                    <div>
                                                                        <input id="txtDate" type="date"  placeholder="dd/mm/yyyy" {...field} />
                                                                    </div>
                                                                    )}
                                                            </Field> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
                                                            <label>-</label>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <div style={{display:'flex',flexDirection:'column'}}>
                                                            <label>To</label>
                                                            <Field
                                                                min={renderDate(values, index , 'from')}
                                                                class="textField"
                                                                name={`filters.${index}.rangeValue.to`}
                                                                placeholder="To"
                                                                value={renderDate(values, index, 'to')}
                                                                onChange={(e) =>{
                                                                    setFieldValue(`filters.${index}.rangeValue.to`, new Date(e.target.value.split("-")).getTime())
                                                                }}
                                                                type="Date"
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            );
                                            }else{
                                                return null
                                            }
                                        })}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <FieldArray
                                        name="filters"
                                        render={
                                            ({ insert, remove, push }) => (
                                                <Grid item container xs={12} spacing={2}>
                                                    <Grid item xs={12}>
                                                        {
                                                            values.filters.length > 0 &&
                                                            values.filters.map((friend, index) => {
                                                                if(index > 0){
                                                                    return(
                                                                        <Grid item container spacing={2} xs={12} key={index} style={{marginTop: index >2 ? '5px' : '0px' }}>
                                                                            <Grid item xs={3}>
                                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                                    <label htmlFor={`filters.${index}.fieldName`}>Field Name</label>
                                                                                    <Field
                                                                                        class="textField"
                                                                                        name={`filters.${index}.fieldName`}
                                                                                        placeholder="Field Name"
                                                                                        type="text"
                                                                                    />
                                                                                    {
                                                                                    errors.filters &&
                                                                                    errors.filters[index] &&
                                                                                    errors.filters[index].fieldName &&
                                                                                    touched.filters &&
                                                                                    touched.filters[index].fieldName && (
                                                                                        <div className="field-error">
                                                                                        {errors.filters[index].fieldName}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item xs={3}>
                                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                                    <label htmlFor={`filters.${index}.value`}>
                                                                                    value
                                                                                    </label>
                                                                                    <Field
                                                                                        class="textField"
                                                                                        name={`filters.${index}.value`}
                                                                                        placeholder="value"
                                                                                        type="text"
                                                                                    />
                                                                                    {
                                                                                        errors.filters &&
                                                                                        errors.filters[index] &&
                                                                                        errors.filters[index].value &&
                                                                                        touched.filters &&
                                                                                        touched.filters[index].value && (
                                                                                        <div className="field-error">
                                                                                            {errors.filters[index].value}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item xs={1}>
                                                                                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center '}}>
                                                                                    <br />
                                                                                    {/* <Button
                                                                                        type="Button"
                                                                                        variant="contained"
                                                                                        className="secondary"
                                                                                        size="small"
                                                                                        onClick={() => remove(index)}
                                                                                    >
                                                                                        X
                                                                                    </Button> */}
                                                                                    <IconButton 
                                                                                        onClick={() => remove(index)}
                                                                                        variant="filled" 
                                                                                        style={{borderRadius: '20px'}}
                                                                                        disabled={index === 1}
                                                                                    >
                                                                                        <CancelIcon 
                                                                                            style={{color:'brown'}} 
                                                                                            fontSize="medium" 
                                                                                        />
                                                                                    </IconButton>
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Button
                                                            className="secondary"
                                                            style={{textTransform: 'none'}}
                                                            size="small"
                                                            onClick={() => push({ fieldName: "", value: "" })}
                                                        >
                                                            Add Field
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        size="small"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleReset();
                                        }}
                                    >
                                    Reset
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        size="small" 
                                        onClick={apiCall}
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                        </>
                    );
                }}
            />
        </Card>
        <Box>
            <div style={{fontSize: '20px',color:'grey',marginTop:'20px',marginBottom:'20px'}}>Output :</div>
            {/* {
                testData && testData.payload && testData.payload.length == 0 && <div style={{textAlign:'center'}}>No Data Found</div>
            } */}
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
                </Grid>
            }
        </Box> 
    </Container>
)};

export default TrialF;

