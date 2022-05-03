import React, { useEffect, useState } from 'react'
import Graphin , { Utils , Behaviors } from '@antv/graphin' ;       

const data = Utils.mock ( 10 ) 
  .random ( ) 
  .graphin ( ) ; 

const { DragCanvas , ZoomCanvas , DragNode , ActivateRelations } = Behaviors ;        


const GraphGraphin = () =>{
    const [data, setData] =  useState(null)

    useEffect(()=>{
        fetch('https://jmazzone.nettwerk.com/api/artist_data.php')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    return ( 
        data ?
        < div >
          < Graphin layout={{type:'force'}} data = { data } > 
            <ActivateRelations/>
            < ZoomCanvas sensitivity={1} enableOptimize />  
            < DragNode disabled={false} />  
            
          </ Graphin >
        </ div > :<></>
      ) ;
}

export default GraphGraphin