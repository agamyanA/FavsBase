export interface IAuth {
    isSignedUp: boolean,
    cred: {
        email: string,
        pw: string
    }
}