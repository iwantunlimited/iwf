import React from "react";
import { Button, Card, Container } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CreateInstance(){

    const navigate = useNavigate()

    const[data,setData] = React.useState({
        file: null
    })

    const { file } = data

    const apiCall = React.useCallback(() => {
        axios.get("http://localhost:21001/create-instance",{file}).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err))
    },[])

    React.useEffect(() => {
        apiCall()
    },[apiCall])


    console.log(data);

    return(
        <>
            <Container maxWidth="sm">
                <Card elevation={4} style={{padding:'20px',marginTop:'20px'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <div style={{color: 'grey',fontSize: '30px'}}>Create Instance</div>
                           <form onSubmit={apiCall}>
                            <Box style={{marginTop:'30px'}}>
                                    <input type="file" name="file" required onChange={(event) => setData({ file: event.target.value })}  />
                                </Box>
                                <Button 
                                    onClick={() => navigate('/searchinstance')}
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