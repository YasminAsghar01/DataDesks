import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Typography,
  CardMedia,
  Box,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
  styled,
} from "@mui/material";
import { MapOutlined } from "@mui/icons-material";
import MapImage from "../images/map-background.png";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import moment from 'moment'

// This is an array of desks, with each object containing information about a workspace
const desks = [
    {
      seat: "11A.13",
      floor: 11,
      office: "London Bridge",
      capacity: 5,
      // Each office contains a list of dates and times which already contain boookings 
      // The system will only show times where a booking already doesn't exist
      bookings: {
        "17/04/2023": ["14:00", "16:00"],
      },
      // Each office contains an array of facilities that it offers
      facilities: [
        "Whiteboard",
        "Wheelchair Access",
        "Cleaned Since Last Use",
        "Internal Meeting Rooms",
        "Project Rooms",
      ],
    },
    {
      seat: "2B.13",
      floor: 2,
      office: "London Bridge",
      capacity: 1,
      bookings: {
        "18/04/2023":  ["14:00", "16:00"],
        "21/04/2023": ["10:00", "11:00", "19:00"],
      },
      facilities: [
        "Video Conferencing",
        "Wheelchair Access",
        "Cleaned Since Last Use",
        "Client Meeting Rooms",
      ],
    },
    {
      seat: "8A.13",
      floor: 8,
      office: "London Bridge",
      capacity: 1,
      bookings: {
        "19/04/2023": ["14:00", "16:00"],
        "20/04/2023": ["10:00", "11:00", "19:00"],
      },
      facilities: ["Widescreen Monitor", "Cleaned Since Last Use", "Desks"],
    },
    {
      seat: "6A.12",
      floor: 6,
      office: "Toronto",
      capacity: 1,
      bookings: {
        "22/04/2023": ["14:00", "16:00"],
      },
      facilities: [
        "Hand Gel Dispenser",
        "Video Conferencing",
        "Client Meeting Rooms",
        "Internal Meeting Rooms",
        "Project Rooms",
      ],
    },
    {
      seat: "11B.03",
      floor: 11,
      office: "London Bridge",
      capacity: 2,
      bookings: {
        "23/04/2023":["14:00", "16:00"],
      },
      facilities: [
        "Widescreen Monitor",
        "Wheelchair Access",
        "Cleaned Since Last Use",
        "Desks",
      ],
    },
    {
      seat: "11A.43",
      floor: 11,
      office: "London Bridge",
      capacity: 1,
      bookings: {
        "24/04/2023": ["13:00", "18:00"],
      },
      facilities: [
        "Video Conferencing",
        "Video Conferencing",
        "Client Meeting Rooms",
      ],
    },
    {
        seat: "6F.23",
        floor: 6,
        office: "London Bridge",
        capacity: 6,
        bookings: {
            "25/04/2023": ["13:00", "20:30"],
        },
        facilities: [
            "Whiteboard",
            "Wheelchair Access",
            "Cleaned Since Last Use",
          ],
    },
    {
        seat: "10C.12",
        floor: 10,
        office: "London Bridge",
        capacity: 10,
        bookings: {
            "26/04/2023": ["09:00", "14:00"],
        },
        facilities: [
            "Wheelchair Access",
            "Cleaned Since Last Use",
            "Client Meeting Rooms",
          ],
    },
    {
        seat: "6D.17",
        floor: 6,
        office: "Manchester",
        capacity: 6,
        bookings: {
            "27/04/2023": ["11:00", "14:00"],
        },
        facilities: [
            "Wheelchair Access",
            "Cleaned Since Last Use",
            "Desks",
            "Widescreen Monitor",
          ],
    },
    {
        seat: "3F.07",
        floor: 3,
        office: "Dubai",
        capacity: 3,
        bookings: {
            '08/10/2023': ["09:30", "17:30"],
        },
        facilities: [
            "Client Meeting Rooms",
            "Internal Meeting Rooms",
             "Project Rooms",
          ],
    },
    {
        seat: "2C.01",
        floor: 2,
        office: "Toronto",
        capacity: 2,
        bookings: {
            '20/05/2023': ["14:00", "19:00"],
        },
        facilities: [
            "Video Conferencing",
            "Client Meeting Rooms",
            "Widescreen Monitor",
          ],
    },
    {
        seat: "11B.15",
        floor: 11,
        office: "Buenos Aires",
        capacity: 5,
        bookings: {
            '04/12/2023': ["10:00", "15:00"],
        },
        facilities: [
            "Hand Gel Dispenser",
            "Video Conferencing",
            "Client Meeting Rooms",
            "Internal Meeting Rooms",
            "Project Rooms",
          ],
    },
    {
        seat: "8A.10",
        floor: 8,
        office: "Edinburgh",
        capacity: 8,
        bookings: {
            '31/08/2023': ["12:00", "18:00"],
        },
        facilities: [
            "Hand Gel Dispenser",
            "Video Conferencing",
            "Internal Meeting Rooms",
            "Project Rooms",
          ],
    },
    {
        seat: "4E.22",
        floor: 4,
        office: "Sydney",
        capacity: 4,
        bookings: {
            '27/11/2023': ["10:30", "16:30"],
        },
        facilities: [
            "Video Conferencing",
            "Client Meeting Rooms",
            "Widescreen Monitor",
          ],
    },
    {
        seat: "5D.09",
        floor: 5,
        office: "Luisiana",
        capacity: 5,
        bookings: {
            '17/09/2023': ["10:30", "16:30"],
        },
        facilities: [
            "Cleaned Since Last Use",
            "Desks",
            "Widescreen Monitor",
            "Video Conferencing"
          ],
    },
    {
        seat: "10B.11",
        floor: 10,
        office: "Reykjavik",
        capacity: 9,
        bookings: {
            '22/07/2023': ["00:00", "16:00"],
        },
        facilities: [
            "Video Conferencing",
            "Client Meeting Rooms",
            "Widescreen Monitor",
          ],
    },
    {
        seat: "6C.03",
        floor: 6,
        office: "Reykjavik",
        capacity: 6,
        bookings: {
            '09/08/2023': ["11:30", "15:30"],
        },
        facilities: [
            "Video Conferencing",
            "Client Meeting Rooms",
            "Internal Meeting Rooms",
            "Project Rooms",
          ],
    },
    {
        seat: "3D.15",
        floor: 3,
        office: "Geelong",
        capacity: 3,
        bookings: {
            '15/06/2023': ["10:30", "18:00"],
        },
        facilities: [
            "Video Conferencing",
            "Client Meeting Rooms",
            "Widescreen Monitor",
          ],
    },
]

