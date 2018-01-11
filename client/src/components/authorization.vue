<template>

  <div class="user-form">

    <div class="title">Вход</div>
    <form class="registration">
      <div class="form-group">
        <label>Email</label>
        <div class="message">{{ validation.firstError('email') }}</div>
        <input type="email" v-model="email" :class="{error: validation.hasError('email')}">
      </div>
      <div class="form-group form-group-password">
        <label>Пароль</label>
        <router-link to="/password-recovery" class="forgot">Забыли?</router-link>
        <input type="password" v-model="password" :class="{error: validation.hasError('password')}">
      </div>

<div v-if="incorrect" class="not-match exist">Неверный логин или пароль</div>

<div class="form-buttons">
      <button class="butt butt-blue" type="submit" @click.prevent="logIn" :disabled="validation.hasError() || !validation.isTouched('email') || !validation.isTouched('password')">Войти</button>
      <router-link to="/registration">Регистрация</router-link>
</div>


    </form>


  </div>

</template>

<script>

var SimpleVueValidation = require('simple-vue-validator');
var Validator = SimpleVueValidation.Validator;
import config from '../config/config';


export default {

  data () {
    return {
      email:'',
      password:'',
      incorrect:false

    }
  },
  validators: {

    email: function (value) {
      return Validator.value(value).required('Заполните это поле');
    },

    password: function (value) {
      return Validator.value(value).required('Заполните это поле');
    }
  },
  methods:{

    logIn: function() {

     let user = {
      email:this.email,
      password:this.password,
     };


     this.axios.post(`${config.baseUrl}/login`, user)
      .then(response => {
        if(response.data.message === 'No authorization'){
          this.incorrect = true;
        }if(response.data.message === 'Admin'){
           this.$emit('isAdmin', response.data.id);
        }if(response.data.message === 'Authorization' || response.data.message === 'Admin'){
          this.incorrect = false;
          this.$emit('login', response.data.id, response.data.name);
          this.$router.push('/');
        }

      })
      .catch(error => {
        console.log(error);
      });
     }
   }

}

</script>

<style lang="scss">

$text-color:#8b8b8b;


.form-group-password{
  position:relative;
  .forgot{
    position:absolute;
    right:0;
    top:0;
    font-size:14px;
   color:$text-color;
   cursor:pointer;
   &:hover{
    text-decoration:underline;
   }
  }
}

</style>

