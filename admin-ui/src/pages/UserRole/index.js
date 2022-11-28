// material-ui
import { Grid, Stack, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as userServices from 'services/userServices';
import { Checkbox, Typography, TextField, FormGroup, FormControlLabel, Box, Button } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

// ============================|| FIREBASE - REGISTER ||============================ //

const UserRole = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [rolesApi, setRolesApi] = useState([]);
    const [adminCheck, setAdminCheck] = useState(false);
    const [userCheck, setUserCheck] = useState(false);

    const checkedAble = () => {};
    useEffect(() => {
        const profileApi = async () => {
            const result = await userServices.getUserProfile(id);
            const roleApi = await userServices.getRole();
            setUser(result.resultObj);
            setRolesApi(roleApi);
            result.resultObj.roles.map((role) => {
                console.log(role);
                if (role === 'User') {
                    setUserCheck(true);
                } else if (role === 'admin') {
                    setAdminCheck(true);
                }
            });
        };
        profileApi();
        checkedAble();
    }, []);

    const putRoleUser = async (id, data) => {
        const result = await userServices.putRoleUser(id, data);
    };

    const onChangeUser = (e) => {
        if (userCheck) {
            setUserCheck(false);
        } else {
            setUserCheck(true);
        }
    };
    const onChangeAdmin = (e) => {
        if (adminCheck) {
            setAdminCheck(false);
        } else {
            setAdminCheck(true);
        }
    };

    const saveClick = (e) => {
        if (userCheck & adminCheck) {
            const rolePut = {
                id: user.id,
                roles: [
                    {
                        id: rolesApi[0].id,
                        name: rolesApi[0].name,
                        selected: true
                    },
                    {
                        id: rolesApi[1].id,
                        name: rolesApi[1].name,
                        selected: true
                    }
                ]
            };
            putRoleUser(user.id, rolePut);
        } else if (userCheck) {
            const rolePut = {
                id: user.id,
                roles: [
                    {
                        id: rolesApi[0].id,
                        name: rolesApi[0].name,
                        selected: true
                    }
                ]
            };
            putRoleUser(user.id, rolePut);
        } else if (adminCheck) {
            const rolePut = {
                id: user.id,
                roles: [
                    {
                        id: rolesApi[1].id,
                        name: rolesApi[1].name,
                        selected: true
                    }
                ]
            };
            putRoleUser(user.id, rolePut);
        } else {
            const rolePut = {
                id: user.id,
                roles: [
                    {
                        id: '',
                        name: '',
                        selected: true
                    }
                ]
            };
            putRoleUser(user.id, rolePut);
        }
    };
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Typography variant="h1" component="h2">
                            Change User Role
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>User name</InputLabel>
                        <TextField value={user.userName ? user.userName : ' '} variant="standard" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Email</InputLabel>
                        <TextField value={user.email ? user.email : ' '} variant="standard" />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel>Role</InputLabel>
                        <FormGroup>
                            <FormControlLabel
                                onChange={(e) => {
                                    onChangeUser(e);
                                }}
                                name="User"
                                control={<Checkbox />}
                                label="User"
                                checked={userCheck}
                            />
                            <FormControlLabel
                                onChange={(e) => {
                                    onChangeAdmin(e);
                                }}
                                control={<Checkbox />}
                                label="Admin"
                                name="admin"
                                checked={adminCheck}
                            />
                        </FormGroup>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                saveClick(e);
                            }}
                        >
                            Save
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </>
    );
};

export default UserRole;
