<template>

<div>
   <links-block></links-block>
   <recent-articles
    :articles = "articles"
   ></recent-articles>
</div>

</template>

<script>

import LinksBlock from './links-block.vue';
import RecentArticles from './recent-articles.vue';
import Article from '../models/article';
import config from '../config/config';

export default {

  data () {
    return {
     articles:[]
    }
  },
  created: function () {

   this.axios.get(`${config.baseUrl}/last-articles`)
   .then(response => {

    for(let i of response.data){
      let article = new Article(i);
      article.cropText();
      this.articles.push(article);
    }


  })
   .catch(error =>{
    console.log(error);
  });

  },
  components:{
    LinksBlock,
    RecentArticles
  }

 }
</script>
