window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	const HANDLE_RADIUS = 10;
	const HANDLE_WIDTH = 2.5;
	const NODE_WIDTH = 3;
	const ARROW_HEAD = 5;
	let rightConnectId = null;
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
	const FIRST_NODE_STROKE = "black"
	const NODES_STROKE = "black";
	const HANDLE_COLOR_DEFAULT = "white";
	const HANDLE_COLOR_CLICK = "red";
	const HANDLE_COLOR_HOVER = "#ffcdd2";
	const HANDLE_COLOR_INTUTION = "#81C784";

	resizeCanvas();


//--------------*CLASSES AND METHODS----------------------------------------------------

	class Node{
		constructor(x, y, w, h, isDragging,leftConnected, rightConnected, inputHandleFill, outputHandleFill){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.isDragging = isDragging;
			this.leftConnected = leftConnected;
			this.rightConnected = rightConnected;
			this.inputHandleFill = typeof inputHandleFill !== 'undefined' ? inputHandleFill : HANDLE_COLOR_DEFAULT;
			this.outputHandleFill = typeof outputHandleFill !== 'undefined' ? outputHandleFill : HANDLE_COLOR_DEFAULT;
			// this.fillStyle = this.fillStyle ||"#ffffff";
		}
		create(ctx){
			ctx.fillStyle = NODE_COLOR;
			ctx.strokeStyle = NODES_STROKE;
			ctx.lineWidth = NODE_WIDTH;
			ctx.strokeRect(this.x, this.y, this.w, this.h);
			ctx.fillRect(this.x, this.y, this.w, this.h);

			//INPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.inputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x, Math.floor(this.y + (this.h)/2), HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();

			//OUTPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.outputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x + this.w, Math.floor(this.y + (this.h)/2), HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();
		}
		createFirst(ctx){
			ctx.beginPath();
			ctx.fillStyle = NODE_COLOR;
			ctx.strokeStyle = FIRST_NODE_STROKE;
			ctx.lineWidth = NODE_WIDTH;
			ctx.arc(this.x, this.y, this.w/2, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();

			//OUTPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.outputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x + this.w/2, this.y, HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();
		}
		isStartNodeSelected(x, y){
			return(Math.sqrt((x-this.x)*(x-this.x) + 
				  (y-Math.floor(this.y + (this.h)/2))*(y-Math.floor(this.y + (this.h)/2))) <= this.w/2)
		}
		startNodeHandleSelected(x, y){
			if(Math.sqrt(x-Math.floor(this.x + this.w/2))*(x-Math.floor(this.x + this.w/2)) + 
				(y-this.y)*(y-this.y) <= this.w/2){
				return "output";
			}
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

	class Connector{
		constructor(startX, startY, endX, endY, inputNodeId, outputNodeId){
			this.startX = startX;
			this.startY = startY;
			this.endX = endX;
			this.endY = endY;
			this.inputNodeId = typeof inputNodeId !== 'undefined' ? inputNodeId : null;
			this.outputNodeId = typeof outputNodeId !== 'undefined' ? outputNodeId : null;
		}
			drawConnectorPath(ctx){
			ctx.lineWidth = 3;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.strokeStyle = "red";
			ctx.fillStyle = "red";

			ctx.beginPath();
			ctx.moveTo(this.startX, this.startY);

			//BEZIER CURVE WITH DYNAMIC MID CONTROL POINTS	
			ctx.bezierCurveTo(Math.floor(this.startX + ((this.endX - this.startX)/2)), this.startY, 
			Math.floor(this.startX + ((this.endX - this.startX)/2)), this.endY , this.endX, this.endY) ;
			
			//ARROW HEAD
			if (this.startX != this.endX) {
				//LEFT
				if (this.endX < this.startX) {
					ctx.lineTo(Math.floor(this.endX + ARROW_HEAD), Math.floor(this.endY - ARROW_HEAD));
					ctx.lineTo(this.endX,this.endY);
					ctx.lineTo(Math.floor(this.endX + ARROW_HEAD), Math.floor(this.endY + ARROW_HEAD));
				}
				//RIGHT
				else{
					ctx.lineTo(Math.floor(this.endX - ARROW_HEAD), Math.floor(this.endY - ARROW_HEAD));
					ctx.lineTo(this.endX,this.endY);
					ctx.lineTo(Math.floor(this.endX - ARROW_HEAD), Math.floor(this.endY + ARROW_HEAD));
				}
			}
			ctx.stroke();
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
			startNode.createFirst(ctx);
			nodesArray.forEach(node=>{
				node.create(ctx);
			})
		}
	}



	function mouseDown(e){
		//ENABLING NODE DRAG
		if (startNode.isStartNodeSelected(e.clientX, e.clientY)) {
			dragging = true;
			canvas.style.cursor = "grabbing";
			startNode.isDragging = true;
		}
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
			if (startNode.rightConnected != true) {
				if (startNode.startNodeHandleSelected(e.clientX, e.clientY) == "output") {
					nodesArray.forEach(node=>{
						if (node.leftConnected != true) {
							node.inputHandleFill = HANDLE_COLOR_INTUTION;
							node.create(ctx);
						}
					})
					console.log("yee");
					canvas.style.cursor = "pointer";
					startNode.outputHandleFill = HANDLE_COLOR_CLICK;
					startNode.createFirst(ctx);
					outputConnected = true;
					startNode.rightConnected = true;
					rightConnectId = "startNode";
					imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					connectorArray.push(new Connector(e.clientX, e.clientY, e.clientX, e.clientY, null, "startNode"));
				}
			}
			if (nodesArray.length != 0) {
				for (var i = 0; i < nodesArray.length; i++) {
					console.log(i)
					//INPUT IS CLICKED
					if (nodesArray[i].handleSelected(e.clientX, e.clientY) == "input") {
						canvas.style.cursor = "pointer";
						inputConnected = true;

					}
					//OUTPUT IS CLICKED
					else if(nodesArray[i].rightConnected != true){
						if (nodesArray[i].handleSelected(e.clientX, e.clientY) == "output") {
							canvas.style.cursor = "pointer";
							nodesArray[i].outputHandleFill = HANDLE_COLOR_CLICK;

							// ACTIVATE INPUT INTUTIONS
							for (var j = 0; j < nodesArray.length; j++) {
								if (j != i) {
									if (nodesArray[j].leftConnected != true) {
										nodesArray[j].inputHandleFill = HANDLE_COLOR_INTUTION;
										nodesArray[j].create(ctx);
									}
								}
							}

							nodesArray[i].create(ctx);
							outputConnected = true;
							nodesArray[i].rightConnected = true;
							rightConnectId = i;
							imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
							connectorArray.push(new Connector(e.clientX, e.clientY, e.clientX, e.clientY, null, i));
							console.log(connectorArray);
							return;
						}
					}
				}
			}
			
		}		
	}


	function mouseMove(e){
		//DRAG NODE
		if (dragging){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (startNode.isDragging == true) {
				if (startNode.rightConnected == false) {
					startNode.x = e.clientX;
					startNode.y = e.clientY;
				}
				if (startNode.rightConnected == true) {
					startNode.x = e.clientX;
					startNode.y = e.clientY;
					connectorArray.forEach(connector=>{
						if (connector.outputNodeId == "startNode"){
							connector.startX = startNode.x + Math.floor((startNode.w)/2); 
							connector.startY = startNode.y;
							console.log("Updating start node and right connector");
						}
					})
				}
				startNode.createFirst(ctx);
				connectorArray.forEach(connector=>{
					connector.drawConnectorPath(ctx);
				})
			}
			for (var i = 0; i < nodesArray.length; i++) {		
				if (nodesArray[i].isDragging == true) {
					//NOTHING CONNECTED UPDATE NODE
					if (nodesArray[i].leftConnected == false && nodesArray[i].rightConnected == false) {

						nodesArray[i].x = e.clientX - nodesArray[i].w/2;
						nodesArray[i].y = e.clientY - nodesArray[i].h/2;
					}
					//ONLY INPUT CONNECTED UPDATE NODE AND LEFT CONNECTOR
					if (nodesArray[i].leftConnected == true && nodesArray[i].rightConnected == false) {
						nodesArray[i].x = e.clientX - nodesArray[i].w/2;
						nodesArray[i].y = e.clientY - nodesArray[i].h/2;
						connectorArray.forEach(connector=>{
							if (connector.inputNodeId == i){
								connector.endX = nodesArray[i].x; 
								connector.endY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
								console.log("Updating node & left connector");
							}
						})
					}
					//ONLY OUTPUT CONNECTED UPDATE NODE AND RIGHT CONNECTOR
					if (nodesArray[i].leftConnected == false && nodesArray[i].rightConnected == true) {
						nodesArray[i].x = e.clientX - nodesArray[i].w/2;
						nodesArray[i].y = e.clientY - nodesArray[i].h/2;
						connectorArray.forEach(connector=>{
							if (connector.outputNodeId == i){
								connector.startX = nodesArray[i].x + nodesArray[i].w; 
								connector.startY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
								console.log("Updating node & right connector");
							}
						})
					}
					//BOTH INPUT OUTPUT CONNECTED, UPDATE NODE AND LEFT RIGHT CONNECTORS
					if (nodesArray[i].leftConnected == true && nodesArray[i].rightConnected == true) {
						nodesArray[i].x = e.clientX - nodesArray[i].w/2;
						nodesArray[i].y = e.clientY - nodesArray[i].h/2;
						connectorArray.forEach(connector=>{
							if (connector.inputNodeId == i){
								connector.endX = nodesArray[i].x; 
								connector.endY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
							}
							if (connector.outputNodeId == i) {
								connector.startX = nodesArray[i].x + nodesArray[i].w; 
								connector.startY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
								connector.drawConnectorPath(ctx);
							}
						})
					}
					startNode.createFirst(ctx);
					nodesArray[i].create(ctx);
					connectorArray.forEach(connector=>{
						connector.drawConnectorPath(ctx);
					})
				}
				//RECREATE NODES WHICH ARE NOT BEEN DRAGGED WHILE ANY OTHER IS DRAGGING
				if (startNode.isDragging == false) {
					startNode.createFirst(ctx);
					
				}
				if (nodesArray[i].isDragging == false){
					nodesArray[i].create(ctx);	
				}
			}
		}


		if (!dragging) {
			canvas.style.cursor = "default";
			if (startNode.rightConnected == false) {
				startNode.outputHandleFill = HANDLE_COLOR_DEFAULT;
				startNode.createFirst(ctx);
			}
			nodesArray.forEach(node=>{
				if (node.rightConnected == false) {
					node.outputHandleFill = HANDLE_COLOR_DEFAULT;
					node.create(ctx);
				}
			})

			//HOVER ON START NODE
			if (startNode.isStartNodeSelected(e.clientX, e.clientY)) {
				canvas.style.cursor = "grab";
			}
			//HOVER ON START NODE CONNECTOR
			if (startNode.startNodeHandleSelected(e.clientX, e.clientY) == "output") {
				canvas.style.cursor = "pointer";
				if (startNode.rightConnected == false) {
					startNode.outputHandleFill = HANDLE_COLOR_HOVER;
					startNode.createFirst(ctx);
				}
			}

			nodesArray.forEach(node=>{
				//HOVER ON NODE
				if(node.isNodeSelected(e.clientX, e.clientY)){
					canvas.style.cursor = "grab";
				}
				//HOVER ON NODE CONNECTORS
				if (node.handleSelected(e.clientX, e.clientY) == "input") {
					canvas.style.cursor = "pointer";

					
					
				}
				else if (node.handleSelected(e.clientX, e.clientY) == "output") {
					canvas.style.cursor = "pointer";
					if (node.rightConnected == false) {
						node.outputHandleFill = HANDLE_COLOR_HOVER;
						node.create(ctx);
					}
				}
			})
			//OUTPUT TO INPUT CONNECTION
			if (outputConnected){
				canvas.style.cursor = "pointer";
				// RETRIEVING RUBBER LINE
				connectorArray[connectorArray.length - 1].endX = e.clientX;
				connectorArray[connectorArray.length - 1].endY = e.clientY;
				ctx.putImageData(imageData, 0, 0);
				connectorArray[connectorArray.length - 1].drawConnectorPath(ctx);
			}
		}
	}
			



	function mouseUp(e){
		if (dragging) {
			canvas.style.cursor = "grab";
			dragging = false;
			startNode.isDragging = false;
			nodesArray.forEach(node=>{
				if (node.isNodeSelected(e.clientX, e.clientY)){
					node.isDragging = false;
				}
			})
		}
		// IF CONNECTED TO ANY INPUT
		if (outputConnected) {
			for (var i = 0; i < nodesArray.length; i++){
				if (i != rightConnectId && nodesArray[i].leftConnected != true) {
					if (nodesArray[i].handleSelected(e.clientX, e.clientY) == "input") {
						outputConnected = false;
						nodesArray[i].leftConnected = true;
						nodesArray[i].inputHandleFill = HANDLE_COLOR_CLICK;
						nodesArray[i].create(ctx);
						if (startNode.rightConnected == true) {
							startNode.outputHandleFill = HANDLE_COLOR_CLICK;
							startNode.createFirst(ctx);
						}
						// RESET INTUTION
						for (var j = 0; j < nodesArray.length; j++) {
							if (nodesArray[j].leftConnected == false) {
								nodesArray[j].inputHandleFill = HANDLE_COLOR_DEFAULT;
								nodesArray[j].create(ctx);
							}
						}
						connectorArray[connectorArray.length - 1].endX = e.clientX;
						connectorArray[connectorArray.length - 1].endY = e.clientY;
						connectorArray[connectorArray.length - 1].inputNodeId = i;
						console.log("Yea");
						console.log(nodesArray);
						console.log(connectorArray);
					}
				}
			}
			// IF ABOVE SEARCH FAILS/IF NOT CONNECTED TO ANY INPUT
			if (outputConnected) {
				console.log("no");
				outputConnected = false;
				// if (startNode.rightConnected == false) {
				// 	startNode.outputHandleFill = HANDLE_COLOR_HOVER;
				// 	startNode.createFirst(ctx);
				// }
				if (rightConnectId != "startNode") {
					nodesArray[rightConnectId].rightConnected = false;
					nodesArray[rightConnectId].outputHandleFill = HANDLE_COLOR_DEFAULT;
				}
				if (rightConnectId == "startNode") {
					startNode.rightConnected = false;
					startNode.outputHandleFill = HANDLE_COLOR_DEFAULT;
				}

				//RESET INTUTION
				for (var j = 0; j < nodesArray.length; j++) {
						if (nodesArray[j].leftConnected == false) {
							nodesArray[j].inputHandleFill = HANDLE_COLOR_DEFAULT;
						}
					}
				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				startNode.createFirst(ctx);
				nodesArray.forEach(node=>{
					node.create(ctx);
				})
				connectorArray.splice(-1,1);
				connectorArray.forEach(path=>{
				path.drawConnectorPath(ctx);
				})
			}
		}
		console.log(nodesArray);
	}


	function mouseOver(e){
		//ENTER  CANVAS AREA IN CODE HERE..
	}
	function mouseOut(e){
		//EXIT CANVAS AREA OUT CODE HERE..
	}

//--------------CLASSES AND METHODS*----------------------------------------------------

	
	// CONNECT NODE CREATE CLICK HERE WITH FUNCTION OR CLICK ON HTML ELEMENT OR WHATEVER..
	let startNode = new Node(100, 100, 100, 70, false, false, false);
	startNode.createFirst(ctx);
	nodesArray.push(new Node(400, 100, 100, 70, false, false, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	nodesArray.push(new Node(700, 100, 100, 70, false, false, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	nodesArray.push(new Node(1000, 100, 100, 70, false, false, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	nodesArray.push(new Node(100, 400, 100, 70, false, false, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	nodesArray.push(new Node(100, 700, 100, 70, false, false, false));
	nodesArray[nodesArray.length - 1].create(ctx);
	

	window.addEventListener("resize", resizeCanvas, false);
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseover", mouseOver, false);
	canvas.addEventListener("mouseout", mouseOut, false);
	
});