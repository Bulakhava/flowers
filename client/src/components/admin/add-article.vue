<template>
  <div class="add-article">
    <div class="add-article-wrapper user-form">
     <div class="title">Добавить статью</div>

     <form @submit="addArticle">

      <div class="form-group">
        <label>Заголовок</label>
        <input type="text" required v-model="title">
      </div>
      <div class="form-group">
        <label class="not-required">Фото</label>
        <input type="text" v-model="img">
      </div>
      <div class="form-group">
        <label>Текст</label>
        <textarea required v-model="text"></textarea>
      </div>

      <button class="butt butt-blue" type="submit">Отправить</button>

    </form>

  </div>
</div>
</template>

<script>

import config from '../../config/config';

export default {

  data () {
    return {
        title:null,
        img:null,
        text:null
    }
  },
  methods:{
     addArticle(e){
      e.preventDefault();

       let article = {
        title:this.title,
        img:this.img,
        text:this.text
       }

       this.axios.post(`${config.baseUrl}/add-article`, article)
      .then(response => {
        this.$router.push('/articles');
      })
      .catch(error => {
        console.log(error);
      });
     }
  }
}
</script>

<style lang="scss">

$title-color:#404040;
$text-color:#8b8b8b;
$border:1px solid #e9e9e9;

.title{
  font-size:25px;
  color:$title-color;
  text-align:center;
}


.add-article{
  padding:0 25px;
  margin:45px 0 45px;
  font-family:MariadPro;

  .add-article-wrapper{
    max-width:944px;
    margin:0 auto;
    &.user-form{
      width:100%;
    }
  }
}

</style>
