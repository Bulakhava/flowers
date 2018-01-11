<template>
  <div class="add-article">
    <div class="add-article-wrapper user-form">
     <div class="title">Редактировать статью</div>

     <form @submit="editArticle">

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

<div class="buttons">
      <button class="butt butt-blue" type="submit">Отправить</button>
      <router-link class="butt butt-red" :to="'/article/' + articleId">Отменить</router-link>
</div>

    </form>

  </div>
</div>
</template>

<script>

import Article from '../../models/article';
import config from '../../config/config';

export default {
  props:['admin'],
  data () {
    return {
      title:null,
      img:null,
      text:null,
      articleId:null
    }
  },
  created:function(){
    if(this.admin){

      this.axios.get(`${config.baseUrl}/one-article/${this.$route.params.id}`)
      .then(response => {
        this.article = new Article(response.data);
        this.title = this.article.title;
        this.img = this.article.img;
        this.text = this.article.text;
        this.articleId = this.article.id;

     })
      .catch(error =>{
        console.log(error);
      });

      }//if


    },
    methods:{
      editArticle(e){
        e.preventDefault();

        let article = {
          title:this.title,
          img:this.img,
          text:this.text
        }

        this.axios.put(`${config.baseUrl}/edit-article/${this.articleId}`, article)
        .then(response => {

         this.$router.push(`/article/${this.articleId}`);
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

.buttons{
  margin-top:30px;
  .butt{
  display:inline-block;
  vertical-align:middle;
  margin-right:10px;
}
}


</style>
