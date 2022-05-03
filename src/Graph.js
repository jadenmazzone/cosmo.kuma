import React, { useEffect, useState, useCallback } from 'react';
import { data } from './data';
import G6 from '@antv/g6';
import NodeToolTips from './NodeToolTips';
import useWindowDimensions from './Hooks/useWindowDimensions';

const Graph = () => {
  const ref = React.useRef(null)
  let graph = null

  //tool tip
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  //node 
  const [selectedNode, setSelectedNode] = useState(null)


  function refreshDragedNodePosition(e) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
    model.x = e.x;
    model.y = e.y;
  }


  


  const bindEvents = () => {

    //resize graph on window resize
    if (typeof window !== 'undefined'){
        window.onresize = () => {
            console.log("resized")
        if (!graph || graph.get('destroyed')) return;
        if (!ref || !ref.current.offsetWidth || !ref.current.offsetHeight) return;
        graph.changeSize(ref.current.offsetWidth, ref.current.offsetHeight);
    }
   
    };

    const clearNodes = ()=>{
        graph.getNodes().forEach(function (node) {
            graph.clearItemStates(node);
         });
    }
    graph.on('canvas:mouseover', evt =>{
        graph.getNodes().forEach(function (node) {
            graph.clearItemStates(node);
         });
    })
    // 监听node上面mouse事件
    graph.on('node:click', evt => {
        const { item } = evt
        const model = item.getModel()
        const { x, y } = model
        const point = graph.getCanvasByPoint(x, y)
        graph.setItemState(item, 'selected', true);//set node style
        setNodeToolTipX(point.x - 75)
        setNodeToolTipY(point.y)
        setShowNodeTooltip(true)
        setSelectedNode(item._cfg.model)
      })
    
    graph.on('node:touchstart', evt => {
        clearNodes()
        console.log(evt)
        const { item } = evt
        const model = item.getModel()
        const { x, y } = model
        const point = graph.getCanvasByPoint(x, y)        
        graph.setItemState(item, 'selected', true);//set node style
        setNodeToolTipX(point.x - 75)
        setNodeToolTipY(point.y)
        setShowNodeTooltip(true)
        setSelectedNode(item._cfg.model)
      })

      graph.on('canvas:touchstart', evt => {
        clearNodes()
        setShowNodeTooltip(false)
      })

      graph.on('canvas:drag', evt => {
        clearNodes()
        setShowNodeTooltip(false)
      })

    //   graph.on('node:dragstart', function (e) {
    //     const forceLayout = graph.get('layoutController').layoutMethods[0];
    //     forceLayout.stop()
    //   });
  
    //   graph.on('node:drag', function (e) {
    //     refreshDragedNodePosition(e);
    //     graph.layout()
    //   });
  
    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    // graph.on('click', () => {
    // console.log('leave')
    //   setShowNodeTooltip(false)
    //   setShowNodeContextMenu(false)
    // })

  }
//container: ref.current,
useEffect(() => {
  if (!graph) {
      graph = new G6.Graph({
      container: ref.current,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
      fitView:true,
      modes: {
        default: [
            {
                type: 'activate-relations',
            },
            {
                type: 'drag-canvas',
                allowDragOnItem: true
            },
            {
                type:'zoom-canvas',
                sensitivity: 1,
                
            }
           , 'double-finger-drag-canvas'
          ],
      },
      layout: {
        type: 'force',
        nodeSize: 500,
        nodeStrength: -1000,
        edgeStrength: 0.1,
        
        // edgeStrength: 100,
        // nodeStrength: 100,
        // onLayoutEnd: () =>  graph.getEdges().forEach(function (edge) {
        //     graph.clearItemStates(edge);
        //     graph.getNodes().forEach(function (node) {
        //         // console.log(node)
        //         graph.clearItemStates(node);
        //       });
        //   })
      },
        nodeStateStyles: {
            active: {
                fill: '#000000',
            },
            selected: {
                stroke: '#666',
                lineWidth: 2,
                fill: 'steelblue',
              },
        },
      defaultNode: {
        
        size: 50,
        type: 'circle',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
        labelCfg: {
            position:'left',
            style: {
                fill: '#000',
                fontSize: 12,
            },
        }
        // style: {
        //     fill: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        //     stroke: '#72CC4A',
        //     width: 150,
        //   },
      },
      defaultEdge: {
        /* style for the keyShape */
        style: {
          stroke: '#000',
          lineAppendWidth: 2,
          opacity: 0.3,
        },
      },
    });
  }
  fetch('https://jmazzone.nettwerk.com/api/artist_data.php')
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "gere")
    graph.data(data);
    graph.render();
    
  });
  bindEvents()
}, []);

  return (
    <div className='bg-white w-full h-screen' ref={ref}>
      { showNodeTooltip && <NodeToolTips node={selectedNode} x={nodeTooltipX} y={nodeTooltipY} setShowNodeTooltip={setShowNodeTooltip} /> }
    </div>
  );
}

export default Graph