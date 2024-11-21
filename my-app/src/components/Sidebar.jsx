import { useState } from "react";
import { Search, FilterList, ClearOutlined, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import { Box, InputAdornment, Button, IconButton, Typography } from "@mui/material";
import MuiSlider from "@mui/material/Slider";
import {LocationCard} from "./LocationCard"


// This location array is a list of different object that appear as cards. 
// These cards can be filtered depending on facility and location and risk.
const locations = [
    {
        name: 'London Bridge',
        country: 'United Kingdom',
        continent: 'Europe',
        risk: 'low',
        postal: 'SW5 8GD, London, United Kingdom',
        capacity: "high",
        facilities: ["wheelchair access", "parking"],
    },
    {
        name: 'Edmonton',
        country: 'Canada',
        continent: 'North America',
        risk: 'low',
        postal: '10240 Kingsway NW, Edmonton, AB T5H 3V9, Canada',
        capacity: "medium",
        facilities: ["parking"]
    },
    {
        name: 'Washington DC',
        country: 'United States of America',
        continent: 'North America',
        risk: 'medium',
        postal: '1309 5th St NE, Washington, DC 20002, United States of America',
        capacity: "high",
        facilities: ["wheelchair access", "parking", "cleaning"]
    },
    {
        name: 'Istanbul',
        country: 'Turkey',
        continent: 'Asia',
        risk: 'high',
        postal: 'Yaman Evler, Alemdağ Cd No:169, 34768 İstanbul, Türkiye',
        capacity: "low",
        facilities: ["phone", "privacy-booth", "collaboration"]
    },
    {
        name: 'Wollongong',
        country: 'Australia',
        continent: 'Oceania',
        risk: 'high',
        postal: '77 Market Street',
        capacity: "low",
        facilities: ["parking", "wheelchair access", "privacy-booth", "collaboration"]
    },
    {
        name: 'Sydney',
        country: 'Australia',
        continent: 'Oceania',
        risk: 'low',
        postal: '1 Martin Pl, Sydney NSW 2000',
        capacity: 'medium',
        facilities: ["monitor", "phone", "parking"]
    },
    {
        name: 'Cape Town',
        country: 'South Africa',
        continent: 'Africa',
        risk: 'high',
        postal: 'Cape Town City Centre, Cape Town, 8000',
        capacity: 'low',
        facilities: ["wheelchair access", "monitor", "phone", "privacy-booth"]
    },
    {
        name: 'Rio de Janeiro',
        country: 'Brazil',
        continent: 'South America',
        risk: 'medium',
        postal: 'Avenida Atlântica, 1800 - Copacabana',
        capacity: 'medium',
        facilities: ["parking", "privacy-booth", "collaboration"]
    },
    {
        name: 'Reykjavik',
        country: 'Iceland',
        continent: 'Europe',
        risk: 'low',
        postal: 'Kringlan 1-3, 103 Reykjavík',
        capacity: 'high',
        facilities: ["phone", "wheelchair access", "collaboration"]
    },
    {
        name: 'Manchester',
        country: 'United Kingdom',
        continent: 'Europe',
        risk: 'low',
        postal: '1, St Peter Square, Manchester M2 3AE',
        capacity: "low",
        facilities: ["parking", "wheelchair access", "monitor"]
    },
    {
        name: 'Dubai',
        country: 'United Arab Emirates',
        continent: 'Asia',
        risk: 'high',
        postal: 'Sheikh Zayed Rd - Dubai - United Arab Emirates',
        capacity: 'high',
        facilities: ["parking", "monitor", "privacy-booth"]
    },
    {
        name: 'Buenos Aires',
        country: 'Argentina',
        continent: 'South America',
        risk: 'medium',
        postal: 'C1414DRF Buenos Aires',
        capacity: 'low',
        facilities: ["collaboration", "monitor", "wheelchair access"]
    },
    {
        name: 'Edinburgh',
        country: 'Scotland',
        continent: 'Europe',
        risk: 'medium',
        postal: '10 Colinton Rd, Edinburgh EH10 5DT',
        capacity: 'low',
        facilities: ["parking", "privacy-booth", "wheelchair access"]
    },
    {
        name: 'Paris',
        country: 'France',
        continent: 'Europe',
        risk: 'medium',
        postal: 'Pl. Charles de Gaulle, Paris, France',
        capacity: 'low',
        facilities: ["collaboration", "privacy-booth", "wheelchair access"]
    }
];

// This dummyFilters Array is a list of different locations and facilities.
// The user can choose from these to filter the location cards.
const dummyFilters = [
    {
        title: "Europe",
        active: false,
        type: "location",
    },
    {
        title: "North America",
        active: false,
        type: "location",
    },
    {
        title: "Middle East",
        active: false,
        type: "location",
        suggested: true,
    },
    {
        title: "London",
        active: false,
        type: "location",
    },
    {
        title: "Oceania",
        active: false,
        type: "location",
    },
    {
        title: "Africa",
        active: false,
        type: "location",
    },
    {
        title: "South America",
        active: false,
        type: "location",
    },
    {
        title: "Asia",
        active: false,
        type: "location",
    },
    {
        title: "parking",
        active: false,
        type: "facility",
    },
    {
        title: "wheelchair access",
        active: false,
        type: "facility",
        suggested: true,
    },
    {
        title: "monitor",
        active: false,
        type: "facility",
    },
    {
        title: "phone",
        active: false,
        type: "facility",
    },
    {
        title: "privacy-booth",
        active: false,
        type: "facility",
    },
    {
        title: "colloboration",
        active: false,
        type: "facility",
    },
]

// Define a function that takes in a query, data, filters, and riskVal and returns filtered data
const filterData = (query, data, filters, riskVal) => {

    // Define a helper function that checks if an array is a subset of another array
    let checkSubset = (parentArray, subsetArray) => {
        return subsetArray.every((el) => {
            return parentArray.includes(el)
        })
    }

    // Filter the active filters and separate them based on their type
    const activeFilters = filters.filter((d) => d.active)

    // If there are active filters of type "location", filter the data to include only entries whose country or continent matches the active filter's title
    const locationFilters = activeFilters.filter((f) => f.type === "location").map((f) => f.title)
    if (locationFilters.length > 0) {
        data = data.filter((d) => locationFilters.includes(d.country) || locationFilters.includes(d.continent))
    }

    // If there are active filters of type "facility", filter the data to include only entries whose facilities array contains all of the active filter's titles
    const facilityFilters = activeFilters.filter((f) => f.type === "facility").map((f) => f.title)
    if (facilityFilters.length > 0) {
        data = data.filter((d) => checkSubset(d.facilities, facilityFilters))
    }

    // Filter the data based on the value of riskVal
    switch (riskVal) {
        case 1:
            data = data.filter((d) => d.risk === "low")
            break
        case 2:
            data = data.filter((d) => d.risk === "low" || d.risk === "medium")
            break
        default:
            break
    }

    // If a query parameter is provided, filter the data to include only entries whose name or country properties begin with the query (case-insensitive)
    if (!query) {
        return data;
    } else {
        return data.filter((d) => d.name.toLowerCase().startsWith(query.toLowerCase())
            || d.country.toLowerCase().startsWith(query.toLowerCase()));
    }
};

const SearchBar = ({ setSearchQuery }) => (
    <Box sx={{ marginTop: 14, marginBottom: 20, marginLeft: 20, marginRight: 20 }}>
        <TextField
            fullWidth
            InputProps={{
                endAdornment: (
                    <>
                        <InputAdornment position="end">
                            <IconButton size="small" aria-label="search-button" 
                            sx={{ color: "#696969" }}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    </>
                ),
                sx: {
                    borderRadius: 90,
                    backgroundColor: "white",
                    paddingLeft: 13,
                    paddingTop: 2,
                    paddingBottom: 2,
                    fontSize: 18
                },
            }}
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            placeholder="Type to search"
            size="small"
            sx={{}}
        >
        </TextField>
    </Box>
);

const ActivateFilter = styled((props) => {
    // Destructure props to get relevant properties
    const { active, disabledColor, color, suggested, ...other } = props;
    // Return a Box component with the remaining props
    return <Box {...other} />
    // TODO: Once filterMenu is complete, switch so we have to click cross to deactivate the filter
})(({ theme, active, disabledColor, color, }) => ({
    // Set the background color based on the value of the "active" prop
    backgroundColor: !active ? disabledColor : color,
    // Set a transition for the transform property
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const FilterPanel = ({ filters, setFilters }) => {

    // function to handle filter clicks
    async function handleFilterClick(obj) {
        // get the current active state of the filter
        const active = await filters.filter(f => f === obj).map(d => d.active)
        // update the filter with the new active state
        return setFilters(filters.map((f) => (
            f === obj ? { ...f, active: !active[0] } : f
        )))
    }

    // set the colors for the location and facility filters
    const locationColor = 'rgba(43, 80, 208, 1)'
    const disabledLocationColor = 'rgba(43, 80, 208, 0.7)'
    const facilityColor = 'rgba(61, 115, 146)'
    const disabledFacilityColor = 'rgba(61, 115, 146, 0.7)'

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 22 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 5, marginBottom: 15 }}>
                    <Box >
                        {/* display active filters */}
                        {filters.filter(f => f.active).map((filter) => (
                            <ActivateFilter
                                // set the active state of the filter
                                active={filter.active}
                                aria-label="filter"
                                // handle filter clicks
                                onClick={() => handleFilterClick(filter)}
                                key={filter.title}
                                sx={{ display: "inline-flex", marginBottom: 15, cursor: "pointer", }}
                            >
                                {/* set the styling of the filter */}
                                <Typography sx={{
                                    paddingLeft: 20, paddingRight: 10, borderRadius: 40, marginRight: 10, display: 'flex',
                                    flexDirection: 'row', alignItems: "center", backgroundColor: filter.type === 'location' ? locationColor : facilityColor,
                                    color: "white", fontWeight: 600, paddingTop: 7, paddingBottom: 7, fontSize: 14, textTransform: "capitalize",
                                }}
                                    key={filter.title}
                                >
                                    {filter?.title}
                                    {/* display button to deactivate filter */}
                                    <IconButton aria-label="deactivate-filter" onClick={() => handleFilterClick(filter)}
                                        sx={{ display: "inline", marginLeft: 13, paddingTop: 4, paddingBottom: 0, }} size={"small"}>
                                        <ClearOutlined sx={{ color: "white", stroke: "white", strokeWidth: 0.1, height: 18, width: 18 }} />
                                    </IconButton>
                                </Typography>
                            </ActivateFilter>
                        ))}
                    </Box>
                </Box>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 22 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 5 }}>
                    <Typography color="#7F7F7F" sx={{ marginBottom: 10 }}>SUGGESTED SHORTCUTS</Typography>
                    <Box >
                        {/* TODO: filter based on whether it's active */}
                        {filters.filter(f => f?.suggested && !f.active).map((filter) => (
                            <ActivateFilter
                                active={filter.active}
                                aria-label="filter"
                                onClick={() => handleFilterClick(filter)}
                                key={filter.title}
                                suggested={filter?.suggested}
                                sx={{ display: "inline-flex", marginBottom: 15, cursor: "pointer", }}
                            >
                                <Typography sx={{
                                    paddingLeft: 20, paddingRight: 10, borderRadius: 40, marginRight: 10, display: 'flex',
                                    flexDirection: 'row', alignItems: "center", backgroundColor: filter.type === "location" ? disabledLocationColor : disabledFacilityColor,
                                    color: "white", fontWeight: 600, paddingTop: 7, paddingBottom: 7, fontSize: 14, textTransform: "capitalize",
                                }}
                                    key={filter.title}
                                >
                                    {filter?.title}
                                    <IconButton aria-label="deactivate-filter" onClick={() => handleFilterClick(filter)}
                                        sx={{ display: "inline", marginLeft: 13, paddingTop: 4, paddingBottom: 0, }} size={"small"}>
                                        <ClearOutlined sx={{ color: "white", stroke: "white", strokeWidth: 0.1, height: 18, width: 18 }} />
                                    </IconButton>
                                </Typography>
                            </ActivateFilter>
                        ))}
                    </Box>
                </Box>
            </div>
        </>
    )
}

