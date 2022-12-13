import RecentOrder from 'pages/RecentOrders/index';
import Contact from 'pages/Contact/index';
import BestSeller from './bestseller';
import { Grid, Typography, Stack, Box } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

function Dash() {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* col 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue1', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Số người dùng" count="42" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue2', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Số lượng game" count="30" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue3', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Đơn hàng đã xuất" count="4" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ p: 2, bgcolor: 'custom.blue4', color: 'primary.contrastText', borderRadius: 2 }}>
                    <AnalyticEcommerce title="Tổng thu nhập" count="$30.000.000" />
                </Box>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            {/* col 2 */}
            <Grid item xs={5}>
                <Stack spacing={1}>
                    <BestSeller />
                </Stack>
            </Grid>
            {/* <Grid item xs={12}>
                <Stack spacing={1}>
                    <RecentOrder />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Contact />
                </Stack>
            </Grid> */}
        </Grid>
    );
}

export default Dash;
