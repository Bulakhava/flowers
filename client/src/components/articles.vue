<template>
  <div>
   <recent-articles
    :articles = "articles"
   ></recent-articles>
   </div>
</template>

<script>

import RecentArticles from './recent-articles.vue';
import Article from '../models/article';
import config from '../config/config';

export default {
  props:['admin'],
  data () {
    return {
      articles:[]
    }
  },
  components:{
    RecentArticles
  },
  created: function () {

   this.axios.get(`${config.baseUrl}/articles-list`)
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

  }
}

</script>

<style lang="scss">


</style>
