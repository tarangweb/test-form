import React from 'react';
import { Radio } from '@atlaskit/radio';
import Button from '@atlaskit/button';
import InlineEdit, { SingleLineTextInput } from '@atlaskit/inline-edit';

import EditorErrorIcon from '@atlaskit/icon/glyph/editor/error';

const radio = ({ id, name, text, selectedLang, value, inputChanged, removeItem }) => (
  <div className='OptionItem'>
    <div className='Item'>
      <Radio name={name} />
    </div>
    <div className='InlineEdit'>
      <InlineEdit
        editView={
          <SingleLineTextInput
            isEditing
            isInitiallySelected
            value={value[selectedLang]}
            onChange={inputChanged}
          />
        }
        readView={<SingleLineTextInput isEditing={false} value={value[selectedLang]} />}
      />
    </div>
    <Button appearance='subtle-link' className='DelItem' iconBefore={<EditorErrorIcon />} onClick={removeItem} />
  </div>
);

export default radio;
