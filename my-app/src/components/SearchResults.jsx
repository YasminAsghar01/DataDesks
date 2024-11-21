import React, { useEffect } from "react";
import { useState } from "react";
import {
  ClickAwayListener,
  Typography,
  Box,
  Divider,
  TextField,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Card,
  Chip,
  Grid,
} from "@mui/material";
import { ArrowDropDown, Groups3 } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import ClearIcon from "@mui/icons-material/Clear";

// Reusable component for selecting a floor and time filter
const SplitButton = ({ options, filters, setFilters, filterType }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index, type = "null") => {
    setSelectedIndex(index);

    // Updates the filter object baseed on which dropdown was used

    if (type.toLowerCase() === "floor") {
      const floor = options[index].split(" ")[1];
      setFilters({ ...filters, floor: floor });
    }

    if (type.toLowerCase() === "time") {
      const time = options[index];
      setFilters({ ...filters, time: time });
    }

    // Closes the dropdown, reactive behaviour
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button
          onClick={handleClick}
          sx={{
            textTransform: "capitalize",
            color: "rgba(0, 0, 0, 0.7)",
            borderColor: "rgba(0, 0, 0, 0.4)",
            paddingY: 5,
            fontSize: 16,
          }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{ borderColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <ArrowDropDown sx={{ color: "rgba(0, 0, 0, 0.4)" }} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
          height: 200,
          overflowY: "scroll",
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
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, index, filterType)
                      }
                      sx={{ textTransform: "capitalize" }}
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
};

// Component containing all the dropdowns for floor, time, date

const FilterRack = ({ office, searchQuery, setSearchQuery }) => {
  const { date: rawDate } = searchQuery;

  // Initialises to the date set in the parent component's version of filter object (usually today)
  const [date, setDate] = useState(rawDate);

  // Arrays containing dropdown options for floors and times
  const floorOptions = [
    "All Floors",
    "Floor 1",
    "Floor 2",
    "Floor 3",
    "Floor 4",
    "Floor 5",
    "Floor 6",
    "Floor 7",
    "Floor 8",
    "Floor 9",
    "Floor 10",
    "Floor 11",
  ];

  const timeOptions = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  // Connected to the date picker, updates the date in the filter object
  async function onDateChange(newDate) {
    await setDate(newDate);
    setSearchQuery({ ...searchQuery, date: newDate });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginLeft: 10,
        marginTop: 20,
        paddingBottom: 20,
      }}
    >
      <div style={{ marginRight: 30 }}>
        <Typography sx={{ marginBottom: 5 }}>*Building</Typography>
        <TextField
          disabled
          defaultValue={office.name + ", " + office.country}
          sx={{ width: 300 }}
          inputProps={{
            style: {
              paddingTop: 8.5,
              paddingBottom: 8.5,
              paddingLeft: 18,
              fontSize: 16,
            },
          }}
        />
      </div>
      <div style={{ marginRight: 30 }}>
        <Typography sx={{ marginBottom: 5 }}>Floor</Typography>
        <SplitButton
          options={floorOptions}
          filters={searchQuery}
          setFilters={setSearchQuery}
          filterType="Floor"
        />
      </div>
      <div style={{ marginRight: 30 }}>
        <Typography sx={{ marginBottom: 5 }}>Date</Typography>
        {/* Imported MUI DatePicker Component */}
        <DatePicker
          value={date}
          disablePast
          format="DD/MM/YYYY"
          onChange={(newValue) => onDateChange(newValue)}
          slotProps={{
            textField: { size: "small" },
            inputAdornment: {
              sx: {
                ">button": {
                  borderLeft: 1,
                  borderLeftColor: "rgba(0,0,0,0.3)",
                  borderLeftWidth: 1,
                  borderRadius: 0,
                  paddingX: 12,
                },
              },
            },
          }}
        />
      </div>
      <div style={{ marginRight: 30 }}>
        <Typography sx={{ marginBottom: 5 }}>Time</Typography>
        <SplitButton
          options={timeOptions}
          filters={searchQuery}
          setFilters={setSearchQuery}
          filterType="Time"
        />
      </div>
    </Box>
  );
};

// In each desk card, calculate what five time buttons should be shown 
// This changes based on the time selected
// This method returns the position of the time selected in the dropdown in the array of dropdown time options
const calculateTimingShown = (timeOptions, selectedTime) => {
  let pos = 0;

  for (let i = 0; i < timeOptions.length; i++) {
    if (timeOptions[i] === selectedTime) {
      // Continues to go traverse the array and increment by one until it finds a matching time
      return pos;
    } else pos = pos + 1;
  }

  return pos;
};

