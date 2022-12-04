import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import * as contactServices from 'services/contactServices';

export default function ActionAreaCard() {
    const [contact, setContact] = useState([]);

    useEffect(() => {
        const contactApi = async () => {
            const result = await contactServices.getContact();
            setContact(result.resultObj);
        };
        contactApi();
    }, []);

    console.log(contact);

    return (
        <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
                <Typography variant="h1" component="h2">
                    Phản hồi từ khách hàng
                </Typography>
            </Grid>
            {contact.map((contact) => (
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345, maxHeight: 300 }}>
                        <Stack spacing={1}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography
                                        sx={{ p: 2, border: '1px dashed grey' }}
                                        key={contact.email}
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Email: {contact.email}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Nội dung:
                                        <Typography variant="body1" color="text.secondary">
                                            {contact.content}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Stack>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
