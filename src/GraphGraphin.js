import React, { useEffect, useState } from 'react'
import Graphin , { Utils , Behaviors } from '@antv/graphin' ;       

const data = Utils.mock ( 10 ) 
  .random ( ) 
  .graphin ( ) ; 

const { DragCanvas , ZoomCanvas , DragNode , ActivateRelations } = Behaviors ;        


const GraphGraphin = () =>{
    const [data, setData] =  useState(null)

    useEffect(()=>{
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
        .then((res) => res.json())
        .then((data) => {
           setData(data) 
        });
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