import React from "react";
import { Button, Card, Container } from "@mui/material";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CoRelateSearch(){

    const navigate = useNavigate()

    const[data,setData] = React.useState({
        file: null
    })

    const { file } = data;

    // const handleChange = e => {
    //     const fileReader = new FileReader();
    //     fileReader.readAsText(e.target.files[0], "UTF-8");
    //     fileReader.onload = e => {
    //       console.log("e.target.result", e.target.result);
    //       setData({file: e.target.result});
    //     };
    //   };

    console.log(data);


    function handleSubmit(event) {
        event.preventDefault()


        axios.post("http://192.168.2.28:21001/create-instance",file,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            console.log(res);
            navigate('/searchinstance')
        }).catch((err) => console.log(err))
    }


    return(
        <>
            <Container maxWidth="sm">
                <Card elevation={4} style={{padding:'20px',marginTop:'20px'}}>
                    
                </Card>
            </Container>
        </>
    )
}

export default CoRelateSearch;