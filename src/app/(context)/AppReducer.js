// reducer
export default (state, action) => {
  switch(action.type) {
    case 'LOGIN': {
      return {...state, isLogin: true};
    }
    case 'EDIT_CARD': {
      return {...state, isEditCard: true};
    }
    default: {
      return state;
    }
  }
}