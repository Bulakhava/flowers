<template>

<div class="user-form">
  <div class="title">Восстановление пароля</div>
  <form class="registration" @submit.prevent="recovery" v-if="!message">

    <div class="form-group">
        <label>Введите ваш Email</label>
        <input type="email" v-model="email" required>
    </div>


    <div v-if="incorrect" class="not-match exist">Пользователя с таким email-ом не существует</div>

    <button class="butt butt-blue" type="submit">Отправить</button>

  </form>

<div v-if="message" class="message">Новый пароль отправлен вам на почту</div>

</div>

</template>

<script>

import config from '../config/config';

export default {

  data () {
    return {
     email:'',
     incorrect:false,
     message:false
    }
  },

  methods:{
    recovery(){

      let userEmail = {
      email:this.email
     };

     this.axios.post(`${config.baseUrl}/password-recovery`, userEmail)
      .then(response => {

       console.log(response.data);
       if(response.data.message == 'No user'){
        this.incorrect = true;
       }

       if(response.data.message == 'check your email'){
          this.message = true;
       }

      })
      .catch(error => {
        console.log(error);
      });

    }
  }
}

</script>

<style lang="scss" scoped>

.title{
  margin-bottom:50px;
}
.exist{
  margin-bottom:20px;
}

.message{
  text-align:center;
  font-size:20px;
}

</style>
