import React from 'react'
import { useState } from 'react'
import { ClickAwayListener, Breadcrumbs, Link, Typography, Box, Divider, 
  CardHeader, Card, CardContent, TextField, InputAdornment, 
  ButtonGroup, Button, Popper, Grow, Paper, MenuList, MenuItem, IconButton } from '@mui/material'
import { InfoOutlined, Search, ArrowDropDown } from '@mui/icons-material'

// This is an array of reservations, with each object containing information about a reservation
const reservations = [
  {
  // Reservation date in DD/MM/YYYY format
  date: '24/11/2022',
  // Object with reservation start and end times and timezone
  time: {
  startTime: '09:00',
  endTime: '17:00',
  timezone: "Europe/London"
  },
  // Reserved seat location
  seat: "11A.13",
  // Location of reservation
  location: "11th Floor, London Bridge, United Kingdom",
  // Name of the reservation owner
  owner: "Elina Gilbert",
  // Status of the reservation
  status: "Cancelled"
  },
  {
    date: '12/03/2022',
    time: {
      startTime: '13:00',
      endTime: '20:30',
      timezone: "Europe/London"
    },
    seat: "6F.23",
    location: "6th Floor, London Bridge, United Kingdom",
    owner: "Sam Thompson",
    status: "Complete"
  },
  {
    date: '02/02/2022',
    time: {
      startTime: '09:00',
      endTime: '16:00',
      timezone: "Europe/London"
    },
    seat: "10C.12",
    location: "10th Floor, London Bridge, United Kingdom",
    owner: "Sarah Tancredi",
    status: "Pending"
  },
  {
    date: '02/02/2023',
    time: {
      startTime: '09:00',
      endTime: '16:00',
      timezone: "Europe/France"
    },
    seat: "10A.12",
    location: "10th Floor, Pl. Charles de Gaulle, Paris, France",
    owner: "Elina Gilbert",
    status: "Cancelled"
  },
  {
    date: '02/02/2023',
    time: {
      startTime: '09:00',
      endTime: '16:00',
      timezone: "Europe/Netherlands"
    },
    seat: "7C.12",
    location: "7th Floor, 1Haringpakkerssteeg 3, 1012 LR Amsterdam, Netherlands",
    owner: "Elina Gilbert",
    status: "Complete"
  },
  {
    date: '15/07/2022',
    time: {
      startTime: '11:00',
      endTime: '14:00',
      timezone: "Europe/London"
    },
    seat: "6D.17",
    location: "6th Floor, Manchester, United Kingdom",
    owner: "John Smith",
    status: "Pending"
  },
  {
    date: '08/10/2022',
    time: {
      startTime: '09:30',
      endTime: '17:30',
      timezone: "Asia/Dubai"
    },
    seat: "3F.07",
    location: "3rd Floor, Dubai, United Arab Emirates",
    owner: "Fatima Ali",
    status: "Complete"
  },
  {
    date: '20/05/2023',
    time: {
      startTime: '14:00',
      endTime: '19:00',
      timezone: "North America/Toronto"
    },
    seat: "2C.01",
    location: "2nd Floor, Toronto, Canada",
    owner: "Michael Scofield",
    status: "Pending"
  },
  {
    date: '04/12/2022',
    time: {
      startTime: '10:00',
      endTime: '15:00',
      timezone: "South America/Buenos_Aires"
    },
    seat: "11B.15",
    location: "11th Floor, Buenos Aires, Argentina",
    owner: "Tabassum Bhola",
    status: "Cancelled"
  },
  {
    date: '31/08/2023',
    time: {
      startTime: '12:00',
      endTime: '18:00',
      timezone: "Europe/Edinburgh"
    },
    seat: "8A.10",
    location: "8th Floor, Edinburgh, Scotland",
    owner: "David Anderson",
    status: "Pending"
  },
  {
    date: '27/11/2022',
    time: {
      startTime: '13:30',
      endTime: '19:30',
      timezone: "Australia/Sydney"
    },
    seat: "4E.22",
    location: "4th Floor, Sydney, Australia",
    owner: "Grace Lee",
    status: "Complete"
  },
  {
    date: '17/09/2023',
    time: {
      startTime: '10:30',
      endTime: '16:30',
      timezone: "North America/Luisiana"
    },
    seat: "5D.09",
    location: "5th Floor, Luisiana, United States of America",
    owner: "William Clark",
    status: "Pending"
  },
  {
    date: '22/02/2023',
    time: {
      startTime: '09:00',
      endTime: '16:00',
      timezone: "Europe/Reykjavik"
    },
    seat: "10B.11",
    location: "10th Floor, Reykjavik, Iceland",
    owner: "Oliver Wilson",
    status: "Complete"
  },
  {
    date: '09/01/2023',
    time: {
      startTime: '11:30',
      endTime: '15:30',
      timezone: "Europe/Reykjavik"
    },
    seat: "6C.03",
    location: "6th Floor, Reykjavik, Iceland",
    owner: "Oliver Wilson",
    status: "Complete"
  },
  {
    date: '15/06/2022',
    time: {
    startTime: '10:00',
    endTime: '18:00',
    timezone: "Australia/Sydney"

    },
    seat: "3D.15",
    location: "3rd Floor, Geelong, Australia",
    owner: "Mia Johnson",
    status: "Pending"
    }
  
]

