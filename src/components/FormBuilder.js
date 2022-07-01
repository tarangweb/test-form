import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Button from '@atlaskit/button';

import AddIcon from '@atlaskit/icon/glyph/add';
import LangBtns from './LangBtns/LangBtns';
import Input from './Input/Input';
import './FormBuilder.css';

class FormBuilder extends Component {
  render() {
    const elements = this.props.elements;

    return (
      <div className='Container'>
        <Page>
          <Grid>
            <GridColumn medium={6}>
              <GridColumn>
                <LangBtns selectedLanguage={this.props.selectedLanguage} 
                  changeLanguage={this.props.onLanguageChanged}
                />
              </GridColumn>
              <GridColumn>
                <div className='Form'>
                  {elements.length > 0 && elements.map((elem, i) => 
                    <Input key={i} config={elem} elemIndex={i} />
                  )}
                </div>
              </GridColumn>
              <GridColumn>
                <div className='Btns'>
                  <Button iconBefore={<AddIcon size='large' />} appearance='primary' onClick={this.props.onElementAdded} className='Btn Btn-circle' />
                </div>
              </GridColumn>
            </GridColumn>
            <GridColumn medium={6}>
              <pre className='Card'>{JSON.stringify(this.props, null, 2)}</pre>
            </GridColumn>
          </Grid>
        </Page>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: state.selectedLanguage,
  elements: state.elements,
});

const mapDispatchToProps = dispatch => {
	return {
		onElementAdded: () => dispatch({ type: actionTypes.ADD_ELEMENT }),
		onLanguageChanged: (language) => dispatch({ type: actionTypes.CHANGE_LANGUAGE, language })
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
