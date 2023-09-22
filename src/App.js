import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Sukses" element={<Sukses />} />
    </Routes>
        </main>
      </BrowserRouter>
    )
  }
}
