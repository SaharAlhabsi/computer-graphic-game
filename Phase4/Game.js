var gl;
var program;
var cprogram;
var vPosition;
var cvPosition;
var vertex_buffer;
var vertices;
var fColorLocation;
var moveseqare= 0.0;
var movex = 0.0;
var movey = 0.0;
var score = 0;


window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(.7, .1, .7, 0.9);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    cprogram = initShaders(gl, "vertex-shader", "fragment-shader");
    program1 = initShaders(gl, "vertex-shader", "fragment-shader");
    program2 = initShaders(gl, "vertex-shader", "fragment-shader");
    program3 = initShaders(gl, "vertex-shader", "fragment-shader");
    program4 = initShaders(gl, "vertex-shader", "fragment-shader");





    //Static Rectangle
    var sr_vertices = [
        0.5,-1.0,
        0.5,-0.3,
        0.45,-0.3,
        0.45,-1.0,
            0.5,-1.0,
    ];
    // Load the data into the GPU
    sr_bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sr_bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sr_vertices), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    sr_vPosition = gl.getAttribLocation(program, "vPosition");


    //Static Rectangle
    var sr2_vertices = [ -0.5,1.0,
    -0.5,0.0,
    -0.45,0.0,
    -0.45,1.0,
    -0.5,1.0,
];
var s_vertices = [ 	-0.5,-1.0,
    -0.5,-0.3,
    -0.45,-0.3,
    -0.45,-1.0
    	-0.5,-1.0,
];
    var sr3_vertices = [
        -0.5, -0.2,
        -0.5, -1,
        -0.4, -1,
        -0.4,-0.2,
        -0.5, -0.2,
    ];
    var sr4_vertices = [
        0.5,1.0,
        0.5,0.0,
        0.45,0.0,
        0.45,1.0,
        0.5,1.0,
    ];



    // Load the data into the GPU
    sr2_bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sr2_bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sr2_vertices), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    sr2_vPosition = gl.getAttribLocation(program, "vPosition");
    sr3_bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sr3_bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sr3_vertices), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    sr3_vPosition = gl.getAttribLocation(program, "vPosition");
    sr4_bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sr4_bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sr4_vertices), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    sr4_vPosition = gl.getAttribLocation(program, "vPosition");
    s_bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s_bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(s_vertices), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    s_vPosition = gl.getAttribLocation(program, "vPosition");
    if (!gl) alert("WebGL not supported");

    vertices = [vec2(0.0, 0.2),
        vec2(0.0, 0.3),
        vec2(0.1, 0.2),
        vec2(0.1, 0.3)
    ];


    fColorLocation = gl.getUniformLocation(program, "fColor");
    cfColorLocation = gl.getUniformLocation(cprogram, "fColor");

    moveLocx = gl.getUniformLocation(program, "movex");
    moveLocy = gl.getUniformLocation(program, "movey");
    vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);


    //associate shaders with data buffers
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var color = [Math.random(), Math.random(), Math.random(), 1];


    window.onkeydown = function(event) {

        var key =event.keyCode;
        switch (key) {
            case 37:
                if (moveseqare > -0.7)
                    movex -= 0.1;
                     score++;
                break;
            case 39:
                if (moveseqare < 0.7)
                    movex += 0.1;
                     score++;
                break;
            case 38:
                if (moveseqare < 0.7)
                    movey += 0.1;
                     score++;
                break;
            case 40:
                if (moveseqare < 0.7)
                    movey -= 0.1;
                     score++;
                break;

            // case default:
            //     alert("GAME OVER");
            //     score = 0;
            //     document.location.reload();
            //    break;
        }

    };
    if(vertices && sr_vPosition)
        { alert("GAME OVER");
            score = 0;
          document.location.reload();}
    else if(vertices && sr2_vertices)
        { alert("GAME OVER");
            score = 0;
          document.location.reload();}
    else if(vertices && sr3_vPosition)
              { alert("GAME OVER");
                  score = 0;
                document.location.reload();}
            else  if(vertices && sr4_vPosition)
                    { alert("GAME OVER");
                        score = 0;
                      document.location.reload();}
    render();
};


var rr_vPosition;
var sr_vPosition;
var rr_bufferId;
var sr_bufferId;
var sr2_vPosition;
var sr2_bufferId;
var sr3_vPosition;
var sr3_bufferId;
var sr4_vPosition;
var sr4_bufferId;
// var s_vPosition;
// var s_bufferId;

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program1);
    gl.enableVertexAttribArray(sr_vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, sr_bufferId);
    gl.vertexAttribPointer(sr_vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    gl.useProgram(program2);
    gl.enableVertexAttribArray(sr2_vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, sr2_bufferId);
    gl.vertexAttribPointer(sr2_vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    gl.useProgram(program3);
    gl.enableVertexAttribArray(sr3_vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, sr3_bufferId);
    gl.vertexAttribPointer(sr3_vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    gl.useProgram(program4);
    gl.enableVertexAttribArray(sr4_vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, sr4_bufferId);
    gl.vertexAttribPointer(sr4_vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    gl.useProgram(program);
    gl.useProgram(cprogram);
    gl.enableVertexAttribArray(s_vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, s_bufferId);
    gl.vertexAttribPointer(s_vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
    gl.useProgram(program);
    gl.enableVertexAttribArray(vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(moveLocx, movex);
     gl.uniform1f(moveLocy, movey);
    gl.uniform4f(fColorLocation, 1.0, 1.0, 1.0, 0.7);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    document.getElementById("pp").innerHTML = "Score: "+score;

    window.requestAnimFrame(render);
    // // set the color
    gl.uniform4fv(colorLocation, color);
}
