import React, { useEffect, useState } from 'react';
import { data } from './data';
import G6 from '@antv/g6';
import NodeToolTips from './NodeToolTips';

const Graph = () => {
  const ref = React.useRef(null)
  let graph = null

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltipX, setEdgeTooltipX] = useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = useState(0)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)

  function refreshDragedNodePosition(e) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
    model.x = e.x;
    model.y = e.y;
  }
  const bindEvents = () => {
    // 监听edge上面mouse事件


    // 监听node上面mouse事件
    graph.on('node:click', evt => {
        console.log(evt)
        const { item } = evt
        const model = item.getModel()
        const { x, y } = model
        const point = graph.getCanvasByPoint(x, y)

        setNodeToolTipX(point.x - 75)
        setNodeToolTipY(point.y)
        setShowNodeTooltip(true)
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
      modes: {
        default: [
            {
                type: 'activate-relations',
            },
            'drag-canvas'
          ],
      },
      layout: {
        type: 'force',
        nodeStrength: -100,
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
        }
        },
      defaultNode: {
        label:'artist_name',
        type: 'triangle',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
        // labelCfg: {
        //   position:'left',
        //   style: {
        //     fill: '#ffffff',
        //     fontSize: 12,
        //   },
        // }
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
  fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);

    graph.render();
  });
  bindEvents()
}, []);

  return (
    <div className='bg-white w-full h-screen' ref={ref}>
      { showNodeTooltip && <NodeToolTips x={nodeTooltipX} y={nodeTooltipY} setShowNodeTooltip={setShowNodeTooltip} /> }
    </div>
  );
}

export default Graph