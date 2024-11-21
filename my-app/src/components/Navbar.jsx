import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  Badge,
  Avatar,
  Button,
  IconButton,
  Popper,
  Divider,
} from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import avatar from "../images/avatar.jpg";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";


// This uses the styled method which takes as input the Toolbar MUI component and overrides some of its default styling
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "RGB(45,93,154)",
  alignContent: "center",
});

// This uses the styled method which takes as input the Box MUI component and overrides some of its default styling
const Icons = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

// This function defines styling which is then applied to the StyledButton componenent rendered below
const linkStyle = {
  textDecoration: "none",
  color: "white",
};

// This uses the styled method which takes as input the Button MUI component and overrides some of its default styling
const StyledButton = styled(Button)(`
  text-transform: none;
`);

// This is an array of notifications, with each object contain the id,content and time of a notification
var notifications = [
  {
    id: 1,
    content: "Your booking at the Paris office has been cancelled",
    time: 2,
  },
  {
    id: 2,
    content: "Sarah has modified her booking at the London Bridge office",
    time: 18,
  },
  {
    id: 3,
    content: "Thank you for making a booking at the Amsterdam office",
    time: 72,
  },
];

// This uses the styled method which takes as input the Popper MUI component and overrides some of its default styling
const StyledPopper = styled(Popper)(() => ({
  maxWidth: "300px",
  backgroundColor: "white"
}));

// This uses the styled method which takes as input the HTML div tag and sets some styling
const StyledPopperDiv = styled("div")(() => ({
  maxWidth: "300px",
  borderRadius: "10px",
  borderColor: "red",
  border: "1.75px solid #DEE5E7",
  padding: "1rem",
  margin: "0.25rem 0px",
}));

// This is a React component called `Navbar`. It renders the Navbar at the top of all pages in the app
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null); // Sets the intial state of `anchorEl` to false
  const [clear, setClear] = React.useState(false); // Sets the intial state of `clear` to false
  const [notifs, setNotifs] = React.useState(notifications); // Sets the intial state of `notifs` to false

  const open = Boolean(anchorEl); // creates a variable open which converts the state of `anchorEl` to a Boolean value

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // changes the state of `anchorEl`. This is used to view the Notification box
  };

  const id = open ? "simple-popper" : undefined; // Conditional statement which will set the variable id to `simple-popper` if open is true else to undefined

  const handleClose = () => {
    setAnchorEl(null); // this will set `anchorEl` to null. This is used to close the Notification box
  };

  const handleClear = () => {
    setNotifs([]);
    setClear(true); // this will set `notifs` toan empty array and `clear` to true. This is used to clear all notifications displayed
  };

  // This returns a Material-UI AppBar component, with the apps logo, button to the reservations page, notifications box and the users name and avatar
  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{ borderBottom: 8, borderBottomColor: "#2D5592" }}>
        {/* this displays the apps logo. When clicked, will return to the homepage */}
        <StyledButton
          href="/"
          style={linkStyle}
          sx={{ marginLeft: 25, marginRight: 50 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            DataDesk
          </Typography>
        </StyledButton>
        {/* This displays the reservation button. When clicked, will display the My Reservations page */}
        <StyledButton
          href="/reservations"
          style={linkStyle}
          sx={{ marginRight: "auto" }}
        >
          <Typography variant="span" sx={{ fontWeight: 600, fontSize: 15 }}>
            My Reservations
          </Typography>
        </StyledButton>
        {/* This displays the notification icon. When clicked this will render the Notification Box */}
        <ClickAwayListener onClickAway={handleClose}>
          <Icons sx={{ marginRight: 25 }}>
            <IconButton
              aria-label=""
              aria-describedby={id}
              disableFocusRipple={true}
              size="small"
              color="inherit"
              sx={{ marginTop: 7 }}
              onClick={handleClick}
            >
              <Badge
                badgeContent={notifs.length}
                color="error"
                sx={{
                  border: 2,
                  padding: 5,
                  borderRadius: 270,
                  borderColor: "RGBA(0,0,0,0.11)",
                  background: "#2D5592",
                }}
              >
                <NotificationsIcon sx={{ height: 20, width: 20 }} />
              </Badge>
            </IconButton>
            {/* This is the code for the Notification box. It allows the user to view all their notifications, clear their notifications and view the My Reservations page */}
            <StyledPopper
              id={id}
              placement="bottom-end"
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              <StyledPopperDiv>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      marginLeft: 0,
                      marginRight: 106,
                    }}
                  >
                    Notifications
                  </Typography>
                  <StyledButton
                    sx={{ color: "red", fontSize: 15 }}
                    onClick={handleClear}
                  >
                    Clear
                  </StyledButton>
                </div>
                {clear ? (
                  <>
                    <Typography sx={{ fontSize: 15 }}>
                      You have 0 notifications today
                    </Typography>
                    <Box sx={{ height: 330 }}></Box>
                  </>
                ) : (
                  <Typography sx={{ fontSize: 15 }}>
                    You have {notifs.length} notifications today
                  </Typography>
                )}
                {notifs.map(
                  (notif) =>
                    notif.time <= 24 &&
                    !clear && (
                      <Typography style={{ whiteSpace: "pre-line" }} key={notif.id}>
                        <Typography>&nbsp;</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <FiberManualRecordIcon
                            sx={{
                              height: 13,
                              color: "#F3172D",
                              marginTop: 6,
                              marginRight: 2,
                            }}
                          />
                          <Box
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              sx={{ display: "inline", fontSize: 15 }}
                            >
                              {notif.content}
                            </Typography>
                            <Typography sx={{ color: "grey", fontSize: 15 }}>
                              {notif.time} hr ago
                            </Typography>
                          </Box>
                        </Box>
                        <Typography>&nbsp;</Typography>
                        <Divider />
                      </Typography>
                    )
                )}
                <Typography>&nbsp;</Typography>
                {!clear && (
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      marginLeft: 3,
                      marginRight: 100,
                    }}
                  >
                    This week
                  </Typography>
                )}
                <Typography>&nbsp;</Typography>
                {notifs.map(
                  (notif) =>
                    notif.time > 24 &&
                    !clear && (
                      <Typography style={{ whiteSpace: "pre-line" }} key={notif.id}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <FiberManualRecordIcon
                            sx={{
                              height: 13,
                              color: "#F3172D",
                              marginTop: 6,
                              marginRight: 2,
                            }}
                          />
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              sx={{ display: "inline", fontSize: 15 }}
                            >
                              {notif.content}
                            </Typography>
                            <Typography sx={{ color: "grey", fontSize: 15 }}>
                              {notif.time} hr ago
                            </Typography>
                          </Box>
                        </Box>
                      </Typography>
                    )
                )}
                <Typography>&nbsp;</Typography>
                <Divider />
                <StyledButton
                  href="/reservations"
                  sx={{
                    marginTop: 5,
                    marginLeft: 60,
                    marginRight: 60,
                    marginBottom: -10,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#2D5592",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    View all reservations
                  </Typography>
                </StyledButton>
              </StyledPopperDiv>
            </StyledPopper>
            {/* This displays the users name and avatar */}
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                marginLeft: 1,
                marginRight: -11,
              }}
            >
              Elina Gilbert
            </Typography>
            <Avatar alt="User avatar" src={avatar} sx={{ marginRight: 5 }} />
          </Icons>
        </ClickAwayListener>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
