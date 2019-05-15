  var sidebar = document.querySelector('.sidebar');
  var x = document.querySelector('.x');
  
  // toggle menu position 
  function hide() {
    sidebar.classList.toggle('cierra');
    x.classList.toggle('cierrax');
  }
  
  if (window.matchMedia('(max-width: 500px)').matches) {
  sidebar.classList.add('cierra');
  x.classList.add('cierrax'); 
  } else {
  sidebar.classList.remove('cierra');
  x.classList.remove('cierrax'); 
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFub2ZyZWRkaSIsImEiOiJjanV0d3hsZnkwY3U1NGRvM2V6eWs1M2pnIn0.LmRUmCRedA-7viHwBugTfA';

  // This adds the map
  var map = new mapboxgl.Map({
    // container id specified in the HTML
    container: 'map',
    // style URL
    style: 'mapbox://styles/mapbox/light-v10',
    // initial position in [long, lat] format
    center: [-58.4803213, -34.6026808],
    // initial zoom
    zoom: 11,
    scrollZoom: true
  });
  
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

  var brujula = new mapboxgl.NavigationControl();
  map.addControl(brujula, 'top-right');

  // This adds the data to the map
  map.on('load', function (e) {
    // This is where your '.addLayer()' used to be, instead add only the source without styling a layer
    map.addSource("places", {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-58.4803213, -34.6026808]
        },
        "properties": {
            "title": "Mapbox DC",
            "marker-symbol": "monument"
        }
    }});
    // Initialize the list
    buildMainLocationList(dataset);
  });


  // This is where your interactions with the symbol layer used to be
  // Now you have interactions with DOM markers instead
  dataset.forEach(function(marker, i) {
    // Create an img element for the marker
    var dataCount = marker.data.length;

    for (var j = 0; j < dataCount; j++) {
      // Add markers to the map at all points
      var el = document.createElement('div');
      el.dataPosition = j;
      el.id = "marker-" + j;
      el.className = 'marker';
      new mapboxgl.Marker(el, {offset: [0, -23]})
        .setLngLat(marker.data[j].coordinates)
        .addTo(map);

      el.addEventListener('click', function(e){
          // 1. Fly to the point
          flyToLocation(marker.data[this.dataPosition]);

          // 2. Close all other popups and display popup for clicked store
          createPopUp(marker.data[this.dataPosition]);

          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          var activeItem = document.getElementsByClassName('active');

          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }

          var listing = document.getElementById('listing-' + j);
          listing.classList.add('active');

      });
    }
    
  });


  function flyToLocation(currentFeature) {
    map.flyTo({
        center: currentFeature.coordinates,
        zoom: 18
      });
  }

  function createPopUp(currentLocations) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();


    var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentLocations.coordinates)
          .setHTML('<h3>'+currentLocations.comment+'</h3>' +
            '<h4>' + currentLocations.nombre + '</h4>')
          .addTo(map);
  }
  function buildMainLocationList(dataset) {
    var divAccordion = document.getElementById('accordion');
    for (i = 0; i < dataset.length; i++) {
        var ahref = document.createElement('a');         // <a>
        ahref.setAttribute('data-toggle', 'collapse');   // <a data-toggle='collapse'>
        ahref.setAttribute('href', '#acordion'+(i+1));   // <a data-toggle='collapse' href='#acordion[i]'>

        var divHeading = document.createElement('div');  // <div>
        divHeading.className = "heading";                // <div class='heading'></div>
        divHeading.innerHTML = dataset[i].titulo;        // <div class='heading'>[dataset]</div>

        ahref.appendChild(divHeading)   // <a data-toggle='collapse' href='#acordion[i]'><div class='heading'>[dataset]</div></a>

        var divCollapse = document.createElement('div');  // <div ></div>
        divCollapse.setAttribute('id', 'acordion'+(i+1))  // <div  id=acordion[i]></div>
        divCollapse.className = 'collapse';          // <div id=acordion[i] class='collapse'></div>

        
        // var divHeading = document.createElement('div');       // ORIGINAL 
        // divHeading.className = "heading";
        // var divHeadingNumber = document.createElement('div');
        // divHeadingNumber.setAttribute('id', 'heading_'+(i+1));
        // var divSubHeading = document.createElement('div');
        // divSubHeading.setAttribute('data-toggle', 'collapse');
        // divSubHeading.setAttribute('data-target', '#collapse_'+(i+1));
        // divSubHeading.setAttribute('aria-expanded', 'false');
        // divSubHeading.setAttribute('aria-controls', 'collapse_'+(i+1));
        // divSubHeading.innerHTML = dataset[i].titulo;
        // divHeadingNumber.appendChild(divSubHeading);
        // divHeading.appendChild(divHeadingNumber);

        // var divCollapse = document.createElement('div');
        // divCollapse.className = 'collapse show';
        // divCollapse.setAttribute('aria-labelledby', 'heading_'+(i+1));
        // divCollapse.setAttribute('data-parent', '#accordion');


        var dataPointCount = dataset[i].data.length;
        for (j = 0; j < dataPointCount; j++) {
            link = document.createElement('a');
            link.setAttribute('href', '#');
            link.innerHTML = dataset[i].data[j].nombre;
            divItem = document.createElement('div');
            divItem.className = "item";
            link.dataPosition = i;
            link.dataLocation = j;
            divItem.appendChild(link);
            divCollapse.appendChild(divItem);


            link.addEventListener('click', function(e) {
                // Update the currentFeature to the store associated with the clicked link
                var clickedListing = dataset[this.dataPosition].data[this.dataLocation];
                console.log(clickedListing);
                // 1. Fly to the point
                flyToLocation(clickedListing);

                // 2. Close all other popups and display popup for clicked store
                createPopUp(clickedListing);

                // 3. Highlight listing in sidebar (and remove highlight for all other listings)
                var activeItem = document.getElementsByClassName('active');

                if (activeItem[0]) {
                activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');
            });
            
        }
        divAccordion.appendChild(ahref);
        divAccordion.appendChild(divCollapse);
    } 

  }
