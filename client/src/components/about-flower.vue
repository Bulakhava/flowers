<template>
  <div class="about-flower">
    <div class="about-flower-wrapper">

      <div class="about-flower-item" v-if="flower">
        <div class="img">
          <img :src="'src/assets/img/gallery/' + flower.img" width="100%" alt="">
        </div>
        <div class="content">
         <div class="title">{{flower.name}}</div>
         <div class="text" v-html="flower.description">

         </div>
       </div>


       <div class="image butt butt-green"
       v-if="flower.pict.length && !sorts.length"
       @click="images = flower.pict; index = 0"
       >
       Фото <sup>{{flower.pict.length}}</sup>
     </div>

     <div class="sorts">

       <div class="about-flower-item sort-item" v-for="sort in sorts">
         <div class="about-flower-item-content">
         <div class="img sort-img" v-if="sort.pict.length">
           <img :src="sort.pict[0]" width="100%" alt="">
         </div>
         <div class="content">
           <div class="title">{{sort.name}}</div>
           <div class="text" v-html="sort.description">

          </div>
        </div>
</div>
         <div class="image butt butt-green"
         v-if="sort.pict.length"
         @click="images = sort.pict; index = 0"
       >
       Фото <sup>{{sort.pict.length}}</sup>
     </div>

      </div><!--  sort-item -->

    </div><!-- sorts -->

    <gallery :images="images" :index="index" @close="index = null"></gallery>

    <comments
    :admin = "admin"
    :itemId = "flower.id"
    :userId = "userId"
    :userName = "userName"
    ></comments>


  </div><!-- class="about-flofgwer-item" -->

  <div class="categories">

    <div class="title">
      Категории
    </div>

    <ul>
      <li v-for="item in flowers"><span
       @click="chooseFlower(item)"
       :class="{ active: item.id == flower.id }"
       >{{item.name}}</span></li>
    </ul>

  </div>

</div>
</div>
</template>

<script>

import Comments from './comments.vue';
import VueGallery from 'vue-gallery';
import Flower from '../models/flower';
import Sort from '../models/sort';
import config from '../config/config';

export default {
  props:['userId','userName','admin'],
  data () {
    return {
      flowers:[],
      sorts:[],
      flower:null,
      images: [],
      index: null
    }
  },
  created: function () {

    this.axios.get(`${config.baseUrl}/flowers`)
    .then(response => {

     for(var i=0; i<response.data.length; i++){
      this.flowers.push(new Flower(response.data[i]));
      if(this.flowers[i].id == this.$route.params.id){
        this.flower = this.flowers[i];
      }
     }
     if(!this.flower){
      this.flowers.forEach((el)=>{
         if(el.alias == 'narcissus'){
          this.flower = el;
         } ;
        });
      }

    if(this.flower.isSorts){
      this.getSorts(this.flower.alias);
    }

  })
    .catch(error =>{
      console.log(error);
    });
  },
  methods:{
    chooseFlower(item){
      this.$router.push(`/catalog/${item.id}`);
      this.sorts.length = 0;
      this.flower = item;
      if(this.flower.isSorts){
        this.getSorts(this.flower.alias);
      }

      window.scrollTo(0, 0);

   },
   getSorts(alias){
     this.axios.get(`${config.baseUrl}/sorts/${alias}`)
      .then(response => {
       for(var i=0; i<response.data.length; i++){
        this.sorts.push(new Sort(response.data[i]));
       }
       })
      .catch(error =>{
        console.log(error);
     });

  }

  },
  components:{
    Comments,
    'gallery': VueGallery
  }
}

</script>

<style lang="scss" scoped>

$title-color:#404040;
$text-color:#8b8b8b;
$border:1px solid #e9e9e9;
$blue-color:#4eb9f4;

.title{
 font-size:25px;
 color:$title-color;
}

.text{
  font-size:15px;
  color:$text-color;
  text-align:justify;
}

.about-flower{
  padding:0 25px;
  margin:45px 0 45px;
  font-family:MariadPro;

  .about-flower-wrapper{
    max-width:944px;
    margin:0 auto;
    display:flex;
  }
  .content{
    .title{
      text-align:left;
    }
    .text{
      margin-top:15px;

    }
  }
}
.about-flower-item-content{
  overflow:hidden;
}
.about-flower-item{
  width:80%;
  overflow:hidden;

  .img{
    width:300px;
    float:left;
    margin:0 20px 10px 0;

  }
  .butt{
    //float:right;
  }

}

.image{
  margin-top:20px;
  //float:right;
}


.categories{
 width:20%;
 padding-left:60px;
 .title{
  text-align:left;
 }

 ul{
  padding:0;
  margin:0;
  list-style:none;
  margin-top:15px;
  font-size:15px;
  color:#8b8b8b;
  li{
    border-bottom:$border;
    padding:12px 0;
    span{
      &:hover{
        cursor:pointer;
        text-decoration:underline;
      }
      &.active{
        color:$blue-color;
        &:hover{
          cursor:inherit;
          text-decoration:none;
        }
      }
    }
  }
}
}

.sorts{
  margin-top:30px;
}

.sort-item{
  border-top:$border;
  padding:20px 0;
  width:100%;
  .sort-img{
    width:180px;
  }
  .title{
    font-size:20px;
  }
}

@media(max-width:640px){

  .about-flower{
    .about-flower-wrapper{
      flex-direction:column;
    }
  }
  .about-flower-item{
    width:100%;
    order:2;
    .img{
    //width:100%;
  }
}
.categories{
 padding-left:0;
 width:100%;
 order:1;
 margin-bottom:30px;
 padding-bottom:20px;
 border-bottom:$border;
 ul{
  display:flex;
  flex-wrap:wrap;
  li{
    padding: 6px 15px 6px 0;
    border:none;
  }
}
}

}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {

  .about-flower-wrapper{
    white-space: nowrap;
  }

  .about-flower-item,.categories{
    display:inline-block;
    white-space:normal;
  }

}

</style>
