import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    Stack,
    LinearProgress,
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    FormControl,
    Input,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import * as gameServices from 'services/gameServices';
import config from 'configs/index';

// ============================|| FIREBASE - createGame ||============================ //

const NewGame = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState('');
    const [active, setActive] = useState(true);
    const [genreName, setGenreName] = useState();
    const [genreSelect, setgenreSelect] = useState('');
    const [image, setImage] = useState();
    const [fileGame, setFileGame] = useState();

    const handleChangeSelectGenre = (event) => {
        setgenreSelect(event.target.value);
    };

    useEffect(() => {
        const getGenreName = async () => {
            const result = await gameServices.getGenre();
            setGenreName(result);
        };
        getGenreName();
    }, []);

    const handleActive = (event) => {
        setActive(event.target.checked);
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

    const handleChangeFileGame = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setFileGame(file);
    };

    useEffect(() => {
        return () => {
            fileGame && URL.revokeObjectURL(fileGame.url);
        };
    }, [fileGame]);

    const createGame = async (GameName, Price, Discount, Description, Gameplay, Genre, Status, ThumbnailImage, fileGame, SRM, SRR) => {
        setLoading(true);
        // Make Api call
        const game = {
            GameName: GameName,
            Price: Price,
            Discount: Discount,
            Description: Description,
            Gameplay: Gameplay,
            Genre: Genre,
            Status: Status,
            ThumbnailImage: ThumbnailImage,
            FileGame: fileGame,
            SRM: SRM,
            SRR: SRR
        };
        const response = await gameServices.postNewGame(game);

        if (response?.gameID) {
            setLoading(false);
            setNotify(response.message);
        } else {
            setNotify('Tạo game thành công');
            const timerId = setTimeout(() => {
                clearTimeout(timerId);
                setLoading(false);
                navigate(config.routes.listGame, { replace: true });
            }, 700);
        }
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Thêm trò chơi mới
                    </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Formik
                initialValues={{
                    gameName: '',
                    price: 0,
                    discount: 0,
                    description: '',
                    gameplay: '',
                    genre: 1,
                    thumbnailImage: '',
                    fileGame: '',
                    SRMOS: '',
                    SRMProcessor: '',
                    SRMMemory: '',
                    SRMGraphics: '',
                    SRMStorage: '',
                    SRMAdditionalNotes: '',
                    SRMSoundcard: '',
                    SRROS: '',
                    SRRProcessor: '',
                    SRRMemory: '',
                    SRRGraphics: '',
                    SRRStorage: '',
                    SRRAdditionalNotes: '',
                    SRRSoundcard: ''
                }}
                validationSchema={Yup.object().shape({
                    gameName: Yup.string().max(255).required('Bạn chưa nhập tên'),
                    description: Yup.string().max(255).required('Bạn chưa nhập mô tả'),
                    gameplay: Yup.string().max(255).required('Bạn chưa nhập lối chơi')
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const status = active ? 1 : 0;
                        values.SRM = {
                            OS: values.SRMOS,
                            Processor: values.SRMProcessor,
                            Memory: values.SRMMemory,
                            Graphics: values.SRMGraphics,
                            Storage: values.SRMStorage,
                            AdditionalNotes: values.SRMAdditionalNotes,
                            Soundcard: values.SRMSoundcard
                        };
                        values.SRR = {
                            OS: values.SRROS,
                            Processor: values.SRRProcessor,
                            Memory: values.SRRMemory,
                            Graphics: values.SRRGraphics,
                            Storage: values.SRRStorage,
                            AdditionalNotes: values.SRRAdditionalNotes,
                            Soundcard: values.SRRSoundcard
                        };
                        createGame(
                            values.gameName,
                            values.price,
                            values.discount,
                            values.description,
                            values.gameplay,
                            genreSelect,
                            status,
                            image,
                            fileGame,
                            values.SRM,
                            values.SRR
                        );
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gameName">Tên *</InputLabel>
                                    <OutlinedInput
                                        id="gameName"
                                        value={values.gameName}
                                        name="gameName"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        error={Boolean(touched.gameName && errors.gameName)}
                                    />
                                    {touched.gameName && errors.gameName && (
                                        <FormHelperText error id="helper-text-gameName">
                                            {errors.gameName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="price">Giá *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.price && errors.price)}
                                        id="price"
                                        type="number"
                                        name="price"
                                        onBlur={handleBlur}
                                        value={values.price}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        required
                                        inputProps={{}}
                                    />
                                    {touched.price && errors.price && (
                                        <FormHelperText error id="helper-text-price">
                                            {errors.price}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="discount">Giảm giá(%) *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.discount && errors.discount)}
                                        id="discount"
                                        type="number"
                                        name="discount"
                                        onBlur={handleBlur}
                                        value={values.discount}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.discount && errors.discount && (
                                        <FormHelperText error id="helper-text-discount">
                                            {errors.discount}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="description">Mô tả *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                        id="description"
                                        type="requiredString"
                                        name="description"
                                        onBlur={handleBlur}
                                        value={values.description}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-description">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gameplay">Lối chơi *</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.gameplay && errors.gameplay)}
                                        id="gameplay"
                                        name="gameplay"
                                        onBlur={handleBlur}
                                        value={values.gameplay}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.gameplay && errors.gameplay && (
                                        <FormHelperText error id="helper-text-gameplay">
                                            {errors.gameplay}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={4}>
                                <Stack spacing={1}>
                                    <InputLabel id="genre">Thể loại</InputLabel>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="genre">Genre</InputLabel> */}
                                        <Select
                                            labelId="genre"
                                            id="simple-select"
                                            value={genreSelect}
                                            label="Genre"
                                            onChange={(e) => {
                                                handleChangeSelectGenre(e);
                                            }}
                                        >
                                            {genreName?.map((genre) => (
                                                <MenuItem key={genre.id} value={genre.id}>
                                                    {genre.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>

                            <Grid item xs={8}>
                                <Stack spacing={1}>
                                    <InputLabel>Active ?</InputLabel>
                                    <Switch checked={active} onChange={handleActive} inputProps={{ 'aria-label': 'controlled' }} />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="imgIp">Hình</InputLabel>
                                    <Input id="imgIp" type="file" name="name" onChange={handleChangeFile} />
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gameIP">File game</InputLabel>
                                    <Input id="gameIP" type="file" name="name" onChange={handleChangeFileGame} />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Cấu hình tối thiểu</InputLabel>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Cấu hình đề nghị</InputLabel>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMOS">OS</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRMOS && errors.SRMOS)}
                                        id="SRMOS"
                                        name="SRMOS"
                                        onBlur={handleBlur}
                                        value={values.SRMOS}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRMOS && errors.SRMOS && (
                                        <FormHelperText error id="helper-text-SRMOS">
                                            {errors.SRMOS}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRROS">OS</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRROS && errors.SRROS)}
                                        id="SRROS"
                                        name="SRROS"
                                        onBlur={handleBlur}
                                        value={values.SRROS}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRROS && errors.SRROS && (
                                        <FormHelperText error id="helper-text-SRROS">
                                            {errors.SRROS}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMProcessor">Processor</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRMProcessor && errors.SRMProcessor)}
                                        id="SRMProcessor"
                                        name="SRMProcessor"
                                        onBlur={handleBlur}
                                        value={values.SRMProcessor}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRMProcessor && errors.SRMProcessor && (
                                        <FormHelperText error id="helper-text-SRMProcessor">
                                            {errors.SRMProcessor}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRRProcessor">Processor</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRRProcessor && errors.SRRProcessor)}
                                        id="SRRProcessor"
                                        name="SRRProcessor"
                                        onBlur={handleBlur}
                                        value={values.SRRProcessor}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRRProcessor && errors.SRRProcessor && (
                                        <FormHelperText error id="helper-text-SRRProcessor">
                                            {errors.SRRProcessor}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMMemory">Memory</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRMMemory && errors.SRMMemory)}
                                        id="SRMMemory"
                                        name="SRMMemory"
                                        onBlur={handleBlur}
                                        value={values.SRMMemory}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRMMemory && errors.SRMMemory && (
                                        <FormHelperText error id="helper-text-SRMMemory">
                                            {errors.SRMMemory}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRRMemory">Memory</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRRMemory && errors.SRRMemory)}
                                        id="SRRMemory"
                                        name="SRRMemory"
                                        onBlur={handleBlur}
                                        value={values.SRRMemory}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRRMemory && errors.SRRMemory && (
                                        <FormHelperText error id="helper-text-SRRMemory">
                                            {errors.SRRMemory}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMGraphics">Graphics</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRMGraphics && errors.SRMGraphics)}
                                        id="SRMGraphics"
                                        name="SRMGraphics"
                                        onBlur={handleBlur}
                                        value={values.SRMGraphics}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRMGraphics && errors.SRMGraphics && (
                                        <FormHelperText error id="helper-text-SRMGraphics">
                                            {errors.SRMGraphics}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRRGraphics">Graphics</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRRGraphics && errors.SRRGraphics)}
                                        id="SRRGraphics"
                                        name="SRRGraphics"
                                        onBlur={handleBlur}
                                        value={values.SRRGraphics}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRRGraphics && errors.SRRGraphics && (
                                        <FormHelperText error id="helper-text-SRRGraphics">
                                            {errors.SRRGraphics}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMStorage">Storage</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRMStorage && errors.SRMStorage)}
                                        id="SRMStorage"
                                        name="SRMStorage"
                                        onBlur={handleBlur}
                                        value={values.SRMStorage}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRMStorage && errors.SRMStorage && (
                                        <FormHelperText error id="helper-text-SRMStorage">
                                            {errors.SRMStorage}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRRStorage">Storage</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.SRRStorage && errors.SRRStorage)}
                                        id="SRRStorage"
                                        name="SRRStorage"
                                        onBlur={handleBlur}
                                        value={values.SRRStorage}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.SRRStorage && errors.SRRStorage && (
                                        <FormHelperText error id="helper-text-SRRStorage">
                                            {errors.SRRStorage}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMAdditionalNotes">AdditionalNotes</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="SRMAdditionalNotes"
                                        name="SRMAdditionalNotes"
                                        onBlur={handleBlur}
                                        value={values.SRMAdditionalNotes}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRRAdditionalNotes">AdditionalNotes</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="SRRAdditionalNotes"
                                        name="SRRAdditionalNotes"
                                        onBlur={handleBlur}
                                        value={values.SRRAdditionalNotes}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRMSoundcard">Soundcard</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="SRMSoundcard"
                                        name="SRMSoundcard"
                                        onBlur={handleBlur}
                                        value={values.SRMSoundcard}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="SRRSoundcard">Soundcard</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="SRRSoundcard"
                                        name="SRRSoundcard"
                                        onBlur={handleBlur}
                                        value={values.SRRSoundcard}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            {notify ? (
                                <Grid item xs={12}>
                                    <FormHelperText error>{notify}</FormHelperText>
                                </Grid>
                            ) : (
                                <></>
                            )}
                            <Grid item xs={12}>
                                {loading ? (
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box>
                                ) : (
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Thêm trò chơi
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>

                            <Grid item xs={12}></Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default NewGame;
