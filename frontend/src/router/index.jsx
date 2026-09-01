import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayerPool from "components/playerPool";
import TeamList from "components/teamList";
import TeamSquad from "components/teamSqaud";
import RandomPlayerPool from "components/randomPlayerPool";

export default function Router() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/draft" element={<PlayerPool />}>
        </Route>
        <Route path="/allSquad/:pageId" element={<TeamList />}>
        </Route>
        <Route path="/squad/:teamId" element={<TeamSquad />}>
        </Route>
        <Route path="/random-draft" element={<RandomPlayerPool />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
