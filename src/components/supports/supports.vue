<template>
	<div id="supports" :class="[abc]">
		<ul>
			<li v-for="(item,index) in support">
				<span class="icon" :class="classMap[support[index].type]"></span>
				<span class="content">
					{{item.description}}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			support:{
				return:Array
			},
			abc:{
				return:String
			}
		},
		created(){
			this.classMap = ['decrease','discount','guarantee','invoice','special']
		}
	}
</script>

<style scoped lang="scss">
	@import '../../components/common/common.scss';
	#supports{
		ul{
			li{
				font-size: 0;
				span{
					display: inline-block;
					&.icon{
						display:inline-block;
						width: 12px;
						height: 12px;
						background-size: cover;
						color:red;
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
					&.content{
						vertical-align: top;
						font-size:10px;
						font-weight: 200;
						color:#fff;
						margin-left:4px;
					}
				}
			}
		}
		&.big{
			ul{
				li{
					margin-bottom:12px;
					font-size:0;
					&:last-child{
						margin-bottom:none;
					}
					span{
						display: inline-block;
						&.icon{
							display:inline-block;
							width: 16px;
							height: 16px;
							background-size: cover;
							color:red;
							&.decrease{
								@include bgImage(decrease_3);
							}
							&.discount{
								@include bgImage(discount_3);
							}
							&.guarantee{
								@include bgImage(guarantee_3);
							}
							&.invoice{
								@include bgImage(invoice_3);
							}
							&.special{
								@include bgImage(special_3);
							}
						}
						&.content{
							vertical-align: top;
							font-size:12px;
							font-weight: 200;
							color:#fff;
							margin-left:4px;
						}
					}

				}
			}
		}

		&.custom{
			ul{
				li{
					margin: 0 18px;
					padding:12px 16px;
					border-top:1px solid rgba(7,17,27,0.1);
					font-size:0;
					&:last-child{
						margin-bottom:none;
					}
					span{
						display: inline-block;
						
						&.icon{
							display:inline-block;
							width: 16px;
							height: 16px;
							background-size: cover;
							color:red;
							&.decrease{
								@include bgImage(decrease_3);
							}
							&.discount{
								@include bgImage(discount_3);
							}
							&.guarantee{
								@include bgImage(guarantee_3);
							}
							&.invoice{
								@include bgImage(invoice_3);
							}
							&.special{
								@include bgImage(special_3);
							}
						}
						&.content{
							vertical-align: top;
							font-size:12px;
							font-weight: 200;
							color:rgb(7,17,27);
							line-height: 16px;
						}
					}

				}
			}
		}
	}
	
</style>