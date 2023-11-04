require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/geometry/geometryEngine",
    "esri/layers/FeatureLayer",
    "esri/widgets/FeatureTable/Grid/support/ButtonMenu",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/AreaMeasurement3D",
    "esri/widgets/LineOfSight",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Compass"
  ], function(esriConfig, Map, SceneView, geometryEngine, FeatureLayer, ButtonMenu, Expand, BasemapGallery, AreaMeasurement3D, LineOfSight, LayerList, Legend, Compass) {
  
    // Set the ArcGIS API for JavaScript API key
    esriConfig.apiKey = "AAPKb6723de7d64b410ca4b3106297567589haGVc4dtuVBzVw1isFbYLznf9QbiJJ27VVkAZruKb0Y3N91W2kBNUn268t7DvYPC";
  
    // Create a map with a specified basemap and ground
    const map = new Map({
      basemap: "arcgis/topographic",
      ground: "world-elevation",
    });
  
    // Create a SceneView for the map
    const view = new SceneView({
      container: "viewDiv",
      map: map,
      camera: {
        position: {
          x: -118.808, // Longitude
          y: 33.961,   // Latitude
          z: 2000      // Meters
        },
        tilt: 75
      }
    });
  
    // Define a pop-up template for Trailheads
    const popupTrailheads = {
      "title": "Trailhead",
      "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }
  
    // Create a FeatureLayer for Trailheads and add it to the map
    const trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
      popupTemplate: popupTrailheads
    });
    map.add(trailheads);
  
    // Define a pop-up template for Trails
    const popupTrails = {
      title: "Trail Information",
      content: [{
        type: "media",
        mediaInfos: [{
          type: "column-chart",
          caption: "",
          value: {
            fields: [ "ELEV_MIN","ELEV_MAX" ],
            normalizeField: null,
            tooltipField: "Min and max elevation values"
          }
        }]
      }]
    }
  
    // Create a FeatureLayer for Trails and add it to the map
    const trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","ELEV_GAIN"],
      popupTemplate: popupTrails
    });
    map.add(trails, 0);
  
    // Create a BasemapGallery widget instance
    const basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div")
    });
  
    // Create an Expand instance for the BasemapGallery
    const bgExpand = new Expand({
      view: view,
      content: basemapGallery
    });
  
    // Create an AreaMeasurement3D widget instance
    const measurementWidget = new AreaMeasurement3D({
      view: view
    });
  
    // Create an Expand instance for the AreaMeasurement3D widget
    const areaExpand = new Expand({
      view: view,
      content: measurementWidget
    });
  
    // Create a LineOfSight widget instance
    const lineOfSight = new LineOfSight({
      view: view
    });
  
    // Create an Expand instance for the LineOfSight widget
    const lineOfSightExpand = new Expand({
      view: view,
      content: lineOfSight
    });
  
    // Create a LayerList widget instance
    const layerList = new LayerList({
      view: view
    });
  
    // Create an Expand instance for the LayerList widget
    const layerListExpand = new Expand({
      expandIconClass: "esri-icon-layer-list",
      view: view,
      content: layerList
    });
  
    // Create a Legend widget instance
    const legend = new Legend({
      view: view
    });
  
    // Create an Expand instance for the Legend widget
    const legendExpand = new Expand({
      expandIconClass: "esri-icon-legend",
      view: view,
      content: legend
    });
  
    // Create a Compass widget instance
    const compass = new Compass({
      view: view
    });
  
    // Create an Expand instance for the Compass widget
    const compassExpand = new Expand({
      view: view,
      content: compass
    });
  
    // Create a ButtonMenu with click functions to toggle widget visibility
    const buttonMenu = new ButtonMenu({
      items: [
        {
          label: "Basemap",
          iconClass: "esri-icon-basemap",
          clickFunction: function () {
            if (bgExpand.expanded) {
              bgExpand.collapse();
            } else {
              bgExpand.expand();
            }
          }
        },
        {
          label: "Area Measurement",
          iconClass: "esri-icon-measure-area",
          clickFunction: function () {
            if (areaExpand.expanded) {
              areaExpand.collapse();
            } else {
              areaExpand.expand();
            }
          }
        },
        {
          label: "Line of Sight",
          iconClass: "esri-icon-line-of-sight",
          clickFunction: function () {
            if (lineOfSightExpand.expanded) {
              lineOfSightExpand.collapse();
            } else {
              lineOfSightExpand.expand();
            }
          }
        },
        {
          label: "Layer List",
          iconClass: "esri-icon-layer-list",
          clickFunction: function () {
            if (layerListExpand.expanded) {
              layerListExpand.collapse();
            } else {
              layerListExpand.expand();
            }
          }
        },
        {
          label: "Legend",
          iconClass: "esri-icon-legend",
          clickFunction: function () {
            if (legendExpand.expanded) {
              legendExpand.collapse();
            } else {
              legendExpand.expand();
            }
          }
        },
        {
          label: "Compass",
          iconClass: "esri-icon-compass",
          clickFunction: function () {
            if (compassExpand.expanded) {
              compassExpand.collapse();
            } else {
              compassExpand.expand();
            }
          }
        }
      ]
    });
  
    // Add widgets and button menu to the view's user interface
    view.ui.add([bgExpand, areaExpand, lineOfSightExpand, layerListExpand, legendExpand, compassExpand], "top-right");
    view.ui.add(buttonMenu, "top-right");
  
    // Define the pop-up content for displaying coordinates and a zoom button
    view.on("click", function (event) {
      const coordinates = view.toMap({ x: event.x, y: event.y });
      const latitude = coordinates.latitude.toFixed(6);
      const longitude = coordinates.longitude.toFixed(6);
      const elevation = coordinates.z.toFixed(2);
  
      const customPopup = document.getElementById("customPopup");
      const table = `
        <table>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Elevation</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>${latitude}</td>
            <td>${longitude}</td>
            <td>${elevation}</td>
            <td><button class="popup-button" id="zoomButton"><calcite-icon aria-hidden="true" icon="magnifying-glass-plus" scale="s"></calcite-icon></button></td>
          </tr>
        </table>
      `;
      customPopup.innerHTML = table;
  
      customPopup.style.left = event.x + "px";
      customPopup.style.top = event.y + "px";
      customPopup.style.display = "block";
  
      const zoomButton = document.getElementById("zoomButton");
      zoomButton.addEventListener("click", function () {
        zoomToPoint(coordinates.longitude, coordinates.latitude);
      });
    });
  
    // Function to zoom to a clicked point
    function zoomToPoint(longitude, latitude) {
      view.goTo({
        target: [longitude, latitude],
        zoom: 20,
      });
    }
  
    // Create Legend and LayerList widgets
    const legend1 = new Legend({
      view: view,
    });
  
    const layerList1 = new LayerList({
      view: view,
    });
  
    // Add Legend and LayerList widgets to the view
    // Initially, set their visibility to false
    view.ui.add(legend1, { position: "bottom-left", index: 0 });
    view.ui.add(layerList1, { position: "bottom-left", index: 0 });
    legend1.visible = false;
    layerList1.visible = false;
  
    // Event listeners for Legend and LayerList buttons
    const legendButton = document.getElementById("legend-button");
    const layerListButton = document.getElementById("layer-list-button");
  
    legendButton.addEventListener("click", () => {
      if (legend1.visible) {
        legend1.visible = false;
      } else {
        legend1.visible = true;
        layerList1.visible = false;
      }
    });
  
    layerListButton.addEventListener("click", () => {
      if (layerList1.visible) {
        layerList1.visible = false;
      } else {
        layerList1.visible = true;
        legend1.visible = false;
      }
    });
  });
  