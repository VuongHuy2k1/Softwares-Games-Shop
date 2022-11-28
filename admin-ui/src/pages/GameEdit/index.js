import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import config from 'configs/index';
import * as gameService from 'services/gameServices';

// ============================|| FIREBASE - REGISTER ||============================ //

const EditGame = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [image, setImage] = useState();

    const [game, setGame] = useState();
    //     {
    //     name: '',
    //     price: '',
    //     discount: '',
    //     description: '',
    //     gameplay: '',
    //     status: '',
    //     genreName: [''],
    //     thumbnailImage: '',
    //     srm: {
    //         os: '',
    //         processor: '',
    //         memory: '',
    //         graphics: '',
    //         storage: '',
    //         additionalNotes: '',
    //         soundcard: ''
    //     },
    //     srr: { os: '', processor: '', memory: '', graphics: '', storage: '', additionalNotes: '', soundcard: '' }
    // }

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameService.getProfileGame(id);
            setGame(result);
        };
        profileApi();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const newGame = { ...game };
        newGame[e.target.name] = e.target.value;
        setGame(newGame);
    };

    const handleChangeSRM = (e) => {
        e.preventDefault();
        const newGame = { ...game };
        newGame.srm[e.target.name] = e.target.value;
        setGame(newGame);
    };

    const handleChangeSRR = (e) => {
        e.preventDefault();
        const newGame = { ...game };
        newGame.srr[e.target.name] = e.target.value;
        setGame(newGame);
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.url);
        };
    }, [image]);

    const updateGame = async (gameAPI) => {
        // setLoading(true);
        // Make Api call
        const gamePut = {
            GameID: gameAPI.gameID,
            Name: gameAPI.name,
            Price: gameAPI.price,
            Discount: gameAPI.discount,
            Description: gameAPI.description,
            Gameplay: gameAPI.gameplay,
            ThumbnailImage: gameAPI.ThumbnailImage,
            Status: gameAPI.Status,
            SRM: gameAPI.SRM,
            SRR: gameAPI.SRR
        };
        const response = await gameService.putGame(gameAPI);
        console.log(gameAPI);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            GameID: game.gameID,
            Name: game.name,
            Price: game.price,
            Discount: game.discount,
            Description: game.description,
            Gameplay: game.gameplay,
            ThumbnailImage: image,
            Status: game.status,
            SRM: game.srm,
            SRR: game.srr
        };
        updateGame(variable);
    };

    return (
        <>
            {game ? (
                <form noValidate onSubmit={(e) => onSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    name="name"
                                    value={game?.name}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="price">Price</InputLabel>
                                <Input
                                    name="price"
                                    value={game?.price}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="discount">Discount</InputLabel>
                                <Input
                                    name="discount"
                                    value={game?.discount}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="description">description</InputLabel>
                                <Input
                                    name="description"
                                    value={game?.description}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="gameplay">Gameplay</InputLabel>
                                <Input
                                    name="gameplay"
                                    value={game?.gameplay}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="genre">Genre</InputLabel>
                                <Input
                                    name="genre"
                                    value={game?.genreName}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="imgIp">Image</InputLabel>
                                <Input
                                    id="imgIp"
                                    type="file"
                                    name="name"
                                    onChange={handleChangeFile}
                                    // accept="image/png, image/jpeg"
                                    // value={ThumbnailImage}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>System Requirement Minimum</InputLabel>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>System Requirement Recommended</InputLabel>
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>OS</InputLabel>
                                <Input
                                    value={game?.srm?.os ? game?.srm?.os : ''}
                                    name="os"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>OS</InputLabel>
                                <Input
                                    name="os"
                                    value={game?.srr?.os ? game?.srr?.os : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Processor</InputLabel>
                                <Input
                                    value={game?.srm?.processor ? game?.srm?.processor : ''}
                                    name="processor"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Processor</InputLabel>
                                <Input
                                    name="processor"
                                    value={game?.srr?.processor ? game?.srr?.processor : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Memory</InputLabel>
                                <Input
                                    value={game?.srm?.memory ? game?.srm?.memory : ''}
                                    name="memory"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Memory</InputLabel>
                                <Input
                                    name="memory"
                                    value={game?.srr?.memory ? game?.srr?.memory : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Graphics</InputLabel>
                                <Input
                                    value={game?.srm?.graphics ? game?.srm?.graphics : ''}
                                    name="graphics"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Graphics</InputLabel>
                                <Input
                                    name="graphics"
                                    value={game?.srr?.graphics ? game?.srr?.graphics : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Storage</InputLabel>
                                <Input
                                    value={game?.srm?.storage ? game?.srm?.storage : ''}
                                    name="storage"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Storage</InputLabel>
                                <Input
                                    name="storage"
                                    value={game?.srr?.storage ? game?.srr?.storage : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>AdditionalNotes</InputLabel>
                                <Input
                                    value={game?.srm?.additionalNotes ? game?.srm?.additionalNotes : ''}
                                    name="additionalNotes"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>AdditionalNotes</InputLabel>
                                <Input
                                    name="additionalNotes"
                                    value={game?.srr?.additionalNotes ? game?.srr?.additionalNotes : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Soundcard</InputLabel>
                                <Input
                                    value={game?.srm?.soundcard ? game?.srm?.soundcard : ''}
                                    name="soundcard"
                                    onChange={(e) => {
                                        handleChangeSRM(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Soundcard</InputLabel>
                                <Input
                                    name="soundcard"
                                    value={game?.srr?.soundcard ? game?.srr?.soundcard : ''}
                                    onChange={(e) => {
                                        handleChangeSRR(e);
                                    }}
                                ></Input>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {loading ? (
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            ) : (
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                        Save
                                    </Button>
                                </AnimateButton>
                            )}
                        </Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </form>
            ) : (
                <>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </>
            )}
        </>
    );
};

export default EditGame;