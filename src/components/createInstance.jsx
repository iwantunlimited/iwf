import React from "react";
import { Button, Card, Container } from "@mui/material";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CreateInstance(){

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

        console.log(file[0])

        let formData = new FormData()
        formData.append('jsonFile', file[0])
        axios.post("http://192.168.2.30:21001/create-instance",formData,{
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
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <div style={{color: 'grey',fontSize: '30px'}}>Create Instance</div>
                           <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Box style={{marginTop:'30px'}}>
                                    <input 
                                        type="file"
                                        accept=".json"
                                        name="file"
                                        onChange={(event) => setData({ file: event.target.files })}  
                                        // onChange={handleChange}
                                    />
                                </Box>
                                <Button
                                    variant="contained" 
                                    style={{marginTop:'20px',borderRadius:'20px'}}
                                    type="submit"
                                >
                                    Create
                                </Button>
                           </form>
                    </div>
                </Card>
            </Container>
        </>
    )
}

export default CreateInstance;