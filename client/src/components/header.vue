<template>
  <div class="container">

   <div class="header-top">
    <div class="header-wrapper">

     <div class="logo">
       <span class="gray">Нарцисс</span> <span class="pink">и К</span>
     </div>

     <nav class="menu">
       <ul>
         <li><router-link to="/">Главная</router-link></li>
         <li><router-link to="/catalog/12">Каталог</router-link></li>
         <li><router-link to="/gallery">Гелерея</router-link></li>
         <li><router-link to="/articles">Статьи</router-link></li>
         <li><router-link to="/add-article" v-if="admin">Добавить статью</router-link></li>
       </ul>
     </nav>

     <div class="input-panel" v-if="!userName">
        <ul>
          <li id="login">
            <router-link to="/authorization" id="login-trigger" href="#">Вход</router-link>
          </li>
          <li id="signup">
            <router-link to="/registration" id="link-registr">Регистрация</router-link>
          </li>
        </ul>
      </div>

      <div class="user" v-if="userName">
        <!-- <img src="src/assets/img/user.png" width="24" alt=""> -->
        <div class="name">Привет, {{userName}}</div>
        <div class="exit" @click="$emit('logOut')">Выйти</div>
      </div>

  </div>
   </div><!-- class="header-top -->

</div>
</template>

<script>

export default {
  props:['userName','admin'],
  data () {
    return {

    }
  },
  methods:{

  },
 }
 </script>

 <style lang="scss"  scoped>

 $pink-text-color:#be516b;
 $pink-color:#de6d6e;


.container{
  border-bottom: 1px solid #e9e9e9;
}

.header-wrapper{
  max-width:944px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  min-height:90px;
  margin:0 auto;
}

.header-top{

  background-color:#fff;
  padding:0 25px;

  .logo{
    font-family:LavanderiaC;
    font-size:41px;
    min-width:200px;
    flex-grow:1;
    text-align:left;
    .gray{
      color:#3e3e3e;
    }
    .pink{
      color:$pink-text-color;
    }
  }
}

nav.menu{
  ul{
    display:flex;
    list-style:none;
    flex-wrap:wrap;
    li{
      margin-left:40px;
      a{
        font-family:SegoeUI;
        text-decoration:none;
        font-size:17px;
        color:#7c7676;
        &:hover{
          color:$pink-color;
        }
      }
    }
  }
}

.input-panel{
  margin-left:40px;
  ul{
    display:flex;
    list-style:none;
    background-color:$pink-color;
    margin:0;
    padding:0;
    height:26px;
    border-radius:3px;
    overflow:hidden;
    li{
      &:hover{
        background-color:lighten($pink-color, 15%);
      }
      a{
       font-family:SegoeUI;
        text-decoration:none;
        font-size:17px;
        color:#fff;
        padding:8px;

      }
    }
  }
#login{
  border-right: 1px solid lighten($pink-color, 10%);
}

}

.user{
  font-family:SegoeUI;
  margin-left:40px;
  text-align:center;
  .name{
     color:$pink-text-color;
     display:inline-block;
  }
  .exit{
    margin-left:10px;
    color:#7c7676;
    text-decoration:underline;
    cursor:pointer;
    display:inline-block;
  }
  img{
    vertical-align:bottom;
    margin-right:3px;
  }
}

@media(max-width:700px){
  nav.menu{
   // display:none;
  }
}


@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {

.header-wrapper{
  padding-top: 20px;
}

.logo, .menu, .input-panel{
  display:inline-block;
  margin:0 35px;
}

  ul{
    li{
      display:inline-block;
    }
  }
.input-panel{
  a{
    display:block;
    line-height: 10px;
  }
}

}



</style>
