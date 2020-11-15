// Credit https://stackoverflow.com/a/49717023/1872200 for typing
// Adjust from https://jsfiddle.net/dede89/nxmLbwu2/
import './mind-map.html';
import * as d3 from 'd3';
import { HierarchyNode } from 'd3-hierarchy';

interface HierarchyDatum {
  name: string;
  children?: Array<HierarchyDatum>;
}

// draw single tree
function drawTree(rootData: HierarchyNode<HierarchyDatum>, position) {
  const svg = d3.select('svg');
  const width = parseInt(svg.attr('width'), 10);
  const height = parseInt(svg.attr('height'), 10);

  // Shift the entire tree by half it's width
  const g = svg.append('g').attr('transform', `translate(${width / 2}, 0)`);

  const SWITCH_CONST = position === 'right' ? 1 : -1;
  /*
           900
  +---------+---------+
  |         |         |
  |         |         | 600
  |         |         |
  +---------+---------+
                450
  */

  // Create new default tree layout

  const tree = d3.tree<HierarchyDatum>()
    // Set the size
    // Remember the tree is rotated
    // so the height is used as the width
    // and the width as the height
    .size([
      height, // width
      // height, negative height for left handside
      // Adjust a little space to fit a label.
      (SWITCH_CONST * ((width) / 2)) - 50,
    ]);

  const root = tree(rootData);
  const nodes = root.descendants();
  const links = root.links();

  // Set both root nodes at the center vertically
  nodes[0].x = height / 2;

  // Create links
  const link = g.selectAll('.link')
    .data(links)
    .enter();

  // invert target to source
  link.append('path')
    .attr('class', 'link')
    .attr(
      'd',
      (d) => `
        M${d.target.y}, ${d.target.x}
        C${(d.target.y + d.source.y) / 2.5}, ${d.target.x} 
        ${(d.target.y + d.source.y) / 2}, ${d.source.x} 
        ${d.source.y}, ${d.source.x}
        `,
    );

  // Create nodes
  const node = g.selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', (d) => `node${d.children ? ' node--internal' : ' node--leaf'}`)
    .attr('transform', (d) => `translate(${d.y},${d.x})`);

  node.append('circle').attr('r', () => 2.5);

  node.append('text')
    .attr('dy', -20) // Indicates a shift along the y-axis on the position of an element or its content.
    .style('text-anchor', 'middle')
    .text((d) => d.data.name);
}

const data: HierarchyDatum = {
  name: '.NET Thailand',
  children: [
    {
      name: 'Branch 1',
    },
    {
      name: 'Branch 2',
      children: [
        {
          name: 'Branch 2.1',
        },
        {
          name: 'Branch 2.2',
          children: [
            {
              name: 'Branch 2.2.1',
            },
            {
              name: 'Branch 2.2.2',
            },
          ],
        },
      ],
    },
    {
      name: 'Branch 3',
    },
    {
      name: 'Branch 4',
      children: [
        {
          name: 'Branch 4.1',
        },
        {
          name: 'Branch 4.2',
        },
      ],
    },
    {
      name: 'Branch 5',
    },
    {
      name: 'Branch 6',
    },
    {
      name: 'Branch 7',
      children: [
        {
          name: 'Branch 7.1',
        }, {
          name: 'Branch 7.2',
          children: [
            {
              name: 'Branch 7.2.1',
            }, {
              name: 'Branch 7.2.2',
            },
          ],
        },
      ],
    },
    {
      name: 'Branch 8',
    },
    {
      name: 'Branch 9',
      children: [
        {
          name: 'Branch 9.1',
        },
        {
          name: 'Branch 9.2',
        },
      ],
    },
    {
      name: 'Branch 10',
    },
  ],
};

const splitIndex = Math.round(data.children.length / 2);

// Left data
const data1 = {
  name: data.name,
  children: JSON.parse(JSON.stringify(data.children.slice(0, splitIndex))),
};

// Right data
const data2 = {
  name: data.name,
  children: JSON.parse(JSON.stringify(data.children.slice(splitIndex))),
};

// Create d3 hierarchies
const right = d3.hierarchy<HierarchyDatum>(data1);
const left = d3.hierarchy<HierarchyDatum>(data2);

// Render both trees
drawTree(right, 'right');
// drawTree(left, 'left');
