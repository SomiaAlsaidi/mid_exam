//show cart

(function(){
	const cartInfo = document.getElementById("cart-info");
	const cart = document.getElementById("cart");
	
	cartInfo.addEventListener("click",function(){
		cart.classList.toggle("show-cart");
	});
	
})();
//add items to the cart

//(function(){
//	const cartBtn = document.querySelectorAll(".store-item-icon");
//	cartBtn.forEach(function(btn){
//		btn.addEventListener("click",function(event){
////		console.log(event.target);
//		if(event.target.parentElement.classList.contains("store-item-icon"))
//			{
//				let fullPath =
//					event.target.parentElement.previousElementSibling.scr;
//				let pos = fullPath.indexOf("img")+3;
//				let partPpath = fullPath.slice(pos);
//				 const item =
//			}
//	});
//});
//})();