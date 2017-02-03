# Elements editor

A three-dee making tool with simple commands and powerups for everyone. Built with THREE.js, JavaScript, and <3.

Try playing with this code:

```
light on
hemisphere medium, low
for x in [-5 .. 5]
    for y in [-5 .. 5]
        for z in [-5 .. 5]
            moveTo x, y, z
            color rotate red, z * 20
            cube .5
```

## Setup

    git clone git@github.com:alecmolloy/elements.git
    cd elements
    npm install
    npm run build

## Run the app with:

    npm start

Open your browser at [http://localhost:3000](http://localhost:3000)

## Run in production with

    sudo PORT=80 pm2 start src/app.js
