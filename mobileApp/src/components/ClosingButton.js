import React from 'react';
import { IconButton } from 'native-base';

const ClosingButton = ({ color, size, onClick }) => {
    return (
        <IconButton
            variant="transparent"
            size={size}
            icon="close"
            onPress={() => onClick(color, size)}
        />
    );
};

ClosingButton.defaultProps = {
    color: '#333',
    size: 'small',
};

export default ClosingButton;
