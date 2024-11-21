import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SelectedOffice from "./components/SelectedOffice"
import Reservations from "./components/Reservations";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultThemeProvider from "./contents/theme";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

// This renders the application, ensuring the Navbar and Router are displayed on every page and defining the routes for each page
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DefaultThemeProvider>
    <LocalizationProvider dateAdapter={AdapterMoment}>
    <Navbar />
    <Router>
      {/* Each path renders a different component, so a different page is shown depending on the url */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/make-reservation" element={<SelectedOffice />} />
      </Routes>
    </Router>
    <Footer />
    </LocalizationProvider>
    </DefaultThemeProvider>
  </React.StrictMode>
);
