import React from 'react';
import './input.css';

type Props = {
  cityInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cityClickHandler: () => void; 
  value: string;
};

const TextInput = ({ cityInputHandler, cityClickHandler, value }: Props) => {
  return (
    <div className='form--wrapper'>
      <form 
        className='from'
        action='submit'
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          className='input'
          type="text"
          value={value}
          onChange={(e) => cityInputHandler(e)}
          
          
        />
        <button 
          className='form--button'
          type="submit"
          onClick={() => cityClickHandler()}
          
        >Chose
        </button>
      </form>
    </div> 
  );
};

export default TextInput;