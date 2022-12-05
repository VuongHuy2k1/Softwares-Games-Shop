import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { AiOutlineDown } from 'react-icons/ai';

import * as contactServices from 'services/clientServices';

export default function ActionAreaCard() {
    const [contact, setContact] = useState([]);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        const contactApi = async () => {
            const result = await contactServices.getContact();
            setContact(result.resultObj);
        };
        contactApi();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
                <Typography variant="h1" component="h2">
                    Phản hồi từ khách hàng
                </Typography>
            </Grid>
            {contact.map((contact, index) => (
                <Grid item xs={12} key={index}>
                    <Accordion expanded={expanded === contact.content} onChange={handleChange(contact.content)}>
                        <AccordionSummary expandIcon={<AiOutlineDown />} aria-controls="panel1bh-content" id="panel1bh-header">
                            <Typography sx={{ width: '4%', flexShrink: 0 }}>Email: </Typography>
                            <Typography>{contact.email}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{contact.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </Grid>
    );
}
