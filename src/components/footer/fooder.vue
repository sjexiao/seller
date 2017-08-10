<template>
	<transition name="move">
			<div class="fooder" v-show="showFlag" ref="food">
				<div>
					<div class="food-content">
						<div class="imgage-header">
							<img :src="food.image" alt="">
						</div>
						<div class="back" @click="hide">
							<i class="iconfont icon-arrow_lift"></i>
						</div>
						
					</div>

					<div class="content clearfix">
						<h1 class="title">{{food.name}}</h1>
						<div class="detail">
							<span class="sell-count">月销{{food.sellCount}}分</span>
							<span class="rating">好评率{{food.rating}}%</span>
						</div>

						<div class="price">
							<span class="now">￥{{food.price}}</span>
							<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
						</div>

						<div class="cartcontrol-wrapper" v-show="this.food.count>0">
							<controlMenu :goods="food"></controlMenu>
						</div>

						<div class="buy" @click="addFirst($event)">
							加入购物车
						</div>
						
					</div>

					<div class="wire"></div>
					
					<div class="introduce-wrapper">
						<h1>商品介绍</h1>
						<span>
							{{food.info}}
						</span>
					</div>

					<div class="wire"></div>
					
					<div class="selectRating">
						<h1>商品评价</h1>
						<selectRating :onlyContent="onlyContent" :ratings="food.ratings" :selectType="selectType"></selectRating>
					</div>
					
					<div class="rating-wrapper">
		              <ul v-show="food.ratings && food.ratings.length" style="padding-bottom:50px;">
		                <li v-show="needshow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
		                  <div class="user">
		                    <span class="name">{{rating.username}}</span>
		                    <img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
		                  </div>
		                  <div class="time">{{ formdata(rating.rateTime) }}</div>
		                  <p class="text">
		                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
		                  {{rating.text}}
		                </p>
		                </li>
		              </ul>
		              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
		            </div>
					
					
				</div>

			</div>
	</transition>
</template>

<script>

	import controlMenu from "../controlMenu/controlMenu.vue";
	import selectRating from "../selectRatings/selectRatings.vue";
	import Vue from "vue";
	import BScroll from "better-scroll";
	export default{
		
		components:{
			controlMenu,
			selectRating
		},
		data(){
			return{
				showFlag:false,
				selectType:2,
				onlyContent:false,
				aa:'demo'  //用来测试的
			}
		},
		props:{
			food:{
				return:Object
			}
		},
		methods:{
			demo(){  //用来测试的
				return 123;
			},
			formdata(date){
			  var date = new Date(date);//如果date为13位不需要乘1000
			  var Y = date.getFullYear() + '-';
			  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
			  return Y+M+D+h+m+s;
			},
			needshow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType == 2){
					return true;
				}else{
					return type === this.selectType;
				}
				// return true;
			},
			addFirst(eve){
				if(!eve._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,"count",1); //给Vue对象添加一个count
				}else{
					return;
				}
			},
			show(){
				this.showFlag =true;
				this.$nextTick(()=>{
					if(!this.scroll){  //如果没有这个属性，则创建一个这个属性
						this.scroll = new BScroll(this.$refs.food,{ 
							click:true
						})
					}else{
						this.scroll.refresh(); //刷新这个插件
					}
				})
			},
			hide(){
				this.showFlag =false;
			}
		},
		watch:{
			'selectType'(type){
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			'onlyContent'(type){
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			}
		},
	}
</script>


<style lang="scss" scoped>
	@import '../../components/common/common.scss';
	.fooder{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: red;
		color:red;
		background-color:#fff;
		.food-content{
			.imgage-header{
				position:relative;
				width:100%;
				height:0;
				padding-top: 100%;
				img{
					position:absolute;
					top:0;
					left:0;
					width:100%;
					height:100%;
				}
			}
			 .back{
	          position: absolute;
	          top: 10px;
	          left: 10px;
	          background-color:rgba(0,0,0,.9);
	          border-radius: 50%;
	          .icon-arrow_lift{
		          display:block;
		          padding: 10px;
		          font-size: 20px;
		          color:#fff;
		        }
	        }

		}
		.content{
			box-sizing:border-box;
			padding:18px;
			position:relative;
			.title{
				font-size:19px;
				font-weight:700;
				color:rgb(7,17,27);
				line-height: 14px;
			}
			.detail{
				margin-top:8px;
				font-size:10px;
				color:rgb(147,153,159);
				line-height: 20px;
			}
			.price{
				float:left;
				margin-top:18px;
				font-weight: 700;
				line-height: 24px;
				.now{
					font-size:14px;
					color:rgb(240,20,20);
				}
				.old{
					font-size:10px;
					color:rgb(147,153,159);
				}
			}
			.buy{
				float:right;
				margin-top:14px;
				font-size:10px;
				color:#fff;
				line-height: 12px;
				border-radius: 14px;
				background:rgb(0,160,220);
				padding:8px 12px;
			}
			.cartcontrol-wrapper{
				position:absolute;
				top:75px;
				right:120px;
			}
		}
		.wire{
			box-sizing:border-top;
			height:16px;
			background-color: #f3f5f7;
			border-top:1px solid #e6e7e8;
			border-bottom:1px solid #e6e7e8;
		}
		.introduce-wrapper{
			padding:18px;
			h1{
				box-sizing:border-box;
				font-size:14px;
				font-weight: 700;
				color:rgb(7,17,27);
				line-height: 14px;
			}
			span{
				box-sizing:border-box;
				padding:0 8px;
				font-size:12px;
				font-weight:200;
				color:rgb(77,85,93);
				line-height: 24px;
			}
		}
		.selectRating{
			box-sizing:border-box;
			// padding:18px;
			h1{
				box-sizing:border-box;
				padding:16px 16px 0 16px;
				line-height: 14px;
				font-size:14px;
				font-weight: 700;
				color:rgb(7,17,27);
			}
		}
		.rating-wrapper{
	        padding: 0 18px;
	        .rating-item{
	          position: relative;
	          padding: 16px 0;
	          @include border1(rgba(7,17,27,.1));
	          .user{
	            position: absolute;
	            right:0;
	            top:16px;
	            line-height: 16px;
	            font-size: 0;
	            .name{
	              display:inline-block;
	              margin-right:6px;
	              vertical-align: top;
	              font-size: 10px;
	              color:rgb(147,153,159);
	            }
	            .avatar{
	              border-radius:50%;
	            }
	          }
	          .time{
	            margin-bottom:6px;
	            line-height: 12px;
	            font-size: 10px;
	            color:#ccc;
	          }
	          .text{
	            line-height: 16px;
	            font-size: 12px;
	            color: rgb(7,17,27);
	            .icon-thumb_up,.icon-thumb_down{
	              margin-right: 4px;
	              line-height: 24px;
	              font-size: 12px;
	            }
	            .icon-thumb_up{
	              color: rgb(0, 160, 220);
	            }
	            .icon-thumb_down{
	              color:#ccc;
	            }
	          }
	        }
	      }
	      .no-rating{
	        padding: 16px 0;
	        font-size: 12px;
	        color:rgb(147, 153, 159);
	      }
	}
	.move-enter-active, .move-leave-active{
		transition: all 0.2s linear;
		transform: translate3D(0,0,0);
	}
	.move-enter,.move-leave-active{
		transform: translate3D(100%,0,0);
	}



</style>
