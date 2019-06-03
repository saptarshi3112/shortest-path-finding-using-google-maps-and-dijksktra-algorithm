const express = require('express');
const router = express.Router();

const { Graph } = require('../utility/graph');
const { haversine } = require('../utility/haversine');

let pathIndex = [];
let findParent = (idx, parent) => {
  if(idx == -1) {
    return 0;
  } else {
    pathIndex.push(idx);
    return findParent(parent[idx], parent);
  }
}

router.post('/compute-shortest-path/', (req, res) => {
  let map = req.body.graph;
  let vertices = req.body.map.length;
  let graph = new Map();

  // popluate our graph with data
  for(let i = 0; i < vertices; i++) {
    graph.set(i, []);
  }
  for(let i = 0; i < vertices; i++) {
    for(let j = 0; j < map[i].length; j++) {
      graph.get(i).push(map[i][j]);
    }
  }

  let main = new Graph(vertices);
  for(let i = 0; i < vertices; i++) {
    main.addVertex(i);
  }

  // calculate haversine value
  for(let i = 0; i < vertices; i++) {
    graph.get(i).forEach((element) => {
      let { source, arr } = haversine(element.srcMarker, element.destMarker);
      main.addEdge(source, arr[0], arr[1]);
    });
  };

  let sourceOfGraph = req.body.src;
  let destOfGraph = req.body.dest; 
  let { dist, parent } = main.dijsktra(sourceOfGraph);

  res.json({
    parent: parent,
    dist: dist,
    shortestDistance: dist[destOfGraph],
    src: sourceOfGraph,
    dest: destOfGraph
  });

});

module.exports = router;
