import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Card, Container, TextField,Grid, IconButton } from "@mui/material";
import React from "react";


function SampleTrial(){

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
                {
                  initialState && initialState.length > 0 && initialState.map((initialElement,initialIndex) => {
                    console.log(initialIndex)
                      return(
                        <Grid item container xs={12} key={initialIndex}>
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
          </Card>
      </Container>
    </>
  )
}

export default SampleTrial;