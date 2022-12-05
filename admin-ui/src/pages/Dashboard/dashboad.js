import RecentOrder from 'pages/RecentOrders/index';
import Contact from 'pages/Contact/index';
import { Grid, Typography, Stack } from '@mui/material';

function Dash() {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <RecentOrder />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Contact />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Dash;
