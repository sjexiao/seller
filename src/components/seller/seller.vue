<template>
  <div class="seller">
    <div class="seTitle clearfix">
    	<div class="sname pull-left">
    		<p>{{seller.name}}</p>
    		<div class="starts">
    			<starts :start="seller.score" :fontsize="23"></starts>
    			<span class="rankRate">({{seller.rankRate}})</span>	
    			<span class="sellCount">月售{{seller.sellCount}}单</span>
    		</div>
    	</div>

    	<div class="sfavorite pull-right" v-on:click="xactive = !xactive">
			<i class="icon iconfont icon-favorite" :class="{active12:xactive}"></i>
			<p v-if="xactive" class="ifont">以收藏</p>
			<p v-else class="ifont">加入收藏</p>
    	</div>
    	<p style="clear:both;"></p>
    </div>

	<div class="deliveryWrapper">
		<div class="minPrice">
			<p>起送价</p>
			<p><span>{{seller.minPrice}}</span>元</p>
		</div>

		<div class="deliveryPrice">
			<p>商家配送</p>
			<p><span>{{seller.deliveryPrice}}</span>元</p>
		</div>

		<div class="deliveryTime">
			<p>平均配送时间</p>
			<p><span>{{seller.deliveryTime}}</span>分钟</p>
		</div>
	</div>

	<div class="wire"></div>
	
	<div class="scollbox" ref="scollBox">
		<div class="scollchild">
			<div class="bulletin">
				<div class="btitle">公告与活动</div>		
				<div class="inner">{{seller.bulletin}}</div>
			</div>

			<div class="supports">
				<supports v-if="seller.supports" :support="seller.supports" :abc="'custom'"></supports>
			</div>

			<div class="wire"></div>

			<div class="picsWarpper">
				<div class="picsTitle">商家实景</div>
				<div class="pics" ref="pics">
					<ul class="clearfix">
						<li class="pull-left" v-if="seller.pics" v-for="pic in seller.pics">
							<img :src="pic" alt="">
						</li>
					</ul>
				</div>
			</div>

			<div class="wire"></div>

			<div class="infosWarpper">
				<div class="infosTitle">商家信息</div>
				<div class="infos">
					<ul>
						<li v-if="seller.infos" v-for="infoItem in seller.infos">{{infoItem}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	
  </div>
</template>

<script>

	var BScroll = require('better-scroll');

	import starts from "../starts/starts.vue";

	import supports from "../supports/supports.vue";

	export default {
		watch:{
			"seller"(){
				this.scrollpics();
				this.scollbox1();
			}
		},
		methods:{
			scrollpics(){
				this.$nextTick(() => {
					this.scrollpic = new BScroll(this.$refs.pics,{
						scrollY:false,
						scrollX:true,
						snapLoop:true,
						probeType:3
					});
				})
			},

			scollbox1(){
				this.$nextTick(() => {
					this.scrollpic = new BScroll(this.$refs.scollBox,{
						probeType:3
					});
				})
			},

			favorite(){
				// let oFavorite = document.getElementsByClassName("sfavorite")[0];
				// let oIcon = oFavorite.getElementsByClassName("icon")[0];
				// let oIfont = oFavorite.getElementsByClassName("ifont")[0];
				// console.log(oIcon.length)
				// if(oIcon.getAttribute("class").indexOf('active')==-1){
				// 	oIcon.setAttribute("class", 'active');
				// }else{
				// 	oIcon.
				// }
				// for(var i=0;i<oIcon.length;i++){
				// 	console.log(i+"-----------"+oIcon[i].innerHTML);
					
				// 	if(oIcon[i].className="icon"){
				// 		// console.log(oIcon[11].currentStyle.active==true);
				// 		// console.error(i)
				// 	}
				// }
			}
		},
		components:{
			starts,
			supports
		},
	  	data(){
	  		return{
	  			seller:Object,
	  			xactive:false,
	  		}
	  	},
	   created(){
	   	this.$http.get('api/seller').then(res=>{
	   		this.seller = res.body.seller;
	   	});

	   }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../../components/common/common.scss';
	.seller{
		padding-bottom:50px;
		.seTitle{
			box-sizing:border-box;
			padding:18px 0;
			margin:0 18px;
			@include border1(#ccc);
			.sname{
				font-size:14px;
				color:rgb(7,17,27);
				line-height: 14px;
				.starts{
					display:inline-block;
					margin-top:5px;
					span{
						vertical-align: top;
						display: inline-block;
						margin-top:5px;							
						font-size:10px;
						color:rgb(77,85,93);
						line-height: 17px;
						.rankRate{
							padding-left:8px;
						}
						.sellCount{
							padding-left:12px;
						}
						
					}
				}
			}
			.sfavorite{
				text-align:center;
				.icon{
					font-size:24px;
					color:#ccc;
					line-height: 24px;
					&.active12{
						color:red;
					}
				}
				p{
					font-size:10px;
					text-align: right;
					margin-top:4px;
				}
			}
		}

		.deliveryWrapper{
			margin:18px;
			div{
				width:32%;
				display: inline-block;
				text-align:center;
				border-right:1px solid #ccc;
				&:last-child{
					border-right:none;
				}
				p{
					font-size:10px;
					&:nth-of-type(1){
						color:rgb(147,153,159);
						line-height: 10px;
					}
					&:nth-of-type(2){
						margin-top:4px;
						color:rgb(147,153,159);
						line-height: 10px;
						span{
							font-size:24px;
							font-weight:200;
							color:rgb(7,17,27);
							line-height: 24px;
						}
					}
				}
			}
		}

		.wire{
			margin-top:18px;
			background-color:#f3f5f7;
			height:16px;
			border-top:1px solid #e6e7e8;
			border-bottom:1px solid #e6e7e8;
		}
		
		.bulletin{
			margin:18px;
			.btitle{
				font-size:14px;
				font-weight: 200;
				color:#000;
				line-height: 28px;
			}
			.inner{
				padding:8px 12px 16px;
				font-size:12px;
				font-weight: 200;
				color:rgb(240,20,20);
				line-height: 24px;
			}
		}

		.picsWarpper{
			margin:18px 0 18px 18px;
			.picsTitle{
				font-size:14px;
				font-weight: 700;
				color:#000;
			}
			.pics{
				margin-top:12px;
				overflow: hidden;
				ul{
					width:504px;
					li{
						margin-right:6px;
						img{
							width:120px;
							height:90px;
						}
					}
				}
			}
		}

		.infosWarpper{
			margin:18px 0 18px 18px;
			.infosTitle{
				font-size:14px;
				font-weight: 700;
				color:#000;
			}
			.infos{
				margin-top:12px;
				ul{
					li{
						box-sizing:border-box;
						border-top:1px solid rgba(7,17,27,0.1);
						padding:16px 12px;
						font-size:14px;
						font-weight: 200;
						color:#07111b;
					}
				}
			}
		}

		.scollbox{
			height:310px;
			overflow: hidden;
		}

	}
	














</style>