import React from 'react';
import Button from '@atlaskit/button';

const LangBtns = props => (
  <div className='Btns'>
    <Button className='Btn' onClick={() => props.changeLanguage('my')} >Unicode</Button>
    <Button className='Btn' onClick={() => props.changeLanguage('my_zg')}>Zawgyi</Button>
    <Button className='Btn' onClick={() => props.changeLanguage('en')}>English</Button>
  </div>
);

export default LangBtns;
