import authReducer from '../../reducers/auth'

test('should set uid in state after dispatching login', () => {
    const state = authReducer(undefined, {
        type: 'LOGIN',
        uid: '1a2b3c'
    })
    expect(state.uid).toEqual('1a2b3c')
})

test('should clear uid', () => {
    const state = authReducer({ uid: 'anything' }, {
        type: 'LOGOUT'        
    })
    expect(state).toEqual({})
})