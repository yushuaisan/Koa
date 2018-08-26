const outWorld = require('koa');
const app = new outWorld();
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
var count = 0;

app.use(bodyParser())

router.get('/',async ctx => {
  count++;
  ctx.response.type = 'text/html'
  ctx.response.body = `
    <h1>Welcome to Amazing Online Calculator</h1>
    <h2>You have landed at this website ` + count + ` times</h2>
    <a href="http://localhost:3000/math">
        <button style="color:black;font-size:50px">Calculator</button>
    </a>
  `
})

router.get('/math', async ctx => {
    ctx.response.body =
    `
    <form action="/math/result" method="post">    
        <h1>Calculator</h1>
        <input name="number1" type="number" value="0"></input>
        <select id="operator" name="operator" onchange="result()">
            <option value = "add" >+</option>
            <option value = "min" >-</option>
            <option value = "mul" >*</option>
            <option value = "div" >/</option>
        </select>
        <script>
            function result(){
                var op = document.getElementById("operator").value;
                op = op.toString();
            }
        </script>
        <input name="number2" type="number" value="0"></input>
        <br><br>
        <button style="color:black;font-size:20px">Result</button>
    </form>
    `
})

router.post('/math/result', async ctx => {
    let {number1,number2,operator} = ctx.request.body
    number1 = parseInt(number1);
    number2 = parseInt(number2);
    if(operator === "add"){
        var result = number1 + number2;
        ctx.response.body = `The result is ${result}`
    }else if(operator === "min"){
        var result = number1 - number2;
        ctx.response.body = `The result is ${result}`
    }else if(operator === "mul"){
        var result = number1 * number2;
        ctx.response.body = `The result is ${result}`
    }else if(operator === "div"){
        var result = number1 / number2;
        ctx.response.body = `The result is ${result}`
    }            
})


router.get('/game', async ctx => {
    ctx.response.body =
    `
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Three.js 101</title>
        <style>
            body { margin: 0; }
            canvas { width: 100%; height: 100% }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js"></script>
    </head>
    <body>
        <script>
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
            camera.position.z = 4;
            
            var renderer = new THREE.WebGLRenderer({antialias:true});

            renderer.setClearColor("#000000");
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            var geometry = new THREE.SphereGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( { color: "#59cc4a" } );
            var sphere = new THREE.Mesh( geometry, material );

            scene.add(sphere);

            var render = function(){
                requestAnimationFrame( render );
                
                sphere.rotation.x += 0.01;
                sphere.rotation.y += 0.01;
                
                renderer.render(scene, camera);
            };
            render();
        </script>
    </body>
    </html>   
    `
})

app.use(router.routes());

app.listen(3000);