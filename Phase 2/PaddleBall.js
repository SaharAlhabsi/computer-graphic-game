
var gl;
var program;
var cprogram;
var vPosition;
var cvPosition;
var vertex_buffer;
var circle_vertex_buffer;
var vertices;
var circleVertices = [];
var fColorLocation;
var movePaddle=0.0;
var movex=0.0;
var movey=0.0;
var xdirection = false;
var ydirection = true;
var score = 0;


window.onload=function init() {
	var canvas=document.getElementById("gl-canvas");
	gl=WebGLUtils.setupWebGL(canvas);
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(.7,.7,.7,1);
	//load all shaders
	program =initShaders(gl,"vertex-shader","fragment-shader");
	cprogram =initShaders(gl,"vertex-shader","fragment-shader");
 score = new component("30px", "Consolas", "black", 8, 4, "text");

	if(!gl) alert("WebGL not supported");

	vertices=[  vec2(0.0, 0.2),
        vec2(0.0, 0.3),
        vec2(0.1, 0.2),
        vec2(0.1, 0.3)];

	function circle(sides, x, y)
{
   var vertices = []; //create empty array
   if (sides < 3)
   {
      console.log("function circle: Not enough sides to make a polygon.");
   }
   else
   {
      if (sides > 10000)
      {
         sides = 10000;
         console.log("function circle: Sides limited to 10,000.");
      }
      for (var i = sides; i >= 0; i--)
      {
         vertices.push(vec2(Math.cos(i/sides*2*Math.PI)*0.08+x, Math.sin(i/sides*2*Math.PI)*0.1+y));
      }
   }
   return vertices;
}
circleVertices = circle(1000, 0, 0);

	fColorLocation=gl.getUniformLocation(program,"fColor");
	cfColorLocation=gl.getUniformLocation(cprogram,"fColor");
	moveLoc=gl.getUniformLocation(program,"movePaddle");
	moveLocx=gl.getUniformLocation(cprogram,"movex");
	moveLocy=gl.getUniformLocation(cprogram,"movey");

	//////////////////////////////////////////////////////////////////
	// for paddle vertices load data to GPU
	vertex_buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(vertices),gl.STATIC_DRAW);


		//associate shaders with data buffers
	vPosition=gl.getAttribLocation(program,"vPosition");
	gl.enableVertexAttribArray(vPosition);
	gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
	////////////////////////////////////////////////////////////////
		// for circleVertices
	circle_vertex_buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,circle_vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(circleVertices),gl.STATIC_DRAW);

	//associate shaders with data buffers
	cvPosition=gl.getAttribLocation(cprogram,"vPosition");
	gl.enableVertexAttribArray(cvPosition);
	gl.vertexAttribPointer(cvPosition,2,gl.FLOAT,false,0,0);










	    window.onkeydown = function(event) {

        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case '%':
		  if (movePaddle>-0.7)
		  movePaddle-=0.1;
            break;
          case '\'':
		  if (movePaddle<0.7)
            movePaddle+=0.1;
            break;
        }
    };

	render();
};

	  function movingCircle(){
	gl.useProgram(cprogram);
	gl.enableVertexAttribArray(cvPosition);
	gl.bindBuffer(gl.ARRAY_BUFFER,circle_vertex_buffer);
	gl.vertexAttribPointer(cvPosition,2,gl.FLOAT,false,0,0);

	movex += (xdirection ? 0.02 : -0.02);
	movey += (ydirection ? 0.009 : -0.009);
  	if ((xdirection && movex>0.9) || (!xdirection && movex<-0.9))
		{xdirection = !xdirection;}
	if ((ydirection && movey>0.9))
		{ydirection = !ydirection;}
	if (!ydirection && movey<-0.75 && movex > movePaddle-0.3 && movex < movePaddle+0.3)
		{ydirection = !ydirection;
			score++;}
	else if(!ydirection && movey<-0.75)
		{ alert("GAME OVER");
			score = 0;
		  document.location.reload();}
	  	gl.uniform1f(moveLocx, movex);
		gl.uniform1f(moveLocy, movey);
	  }


function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	//paddle program
	gl.useProgram(program);
	gl.enableVertexAttribArray(vPosition);
	gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
	gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
	gl.uniform1f(moveLoc, movePaddle);
	gl.uniform4f(fColorLocation, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


	//circle program
//    gl.useProgram(cprogram);
//    gl.enableVertexAttribArray(cvPosition);
//    gl.bindBuffer(gl.ARRAY_BUFFER,circle_vertex_buffer);
//    gl.vertexAttribPointer(cvPosition,2,gl.FLOAT,false,0,0);
//    gl.uniform4f(cfColorLocation, 0.0, 0.0, 0.0, 1.0);
//    movingCircle();
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 1000);
	document.getElementById("pp").innerHTML = "Score: "+score;
	window.requestAnimFrame(render);
}
