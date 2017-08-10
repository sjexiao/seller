<template>
	<div class="comment">
		
		<div class="pleased">
			<span @click="rate2(2,0);">全部{{goodRateType + negativeRateType}}</span>
			<span @click="rate2(0,1);">满意{{negativeRateType}}</span>
			<span @click="rate2(1,2);">不满意{{goodRateType}}</span>
		</div>

		<div class="selectPle" @click="rate1()" :class="{pleActive:isflag}">
			<i class="iconfont icon-check_circle"></i>
			<span>只看有内容的评价</span>
		</div>

		<div class="pleasedInner" ref="commentScroll">
			<ul>
				<li v-for="(item,index) in myRatingList">
					<div class="imgbox">
						<img v-if="item.avatar" :src="item.avatar" alt="">
					</div>
			
					<div class="content">
						<div class="title">
							<div class="unameTime clearfix" style="height: 12px">
								<span>{{item.username}}</span>
								<span>{{getConvertTime[index]}}</span>
							</div>
							<!-- 星星组件 -->
							<div class="componentS clearfix">
								<div class="star-wrapper pull-left">
									<starts :start="item.score" :fontsize="11"></starts>
								</div>
								<div class="stime pull-left">
									{{item.deliveryTime}}
								</div>
							</div>
							<!-- 星星组件 -->	
							<p class="cInner" v-show="item.text">{{item.text}}</p>	
							<p class="like">
								<i class="iconfont icon-thumb_up"></i>
								<span v-show="item.recommends" v-for="reItem in item.recommends">{{reItem}}</span>
							</p>					
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div class="shopping">
			
			<!-- <shopping></shopping> -->
		
		</div>

	</div>
</template>

<script>

	var BScroll = require("better-scroll");

	import starts from "../starts/starts.vue";

	import shopping from "../shopping/shopping.vue";
	export default {
		components:{
			starts,
			shopping
		},
		props:{
			ratings1:{
				type:Array,
				return:[]
			}
		},
		computed:{
			negativeRateType(){
				let tmp = 0;
				this.ratings1.forEach((item) => {
					if(item.rateType === 0){
						tmp++;
					}
				})
				return tmp;
			},

			goodRateType(){
				let tmp = 0;
				this.ratings1.forEach((item) => {
					if(item.rateType === 1){
						tmp++;
					}
				})
				return tmp;
			},

			getConvertTime(){
				let times = [];
				this.ratings1.forEach((item) =>{
	    		let time = new Date(item.rateTime);
	    		let year = time.getFullYear();
	    		let month = (time.getMonth()+1 <10 ? '0' + (time.getMonth()+1) : (time.getMonth()+1));
	    		let day = time.getDate();
	    		let hours = time.getHours();
	    		let menute = time.getMinutes();
					times.push(year+"-"+month+"-"+day+" "+hours+"-"+menute);
				})
    		return times;
    	}
		},
		created(){

			this.scorllComment();
			this.$nextTick(()=>{
				// this.scorllComment();
				// this.rate();
			// 	console.log(this.ratings1.length);
			// })
			// for(let i=0;i<this.ratings1.length;i++){
			// 	if(this.ratings1[i].rateType == 0){
			// 		this.negativeRateType++;
			// 	}else{
			// 		this.goodRateType++;
			// 	}
			});
			// this.satisfactory();
		},
		watch:{
			"ratings1"(){
				this.scorllComment();
				this.rate();
			}
		},
		data(){
			return{
				myRatingList:[],
				isflag:false,
				n1:null,
				// s1:true,
				// s2:false,
				// s3:false
			}
		},
		
		methods:{
			rate2(temp,currIndex){
				var oPleased = document.getElementsByClassName("pleased")[0];
				var aSpan = oPleased.getElementsByTagName('span');
				for(let i=0;i<aSpan.length;i++){
					if(currIndex == i){
						aSpan[i].setAttribute("class", 'activea');
					}else{
						aSpan[i].setAttribute("class", null);
					}
				}
				this.n1 = temp;
				this.rate(this.n1);
			},
			rate1(){
				this.isflag = this.isflag ? false:true;
				this.rate(this.n1);
			},
			rate(){
				this.myRatingList=[];
				let item ={}
				let recommends = [];
				this.n1 = this.n1==null ? 2 : this.n1;
				for(let i=0;i<this.ratings1.length;i++){
					item.username=this.ratings1[i].username;
					item.rateTime=this.ratings1[i].rateTime;
					item.deliveryTime=this.ratings1[i].deliveryTime;
					item.score = this.ratings1[i].score;
					item.rateType = this.ratings1[i].rateType;
					item.text=this.ratings1[i].text;
					item.avatar = this.ratings1[i].avatar;
					if(this.ratings1[i].recommend.length>0){
						for(let j=0;j<this.ratings1[i].recommend.length;j++){
							recommends.push(this.ratings1[i].recommend[j]);
						}
						item.recommends = recommends;
					}
					if(this.isflag && item.text==""){
						item = {};
						recommends=[];
						continue;
					}
					if(this.n1==0 && item.rateType!=0){
						item = {};
						recommends=[];
						continue;							
					}
					if(this.n1 == 1 && item.rateType !=1){
						item = {};
						recommends=[];
						continue;	
					}
					this.myRatingList.push(item);
					item = {};
					recommends=[];
				}
				console.log(this.myRatingList);
			},
			scorllComment(){
				this.$nextTick(() => {
					this.commentscroll = new BScroll(this.$refs.commentScroll,{});
				})
			},
			satisfactory(){
				for(let i=0;i<this.ratings.length;i++){
					if(this.ratings[i].rateType == 0){
						this.negativeRateType++;
					}else{
						this.goodRateType++;
					}
				}
			}

		}

		
	}
