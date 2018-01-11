<template>

  <div class="user-form">

    <div class="title">Регистрация</div>
    <form class="registration">
      <div class="form-group">
        <label>Имя</label>
        <div class="message">{{ validation.firstError('name') }}</div>
        <input type="text" v-model="name" :class="{error: validation.hasError('name')}">
      </div>
      <div class="form-group">
        <label>Email</label>
        <div class="message">{{ validation.firstError('email') }}</div>
        <input type="email" v-model="email" :class="
        {error : validation.hasError('email')}">
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <div class="message">{{ validation.firstError('password') }}</div>
        <input type="password" v-model="password" :class="{error: validation.hasError('password')}">
      </div>
      <div class="form-group">
        <label>Повторите пароль</label>
        <div class="message">{{ validation.firstError('repeat') }}</div>
        <input type="password" v-model="repeat" :class="{error: validation.hasError('repeat')}">
      </div>

      <div class="not-match exist" v-if="incorrect">Пользователь с таким email-ом уже существует</div>

      <div class="form-buttons">
        <button class="butt butt-blue" type="submit" @click.prevent="submit" :disabled="validation.hasError()||!validation.isTouched('email') || !validation.isTouched('password') ||  !validation.isTouched('repeat') ||  !validation.isTouched('name')">Зарегистрироваться</button>
      </div>
      <!-- <div class="not-match" *ngIf="alert">Пароли не совпадают</div> -->


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
      name:'',
      email:'',
      password:'',
      repeat:'',
      incorrect:false,
    }
  },

  validators: {
    name: function(value) {
     return Validator.value(value).required('Заполните это поле').regex('^[а-яА-ЯёЁa-zA-Z0-9]+$','Только буквы и цифры');
   },
   password: function (value) {
     return Validator.value(value).required('Заполните это поле').minLength(6,'Мининум 6 знаков');
   },
   'repeat, password': function (repeat, password) {
     if (this.submitted || this.validation.isTouched('repeat')) {
      return Validator.value(repeat).required('Заполните это поле').match(password, 'Не совпадают');
    }
  },
   email: function (value) {
     return Validator.value(value).required('Заполните это поле').email('Введите верный email');
 }
},

methods:{

submit: function () {

  let user = {
    name:this.name,
    email:this.email,
    password:this.password
  };

 // console.log(user);

  this.axios.post(`${config.baseUrl}/register`, user)
  .then(response => {
    console.log(response);
    if(response.data.message === 'Есть такой!'){
      this.incorrect = true;
    }else if(response.data.message === 'Вы успешно зарегистрировались'){

      this.$router.push('/authorization');
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


</style>

