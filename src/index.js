export function areIntersected (rect1, rect2) { 
	/* let a ={x: rect1.top, y: rect1.left,
			x1: rect1.top+rect1.height,
			 y1: rect1.left+rect1.width};
	let b ={x: rect2.top, y: rect2.left,
			x1: rect2.top+rect2.height,
			y1: rect2.left+rect2.width};  */
	/* return a.y<b.y1||a.y1>b.y||a.x1<b.x||a.x>b.x1 */ 
	if(rect1.width < rect2.left || 
		rect1.top < rect2.height || 
		rect1.left > rect2.width ||
		rect1.height > rect2.top) {return false}
	else if ()
		return true;
			
 } 

 