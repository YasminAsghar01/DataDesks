import React from 'react'
import Sidebar from './Sidebar'
import { Box } from '@mui/system'
import MapView from './MapView';

// This is a React component which renders the homepage, consisting of the Sidebar and Map component.
const Home = () => {
  return (
    <div style={{marginLeft: 10}}>
      <div style={{marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37}}>
        <h1 style={{fontWeight: 900, fontSize: 30, marginBottom: 0}}>DataDesk Interactive Map</h1>
        <p style={{marginTop: 0}}>View available office locations on a global scale. Zoom in for more local data.</p>
      </div>
    
      <Box sx={{ display: "flex", paddingLeft: 4, paddingRight: 4, flexDirection: "flex-col", marginTop: 5, marginX: 25 }}>
        <Sidebar />
        <MapView />
      </Box>

    </div>
  )
}

export default Home
