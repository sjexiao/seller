<template>
	<div class="starts"  :class="dy">
		<ul>
			<li v-for="item in classItem" :class="item"></li>
		</ul>
	</div>
</template>

<script>
	const XX =5;
	export default{
		props:{
			start:{
				return:Number
			},
			fontsize:{
				return:Number
			}
		},
		computed:{
			dy(){
				return 'ff'+this.fontsize;
			},
			classItem(){
				//用来存储 类名
				let result =[]; 

				//把小数5之上 5，反之 0
				let s = Math.floor(this.start*2)/2;

				//取整数
				let inter =Math.floor(s);

				//判断是否有小数
				let hasDecimal = s % 1 !==0;

				for(let i=0;i<inter;i++){
					result.push('on');
				};
				if(hasDecimal){
					result.push('half');
				}
				while (result.length<XX) {
					result.push('off');
				}
				return result;
			}
		}

	}
</script>

<style lang="scss" scoped>
	 @import '../../components/common/common.scss';
	.starts{
		ul{
			li{
				
				display:inline-block;
				background-size:cover;
				margin-right:15px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bgImage(star24_on);
				}
				&.half{
					@include bgImage(star24_half);
				}
				&.off{
					@include bgImage(star24_off);
				}
			}
		}

		&.ff24{
			li{
				margin-top:16px;
				width:30px;
				height:30px;
				display:inline-block;
				background-size:cover;
				margin-right:15px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bgImage(star24_on);
				}
				&.half{
					@include bgImage(star24_half);
				}
				&.off{
					@include bgImage(star24_off);
				}
			}
		}

		&.ff11{
			li{
				width:10px;
				height:10px;
				display:inline-block;
				background-size:cover;
				margin-right:15px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bgImage(star24_on);
				}
				&.half{
					@include bgImage(star24_half);
				}
				&.off{
					@include bgImage(star24_off);
				}
			}
		}

		&.ff22{
			li{
				width:14px;
				height:14px;
				display:inline-block;
				background-size:cover;
				margin-right:15px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bgImage(star24_on);
				}
				&.half{
					@include bgImage(star24_half);
				}
				&.off{
					@include bgImage(star24_off);
				}
			}
		}

		&.ff23{
			li{
				width:14px;
				height:14px;
				display:inline-block;
				background-size:cover;
				margin-right:10px;
				&:last-child{
					margin-right:0;
				}
				&.on{
					@include bgImage(star24_on);
				}
				&.half{
					@include bgImage(star24_half);
				}
				&.off{
					@include bgImage(star24_off);
				}
			}
		}
	}
</style>