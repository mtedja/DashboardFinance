// import defaultUser from '../utils/default-user';
import axios from 'axios';

export async function signIn(email, password) {
  try {
    // Send request
    // console.log(email, password);

    const host = 'https://back.member.dst.technology';

    let request = {
      "usernameemail": email,
      "userpassword": password
    };

    const response = await axios.post(host + '/api/auth/signin', request);

    if (response.data.status.status === 1) {
      localStorage.setItem('tableuserindex', response.data.result.userinfo.tableuserindex)
      localStorage.setItem('tableusername', response.data.result.userinfo.tableusername)
      localStorage.setItem('tableusernick', response.data.result.userinfo.tableusernick)
      localStorage.setItem('tableusertoken', response.data.result.userinfo.tableusertoken)
      return {
        isOk: true,
        data: response.data.result.userinfo
      };
    } else if (response.data.status.status === 0) {
      const code = response.data.status.code;

      if (code === '005005015015') {
        const msg = "System couldn't find Combination of user name / email and password";
        return {
          isOk: false,
          message: msg
        };
      }
    }
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function getUser(user) {
  try {
    // Send request

    return {
      isOk: true,
      data: user
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