// This function will filter the cards of all available workspaces 
const filterData = (query, data, checkboxes) => {
  // Each specific filter setting is destructured from the query object so its own logic can be run
  const { office, floor, date, time, capacity } = query;

  // Checks to see if a reservation already has a booking made under a specific date and time 
  let checkTime = (date, time, bookings) => {
    // Loops through all the booking entries for that day
    return bookings.some((el) => {
      // Only checks booking entries of a desk where the date is the same
      if (el[0] === date.format("DD/MM/YYYY")) {
        const times = el[1];
        // Returns if the times booked under that date includes the time in question
        return times.includes(time);
      } else return false;
    });
  };

  // Checks to see if a desks's list of facilities contains at least one facility from a list of facilityFilters which have been checked
  let checkFacility = (seatFac, facilitiyFilters) => {

    return facilitiyFilters.every((filter) => {
      if (seatFac.includes(filter)) return true
      else return false
    })
  };

  // Filters all entries to be of a specific floor if it is not equal to all floors
  if (floor !== "Floors") {
    data = data.filter((d) => d.floor === parseInt(floor));
  }

  // Filters out all desks which have an existing booking for the selected date and time
  data = data.filter((d) => !checkTime(date, time, Object.entries(d.bookings)));


  // Filters out all desks which don't meet or exceed the minimum capacity required
  data = data.filter((d) => d.capacity >= capacity);


  // Creates an array of the active checkboxes out of the whole list of checkboxes,
  const activeCheckboxes = checkboxes.filter((obj) => obj.active === true).map(obj => obj.name)

  // Executes the checkFacility function with a desk's list of facilities and only the active checkboxes
  // Filters out the desks which don't have at least one of these facilities
  if (activeCheckboxes.length > 0) {
    data = data.filter((d) => checkFacility(d.facilities, activeCheckboxes));
  }

  // Filters out bookings which don't belong to the office in question and returns this
  return data.filter((d) => d.office === office);
};

