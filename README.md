# playcanvas-webpack-starter
Webpack based starter project for playcanvas engine with playcanvas-tween and ammo.js

# How to run?
```
npm i
npm run dev
npm run build
```

# Why?
PlayCanvas projects are usually developed with proprietary Editor, but when used that way, version control and ES6 are not supported.

After playing a bit with PlayCanvas in codepen, I decided to build simple minimal setup that will support local server, hot reloading, ES6, etc with playcanvas engine, playcanvas-tween and ammo.js

# Relevant links
https://playcanvas.com/  
https://github.com/playcanvas/engine  
https://playcanvas.github.io/#/misc/hello-world  
https://developer.playcanvas.com/en/user-manual/designer/  
https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_PlayCanvas/engine  
https://codepen.io/clonedev/pen/rNpyPQJ    

# Quirks
If you check dependencies in package.json you may notice that playcanvas has proper npm versioning, while playcanvas-tween and ammo.js are a bit odd. 

Additionally, the latter two do not seam to play nicely with ES6 imports: tween expects to find PlayCanvas engine declared as windows.pc, while ammo.js has to fetched async before playCanvas app is started.

If you find more elegant way to run these two you are welcome to participate.  
