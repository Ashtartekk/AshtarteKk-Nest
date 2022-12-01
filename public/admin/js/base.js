$(function(){
	
	app.init();

})

var app={

	init:function(){
		this.slideToggle();
		this.resizeIframe();

	},
	resizeIframe:function(){
		//1、获取浏览器的高度
		//2、设置iframe的高度

		// alert($(window).height());

		$("#rightMain").height($(window).height()-80);
	},
	slideToggle:function(){
		$('.aside h4').click(function(){		
						
					
					$(this).siblings('ul').slideToggle();
		})
	}

}

window.onresize=function(){

	app.resizeIframe();
}
