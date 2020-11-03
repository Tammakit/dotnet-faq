import React from 'react';
import ReactFlow, { Position } from 'react-flow-renderer';

const elements = [
  {
    id: 'root',
    data: { label: (<div> ASP.NET Core developer, Learn the Prerequisites</div>) },
    position: { x: 500, y: 0 },
    sourcePosition: Position.Bottom, // Ede position at node
  },
  // default node
  {
    id: 'c#',
    data: { label: <div>C#</div> },
    position: { x: 300, y: 125 },
    sourcePosition: Position.Left,
  },
  {
    id: 'c#-basic',
    data: { label: 'Learn the basics of C#' },
    position: { x: 100, y: 125 },
    targetPosition: Position.Right,
  },

  // connect a node
  {
    id: 'root-c#', source: 'root', target: 'c#', type: 'step',
  },
  {
    id: 'c#-c#-basic', source: 'c#', target: 'c#-basic', type: 'step',
  },
];

const DotnetLearningPath = () => (
  <div style={{ height: 500 }}>
    <ReactFlow
      elements={elements}
      nodesDraggable={false}
      paneMoveable={false}
      onNodeMouseEnter={(e) => {
        const element = e.target as HTMLElement;
        element.style.cursor = 'default';
      }}
    />
  </div>
);

export default DotnetLearningPath;
