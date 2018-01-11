<template>
 <div class="article" v-if="article">
   <div class="article-wrapper">

     <div class="about-flower-item" v-if="article">
      <div class="img" v-if="article.img">
        <img :src="'src/assets/img/articles/' + article.img" width="100%" alt="">
      </div>
      <div class="content">
       <div class="title">
        {{article.title}}
        <div class="line"></div>
        <span class="date text">{{article.date | formatDate}}</span>
      </div>

      <div class="text" v-html="article.text"></div>

      <div class="buttons" v-if="admin">
        <button class="butt butt-red" @click="showConfirm">Удалить</button>
        <router-link :to="'/edit-article/' + article.id" class="butt butt-blue" href="">Редактировать</router-link>
      </div>

    </div>
  </div>

  <comments
  :admin = "admin"
  :itemId = "article.id"
  :userId = "userId"
  :userName = "userName"
  ></comments>


</div>

<div class="confirm" v-if="isConfirm">
  <div class="confirm-modal">
    <span>Хотите удалить статью?</span>
    <div class="buttons">
      <button class="butt butt-red" @click="deleteArticle">Удалить</button>
      <button class="butt butt-blue" @click="noDelete">Отмена</button>
    </div>
  </div>
</div>

</div>
</template>

<script>

import Comments from './comments.vue';
import Article from '../models/article';
import config from '../config/config';
import Comment from '../models/comment';

export default {
  props:['userId','userName','admin'],
  data () {
    return {
      article:null,
      isConfirm:false
    }
  },
  created: function () {
    window.scrollTo(0, 0);
    this.axios.get(`${config.baseUrl}/one-article/${this.$route.params.id}`)
    .then(response => {
      this.article = new Article(response.data);
    })
    .catch(error =>{
      console.log(error);
    });
  },
  methods:{
    showConfirm(){
      if(this.admin){
       this.isConfirm = true;
     }

   },
   noDelete(){
     this.isConfirm = false;
   },
   deleteArticle(){

    this.axios.delete(`${config.baseUrl}/delete-article/${this.itemId}`)
    .then(response => {
      this.$router.push(`/articles`);
    })
    .catch(error => {
      console.log(error);
    });
  }
},
components:{
  Comments
}
}

</script>

<style lang="scss" scoped>

$title-color:#404040;
$text-color:#8b8b8b;
$border:1px solid #e9e9e9;

.title{
  font-size:25px;
  color:$title-color;
}

.text{
  font-size:15px;
  color:$text-color;
  text-align:justify;
}

.article{
  padding:0 25px;
  margin:45px 0 45px;
  font-family:MariadPro;
  .article-wrapper{
    max-width:944px;
    margin:0 auto;
  }
}

.about-flower-item{
 margin-bottom:30px;
 overflow:hidden;
 .img{
  width:400px;
  float:left;
  margin:0 20px 10px 0;
}
.title{
  text-align:left;
}
.text{
  margin-top:15px;

}
.line{
  display:inline-block;
  width:1px;
  height:14px;
  background-color:$text-color;
  margin:0 3px;
  vertical-align:middle;
}
}

.buttons{
  margin-top:20px;
  .butt{
    margin:0 10px;
    display:inline-block;
    vertical-align:middle;
  }
}

.confirm{
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background-color:rgba(0,0,0,0.5);
  display:flex;
  .confirm-modal{
    margin:auto;
    background-color:#fff;
    padding:30px;
    border-radius:4px;
    span{
      font-size:25px;
    }
    .buttons{
      text-align:center;
    }
  }
}

</style>
