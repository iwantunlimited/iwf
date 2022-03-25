import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Card, Container, TextField,Grid, IconButton, Switch } from "@mui/material";
import React from "react";


function SampleTrial(){

  const [checked,setChecked] = React.useState([{
    index: 0,
    value:false
  }])

  console.log(checked);

  const [ initialState, setInitialState] = React.useState([
        {
          fields: [
            {
              name: 'fieldName',
              label:'FieldName',
              value:''
            },
            {
              name: 'value',
              label:'Value',
              value:''
            }
          ]
        }
    ])

  console.log("initialState.length",initialState.length);

  return(
    <>
      <Container maxWidth="lg">
          <Card elevation={4} style={{padding:'20px'}}>
            <Grid item container xs={12} spacing={2}>
            {
                  initialState && initialState.length > 0 && initialState.map((initialElement,initialIndex) => {
                      return(
                        <Grid item container xs={12} spacing={2} key={initialIndex}>
                            {
                              initialElement?.fields?.map((element,index) => {
                                  return(
                                    <>
                                    <Grid item xs={3} >
                                        <TextField  
                                            key={index}
                                            name={element.name}
                                            label={element.label}
                                            value={element.value}
                                            placeholder={element.label}
                                            onChange={(event) => {
                                              setInitialState((prev) => 
                                                prev.map((pItem,pIndex) => {
                                                  console.log("pItem",pIndex)
                                                  if(pIndex === initialIndex){
                                                    if(pItem &&  pItem.fields && pItem.fields.length > 0){
                                                      return{
                                                        fields: pItem?.fields?.map((cItem,cIndex) => {
                                                            console.log(cItem.name)
                                                            if(cItem.name === element.name){
                                                              return {
                                                                ...cItem,
                                                                value: event.target.value
                                                              }
                                                            }else{
                                                              return cItem
                                                            }
                                                        })
                                                      }
                                                    }else return pItem
                                                  }else return pItem
                                                })
                                              )
                                            }}
                                        />
                                    </Grid>
                                    </>
                                  )
                              })
                            }
                            <Grid item xs={3}>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                {
                                  checked.map((cEle,cIndex) => {
                                    if(cIndex === initialIndex){
                                      return(
                                        <>
                                        <div style={{display: cEle.value === false ? "flex" : "none", color: cEle.value === false ? "#203354" : "gray"}}>value</div>
                                        <Switch  
                                          checked={cEle.value}
                                          onChange={(event) => {
                                            setChecked((prev) => prev.map((prevEle,prevIndex) => {
                                              if(prevIndex === initialIndex){
                                                return{
                                                  index: initialIndex,
                                                  value: event.target.checked
                                                }
                                              }else return prevEle
                                            }))
                                          }}
                                        />
                                        <div style={{display: cEle.value === true ? "flex" : "none", color: cEle.value === true ? "#203354" : "gray"}}>Range</div>
                                        </>
                                      )
                                    }
                                  })
                                }
                              </div>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton
                                  disabled={initialIndex === 0}
                                  onClick={() => {
                                    setInitialState((prev) => prev.filter((ele,pIndex) => pIndex !== initialIndex))
                                  }}
                                >
                                  <RemoveCircle  />
                                </IconButton>
                                {
                                  initialState?.length -1 === initialIndex &&
                                  <IconButton
                                  onClick={() => {
                                    setChecked((prev) => ([
                                      ...prev,
                                      {
                                        value: false
                                      }
                                    ]))
                                    setInitialState((prev) => ([
                                      ...prev,
                                      {
                                        fields: [
                                            {
                                              name: 'fieldName',
                                              label:'FieldName',
                                              value:''
                                            },
                                            {
                                              name: 'value',
                                              label:'Value',
                                              value:''
                                            }
                                          ]
                                      }
                                    ]))
                                  }}
                                >
                                  <AddCircle  />
                                </IconButton>
                                }
                            </Grid>
                        </Grid>
                      )
                  })
                }
            </Grid>
          </Card>
      </Container>
    </>
  )
}

export default SampleTrial;