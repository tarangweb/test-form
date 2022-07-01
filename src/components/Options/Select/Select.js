import React from 'react';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import InlineEdit, { SingleLineTextInput } from '@atlaskit/inline-edit';

import EditorErrorIcon from '@atlaskit/icon/glyph/editor/error';

const select = ({ items, elemIndex, selectedLang, inputChanged, removeItem }) => (
  <div className='Select'>
    <Select
      className="single-select"
      classNamePrefix="react-select"
      options={items.map(item => ({ 
        label: item.text[selectedLang], value: item.value[selectedLang] 
      }))}
      placeholder="Select"
    />
    <div className='SelItems'>
      {items.map((item, i) => (
        <div className='SelItem' key={item.id}>
          <div className='InlineEdit'>
            <InlineEdit
              editView={
                <SingleLineTextInput
                  isEditing
                  isInitiallySelected
                  value={item.value[selectedLang]}
                  onChange={(e) => inputChanged(e, elemIndex, i)}
                />
              }
              readView={<SingleLineTextInput isEditing={false} value={item.value[selectedLang]} />}
            />
          </div>
          <Button
            appearance='subtle-link' 
            className='DelItem' 
            iconBefore={<EditorErrorIcon />} 
            onClick={() => removeItem(elemIndex, item.id)}
          />
        </div>
      ))}
    </div>
  </div>
);

export default select;
