import { login, logout } from '../../actions/auth'

test('should dispatch login action', () => {
    const uid = 'a1b23c'
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('should dispatch logout action', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})