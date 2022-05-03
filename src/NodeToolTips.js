import React from 'react'
import { Timeline } from 'antd'
import styles from './index.css'
const NodeToolTips = ({ node, x, y, setShowNodeTooltip }) => {
  return (

    <div className='absolute bg-gray-50 shadow text-sm' onMouseLeave={e=>setShowNodeTooltip(false)} style={{ 
      top: `${y}px`, left: `${x}px`}}>
        <ul>
            {
                node.properties.socials.map((social, idx)=>{
                    return <li key={idx}><a  href={social.social_link}> {social.social_name}</a></li>
                })
            }
        </ul>
    </div>
  )
}

export default NodeToolTips
