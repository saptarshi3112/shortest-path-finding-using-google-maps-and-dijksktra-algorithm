const Radius = 6371;

let degreeToRadian = (radian) => {
  return (radian*(Math.PI/180));
};

let computeHaversine = (lat1, lat2, lng1, lng2) => {

  // convert the degrees to radians
  let lat = degreeToRadian(lat2) - degreeToRadian(lat1);
  let lng = degreeToRadian(lng2) - degreeToRadian(lng1);

  let hav = ( Math.sin(lat/2)*Math.sin(lat/2) ) + 
  (Math.cos(degreeToRadian(lat1)) * Math.cos(degreeToRadian(lat2)) * 
  ( Math.sin(lng/2)*Math.sin(lng/2) )) ;

  let arcSin = Math.asin(Math.sqrt(hav));

  return ( 2*Radius*arcSin );
};

let haversine = (src, dest) => {

  let source = Number.parseInt(src.label);
  let destination = Number.parseInt(dest.label);
  let distance = computeHaversine(src.lat, dest.lat, src.lng, dest.lng);

  return { source: source, arr: [destination, Math.round(distance)] };

}

module.exports = {
  haversine
};
