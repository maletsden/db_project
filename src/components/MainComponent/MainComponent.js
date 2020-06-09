import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {
  mainClientListItems,
  mainFriendListItems
} from "./listItems";
import Drawer from "@material-ui/core/Drawer";
import {
  Route,
  Switch as RoterSwitch,
  useRouteMatch
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Friends from "../Friends/Friends";
import RentAFriend from "../RentAFriend/RentAFriend";
import Statistics from "../Statistics/Statistics";
import RentAGroup from "../RentAGroup/RentAGroup";
import FriendGifts from "../FriendGifts/FriendGifts";
import FriendClients from "../FriendClients/FriendClients";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px 0 20px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
}));

function getRole(url) {
  return url.indexOf('/', 1) !== -1 ? url.slice(1, url.indexOf('/', 1)) : url;
}

function getRoleText(role) {
  return ({
    client: 'Client',
    friend: 'Friend'
  })[role];
}

function getMenuList(role) {
  return ({
    client: mainClientListItems,
    friend: mainFriendListItems
  })[role];
}

const getRoutes = url => [
  {
    path: `${url}/friends`,
    component: <Friends/>
  },
  {
    path: `${url}/rent-a-friend`,
    component: <RentAFriend/>
  },
  {
    path: `${url}/rent-a-group`,
    component: <RentAGroup/>
  },
  {
    path: `${url}/statistics`,
    component: <Statistics/>
  },
  {
    path: `${url}/gifts`,
    component: <FriendGifts/>
  },
  {
    path: `${url}/clients`,
    component: <FriendClients/>
  },

  {
    path: `${url}/`,
    component: <Friends/>
  }
];


export default function Main() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const match = useRouteMatch();

  const userRole = getRole(match.url);
  const userRoleText = getRoleText(userRole);

  const routes = getRoutes(match.url);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <Typography>
            Hi, {userRoleText}
          </Typography>

          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{getMenuList(userRole)}</List>
      </Drawer>
      <main className={classes.content}>

        <RoterSwitch>
          {
            routes.map((route, index) => (
              <Route path={route.path} key={index}>
                {route.component}
              </Route>
            ))
          }
        </RoterSwitch>
      </main>
    </div>
  );
}