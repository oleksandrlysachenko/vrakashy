module.exports = {

    TEMP_USER: {
        login: 'temp0',
        password: '12345',
        confirmPassword: '12345',
        profile: {
            first: 'First',
            last: 'Last',
            email: 'example@gmail.com'
        },
        options: {
            verifyRegistration: true
        }
    },

    TEMP_LOGIN_USER: {
        login: 'temp0',
        password: '12345',
        confirmPassword: '12345'
    },

    //TODO enter real mail to check test with verification, invite or forgot password
    CUSTOM_USER: {
        login: 'default',
        password: '12345',
        confirmPassword: '12345',
        profile: {
            first: 'First',
            last: 'Last',
            email: 'death.moroz.dma@gmail.com'
        }
    },

    CUSTOM_LOGIN_USER: {
        login: 'default',
        password: '12345',
        confirmPassword: '12345'
    },

    CUSTOM_LOGIN_USER_NEW_PASS: {
        login: 'default',
        password: 'newPass',
        confirmPassword: 'newPass'
    }
};