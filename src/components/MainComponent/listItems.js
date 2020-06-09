import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import {Link} from "react-router-dom";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
const clientLinks = (rootPath => [
  {
    icon: <DashboardIcon />,
    text: 'Main',
    link: `${rootPath}/statistics`
  },
  {
    icon: <PersonAddIcon />,
    text: 'Rent a friend',
    link: `${rootPath}/rent-a-friend`
  },
  {
    icon: <GroupAddIcon />,
    text: 'Rent a group',
    link: `${rootPath}/rent-a-group`
  },
  {
    icon: <PeopleIcon />,
    text: 'Friends',
    link: `${rootPath}/friends`
  },
  {
    icon: <BarChartIcon />,
    text: 'Statistics',
    link: `${rootPath}/statistics`
  }
])('/client/dashboard');

const friendLinks = (rootPath => [
  {
    icon: <DashboardIcon />,
    text: 'Main',
    link: `${rootPath}`
  },
  {
    icon: <PeopleIcon />,
    text: 'Clients',
    link: `${rootPath}/clients`
  },
  {
    icon: <CardGiftcardIcon />,
    text: 'Gifts',
    link: `${rootPath}/gifts`
  },
  {
    icon: <BarChartIcon />,
    text: 'Statistics',
    link: `${rootPath}/statistics`
  }
])('/friend/dashboard');



const listItems = (links) => (
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
export const mainClientListItems = listItems(clientLinks);

export const mainFriendListItems = listItems(friendLinks);
