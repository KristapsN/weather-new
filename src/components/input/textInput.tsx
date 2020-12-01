import React from 'react';

type Props = {
  cityInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cityClickHandler: () => void; 
  value: string;
};

const TextInput = ({ cityInputHandler, cityClickHandler, value }: Props) => {
  return (
    <div>
      <form 
        action='submit'
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          type="text"
          value={value}
          onChange={(e) => cityInputHandler(e)}
          
          
        />
        <button 
          type="submit"
          onClick={() => cityClickHandler()}
          
        >Chose
        </button>
      </form>
    </div> 
  );
};

export default TextInput;