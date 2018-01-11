<template>

<section class="links">

<div class="image">
  <img src="src/assets/img/rose.jpg" width="100%" alt="">
</div>



 <div class="links-wrapper">
  <div class="title">
    Добро пожаловать в мой сад!
  </div>
  <div class="text">
    Приглашаю вас полюбоваться цветами из моего сада. Самыми любимыми из них являются нарциссы, сортов которых у меня больше 100. Но и их компаньоны, сортовым числом хоть и поменьше, тоже достойны того, чтобы покрасоваться. Ведь все цветы очаровательны. Некоторых из них по разным причинам в саду уже нет, но посмотреть на них тоже приятно. Постоянно будет добавляться что-то новенькое. Так что наслаждайтесь красотой и разнообразиеи Природы!
  </div>

  <div class="links-container">
   <div class="flex-item">
    <router-link to="/articles" class="link-item link-item-blue">
      <div class="img">
        <img src="src/assets/img/tickets.png" alt="">
      </div>
      <div class="title">Статьи</div>
    </router-link>
  </div>
   <div class="flex-item">
    <router-link to="/gallery" class="link-item link-item-green">
      <div class="img">
        <img src="src/assets/img/camera.png" alt="">
      </div>
      <div class="title">Фото</div>
    </router-link>
  </div>
  <div class="flex-item">
    <a href="#" class="link-item link-item-red">
      <div class="img">
        <img src="src/assets/img/beer.png" width="70" alt="">
      </div>
      <div class="title">Обо мне</div>
    </a>
</div>
<div class="flex-item">
    <a href="#" class="link-item link-item-orange">
      <div class="img">
        <img src="src/assets/img/iPad.png" width="70" alt="">
      </div>
      <div class="title">Контакты</div>
    </a>
</div>
  </div>
</div>

</section>

</template>


<script>

export default {

  data () {
    return {

    }
  }

 }
 </script>

 <style lang="scss">

 $title-color:#404040;
 $title-size:35px;
 $text-color:#636363;

 .links-wrapper{
  max-width:944px;
  margin:0 auto;
padding:0 25px;
 }

.links{
  text-align:center;
  font-family:MariadPro;
  border-bottom: 1px solid #e9e9e9;
  .title{
     color:$title-color;
     font-size:$title-size;
     margin-top:55px;
  }
  .text{
    color:$text-color;
    font-size:17px;
    margin-top:22px;
    line-height:1.5;
  }
}


.links-container{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  margin:50px 0 50px;

  .link-item{
    display:block;
    text-decoration:none;
    width:180px;
    height:180px;
    border-radius:100%;
    background-color:red;
    text-align:center;
    &-blue{
      background-color:#4eb9f4;
      &:hover{
        background-color:lighten(#4eb9f4, 15%);
      }
    }
     &-green{
      background-color:#6fc125;
      &:hover{
        background-color:lighten(#6fc125, 15%);
      }
    }
     &-red{
      background-color:#ff5649;
      &:hover{
        background-color:lighten(#ff5649, 15%);
      }
    }
     &-orange{
      background-color:#e48f23;
      &:hover{
        background-color:lighten(#e48f23, 15%);
      }
    }
    .img{
      height:120px;
      display:flex;
      align-items:flex-end;
      justify-content:center;
    }
    .title{
      font-family:MariadPro;
      color:#fff;
       font-size:17px;
       margin-top:10px;
    }
  }
}


@media(max-width:800px){
  .links-container{
    .flex-item{
      width:50%;
      margin-top:25px;
      .link-item{
        margin:0 auto;
      }
    }

  }
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {

.links-container{
  .flex-item{
    display:inline-block;
    margin:0 20px;
    .link-item{
    display:inline-block;
    .img{
      img{
        margin-top:30px;
        border: none;
      }
    }
  }
  }

}

}


 </style>
