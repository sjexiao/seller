<template>
	<div class="shopping clearfix">
		<div class="sidebar" :class="{active:totaPrice >= this.shopping.minPrice}">
			<a href="javascript:0;">
				{{pay}}
			</a>
		</div>
		<div class="content">
			<div class="icon" @click="toggleList">
				<span class="icon-rai" :class="{active: totaCount > 0}">
					<i class="iconfont icon-shopping_cart"></i>
				</span>
				<span class="priceCount" v-show="totaCount">{{totaCount}}</span>
			</div>
			<div class="content-inner">
				<span class="price">￥{{totaPrice}}</span>
				<span class="zprice">另需配送费￥{{shopping.deliveryPrice}}元</span>
			</div>
		</div>
<!-- 购物单 -->
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow"><!--v-show="listShow" -->
				<div class="list-header">
					<div class="title">
						<h1>购物车</h1>
						<span @click="empty">清空</span>
					</div>
				</div>
						
				<div class="list-content" ref="listContent">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>{{food.price * food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<span><ctm :goods="food"></ctm></span>
						</div>
					</li>
				</ul>
				</div>
		 </div>	
		</transition>
		<transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hidelist"></div>  
    </transition>	
<!-- 购物单 -->
		<!-- <transition name="fold">
			<div class="zz" v-show="zzshow">
				<div class="inbox">
					<div class="inList">
						<div class="inTitle clearfix">
							<span>购物车</span>
							<span @click="cleanDetailed"><a href="javascript:0;">清单</a></span>
						</div>
						<p style="clear:both;"></p>

						<div class="detailedList">
							<ul>
								<li class="itemBox clearfix" v-for="items in selectFoods">
									<div class="itemName pull-left">{{items.name}}</div>
									<div class="itemSidebar pull-right">
										<span class="itemPrice">￥{{items.price}}</span>
										<span class="itemctm"><ctm :goods="items"></ctm></span>
									</div>
								</li>
							</ul>
						</div>


					</div>
				</div>
			</div>
		</transition>	 -->

		<!-- <div style="display:none;" class="comment">
			<comment :selectFoods="selectFoods"></comment>
		</div> -->
	</div>
</template>

<script>

	var BScroll = require("better-scroll");

	import ctm from "../controlMenu/controlMenu.vue";

	//demo
	import comment from "../comment/comment.vue";

	export default{
		watch:{
			"selectFoods"(){
				// this.alignhide();
			}
		},
		components:{
			ctm:ctm,
			comment
		},
		data(){
			return{
				zzshow:false,
				fold:true
			}
		},
		props:{
	  		shopping:{
	  			return:Object
	  		},
		  	selectFoods:{
		  		type:Array,
		  		default(){
		  			return[
		  				{
		  					price,
		  					count
		  				}
		  			]
		  		}
		  	}
	  	},
  	computed:{
  		listShow(){
  			if(!this.totaCount){
  				this.fold = true;
  				return false;
  			}
  			let show = !this.fold;
  			return show
  		},
  		// listShow(){
  		// 	if(!this.totaCount){
  		// 		this.fold = true;
  		// 		return false;
  		// 	}
  		// 	let show = !this.fold;
  		// 	if(show){
  		// 		// this.nextTick(()=>{
  		// 		// 	this.scroll = new BScroll("this.$");
  		// 		// })
  		// 	}
  		// 	return true;
  		// },
  		totaPrice(){
  			let countPrice = 0;
  			
  			this.selectFoods.forEach((itemPrice)=>{
  				countPrice +=itemPrice.price * itemPrice.count
  			})
  			return countPrice
  		},
  		totaCount(){
  			let count = 0;
  			this.selectFoods.forEach((itemCount) =>{
  				count +=itemCount.count;
  			})
  			return count
  		},
  		pay(){
  			if(this.totaPrice === 0){
  				return "最低配送费￥"+this.shopping.minPrice+"元";
  			}else if(this.totaPrice < this.shopping.minPrice){
  				let diff = this.shopping.minPrice - this.totaPrice
  				return "还差￥"+diff+"元";
  			} else{
  				return "去结算";
  			}
  		}
  	},
  	methods:{
  		hidelist(){
  			this.fold = true;
  		},
  		empty(){
  			this.selectFoods.forEach((item)=>{
  				item.count = 0;
  				// this.fold = false;
  			})
  		},
  		// alignhide(){
  		// 	if(this.totaCount == 0){
  		// 		this.fold = true;
  		// 		return;
  		// 	}
  		// },
  		toggleList(){
  			if(!this.totaCount){
  				return
  			}
  			this.fold =!this.fold;
  			this.$nextTick(() => {
	  			if(!this.scroll){
		  				this.scroll = new BScroll(this.$refs.listContent,{
		  					click:true
		  				})
		  			}else{
		  				this.scroll.refresh() //刷新节点
		  			}
				})
  		},
  		popup(){
  			if(this.totaCount > 0){
  				if(this.zzshow){
  					this.zzshow = false;
  				}else{
  					this.zzshow = true;
  				}
  			}else{
  				return;
  			}
  		},
  		cleanDetailed(){
  			for(let i=0;i<this.selectFoods.length;i++){
  				this.selectFoods[i].count = 0;
  				this.selectFoods[i].price = 0;
  				this.zzshow = false;
  			}
  		}
  	}
	}
</script>


<style lang="scss" scoped>
	@import '../../components/common/common.scss';
// .fade-enter-active, .fade-leave-active {
// 	transition: opacity .5s
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
// 	opacity: 0
// }
.fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }
.shopping{
	.sidebar{
		position: relative;
		z-index: 6;
		width:105px;
		float:right;
		line-height: 48px;
		text-align: center;
		background-color:#2b333b;
		a{
			font-size:12px;
			height:48px;
			color:rgba(255,255,255,0.4);
			display: block;
		}
		&.active{
			background:#00b43c;
		}
		&.active a{
			color:#fff;
		}
	}
	.content{
		position:relative;
		z-index: 3;
		width: 100%;
		height:48px;
		background-color:#141d27;
		margin-right:105px;
		.icon{
			position:relative;
			float:left;
			z-index:5;
			background-color:#141d27;
			border-radius:50%;
			margin:-16px 0 0 24px;
			.icon-rai{
				position:relative;
				z-index: 11;
				display: block;
				width:45px;
				height:45px;
				background-color:#2b333b;
				border-radius:50%;
				margin:12px;
				color:#111;
				&.active{
					background-color:#00a0dc;
					color:rgb(255,255,255);
				}
				i{
					position:absolute;
					left:10px;
					top:10px;
					font-size:25px;
				}
				
			}
			.priceCount{
				position:absolute;
				top:0;
				right:5px;
				width:24px;
				height:24px;
				line-height: 24px;
				background-color: red;
				border-radius:10px;
				z-index: 20;
				padding:1px 1px;
				font-size:12px;
				color:#fff;
				text-align: center;

			}
		}
		.content-inner{
			float:left;
			span{
				box-sizing:border-box;
				display:inline-block;
				margin-top:12px;
				height:25px;
				line-height: 25px;
				&.price{
					padding:0 12px;
					color:#fff;
					font-size:16px;
					border-right:1px solid #2b333b;
					vertical-align: top;
				}
				&.zprice{
					vertical-align: top;
					padding-left:12px;
					font-size:10px;
					color:#ccc;
				}
			}
		}

	}
	// .zz{
	// 	height:305px;
	// 	position:fixed;
	// 	width:100%;
	// 	height:100%;
	// 	top:0;
	// 	left:0;
	// 	background:rgba(7,17,27,0.6);
	// 	// background:red;
	// 	backdrop-filter:blur(5px);
	// 	// &:after{
	// 	// 	position: absolute;
	// 	// 	z-index: -1;
	// 	// 	left: 0;
	// 	// 	top: 0;
	// 	// 	right: 0;
	// 	// 	bottom: 0;
	// 	// 	content: 'sss';
	// 	// 	display: block;
	// 	// 	font-size: 50px;
	// 	// 	color: red;
	// 	// 	background-color: rgba(7,17,27,0.6);
	// 	// 	filter: blur(5px);
	// 	// }
	// 	.inbox{
	// 		position: absolute;
	// 		width: 100%;
	// 		bottom: 48px;
	// 		.inList{
	// 			width:100%;
	// 			height:305px;
	// 			background:#fff;
	// 			top:-305px;
	// 			left:0;
	// 			.inTitle{
	// 				box-sizing:border-box;
	// 				height:40px;
	// 				line-height: 40px;
	// 				padding:0 18px;
	// 				@include border1(rgba(7,17,27,0.1));
	// 				background-color:#f3f5f7;
	// 				span{
	// 					&:nth-of-type(1){
	// 						color:rgb(7,17,27);
	// 						font-size:14px;
	// 						font-weight:200;
	// 						float:left;

	// 					}
	// 					&:nth-of-type(2){
	// 						float:right;
	// 						a{
	// 							font-size:12px;
	// 							color:rgb(0,160,220);
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	.shopcart-list{
      position: absolute;
      bottom: 48px;
      left: 0;
      z-index: 2;
      width:100%;
    }

   .list-mask{
    position: fixed;
    z-index: 0!important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background:rgba(7,17,27,.6);
    background-filter: blur(10px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity:0;
  }
    
    .fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }
    .list-header{
      padding: 0 18px;
      height: 40px;
      line-height:40px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,.1);
      .title{
        // float:left;
        font-size: 14px;
        color: rgb(7,17,27);
				h1{
					display: inline-block;
				}
				span{
					float: right;
				}
      }
      .empty{
        float: right;
        font-size: 12px;
        color:rgb(0, 160, 220);
      }
    }
    .list-content{
    	width:100%;
      padding: 0 18px;
      max-height:217px;
      overflow: hidden;
      background:#fff;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        @include border1(rgba(7, 17, 27,.1));
        .name{
          line-height:24px;
          font-size:14px;
          color:rgb(7,17,27);
        }
        .price{
          position: absolute;
          right:140px;
          bottom:12px;
          line-height: 24px;
          font-size:14px;
          font-weight:700;
          color:rgb(240,20,20);
        }
        .cartcontrol-wrapper{
          position: absolute;
          right:35px;
          bottom: 10px;
        }
      }
    }


	.detailedList{
		box-sizing:border-box;
		padding-bottom:48px;
		height:305px;
		overflow-y:auto;
		ul{
			background-color:#fff;
			margin:0 18px;
			
			.itemBox{
				clear:both;
				height:48px;
				line-height: 48px;
				@include border1(rgba(7,17,27,0.1));
				.itemName{
					font-size:14px;
					color:rgb(7,17,27);
				}
				.itemSidebar{
					span{
						vertical-align: top;
						display:inline-block;
					}
					.itemPrice{
						font-size:14px;
						color:red;
						font-weight:700;
						padding-right:12px;
					}
					.itemctm{
						margin-top:11px;
					}
				}
			}
		}
	}
	
}




</style>