// Define a functional component called FilterRow that takes two props, filters and setFilters
const FilterRow = ({ filters, setFilters }) => {
    // Filter the array of filters to find the active filter that matches the current object and get its active value
    async function handleFilterClick(obj) {
        const active = await filters.filter(f => f === obj).map(d => d.active)
        // Set the state of the filters array by mapping over each filter object and toggling the active property of the filter that matches the current object
        return setFilters(filters.map((f) => (
            f === obj ? { ...f, active: !active[0] } : f
        )))
    }

    // Define variables to hold color values for location and facility filters
    const locationColor = 'rgba(43, 80, 208, 1)'
    const disabledLocationColor = 'rgba(43, 80, 208, 0.7)'
    const facilityColor = 'rgba(61, 115, 146)'
    const disabledFacilityColor = 'rgba(61, 115, 146, 0.7)'

    // Return JSX for the FilterRow component
    return (
        <>
            <Box>
                < Typography sx={{ fontWeight: "600", fontSize: 17, marginLeft: 6 }} color="#7F7F7F">
                    Locations
                </Typography >
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15, marginBottom: 25 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box >
                            {filters.filter(f => f.type === "location").map((filter) => (
                                <ActivateFilter
                                    active={filter.active}
                                    aria-label="filter"
                                    onClick={() => handleFilterClick(filter)}
                                    key={filter.title}
                                    suggested={filter?.suggested}
                                    sx={{ display: "inline-flex", marginBottom: 15, cursor: "pointer", }}
                                >
                                    <Typography sx={{
                                        paddingLeft: 20, paddingRight: 10, borderRadius: 40, marginRight: 10, display: 'flex',
                                        flexDirection: 'row', alignItems: "center",
                                        backgroundColor: filter.type === "location" ?
                                            (filter.active ? locationColor : disabledLocationColor)
                                            : (filter.active ? facilityColor : disabledFacilityColor),
                                        color: "white", fontWeight: 600, paddingTop: 7, paddingBottom: 7, fontSize: 14, textTransform: "capitalize",
                                    }}
                                        key={filter.title}
                                    >
                                        {filter?.title}
                                        <IconButton aria-label="deactivate-filter" onClick={() => handleFilterClick(filter)}
                                            sx={{ display: "inline", marginLeft: 13, paddingTop: 4, paddingBottom: 0, }} size={"small"}>
                                            <ClearOutlined sx={{ color: "white", stroke: "white", strokeWidth: 0.1, height: 18, width: 18 }} />
                                        </IconButton>
                                    </Typography>
                                </ActivateFilter>
                            ))}
                        </Box>
                    </Box>
                </div>
            </Box>

            <Box>
                < Typography sx={{ fontWeight: "600", fontSize: 17, marginLeft: 6 }} color="#7F7F7F">
                    Facilities
                </Typography >
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15, marginBottom: 25 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box >
                            {filters.filter(f => f.type === "facility").map((filter) => (
                                <ActivateFilter
                                    active={filter.active}
                                    aria-label="filter"
                                    onClick={() => handleFilterClick(filter)}
                                    key={filter.title}
                                    suggested={filter?.suggested}
                                    sx={{ display: "inline-flex", marginBottom: 15, cursor: "pointer", }}
                                >
                                    <Typography sx={{
                                        paddingLeft: 20, paddingRight: 10, borderRadius: 40, marginRight: 10, display: 'flex',
                                        flexDirection: 'row', alignItems: "center",
                                        backgroundColor: filter.type === "location" ?
                                            (filter.active ? locationColor : disabledLocationColor)
                                            : (filter.active ? facilityColor : disabledFacilityColor),
                                        color: "white", fontWeight: 600, paddingTop: 7, paddingBottom: 7, fontSize: 14, textTransform: "capitalize",
                                    }}
                                        key={filter.title}
                                    >
                                        {filter?.title}
                                        <IconButton aria-label="deactivate-filter" onClick={() => handleFilterClick(filter)}
                                            sx={{ display: "inline", marginLeft: 13, paddingTop: 4, paddingBottom: 0, }} size={"small"}>
                                            <ClearOutlined sx={{ color: "white", stroke: "white", strokeWidth: 0.1, height: 18, width: 18 }} />
                                        </IconButton>
                                    </Typography>
                                </ActivateFilter>
                            ))}
                        </Box>
                    </Box>
                </div>
            </Box>
        </>
    )

}
// This function takes in a numerical value and returns a string label for the value, where:
// - 1 maps to "Low"
// - 2 maps to "Medium"
// - 3 maps to "High"
function valueLabelFormat(value) {
    let scaledValue = value;

    while (scaledValue === 1) {
        scaledValue = "Low"
    }
    while (scaledValue === 2) {
        scaledValue = "Medium"
    }
    while (scaledValue === 3) {
        scaledValue = "High"
    }

    return `${scaledValue}`;
}

