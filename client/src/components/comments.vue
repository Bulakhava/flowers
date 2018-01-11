<template>
  <div class="comments">

    <router-link to="/authorization" class="message" v-if="!userId">Что-бы оставлять комментарии, авторизируйтесь</router-link>

    <form class="send-comments" v-if="userId" @submit="sendComment">
      <textarea placeholder="Ваш комментарий..." v-model="text">

      </textarea>
      <button class="butt butt-blue" type="submit">Отправить</button>
    </form>

    <div class="comments-list" v-if="comments.length">

    <div class="title">Комментарии</div>

    <div class="comment-item" v-for="item in comments">
      <div class="user">
        <span class="name">{{item.userName}}</span>
        <div class="line"></div>
        <span class="date">{{item.date | formatDate}}</span>
      </div>
      <div class="text">{{item.text}}</div>
      <button class="butt butt-red"
       v-if="admin"
       @click="deleteComment(item.id, item)"
       >Удалить</button>
    </div>

    </div>


  </div><!-- class="comments" -->


</template>

<script>

import config from '../config/config';
import Comment from '../models/comment';

export default {
  props:['userId','userName','itemId','admin'],
  data () {
    return {
      text:'',
      comments:[]
    }
  },

  methods:{
    sendComment(){
      if(this.text){

      let comment = {
         itemId:this.itemId,
         userId:this.userId,
         userName:this.userName,
         text:this.text
      }

       this.axios.post(`${config.baseUrl}/comments`, comment)
        .then(response => {
          this.text = '';
          this.getComments(this.itemId);
      })
      .catch(error => {
        console.log(error);
      });

      }//if
    },//sendComment

   getComments(itemId){
     this.comments = [];
     this.axios.get(`${config.baseUrl}/comments/${itemId}`)
      .then(response => {
      if(response.data.length){
       for(var i=0; i<response.data.length; i++){
        this.comments.push(new Comment(response.data[i]));
       }
      }//if

       })
      .catch(error =>{
        console.log(error);
     });
   },

   deleteComment(id, item){
    this.axios.delete(`${config.baseUrl}/delete-comment/${id}`)
    .then(response => {
       let i = this.comments.indexOf(item);
       this.comments.splice(i, 1);
    })
    .catch(error => {
      console.log(error);
    });
   }

  },
  created:function(){
   this.getComments(this.itemId);
  },
   watch: {
    '$route' (to, from) {
      if(to != from){
        this.getComments(this.itemId);
      }

    }
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
      text-align:left;
    }

.text{
      font-size:15px;
      color:$text-color;
      text-align:justify;
      margin-bottom:20px;
}

  .comments{
  border-top:$border;
  margin-top:30px;
  padding-top:15px;
}

form.send-comments{
  margin-bottom:20px;
  box-sizing:border-box;
  textarea{
    width:95%;
  height:80px;
  border:$border;
  margin:20px auto 12px;
  padding:10px;
  border-radius:4px;
  }

}

.comment-item{
  border-bottom:$border;
  padding:20px 0;
  .user{
    font-size:15px;
    color:$text-color;
    margin-bottom:5px;

    .name{
      color:$title-color;
    }
    .line{
      display:inline-block;
      width:1px;
      height:11px;
      background-color:$text-color;
      margin:0 3px;
      vertical-align:middle;
    }
  }
}

.message{
  display:inline-block;
  color:$title-color;
  font-size:14px;
  margin:10px 0 20px;
  text-decoration:none;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
}


</style>
