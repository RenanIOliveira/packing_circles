<!DOCTYPE html>
<html>
<body style="width:100%; height:100%">

<style>
    button {
        margin:4px;
    }
    navbar{
        display:flex;
        justify-content: space-between;
        align-items: center;
        background-color: cadetblue;
        padding-right: 10%;
        padding-left: 10%;
    }
    #canvas_div{
        display: flex;
        justify-content: center;
        padding:2px;
    }
    h3{
        color:darkslategrey
    }
    #sub-div{
        display: flex;
        justify-content: center;
    }
</style>

<div style="width: 100%; height:90%">
    <navbar>
        <h3>Packing Circles</h3>
        <div id="buttons-div">
            <button Onclick="startPacking()">Start</button> 
            <button onclick="stopPacking()">Pause</button>
            <button onclick="clearCanvas()">Clear</button>
        </div>
    </navbar>
    <div id="canvas_div">
        <canvas id="myCanvas" width="1200px"; height="500px"  style="border:1px solid gray; align-items: center; width:90%; height: 90%;">
            Your browser does not support the HTML5 canvas tag.</canvas>
    </div>
    <div id="sub-div" width="100%" height="15px"><h3 height="15px" style="height: 15px;" id="n-circles">Number of Circles: 0</h3></div>
</div>

<div></div>

<script>
    const COLORS = ["blue","red","green","orange","purple","gray","pink","brown"];
    const MAX_CIRCLES = 400;
    
    var circles = [];
    var intervalID;

function drawCircleOnCanvas(circle){
	
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
    
    context.strokeStyle = circle.color;
    context.fillStyle = circle.color;
	
    context.beginPath();
	context.arc(circle.center[0], circle.center[1], circle.radius, 0, 2 * Math.PI);
    
	context.stroke();
    context.fill()
}

function startPacking(){
    console.log("starting");
	var canvas = document.getElementById("myCanvas");

    intervalID = setInterval(() => {
        if(circles.length <= MAX_CIRCLES)
            generateAndRenderCircle(canvas);
    },1000)

}

function stopPacking(){
    console.log("stoping");
    clearInterval(intervalID);
}

function clearCanvas(){
    console.log("clearing")
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles = [];
}

function generateAndRenderCircle(canvas){
    let width = canvas.width;
    let height = canvas.height;

    let circle = getRandomCircle(width,height);
    while(colidesWithSomeCircle(circle) || circleOutsideCanvas(circle,canvas)){
        circle = getRandomCircle(width,height);
    }

    circles.push(circle);
    drawCircleOnCanvas(circle);

    updateSubtitle();
}

function updateSubtitle(){
    let sub = document.getElementById("n-circles");

    let text = document.createTextNode("Number of Circles: " +circles.length.toString());

    sub.innerText ="Number of Circles: " +circles.length.toString() ;
}

function circleOutsideCanvas(circle,canvas){
    let x = circle.center[0];
    let y = circle.center[1];
    let radius = circle.radius;

    max_x = x + radius;
    min_x = x - radius;
    max_y = y + radius;
    min_y = y - radius;

    if(min_x < 0 || min_y < 0 || max_x > canvas.width || max_y > canvas.height){
        return true;
    }

    return false;
}

function colidesWithSomeCircle(circle){
    if(circles.length == 0) return false;

    let colisions = circles.map(cur_circle => DoCirclesColide(cur_circle,circle))
    
    let someColision = colisions.some((value) => value == true);
    
    return someColision;

}

function DoCirclesColide(circle1,circle2){
    let distance = centersDistance(circle1, circle2);

    let radius_sum = circle1.radius + circle2.radius;

    return (radius_sum >= distance)
}

function centersDistance(circle1,circle2){
    return pointsDistance(circle1.center, circle2.center)
}

function pointsDistance(p1,p2){
    let horizontal_distance = Math.abs(p1[0] - p2[0])
    let vertical_distance = Math.abs(p1[1] - p2[1])

    let distance = Math.sqrt(horizontal_distance**2 + vertical_distance**2);

    return distance;
}

function getRandomCircle(canvas_width, canvas_height){
    let color = getRandomColor(COLORS);
    let position = getRandomPosition(canvas_width, canvas_height);
    let radius = getRandomRadius(Math.min(canvas_width, canvas_height) * 0.25);

    return {
        center: position,
        radius: parseInt(radius),
        color: color
    }
}

function getRandomColor(colors){
    position = RandomInRange(0, colors.length-1, 0)
    return colors[position]
}

function getRandomPosition(maxWidth,maxHeight){
    let x = parseInt(RandomInRange(1,maxWidth));
    let y = parseInt(RandomInRange(1,maxHeight));

    return [x,y];
}

function getRandomRadius(maxRadius){
    return RandomInRange(1,maxRadius);
}

function RandomInRange(min,max,precision = 2){
    let rnd = Math.random();
    return (rnd * (min + (max - min))).toFixed(precision);
}

</script> 

</body>
</html>

