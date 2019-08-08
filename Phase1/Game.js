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
    gl.clearColor(.7, .7, .7, 1);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    cprogram = initShaders(gl, "vertex-shader", "fragment-shader");

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

    render();
};




function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

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
}
