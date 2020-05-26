import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
    icon: <PersonAddIcon />,
    text: 'Rent a friend',
    link: '/dashboard/rent-a-friend'
  },
  {
    icon: <GroupAddIcon />,
    text: 'Rent a group',
    link: '/dashboard/rent-a-group'
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
      <Link to={link.link} key={index} style={{ textDecoration: 'none', color: 'inherit'}}>
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
