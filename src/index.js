export function areIntersected (rect1, rect2) { 
	if (rect2.left > rect1.left){
		return  rect2.width > (rect2.left - rect1.left); 
	} if (rect2.left < rect1.left){
		return  rect2.width > (rect1.left - rect2.left); 
	} if (rect2 === rect1){
		return rect2.left === rect1.left
	} if (rect2.left === rect1.left){
		return (rect2.width > rect1.width) && (rect2.height > rect1.height);	
	} 
 } 

 export function filterVisible(rect1, arrayObject){
	return arrayObject.filter(elem => areIntersected(rect1, elem));
 }

 