  var sidebar = document.querySelector('.sidebar');
  var x = document.querySelector('.x');
  
  // toggle menu position 
  function hide() {
    sidebar.classList.toggle('cierra');
    x.classList.toggle('cierrax');
  }

  
  
  // "responsive" Menu
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

    // CODIGO DE MUESTRA - BORRAR TODO HASTA LA PROXIMA MARCA
    
    map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [-58.3723304,-34.6124882],
              [-58.3705708,-34.6123734],
              [-58.3707425,-34.6136008],
              [-58.3707103,-34.6148105],
              [-58.3706138,-34.61587],
              [-58.3715579,-34.615923],
              [-58.3717403,-34.6160731],
              [-58.3716866,-34.6171856],
              [-58.3698735,-34.6171503],
              [-58.369734,-34.6173357],
              [-58.3695516,-34.6177065],
              [-58.3697447,-34.6177595],
              [-58.3716545,-34.6178743],
              [-58.3715901,-34.6184747],
              [-58.3723089,-34.6185012],
              [-58.3722338,-34.6191104],
              [-58.3715472,-34.6190839],
              [-58.3714292,-34.6206555],
              [-58.3700237,-34.6206379],
              [-58.3699271,-34.6209557],
              [-58.369852,-34.6213972],
              [-58.3697876,-34.6217238],
              [-58.3713648,-34.6218298],
              [-58.3713111,-34.6223242],
              [-58.3712682,-34.623057],
              [-58.371236,-34.6236485],
              [-58.3711824,-34.6242047],
              [-58.3711073,-34.6247698],
              [-58.3710429,-34.6253172],
              [-58.3710322,-34.6254849],
              [-58.3707103,-34.6256615],
              [-58.370603,-34.6256085],
              [-58.3704206,-34.6257498],
              [-58.3703026,-34.6258822],
              [-58.3700022,-34.6260234],
              [-58.3699164,-34.6260941],
              [-58.3696482,-34.6263236],
              [-58.3695838,-34.6264384],
            ]
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#888",
        "line-width": 8
      }
    });


  });  // BORRAR ESTO 


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
      el.className = "marker" + " " + marker.data[j].class;
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


    var popup = new mapboxgl.Popup({closeOnClick: true})
          .setLngLat(currentLocations.coordinates)
          .setHTML('<center><h3>'+currentLocations.comment+'</h3>' +
            '<h4>' + currentLocations.nombre + '</h4>' +
            '<h5><a href="'+ currentLocations.links_maps +'" target="_blank">Ver recorrido</a></h5></center>')
          .addTo(map);
  }
  function buildMainLocationList(dataset) {
    var divAccordion = document.getElementById('accordion');
    var loader = document.getElementById("loading");
    loader.style.display = "none";

    for (i = 0; i < dataset.length; i++) {
        var ahref = document.createElement('a');         // <a>
        ahref.setAttribute('data-toggle', 'collapse');   // <a data-toggle='collapse'>
        ahref.setAttribute('href', '#acordion'+(i+1));   // <a data-toggle='collapse' href='#acordion[i]'>

        var divHeading = document.createElement('div');  // <div>
        divHeading.className = "heading";                // <div class='heading'></div>
        divHeading.innerHTML = dataset[i].titulo;        // <div class='heading'>[dataset]</div>

        ahref.appendChild(divHeading)   // <a data-toggle='collapse' href='#acordion[i]'><div class='heading'>[dataset]</div></a>

        // <div class="onoff">
        //   <small>'on / off'</small>
        //   <label class="switch">
        //     <input type="checkbox">
        //     <span class="slider round"></span>
        //   </label>
        // </div>

        var onoff = document.createElement('div');  // div 
        onoff.className = "onoff";                  // div class onoff

        var small = document.createElement('small');
        small.innerHTML = 'on / off ';

        var labelSw = document.createElement('label');
        labelSw.className = 'switch';

        var inputCheck = document.createElement('input');
        inputCheck.setAttribute('type', 'checkbox');
        inputCheck.className = dataset[i].heading_class;
        inputCheck.setAttribute('onchange', 'hide_markers("' + dataset[i].heading_class + '")');  //No puedo hacer que la variable dataset[i].heading_class se ejecute en 

        var spanCheck = document.createElement('span');
        spanCheck.className = 'slider round';
        
        labelSw.appendChild(inputCheck);
        labelSw.appendChild(spanCheck);
        onoff.appendChild(small);
        onoff.appendChild(labelSw);

        var divCollapse = document.createElement('div');  // <div ></div>
        divCollapse.setAttribute('id', 'acordion'+(i+1))  // <div  id=acordion[i]></div>
        divCollapse.className = 'collapse';          // <div id=acordion[i] class='collapse'></div>


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
        divAccordion.appendChild(onoff);
        divAccordion.appendChild(divCollapse);
    } 

  }

function loading() {
  var loader = getElementById("loading");
  loader.classList.remove("loading");
}

// Hide markers
function hide_markers(data_hide) {
  console.log(data_hide);
  data_hide.classList.toggle('marker_hide');
}