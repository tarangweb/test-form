import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Button from '@atlaskit/button';

import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import Aux from '../Aux/Aux';
import Select from './Select/Select';
import Checkbox from './Checkbox/Checkbox';
import Radio from './Radio/Radio';
import './Options.css';

const Options = props => {
  const elementIndex = props.elemIndex;
  let option;

  switch(props.type) {
    case 'select':
      option = <Select {...props}
        selectedLang={props.selectedLanguage}
        inputChanged={props.onItemInputChanged}
        removeItem={props.onOptionItemRemoved} />;
      break;
    case 'checkbox':
      option = (<Aux>{props.items.map((item, i) => <Checkbox key={item.id} {...item} 
        selectedLang={props.selectedLanguage}
        inputChanged={(e) => props.onItemInputChanged(e, elementIndex, i)}
        removeItem={() => props.onOptionItemRemoved(elementIndex, item.id)} />)}</Aux>);
      break;
    case 'radio':
      option = (<Aux>{props.items.map((item, i) => <Radio key={item.id} {...item} 
        selectedLang={props.selectedLanguage}
        inputChanged={(e) => props.onItemInputChanged(e, elementIndex, i)}
        removeItem={() => props.onOptionItemRemoved(elementIndex, item.id)} />)}</Aux>);
      break;
    default:
      break; 
  }

  return (
    <div className='Options'>
      {option}
      <Button appearance='subtle' iconBefore={<AddCircleIcon />} className='Btn' onClick={() => props.onOptionItemAdded(elementIndex)} />
    </div> 
  );
}

const mapStateToProps = state => ({
  selectedLanguage: state.selectedLanguage
});

const mapDispatchToProps = dispatch => {
	return {
		onOptionItemAdded: (elemIndex) => dispatch({ type: actionTypes.ADD_OPTION_ITEM, elemIndex }),
    onOptionItemRemoved: (elemIndex, itemId) => dispatch({ type: actionTypes.REMOVE_OPTION_ITEM, elemIndex, itemId }),
    onItemInputChanged: (event, elemIndex, itemIndex) => dispatch({ type: actionTypes.ITEM_INPUT_CHANGED, event, elemIndex, itemIndex }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
