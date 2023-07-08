import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Route, Link, Routes } from "react-router-dom";
import api from '../../api';
import { Menu, MenuItem } from '@mui/material';

import EnhancedTable from '../table/EnhancedTable';
import AdminForm from '../adminForm/AdminForm';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WebIcon from '@mui/icons-material/Web';
import MoreIcon from '@mui/icons-material/MoreVert';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import FeedIcon from '@mui/icons-material/Feed';
import ImageIcon from '@mui/icons-material/Image';
import ApartmentIcon from '@mui/icons-material/Apartment';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function AdminLayout(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = async e => {
        e.preventDefault();
        await fetch(`${api}/user/logout-admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            withCredentials: true,
        });
        props.user.setAdminUserState(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ flex: 1 }} variant="h6" noWrap component="div">
                        Care Website - Admin Dashboard
                    </Typography>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        style={{ display: 'flex', 'justifyContent': 'space-around' }}
                    >
                        <MoreIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/">
                            <ListItemIcon >
                                <WebIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body2">Go to website</Typography>
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body2">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <List>

                    <ListItem component={Link} to="/admin" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'black' }}>Dashboard</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>


                    <ListItem component={Link} to="/admin/user" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'black' }}>Users</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem component={Link} to="/admin/image" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ImageIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'black' }}>Images</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>


                    <ListItem component={Link} to="/admin/activity" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <GroupWorkIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'black' }}>Activities</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem component={Link} to="/admin/blog" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FeedIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'black' }}>Blogs</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>


                    <ListItem component={Link} to="/admin/department" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ApartmentIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'black' }}>Departments</Typography>}
                            />
                        </ListItemButton>

                    </ListItem>


                </List>
            </Drawer>

            <Routes>

                <Route path="/" element={
                    <>
                        <Main open={open}>
                            <DrawerHeader />
                            <Typography paragraph>
                                Welcome to the Care Website Admin Dashboard.
                            </Typography>
                        </Main>
                    </>
                } />

                <Route exact path=":model" element={
                    <>
                        <Main open={open}>
                            <DrawerHeader />
                            <EnhancedTable />
                        </Main>
                    </>
                } />

                <Route path=":model/edit/:id" element={
                    <>
                        <Main open={open}>
                            <DrawerHeader />
                            <AdminForm />
                        </Main>

                    </>
                } />

                <Route path=":model/add" element={
                    <>
                        <Main open={open}>
                            <DrawerHeader />
                            <AdminForm />
                        </Main>
                    </>
                } />



            </Routes>

        </Box>
    );
}
