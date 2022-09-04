import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
// eslint-disable-next-line no-unused-vars
// eslint-disable-prettier
import { ButtonBase, Typography } from '@mui/material';

// project import
// import Logo from './Logo';
import config from '../../config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
        <Typography variant={'h3'} sx={{color:'#02A4D3'}}>
            PETS CARE
        </Typography>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