</script>

<style lang="scss" scoped>
	@import '../../components/common/common.scss';
	.comment{

		.pleased{
			box-sizing:border-box;
			margin:0 16px;
			border-bottom:1px solid #e6e7e8;
			font-size:0;
			padding-bottom:18px;
			span{
				font-size:12px;
				color:rgb(7,17,27);
				font-weight:200;
				background-color:#00a0dc;
				padding:10px 12px;
				display:inline-block;
				margin-right:8px;
				&.activea{
					background-color:yellow!important;
					color:#fff;
				}
				&:nth-of-type(2){
					background-color:#ccecf8;
				}
				&:nth-of-type(3){
					background-color: #e9ebec;
				}
			}
		}

		.selectPle{
				box-sizing:border-box;
				font-size:12px;
				color:#ccc;
				font-weight:200;
				padding:18px;
				@include border1(#e6e7e8);
				&.pleActive{
					color:red;
				}
				i{
					font-size:25px;	
				}
				span{
					display:inline-block;
					vertical-align: top;
					margin-top:5px;
				}
		}

		.pleasedInner{
			height: 400px;
			overflow: hidden;
			margin:18px;
			ul{
				li{
					@include border1(#ccc);
					padding:10px 0;
					.imgbox{
						width:30px;
						height:30px;
						border-radius:50%;
						overflow: hidden;
						float:left;
						img{
							width:100%;
							height: 100%;
						}
					}

					.content{
						margin-left:42px;
						.title{
							.unameTime{
								
								span{
									&:nth-of-type(1){
										float:left;
										font-size:10px;
										color:rgb(7,17,27);
										line-height: 12px;
									}

									&:nth-of-type(2){
										float:right;
										font-size:10px;
										font-weight: 200;
										color:rgb(147,153,159);
										line-height: 12px;
									}
								}
							}
							.componentS{
								margin-top:9px;
								font-size:10px;
								font-weight: 200;
								color:rgb(147,153,159);
								line-height: 12px;
								span{
									padding-right:6px;
								}
								.stime{
									padding-left:9px;
								}
							}
							.cInner{
								padding-right:10px;
								font-size:12px;
								font-weight: 200;
								line-height: 18px;
								margin-top:6px;
							}

							.like{
								i{
									font-size:12px;
									color:rgb(0,160,220);
									line-height: 16px;
								}
								span{
									box-sizing:border-box;
									display: inline-block;
									margin-left:5px;
									width:60px;
									height:16px;
									margin-top:9px;
									font-size:9px;
									color:rgb(147,153,159);
									line-height: 16px;
									border:1px solid rgba(7,17,27,0.1);
									background-color:#fff;
									white-space:nowrap;
								  overflow:hidden;
								  text-overflow:ellipsis;
								}
							}
						}
					}
				}
			}
		}

		.shopping{
			font-size:30px;
		}

	}
</style>