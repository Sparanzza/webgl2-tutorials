// <reference path="js/glMatrix-0.9.5.max.js" />


document.addEventListener("DOMContentLoaded", start);
var gl;
var ready = false;
var TwoReady = false;

function createCube() {
    var cube = {};

    cube.vertices = [
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,

        -0.5, -0.5, 0.5,
         0.5, -0.5, 0.5,
         0.5, 0.5, 0.5,
         0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,

        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,

         0.5, 0.5, 0.5,
         0.5, 0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5, 0.5,
         0.5, 0.5, 0.5,

        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5, 0.5,
         0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,

        -0.5, 0.5, -0.5,
         0.5, 0.5, -0.5,
         0.5, 0.5, 0.5,
         0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5
    ];


    cube.colors = [];

    var faceColors = [
        [1.0, 0.0, 0.0, 1.0], // Front face
        [0.0, 1.0, 0.0, 1.0], // Back face
        [0.0, 0.0, 1.0, 1.0], // Top face
        [1.0, 1.0, 0.0, 1.0], // Bottom face
        [1.0, 0.0, 1.0, 1.0], // Right face
        [0.0, 1.0, 1.0, 1.0] // Left face
    ];

    faceColors.forEach(function (color) {
        for (var i = 0 ; i < 6 ; i++) {
            cube.colors = cube.colors.concat(color);
        }
    }
    );

    cube.textureCoordinates = [
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,

          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,

          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,

          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,

          0.0, 1.0,
          1.0, 1.0,
          1.0, 0.0,
          1.0, 0.0,
          0.0, 0.0,
          0.0, 1.0,

          0.0, 1.0,
          1.0, 1.0,
          1.0, 0.0,
          1.0, 0.0,
          0.0, 0.0,
          0.0, 1.0
    ];

    cube.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices), gl.STATIC_DRAW);



    cube.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors), gl.STATIC_DRAW);

    cube.textureCoordinatesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.textureCoordinates), gl.STATIC_DRAW);

    cube.texture1 = gl.createTexture();
    cube.texture1.image = new Image();
    cube.texture1.image.src = "images/checker.jpg";

    cube.texture1.image.onload = function()
    {
        gl.bindTexture(gl.TEXTURE_2D, cube.texture1);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        //void gl.texImage2D(target, level, internalformat, format, type, HTMLImageElement? pixels);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, cube.texture1.image);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);


        ready = true;
    }


    cube.texture2 = gl.createTexture();
    cube.texture2.image = new Image();
    cube.texture2.image.src = "images/checker.jpg";

    cube.texture2.image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, cube.texture2);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        //void gl.texImage2D(target, level, internalformat, format, type, HTMLImageElement? pixels);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, cube.texture2.image);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);


        TwoReady = true;
    }



    cube.vertexShader = getAndCompileShader("vertexShader");
    cube.fragmentshader = getAndCompileShader("fragmentShader");
    cube.shaderProgram = gl.createProgram();
    gl.attachShader(cube.shaderProgram, cube.vertexShader);
    gl.attachShader(cube.shaderProgram, cube.fragmentshader);
    gl.linkProgram(cube.shaderProgram);

    if (!gl.getProgramParameter(cube.shaderProgram, gl.LINK_STATUS)) {
        alert("Could not link shaders");
    }


    cube.vao = gl.createVertexArray();
    gl.bindVertexArray(cube.vao);

    cube.positionAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "position");
    gl.enableVertexAttribArray(cube.positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.positionBuffer);
    gl.vertexAttribPointer(cube.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    cube.colorAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "color");
    gl.enableVertexAttribArray(cube.colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.colorBuffer);
    gl.vertexAttribPointer(cube.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    cube.textureCoordinateAttributeLocation = gl.getAttribLocation(cube.shaderProgram, "textureCoordinate");
    gl.enableVertexAttribArray(cube.textureCoordinateAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, cube.textureCoordinatesBuffer);
    gl.vertexAttribPointer(cube.textureCoordinateAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    cube.modelMatrix = glMatrix.mat4.create();

    cube.modelMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "modelMatrix");
    cube.samplerUniformLocation = gl.getUniformLocation(cube.shaderProgram, "sampler0");
    cube.samplerOneUniformLocation = gl.getUniformLocation(cube.shaderProgram, "sampler1");

    gl.useProgram(cube.shaderProgram); // warning uniform1i location not for current program
    gl.activeTexture(gl.TEXTURE0); // you have at least 8 textures possible
    gl.bindTexture(gl.TEXTURE_2D, cube.texture1);
    gl.uniform1i(cube.samplerUniformLocation, 0);

    gl.activeTexture(gl.TEXTURE1); // you have at least 8 textures possible
    gl.bindTexture(gl.TEXTURE_2D, cube.texture2);
    gl.uniform1i(cube.samplerOneUniformLocation, 1);

    return cube;

}


