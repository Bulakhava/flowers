<template>
  <section class="recent-articles">
    <div class="recent-articles-wrapper">

       <div class="article" v-for="item in articles">
         <div class="article-img" v-if="item.img">
           <img :src="'src/assets/img/articles/' + item.img" width="100%" alt="">
         </div>
         <div class="article-content">
           <div class="title">
            <span>{{item.title}}
              <div class="line"></div>
              <span class="date text">{{item.date | formatDate}}</span>

            </span>


            <router-link :to="'/article/' + item.id">
             Читать полностью
           </router-link>
          </div>
           <div class="text" v-html="item.text">

           </div>
         </div>
       </div>

    </div>
  </section>
</template>

<script>

export default {
  props:['articles'],
  data () {
    return {}
  },

 }
</script>

<style lang="scss" scoped>

$text-color:#8b8b8b;

.recent-articles-wrapper{
  max-width:944px;
  margin:45px auto 0;
  padding:0 25px;
}

.article{
  margin-bottom:30px;
  overflow:hidden;
}

.article-img{
  width:200px;
  float:left;
  margin:0 20px 4px 0;
}

.article-content{
  font-family:MariadPro;

  .title{
    font-size:25px;
    color:#404040;
    text-align:left;
   display:flex;
   justify-content:space-between;
   align-items:center;
   .line{
      display:inline-block;
      width:1px;
      height:14px;
      background-color:$text-color;
      margin:0 3px;
      vertical-align:middle;
    }
    .date{
      font-size:15px;
    }
   a{
   color:#404040;
   font-size:14px;
   text-decoration:none;
   //float:right;
   &:hover{
    text-decoration:underline;
   }
   }
  }
  .text{
    margin-top:15px;
    font-size:15px;
    color:#8b8b8b;
    text-align:justify;
  }
}


@media(max-width:640px){
  .article{
    flex-direction:column;
    margin-bottom:40px;
    .article-img{
     width:100%;
    }
    .article-content{
      width:100%;
      padding-left:0;
     }
  }
}


@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {

  .article{
    overflow: hidden;
  }

.article-img{
  float:left;
  margin-right: 20px;
}

.article-content{
 width:auto;
 .title{
  a{
    float:right;
  }
 }

}

}


</style>
