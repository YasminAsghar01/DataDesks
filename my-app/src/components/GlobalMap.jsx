import React, {useState} from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker} from "react-simple-maps";
//import countryData from "../db.json" // For colouring the map


const geoUrl = // Used to render the map
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"

//Converts tiers to hex codes
function officeColour (tier) { 
  if (tier === 3) {
    return "#df1e1f"
  }
  if (tier === 2) {
    return "#e8882e"
  }
  if (tier === 1) {
    return "#6dd66b"
  }
  return "#dadfe0"
}

// Hardcode the office marker coordinates on the map
const markers = [
  {
    markerOffset: -30,
    name: "London Bridge",
    coordinates: [0, 51],
    tier: 1
  },
  {
    markerOffset: -30,
    name: "Washington DC",
    coordinates: [-80, 35],
    tier: 2
  },
  {
    markerOffset: -30,
    name: "Edmonton",
    coordinates: [-112, 52],
    tier: 1
  },
  {
    markerOffset: -30,
    name: "Sydney",
    coordinates: [150, -33],
    tier: 1
  },
  {
    markerOffset: -30,
    name: "Cape Town",
    coordinates: [19, -33],
    tier: 3
  },
  {
    markerOffset: -30,
    name: "Rio de Janeiro",
    coordinates: [-43, -22],
    tier: 2
  },
  {
    markerOffset: -30,
    name: "Dubai",
    coordinates: [55, 25],
    tier: 3
  },
  {
    markerOffset: -30,
    name: "Istanbul",
    coordinates: [30, 40],
    tier: 3
  }
]

const mapWidth = 800;
const mapHeight = 600;

const GlobalMap = (props) => {

  // Used to open pop up cards when clicking the marker
  const { clickHandler, setCurrentOffice} = props;  

  const handleMarkerClick = (ev, officeName) => {

    setCurrentOffice(officeName);
    clickHandler(ev.currentTarget);

  };

  const [highlightedMarker, setHighlightedMarker] = useState(null);
  
  // Code for Colouring each country a different colour
  // const [countries, setCountries] = useState([])

  // const getData = () => {
  //   setCountries(countryData.countries);
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div>
      <ComposableMap
        width={mapWidth}
        height={mapHeight}
      >
        <ZoomableGroup
          translateExtent={[
            [0, 0],
            [mapWidth, mapHeight]
          ]}
        >
          <Geographies geography={geoUrl}>
            {({geographies}) =>
              geographies.map((geo, index) => {
                // Renders each country on the map
                //const ISOs = countries.find((country) => country.code === geo.properties["Alpha-2"])
                return (
                  <Geography
                    key={index}
                    geography={geo}
                    fill="#faf7ed"
                    stroke='#e8e5da'
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}/>
                )
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, tier}) => ( // Draws the markers
            // Sets marker to change colour when hovering
            // Clicking the marker calls a function that opens the pop up card
            <Marker 
              key={name}
              coordinates={coordinates} 
              onClick={(e) => { handleMarkerClick(e, name)}}
              onMouseEnter={() => setHighlightedMarker(name)}
              onMouseLeave={() => setHighlightedMarker(null)}
            >
              <g // Draws the pin
                fill="#ffffff"
                fillOpacity={0}
                stroke={highlightedMarker === name ? "#000" : officeColour(tier)}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text // Draws the text above the marker which changes coloured when hovered
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontFamily: "system-ui",
                  fill: highlightedMarker === name ? "#000" : "#5D5A6D",
                  fontWeight: highlightedMarker === name ? "bold" : "normal",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default GlobalMap;
