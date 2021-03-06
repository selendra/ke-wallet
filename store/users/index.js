import Cookie from 'js-cookie';

export const state = () => ({
  token: '',
  res_msg: {
    msg: '',
    type: ''
  }
})

export const mutations = {
  set_token(state, token) {
    state.token = token;
  },
  set_msg(state, msg) {
    state.res_msg.msg = msg;
  },
  set_type(state, type) {
    state.res_msg.type = type;
  }
}

export const actions = {
// LogIn
  async handleLogin({commit}, data) {
    await this.$axios.post(process.env.apiUrl + '/loginbyphone', {
      phone: data.phone,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.token) {
        const token = await res.data.token;
        await commit('set_token', token);
        await commit('set_type', 'success');
        Cookie.set('jwt', token);
        this.$router.push('/');
      } else if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Login Email
  async handleLoginbyEmail({commit}, data) {
    await this.$axios.post(process.env.apiUrl + '/loginbyemail', {
      email: data.email,
      password: data.password
    })
    .then(async(res) => {
      if(res.data.token) {
        const token = await res.data.token;
        await commit('set_token', token);
        await commit('set_type', 'success');
        Cookie.set('jwt', token);
        this.$router.push('/');
      } else if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'error');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Register
  async handleRegister({commit}, data) {
    await this.$axios.post(process.env.apiUrl + '/registerbyphone', {
      phone: data.phone,
      password: data.password
    })
    .then(async(res) => {
      await commit('set_msg', res.data.message);
    })
  },
// Register Email
  async handleRegisterEmail({commit}, data) {
    await this.$axios.post(process.env.apiUrl + '/registerbyemail', {
      email: data.email,
      password: data.password
    })
    .then(async(res) => {
      await commit('set_msg', res.data.message);
    })
  },
// Get Wallet 
  async handleGetWallet({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post(process.env.KEUrl + '/wallet', {
      pin: data.pin
    }, config)
    .then(async (res)=> {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  }, 
// Send Payment
  async handleSendPayment({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post(process.env.KEUrl + '/sendpayment', {
      pin: data.pin,
      destination: data.destination,
      amount: data.amount
    }, config)
    .then(async (res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Verify
  async handleVerify({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post(process.env.apiUrl + '/userprofile', {
      first_name: data.first_name,
      mid_name: data.mid_name,
      last_name: data.last_name,
      gender: data.gender
    }, config)
    .then(async (res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// Add Asset
  async handleAddAsset({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post(process.env.apiUrl + '/addasset', {
      asset_code: data.asset_code,
      asset_issuer: data.asset_issuer
    }, config)
    .then(async(res) => {
      await commit('set_msg', res.data.message)
    })
  },
// Change Password
  async handleChangePassword({commit}, data) {
    const token = Cookie.get('jwt');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    await this.$axios.post(process.env.apiUrl + '/change-password', {
      current_password: data.current_password,
      new_password: data.new_password
    }, config)
    .then(async(res) => {
      if(res.data.message) {
        await commit('set_msg', res.data.message);
        await commit('set_type', 'success');
      } else {
        await commit('set_msg', res.data.error.message);
        await commit('set_type', 'error');
      }
    })
  },
// LogOut
  handleLogout({commit}) {
    Cookie.remove('jwt');
    commit('set_token', '');
    this.$router.push('/login');
  }
}