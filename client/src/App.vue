<template>
  <div class="wrapper">
   <header-scrin
     :userName = "userName"
     :admin = "admin"
     @logOut="logOut"
   ></header-scrin>

   <main>
     <router-view
     @login="setCookie"
     @isAdmin="isAdmin"
     :userId = "userId"
     :userName = "userName"
     :admin = "admin"
     ></router-view>
   </main>

   <footer-scrin></footer-scrin>
 </div>
</template>

<script>

import HeaderScrin from './components/header.vue';
import FooterScrin from './components/footer.vue';
import Home from './components/home.vue';
import GalleryFlowers from './components/gallery.vue';
import AboutFlower from './components/about-flower.vue';
import Articles from './components/articles.vue';
import OneArticle from './components/article.vue';
import Registration from './components/registration.vue';
import Authorization from './components/authorization.vue';
import AddArticle from './components/admin/add-article.vue';
import EditArticle from './components/admin/edit-article.vue';
import PasswordRecovery from './components/password-recovery.vue';

export default {
  name: 'app',
  data () {
    return {
       userId:null,
       userName:null,
       admin:null
    }
  },
  created: function () {
    this.userId = this.getCookie("flowers_userId");
    this.userName = this.getCookie("flowers_userName");
    this.admin = this.getCookie("flowers_admin");

  },
  methods:{
    setCookie(id, name){
      this.userId = id;
      this.userName = name;
      console.log(this.userId, this.userName);
      let x = new Date();
      let date = (new Date(x.setDate(x.getDate() + 1))).toUTCString();

      document.cookie = "flowers_userId=" + id + "; expires=" + date;
      document.cookie = "flowers_userName=" + name + "; expires=" + date;

    },
    isAdmin(id){
      this.admin = id;
      let x = new Date();
      let date = (new Date(x.setDate(x.getDate() + 1))).toUTCString();
      document.cookie = "flowers_admin=" + id + "; expires=" + date;
    },
    logOut(){
      this.userId = null;
      this.userName = null;
      this.admin = null;
      document.cookie = "flowers_userId=; path=/; expires=" + -1;
      document.cookie = "flowers_userName=; path=/; expires=" + -1;
      document.cookie = "flowers_admin=; path=/; expires=" + -1;
    },
    getCookie(name){

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

  }
  },

  components:{
    HeaderScrin,
    FooterScrin,
    Home,
    GalleryFlowers,
    AboutFlower,
    Articles,
    OneArticle,
    Registration,
    Authorization,
    AddArticle,
    EditArticle,
    PasswordRecovery
  }
}
</script>

<style lang="scss">

$green-color:#6fc125;
$blue-color:#4eb9f4;
$title-color:#404040;
$text-color:#8b8b8b;
$pink-color:#de6d6e;
$red-color:#ff5649;

@font-face {
  font-family: 'MariadPro';
  src:url('/src/assets/fonts/mariadPro.otf');
}

@font-face {
  font-family: 'LavanderiaC';
  src:url('/src/assets/fonts/LavanderiaC.ttf');
}

@font-face {
  font-family: 'SegoeUI';
  src:url('/src/assets/fonts/9404.ttf');
}

body{
  margin:0;
  padding:0;
}

html,body,#app {
  height: 100%;
}


.wrapper{
  height: 100%;
  margin:0 auto;
  padding:0;
  max-width:1280px;
  min-width:300px;
  display: flex;
  flex-direction: column;
}

main{
  flex-grow:1;
}

.butt {
  display:inline-block;
  overflow: hidden;
  font-size: 15px;
  padding:5px 8px;
  border-radius: 4px;
  cursor:pointer;
  transition: background-color 0.1s;
  box-shadow: 1px 1px 1px #c1c1c1;
  text-decoration:none;
  color:#fff;
  border:none;
  &:active, &:focus{
    outline:none;

  }
  &:disabled{
    background-color:#BFC3C5;
    border:1px solid #BFC3C5;
    text-shadow:none;
    &:hover{
      background-color:#BFC3C5;
      cursor:not-allowed;
    }
  }
  img {
    vertical-align: middle;
    margin-right: 8px;
  }
  sup{
    font-size:10px;
  }
}

.butt-green{
  background-color:$green-color;
  &:hover{
        background-color:lighten($green-color, 10%);
      }
}

.butt-blue{
  background-color:$blue-color;
  &:hover{
        background-color:lighten($blue-color, 10%);
      }
}

.butt-red{
  background-color:$red-color;
  &:hover{
        background-color:lighten($red-color, 10%);
      }
}


.user-form{
  color:$title-color;
  font-family:MariadPro;
  width:400px;
  margin:40px auto;
  .title{
    font-size:27px;
    text-align:center;
    margin-bottom:15px;
  }
  div.form-group{
  margin-bottom:15px;
  label, input,textarea{
    display:block;
    margin-bottom:10px;
    font-size:15px;
  }
  input, textarea{
    width:100%;
    border:1px solid #BFC3C5;
    padding:7px;
    border-radius:2px;
    color:$text-color;
    &.error{
      border:1px solid $pink-color;
         // border-color:$pink-color;
        }
  }
  textarea{
    height:300px;
  }
  label{
    display:inline-block;
    position: relative;
    &:not(.not-required):after{
      position: absolute;
      content:"*";
      color: $pink-color;
      font-size:21px;
      top:1px;
      margin-left:2px;
    }
  }
  .message{
    float:right;
    display:inline-block;
    font-size:15px;
    color: $pink-color;
  }

}
.form-buttons{
  margin-top:30px;
  a{
    float:right;
    color:$text-color;
    text-decoration:none;
    &:hover{
      text-decoration:underline;
    }
  }
}

}

.exist{
  color:$pink-color;
  font-size:16px;
}


</style>
