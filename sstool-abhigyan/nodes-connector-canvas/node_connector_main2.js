window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	const HANDLE_RADIUS = 10;
	const HANDLE_WIDTH = 2.5;
	const ARROW_HEAD = 6;
	let inputConnected = false;
	let outputConnected = false;
	let dragging = false;
	let startPoint = new Map([['x', null], ['y', null]]);
	let connectorArray= [];
	let pathPoints= [];
	let nodesArray = [];
	let my_gradient = ctx.createLinearGradient(0, 0, 0, 50);
	my_gradient.addColorStop(0, "#78909C");
	my_gradient.addColorStop(1, "#B0BEC5");
	const NODE_COLOR = my_gradient;
	const HANDLE_COLOR = "white";

	resizeCanvas();


//--------------*CLASSES AND METHODS----------------------------------------------------

	class Node{
		constructor(x, y, w, h, isDragging, inputHandleFill, outputHandleFill){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.isDragging = isDragging;
			this.inputHandleFill = inputHandleFill
			this.outputHandleFill = typeof outputHandleFill !== 'undefined' ? outputHandleFill : HANDLE_COLOR;
			// this.fillStyle = this.fillStyle ||"#ffffff";
		}
		create(ctx){
			ctx.fillStyle = NODE_COLOR;
			ctx.strokeStyle = "black";
			ctx.lineWidth = 3;
			ctx.strokeRect(this.x, this.y, this.w, this.h);
			ctx.fillRect(this.x, this.y, this.w, this.h);

			//INPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.outputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x, Math.floor(this.y + (this.h)/2), HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();

			//OUTPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.inputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x + this.w, Math.floor(this.y + (this.h)/2), HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();
		}
		isNodeSelected(x, y){
			return( x>=this.x
					&& x<=Math.floor(this.x + this.w)
					&& y>=this.y
					&& y<=Math.floor(this.y + this.h));
		}
		handleSelected(x, y){
			if(Math.sqrt((x-this.x)*(x-this.x) + 
				(y-Math.floor(this.y + (this.h)/2))*(y-Math.floor(this.y + (this.h)/2))) <= HANDLE_RADIUS){
				return "input";
			}
			else if (Math.sqrt((x-(this.x + this.w))*(x-(this.x + this.w)) + 
				(y-(Math.floor(this.y + (this.h)/2)))*(y-(Math.floor(this.y + (this.h)/2)))) <= HANDLE_RADIUS) {
				return "output";
			}
		}
	}


	function drawConnectorPath(startX, startY, endX, endY){
		ctx.lineWidth = 3;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		//BEZIER CURVE WITH DYNAMIC MID CONTROL POINTS	
		ctx.bezierCurveTo(Math.floor(startX + ((endX - startX)/2)), startY, 
		Math.floor(startX + ((endX - startX)/2)), endY , endX, endY) ;
		
		if (startX != endX) {
			if (endX < startX) {
				ctx.lineTo(Math.floor(endX + ARROW_HEAD), Math.floor(endY - ARROW_HEAD));
				ctx.lineTo(endX,endY);
				ctx.lineTo(Math.floor(endX + ARROW_HEAD), Math.floor(endY + ARROW_HEAD));
			}
			else{
				ctx.lineTo(Math.floor(endX - ARROW_HEAD), Math.floor(endY - ARROW_HEAD));
				ctx.lineTo(endX,endY);
				ctx.lineTo(Math.floor(endX - ARROW_HEAD), Math.floor(endY + ARROW_HEAD));
			}
		}	
	}


	function resizeCanvas(){
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		if (nodesArray.length != 0) {
		connectorArray.forEach(path=>{
				ctx.beginPath();
				ctx.moveTo(path[0].x, path[0].y);
				drawConnectorPath(path[0].x, path[0].y, path[1].x, path[1].y)
				ctx.stroke();
			})
			nodesArray.forEach(node=>{
				node.create(ctx);
			})
		}
	}


	function undo(e){
		if(e.keyCode === 13){
			//CLEAR ALL CANVAS
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//REMOVE LAST ITEM FOR UNDO EFFECT
			connectorArray.splice(-1,1);
			console.log(connectorArray);
			//REDRAW ALL
			connectorArray.forEach(path=>{
				ctx.beginPath();
				ctx.moveTo(path[0].x, path[0].y);
				drawConnectorPath(path[0].x, path[0].y, path[1].x, path[1].y)
				ctx.stroke();
			})
			nodesArray.forEach(node=>{
				node.create(ctx);
			})
		}
	}


	function mouseDown(e){
		//ENABLING NODE DRAG
		nodesArray.forEach(node=>{
			if (node.isNodeSelected(e.clientX, e.clientY)){
				dragging = true;
				canvas.style.cursor = "grabbing";
				node.isDragging = true;
				console.log(nodesArray);
			}
		})
		//ENABLING CONNECTORS
		if (!dragging) {
			if (nodesArray.length != 0) {
				for (var i = 0; i < nodesArray.length; i++) {
					console.log(i)
					//INPUT IS CLICKED
					if (nodesArray[i].handleSelected(e.clientX, e.clientY) == "input") {
						canvas.style.cursor = "pointer";
						inputConnected = true;
						// startPoint.set('x', e.clientX);
						// startPoint.set('y', e.clientY);
						// pathPoints.push({x:e.clientX, y:e.clientY});
						// //INITIATING RUBBER LINE
						// imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
						// mouseMove(e);

					}
					//OUTPUT IS CLICKED
					else if (nodesArray[i].handleSelected(e.clientX, e.clientY) == "output") {
						canvas.style.cursor = "pointer";
						outputConnected = true;
						startPoint.set('x', e.clientX);
						startPoint.set('y', e.clientY);
						pathPoints.push({x:e.clientX, y:e.clientY});
						//INITIATING RUBBER LINE
						imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
						// mouseMove(e);
						return;
					}
				}
			}
			
		}		
	}


	function mouseMove(e){
		//DRAG NODE
		if (dragging){   
			canvas.style.cursor = "grabbing";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			nodesArray.forEach(node=>{
				if (node.isDragging == false){
					node.create(ctx);
				}
				else if (node.isDragging == true) {
					node.x = e.clientX - node.w/2;
					node.y = e.clientY - node.h/2;
					node.create(ctx);
				}
			})
		}

		if (!dragging) {
			canvas.style.cursor = "default";
			nodesArray.forEach(node=>{
				if(node.isNodeSelected(e.clientX, e.clientY)){
					canvas.style.cursor = "grab";
				}
				// else if (node.handleSelected(e.clientX, e.clientY) == "input") {
				// 	node.inputHandleFill = "green";
				// }
				// else if (node.handleSelected(e.clientX, e.clientY) == "output") {
				// 	node.inputHandleFill = "red";
				// }

			})
			//OUTPUT TO INPUT CONNECTION
			if (outputConnected){
				canvas.style.cursor = "pointer";
				// RETRIEVING RUBBER LINE
				ctx.putImageData(imageData, 0, 0);
				ctx.beginPath();
				ctx.moveTo(startPoint.get('x'), startPoint.get('y'));
				drawConnectorPath(startPoint.get('x'), startPoint.get('y'), e.clientX, e.clientY);
				ctx.stroke();
			}
		}

			// if (outputConnected){
			// 	// RETRIEVING RUBBER LINE
			// 	canvas.style.cursor = "pointer";
			// 	ctx.putImageData(imageData, 0, 0);
			// 	ctx.beginPath();
			// 	ctx.moveTo(startPoint.get('x'), startPoint.get('y'));
			// 	drawConnectorPath(startPoint.get('x'), startPoint.get('y'), e.clientX, e.clientY);
			// 	ctx.stroke();
			// }
	}
			



	function mouseUp(e){
		if (dragging) {
			canvas.style.cursor = "grab";
			dragging = false;
			nodesArray.forEach(node=>{
				if (node.isNodeSelected(e.clientX, e.clientY)){
					node.isDragging = false;
				}
			})
		}
		if (outputConnected) {
			nodesArray.forEach(node=>{
				if (node.handleSelected(e.clientX, e.clientY) == "input") {
					outputConnected = false;
					pathPoints.push({x:e.clientX, y:e.clientY});
					connectorArray.push(pathPoints);
					pathPoints = [];
					console.log("Yea");
					console.log(nodesArray);
				}
			})
			if (outputConnected) {
				outputConnected = false;
				pathPoints = [];
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				nodesArray.forEach(node=>{
					node.create(ctx);
				})
				connectorArray.forEach(path=>{
				ctx.beginPath();
				ctx.moveTo(path[0].x, path[0].y);
				drawConnectorPath(path[0].x, path[0].y, path[1].x, path[1].y)
				ctx.stroke();
				})
			}
			
			// nodesArray.forEach(node=>{
			// 	if (node.handleSelected(e.clientX, e.clientY) != "input") {
			// 		outputConnected = false;
			// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
			// 		nodesArray.forEach(node=>{
			// 			node.create(ctx);

			// 		})	
			// 	}
			// })
		}
	}


	function mouseOver(e){
		//ENTER || EXIT CANVAS AREA CODE HERE..
	}

//--------------CLASSES AND METHODS*----------------------------------------------------

	
	// CONNECT NODE CREATE CLICK HERE WITH FUNCTION OR CLICK ON HTML ELEMENT OR WHATEVER..
	nodesArray.push(new Node(20, 20, 100, 70, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	nodesArray.push(new Node(700, 70, 100, 70, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	nodesArray.push(new Node(1000, 70, 100, 70, false));
	nodesArray[nodesArray.length - 1].create(ctx);

	window.addEventListener("resize", resizeCanvas, false);
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseover", mouseOver, false);
	document.addEventListener("keydown", undo, false);
	
});