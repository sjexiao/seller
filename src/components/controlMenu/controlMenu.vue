<template>
	<div class="controlMenu">
		<transition name="move">
			<div>
				<span class="iconfont icon-remove_circle_outline" v-show="goods.count" @click.stop.prevent="jian($event)"></span>
				<span v-show="goods.count">{{goods.count}}</span>
				<span class="iconfont icon-add_circle" @click.stop.prevent="add($event)"></span>
				
			</div>
		</transition>
	</div>
</template>

<script>
	import Vue from "vue";

	export default{
		data(){
			return {
				inventorys: []
			}
		},
		props:{
			goods:{
				return:Object,
			}
		},
		methods:{
			add(eve){
				if(!eve._constructed){
					return
				}
				// console.log(this.goods);
				if(!this.goods.count){
					Vue.set(this.goods,'count',1); //给food对象添加count对象
				}else{
					this.goods.count++;
				}
			},
			jian(eve){
				if(!eve._constructed){
					return
				}
				this.goods.count--;

			}
		},
		computed:{
		}
	}
</script>

<style lang="scss" scoped>
	.controlMenu{
		font-size:0;
		span{
			font-size:24px;
			line-height: 24px;
			color:green;
			vertical-align: top;
			&.active{
				 visibility:hidden;
			}
			&:nth-of-type(2){
				font-size:10px;
				color:rgb(147,153,159);
				line-height: 24px;
				padding:0 12px;
			}
		}

		.move-enter-active, .move-leave-active{
	      transition: all 0.5s linear;
	      transform: translate3D(0,0,0) rotate(0deg);
	    }
	    .move-enter,.move-leave-active{
	      transform: translate3D(24px,0,0) rotate(180deg);
	      opacity:0;
	    }
	}
</style>