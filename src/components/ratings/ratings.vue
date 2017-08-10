<template>
  <div class="ratings">
    <div class="grade-warpper">
    	
    	<div class="numGrade">
    		<p>{{countGrade}}</p>
    		<p>综合评分</p>
    		<p>高于周边商家69.2%</p>
    	</div>
			
			<div class="serverGrade">
				<p>
					<span>服务态度</span>
					<span>
						<starts :start="seller.serviceScore" :fontsize="22"></starts>
					</span>
					<span>{{seller.serviceScore}}</span>
				</p>
				<p>
					<span>服务态度</span>
					<span>
						<starts :start="seller.foodScore" :fontsize="22"></starts>
					</span>
					<span>{{seller.foodScore}}</span>
				</p>
				<p>
					<span>送达时间</span>
					<span>{{seller.deliveryTime}}分钟</span>
				</p>
			</div>
			
    </div>

    <div class="wire"></div>
		
		<div class="comment">
    	<comment :ratings1="ratings"></comment>
		</div>
  </div>
</template>

<script>

	import starts from "../starts/starts.vue";

	import comment from "../comment/comment.vue";

  export default {
  	props:{
  		seller:{
  			return :Object
  		}
  	},
  	components:{
  		starts,
  		comment
  	},
    created(){
    	this.$http.get('api/ratings').then(res=>{
    		this.ratings = res.body.data;
    		this.countGrade;
    		this.getConvertTime;
    		this.getAvgTime;
    	});
    },
    data(){
    	return{
    		ratings:[]
    	}
    },
    computed:{

    	countGrade(){
    		let temp = (this.seller.serviceScore + this.seller.foodScore)/ 2;
    		return parseFloat(temp).toFixed(1);
    		// let aa=Math.ceil((this.seller.serviceScore + this.seller.foodScore)/ 2);
    		// return aa;
    		

    		// let temp = 0;
    		// if(this.ratings.length>0){
    		// 	for(let i=0;i<this.ratings.length;i++){
    		// 		temp += this.ratings[i].score;
    		// 	}
    		// 	return parseFloat(temp/this.ratings.length).toFixed(1);
    		// }else{
    		// 	return 0;
    		// }
    	},
    	// getConvertTime(reteTime,type){
    	// 	let time = new Date(reteTime);
    	// 	let year = time.getFullYear();
    	// 	let month = (time.getMonth()+1 <10 ? '0' + (time.getMonth()+1) : (time.getMonth()+1));
    	// 	let day = time.getDate();
    	// 	let hours = time.getHours();
    	// 	let menute = time.getMinutes();
    	// 	if(type == 1){
    	// 		alert(1)
    	// 		return menute;
    	// 	}
    	// 	return year+"-"+month+"-"+day+" "+hours+"-"+menute;
    	// },
    	getConvertTime(reteTime){
    		let time = new Date(reteTime);
    		let year = time.getFullYear();
    		let month = (time.getMonth()+1 <10 ? '0' + (time.getMonth()+1) : (time.getMonth()+1));
    		let day = time.getDate();
    		let hours = time.getHours();
    		let menute = time.getMinutes();
    		return year+"-"+month+"-"+day+" "+hours+"-"+menute;
    	},
    	getAvgTime(){
    		let countTimeMenute = 0;
    		for(let i = 0; i<this.ratings.length;i++){
	    		let time = new Date(this.ratings[i].rateTime);
    			countTimeMenute += time.getMinutes();
    		}
    		return parseInt(countTimeMenute /this.ratings.length);
    	}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.ratings{
		.grade-warpper{
			margin-top:18px;
			.numGrade{
				float:left;
				width:138px;
				border-right:1px solid #ccc;
				p{
					color:rgb(7,17,27);
					text-align: center;
					&:nth-of-type(1){
						font-size:24px;
						color:rgb(255,153,0);
						line-height: 28px;
					}
					&:nth-of-type(2){
						margin-top:6px;
						font-size:12px;
						line-height: 12px;
					}
					&:nth-of-type(3){
						margin-top:8px;
						font-size:10px;
						line-height: 10px;
					}
				}
			}
			.serverGrade{
				margin-left:162px;
				p{
					margin-top:8px;
					font-size:12px;
					color:rgb(7,17,27);
					line-height: 18px;
					span{
						display: inline-block;
						padding-right:12px;
						&:last-child{
							padding-right: 0;
						}
						&:nth-of-type(3){
							color:rgb(255,153,0);
							line-height: 18px;
						}
					}
					&:first-child{
						margin-top:0;
					}
					&:nth-of-type(1){

					}
					&:nth-of-type(3){
						span{
							&:nth-of-type(2){
								color:rgb(147,153,159);
							}
						}
					}
				}
			}
		}
		.wire{
			box-sizing:border-top;
			margin-top:18px;
			height:16px;
			background-color: #f3f5f7;
			border-top:1px solid #e6e7e8;
			border-bottom:1px solid #e6e7e8;

		}
		.comment{
			margin-top:18px;
		}
	}

</style>