import React from 'react'
import { Timeline } from 'antd'
import styles from './index.css'
const NodeToolTips = ({ x, y, setShowNodeTooltip }) => {
  return (

    <div  onMouseLeave={e=>setShowNodeTooltip(false)} style={{ 
      position: 'absolute',
      height: '160px',
      widht: '160px',
      background:' #e6fffb',
      padding: '10px',
      top: `${y}px`, left: `${x}px`}}>
          {/* <ul>
              <li>hello</li>
              <li>hello</li>
              <li>hello</li>
          </ul> */}
    <ul>
      <li>Hello there</li>
      <li>Solve initial network problems 2015-09-01</li>
      <li>Technical testing 2015-09-01</li>
      <li>Network problems being solved 2015-09-01</li>
    </ul>
  </div>
  )
}

export default NodeToolTips
