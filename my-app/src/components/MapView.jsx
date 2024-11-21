import { useState } from "react";
import GlobalMap from './GlobalMap';
import MapCard from './MapCard';
import LondonOffice from "../images/london-office.png";
import WashingtonOffice from "../images/washington-office.jpg";
import EdmontonOffice from "../images/edmonton-office.png";
import IstanbulOffice from "../images/istanbul-office.jpg";
import RioOffice from "../images/rio-office.jpg";
import SydneyOffice from "../images/sydney-office.jpg";
import DubaiOffice from "../images/dubai-office.jpg";
import CapeTownOffice from "../images/capetown-office.jpg";
import GreenGraph from "../images/green-graph.png";
import OrangeGraph from "../images/orange-graph.png";
import RedGraph from "../images/red-graph.png";
import { Box } from '@mui/system'
import { Typography, CardContent, Card} from "@mui/material"
import {RiskIcon} from "./LocationCard";

// Data for office pop up cards
const offices = {
    "London Bridge": {
        "name": "London Bridge",
        "tier": 1,
        "image": LondonOffice,
        "graph": GreenGraph,
        "cases": {
            "total": 12,
            "rate": 9,
            "risk": "Low"
        }
    },
    "Washington DC": {
        "name": "Washington DC",
        "tier": 2,
        "image": WashingtonOffice,
        "graph": OrangeGraph,
        "cases": {
            "total":30,
            "rate":26,
            "risk":"Medium"
        }
    },
    "Edmonton": {
        "name": "Edmonton",
        "tier": 1,
        "image": EdmontonOffice,
        "graph": GreenGraph,
        "cases": {
            "total":17,
            "rate":10,
            "risk":"Low"
        }
    },
    "Dubai": {
        "name": "Dubai",
        "tier": 3,
        "image": DubaiOffice,
        "graph": RedGraph,
        "cases": {
            "total":73,
            "rate":66,
            "risk":"High"
        }
    },
    "Sydney": {
        "name": "Sydney",
        "tier": 1,
        "image": SydneyOffice,
        "graph": GreenGraph,
        "cases": {
            "total":3,
            "rate":1,
            "risk":"Low"
        }
    },
    "Cape Town": {
        "name": "Cape Town",
        "tier": 3,
        "image": CapeTownOffice,
        "graph": RedGraph,
        "cases": {
            "total":45,
            "rate":44,
            "risk":"High"
        }
    },
    "Rio de Janeiro": {
        "name": "Rio de Janeiro",
        "tier": 2,
        "image": RioOffice,
        "graph": OrangeGraph,
        "cases": {
            "total":18,
            "rate":13,
            "risk":"Medium"
        }
    },
    "Istanbul": {
        "name": "Istanbul",
        "tier": 3,
        "image": IstanbulOffice,
        "graph": RedGraph,
        "cases": {
            "total":52,
            "rate":48,
            "risk":"High"
        }
    }
}

const MapView = () => {
    
    // Used for opening the office pop up cards
    const [anchorEl, setAnchorEl] = useState(null);
    const [office, setOffice] = useState(null);

    const setCurrentOffice = (officeName) => {
        setOffice(offices[officeName]);
    }

    return (
        // Rendering the GlobalMap and MapCard
        <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#c5e9f9", width: "70%", border: 1, borderColor: "#DEE5E7", height: "90vh", position:"relative" }}>
        <div style={{position:"relative"}}>
          <GlobalMap clickHandler={setAnchorEl} setCurrentOffice={setCurrentOffice}/>
        </div>
        <div style={{position:"absolute", top:"50vh", left:"20vh", zIndex:1}}>
          <MapCard currentOffice={office} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </div>

        {/* Rendering the key for the map */}
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.7)', position:"absolute", top:"2vh", right:"2vh", zIndex:1, height:200, width:180}}>
            <CardContent>
                <Typography variant="h5" sx={{fontSize:22, fontWeight:"bold", textAlign:"center", marginBottom: 10}}>Key</Typography>
                <Box sx={{display:"inline-block"}}><RiskIcon risk={"low"}/></Box>
                <Typography sx={{color:"#6dd66b", display:"inline-block", padding:10}}>Low Risk</Typography> <br></br>
                <Box sx={{display:"inline-block"}}><RiskIcon risk={"medium"}/></Box>
                <Typography sx={{color:"#e8882e", display:"inline-block", padding:10}}>Medium Risk</Typography> <br></br>
                <Box sx={{display:"inline-block"}}><RiskIcon risk={"high"}/></Box>
                <Typography sx={{color:"#df1e1f", display:"inline-block", padding:10}}>High Risk</Typography>
            </CardContent>
        </Card>
        </Box>

        )
}

export default MapView