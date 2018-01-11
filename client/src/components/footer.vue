<template>
  <footer>
    <div class="footer-wrapper">
      <nav>
       <ul>
         <li><router-link to="/">Главная</router-link></li>
         <li><router-link to="/catalog">Каталог</router-link></li>
         <li><router-link to="/gallery">Гелерея</router-link></li>
         <li><router-link to="/articles">Статьи</router-link></li>
         <li><a href="#">Контакты</a></li>
       </ul>
     </nav>

     <div class="contact">
       <ul>
         <li><a href="mailto:coronacia@mail.ru">Email: coronacia@mail.ru</a></li>
         <li><a href="tel:+375296121209">Tel: +375 29 612 12 09</a></li>
       </ul>
     </div>

   </div>
 </footer>
</template>

<script>


export default {
  data () {
    return {}
  }
}

</script>


<style lang="scss">

footer{
  background-color:#222929;
  padding:28px 25px;
}
.footer-wrapper{
  max-width:944px;
  margin:0 auto;
  display:flex;
  justify-content:space-around;
  font-family:MariadPro;
  font-size:15px;
  line-height:22px;
  color:#aeaeae;
  nav,.contact{

    ul{
      padding:0;
      margin:0;
      list-style:none;
      li{
        a{

          color:#aeaeae;
          text-decoration:none;
          &:hover{
            text-decoration:underline;
          }
        }
      }
    }
  }
}

</style>
