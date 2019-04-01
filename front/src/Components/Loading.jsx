import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
    return (
        <div className='loader'>
            <CircularProgress
                style={{
                    color: '#2b252c'
                }}
                size={ 40 }
            />
        </div>
    );
};

export default Loading;
