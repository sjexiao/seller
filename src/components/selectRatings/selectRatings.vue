<template>
	<div class="selectRatings">
		
		<div class="rating-type">
			<span class="all" :class="{activea:selectType==2}" @click="select(2,$event)">{{desc.all}}<i>{{ratings.length}}</i></span>
			<span class="positive" :class="{activea:selectType==0}" @click="select(0,$event)">{{desc.positive}}<i>{{positive.length}}</i></span>
			<span class="negative" :class="{activea:selectType==1}" @click="select(1,$event)">{{desc.negative}}<i>{{negative.length}}</i>{{onlyContent}}</span>
		</div>

		<div @click="toggleContent" class="switch" :class="{on:onlyContent}">
	      <span class="icon icon-check_circle"></span>
	      <span class="text">
	      只看有内容的评论</span>
	    </div>
	</div>
</template>

<script>
	export default{
		props:{
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			},
			ratings:{
				type:Array,
				default(){
					return[];
				}
			},
			selectType:{
				type:Number,
				default(){
					return 2;
				}
			},
			onlyContent:{
				type:Boolean,
				default(){
					return false;
				}
			}
		},
		methods:{
			toggleContent(){
				this.$parent.onlyContent = !this.onlyContent;
				alert(this.$parent.aa); //测试调用父元素data里的数据
				alert(this.$parent.demo());//测试调用父元素里的函数
			},
			select(num,eve){
				if(!eve._constructed){
					return;
				}
				this.$parent.selectType = num;

			}
		},
		computed:{
			positive(){
				return this.ratings.filter((rating)=>{
					return rating.rateType ===0 
				})
			},
			negative(){
				return this.ratings.filter((rating)=>{
					return rating.rateType ===1 
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import '../../components/common/common.scss';
	.selectRatings{
		box-sizing:border-box;
		width:100%;
		font-size:0;
		.rating-type{
			margin:18px 18px 0 18px;
			padding-bottom:18px;
			border-bottom:1px solid #e6e7e8;
			span{
				display:inline-block;
				padding:10px 12px;
				margin-right:8px;
				font-size:12px;
				color:rgb(7,17,27);
				font-weight:200;
				line-height: 16px;
				background-color:#00a0dc;
				i{
					font-style:normal;
				}
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

		.switch{
	      padding:12px 18px;
	      line-height: 24px;
	      border-bottom: 1px solid rgba(7,17,27,.1);
	      color:#ccc;
	      font-size: 0;
	      span{
	        display:inline-block;
	        vertical-align:top;
	      }
	      .icon{
	        margin-right:4px;
	        font-size:24px;
	      }
	      .text{
	        font-size: 12px;
	      }
	      &.on{
	        .icon{
	          color:#00c850;
	        }
	      }
	    }
	}
</style>