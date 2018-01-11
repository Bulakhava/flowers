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

/*const flowers = [
{
  id:'1',
  name:'Георгины',
  img:'georgin.jpg',
  pict:[],
  index: null
},
{
  id:'1',
  name:'Лилии',
  img:'lilia2.jpg',
  pict:[
  'src/assets/img/flowers/IMG_1780.jpg','src/assets/img/flowers/S7004237.jpg','src/assets/img/flowers/S7005280.jpg', 'src/assets/img/flowers/S7005300.jpg'
  ],
  index: null
},
{
  id:'1',
  name:'Пионы',
  img:'pion.jpg',
  pict:[
  'src/assets/img/flowers/ballerina01.jpg','src/assets/img/flowers/bunker hill04.jpg','src/assets/img/flowers/cora stubbs05.jpg', 'src/assets/img/flowers/coral sunset02.jpg'
  ],
  description:null
},
{
  id:'1',
  name:'Астильбы',
  img:'astilba.jpg',
  pict:[],

},
{
  id:'1',
  name:'Гладиолусы',
  img:'gladiolus.jpg',
  pict:[],

},
{
  id:'1',
  name:'Ирисы',
  img:'iris.jpg',
  pict:[]
},
{
  id:'1',
  name:'Лилейники',
  img:'lileinik.jpg',
  pict:[]
},
{
  id:'1',
  name:'Нарциссы',
  img:'narciss.jpg',
  pict:[]
},
{
  id:'1',
  name:'Розы',
  img:'rose.jpg',
  pict:[]
},
{
  id:'1',
  name:'Нивяник',
  img:'nivianik.jpg',
  pict:[]
},
{
  id:'1',
  name:'Рудбекия',
  img:'rudbekia.jpg',
  pict:[]
},
{
  id:'1',
  name:'Тюльпаны',
  img:'tulpan.jpg',
  pict:[]
},
{
  id:'1',
  name:'Флоксы',
  img:'flox.jpg',
  pict:[]
},
{
  id:'1',
  name:'Хосты',
  img:'hosts.jpg',
  pict:[]
},
{
  id:'1',
  name:'Хризантемы',
  img:'hrisantem.jpg',
  pict:[]
},
{
  id:'1',
  name:'Эхинацеи',
  img:'ehinacea.jpg',
  pict:[]
},
];*/


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

  //console.log(this.flowers);
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