const SeatCard = ({ option, filters }) => {
  const { time: selectedTime, date } = filters;
  const [timePos, setTimePos] = useState(0);
  const [timeButtons, setTimeButtons] = useState([
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
  ]);


  // Hook used to update the time buttons shown in each card
  // Changes everytime the user updates the time selected in the dropdown
  useEffect(() => {
    const timeOptions = [
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ];

    // Calculate the position of the time selected in the dropdown from the time dropdown array
    setTimePos(calculateTimingShown(timeOptions, selectedTime));

    // Unless a beginning or end time, return two cards before selected time, the selected time, and the two timess after the selected time
    switch (timePos) {
      case 0: {
        // If selected time is the first item, return the first four items in time options
        setTimeButtons(timeOptions.slice(timePos, timePos + 5));
        break;
      }
      case 1: {
        setTimeButtons(timeOptions.slice(timePos - 1, timePos + 4));
        break;
      }
      case 10: {
        // If selected time is the second lasat item, return the last four times in time options 
        setTimeButtons(timeOptions.slice(timePos - 2, timePos + 2));
        break;
      }
      case 11: {
        // If selected time is the last item, return the last three times in time options
        setTimeButtons(timeOptions.slice(timePos - 2, timePos + 1));
        break;
      }
      default: {
        setTimeButtons(timeOptions.slice(timePos - 2, timePos + 3));
        break;
      }
    }
  }, [selectedTime, setTimeButtons, timePos]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "flexRow",
        paddingY: 20,
        paddingX: 30,
        borderRadius: 3,
        marginY: 25,
        border: 1,
        borderColor: "#DEE5E7",
      }}
    >
      <Box>
        <Typography color="initial" sx={{ fontWeight: 700, fontSize: 18 }}>
          {option.seat}
        </Typography>
        <Typography color="#666666" sx={{ fontSize: 15, fontWeight: 400 }}>
          {option.floor}
          {option.floor > 3 ? "th" : "nd"} Floor, {option.office}{" "}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <Groups3
            size={"small"}
            sx={{ marginRight: 10, color: "#474D5AE5" }}
          />
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#474D5AE5",
              textTransform: "capitalize",
            }}
          >
            {option.capacity}
          </div>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
        {timeButtons.length > 0 &&
          timeButtons.map((time) => {
            // Looks at the current desk's bookings list
            const bookings = option.bookings;
            // Disables a time button if there is a booking already under that specific date and time
            const disabled = Object.entries(bookings).some((el) => {
              if (el[0] === date.format("DD/MM/YYYY")) {
                const times = el[1];
                return times.includes(time);
              } else return false;
            });
            return (
              <Button
                key={time}
                variant="contained"
                disabled={disabled}
                sx={{
                  marginX: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: disabled ? "#D4D4D4" : "#2B50D0",
                  height: "min-content",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                    paddingX: !disabled ? 20 : 33.91,
                    paddingY: !disabled ? 5 : 17,
                    marginLeft: disabled && 6,
                  }}
                >
                  {/* Only show a time if the button isn't disabled */}
                  {!disabled && time}
                </Typography>
              </Button>
            );
          })}
      </Box>
    </Card>
  );
};

const SearchResults = ({ office, searchQuery, setSearchQuery, dataFiltered, chips, setChips }) => {

  // If you delete a chip it deactivates the filter option it represents in the filter array
  // This change is translated back to the parent object and updates the filter box by unticking the filter
  async function handleDelete (event, obj) {
    // Finds the matching filter object
    const active = await chips.filter(f => f === obj).map(d => d.active)

    // Traverses chips/filters objects and deactivates the filter
    return setChips(chips.map((f) => (
      f === obj ? { ...f, active: !active[0] } : f
    )))
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "auto",
        width: "70vw",
        paddingX: 30,
        paddingY: 35,
        borderRadius: 1,
        border: 1,
        borderColor: "#DEE5E7",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: 24,
          color: "#3A4354",
          paddingBottom: 20,
        }}
      >
        {office.name}, {office.country}
      </Typography>
      {/* FilterRack (dropdown list) separated into a different component which can change the state of the filters */}
      <FilterRack
        office={office}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 40,
          marginLeft: 5,
        }}
      >
        <Typography
          color="initial"
          sx={{ fontWeight: 600, fontSize: 15, marginTop: 6 }}
        >
          FILTERS:
        </Typography>
        <Grid container sx={{marginX: 10, marginBottom: 5}}>
          {chips.filter(d => d.active).map((d) => (
            <Chip
              sx={{ backgroundColor: "#3D7392", color: "white", marginX: 5, marginBottom: 10, padding: 5 }}
              label={d.name}
              key={d.name}
              deleteIcon={
                <ClearIcon
                  style={{ color: "white", fontSize: 19 }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              }
              onDelete={(e) => handleDelete(e, d)}
            />
          ))}
        </Grid>
      </Box>
      <Divider light sx={{ marginBottom: 40, marginTop: 20 }} />
      <Typography
        sx={{ marginTop: 20, fontWeight: 600 }}
        variant="body1"
        color="#2B50D0"
      >
        {dataFiltered?.length} results
      </Typography>
      <Box sx={{ marginTop: 20, height: "62vh", overflowY: "scroll" }}>
        {/* Only maps if there are results available, will always use filtered data */}
        {/* Whenever there is a change in filters, dataFiltered will always be updated in parent component and passed back into this component*/}
        {dataFiltered?.length > 0 &&
          dataFiltered.map((d) => (
            <SeatCard option={d} key={d.seat} filters={searchQuery} />
          ))}
      </Box>
    </Box>
  );
};

export default SearchResults;
