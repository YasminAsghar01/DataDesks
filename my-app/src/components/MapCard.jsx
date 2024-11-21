import { Typography, CardMedia, CardContent, Card, IconButton, Box} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Popover from '@mui/material/Popover';

const MapCard = (props) => {
    // Props used to trigger display and set information
    const {currentOffice, anchorEl, setAnchorEl} = props;
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Converts the office tiers to colours
    function officeColour (tier) {
        if (tier === 1) {
          return ["rgba(110,214,106, 1)","rgba(110,214,106, 0.4)"]
        }
        if (tier === 2) {
          return ["rgba(233,135,49, 1)","rgba(233,135,49, 0.4)"]
        }
        if (tier === 3) {
            return ["rgba(199, 39, 8, 1)","rgba(199, 39, 8, 0.4)"]
        }
        return ["#dadfe0","#dadfe0"]
      }


    return (
        // Creates popover with the correct data if a current office is set
        currentOffice && <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: 250 }}>
                {/* Sets card media to the office image */}
                <CardMedia
                    component="img"
                    height="100"
                    image={currentOffice.image}
                    alt="Office"
                />
                <CardContent sx={{textAlign:"center"}}>

                {/* Adds an iconbutton to close the popup */}
                <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    aria-label="close"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                
                {/* Displays the card text and graph image */}
                <Typography variant="h5" sx={{fontSize:22, fontWeight:"bold"}}>{currentOffice.name}</Typography>
                <Typography sx={{fontSize:14}}>Total Cases</Typography>
                <Typography sx={{fontSize:22, color:officeColour(currentOffice.tier)[0], fontWeight:"bold"}}>{currentOffice.cases.total}</Typography>
                <Typography sx={{fontSize:14, display:"inline-block"}}>Case Rate</Typography>
                <Typography sx={{fontSize:10, display:"inline-block", paddingLeft: "3pt"}}>(per 100,000)</Typography>
                <Typography sx={{fontSize:22, color:officeColour(currentOffice.tier)[0], fontWeight:"bold", margin:10}}>{currentOffice.cases.rate}</Typography>
                <img src={currentOffice.graph} alt="Graph"/>
                 <Box sx={{ backgroundColor: officeColour(currentOffice.tier)[1], width: "fit-content", marginX: "auto", paddingX: 10 }}>
                        <Typography 
                        sx={{ width: "fit-content", marginX: "auto", marginTop: 25, fontSize: 18, textTransform: "uppercase", color: officeColour(currentOffice.tier)[0], fontWeight: "bold", padding: 5 }}>{currentOffice.cases.risk} Risk</Typography>
                    </Box>
                </CardContent>
            </Card>
            </Popover>
        )
}

export default MapCard