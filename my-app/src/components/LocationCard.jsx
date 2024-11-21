import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import { 
  AccessibleForward, 
  CleanHands, 
  LocalParking, 
  Monitor as MonitorIcon, 
  AddIcCall as AddIcCallIcon, 
  SafetyDivider as SafetyDividerIcon, 
  Diversity2 as Diversity2Icon, 
  VolumeDown as VolumeDownIcon 
} from '@mui/icons-material';

// Component that renders a Risk Icon based on the provided risk level
const RiskIcon = ({risk}) => {

// Initialize the colors for the inner and outer circle of the icon
  let innerColor = "rgba(217, 17, 17, 0.4)"
  let fadedColor = 'rgba(217, 17, 17, 0.4)'


// Change the colors based on the risk level
  switch(risk) {
    case "high": 
      innerColor = 'rgba(221, 17, 17, 0.4)'
      fadedColor = 'rgba(221, 17, 17, 0.9)'
      break
    case "medium":
      innerColor = 'rgba(231, 128, 33, 0.4)'
      fadedColor = 'rgba(231, 128, 33, 0.9)'
      break
    default:
      innerColor = 'rgba(99, 211, 97, 0.4)'
      fadedColor = 'rgba(99, 211, 97, 0.9)'
      break
  }

  // Render the Risk Icon with the updated colors
  return (
    <div id="outer-circle" style={{
      borderRadius: '50%', height: 25, width: 25, display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", backgroundColor: innerColor,
    }}>
      <div id="inner-circle" style={{ borderRadius: '50%', height: 15, width: 15, 
      backgroundColor: fadedColor}} >
      </div>
    </div>
  )
}

// Define custom styling for the expandable icons in each card, mainly ensure smooth transition between state changes defined by expand
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // If the expand prop is falsy, set the transform property to "rotate(0deg)" (no rotation because the card is closed), 
  // If the expand prop is truthy, set the transform property to "rotate(180deg)" (full rotation because the card is open), 
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // Set the marginLeft property to "auto", which aligns the expandable icon to the right.
  marginLeft: 'auto',
  // Define a transition effect for the transform property, with a duration based on the theme's transitions configuration.
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// This is a React component called `LocationCard`. It takes a prop called `location` which is an object containing details about a location.

const LocationCard = ({ location }) => {
  const [expanded, setExpanded] = React.useState(false); // Set the initial state of `expanded` to `false`.

  let riskColor = "rgba(217, 17, 17, 0.7)" // Set a default value for `riskColor`.

  switch (location.risk) { // Switch statement to update the `riskColor` based on the `location.risk`.
    case "high":
      riskColor = 'rgba(221, 17, 17, 0.7)'
      break
    case "medium":
      riskColor = 'rgba(231, 128, 33, 0.7)'
      break
    default:
      riskColor = 'rgba(99, 211, 97, 0.7)'
      break
  }

  const handleExpandClick = () => { // Event handler to toggle the `expanded` state whenever the expand button is clicked.
    setExpanded(!expanded);
  }

  const navigate = useNavigate(); // `useNavigate` hook for navigation to another route.

  const onReserve = () => { // Event handler for the "Make Reservation" button.
    window.scrollTo(0, 0); // Scroll to the top of the page.
    navigate("/make-reservation", { // Navigate to the "/make-reservation" route.
      state: {
        location: location, // Pass the `location` prop as state to this route.
      }} )
  }

  // The component returns a Material-UI `Card` component with details about the location. 
  // The `CardHeader` contains the name and risk level of the location, which can be expanded to show more details.
  return (
    <Card sx={{ marginTop: 15, marginBottom: 15, paddingTop: 10, paddingBottom: 10}} key={location.name}>
      <CardHeader
        sx={{paddingTop: 1, paddingBottom: 1 }}
        avatar={
          <RiskIcon risk={location.risk}/> // A custom `RiskIcon` component to display the risk level.
        }
        action={
            <ExpandMore
              expand={expanded} // Pass the `expanded` state to the `ExpandMore` component.
              aria-expanded={expanded}
              aria-label="show more"
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </ExpandMore>
        }
        title={
          !expanded ? (
          <div style={{fontSize: 16, fontWeight: 600, paddingTop: 2 }}>
            {location.name}
          </div>
          ) : (
              <div style={{ fontSize: 16, fontWeight: 500, paddingTop: 2, textTransform: "uppercase", color: riskColor}}>
                {location.risk} RISK
              </div>
          )
        }
      >
      </CardHeader>
    {/* This content is shown/collapsed based on the state of expanded, automatically updates thanks to the hook */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ paddingTop: 1, marginTop: 10, }}>
          <div style={{paddingLeft: 17}}>
            <div style={{ fontSize: 16, fontWeight: 600, }}>
              {location.name}
            </div>
            <div style={{ fontSize: 14, fontWeight: 400, }}>
              {location.postal}
            </div>
          </div>
          <div style={{ paddingLeft: 17, marginTop: 15 }}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <GroupsIcon size={"small"} sx={{marginRight: 10, color: "#696969"}}/>
              <div style={{fontSize: 13, fontWeight: 300, textTransform: "capitalize"}}>{location.capacity}</div>
              {/* Row of icons to show which facilities are available in each office, only shown if available in the office */}
              <div style={{marginLeft: 32}}>
                <AccessibleForward size={"small"} sx={{ marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("wheelchair access") ? 'inline' : 'none' }}/>
                <LocalParking size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("parking") ? 'inline' : 'none'
                }} />
                <CleanHands size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("cleaning") ? 'inline' : 'none'
                }} />
                <MonitorIcon size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("monitor") ? 'inline' : 'none'
                }} />
                <AddIcCallIcon size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("phone") ? 'inline' : 'none'
                }} /> 
                <SafetyDividerIcon size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("privacy-booth") ? 'inline' : 'none'
                }} />
                <Diversity2Icon size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("colloboration") ? 'inline' : 'none'
                }} />
                <VolumeDownIcon size={"small"} sx={{
                  marginRight: 5, color: "#696969", height: 17, width: 17, marginTop: 5,
                  display: location.facilities.includes("quiet") ? 'inline' : 'none'
                }} />
              </div>
            </div>
          </div>
          <div style={{marginLeft: 15, marginRight: 20}}>
            {/* onClick function activates the router navigation to the view available reservation times page */}
            <Button variant="outlined" onClick={onReserve} fullWidth disabled={location.risk === "high"}
              sx={{ marginTop: 20, textTransform: "capitalize", fontWeight: 600, fontSize: 16, color: "#2B50D0" }}>
              Make Reservation
            </Button>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export {RiskIcon, LocationCard};