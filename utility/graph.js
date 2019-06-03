const heap = require('heap');

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.graph = new Map(); 
  }

  addVertex(idx) {
    this.graph.set(idx, []);
  }

  addEdge(src, dest, weight) {
    this.graph.get(src).push({ dest, weight });
  }

  doDFS(v, visited) {
    visited[v] = true;
    console.log(v);

    this.graph.get(v).forEach(element => {
      if (!visited[element.dest]) {
        visited[element.dest] = true;
        this.doDFS(element.dest, visited);
      }
    });
  }

  dfs() {
    let visited = [];
    for (let i = 0; i < this.vertices; i++) {
      visited[i] = false;
    }

    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        visited[i] = true;
        this.doDFS(i, visited);
      }
    }
  }

  bfs() {
    let q = [];
    let visited = [];
    for (let i = 0; i < this.vertices; i++) {
      visited[i] = false;
    }

    q.push(0);
    visited[0] = true;
    
    while (q.length != 0) {

      let index = q[0];
      console.log(index);
      q.shift();

      this.graph.get(index).forEach((element) => {
        if (!visited[element.dest]) {
          visited[element.dest] = true;
          q.push(element.dest);
        }
      });

    }
    
  }

  dijsktra(source) {
    let dist = [], parent = [];
    for(let i = 0; i < this.vertices; i++) {
      dist.push(Number.MAX_VALUE);
    }
    for(let i = 0; i < this.vertices; i++) {
      parent.push(-1);
    }

    let queue = new heap((a, b) => {
      return a.wt - b.wt;
    });

    queue.push({ vertex: source, wt: 0 });
    dist[source] = 0;
    parent[source] = -1;

    while(!queue.empty()) {
      let index = queue.peek().vertex;
      queue.pop();

      // for all adjacent nodes check the values
      this.graph.get(index).forEach((element) => {
        let dest = element.dest, wt = element.weight;
        if(dist[dest] > wt + dist[index]) {
          dist[dest] = wt+dist[index];
          parent[dest] = index;
          queue.push({ vertex: dest, wt: wt });
        }
      });

    }

    return { dist, parent };

  }
}

module.exports = {
  Graph
};
