import React from 'react';
import { useParams } from 'react-router-dom';

const SingleTask = () => {
    const {id}= useParams()
    return (
        <div>
            <h1>This is Single Task{id}</h1>
        </div>
    );
};

export default SingleTask;