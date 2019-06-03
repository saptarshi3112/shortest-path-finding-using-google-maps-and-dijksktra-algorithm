import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapService } from '../services/map.service';


class marker {
	lat: number;
	lng: number;
  draggable: boolean;
  label: string;
}

class polyline {
  src: marker;
  dest: marker;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat: number;
  lng: number;
  markers: marker[] = [];
  lines: polyline[] = [];
  count: number;

  connections = new Map();

  constructor(private map: MapService) {
    this.count = 0;
  }


  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

      this.markers.push({
        lat: this.lat, 
        lng: this.lng,
        draggable: false,
        label: this.count.toString()
      });

      
      this.connections.set(this.count, []);
      this.count += 1;

    })
  }


  mapClicked(clicked: MouseEvent) {
    this.markers.push({
      lat: clicked.coords.lat,
      lng: clicked.coords.lng,
      draggable: false,
      label: this.count.toString()
    });

    this.connections.set(this.count, []);
    this.count += 1;
  }


  clickedMarker(label: string) {
    console.log(`clicked the marker: ${ label }`);
    let x = prompt("connect to a label");

    if(x !== null && x !== label) {
      let source, dest;

      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].label == label) {
          source = this.markers[i];
        }
      }
  
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].label == x) {
          dest = this.markers[i];
        }
      }

      if(source != null && dest != null) {
        this.connections.get(Number.parseInt(label)).push({
          dest: Number.parseInt(x),
          srcMarker: source,
          destMarker: dest
        });

        this.connections.get(Number.parseInt(x)).push({
          dest: Number.parseInt(label),
          srcMarker: dest,
          destMarker: source
        });

        this.lines.push({
          src: source,
          dest: dest
        });
      }
    }
  }

  clearAll() {
    this.connections.clear();
    this.markers = [];
    this.lines = [];
    this.count = 0;
  }

  clearConnections() {
    this.connections.clear();
    this.lines = [];
  }

  src: Number;
  dest: Number;
  shortest: Number;

  pathIndex = [];
  calculatePathIndex(idx: number, parent: []) {
    if(idx == -1) {
      return 0;
    } else {
      if(idx != 0) {
        this.pathIndex.push(idx);
      }
      return this.calculatePathIndex(parent[idx], parent);
    }
  }


  computeShortestPath() {
    console.log(this.connections);
    let arr = prompt("Enter src and dest with a space").split(' ');
    if(arr.length != 2) {
      window.alert('Please enter source and dest correctly');
    } else {
      const graph = {};
      this.connections.forEach((val: any, key: number) => {
        graph[key] = val;
      });
      this.map.shortestPath(
        graph, this.markers, Number.parseInt(arr[0]), Number.parseInt(arr[1])
      ).subscribe( (res:any) => {

        this.src = res.src;
        this.dest = res.dest;
        this.shortest = res.shortestDistance;

        let parents = res.parent;

        this.calculatePathIndex(res.dest, parents);

        console.log(parents);
        console.log(this.pathIndex.reverse());

        console.log(this.markers);

        this.lines = [];

        this.pathIndex.reverse().forEach((pathVal) => {
          console.log(this.markers[pathVal]);
          console.log(this.markers[parents[pathVal]]);
          
          this.lines.push({
            src: this.markers[pathVal],
            dest: this.markers[parents[pathVal]]
          });

          console.log("\n");
        });




        this.pathIndex = [];

      } );
    }
  }
}
