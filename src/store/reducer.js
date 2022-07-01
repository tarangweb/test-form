import * as actionTypes from './actions';

const initialState = {
  selectedLanguage: 'en',
  elements: [
    {
      id: 0,
      value: {
        'en': '',
        'my': '',
        'my_zg': '',
      },
      type: 'text',
      placeholder: 'Write your question',
      option: {
        type: null,
        items: []
      },
      error: {
        placeholder: 'Write your error message',
        errorMessage: {
          'en': '',
          'my': '',
          'my_zg': '',
        }
      }
    }
  ]
};

const defaultElement = {
  id: 0,
  value: {
    'en': '',
    'my': '',
    'my_zg': '',
  },
  type: 'text',
  placeholder: 'Write your question',
  option: {
    type: null,
    items: []
  },
  error: {
    placeholder: 'Write your error message',
    errorMessage: {
      'en': '',
      'my': '',
      'my_zg': '',
    }
  }
};

const defaultItem = {
  id: 0,
  name: '',
  value: {
    'en': 'New Item',
    'my': 'New Item',
    'my_zg': 'New Item',
  },
  text: {
    'en': 'New Item',
    'my': 'New Item',
    'my_zg': 'New Item',
  }
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_ELEMENT:
      return {
        ...state,
        elements: [
          ...state.elements,
          {
            ...defaultElement,
            id: state.elements.length ? state.elements[state.elements.length - 1].id + 1 : 0,
            value: {...defaultElement['value']},
            option: {
              ...defaultElement['option'],
              items: [...defaultElement['option']['items']]
            },
            error: {
              ...defaultElement['error'],
              errorMessage: {...defaultElement['error']['errorMessage']}
            },
          }
        ]
      };
    case actionTypes.REMOVE_ELEMENT:
      return {
        ...state,
        elements: state.elements.filter(elem => action.elemId !== elem.id)
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.language
      };
    case actionTypes.INPUT_CHANGED: {
      const selectedLang = state.selectedLanguage;
      const updatedElements = [...state.elements];
      // to avoid writing updateElement[blah..] repetively
      const element = updatedElements[action.elemIndex];
      const updatedElement = {
        ...element,
        value: {...element['value']},
      };

      updatedElement.value[selectedLang] = action.event.target.value;
      updatedElements[action.elemIndex] = updatedElement;
      return {
        ...state,
        elements: updatedElements
      };
    }      
    case actionTypes.ERROR_INPUT_CHANGED: {
      const selectedLang = state.selectedLanguage;
      const updatedElements = [...state.elements];
      // to avoid writing updateElement[blah..] repetively
      const element = updatedElements[action.elemIndex];
      const updatedElement = {
        ...element,
        error: {
          ...defaultElement['error'],
          errorMessage: {...defaultElement['error']['errorMessage']}
        },
      };

      updatedElement.error.errorMessage[selectedLang] = action.event.target.value;
      updatedElements[action.elemIndex] = updatedElement;
      return {
        ...state,
        elements: updatedElements
      };
    }      
    case actionTypes.ADD_OPTION: {
      const updatedElements = [...state.elements];
      // to avoid writing updateElement[blah..] repetively
      const element = updatedElements[action.elemIndex];
      const updatedElement = {
        ...element,
        option: {
          ...element['option'],
          items: [...element['option']['items']]
        },
      };

      updatedElement.option.type = action.optionType;
      updatedElement.option.items = [{
        ...defaultItem,
        value: {...defaultItem['value']},
        text: {...defaultItem['text']}
      }];
      updatedElements[action.elemIndex] = updatedElement;
      return {
        ...state,
        elements: updatedElements
      };
    }      
    case actionTypes.ADD_OPTION_ITEM: {
      const updatedElements = [...state.elements];
      const element = updatedElements[action.elemIndex];
      const updatedElement = { 
        ...element,
        option: {
          ...element['option'],
          items: [...element['option']['items']]
        },
      };
      // declared this var to avoid writing updateElement..blah repetively
      const items = updatedElement.option.items;
      const updatedElementOptionItems = [
        ...items,
        {
          ...defaultItem,
          id: items.length ? items[items.length - 1].id + 1 : 0,
          value: {...defaultItem['value']},
          text: {...defaultItem['text']},
        }
      ];
      
      updatedElement.option.items = updatedElementOptionItems;
      updatedElements[action.elemIndex] = updatedElement;
      return {
        ...state,
        elements: updatedElements
      };
    }
    case actionTypes.REMOVE_OPTION_ITEM: {
      const updatedElements = [...state.elements];
      // to avoid writing updateElement[blah..] repetively
      const element = updatedElements[action.elemIndex];
      const updatedElement = {
        ...element,
        option: {
          ...element['option'],
          items: [...element['option']['items']]
        },
      };
      const updatedElementOptionItems = element.option.items.filter(item => action.itemId !== item.id);
      
      if (updatedElementOptionItems.length === 0) {
        updatedElement.option.type = null;
      }
      updatedElement.option.items = updatedElementOptionItems;
      updatedElements[action.elemIndex] = updatedElement;
      return {
        ...state,
        elements: updatedElements
      };
    }
    case actionTypes.ITEM_INPUT_CHANGED: {
      const selectedLang = state.selectedLanguage;
      const updatedElements = [...state.elements];
      // to avoid writing updateElement[blah..] repetively
      const element = updatedElements[action.elemIndex];
      const updatedElement = {
        ...element,
        option: {
          ...element['option'],
          items: [...element['option']['items']]
        },
      };
      const updatedElementOptionItems = [...element.option.items];
      const optionItem = updatedElementOptionItems[action.itemIndex];
      const updatedElementOptionItem = {
        ...optionItem,
        value: {...optionItem['value']},
        text: {...optionItem['text']}
      };
      
      if (element.option.type !== 'radio') {
        updatedElementOptionItem.name = action.event.target.value;
      } else {
        updatedElementOptionItem.name = 'radioBtn';        
      }
      updatedElementOptionItem.value[selectedLang] = action.event.target.value;
      updatedElementOptionItem.text[selectedLang] = action.event.target.value;

      updatedElementOptionItems[action.itemIndex] = updatedElementOptionItem;
      updatedElement.option.items = updatedElementOptionItems;
      updatedElements[action.elemIndex] = updatedElement;
      return {
        ...state,
        elements: updatedElements
      };
    }  
    default:
      return {
        ...state
      };
  }
}

export default reducer;
