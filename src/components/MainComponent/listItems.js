import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from "react-router-dom";

const links = [
  {
    icon: <DashboardIcon />,
    text: 'Main',
    link: '/dashboard'
  },
  {
    icon: <ShoppingCartIcon />,
    text: 'Rent a friend',
    link: '/dashboard/rent-a-friend'
  },
  {
    icon: <PeopleIcon />,
    text: 'Friends',
    link: '/dashboard/friends'
  },
  {
    icon: <BarChartIcon />,
    text: 'Statistics',
    link: '/dashboard/statistics'
  }
];

export const mainListItems = (
  <div>
    {links.map((link, index) => (
      <Link to={link.link} key={index}>
        <ListItem button>
          <ListItemIcon>
            {link.icon}
          </ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItem>
      </Link>
    ))}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);