function start() {

    var canvas = document.getElementById("renderCanvas");
    gl = canvas.getContext("webgl2");

    var cube = createCube();

    gl.useProgram(cube.shaderProgram);

    var viewMatrix = glMatrix.mat4.create();
    var projectionMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(projectionMatrix, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 100);
    var viewMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "viewMatrix");
    var projectionMatrixLocation = gl.getUniformLocation(cube.shaderProgram, "projectionMatrix");

    var angle = 0;
    //camera
    var camera = {
         position: glMatrix.vec3.fromValues(0,0,0),
         target: glMatrix.vec3.fromValues(0,0,0),
         direction: glMatrix.vec3.fromValues(0,0,0),
         pitch: 0, yaw: -1 * Math.PI/2.0
        };
    glMatrix.vec3.add(camera.target , camera.position, glMatrix.vec3.fromValues(0,0,-1));


    function runRenderLoop() {
        
        requestAnimationFrame(runRenderLoop);
        if (!ready || !TwoReady) return;
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        moveCamera(camera);
        var target = glMatrix.vec3.create();
        glMatrix.vec3.add( target , camera.position , camera.direction );

        // glMatrix.vec3.add(camera.target , camera.position, glMatrix.vec3.fromValues(0,0,-1));
        glMatrix.mat4.lookAt(viewMatrix, camera.position, target , glMatrix.vec3.fromValues(0,1,0));

        glMatrix.mat4.identity(cube.modelMatrix);

        glMatrix.mat4.translate(cube.modelMatrix, cube.modelMatrix, [4, 0, -7]);
        glMatrix.mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
        glMatrix.mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        glMatrix.mat4.scale(cube.modelMatrix, cube.modelMatrix, glMatrix.vec3.fromValues(2,2,2));

        angle += .01;

        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

        gl.useProgram(cube.shaderProgram);
        gl.bindVertexArray(cube.vao);

        gl.drawArrays(gl.TRIANGLES, 0, 36);

        glMatrix.mat4.identity(cube.modelMatrix);

        glMatrix.mat4.translate(cube.modelMatrix, cube.modelMatrix, [0, 0, -7]);
        glMatrix.mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle);
        glMatrix.mat4.rotateX(cube.modelMatrix, cube.modelMatrix, .25);
        glMatrix.mat4.scale(cube.modelMatrix, cube.modelMatrix, glMatrix.vec3.fromValues(2, 2, 2));

        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);

        glMatrix.mat4.identity(cube.modelMatrix);

        glMatrix.mat4.translate(cube.modelMatrix, cube.modelMatrix, [-4, 0, -7]);
        glMatrix.mat4.rotateY(cube.modelMatrix, cube.modelMatrix, angle * 2);
        glMatrix.mat4.rotateX(cube.modelMatrix, cube.modelMatrix, angle / 5);
        glMatrix.mat4.scale(cube.modelMatrix, cube.modelMatrix, glMatrix.vec3.fromValues(2, 2, 2));

        gl.uniformMatrix4fv(cube.modelMatrixLocation, false, cube.modelMatrix);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    requestAnimationFrame(runRenderLoop);

    
}


function getAndCompileShader(id) {
    var shader;
    var shaderElement = document.getElementById(id);
    var shaderText = shaderElement.text.trim();
    if (id == "vertexShader")
        shader = gl.createShader(gl.VERTEX_SHADER);
    else if (id == "fragmentShader")
        shader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}


//solved two buttons 

var isWPressed = false;
var isSPressed = false;
var isAPressed = false;
var isDPressed = false;
var isGPressed = false;
var isJPressed = false;
var isYPressed = false;
var isHPressed = false;



document.addEventListener("keydown" , function(event){
    if(event.key == 'w'){
        isWPressed = true;
    }
    if(event.key == 's'){
        isSPressed = true; 
    }
    if(event.key == 'a'){
        isAPressed = true;
    }
    if(event.key == 'd'){
        isDPressed = true;
    }
    if(event.key == 'g'){
        isGPressed = true;
    }
    if(event.key == 'j'){
        isJPressed = true;
    }
    if(event.key == 'y'){
        isYPressed = true;
    }
    if(event.key == 'h'){
        isHPressed = true;
    }
});

document.addEventListener("keyup" , function(event){
    if(event.key == 'w'){
        isWPressed = false;
    }
    if(event.key == 's'){
        isSPressed = false; 
    }
    if(event.key == 'a'){
        isAPressed = false;
    }
    if(event.key == 'd'){
        isDPressed = false;
    }
    if(event.key == 'g'){
        isGPressed = false;
    }
    if(event.key == 'j'){
        isJPressed = false;
    }
    if(event.key == 'y'){
        isYPressed = false;
    }
    if(event.key == 'h'){
        isHPressed = false;
    }
        
});

function moveCamera( camera ){

    camera.direction[0]= Math.cos(camera.pitch) * Math.cos(camera.yaw);
    camera.direction[1]= Math.sin(camera.pitch);
    camera.direction[2]= Math.cos(camera.pitch) * Math.sin(camera.yaw);

    
    camera.right = glMatrix.vec3.fromValues( -1 * Math.sin(camera.yaw), 0 , Math.cos(camera.yaw) );
    
    var movementDirection = glMatrix.vec3.create();

    if(isWPressed){
        // camera.position[2] -= .1;
        glMatrix.vec3.scale(movementDirection , camera.direction, .1);
        glMatrix.vec3.add(camera.position , camera.position, movementDirection );
    }
    if(isSPressed){
        // camera.position[2] += .1;
        glMatrix.vec3.scale(movementDirection , camera.direction, -.1);
        glMatrix.vec3.add(camera.position , camera.position, movementDirection );
    }
    if(isAPressed){
        // camera.position[0] -= .1;
        glMatrix.vec3.scale(movementDirection , camera.right, -.1);
        glMatrix.vec3.add(camera.position , camera.position, movementDirection );
    }
    if(isDPressed){
        // camera.position[0] += .1;
        glMatrix.vec3.scale(movementDirection , camera.right, .1);
        glMatrix.vec3.add(camera.position , camera.position, movementDirection ); 
    }
    if(isGPressed){
        camera.yaw -= .1;
    }
    if(isJPressed){
        camera.yaw += .1;
    }
    if(isYPressed){
        camera.pitch -= .1;
    }
    if(isHPressed){
        camera.pitch += .1;
    }
}