// This function filters reservations based on a given query, data, and ownerfilter
const filterData = (query, data, filterOwner) => {
  let temp = data

  // If there's no query and filterOwner is "All", return the original data
  if (!query && filterOwner==="All") {
    return temp;
  }
  // If there's no query but filterOwner is not "All", filter data based on owner
  else if (!query && filterOwner!== "All") {
    if (filterOwner === "Reserved for me") return temp.filter(d => d.owner === "Elina Gilbert")
    if (filterOwner === "Reserved for others") return temp.filter(d => d.owner !== "Elina Gilbert") 
  }
  // If there's a query, filter data based on query and owner filter
  else {
    // If filterOwner is "Reserved for me", filter data owned by "Elina Gilbert"
    if (filterOwner === "Reserved for me") temp = temp.filter(d => d.owner === "Elina Gilbert")
    // If filterOwner is "Reserved for others", filter data not owned by "Elina Gilbert"
    if (filterOwner === "Reserved for others") temp = temp.filter(d => d.owner !== "Elina Gilbert") 
    // Return data that matches the query in any of the specified properties
    return temp.filter((d) => d.date.toLowerCase().includes(query.toLowerCase())
      || d.seat.toLowerCase().includes(query.toLowerCase())
      || d.location.toLowerCase().includes(query.toLowerCase())
      || d.owner.toLowerCase().includes(query.toLowerCase())
      || d.status.toLowerCase().includes(query.toLowerCase()));
  }
}

// This is a functional component called SearchBar that takes in a prop called setSearchQuery.
const SearchBar = ({ setSearchQuery }) => (
  <Box sx={{ marginTop: 7, marginBottom: 10, marginRight: 20 }}>
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
             <hr style={{height: "38px", width: 0, marginTop: 0, marginBottom: 0, borderLeft: 0,
            borderTop: 0, borderBottom: 0, borderColor: 'rgba(0, 0, 0, 0.4)'}}/>
              <IconButton size="small" aria-label="search-button" sx={{ color: "#696969", borderRight: 'black', marginLeft: 4 }}>
                <Search sx={{height: 18, width: 18}}/>
              </IconButton>
            </InputAdornment>
          </>
        ),
        sx: {
          backgroundColor: "white",
          width: 350,
          paddingRight: 5,
          color: 'rgba(0, 0, 0, 0.7)'
        },
      }}
      id="search-bar"
      className="text"
      // Whenever there is a change in the searchbar it automatically updates the parameter (and running) of the filterData method, updating search results
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      placeholder="Search my reservations"
      size="small"
      sx={{ color: 'rgba(0, 0, 0, 0.7)'}}
    >
    </TextField>
  </Box>
)

// Component for rendering a split button with options to select from
// options: array of strings, the options to be displayed in the menu
// setFilterOwner: function to set the selected option as the filter owner
const SplitButton = ({ options, setFilterOwner }) => {
  // state for managing the open/close state of the menu
  const [open, setOpen] = React.useState(false);
  // reference to the anchor element of the button group
  const anchorRef = React.useRef(null);
  // state for managing the selected index of the options
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // handler for when the main button is clicked
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  // handler for when a menu item is clicked
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setFilterOwner(options[index])
    setOpen(false);
  };

  // handler for toggling the menu open/closed
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // handler for closing the menu
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        {/* button displaying the selected option */}
        <Button onClick={handleClick} sx={{ textTransform: "capitalize", color: 'rgba(0, 0, 0, 0.7)', borderColor: 'rgba(0, 0, 0, 0.4)'}}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{borderColor: 'rgba(0, 0, 0, 0.4)'}}
        >
          <ArrowDropDown sx={{ color: 'rgba(0, 0, 0, 0.4)'}}/>
        </Button>
      </ButtonGroup>
      {/* menu component */}
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
              {/* map over options to create menu items */}
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      sx={{textTransform: "capitalize"}}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

