'use client'
import { Button as MuiButton, ButtonProps, Button, useTheme } from '@mui/material';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { grey } from '@mui/material/colors';

interface BaseButton extends ButtonProps {
    text: string;
    onTap: () => Promise<void>;
}

export const BaseButton: React.FC<BaseButton> = ({
    text,
    onTap,
    ...props
}) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const theme = useTheme();
    const u = theme.palette.primary.main;


    const handleClick = async () => {
        setIsProcessing(true);
        try {
            await onTap();
        } finally {
            setIsProcessing(false);
        }
    };

    return (

        <Button {...props} disabled={isProcessing} onClick={handleClick} sx={{ height: 47 }}>
            {text}
        </Button>
    );
};


