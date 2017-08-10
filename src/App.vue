<template>
  <div id="app">
    <iheader :se="seller"></iheader>
    <div class="tab">
      <div class="tab-item">
          <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>

  import iheader from "./components/header/header.vue"

  export default {
    name: 'app',
    data(){
      return{
        seller:Object
      }
    },
    created(){
      this.$http.get('api/seller').then(res =>{
        this.seller = res.body.seller;
      })
    },
  
    components:{
      iheader:iheader,
    }
  }
</script>

<style lang="scss" scoped>
  @import 'components/common/common.scss';
  .tab{
    display: flex;
    height:40px;
    background:white;
    @include border1(rgba(7,17,27,0.1));
    .tab-item{
      flex:1;
      text-align: center;
      &>a{
        display: block;
        height:100%;
        line-height: 40px;
        font-size:14px;
        color:rgb(77,85,93);
        &.active{
          color:rgb(240,20,20);
        }
      }
    }
  }

</style>
