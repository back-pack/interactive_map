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
    center: [-58.4649283, -34.6278461],
    // initial zoom
    zoom: 10,
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

  var stores = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -34.6321032,
            -38.6422027
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 234-7336",
          "phone": "2022347336",
          "address": "1471 P St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 15th St NW",
          "postalCode": "20005",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.049766,
            38.900772
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 507-8357",
          "phone": "2025078357",
          "address": "2221 I St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 22nd St NW",
          "postalCode": "20037",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043929,
            38.910525
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 387-9338",
          "phone": "2023879338",
          "address": "1512 Connecticut Ave NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at Dupont Circle",
          "postalCode": "20036",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.0672,
            38.90516896
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 337-9338",
          "phone": "2023379338",
          "address": "3333 M St NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 34th St NW",
          "postalCode": "20007",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.002583742142,
            38.887041080933
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 547-9338",
          "phone": "2025479338",
          "address": "221 Pennsylvania Ave SE",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "btwn 2nd & 3rd Sts. SE",
          "postalCode": "20003",
          "state": "D.C."
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -76.933492720127,
            38.99225245786
          ]
        },
        "properties": {
          "address": "8204 Baltimore Ave",
          "city": "College Park",
          "country": "United States",
          "postalCode": "20740",
          "state": "MD"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.097083330154,
            38.980979
          ]
        },
        "properties": {
          "phoneFormatted": "(301) 654-7336",
          "phone": "3016547336",
          "address": "4831 Bethesda Ave",
          "cc": "US",
          "city": "Bethesda",
          "country": "United States",
          "postalCode": "20814",
          "state": "MD"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.359425054188,
            38.958058116661
          ]
        },
        "properties": {
          "phoneFormatted": "(571) 203-0082",
          "phone": "5712030082",
          "address": "11935 Democracy Dr",
          "city": "Reston",
          "country": "United States",
          "crossStreet": "btw Explorer & Library",
          "postalCode": "20190",
          "state": "VA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.10853099823,
            38.880100922392
          ]
        },
        "properties": {
          "phoneFormatted": "(703) 522-2016",
          "phone": "7035222016",
          "address": "4075 Wilson Blvd",
          "city": "Arlington",
          "country": "United States",
          "crossStreet": "at N Randolph St.",
          "postalCode": "22203",
          "state": "VA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.28784,
            40.008008
          ]
        },
        "properties": {
          "phoneFormatted": "(610) 642-9400",
          "phone": "6106429400",
          "address": "68 Coulter Ave",
          "city": "Ardmore",
          "country": "United States",
          "postalCode": "19003",
          "state": "PA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.20121216774,
            39.954030175164
          ]
        },
        "properties": {
          "phoneFormatted": "(215) 386-1365",
          "phone": "2153861365",
          "address": "3925 Walnut St",
          "city": "Philadelphia",
          "country": "United States",
          "postalCode": "19104",
          "state": "PA"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043959498405,
            38.903883387232
          ]
        },
        "properties": {
          "phoneFormatted": "(202) 331-3355",
          "phone": "2023313355",
          "address": "1901 L St. NW",
          "city": "Washington DC",
          "country": "United States",
          "crossStreet": "at 19th St",
          "postalCode": "20036",
          "state": "D.C."
        }
      }]
    };
  // This adds the data to the map
  map.on('load', function (e) {
    // This is where your '.addLayer()' used to be, instead add only the source without styling a layer
    map.addSource("places", {
      "type": "geojson",
      "data": stores
    });
    // Initialize the list
    buildLocationList(stores);
    buildMainLocationList(dataset);
  });


  // This is where your interactions with the symbol layer used to be
  // Now you have interactions with DOM markers instead
  stores.features.forEach(function(marker, i) {
    // Create an img element for the marker
    var el = document.createElement('div');
    el.id = "marker-" + i;
    el.className = 'marker';
    // Add markers to the map at all points
    new mapboxgl.Marker(el, {offset: [0, -23]})
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

    el.addEventListener('click', function(e){
        // 1. Fly to the point
        flyToStore(marker);

        // 2. Close all other popups and display popup for clicked store
        createPopUp(marker);

        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('active');

        e.stopPropagation();
        if (activeItem[0]) {
           activeItem[0].classList.remove('active');
        }

        var listing = document.getElementById('listing-' + i);
        listing.classList.add('active');

    });
  });


  function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.coordinates,
        zoom: 15
      });
  }

  function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();


    var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentFeature.coordinates)
        //   .setHTML('<h3>Sweetgreen</h3>' +
        //     '<h4>' + currentFeature.properties.address + '</h4>')
          .addTo(map);
  }
  function buildMainLocationList(dataset) {
    var divAccordion = document.getElementById('accordion');
    for (i = 0; i < dataset.length; i++) {
        var divHeading = document.createElement('div');
        divHeading.className = "heading";
        var divHeadingNumber = document.createElement('div');
        divHeadingNumber.setAttribute('id', 'heading_'+(i+1));
        var divSubHeading = document.createElement('div');
        divSubHeading.setAttribute('data-toggle', 'collapse');
        divSubHeading.setAttribute('data-target', '#collapse_'+(i+1));
        divSubHeading.setAttribute('aria-expanded', 'false');
        divSubHeading.setAttribute('aria-controls', 'collapse_'+(i+1));
        divSubHeading.innerHTML = dataset[i].titulo;
        divHeadingNumber.appendChild(divSubHeading);
        divHeading.appendChild(divHeadingNumber);

        var divCollapse = document.createElement('div');
        divCollapse.className = 'collapse show';
        divCollapse.setAttribute('aria-labelledby', 'heading_'+(i+1));
        divCollapse.setAttribute('data-parent', '#accordion');
        var dataPointCount = dataset[i].data.length;
        for (j = 0; j < dataPointCount; j++) {
            link = document.createElement('a');
            link.setAttribute('href', '#');
            link.innerHTML = dataset[i].data[j].nombre;
            divItem = document.createElement('div');
            divItem.className = "item";
            link.dataPosition = i;
            divItem.appendChild(link);
            divCollapse.appendChild(divItem);


            link.addEventListener('click', function(e) {
                // Update the currentFeature to the store associated with the clicked link
                var clickedListing = dataset[this.dataPosition].data;

                // 1. Fly to the point
                flyToStore(clickedListing);

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
        divAccordion.appendChild(divHeading);
        divAccordion.appendChild(divCollapse);
    } 

  }

  function buildLocationList(data) {
    console.log(dataset);

    for (i = 0; i < data.features.length; i++) {
      var currentFeature = data.features[i];
      var prop = currentFeature.properties;

      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = "listing-" + i;

      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.address;

      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = prop.city;
      if (prop.phone) {
        details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      }



      link.addEventListener('click', function(e){
        // Update the currentFeature to the store associated with the clicked link
        var clickedListing = data.features[this.dataPosition];

        // 1. Fly to the point
        flyToStore(clickedListing);

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
  }