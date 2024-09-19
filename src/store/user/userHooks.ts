// application
import { useAppAction, useAppSelector } from '~/store/hooks';
import { USER_NAMESPACE } from '~/store/user/userReducer';
import {
    userEditProfile,
    userSignIn,
    userSignOut,
    userSignUp,
} from '~/store/user/userAction';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userSetCurrent } from '~/store/user/userAction';

export const useUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // If user is found, set it in the Redux store
      dispatch(userSetCurrent(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return useAppSelector((state) => state[USER_NAMESPACE].current);
};

export const useUserSignIn = () => useAppAction(userSignIn);

export const useUserSignUp = () => useAppAction(userSignUp);

export const useUserSignOut = () => useAppAction(userSignOut);

export const useUserEditProfile = () => useAppAction(userEditProfile);
