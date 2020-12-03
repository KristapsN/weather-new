import { type } from 'os';
import React from 'react';
import './styleCard.css';

type Props = {
  errorTitle: string
  errorMesage: string
};

const Error = ({ errorTitle, errorMesage }: Props) => {

  return (
    <div className='error--card'>
      <h3>{errorTitle}</h3>
      <p>{errorMesage}</p>
    </div>
  );
};

export default Error;
