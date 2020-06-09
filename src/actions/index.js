/*
 * action types
 */

export const LOGIN = 'LOGIN';

/*
 * action creators
 */

export function login(user) {
  return { type: LOGIN, user };
}