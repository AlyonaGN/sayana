export const userActionsTypes = {
  SET_NAME: 'USER.SET_NAME',
};

export const userActions = {
  setUserName: (payload) => {
    return ({ type: userActionsTypes.SET_NAME, payload });
  },
};
