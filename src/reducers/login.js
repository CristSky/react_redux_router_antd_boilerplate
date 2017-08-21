export const LOGIN = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
};


//async action
export const fetchFakeLogin = (payload = {}) => {
    return dispatch => {
        return Promise.resolve(dispatch(get_credentials(payload)))
    }
};


//action creator
export const get_credentials = payload => ({type: LOGIN.LOGIN, payload});
export const set_logout = payload => ({type: LOGIN.LOGOUT, payload});


// reducer function
export function login(state = [], action) {
    const {type, payload} = action;

    switch (type) {
        case LOGIN.LOGIN:
            return payload;

        case LOGIN.LOGOUT:
            return payload;
    }

    return state
}