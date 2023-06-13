import { IconButton } from '@mui/material';
import React from 'react';
import LoginModal from '../../Login/Modal/LoginModal';

const UserHeader: React.FC = () => {
    return (
        <IconButton aria-label="user">
            <LoginModal
            />
        </IconButton>
    );
}
  
export default UserHeader;