// Define a functional component named ReservationCard which accepts a prop called dataFiltered
// Used to display each reservation in the list that meets the current filtered requirements (uses dataFiltered)
const ReservationCard = ({ dataFiltered }) => ( 
  <Box sx={{ overflowY: "scroll", minHeight: '55vh' }}>
    {/* Check if the length of dataFiltered array is greater than 0, If yes, map over dataFiltered and return a Card for each element */}
    {dataFiltered.length > 0 ? dataFiltered.map((r) => ( 
      // Define a Card component with key property set to the seat value of the current element in the loop, and apply some styles using sx prop
      <Card key={r.seat} sx={{
        marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 30,
        borderColor: "#DEE5E7"
      }}>
        <CardHeader
          title={
            <Typography sx={{ color: "white", fontSize: 20, fontWeight: 600, marginLeft: 10 }}>
              {r.date}
            </Typography>}
          subheader={
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <InfoOutlined sx={{ color: 'white', height: 18, width: 18, marginRight: 5, marginLeft: 10 }} />
              <Typography style={{ color: "white" }}>
                Time shown based on office location
              </Typography>
            </Box>
          }
          sx={{ backgroundColor: "#2D5592" }}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginRight: 120, marginLeft: 20 }}>
            <div style={{width: 310}}>
              <Typography color="initial" sx={{ fontWeight: 700, fontSize: 18 }}>{r.seat}</Typography>
              <Typography color="initial" sx={{ fontWeight: 400, fontSize: 15 }}>{r.location}</Typography>
            </div>
            <div style={{ width: 200 }}>
              <Typography color="initial" sx={{ fontWeight: 700, fontSize: 18 }}>{r.time.startTime}-{r.time.endTime}</Typography>
              <Typography color="initial" sx={{ fontWeight: 400, fontSize: 15 }}>{r.time.timezone}</Typography>
            </div>
            <Typography color="initial" sx={{ fontWeight: 700, fontSize: 18, width: 150 }}>{r.owner}</Typography>
            <Typography color="initial" sx={{ fontWeight: 700, fontSize: 18, width: 25 }}>{r.status}</Typography>
          </Box>
        </CardContent>
      </Card>
    )) :
      (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '33vh', width: 'fit-content' }}>No results shown</div> // If dataFiltered is empty, show a message saying "No results shown"
      )}
  </Box>
)

const Reservations = () => {

  const [searchQuery, setSearchQuery] = useState("") // Set the initial search query state to an empty string
  const [filterOwner, setFilterOwner] = useState("All") // Set the initial filter owner state to "All"

  // Filter the reservations data based on search query and filter owner states
  // Passed into the other components and is updated whenever there is a change in any of the arguments passed in
  const dataFiltered = filterData(searchQuery, reservations, filterOwner); 

  const options = ['All', 'Reserved for me', 'Reserved for others']; // Define options for filter owner

  return (
    <>
      <div style={{
        display: "flex", flexDirection: "row", alignContent: "center", paddingTop: 20, paddingBottom: 20,
        backgroundColor: "#F0F3F4"
      }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginLeft: 45 }}>
          {/* Redirects back to homepage */}
          <Link underline="hover" color="#2D5592" href="/" sx={{ fontSize: 15 }}>
            Home
          </Link>
          <Typography color="#2e2e2e" sx={{ fontWeight: 600, fontSize: 15 }}>My Reservations</Typography>
        </Breadcrumbs>
      </div>
      <Box sx={{ border: 1, borderColor: "#D4D4D4", marginTop: 30, marginLeft: 30, marginRight: 30, marginBottom: 30 }}>
        <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37 }}>
          <h1 style={{ fontWeight: 900, fontSize: 30, marginBottom: 0 }}>My Reservations</h1>
          <p style={{ marginTop: 0 }}>Know where and when you will be in office.</p>
        </div>
        <Box sx={{ display: "flex", flexDirection: "row", marginLeft: 30 }}>
          <div>
            <Typography sx={{marginBottom: 5}}>Reserved For</Typography> 
            <SplitButton options={options} filterOwner={filterOwner} setFilterOwner={setFilterOwner} />
          </div>
          <div style={{marginLeft: "auto", marginRight: 40, display: "flex", flexDirection: "row"}}>
            <div>
              <Typography sx={{fontWeight: 400, fontSize: 16}}>Search</Typography>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </Box>
        <Divider sx={{ marginBottom: 30, marginTop: 20 }} />
        {/* Only creates a card for the reservations which match the specific filters applied */}
        <ReservationCard dataFiltered={dataFiltered}> </ReservationCard>
      </Box>
    </>

  )
}

export default Reservations
