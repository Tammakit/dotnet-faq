import './mind-map.html';
import * as d3 from 'd3';
// From http://bl.ocks.org/jdarling/raw/2d4e84460d5f5df9c0ff/
/*
// Add a new item
root.right.push({name: 'bar'}, {name: 'none'}, {name: 'some'}, {name: 'value'});
update(root);

// Move from the first to the last
root.right.push(root.right.shift());
update(root);

// Move from right to left
var tmp = root.right.shift();
tmp.position = 'left';
root.left.push(tmp);
update(root);

// Move from left to right
var tmp = root.left.shift();
tmp.position = 'right';
root.right.push(tmp);
update(root);

// Switch connector type
connector = diagonal;
update(root);
*/
const m = [20, 120, 20, 120];
// w = 1280 - m[1] - m[3],
const w = 900 - m[1] - m[3];
const h = 500 - m[0] - m[2];
const i = 0;
let root;

const getDirection = (data) => {
  if (!data) {
    return 'root';
  }
  if (data.position) {
    return data.position;
  }
  return getDirection(data.parent);
};

function addNodes(dir) {
  root[dir].push({ name: 'bar', position: dir }, { name: 'none', position: dir }, { name: 'some', position: dir }, { name: 'value', position: dir });
  update(root);
}

var moveNodes = function (from, to) {
  const tmp = root[from].shift();
  tmp.position = to;
  root[to].push(tmp);
  update(root);
};

var setConnector = function (type) {
  connector = window[type];
  update(root);
};

var select = function (node) {
  // Find previously selected, unselect
  d3.select('.selected').classed('selected', false);
  // Select current item
  d3.select(node).classed('selected', true);
};

var createNew = function () {
  root = {
    name: 'Root', children: [], left: [], right: [],
  };
  update(root, true);
  selectNode(root);
};

var handleClick = function (d, index) {
  select(this);
  update(d);
};

var tree = d3.layout.tree()
  .size([h, w]);

const calcLeft = function (d) {
  let l = d.y;
  if (d.position === 'left') {
    l = (d.y) - w / 2;
    l = (w / 2) + l;
  }
  return { x: d.x, y: l };
};

const diagonal = d3.svg.diagonal()
  .projection((d) => [d.y, d.x]);
const elbow = function (d, i) {
  const source = calcLeft(d.source);
  const target = calcLeft(d.target);
  const hy = (target.y - source.y) / 2;
  return `M${source.y},${source.x
  }H${source.y + hy
  }V${target.x}H${target.y}`;
};
var connector = elbow;

const vis = d3.select('#body')
  .append('svg:svg')
  .attr('width', w
    + m[1] + m[3])
  .attr('height', h + m[0] + m[2])
  .append('svg:g')
  // .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
  .attr('transform', `translate(${w / 2 + m[3]},${m[0]})`);
const selectNode = (target) => {
  if (target) {
    const sel = d3.selectAll('#body svg .node').filter((d) => d.id == target.id)[0][0];
    if (sel) {
      select(sel);
    }
  }
};

const moveNodes = function (from, to) {
  const tmp = root[from].shift();
  tmp.position = to;
  root[to].push(tmp);
  update(root);
};

const setConnector = function (type) {
  connector = window[type];
  update(root);
};

const select = function (node) {
  // Find previously selected, unselect
  d3.select('.selected').classed('selected', false);
  // Select current item
  d3.select(node).classed('selected', true);
};

const createNew = function () {
  root = {
    name: 'Root', children: [], left: [], right: [],
  };
  update(root, true);
  selectNode(root);
};

const handleClick = function (d, index) {
  select(this);
  update(d);
};

const tree = d3.tree().size([h, w]);

function update(source, slow) {
  const duration = (d3.event && d3.event.altKey) || slow ? 1000 : 100;

  // Compute the new tree layout.
  const nodesLeft = tree
    .size([h, (w / 2) - 20])
    .children((d) => (d.depth === 0 ? d.left : d.children)).nodes(root).reverse();

  const nodesRight = tree
    .size([h, w / 2])
    .children((d) => (d.depth === 0 ? d.right : d.children)).nodes(root).reverse();

  root.children = root.left.concat(root.right);
  root._children = null;
  const nodes = toArray(root);

  // Normalize for fixed-depth.
  // nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  const node = vis.selectAll('g.node')
    .data(nodes, (d) => d.id || (d.id = ++i));

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node.enter().append('svg:g')
    .attr('class', (d) => (d.selected ? 'node selected' : 'node'))
    .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
    .on('click', handleClick);

  nodeEnter.append('svg:circle')
    .attr('r', 1e-6);
  // .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append('svg:text')
    .attr('x', (d) => (d.children || d._children ? -10 : 10))
    //            .attr("dy", ".35em")
    //            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .attr('dy', 14)
    .attr('text-anchor', 'middle')
    .text((d) => (d.name || d.text))
    .style('fill-opacity', 1);

  // Transition nodes to their new position.
  const nodeUpdate = node.transition()
    // .attr("class", function(d){ return d.selected?"node selected":"node"; })
    .duration(duration)
    .attr('transform', (d) => `translate(${d.y},${d.x})`);

  nodeUpdate.select('text')
    .text((d) => (d.name || d.text));

  nodeUpdate.select('circle')
    .attr('r', 4.5);
  // .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  /*
          nodeUpdate.select("text")
              .attr("dy", 14)
              .attr("text-anchor", "middle")
              .style("fill-opacity", 1);
  */

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node.exit().transition()
    .duration(duration)
    .attr('transform', (d) => `translate(${source.y},${source.x})`)
    .remove();

  nodeExit.select('circle')
    .attr('r', 1e-6);

  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // Update the links…
  const link = vis.selectAll('path.link')
    .data(tree.links(nodes), (d) => d.target.id);

  // Enter any new links at the parent's previous position.
  link.enter().insert('svg:path', 'g')
    .attr('class', 'link')
    .attr('d', (d) => {
      const o = { x: source.x0, y: source.y0 };
      return connector({ source: o, target: o });
    })
    .transition()
    .duration(duration)
    .attr('d', connector);

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr('d', connector);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr('d', (d) => {
      const o = { x: source.x, y: source.y };
      return connector({ source: o, target: o });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function toArray(item, input, d) {
  const arr = input || [];
  let dr = d || 1;
  let i = 0;
  const l = item.children ? item.children.length : 0;
  arr.push(item);
  if (item.position && item.position === 'left') {
    dr = -1;
  }
  item.y = dr * item.y;
  for (; i < l; i++) {
    toArray(item.children[i], arr, dr);
  }
  return arr;
}