const Slider = styled(MuiSlider)({
    '& .MuiSlider-markLabel[data-index="0"]': {
        transform: "translateX(0%)"
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
        transform: "translateX(-90%)"
    }
});

// Define a functional component for a custom slider
const CustomSlider = ({ riskVal, setRiskVal }) => {

    // Define an array of marks with corresponding values and labels
    const marks = [
        {
            value: 1,
            label: 'Low'
        },
        {
            value: 3,
            label: 'High'
        }
    ]

    // Define a function to determine the color of the risk value based on its value
    const decideColor = () => {
        if (riskVal === 2) return "#E78021"
        if (riskVal === 3) return "#DD1111"
        return "#63D361"
    }

    // Define a function to handle changes to the slider value
    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            setRiskVal(newValue);
        }
    };

    // Return the JSX for the custom slider component
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'flex-row', justifyContent: 'space-between' }}>
                < Typography sx={{ fontWeight: "600", fontSize: 17, marginLeft: 6, marginBottom: 20 }} color="#7F7F7F">
                    Risk
                </Typography >
                < Typography
                    sx={{ fontWeight: "600", fontSize: 18, marginRight: 10, marginBottom: 20, color: decideColor() }}
                    color="#7F7F7F">
                    {valueLabelFormat(riskVal)}
                </Typography >
            </Box>
            <Box sx={{ marginX: 10 }}>
                <Slider
                    aria-label="Risk Level"
                    defaultValue={1}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    marks={marks}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    step={1}
                    min={1}
                    max={3}
                    value={riskVal}
                    sx={{ color: decideColor() }}
                    slotProps={{
                        markLabel: {
                            style: {
                                fontSize: 15, fontWeight: 600, marginTop: 12,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

const Sidebar = () => {
    // State variables
    const [searchQuery, setSearchQuery] = useState("");
    const [openFilterMenu, setOpenFilterMenu] = useState(false)
    const [filters, setFilters] = useState(dummyFilters)
    const [riskVal, setRiskVal] = useState(3)

    // Filter data based on search query, filters, and risk value
    const dataFiltered = filterData(searchQuery, locations, filters, riskVal);

    // Reset filters and risk value to default values
    const resetFilters = () => {
        setFilters(dummyFilters)
        setRiskVal(3)
    }


    return (
        // Sidebar container with fixed width and height
        <Box sx={{ display: "flex", padding: 2, flexDirection: "column", backgroundColor: "#F1F3F7", width: "40%", border: 1, borderRadius: 2, borderColor: "#DEE5E7", height: "90vh", marginBottom: 35 }}>
            {/* If filter menu is closed, display search bar, filter panel, and location cards */}
            {!openFilterMenu ?
                <>
                    <div>
                        {/* Button to open filter menu */}
                        <Button
                            onClick={() => setOpenFilterMenu(true)} startIcon={<FilterList />}
                            sx={{ fontWeight: 600, fontSize: 16, marginRight: 10, float: "right", paddingTop: 0, paddingBottom: 0, marginTop: 25, color: "#002979" }}>
                            <p style={{ textTransform: "capitalize", fontSize: 18 }}>Filters</p>
                        </Button>
                    </div>
                    {/* Search bar component */}
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    {/* Filter panel component */}
                    <FilterPanel filters={filters} setFilters={setFilters} />
                    {/* Location cards */}
                    <Box
                        sx={{
                            paddingLeft: 1, paddingRight: 1, marginRight: 20, marginLeft: 20, marginTop: 20,
                            marginBottom: 30, overflowY: 'scroll',
                        }}>
                        {dataFiltered.length > 0 ?
                            (dataFiltered.map((location) => (
                                <LocationCard location={location} key={location.name} />
                            ))) : (
                                <Typography sx={{ width: "fit-content", marginX: "auto", marginTop: 10 }}>No results available</Typography>
                            )}
                    </Box>
                </>
                : <>
                    {/* If filter menu is open, display filter panel and custom slider */}
                    <Box sx={{ padding: 8 }}>
                        {/* Header of filter menu with button to close the menu and reset button */}
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginX: 5 }}>
                            <IconButton aria-label="close-filter-menu" size="large" onClick={() => setOpenFilterMenu(false)} sx={{ marginTop: 10 }}>
                                <ArrowBack sx={{ color: "black" }} />
                            </IconButton>
                            <Button
                                size="small"
                                sx={{ borderRadius: 16, backgroundColor: "#D9D9D9", maxHeight: 40, marginTop: 17 }}
                                onClick={resetFilters}
                            >
                                <Typography
                                    sx={{ textTransform: "capitalize", color: "black", fontSize: 15, fontWeight: 600, marginX: 18 }}>
                                    Reset
                                </Typography>
                            </Button>
                        </Box>
                        {/* Filter panel component */}
                        <Box
                            sx={{
                                padding: 20, display: "flex",
                                flexDirection: "column",
                            }}>
                            <FilterRow filters={filters} setFilters={setFilters} />
                            <CustomSlider riskVal={riskVal} setRiskVal={setRiskVal} />
                        </Box>
                    </Box>
                </>}

        </Box>


    )
}

export default Sidebar