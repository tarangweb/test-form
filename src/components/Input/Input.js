import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';

import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import EditorBulletListIcon from '@atlaskit/icon/glyph/editor/bullet-list';
import TaskIcon from '@atlaskit/icon/glyph/task';
import EmojiProductivityIcon from '@atlaskit/icon/glyph/emoji/productivity';
import Options from '../Options/Options';
import './Input.css';

const Input = props => {
  const elementId = props.config.id;
  const elementIndex = props.elemIndex;
  const optionType = props.config.option.type;
  
  let inputElement = <Textfield
    value={props.config.value[props.selectedLang]}
    placeholder={props.config.placeholder}
    onChange={(e) => props.onInputChanged(e, elementIndex)} />;;

  let onErrorShowMessage = <Textfield
    value={props.config.error.errorMessage[props.selectedLang]}
    placeholder={props.config.error.placeholder}
    onChange={(e) => props.onErrorInputChanged(e, elementIndex)} />;

  return (
    <div className='Element'>
      <div onClick={() => props.onElementRemoved(elementId)} className='Del-element'><CrossCircleIcon /></div>
      <div className='Input'>
        <div className='InputQuiz'>{inputElement}</div> 
        <div className='InputErr'>{onErrorShowMessage}</div>
      </div>
      <div className='Actions'>
        <p>Choose one of reply options</p>
        <Button appearance='subtle' iconBefore={<EditorBulletListIcon />} className='Btn' onClick={() => props.onOptionAdded('select', elementIndex)} />
        <Button appearance='subtle' iconBefore={<TaskIcon />} className='Btn' onClick={() => props.onOptionAdded('checkbox', elementIndex)} />
        <Button appearance='subtle' iconBefore={<EmojiProductivityIcon />} className='Btn' onClick={() => props.onOptionAdded('radio', elementIndex)} />
      </div>
      {optionType && <Options type={optionType} items={props.config.option.items} elemIndex={elementIndex} />}
    </div>
  );
}

const mapStateToProps = state => ({
  selectedLang: state.selectedLanguage
});

const mapDispatchToProps = dispatch => {
	return {
		onElementRemoved: (elemId) => dispatch({ type: actionTypes.REMOVE_ELEMENT, elemId }),
		onInputChanged: (event, elemIndex) => dispatch({ type: actionTypes.INPUT_CHANGED, event, elemIndex }),
		onErrorInputChanged: (event, elemIndex) => dispatch({ type: actionTypes.ERROR_INPUT_CHANGED, event, elemIndex }),
		onOptionAdded: (optionType, elemIndex) => dispatch({ type: actionTypes.ADD_OPTION, optionType, elemIndex }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
