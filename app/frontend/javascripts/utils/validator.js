export const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const validatePassword = (password) => password && password.length >= 8 && password.length <= 16

export const validateEqual = (value, target) => value === target