// This React component is called `FilterBox` and renders the Facility, Capacity and Room filters available for the user
const FilterBox = ({ searchQuery, setSearchQuery, checkboxes, setCheckboxes }) => {
  const [capacity, setCapacity] = useState(1); // Sets the intial state of `capacity` to 1, as a minimum of 1 employee must book a workspace
  // Sets the intial state of `localBoxes` to the paramete checkboxes
  // Initially the same as the filter variable checkboxes, this represents the live state of the checkboxes and is kept separate 
  // from the active checkboxes (used in the filter method) until the apply button is pressed
  const [localBoxes, setLocalBoxes] = useState(checkboxes) 
  // This function is used to change the capacity number depending on what button the user clicks
  const changeCapacity = (operation) => {
    if (operation === "+") {
      setCapacity(capacity + 1);
      setSearchQuery({ ...searchQuery, capacity: capacity + 1 });
    } else {
      setCapacity(capacity - 1);
      setSearchQuery({ ...searchQuery, capacity: capacity - 1 });
    }
  };
  // This function will filter what checkboxes are active depending on which boxes are checked
  // The variable local boxes represents the live state of the checkboxes, and is separate from the current state of the filters (until the 'apply' button is pressed)
  async function handleChange(event, obj) {
    // Fetch the changed record (user has activated a checkbox by clicking it)
    const active = await localBoxes.filter(f => f === obj).map(d => d.active)

    // Traverse through the localBoxes object
    return setLocalBoxes(localBoxes.map((f) => (
      // When you find the matching record, replace it's active property 
      f === obj ? { ...f, active: !active[0] } : f
    )))
  };
  // This React Hook will run on every render, setting the localBoxes to checkboxes, in case there are any changes from the Chips
  useEffect(() => {
    setLocalBoxes(checkboxes)
  }, [checkboxes])
// This function is called when the user clears all filters in the FilterBox
  const handleClear = () => {
    // Initialises both the local version and activer filters to an initial state, resets the results 
    setLocalBoxes(dummyFilters)
    setCheckboxes(dummyFilters)
  };
// This function is called when the user applies the filters they have checked
  const applyFilters = () => {
    // Sets the checkbox version used in the filter method to the localBoxes object 
    // This is triggered when the user presses the apply button and updates results 
    setCheckboxes([...localBoxes]);
  };
// This uses the styled method which takes as input the Button MUI component and overrides some of its default styling
  const StyledButton = styled(Button)(`
  text-transform: none;
`);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "auto",
        paddingY: 15,
        borderRadius: 1,
        border: 1,
        borderColor: "#DEE5E7",
        maxWidth: 310,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          color="initial"
          sx={{ paddingX: 20, fontWeight: 700, fontSize: 17, marginRight: 146 }}
        >
          <div>Filters</div>
        </Typography>
        {/* This clears all filters added by the user on the FilterBox */}
        <StyledButton
          sx={{ color: "#2B50D0", fontSize: 15 }}
          onClick={handleClear}
        >
          Clear all
        </StyledButton>
      </div>
      <Divider sx={{ marginBottom: 10, marginTop: 10 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          color="initial"
          sx={{ paddingX: 26, fontWeight: 700, fontSize: 16, marginRight: 120 }}
        >
          Facilities
        </Typography>
        {/* This applies all filters added by the user on the FilterBox */}
        <StyledButton
          sx={{ color: "#2B50D0", fontSize: 15 }}
          onClick={applyFilters}
        >
          Apply
        </StyledButton>
      </div>
      <FormGroup sx={{ paddingX: 28 }}>
        {/* This maps all the Facility filters available */}
        {localBoxes.filter(f => f.type === "facility").map((d) => (
          <FormControlLabel
            sx={{ marginBottom: -10 }}
            control={
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                    '& .Mui-checked': {
                      color: "#2B50D0",
                    }
                  },
                }}
                checked={d.active}

                // Updates the localBoxes object which controls the state of each checkbox
                onChange={(e) => handleChange(e, d)}
              />
            }
            label={d.name}
            key={d.name}
          />
        ))}
      </FormGroup>
      <Typography sx={{ marginLeft: 26, marginTop: 20, fontWeight: 600, fontSize: 14, textDecoration: 'underline', cursor: "pointer" }}>
        Show all
      </Typography>
      <Divider sx={{ marginBottom: 10, marginTop: 15 }} />
      {/* This allows the user to change the capacity of employees for the workspace */}
      <Typography
        variant="h6"
        color="initial"
        sx={{ paddingX: 26, fontWeight: 700, fontSize: 16, marginBottom: 10, paddingTop: 5}}
      >
        Capacity
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <Typography sx={{ paddingLeft: 27, marginBottom: 5 }}>Employees</Typography>
        <ButtonGroup sx={{ marginLeft: "auto", marginRight: 30, justifyContent: "flex-end", marginBottom: 10 }}>
          {
            <Button
              disabled={capacity <= 1}
              onClick={() => changeCapacity("-")}
              sx={{ borderColor: "#868686", fontSize: 18, paddingY: 0 }}
            >
              -
            </Button>
          }

          {<Button sx={{ borderColor: "#868686", width: 25 }}>
            <Typography color="black" sx={{ fontWeight: 600 }}>{capacity}</Typography>
          </Button>}

          <Button
            onClick={() => changeCapacity("+")}
            sx={{ borderColor: "#868686", fontSize: 16, paddingY: 0 }}
          >
            +
          </Button>
        </ButtonGroup>
      </div>

      <Divider sx={{ marginBottom: 10, marginTop: 15 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          color="initial"
          sx={{ paddingX: 30, fontWeight: 700, fontSize: 16, marginRight: 136 }}
        >
          Room
        </Typography>
        <StyledButton
          sx={{ color: "#2B50D0", fontSize: 15 }}
          onClick={applyFilters}
        >
          Apply
        </StyledButton>
      </div>
      <FormGroup sx={{ paddingX: 30 }}>
        {/* This maps all the Room filters available */}
        {localBoxes.filter(f => f.type === "room").map((d) => (
          <FormControlLabel
            sx={{ marginBottom: -10 }}
            control={
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                    '& .Mui-checked': {
                      color: "#2B50D0",
                    }
                  },

                }}
                checked={d.active}
                onChange={(e) => handleChange(e, d)}
                disabled={d.name !== "Desks" && capacity < 3}

              />
            }
            label={d.name}
            key={d.name}
          />
        ))}
      </FormGroup>
      <Typography sx={{ marginLeft: 30, marginTop: 20, fontWeight: 600, fontSize: 14, textDecoration: 'underline', cursor: "pointer" }}>
        Show all
      </Typography>
    </Box>
  );
};

