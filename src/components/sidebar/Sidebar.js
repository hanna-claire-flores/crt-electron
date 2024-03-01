import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import { apps } from "src/routes/crtApps.js";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" className="crt__sidebar">
      <Toolbar />
      <List>
        {Object.entries(apps).map(([key, app]) => (
          <NavLink to={app.path.split("/")[0]} key={key} className="sidebar__nav-link">
            {({ isActive }) => (
              <ListItem button selected={isActive} alignItems="center">
                <ListItemText
                  primaryTypographyProps={{ variant: "button", className: "sidebar__link-text", align: "center" }}
                  primary={app.acronym}
                />
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
