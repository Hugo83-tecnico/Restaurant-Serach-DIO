import React from 'react';
import styled, { keyframes }from 'styled-components';

const keyFrameLoading = keyframes`
    0%{
        opacity: 0.5;
    }
    100%{
        opacity: 0.5;
    }

`;

const LoadingSkeleton = styled.div`
    background-color: gray;
    border-radius: 6px;
    margin-bottom: 10px;
    min-width: ${(props) => props.with};
    heigth: ${(props)=> props.height};
    animation: ${keyFrameLoading} 500ms infinite alternate;


`;

export default ({width, height}) => <LoadingSkeleton width={width} height={height}/>;