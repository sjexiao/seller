<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="(item,index) in goods" class="menu-item" :class='{"currentColor":currentIndex===index}' @click="ss(index,$event)">
    			<span class="content">
    				<span class="icon" v-if="item.type>=0" :class="classMap[goods[index].type]"></span>
    				{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
    	<ul>
    		<li class="myli" v-for="(item,index) in goods" >
    			<h2>{{item.name}}</h2>
    			<div class="eitBox">
    				<div class="eitItem clearfix" v-for="food in item.foods" @click="choicefood(food,$event)">

    					<div class="item-pic">
    						<img :src="food.icon" alt="">
    					</div>

    					<div class="item-content">
    						<div class="foodName">{{food.name}}</div>

    						<div class="foodDes">{{food.description}}</div>

    						<div class="foodRating">
    							<span>月售{{food.sellCount}}份</span>
    							<span>好评率{{food.rating}}%</span>
    						</div>

    						<div class="priceBox clearfix">
    							<div class="price pull-left">
	    							<span>￥{{food.price}}</span>
	    							<span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
    							</div>
<!-- controlMenu  组件区 -->
									<div class="preAndNext pull-right">
										<controlMenu :goods="food"></controlMenu>
									</div>
<!-- controlMenu  组件区 -->
    						</div>
    					</div>
							
    				</div>
    			</div>


    		</li>
    	</ul>
    </div>
    <div class="shopping">
  		<shopping :shopping="seller" :selectFoods="selectFoods"></shopping>
    </div>
    <transition name="move">
	    <div class="food">
	    	<ifooder :food="choicefood1" ref="food"></ifooder>
	    </div>
    </transition>
  </div>

</template>

<script>

  var BScroll = require("better-scroll");

  import ifooder from "../footer/fooder.vue";
  import controlMenu from "../controlMenu/controlMenu.vue";
  import shopping from "../shopping/shopping.vue";
  export default {
  	props:{
  		seller:{
  			return:Object
  		}
  	},
    data(){
    	return{
    		goods : [],
    		listHeight:[],
    		scrollY:0,
    		choicefood1:{}
    	}
    },
    created(){
		this.$http.get('api/goods').then(res =>{
	      	this.goods = res.body.data;
			this.classMap = ['decrease','discount','guarantee','invoice','special'];
			this.$nextTick(() =>{
				this._initScroll();
				this._ct();
		});
    })
  },
  methods:{
  	choicefood(item,eve){
  		
  		if(!eve._constructed){
  			return;
  		}
  		this.choicefood1 = item;
  		this.$refs.food.show();
  	},
  	_initScroll(){
  		this.menuscroll = new BScroll(this.$refs.menuWrapper,{
  			click:true
  		});

  		this.goodsscroll = new BScroll(this.$refs.goodsWrapper,{
  			click:true,
  			probeType:3
  		});

  		this.goodsscroll.on('scroll',(pos)=>{
  			this.scrollY = Math.abs(Math.floor(pos.y));
  			// console.log(this.scrollY);
  		})
  	},
  	_ct(){
  		let aFood = document.getElementsByClassName('myli');
  		let height=0;
  		this.listHeight.push(height);
  		for(let i=0;i<aFood.length;i++){
  			let item =aFood[i];
  			height += item.clientHeight-5;
  			this.listHeight.push(height);
  		}
  	},
  	ss(index,eve){
  		if(!eve._constructed){
  			return;
  		}
  		console.log(index);
  		let aFood = document.getElementsByClassName('myli');
  		this.goodsscroll.scrollToElement(aFood[index])
  	}
  },
  computed:{
  	currentIndex(){
  		for(let i=0;i<this.listHeight.length-1;i++){
  			let heigth1 = this.listHeight[i];
  			let heigth2 = this.listHeight[i+1];
  			if(!heigth2 || (this.scrollY >= heigth1 && this.scrollY < heigth2)){
  				return i;
  			}
  		}
  	},
  	// fuckYou(){
  	// 	this.goods.forEach((g)=>{
  	// 		g.foods.forEach((f)=>{
  	// 			return 
  	// 		})
  	// 	});
  	// },
  	selectFoods(){
  		let foodList =[];
  		this.goods.forEach((good)=>{
  			good.foods.forEach((food)=>{
  				if(food.count){
  					foodList.push(food);
  				}
  			})
  		})
  		return foodList;
  	}
  },
  components:{
  	shopping:shopping,
  	controlMenu:controlMenu,
  	ifooder:ifooder
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../../components/common/common.scss';
	.goods{
		position:absolute;
		top:180px;
		bottom:0;
		width:100%;
		display: flex;
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 80px;
			width:80px;
			background-color:#f3f5f7;
			.currentColor{
				background-color:yellow;
			}
			.menu-item{
				box-sizing:border-box;
				padding:0 12px;
				height:54px;
				vertical-align: center;
				display:table;
				.content{
					width:56px;
					font-size:12px;
					font-weight:200;
					color:rgb(7,17,27);
					display:table-cell;
					vertical-align: middle;
					@include border1(rgba(7,17,27,0.1));
					// @include border1(red);
					.icon{
						display: inline-block;
						width:14px;
						height:14px;
						background-size:cover;
						&.decrease{
							@include bgImage(decrease_1);
						}
						&.discount{
							@include bgImage(discount_1);
						}
						&.guarantee{
							@include bgImage(guarantee_1);
						}
						&.invoice{
							@include bgImage(invoice_1);
						}
						&.special{
							@include bgImage(special_1);
						}
					}
				}
			}
		}
		.goods-wrapper{
			flex:1;
			// background-color: yellow;
			ul{
				li{
					h2{
						box-sizing:border-box;
						font-size:12px;
						color:rbg(147,153,159);
						line-height: 26px;
						background-color:#f3f5f7;
						border-left:3px solid #d9dde1;
						padding-left:14px;
					}
					.eitBox{
						box-sizing:border-box;
						padding:0 18px 18px 18px;
						.eitItem{
							padding-top:18px;
							@include border1(rgba(7,17,27,0.1));
							.item-pic{
								float:left;
								width:60px;
								height:60px;
								img{
									width:100%;
								}
							}
							.item-content{
								// padding-top:18px;
								// background:green;
								margin-left:70px;
								.foodName{
									font-size:14px;
									color:rgb(7,17,27);
									line-height:14px;
								}
								.foodDes,.foodRating{
									font-size:10px;
									color:rgb(147,158,159);
									line-height: 10px;
									padding-top:8px;
								}
								.foodRating{
									font-size:0;
									span{
										font-size:10px;
										&:nth-of-type(2){
											padding-left:12px;
										}
									}
								}
								.priceBox{
									.price{
										padding-bottom:15px;
										span{
											font-size:14px;
											color:red;
											line-height: 24px;
											font-weight:700;
											display: inline-block;
											&:nth-of-type(2){}
										}
									}
									.preAndNext{
										// background:red;
									}
								}
							}
						}
					}
					
				}
			}
		}
		.shopping{
			width: 100%;
			height:48px;
			position:absolute;
			bottom:0;
			left:0;
			background-color: #000;
		}

		.food{
			
		}
		.move-enter-active, .move-leave-active{
	    transition: all 0.2s linear;
	    transform: translate3D(0,0,0);
	  }
	  .move-enter,.move-leave-active{
	    transform: translate3D(100%,0,0);
	  }
	}

</style>