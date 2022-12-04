import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import * as contactServices from 'services/clientServices';

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
                                        Gmail: {contact.email}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Content:
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
