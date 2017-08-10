<template>
  <div class="header">

  	<div class="headerBox clearfix">
  		<div class="pic">
  			<img :src="se.avatar" alt="">
  		</div>
  		<div class="content">
  			<p><span></span><span>{{se.name}}</span></p>
  			<p>{{se.description}}/{{se.deliveryTime}}分钟送达</p>
  			<p><sb v-if="se.supports" :support="se.supports"></sb></p>
  		</div>
  	</div>

    <div v-if="se.supports" class="countsBox" @click="deshow">
      <span>{{se.supports.length}}个
        <i class="icon icon-keyboard_arrow_right"></i>
      </span>
    </div>
  	
    <div class="bulletinBox" @click="deshow">
      <p><span class="pic"></span>{{se.bulletin}}</p>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>

    <div class="bgBlur">
      <img :src="se.avatar" alt="">
    </div>

    <transition name="fade">
      <div class="detailBox" v-show="detailShow" @click="dehidden">
        <div class="detail">
          <div class="inner">
            <h2>{{se.name}}</h2>
            <div class="xs">
              <starts :start="se.score" :fontsize="24"></starts>
              <starts :start="se.score" :fontsize="11"></starts>
              <starts :start="se.score"></starts>
            </div>

            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>

            <div class="special">
              <sb v-if="se.supports" :support="se.supports" :abc="big"></sb>
            </div>


            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>

            <div class="miaoshu">
              {{se.bulletin}}
            </div>
          </div>
          <span class="icon iconfont icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

	import support from "../supports/supports.vue";

  import starts from "../starts/starts.vue";

  export default {
    props:{
    	se:{
    		return:Object,
    	}
    },
    data(){
      return{
        detailShow:false,
        big:'big'
      }
    },
    methods:{
      deshow(){
        this.detailShow=true;
      },
      dehidden(){
         this.detailShow=false;
      }
    },
    components:{
    	sb:support,
      starts:starts
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../components/common/common.scss';
  .header{
    position:relative;
    height:134px;
    background:rgba(7,17,27,.5);
    
    .headerBox{
    	padding:24px 0 18px 24px;
    	.pic{
    		float:left;
    		width:64px;
    		height: 64px;
    		border-radius: 2px;
    		overflow: hidden;
    		img{
    			width:100%;
    		}
    	}
    	.content{
    		float:left;
    		margin-left:16px;
    		p{
					font-size:12px;
					color:rgb(255,255,255);
					font-weight: 200;
					line-height: 12px;
    			&:nth-of-type(2){
    				margin-top:8px;
    				margin-bottom:10px;
    			}
    			&:nth-of-type(3){
    				height:13px;
            overflow:hidden;
    			}
    			span{
    				&:nth-of-type(1){
    					float:left;
    					width:30px;
    					height: 18px;
    					@include bgImage('brand');
    					background-size: cover;
    				}
    				&:nth-of-type(2){
    					padding-left:6px;
    					font-size:16px;
    					color:rgb(255,255,255);
    					font-weight:bold;
    					line-height: 18px;
    				}
    			}
    		}

    	}
    }

    .countsBox{
      position:absolute;
      bottom:38px;
      right:12px;
      font-size:0;
      background:rgba(7,17,27,.2);
      border-radius:24px;
      span{
        box-sizing:border-box;
        display:inline-block;
        font-size:10px;
        color:#fff;
        font-weight:200;
        line-height: 12px;
        padding:10px 12px;
      }
    }

    .bulletinBox{
      box-sizing:border-box;
      position:absolute;
      left:0;
      bottom:0;
      width:100%;
      height:28px;
      background:rgba(7,17,27,.2);
      padding:0 24px 0 12px;
      line-height: 28px;
      font-size:0;
      p{
        font-size:10px;
        color:#fff;
        @include rowEllipsis(1);
        .pic{
          display: inline-block;
          height:13px;
          width:24px;
          margin-right:4px;
          @include bgImage(bulletin);
          background-size:cover;
          vertical-align: top;
          margin-top:8px;
        }
      }
     i{
        position:absolute;
        right:0;
        top:0;
        font-size:22px;
        padding-right:10px;
        line-height: 28px;
        color:green;
      }
    }

    .bgBlur{
      position:absolute;
      z-index:-1;
      top:0;
      left:0;
      height:134px;
      width:100%;
      filter:blur(10px);
      overflow: hidden;
      img{
        width:100%;

      }
    }

    .detailBox{
      position:fixed;
      z-index:10;
      left:0;
      top:0;
      background:rgba(7,17,27,.5);
      width:100%;
      height:100%;
      overflow: auto;
      .detail{
        box-sizing:border-box;
        position:relative;
        backdrop-filter:blur(10px);
        color:#fff;
        overflow: auto;
        width: 100%;
        padding:50px;
        text-align: center;
        .inner{
          box-sizing:border-box;
          padding-bottom:96px;
          color:#fff;
          h2{
            margin-top:64px;
          }
          .xs{
            margin-top:16px;
          }
        }

        .title{
          display: flex;
          margin-top:28px;
          .line{
            position: relative;
            top: -7px;
            flex: 1;
            border-bottom: 1px solid rgba(255,255,255,.2);
          }
          .text{
            padding: 0 12px;
            font-size:14px;
            color:rgb(255,255,255);
            line-height:14px;
          }
        }
        .special{
          text-align: left;
          margin-top:24px;
          margin-left:12px;
          box-sizing:border-box;
          padding:0 12px;
        }
        .miaoshu{
          margin-top:24px;
          text-align: left;
          box-sizing:border-box;
          padding:0 12px;
          font-size:12px;
          font-weight:200;
          color:#fff;
          line-height: 24px;
        }


        .icon{
          position:absolute;
          bottom:0;
          padding-bottom:34px;
          color:red;
        }

      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to{
      opacity: 0
    }
  }
</style>