// This is an array of filters, with each object containing information about each filter and whether it's active (the prop that controls checkbox state)
const dummyFilters = [
  {
    name: "Wheelchair Access",
    type: "facility",
    active: false
  },
  {
    name: "Widescreen Monitor",
    type: "facility",
    active: false
  },
  {
    name: "Cleaned Since Last Use",
    type: "facility",
    active: false
  },
  {
    name: "Hand Gel Dispenser",
    type: "facility",
    active: false
  },
  {
    name: "Video Conferencing",
    type: "facility",
    active: false
  },
  {
    name: "Whiteboard",
    type: "facility",
    active: false
  },
  {
    name: "Desks",
    type: "room",
    active: false
  },
  {
    name: "Client Meeting Rooms",
    type: "room",
    active: false
  },
  {
    name: "Internal Meeting Rooms",
    type: "room",
    active: false
  },
  {
    name: "Project Rooms",
    type: "room",
    active: false
  },
]
// This React component is called `Office` and renders the Make a Reservation page
const Office = () => {
  const location = useLocation(); // This hook returns the current navigation action which describes how the router came to
 // the current location, either by a pop, push, or replace on the history stack.

 // In the parent prop, Sidebar.jsx, the selected office object was passed in to the router as part of the history as a prop called location
 // This initialises a local variable office as the state object which was passed in along with the router
  const office = location.state.location; 

  const navigate = useNavigate(); // This hook is used to navigate between routes

  const onBackToMap = () => {
    // Navigates back to the Home component
    window.scrollTo(0, 0);
    navigate("/");
  };

  const [checkboxes, setCheckboxes] = useState(dummyFilters) // this intialises `checkboxes` to dummyFilters

  // Variable containing initial states of the filters used in the filter function
  const [searchQuery, setSearchQuery] = useState({
    office: office.name,
    floor: "Floors",
    date: moment(new Date()),
    time: "8:00",
    capacity: 1,
  });

  // Triggers the filter function which uses the parameters as filters, returns desks which match all the criterion
  // Whenever there is a change in any of the arguments passed in, the data is updated in all the components passed into
  const dataFiltered = filterData(searchQuery, desks, checkboxes); 

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        margin: 0,
        paddingLeft: 7,
        backgroundColor: "#F8F8F8",
        minHeight: "91vh",
      }}
    >
      <div style={{ marginLeft: 31, marginRight: 30, marginBottom: 37 }}>
        <h1
          style={{
            fontWeight: 900,
            fontSize: 30,
            marginBottom: 0,
            marginTop: 0,
            paddingTop: 32,
          }}
        >
          Make a Reservation
        </h1>
        <p style={{ marginTop: 0 }}>
          Book a variety of work spaces to suit your needs. &nbsp;
          <b>Some individual spaces are available without a booking.</b>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 30,
          marginRight: 30,
          paddingBottom: 30,
        }}
      >
        <div style={{ marginRight: 30 }}>
          <Card
            component="div"
            sx={{
              height: 100,
              width: 310,
              border: 1,
              borderColor: "#2B50D0",
              marginBottom: 30,
            }}
          >
            {/* This component routes back to Home.jsx*/}
            <CardMedia title="map-bg" image={MapImage} sx={{ height: 110 }}>
              <Button
                onClick={onBackToMap}
                variant="contained"
                sx={{
                  top: "31%",
                  left: "36%",
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#2B50D0",
                }}
              >
                <MapOutlined sx={{ marginRight: 5 }}></MapOutlined>
                <Typography
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Map
                </Typography>
              </Button>
            </CardMedia>
          </Card>
          {/* This renders the FilterBox for the users to filter by Facilities, Capacity and Rooms */}
          {/* The filter methods and respective useState functions are passed in and updated in every component whenever there is a change */}
          <FilterBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />
        </div>
        {/* This renders the SearchResults component including the workspace cards, filter chips and search */}
        {/* The filter methods and respective useState functions are passed in and updated in every component whenever there is a change */}
        <SearchResults
          office={office}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dataFiltered={dataFiltered}
          chips={checkboxes}
          setChips={setCheckboxes}
        />
      </div>
    </Container>
  );
};

export default Office;
