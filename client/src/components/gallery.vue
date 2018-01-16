<template>

  <div class="gallery">
    <div class="gallery-wrapper">

      <div class="gallery-item" v-for="item in flowers">
       <div class="img">
         <img :src="'src/assets/img/gallery/' + item.img" width="100%" alt="">
       </div>

       <div class="title">
        {{item.name}}
      </div>

      <div class="gallery-links">

        <div class="image butt butt-green"
        v-if="item.pict.length"
        @click="images = item.pict; index = 0">
        Фото <sup>{{item.pict.length}}</sup>
      </div>

      <router-link class="butt butt-blue" :to="'/catalog/' + item.id">
       Описание
     </router-link>

   </div>

 </div>

 <gallery :images="images" :index="index" @close="index = null"></gallery>

</div>
</div>

</template>

<script>

import VueGallery from 'vue-gallery';
import Flower from '../models/flower';
import config from '../config/config';

export default {
  data () {
    return {
      flowers:[],
      images: [],
      index: null
    }
  },
  created: function () {

    this.axios.get(`${config.baseUrl}/flowers`)
   .then(response => {

   for(let i of response.data){
    this.flowers.push(new Flower(i));
   }

  })
   .catch(error =>{
    console.log(error);
  });
 },
 methods:{

 },
 components: {
  'gallery': VueGallery
}
}
</script>

<style lang="scss">

.gallery{
  padding:0 25px;
  margin:55px 0 10px;
  font-family:MariadPro;
  .gallery-wrapper{
    max-width:944px;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
  }
}
.gallery-item{
 width:32%;
 margin-bottom:30px;
 .title{
  font-size:20px;
  margin-top:5px;
  text-align:left;
}
.gallery-links{
  margin-top:10px;

  a{
    display:inline-block;

  }
  .image{
    margin-right:5px;
    display:inline-block;
  }
}
}

@media(max-width:640px){
  .gallery-item{
    width:48%;
  }

}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {

  .gallery-wrapper{
    white-space:nowrap;
    text-align:center;
  }
  .gallery-item{
    white-space:normal;
    display:inline-block;
    margin-right:20px;
    text-align:left;
  }

}


</style>
