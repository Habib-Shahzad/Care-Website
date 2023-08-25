import React from 'react';
import { Login, AdminLayout } from '../admin';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminUserContext from '../contexts/adminUser';

function Admin(props) {

    const adminUser = React.useContext(AdminUserContext);

    const myTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#e82fb4',
            },
            secondary: {
                main: '#e82fb4',
            },
            error: {
                main: '#e82fb4',
            },
        },
        typography: {
            fontFamily: 'Montserrat',
        },
    });


    if (props.loading) return <div></div>

    return (
        <ThemeProvider theme={myTheme}>
            {!adminUser.adminUserState ? (
                <Login user={adminUser} title="CARE Website: Admin Login" />
            ) : (
                <AdminLayout user={adminUser} title="CARE Website: Admin Login" />
            )}
        </ThemeProvider>
    );
}

export default Admin;