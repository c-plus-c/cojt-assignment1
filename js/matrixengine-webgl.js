//------------------------------------------------------------------------------------------------------------
//
// MatrixEngine Core Program for WebGL
// build number 1.0.20130628
//
//------------------------------------------------------------------------------------------------------------

var createMxeProjectWGL = function(){
    return new MxeProject();
};

var createMxePlayerWGL = function(canvas){
    return new MxePlayerWGL(canvas);
};

var MxePlayerWGL = function() {
    this.initialize.apply(this, arguments);
};
MxePlayerWGL.prototype = Object.create(MxePlayer.prototype);
MxePlayerWGL.prototype.constructor = MxePlayerWGL;
MxePlayerWGL.prototype.initialize = function(canvas) {
    MxePlayer.prototype.initialize.apply(this, arguments);
    this.glContextValid = false;
};

MxePlayerWGL.prototype.checkOverride = function() {
};

MxePlayerWGL.prototype.registerEvent = function(){
    MxePlayer.prototype.registerEvent.apply(this, arguments);
    
    var player = this;
    
    this.canvas.addEventListener(
        'webglcontextlost',
        function(e) {
            e.preventDefault();
            player.glContextValid = false;
        },
        false);
    this.canvas.addEventListener(
        'webglcontextrestored',
        function(e) {
            MxeUtil.log("gl context restored."); 
            e.preventDefault();
            player.initGL();
            //player.animationFrame(player)();
            player.update();
        },
        false);
};

MxePlayerWGL.prototype.getCanvasScaleFactor = function (){
    return this.canvas.width/this.canvas.clientWidth;
};

MxePlayerWGL.prototype.initGL = function() {
    var i, j;
    this.glContextValid = this.render.initGL();
    if(! this.glContextValid) return;
    var castArray = [
        this.contents.modelCasts,
        this.contents.textureCasts,
        this.contents.bitmapCasts,
        this.contents.textCasts,
        this.contents.movieCasts,
        this.contents.shaderCasts,
    ];
    var casts;
    for(i=0; i<castArray.length; i++){
        casts = castArray[i];
        for(j=0; j<casts.length; j++){
            if(casts[j] == null) continue;
            casts[j].initGL(this.render.gl);
        }
    }
};

MxePlayerWGL.prototype.checkGraphicsSystem = function() {
    return this.glContextValid;
};

MxePlayerWGL.prototype.initGraphicsSystem = function() {
    this.initGL();
};

MxePlayerWGL.prototype.createMxeRender2D = function(render){
    return new MxeRender2DWGL(render);
};

MxePlayerWGL.prototype.onMouseDownHandler = function(mouseX, mouseY, id, touchCount, e) {
    if(this.contents === null) return;
    
    if(this.onClickListenerCount > 0){
        var selectionID = this.render.getSelectionID(mouseX, mouseY);
        var renderItem = this.render.getRenderItemBySelectionID(selectionID);
        if(renderItem === null){
            //no object or error
        }else{
            /*
            MxeUtil.log("-------");
            MxeUtil.log('('+mouseX+','+mouseY+')'+pix[0]+','+pix[1]+','+pix[2]+','+pix[3]);
            MxeUtil.log("selectionID="+selectionID);
            MxeUtil.log("sector="+renderItem[1].index);
            MxeUtil.log("track="+renderItem[2].index);
            */
            var me;
            var track;
            if(renderItem[0] === 0){ //CT_MODEL
                track = renderItem[2][0];
                if(track.boneInfo !== null) track = track.boneInfo.modelTrack;
                me = this.createMxeEvent(e);
                me.sector = renderItem[1];
                me.x = mouseX;
                me.y = mouseY;
                track.onClickHandler(me);
            }else if(renderItem[0] === 1){ //CT_TEXTURE(billboard)
                track = renderItem[1];
                me = this.createMxeEvent(e);
                me.x = mouseX;
                me.y = mouseY;
                track.onClickHandler(me);
            }else if(renderItem[0] === 2 || renderItem[0] === 3 || renderItem[0] === 29){ //CT_BITMAP, CT_TEXT, CT_PROCEDURAL
                track = renderItem[1];
                me = this.createMxeEvent(e);
                me.x = mouseX;
                me.y = mouseY;
                track.onClickHandler(me);
            }else{
                //not support
            }
        }
    }
    
    MxePlayer.prototype.onMouseDownHandler.apply(this, arguments);

};

var MxeRender2DWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeRender2DWGL.prototype = Object.create(MxeRender2D.prototype);
MxeRender2DWGL.prototype.constructor = MxeRender2DWGL;
MxeRender2DWGL.prototype.initialize = function(render) {
    MxeRender2D.prototype.initialize.apply(this, arguments);
    this.gl = null;
    this.vertBuffer = null;
    this.uvBuffer = null;
    this.indexBuffer = null;
    this.shaderRequestOptions = this.render.player.createMxeShaderRequestOptions();
    this.shaderRequestOptions.useLighting = false;
};

MxeRender2DWGL.prototype.initGL = function(gl) {
    this.gl = gl;
    var x1 = -1.0;
    var x2 = 1.0;
    var y1 = -1.0;
    var y2 = 1.0;
    var vertices;
    this.vertBuffer = gl.createBuffer();
    if(this.vertBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
        vertices = [ x1, y1, 0.0, x2, y1, 0.0, x2, y2, 0.0, x1, y2, 0.0 ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertBuffer.itemSize = 3;
        this.vertBuffer.numItems = 4;
    }
    
    this.uvBuffer = gl.createBuffer();
    if(this.uvBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        vertices = [ 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0 ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.uvBuffer.itemSize = 2;
        this.uvBuffer.numItems = 4;
    }
    
    this.indexBuffer = gl.createBuffer();
    if(this.indexBuffer !== null){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        //var indices = [ 0, 1, 3, 2 ];
        var indices = [ 3, 1, 0, 1, 3, 2 ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = 6;
    }
};

MxeRender2DWGL.prototype.getOffscreenContext = function() {
    if(this.ofsCanvas) return this.ofsContext;
    this.createOffscreenCanvas(256, 256);
    this.ofsContext = this.ofsCanvas.getContext("2d");
    return this.ofsContext;
};

MxeRender2DWGL.prototype.createOffscreenCanvas = function(w, h) {
    this.ofsCanvas = document.createElement("canvas");
    this.resizeOffscreenCanvas(w, h);
};

MxeRender2DWGL.prototype.resizeOffscreenCanvas = function(w, h) {
    this.ofsCanvas.width = w;
    this.ofsCanvas.height = h;
    //this.ofsContext = this.ofsCanvas.getContext("2d");
};

MxeRender2DWGL.prototype.setAlphaBlend = function(frame, renderMode) {
    var gl = this.gl;
    if(renderMode === MxeRender.def.RM_SELECTION){
        gl.disable(gl.BLEND);
        return;
    }
    var cast = frame.cast;
    if(! cast.alphaBlendable){
        gl.disable(gl.BLEND);
        return;
    }
    var useBlend =
        frame.useBlending ||
        (cast.castType === MxeCast.def.CT_TEXT) ||
        frame.alpha < 1.0 ||
        (cast.alphaType !== 0);
    if(useBlend){
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(
            frame.blendFactorSrc,
            frame.blendFactorDst,
            frame.blendFactorAlphaSrc,
            frame.blendFactorAlphaDst);
    }else{
        gl.disable(gl.BLEND);
    }
};

MxeRender2DWGL.prototype.setScissor = function(frame, renderMode) {
    var gl = this.gl;
    if(frame.clippingMode === 0){
        gl.disable(gl.SCISSOR_TEST);
        return;
    }
    if(frame.clippingMode === 1){ //world mode
        var left = frame.clippingRect[0];
        var top = frame.clippingRect[1];
        var right = frame.clippingRect[2];
        var bottom = frame.clippingRect[3];
        gl.scissor(left, this.render.viewportHeight-bottom, right-left, bottom-top);
        gl.enable(gl.SCISSOR_TEST);
        return;
    }
    if(frame.clippingMode === 2){ //local mode
        //TODO
        gl.disable(gl.SCISSOR_TEST);
        return;
    }
    gl.disable(gl.SCISSOR_TEST);
};

MxeRender2DWGL.prototype.drawFrame = function(frame, renderMode, selectionID) {
    if(this.vertBuffer === null) return;
    if(! frame.worldVisible) return;
    if(renderMode !== MxeRender.def.RM_SELECTION && frame.alpha === 0.0) return;
    
    var cast = frame.cast;
    if(cast === null) return;
    
    if(cast.onDraw){ //PRPCEDURAL
        cast.onDraw(this.render, frame, renderMode, selectionID);
        return;
    }
    
    if(! cast.getPrepared()) return;
    if(! cast.glTexture) return;
    
    var gl = this.gl;
    
    this.shaderRequestOptions.renderMode = renderMode;
    if(frame.enableTransparentDiscard)
        this.shaderRequestOptions.alphaType = cast.alphaType;
    else
        this.shaderRequestOptions.alphaType = cast.alphaType & 2;
    var isText = this.shaderRequestOptions.isText = (cast.castType == MxeCast.def.CT_TEXT);
    var shaderProgram = this.render.requestShaderProgram(this.shaderRequestOptions);
    this.render.setShaderProgram(shaderProgram);
    
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cast.glTexture);
    gl.uniform1i(shaderProgram.uniforms.uTexture0, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, frame.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, frame.minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, frame.wrap_s);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, frame.wrap_t);
    
    //set bufferes
               
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.enableVertexAttribArray(shaderProgram.attributes.atVertex);
    gl.vertexAttribPointer(shaderProgram.attributes.atVertex, this.vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //if(shaderProgram.attributes.atNormal > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atNormal);
    //}
    
    if(shaderProgram.attributes.atUV[0] > -1){
        gl.enableVertexAttribArray(shaderProgram.attributes.atUV[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.vertexAttribPointer(shaderProgram.attributes.atUV[0], this.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
    
    //if(shaderProgram.attributes.atWeight0 > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atWeight0);
    //}
    //if(shaderProgram.attributes.atWeight1 > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atWeight1);
    //}
    //if(shaderProgram.attributes.atVColor > -1){
    //    gl.disableVertexAttribArray(shaderProgram.attributes.atVColor);
    //    if(shaderProgram.uniforms.uEnableVColor !== null){
    //        gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 0);
    //    }
    //}
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    
    gl.uniform1i(shaderProgram.uniforms.uBlendMode[0], 1);
    gl.uniformMatrix4fv(shaderProgram.uniforms.uProjMatrix, false, this.pMatrix);
    gl.uniformMatrix4fv(shaderProgram.uniforms.uViewMatrix, false, this.vMatrix);
    gl.uniform1i(shaderProgram.uniforms.uNBlend, 0);
    
    gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, frame.viewMatrix);
    
    if(shaderProgram.uniforms.uFogStart !== null){
        gl.uniform1f(shaderProgram.uniforms.uFogStart, 0.0);
    }
    if(shaderProgram.uniforms.uFogEnd !== null){
        gl.uniform1f(shaderProgram.uniforms.uFogEnd, 0.0);
    }
    if(shaderProgram.uniforms.uFogFactor !== null){
        gl.uniform1f(shaderProgram.uniforms.uFogFactor, 0.0);
    }
    if(shaderProgram.uniforms.uEnableVColor !== null){
        gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 0);
    }
    if(renderMode === MxeRender.def.RM_SELECTION){
        /*
        //32bit case
        var sred =   ((selectionID >> 16))/255.0;
        var sgreen = (((selectionID >> 8) & 0xff))/255.0;
        var sblue =  ((selectionID & 0xff))/255.0;
        gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sred, sgreen, sblue, 1.0]);
        */
        //16bit case
        if(selectionID > 0xffff){
            //error overflow
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [1.0, 1.0, 1.0, 1.0]);
        }else{
            var sa = (( selectionID >> 12)       )/15.0;
            var sb = (((selectionID >> 8 ) & 0xf))/15.0;
            var sg = (((selectionID >> 4 ) & 0xf))/15.0;
            var sr = (( selectionID        & 0xf))/15.0;
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sr, sg, sb, sa]);
        }
    }else{
        if(isText){
            gl.uniform4fv(shaderProgram.uniforms.uTextColor, cast.color);
            if(cast.bgTransparent){
                this.transparentColor[0] = cast.color[0];
                this.transparentColor[1] = cast.color[1];
                this.transparentColor[2] = cast.color[2];
                gl.uniform4fv(shaderProgram.uniforms.uTextBgColor, this.transparentColor);
            }else{
                gl.uniform4fv(shaderProgram.uniforms.uTextBgColor, cast.backgroundColor);
            }
        }
        if(shaderProgram.uniforms.uMatDiffuse !== null){
            this.polygonColor[3] = frame.alpha;
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, this.polygonColor);
        }
    }
    
    if(shaderProgram.uniforms.uTextureMargin[0] !== null){
        if(frame.clippingMode === 4){
            this.textureUVMargin[0] = frame.clippingRect[0] / cast.textureWidth;
            this.textureUVMargin[1] = frame.clippingRect[1] / cast.textureHeight;
        }else{
            this.textureUVMargin[0] = 0.0;
            this.textureUVMargin[1] = 0.0;
        }
        gl.uniform2fv(shaderProgram.uniforms.uTextureMargin[0], this.textureUVMargin);
    }
    if(shaderProgram.uniforms.uTextureScale[0] !== null){
        if(frame.clippingMode === 4){
            var right = frame.clippingRect[2] < cast.textureWidth ? frame.clippingRect[2] : cast.textureWidth;
            var bottom = frame.clippingRect[3] < cast.textureHeight ? frame.clippingRect[3] : cast.textureHeight;
            
            this.textureUVScale[0] = (right - frame.clippingRect[0]) / cast.textureWidth;
            this.textureUVScale[1] = (bottom - frame.clippingRect[1]) / cast.textureHeight;
        }else{
            this.textureUVScale[0] = cast.getWidth() / cast.textureWidth;
            this.textureUVScale[1] = cast.getHeight() / cast.textureHeight;
        }
        gl.uniform2fv(shaderProgram.uniforms.uTextureScale[0], this.textureUVScale);
    }

    this.setAlphaBlend(frame, renderMode);
    this.setScissor(frame, renderMode);
    gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

};

MxePlayerWGL.prototype.createMxeRender3D = function(render){
    return new MxeRender3DWGL(render);
};

var MxeRender3DWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeRender3DWGL.prototype = Object.create(MxeRender3D.prototype);
MxeRender3DWGL.prototype.constructor = MxeRender3DWGL;
MxeRender3DWGL.prototype.initialize = function(render) {
    MxeRender3D.prototype.initialize.apply(this, arguments);
    this.gl = null;
    this.shaderOptions = this.render.player.createMxeShaderRequestOptions();
};

MxeRender3DWGL.prototype.initGL = function(gl) {
    this.gl = gl;
    this.billboardModel.initGL(gl);
};

MxeRender3DWGL.prototype.setAlphaBlend = function(renderItem, renderMode) {
    var gl = this.gl;
    if(renderMode === MxeRender.def.RM_SELECTION){
        gl.disable(gl.BLEND);
        gl.depthMask(true);
        return;
    }
    var itemAlphaType = this.getItemAlphaType(renderItem);
    if(itemAlphaType !== 0){
        var material = this.getItemMaterial(renderItem);
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(
            material.blendFactorSrc,
            material.blendFactorDst,
            material.blendFactorAlphaSrc,
            material.blendFactorAlphaDst);
        
        //detect depth mask
        var depthMask = material.depthMask && ! material.useBlending;
        depthMask = depthMask && (material.color[3] > 0.95);
        gl.depthMask(depthMask);
    }else{
        gl.disable(gl.BLEND);
        gl.depthMask(true);
    }    
};

MxeRender3DWGL.prototype.drawSector = function(renderItem, renderMode, selectionID) {
    var gl = this.gl;
    var sector = renderItem[1];
    var frame;
    var i, j, k, l;
    var bones = renderItem[2];
    var gm;
    var cameraCast;
    
    //check visibility
    if(renderMode !== MxeRender.def.RM_SELECTION)
        if(sector.material.color[3] === 0.0) return;
    for(i=0; i<bones.length; i++){
        frame = bones[i].frame;
        if(! frame.worldVisible) return;
    }
    
    cameraCast = this.currentCameraTrack.frame.getCast();
    
    var isBillboard = (bones[0].billboardType > 0);
    
    //cpu clipping
    var boxes = this.clipBoxes;
    var clipout = true;
    if(this.render.options.enableCPUClipping && sector.boxMin !== null){
        for(i=0; i<bones.length; i++){
            frame = bones[i].frame;
            if(isBillboard){
                mat4.multiply(this.projMatrix, frame.billboardMatrix, this.workMatrix);
            }else{
                if(sector.isSkin) gm = frame.skinMatrix; else gm = frame.worldMatrix;
                mat4.multiply(this.viewProjMatrix, gm, this.workMatrix);
            }
            
            boxes[0] = sector.boxMin;
            boxes[1] = sector.boxMax;
            this.workPole[0] = 3; //3 is init flag
            for(j=0; j<2; j++){
                for(k=0; k<2; k++){
                    for(l=0; l<2; l++){
                        this.workVector[0] = boxes[j][0];
                        this.workVector[1] = boxes[k][1];
                        this.workVector[2] = boxes[l][2];
                        this.workVector[3] = 1.0;
                        mat4.multiplyVec4(this.workMatrix, this.workVector, this.workVector);
                        if(this.checkClip(this.workVector, cameraCast.near, cameraCast.far*sector.material.clippingValue, this.workPole)){
                            clipout = false;
                            break;
                        }
                        if(boxes[0][2] === boxes[1][2]) break;
                    }
                    if(! clipout) break;
                    if(boxes[0][1] === boxes[1][1]) break;
                }
                if(! clipout) break;
                if(boxes[0][0] === boxes[1][0]) break;
            }
            if(! clipout) break;
        }
        if(clipout) return;
    }

    //set shader
    var shaderProgram = null;
    if(sector.material.shaderCast !== null && renderMode !== MxeRender.def.RM_SELECTION){
        shaderProgram = sector.material.shaderCast.program;
        useShaderCast = true;
        this.render.setShaderProgram(shaderProgram);
        sector.material.shaderCast.commitUniformValues(gl);
    }else{
        this.shaderOptions.renderMode = renderMode;
        this.shaderOptions.alphaType = this.getItemAlphaType(renderItem); 
        this.shaderOptions.useLighting = this.render.options.enableLighting && sector.material.enableLighting;
        this.shaderOptions.useSpecular = this.render.options.enableSpecularLighting && (sector.material.shininess > 0.0);
        shaderProgram = this.render.requestShaderProgram(this.shaderOptions);
        this.render.setShaderProgram(shaderProgram);
    }
    
    //set depth test
    if(sector.material.depthTest){
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }else{
        gl.disable(gl.DEPTH_TEST);
    }

    //set lights
    if(shaderProgram.uniforms.uLightCount !== null)
        gl.uniform1i(shaderProgram.uniforms.uLightCount, this.lightCount);
    if(shaderProgram.uniforms.uLightAmbient !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightAmbient, this.lightAmbient);
    if(shaderProgram.uniforms.uLightType !== null)
        gl.uniform1iv(shaderProgram.uniforms.uLightType, this.lightTypeBuffer);
    if(shaderProgram.uniforms.uLightCol !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightCol, this.lightColBuffer);
    //if(shaderProgram.uniforms.uLightMatrix !== null)
    //    gl.uniformMatrix4fv(shaderProgram.uniforms.uLightMatrix, false, this.lightMatricesBuffer);
    if(shaderProgram.uniforms.uLightAtt0 !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightAtt0, this.lightAtt0Buffer);
    if(shaderProgram.uniforms.uLightAtt1 !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightAtt1, this.lightAtt1Buffer);
    if(shaderProgram.uniforms.uLightAtt2 !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightAtt2, this.lightAtt2Buffer);
    if(shaderProgram.uniforms.uLightRange !== null)
        gl.uniform1f(shaderProgram.uniforms.uLightRange, this.lightRangeBuffer);
    if(shaderProgram.uniforms.uSpotExponent !== null)
        gl.uniform1f(shaderProgram.uniforms.uSpotExponent, this.spotExpBuffer);
    if(shaderProgram.uniforms.uSpotCutoff !== null)
        gl.uniform1f(shaderProgram.uniforms.uSpotCutoff, this.spotCutOffBuffer);
    
    if(shaderProgram.uniforms.uLightDir !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightDir, this.lightDirBuffer);
    if(shaderProgram.uniforms.uLightPos !== null)
        gl.uniform3fv(shaderProgram.uniforms.uLightPos, this.lightPosBuffer);
    
    //set camera pos
    if(shaderProgram.uniforms.uCameraPos !== null)
        gl.uniform3fv(shaderProgram.uniforms.uCameraPos, this.cameraPos);
        //gl.uniform3fv(shaderProgram.uniforms.uCameraPos, this.originPoint);
    
    //check texture
    for(i=0; i<sector.material.textureInfo.length; i++){
        var textureInfo = sector.material.textureInfo[i];
        if(! textureInfo || textureInfo.cast === null){
            if(shaderProgram.uniforms.uBlendMode[i] !== null)
                gl.uniform1i(shaderProgram.uniforms.uBlendMode[i], 0);
            continue;
        }
        var textureCast = textureInfo.cast;
        if(! textureCast.getPrepared()) return; //skip render
        //gl.enable(gl.TEXTURE_2D); //webgl not support
        gl.activeTexture(gl.TEXTURE0+i);
        gl.bindTexture(gl.TEXTURE_2D, textureCast.glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, textureInfo.wrap_s);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, textureInfo.wrap_t);
        if(shaderProgram.uniforms.uTexture[i])
            gl.uniform1i(shaderProgram.uniforms.uTexture[i], i);
        if(shaderProgram.uniforms.uBlendMode[i] !== null)
            gl.uniform1i(shaderProgram.uniforms.uBlendMode[i], textureInfo.blendMode+1);
        if(shaderProgram.uniforms.uBlendValue[i] !== null)
            gl.uniform1f(shaderProgram.uniforms.uBlendValue[i], textureInfo.blendValue);

        var texRatioU = 1.0;
        var texRatioV = 1.0;
        if(shaderProgram.uniforms.uTextureScale[i] !== null){
            this.textureUVScale[0] = 1.0;
            if(textureInfo.repeat[0] !== 1.0)
                this.textureUVScale[0]*= textureInfo.repeat[0];
            if(textureInfo.cast.image.width !== textureInfo.cast.textureWidth){
                texRatioU = textureInfo.cast.image.width / textureInfo.cast.textureWidth;
                this.textureUVScale[0]*= texRatioU;
            }
            this.textureUVScale[1] = 1.0;
            if(textureInfo.repeat[1] !== 1.0)
                this.textureUVScale[1]*= textureInfo.repeat[1];
            if(textureInfo.cast.image.height !== textureInfo.cast.textureHeight){
                texRatioV = textureInfo.cast.image.height / textureInfo.cast.textureHeight;
                this.textureUVScale[1]*= texRatioV;
            }
            gl.uniform2fv(shaderProgram.uniforms.uTextureScale[i], this.textureUVScale);
        }
        if(shaderProgram.uniforms.uTextureMargin[i] !== null){
            this.textureUVMargin[0] = -textureInfo.offset[0];
            if(textureInfo.repeat[0] !== 1.0){
                this.textureUVMargin[0]-= (0.5*textureInfo.repeat[0]-0.5)*texRatioU;
            }
            this.textureUVMargin[1] = textureInfo.offset[1];
            if(textureInfo.repeat[1] !== 1.0){
                this.textureUVMargin[1]-= (0.5*textureInfo.repeat[1]-0.5)*texRatioV;
            }
            gl.uniform2fv(shaderProgram.uniforms.uTextureMargin[i], this.textureUVMargin);
        }
        if(shaderProgram.uniforms.uWrapMode[i] !== null){
            gl.uniform1i(shaderProgram.uniforms.uWrapMode[i], textureInfo.mapType);
        }
    }

    //set bufferes
           
    gl.bindBuffer(gl.ARRAY_BUFFER, sector.positionBuffer);
    gl.enableVertexAttribArray(shaderProgram.attributes.atVertex);
    gl.vertexAttribPointer(shaderProgram.attributes.atVertex, sector.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    //normal
    if(shaderProgram.attributes.atNormal > -1){
        gl.enableVertexAttribArray(shaderProgram.attributes.atNormal);
        gl.bindBuffer(gl.ARRAY_BUFFER, sector.normalBuffer);
        gl.vertexAttribPointer(shaderProgram.attributes.atNormal, sector.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
    
    //vertex color
    if(shaderProgram.attributes.atVColor > -1){
        if(sector.colorBuffer === null){
            if(shaderProgram.uniforms.uEnableVColor !== null){
                gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 0);
            }
        }else{
            if(shaderProgram.uniforms.uEnableVColor !== null){
                gl.uniform1i(shaderProgram.uniforms.uEnableVColor, 1);
            }
            gl.enableVertexAttribArray(shaderProgram.attributes.atVColor);
            gl.bindBuffer(gl.ARRAY_BUFFER, sector.colorBuffer);
            gl.vertexAttribPointer(shaderProgram.attributes.atVColor, sector.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
    }
    
    if(sector.uvBuffer !== null){
        for(var i=0; i<sector.uvBuffer.length; i++){
            if(shaderProgram.attributes.atUV[i] > -1){
                if(sector.uvBuffer === null || sector.uvBuffer[i] === null){
                    //gl.disableVertexAttribArray(shaderProgram.attributes.atUV[i]);
                }else{
                    gl.enableVertexAttribArray(shaderProgram.attributes.atUV[i]);
                    gl.bindBuffer(gl.ARRAY_BUFFER, sector.uvBuffer[i]);
                    gl.vertexAttribPointer(shaderProgram.attributes.atUV[i], sector.uvBuffer[i].itemSize, gl.FLOAT, false, 0, 0);
                }
            }
        }
    }
    
    if(shaderProgram.attributes.atWeight0 > -1){
        if(sector.boneWeightBuffer === null){
            //gl.disableVertexAttribArray(shaderProgram.attributes.atWeight0);
            //gl.disableVertexAttribArray(shaderProgram.attributes.atWeight1);
        }else{
            gl.bindBuffer(gl.ARRAY_BUFFER, sector.boneWeightBuffer);
            gl.enableVertexAttribArray(shaderProgram.attributes.atWeight0);
            if(bones.length < 4){
                gl.vertexAttribPointer(shaderProgram.attributes.atWeight0, bones.length, gl.FLOAT, false, bones.length*4, 0);
                //gl.disableVertexAttribArray(shaderProgram.attributes.atWeight1);
            }else{
                gl.vertexAttribPointer(shaderProgram.attributes.atWeight0, 3, gl.FLOAT, false, bones.length*4, 0);
                gl.enableVertexAttribArray(shaderProgram.attributes.atWeight1);
                gl.vertexAttribPointer(shaderProgram.attributes.atWeight1, bones.length-3, gl.FLOAT, false, bones.length*4, 3*4);
            }
        }
    }

    if(shaderProgram.uniforms.uProjMatrix !== null)
        gl.uniformMatrix4fv(shaderProgram.uniforms.uProjMatrix, false, this.projMatrix);
    if(shaderProgram.uniforms.uViewMatrix !== null)
        if(isBillboard)
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewMatrix, false, this.identityMatrix); //because view is identity
        else
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewMatrix, false, this.viewMatrix);
    if(shaderProgram.uniforms.uViewProjMatrix !== null)
        if(isBillboard)
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewProjMatrix, false, this.projMatrix); //because view is identity!
        else
            gl.uniformMatrix4fv(shaderProgram.uniforms.uViewProjMatrix, false, this.viewProjMatrix);
    if(shaderProgram.uniforms.uWorldViewProjMatrix !== null){
        var vpmatrix;
        if(isBillboard)
            vpmatrix = this.projMatrix;
        else
            vpmatrix = this.viewProjMatrix;
        if(sector.isSkin){
            mat4.multiply(vpmatrix, bones[0].frame.skinMatrix, this.workMatrix);
        }else{
            mat4.multiply(vpmatrix, bones[0].frame.worldMatrix, this.workMatrix);
        }
        gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldViewProjMatrix, false, this.workMatrix);
    }
    if(renderMode === MxeRender.def.RM_DEFAULT){
        if(shaderProgram.uniforms.uMatDiffuse !== null)
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, sector.material.color);
        if(shaderProgram.uniforms.uMatSpecular !== null)
            gl.uniform3fv(shaderProgram.uniforms.uMatSpecular, sector.material.specularColor);
        if(shaderProgram.uniforms.uMatEmissive !== null)
            gl.uniform3fv(shaderProgram.uniforms.uMatEmissive, sector.material.emissionColor);
        if(shaderProgram.uniforms.uPower !== null){
            var pow = 0.0; //default specular off
            if(sector.material.shininess > 0.0){
                pow = 30.0*(1.0 - sector.material.shininess);
                if(pow <= 0.0) pow = 0.00001;
            }
            gl.uniform1f(shaderProgram.uniforms.uPower, pow);
        }
        if(sector.material.enableFog && cameraCast.fogEnable){
            if(shaderProgram.uniforms.uFogColor !== null)
                gl.uniform3fv(shaderProgram.uniforms.uFogColor, cameraCast.fogColor);
            if(shaderProgram.uniforms.uFogStart !== null)
                gl.uniform1f(shaderProgram.uniforms.uFogStart, cameraCast.fogNear);
            if(shaderProgram.uniforms.uFogEnd !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogEnd, cameraCast.fogFar);
            }
            if(shaderProgram.uniforms.uFogFactor !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogFactor, cameraCast.fogFactor);
            }
        }else{
            if(shaderProgram.uniforms.uFogStart !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogStart, 0.0);
            }
            if(shaderProgram.uniforms.uFogEnd !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogEnd, 0.0);
            }
            if(shaderProgram.uniforms.uFogFactor !== null){
                gl.uniform1f(shaderProgram.uniforms.uFogFactor, 0.0);
            }
        }
    } else if(renderMode === MxeRender.def.RM_SELECTION){
        /*
        //32bit case
        var sred =   ((selectionID >> 16))/255.0;
        var sgreen = (((selectionID >> 8) & 0xff))/255.0;
        var sblue =  ((selectionID & 0xff))/255.0;
        gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sred, sgreen, sblue, 1.0]);
        */
        //16bit case
        if(selectionID > 0xffff){
            //error overflow
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [1.0, 1.0, 1.0, 1.0]);
        }else{
            var sa = (( selectionID >> 12)       )/15.0;
            var sb = (((selectionID >> 8 ) & 0xf))/15.0;
            var sg = (((selectionID >> 4 ) & 0xf))/15.0;
            var sr = (( selectionID        & 0xf))/15.0;
            gl.uniform4fv(shaderProgram.uniforms.uMatDiffuse, [sr, sg, sb, sa]);
        }
    }
    if(shaderProgram.uniforms.uNBlend !== null){
        gl.uniform1i(shaderProgram.uniforms.uNBlend, bones.length);
    }
    if(shaderProgram.uniforms.uWorldMatrix !== null){
        if(isBillboard){
            gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, bones[0].frame.billboardMatrix);
        }else if(sector.isSkin){
            gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, bones[0].frame.skinMatrix);
        }else{
            gl.uniformMatrix4fv(shaderProgram.uniforms.uWorldMatrix, false, bones[0].frame.worldMatrix);
        }
    }
    if(shaderProgram.uniforms.uBlendMatrix !== null && bones.length > 1){
        for(i=0; i<bones.length-1; i++){
            frame = bones[i+1].frame;
            if(sector.isSkin){
                this.blendMatricesBuffer.set(frame.skinMatrix, i*16);
            }else{
                this.blendMatricesBuffer.set(frame.worldMatrix, i*16);
            }
        }
        gl.uniformMatrix4fv(shaderProgram.uniforms.uBlendMatrix, false, this.blendMatricesBuffer);
    }
   
    //TODO 4poly
    
    this.setAlphaBlend(renderItem, renderMode);
    if(sector.material.doubleSided){
        gl.disable(gl.CULL_FACE);
    }else{
        gl.enable(gl.CULL_FACE);
    }
    
    //set user shader parameter
    if(shaderProgram.uniforms.uUserFloatArray !== null){
        gl.uniform1fv(shaderProgram.uniforms.uUserFloatArray, sector.model.shaderUserFloatArray);
    }
    if(shaderProgram.uniforms.uUserIntArray !== null){
        gl.uniform1iv(shaderProgram.uniforms.uUserIntArray, sector.model.shaderUserIntArray);
    }
    if(shaderProgram.uniforms.uTime !== null){
        gl.uniform1f(shaderProgram.uniforms.uTime, this.render.player.getTime()/1000.0);
    }
    if(shaderProgram.uniforms.uRandom !== null){
        gl.uniform1i(shaderProgram.uniforms.uRandom, Math.floor(Math.random()*MxeRender.def.MAX_SHADER_RANDOM+1));
    }
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sector.indexBuffer);
    gl.drawElements(gl.TRIANGLES, sector.indexLength, gl.UNSIGNED_SHORT, sector.indexOffset*2);

};

MxePlayerWGL.prototype.createMxeRender = function(player){
    return new MxeRenderWGL(player);
};

var MxeRenderWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeRenderWGL.prototype = Object.create(MxeRender.prototype);
MxeRenderWGL.prototype.constructor = MxeRenderWGL;
MxeRenderWGL.prototype.initialize = function(player) {
    MxeRender.prototype.initialize.apply(this, arguments);
    this.gl = null;
    this.validSelectionBuffer = false;
    this.bgRenderFrame = this.player.createMxeFrame2D(null);
    this.bgRenderFrame.blendFactorSrc = 0x0302; //GL_SRC_ALPHA;
    this.bgRenderFrame.blendFactorDst = 0x0303; //GL_ONE_MINUS_SRC_ALPHA
    this.bgRenderFrame.blendFactorAlphaSrc = 0x0302; //GL_SRC_ALPHA
    this.bgRenderFrame.blendFactorAlphaDst = 0x0304; //GL_DST_ALPHA

    //shader sources
    
    this.FS_SRC = new Array(4);
    
    //selection fragment shader
    this.FS_SRC[0] = '\
        precision mediump float;\
        varying vec2 vTextureCoord;\
        uniform sampler2D uTexture0;\
        uniform vec4 uMatDiffuse;\
        \
        void main(void) {\
            gl_FragColor = uMatDiffuse;\
        }\
    ';

    //basic
    this.FS_SRC[1] = '\
        precision mediump float;\
        uniform sampler2D uTexture0;\
        uniform int uBlendMode0;\
        uniform vec3 uFogColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        vec4 textureColor;\
        \
        void main(void) {\
            if      (uBlendMode0 == 0){\
                gl_FragColor = vDiffuseColor + vSpecularColor;\
            }else{\
                textureColor = texture2D(uTexture0, vec2(vTextureCoord.s, vTextureCoord.t));\
                if(uBlendMode0 == 1){\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }else if(uBlendMode0 == 2){\
                    gl_FragColor = vec4(textureColor.rgb + vDiffuseColor.rgb, textureColor.a * vDiffuseColor.a) + vSpecularColor;\
                }else if(uBlendMode0 == 3){\
                    textureColor = vec4(vec3(1.0 - textureColor.rgb), textureColor.a);\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }\
            }\
            gl_FragColor = vec4(mix(gl_FragColor.rgb, uFogColor, vFogIntensity), gl_FragColor.a);\
        }\
    ';
    
    //transparent discard(very slow)
    this.FS_SRC[2] = '\
        precision mediump float;\
        uniform sampler2D uTexture0;\
        uniform int uBlendMode0;\
        uniform vec3 uFogColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        vec4 textureColor;\
        \
        void main(void) {\
            if      (uBlendMode0 == 0){\
                gl_FragColor = vDiffuseColor + vSpecularColor;\
            }else{\
                textureColor = texture2D(uTexture0, vec2(vTextureCoord.s, vTextureCoord.t));\
                if(uBlendMode0 == 1){\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }else if(uBlendMode0 == 2){\
                    gl_FragColor = vec4(textureColor.rgb + vDiffuseColor.rgb, textureColor.a * vDiffuseColor.a) + vSpecularColor;\
                }else if(uBlendMode0 == 3){\
                    textureColor = vec4(vec3(1.0 - textureColor.rgb), textureColor.a);\
                    gl_FragColor = textureColor * vDiffuseColor + vSpecularColor;\
                }\
            }\
            gl_FragColor = vec4(mix(gl_FragColor.rgb, uFogColor, vFogIntensity), gl_FragColor.a);\
            if(gl_FragColor.a == 0.0) discard;\
        }\
    ';

    //for text
    this.FS_SRC[3] = '\
        precision mediump float;\
        uniform sampler2D uTexture0;\
        uniform int uBlendMode0;\
        uniform vec4 uTextColor;\
        uniform vec4 uTextBgColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        float textAlpha;\
        \
        void main(void) {\
            textAlpha = texture2D(uTexture0, vec2(vTextureCoord.s, vTextureCoord.t)).r;\
            gl_FragColor = mix(uTextBgColor, uTextColor, textAlpha);\
        }\
    ';
    
    this.VS_SRC = new Array(4);
    
    //selection vertex shader
    this.VS_SRC[0] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uViewMatrix;\
        uniform mat4 uProjMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        \
        varying vec2 vTextureCoord;\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
        }\
      ';

    //no lighting
    this.VS_SRC[1] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        attribute vec4 atVColor;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uProjMatrix;\
        uniform mat4 uViewMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec4 uMatDiffuse;\
        uniform vec3 uMatEmissive;\
        uniform float uFogStart;\
        uniform float uFogEnd;\
        uniform float uFogFactor;\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        uniform int uEnableVColor;\
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
            vec4 matDiffuse;\
            if(uEnableVColor == 1)\
                matDiffuse = atVColor;\
            else\
                matDiffuse = uMatDiffuse;\
            vDiffuseColor = vec4(matDiffuse.rgb+uMatEmissive, matDiffuse.a);\
            vSpecularColor = vec4(0.0);\
            vFogIntensity = clamp((length(gl_Position.xyz)-uFogStart)*uFogFactor, 0.0, 1.0);\
        }\
      ';

    //basic vertex shader
    this.VS_SRC[2] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        attribute vec4 atVColor;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uViewMatrix;\
        uniform mat4 uProjMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec4 uMatDiffuse;\
        uniform vec3 uMatEmissive;\
        uniform vec3 uMatSpecular;\
        uniform float uPower;\
        uniform float uFogStart;\
        uniform float uFogEnd;\
        uniform float uFogFactor;\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        uniform int uEnableVColor;\
        uniform int uLightCount;\
        uniform vec3 uLightAmbient;\
        uniform int uLightType[4];\
        uniform vec3 uLightCol[4];\
        uniform vec3 uLightDir[4];\
        uniform vec3 uCameraPos;\
        \
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        \
        vec3 addDiffuseLight(vec3 srcColor, vec3 normal, int lttype, vec3 ltdir, vec3 ltcol) {\
            float norm = max(dot(-normal, ltdir), 0.0);\
            return norm*ltcol+srcColor;\
        }\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            vec3 vertNormal = normalize(mat3(finalMatrix[0].xyz, finalMatrix[1].xyz, finalMatrix[2].xyz)*atNormal);\
            vec3 vertDir = normalize((finalMatrix * vec4(atVertex, 1.0)).xyz - uCameraPos);\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
            vec3 diffColor = uLightAmbient;\
            if(uLightCount > 0){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[0], uLightDir[0], uLightCol[0]);\
            }\
            if(uLightCount > 1){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[1], uLightDir[1], uLightCol[1]);\
            }\
            if(uLightCount > 2){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[2], uLightDir[2], uLightCol[2]);\
            }\
            if(uLightCount > 3){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[3], uLightDir[3], uLightCol[3]);\
            }\
            vec4 matDiffuse;\
            if(uEnableVColor == 1)\
                matDiffuse = atVColor;\
            else\
                matDiffuse = uMatDiffuse;\
            vDiffuseColor = vec4(matDiffuse.rgb*diffColor+uMatEmissive, matDiffuse.a);\
            vSpecularColor = vec4(0.0);\
            vFogIntensity = clamp((length(gl_Position.xyz)-uFogStart)*uFogFactor, 0.0, 1.0);\
        }\
      ';

    //specular vertex shader
    this.VS_SRC[3] = '\
        attribute vec3 atVertex;\
        attribute vec3 atNormal;\
        attribute vec2 atUV0;\
        attribute vec3 atWeight0;\
        attribute vec3 atWeight1;\
        attribute vec4 atVColor;\
        \
        uniform mat4 uWorldMatrix;\
        uniform mat4 uViewMatrix;\
        uniform mat4 uProjMatrix;\
        uniform int uNBlend;\
        uniform mat4 uBlendMatrix[5];\
        uniform vec4 uMatDiffuse;\
        uniform vec3 uMatEmissive;\
        uniform vec3 uMatSpecular;\
        uniform float uPower;\
        uniform float uFogStart;\
        uniform float uFogEnd;\
        uniform float uFogFactor;\
        uniform vec2 uTextureMargin0;\
        uniform vec2 uTextureScale0;\
        uniform int uEnableVColor;\
        uniform int uLightCount;\
        uniform vec3 uLightAmbient;\
        uniform int uLightType[4];\
        uniform vec3 uLightCol[4];\
        uniform vec3 uLightDir[4];\
        uniform vec3 uCameraPos;\
        \
        varying vec2 vTextureCoord;\
        varying vec4 vDiffuseColor;\
        varying vec4 vSpecularColor;\
        varying lowp float vFogIntensity;\
        \
        vec3 addSpecularLight(vec3 srcColor, vec3 normal, vec3 direction, int lttype, vec3 ltdir, vec3 ltcol, float shine) {\
            if(shine == 0.0){\
                return srcColor;\
            }\
            vec3 h = normalize(ltdir + direction);\
            float specular = pow(max(dot(h, -normal), 0.0), shine);\
            return srcColor + ltcol * uMatSpecular * specular;\
        }\
        \
        vec3 addDiffuseLight(vec3 srcColor, vec3 normal, int lttype, vec3 ltdir, vec3 ltcol) {\
            float norm = max(dot(-normal, ltdir), 0.0);\
            return norm*ltcol+srcColor;\
        }\
        \
        void main(void) {\
            mat4 finalMatrix = uWorldMatrix;\
            if(uNBlend > 1){\
                finalMatrix = uWorldMatrix*atWeight0[0] + uBlendMatrix[0]*atWeight0[1] + uBlendMatrix[1]*atWeight0[2];\
            }\
            if(uNBlend > 3){\
                finalMatrix = finalMatrix + uBlendMatrix[2]*atWeight1[0] + uBlendMatrix[3]*atWeight1[1] + uBlendMatrix[4]*atWeight1[2];\
            }\
            vec3 vertNormal = normalize(mat3(finalMatrix[0].xyz, finalMatrix[1].xyz, finalMatrix[2].xyz)*atNormal);\
            vec3 vertDir = normalize((finalMatrix * vec4(atVertex, 1.0)).xyz - uCameraPos);\
            finalMatrix = uProjMatrix * uViewMatrix * finalMatrix;\
            gl_Position = finalMatrix * vec4(atVertex, 1.0);\
            vTextureCoord = atUV0*uTextureScale0 + uTextureMargin0;\
            vec3 diffColor = uLightAmbient;\
            vec3 specColor = vec3(0.0, 0.0, 0.0);\
            if(uLightCount > 0){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[0], uLightDir[0], uLightCol[0]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[0], uLightDir[0], uLightCol[0], uPower);\
            }\
            if(uLightCount > 1){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[1], uLightDir[1], uLightCol[1]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[1], uLightDir[1], uLightCol[1], uPower);\
            }\
            if(uLightCount > 2){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[2], uLightDir[2], uLightCol[2]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[2], uLightDir[2], uLightCol[2], uPower);\
            }\
            if(uLightCount > 3){\
                diffColor = addDiffuseLight(diffColor, vertNormal, uLightType[3], uLightDir[3], uLightCol[3]);\
                specColor = addSpecularLight(specColor, vertNormal, vertDir, uLightType[3], uLightDir[3], uLightCol[3], uPower);\
            }\
            \
            vec4 matDiffuse;\
            if(uEnableVColor == 1)\
                matDiffuse = atVColor;\
            else\
                matDiffuse = uMatDiffuse;\
            vDiffuseColor = vec4(matDiffuse.rgb*diffColor+uMatEmissive, matDiffuse.a);\
            vSpecularColor = vec4(specColor, 0.0);\
            vFogIntensity = clamp((length(gl_Position.xyz)-uFogStart)*uFogFactor, 0.0, 1.0);\
        }\
      ';

    this.shaderPrograms = null;
    this.currentShaderProgram = null;
    this.fsArray = null;
    this.vsArray = null;
    this.SHADER_FAIL = { SHADER_FAIL_OBJECT: 1 };
    this.ALT_SHADER_TABLE = [
        //selection,    normal,         discard,        text      fs/vs
        [null,          null,           null,           null    ],  //selection
        [null,          null,           null,           null    ],  //no lighting
        [null,          [1,1],          [1,2],          null    ],  //diffuse
        [null,          [2,1],          [2,2],          null    ],  //specular
    ];
};

MxeRenderWGL.prototype.compileShader =  function(gl, stype, srcStr) {
    var gl = this.gl;
    var shader = gl.createShader(stype);

    gl.shaderSource(shader, srcStr);
    gl.compileShader(shader);

    var logstr = gl.getShaderInfoLog(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) || logstr.length > 0) {
        MxeUtil.log(logstr);
        return this.SHADER_FAIL;
    }

    return shader;
};

MxeRenderWGL.prototype.setupShaderVariableLocations = function(shaderProgram) {
    var gl = this.gl;

    var i;
    var name;
    var num;

    shaderProgram.attributes = {};
    shaderProgram.maxAttribute = -1;
    var attrNames = ["atVertex", "atNormal", "atWeight0", "atWeight1", "atVColor",];
    var index;
    for(i in attrNames){
        name = attrNames[i];
        index = shaderProgram.attributes[name] = gl.getAttribLocation(shaderProgram, name);
        if(index > shaderProgram.maxAttribute) shaderProgram.maxAttribute = index;
    }
    shaderProgram.attributes.atUV = new Array(MxeRender.def.MAX_TEXTURE_UV);
    for(num=0; num<MxeRender.def.MAX_TEXTURE_UV; num++){
        index = shaderProgram.attributes.atUV[num] = gl.getAttribLocation(shaderProgram, "atUV"+num);
        if(index > shaderProgram.maxAttribute) shaderProgram.maxAttribute = index;
    }
    ++shaderProgram.maxAttribute;
    
    shaderProgram.uniforms = {};
    var uniNames = [
        "uWorldMatrix",
        "uViewMatrix",
        "uProjMatrix",
        "uViewProjMatrix",
        "uWorldViewProjMatrix",
        "uNBlend",
        "uBlendMatrix",
        "uMatDiffuse",
        "uMatEmissive",
        "uMatSpecular",
        "uPower",
        "uFogColor",
        "uFogStart",
        "uFogEnd",
        "uFogFactor",
        "uTextColor",
        "uTextBgColor",
        "uLightCount",
        "uLightAmbient",
        "uLightType",
        "uLightCol",
        "uLightAtt0",
        "uLightAtt1",
        "uLightAtt2",
        "uLightRange",
        "uSpotExponent",
        "uSpotCutoff",
        //"uLightMatrix",
        "uLightDir",
        "uLightPos",
        "uCameraPos",
        "uUserFloatArray",
        "uUserIntArray",
        "uTime",
        "uRandom",
        "uEnableVColor",
    ];
    for(i in uniNames){
        name = uniNames[i];
        shaderProgram.uniforms[name] = gl.getUniformLocation(shaderProgram, name);
    }
    shaderProgram.uniforms.uTexture = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uTexture[num] = gl.getUniformLocation(shaderProgram, "uTexture" + num);
    }
    shaderProgram.uniforms.uBlendMode = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uBlendMode[num] = gl.getUniformLocation(shaderProgram, "uBlendMode" + num);
    }
    shaderProgram.uniforms.uBlendValue = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uBlendValue[num] = gl.getUniformLocation(shaderProgram, "uBlendValue" + num);
    }
    shaderProgram.uniforms.uTextureMargin = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uTextureMargin[num] = gl.getUniformLocation(shaderProgram, "uTextureMargin" + num);
    }
    shaderProgram.uniforms.uTextureScale = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uTextureScale[num] = gl.getUniformLocation(shaderProgram, "uTextureScale" + num);
    }
    shaderProgram.uniforms.uWrapMode = new Array(MxeRender.def.MAX_TEXTURE);
    for(num=0; num<MxeRender.def.MAX_TEXTURE; num++){
        shaderProgram.uniforms.uWrapMode[num] = gl.getUniformLocation(shaderProgram, "uWrapMode" + num);
    }
};

MxeRenderWGL.prototype.createShaderProgram = function(fsIndex, vsIndex) {
    var gl = this.gl;
    
    var fs = this.fsArray[fsIndex];
    if(! fs)
        fs = this.fsArray[fsIndex] = this.compileShader(gl, gl.FRAGMENT_SHADER, this.FS_SRC[fsIndex]);
    if(fs === this.SHADER_FAIL) return this.SHADER_FAIL;
    
    var vs = this.vsArray[vsIndex];
    if(! vs)
        vs = this.vsArray[vsIndex] = this.compileShader(gl, gl.VERTEX_SHADER, this.VS_SRC[vsIndex]);
    if(vs === this.SHADER_FAIL) return this.SHADER_FAIL;
    
    
    //link shader
    var shaderProgram = gl.createProgram();
    this.shaderPrograms[vsIndex*this.FS_SRC.length+fsIndex] = shaderProgram;
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    if (! gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        MxeUtil.log("Could not initialise shader("+fsIndex+","+vsIndex+").\n");
        MxeUtil.log(gl.getProgramInfoLog(shaderProgram));
        return this.SHADER_FAIL;
    }
    
    this.setupShaderVariableLocations(shaderProgram);
    return shaderProgram;
};

MxeRenderWGL.prototype.initDefaultShaders = function() {
    this.fsArray = new Array(this.FS_SRC.length);
    this.vsArray = new Array(this.VS_SRC.length);
    this.shaderPrograms = new Array(this.FS_SRC.length*this.VS_SRC.length);

    if(! this.options.shaderBulkBuild) return;
    
    var gl = this.gl;
    var i, j;

    //create all shaders
    var FV_LINK_TABLE = [
        //selection,    normal,         discard,        text      fs/vs
        [true ,         false,          false,          false   ],  //selection
        [false,         true ,          true ,          true    ],  //no lighting
        [false,         true ,          true ,          false   ],  //diffuse
        [false,         true ,          true,           false   ],  //specular
    ];

    for(i=0; i<this.VS_SRC.length; i++){
        for(j=0; j<this.FS_SRC.length; j++){
            if(! FV_LINK_TABLE[i][j]) continue;
            this.shaderPrograms[i*this.FS_SRC.length+j] = this.createShaderProgram(j, i);
        }
    }    
};

MxeRenderWGL.prototype.setShaderProgram = function(shader) {
    var gl = this.gl;
    var i;
    if(this.currentShaderProgram !== null){
        for(i=0; i<this.currentShaderProgram.maxAttribute; i++){
            gl.disableVertexAttribArray(i);
        }
    }
    if(this.currentShaderProgram === shader) return;
    gl.useProgram(shader);
    this.currentShaderProgram = shader;
};

MxeRenderWGL.prototype.requestShaderProgram = function(requestOptions) {
    var fsType;
    var vsType;
    if(requestOptions.renderMode === MxeRender.def.RM_SELECTION){
        //selection shader
        fsType = vsType = 0;
    }else if(requestOptions.isText){
        fsType = 3;
        vsType = 1;
    }else{
        fsType = 1;
        if(requestOptions.alphaType & 1){ //HAS_TRANSPARENT
            fsType = 2; //transparent discard
        }
        
        vsType = 1;
        if(requestOptions.useLighting){
            vsType = 2;
            if(requestOptions.useSpecular){
                vsType = 3;
            }
        }
    }
    while(true) {
        var shader = this.shaderPrograms[vsType*this.FS_SRC.length+fsType];
        if(! shader && ! this.options.shaderBulkBuild)
            shader = this.createShaderProgram(fsType, vsType);
        if(! shader || shader === this.SHADER_FAIL){
            var altType = this.ALT_SHADER_TABLE[vsType][fsType];
            if(altType !== null){
                vsType = altType[0];
                fsType = altType[1];
                continue;
            }else{
                throw new MxeException("invalid shader["+vsType+","+fsType+"]");
            }
        }
        break;
    }
    return shader;
};

MxeRenderWGL.prototype.createFrameBuffer = function() {
    var gl = this.gl;
    var canvas = this.player.canvas;

    this.frameBuffer = gl.createFramebuffer();
    if(this.frameBuffer === null) return; //no context case
    this.frameBuffer.width = canvas.width;
    this.frameBuffer.height = canvas.height;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

    this.renderDepthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderDepthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, canvas.width, canvas.height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderDepthBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    this.renderRGBBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderRGBBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, canvas.width, canvas.height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.renderRGBBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
       MxeUtil.log("Could not initialize frame buffer.");
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};

MxeRenderWGL.prototype.deleteFrameBuffer = function() {
    var gl = this.gl;
   if(this.frameBuffer !== null){
       gl.deleteFramebuffer(this.frameBuffer);
       this.frameBuffer = null;
   }
   if(this.renderDepthBuffer !== null){
       gl.deleteRenderbuffer(this.renderDepthBuffer);
       this.renderDepthBuffer = null;
   }
   if(this.renderRGBBuffer !== null){
       gl.deleteRenderbuffer(this.renderRGBBuffer);
       this.renderRGBBuffer = null;
   }
};

MxeRenderWGL.prototype.updateViewport = function() {
    var canvas = this.player.canvas;
    if(this.viewportWidth === canvas.width && this.viewportHeight === canvas.height)
        return;
        
    this.viewportWidth = canvas.width;
    this.viewportHeight = canvas.height;
    
    this.deleteFrameBuffer();
    this.createFrameBuffer();
};

MxeRenderWGL.prototype.initGL = function() {
    //for GPU picking--
    this.frameBuffer = null;
    this.renderDepthBuffer = null;
    this.renderRGBBuffer = null;
    //--for GPU picking
    var gl = null;
    var canvas = this.player.canvas;
    try {
        gl = this.gl = canvas.getContext("experimental-webgl", { antialias: this.options.enableAntialias });
    } catch (e) {
    }
    if (! gl) gl = this.gl = null;
    if(gl === null){
        MxeUtil.log("Could not initialise WebGL.");
        return false;
    }

    this.createFrameBuffer();

    //set default
    gl.cullFace(gl.FRONT);
    
    this.initDefaultShaders();
    
    this.render3D.initGL(gl);
    this.render2D.initGL(gl);
    return true;
};

MxeRenderWGL.prototype.updateSelectionBuffer = function() {
    if(this.validSelectionBuffer) return;
    var gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    this.drawScene(MxeRender.def.RM_SELECTION);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.validSelectionBuffer = true;
};

MxeRenderWGL.prototype.setBackground = function(cast) {
    var bgFrame = this.bgRenderFrame;
    if(cast === null){
        bgFrame.setCast(null);
        return;
    }
    bgFrame.setCast(cast);
    //if(cast.castType === MxeCast.CT_BITMAP || cast.castType === MxeCast.CT_TEXTURE)
    bgFrame.cast.prepare();
};

MxeRenderWGL.prototype.drawBackground = function(renderMode, gl){
    gl.depthMask(true);
    gl.disable(gl.SCISSOR_TEST);
    if(renderMode === MxeRender.def.RM_DEFAULT){
        var bgColor;
        var bgAlpha;
        var cameraTrack = this.render3D.currentCameraTrack;
        if(cameraTrack !== null && cameraTrack.frame.getCast().fogEnable){
            bgColor = cameraTrack.frame.getCast().fogColor;
            bgAlpha = this.player.contents.backgroundColor[3];
        }else{
            bgColor = this.player.contents.backgroundColor;
            bgAlpha = this.player.contents.backgroundColor[3];
        }
        gl.clearColor(bgColor[0], bgColor[1], bgColor[2], bgAlpha);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var bgFrame = this.bgRenderFrame;
        if(bgFrame.cast !== null){
            var castScalable = bgFrame.cast.scalable;
            bgFrame.cast.scalable = true; //force scalable
            bgFrame.alpha = 1.0;
            bgFrame.visible = true;
            bgFrame.siz[0] = this.viewportWidth/bgFrame.cast.getWidth();
            bgFrame.siz[1] = this.viewportHeight/bgFrame.cast.getHeight();
            bgFrame.siz[2] = 1.0;
            bgFrame.pos[0] = 0.0;
            bgFrame.pos[1] = 0.0;
            bgFrame.pos[2] = 0.0;
            bgFrame.magFilter = gl.LINEAR;
            bgFrame.minFilter = gl.LINEAR;
            bgFrame.prepareRender(this);
            this.render2D.drawFrame(bgFrame, renderMode, 0);
            bgFrame.cast.scalable = castScalable; //restore
        }
    }else if(renderMode === MxeRender.def.RM_SELECTION){
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
};

MxeRenderWGL.prototype.drawScene = function(renderMode) {
    var gl = this.gl;
    var doSkip = false;
    
    //set viewport    
    gl.viewport(0, 0, this.viewportWidth, this.viewportHeight);
        
    doSkip = this.renderPathEventHandler(this.onDrawBGListeners, renderMode);
    if(! doSkip){
        this.drawBackground(renderMode, gl);
    }

    doSkip = false;

    if(! doSkip){
        var selectionOffset = 0;
        selectionOffset+= this.render2D.drawBackRenderList(renderMode, selectionOffset);
        if(this.render3D.currentCameraTrack === null){
            //no camera
        }else{
            selectionOffset+= this.render3D.drawRenderList(renderMode, selectionOffset);
        }
        selectionOffset+= this.render2D.drawFrontRenderList(renderMode, selectionOffset);
    }
    
    doSkip = this.renderPathEventHandler(this.onExitDrawListeners, renderMode);
    
    gl.flush();
    
};

MxeRenderWGL.prototype.getSelectionID = function(mouseX, mouseY) {
    var gl = this.gl;
    var stageH = this.viewportHeight;
    this.updateSelectionBuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    var pix = new Uint8Array(4);
    gl.readPixels(mouseX, stageH-mouseY-1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pix);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //MxeUtil.log(pix[3]+":"+pix[2]+":"+pix[1]+":"+pix[0]);
    /*
    //32bit case
    var selectionID = (pix[0]<<16) + (pix[1]<<8) + pix[2];
    if(selectionID === 0xffffff){
    */
    //16bit case
    pix[0] = pix[0]>>4;
    pix[1] = pix[1]>>4;
    pix[2] = pix[2]>>4;
    pix[3] = pix[3]>>4;
    return (pix[3]<<12) + (pix[2]<<8) + (pix[1]<<4) + pix[0];
};

MxeRenderWGL.prototype.getRenderItemBySelectionID = function(selectionID) {
    if(selectionID === 0xffff){
        //no object
        return null;
    }
    if(selectionID < this.render2D.backRenderCount)
        return this.render2D.backRenderList[selectionID];
    selectionID-= this.render2D.backRenderCount;
    if(selectionID < this.render3D.renderCount)
        return this.render3D.renderList[selectionID];
    selectionID-= this.render3D.renderCount;
    if(selectionID < this.render3D.alphaRenderCount)
        return this.render3D.alphaRenderList[selectionID];
    selectionID-= this.render3D.alphaRenderCount;
    if(selectionID < this.render2D.frontRenderCount)
        return this.render2D.frontRenderList[selectionID];
    //error
    MxeUtil.log("Illegal selection ID. ID=" + selectionID);
    return null;
};

MxeRenderWGL.prototype.pickUp = function(x, y) {
    var renderItem = this.getRenderItemBySelectionID(this.getSelectionID(x, y));
    if(renderItem === null){
        //no object or error
        return null;
    }
    if(renderItem[0] === 0) return renderItem[2][0];
    if(1 <= renderItem[0] && renderItem[0] <=3) return renderItem[1]; //CT_TEXTURE(billboard), CT_BITMAP(bitmap), CT_TEXT(text)
    if(renderItem[0] === 29) return renderItem[1]; //CT_PROCEDURAL
    //not support
    return null;
};

MxePlayerWGL.prototype.createMxeShaderRequestOptions = function(){
    return new MxeShaderRequestOptions();
};

var MxeShaderRequestOptions = function() {
    this.renderMode = MxeRender.def.RM_DEFAULT;
    this.alphaType = 0;
    this.useLighting = false;
    this.useSpecular = false;
    this.isText = false;
};

var createMxeContentsWGL = function() {
    return new MxeContentsWGL();
};

var MxeContentsWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeContentsWGL.prototype = Object.create(MxeContents.prototype);
MxeContentsWGL.prototype.constructor = MxeContentsWGL;

MxeContentsWGL.prototype.initialize = function() {
    MxeContents.prototype.initialize.apply(this, arguments);
};

MxePlayerWGL.prototype.createMxeModel = MxeContentsWGL.prototype.createMxeModel = function(contents, index, label){
    return new MxeModelWGL(contents, index, label);
};

var MxeModelWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeModelWGL.prototype = Object.create(MxeModel.prototype);
MxeModelWGL.prototype.constructor = MxeModelWGL;

MxeModelWGL.prototype.initGL = function(gl) {
    if(this.sectors === null) return;
    for(var i=0; i<this.sectors.length; i++){
        this.sectors[i].initGL(gl);
    }
};

MxePlayerWGL.prototype.createMxeSector = MxeContentsWGL.prototype.createMxeSector = function(model, index, label){
    return new MxeSectorWGL(model, index, label);
};

var MxeSectorWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeSectorWGL.prototype = Object.create(MxeSector.prototype);
MxeSectorWGL.prototype.constructor = MxeSectorWGL;
MxeSectorWGL.prototype.initialize = function(model, index, label) {
    MxeSector.prototype.initialize.apply(this, arguments);
    this.positionBuffer = null;
    this.normalBuffer = null;
    this.colorBuffer = null;
    this.uvBuffer = null;
    this.indexBuffer = null;
    this.indexLength = 0;
    this.indexOffset = 0;
    this.boneWeightBuffer = null;
};

MxeSectorWGL.prototype.initGL = function(gl) {
    if(this.vertexSrc === null) return;
    
    var vertLength = this.vertexSrc.position.length / 3;
    if(vertLength === 0) return;
    
    this.positionBuffer = gl.createBuffer();
    if(this.positionBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.position, gl.STATIC_DRAW);
        this.positionBuffer.itemSize = 3;
        this.positionBuffer.numItems = vertLength;
    }
    
    this.normalBuffer = gl.createBuffer();
    if(this.normalBuffer !== null){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.normal, gl.STATIC_DRAW);
        this.normalBuffer.itemSize = 3;
        this.normalBuffer.numItems = vertLength;
    }
    
    if(this.vertexSrc.texture != null){ //undefined ok
        this.uvBuffer = new Array(this.vertexSrc.texture.length);
        for(var i=0; i<this.vertexSrc.texture.length; i++){
            if(this.vertexSrc.texture[i] == null){
                this.uvBuffer[i] = null;
                continue;
            }
            this.uvBuffer[i] = gl.createBuffer();
            if(this.uvBuffer[i] !== null){
                gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer[i]);
                gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.texture[i], gl.STATIC_DRAW);
                this.uvBuffer[i].itemSize = 2;
                this.uvBuffer[i].numItems = vertLength;
            }
        }
    }
    
    if(this.vertexSrc.weight != null){ //undefined ok
        this.boneWeightBuffer = gl.createBuffer();
        if(this.boneWeightBuffer !== null){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.boneWeightBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.weight, gl.STATIC_DRAW);
            this.boneWeightBuffer.itemSize = this.vertexSrc.weight.length/vertLength;
            this.boneWeightBuffer.numItems = vertLength;
        }
    }
    
    if(this.vertexSrc.color != null){
        this.colorBuffer = gl.createBuffer();
        if(this.colorBuffer !== null){
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertexSrc.color, gl.STATIC_DRAW);
            this.colorBuffer.itemSize = 4;
            this.colorBuffer.numItems = vertLength;
        }
    }

    this.indexBuffer = gl.createBuffer();
    if(this.indexBuffer !== null){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.vertexSrc.index, gl.STATIC_DRAW);
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = this.vertexSrc.index.length;
    }
    
};

MxePlayerWGL.prototype.createMxeBitmapBase = MxeContentsWGL.prototype.createMxeBitmapBase = function(contents, index, label) {
    return new MxeBitmapBaseWGL(contents, index, label);
};

var MxeBitmapBaseWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeBitmapBaseWGL.prototype = Object.create(MxeBitmapBase.prototype);
MxeBitmapBaseWGL.prototype.constructor = MxeBitmapBaseWGL;

MxeBitmapBaseWGL.prototype.initialize = function(contents, index, label) {
    MxeBitmapBase.prototype.initialize.apply(this, arguments);
    this.glTexture = null;
};

MxeBitmapBaseWGL.prototype.getCurrentGL = function() {
    return this.contents.player.render.gl
};

MxeBitmapBaseWGL.prototype.setImageEventListener = function(image) {
    var cast = this;
    image.addEventListener(
        "load", 
        function() {
            if(image !== cast.loadingImage) return;
            cast.deleteImage(cast.getCurrentGL());
            cast.createTexture(cast.getCurrentGL(), cast.loadingImage);
            cast.loadingImage = null;
        },
        false);
    image.addEventListener(
        "error",
        function() {
            cast.prepareStatus = -1;
            cast.loadingImage = null;
        },
        false);
};

MxeBitmapBaseWGL.prototype.deleteImage = function(gl) {
    if(gl == null) gl = this.getCurrentGL();
    this.prepareStatus = 0;
    if(this.glTexture)
        gl.deleteTexture(this.glTexture);
    //
    this.image = null;
    this.glTexture = null;
};

MxeBitmapBaseWGL.prototype.setCompleteImage = function(image){
    this.deleteImage(this.getCurrentGL());
    this.loadingImage = null;
    this.createTexture(this.getCurrentGL(), image);
};

MxeBitmapBaseWGL.prototype.setGLTexture = function(glTexture) {
    this.deleteImage(this.getCurrentGL());
    this.glTexute = glTexture;
};

MxeBitmapBaseWGL.prototype.getGLTexture = function() {
    return this.glTexture;
};

MxeBitmapBaseWGL.prototype.createTexture = function(gl, image) {
    if(! gl) gl = this.getCurrentGL();
    if(! gl){
        this.glTexture = null;
        return;
    }
    this.glTexture = gl.createTexture();
    this.image = image;
    this.prepareStatus = 2;
    this.textureWidth = 1;
    this.textureHeight = 1;
    while(this.textureWidth < image.width) this.textureWidth*= 2;
    while(this.textureHeight < image.height) this.textureHeight*= 2;
    
    //TODO gl error check
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    if(this.textureWidth === image.width && this.textureHeight === image.height){
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    }else{
        var textureArray = new Uint8Array(this.textureWidth*this.textureHeight*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureWidth, this.textureHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

MxeBitmapBaseWGL.prototype.initGL = function(gl) {
    if(this.image !== null){
        //do not deleteImage on this case(start, restore)
        this.createTexture(gl, this.image);
    }
};

//CBitmap
MxePlayerWGL.prototype.createMxeBitmap = MxeContentsWGL.prototype.createMxeBitmap = function(contents, index, label) {
    return new MxeBitmapWGL(contents, index, label);
};

var MxeBitmapWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeBitmapWGL.prototype = Object.create(MxeBitmapBaseWGL.prototype);
MxeBitmapWGL.prototype.constructor = MxeBitmapWGL;

MxeBitmapWGL.prototype.initialize = function(contents, index, label) {
    MxeBitmapBaseWGL.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_BITMAP;
    this.magFilter = 0x2601; //GL_LINEAR
    this.minFilter = 0x2601; //GL_LINEAR
};


//CTexture
MxePlayerWGL.prototype.createMxeTexture = MxeContentsWGL.prototype.createMxeTexture = function(contents, index, label) {
    return new MxeTextureWGL(contents, index, label);
};

var MxeTextureWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeTextureWGL.prototype = Object.create(MxeBitmapBaseWGL.prototype);
MxeTextureWGL.prototype.constructor = MxeTextureWGL;

MxeTextureWGL.prototype.initialize = function(contents, index, label) {
    MxeBitmapBaseWGL.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_TEXTURE;
    this.magFilter = 0x2601; //GL_LINEAR
    this.minFilter = 0x2601; //GL_LINEAR
};

MxePlayerWGL.prototype.createMxeShader = MxeContentsWGL.prototype.createMxeShader = function(contents, index, label) {
    return new MxeShaderWGL(contents, index, label);
};

var MxeShaderWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeShaderWGL.prototype = Object.create(MxeShader.prototype);
MxeShaderWGL.prototype.constructor = MxeShaderWGL;

MxeShaderWGL.prototype.initialize = function(contents, index, label) {
    MxeShader.prototype.initialize.apply(this, arguments);
    
    this.fsSrc = null;
    this.vsSrc = null;
    this.program = null;
    
    this.error = 0;
    this.render = this.contents.player.render;
};

MxeShaderWGL.prototype.initGL = function(gl) {
    this.program = null;
    this.error = 0;
};

MxeShaderWGL.prototype.createShader = function(render) {
    var gl = render.gl;
    var fs = render.compileShader(gl, gl.FRAGMENT_SHADER, this.fsSrc);
    if(fs === render.SHADER_FAIL){
        this.error = 1;
        var msg = "Could not initialise shader cast("+this.index+"). error="+this.error+"\n";
        MxeUtil.log(msg);
        throw new MxeException("defaultshader", msg);
        return;
    }
    
    var vs = render.compileShader(gl, gl.VERTEX_SHADER, this.vsSrc);
    if(vs === render.SHADER_FAIL){
        this.error = 2;
        var msg = "Could not initialise shader cast("+this.index+"). error="+this.error+"\n";
        MxeUtil.log(msg);
        throw new MxeException("defaultshader", msg);
        return;
    }
    
    //link shader
    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (! gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        this.error = 3;
        var msg = "Could not initialise shader cast("+this.index+"). error="+this.error+"\n"+gl.getProgramInfoLog(this.program);
        MxeUtil.log(msg);
        throw new MxeException("defaultshader", msg);
        return;
    }
    
    render.setupShaderVariableLocations(this.program);
};

MxeShaderWGL.prototype.prepareRender = function(render, frame) {
    if(this.error !== 0)
        throw new MxeException("shadercast", "can't prepare shader");
    if(! this.program && this.error === 0){
        this.createShader(render);
    }
    
};

MxeShaderWGL.prototype.commitUniformValues = function(gl){
    for(var name in this.userUniformValues){
        var location = this.program[name];
        var value = this.userUniformValues[name];
        if(location === undefined){
            this.program[name] = location = gl.getUniformLocation(this.program, name);
        }
        if(location === null){
            throw new MxeException("shadercast", "can't set uniform \""+name+"\"");
        }
        gl.uniform1f(location, value);
    }
};

//TEXT
MxePlayerWGL.prototype.createMxeText = MxeContentsWGL.prototype.createMxeText = function(contents, index, label) {
    return new MxeTextWGL(contents, index, label);
};

var MxeTextWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeTextWGL.prototype = Object.create(MxeBitmapBaseWGL.prototype);
MxeTextWGL.prototype.constructor = MxeTextWGL;

MxeTextWGL.prototype.initialize = function(contents, index, label) {
    MxeBitmapBase.prototype.initialize.apply(this, arguments);
    this.castType = MxeCast.def.CT_TEXT;
    //TEXTDATA--
    //HFONT    hFont;                // font handle
    this.width = 0;            // font width
    this.height = 0;           // font height (total line)
    //this.itemHeight = 0;       // one line text size
    this.fontHeightRatio = 1.25; 
    this.color = null;            // text color
    this.backgroundColor = null;  // back color
    this.bgTransparent = true;        // false:opaqu true:transparent
    //this.zpos;             // text cast display priority(int)
    this.lineDistance = 0;        // 
    //int        PropChanged;        // property changed by script
    this.lines = null;
    //this.type = 0; //bit0 0:Normal/1:alfa bit2:Antialias, bit7:FixSize, bit8-15:font style, bit16,17 Cast Alignment, bit31:UNICODE
    this.alignment = null;
    //this.antialias = false;
    // use only for embeded engine
    //void*    GeneralPointer;        // use for GLLib, CELib
    //int        ScriptTag;            // script use only
    //TCHAR*    TextPropertyBuf;
    this.lineWidthMax = 0;
    // font data
    this.fontSize = 0.0; //pt
    this.fontStyle = null; //[italic|bold]
    this.fontFamily = null;
    //--TEXTDATA
    this.alphaType = 2; //HAS_TRANSLUCENT(for antialias)
    this.alphaBlendable = true;
};

MxeTextWGL.prototype.initGL = function(gl) {
    this.glTexture = null;
    this.valid = false;
};

MxeTextWGL.prototype.deleteImage = function(gl) {
};

MxeTextWGL.prototype.cancelLoading = function() {
};

MxeTextWGL.prototype.prepare = function() {
};

MxeTextWGL.prototype.loadImage = function(src) {
};

MxeTextWGL.prototype.setImage = function(image) {
};

MxeTextWGL.prototype.setGLTexture = function(glTexture) {
};

MxeTextWGL.prototype.measureFontHeight = function(font, fontPxSize){
    return fontPxSize * this.fontHeightRatio;
};

MxeTextWGL.prototype.createTexture = function(gl) {
    var oldTexW = 0;
    var oldTexH = 0;
    if(this.glTexture !== null){
        oldTexW = this.textureWidth;
        oldTexH = this.textureHeight;
    }
    this.textureWidth = 1;
    this.textureHeight = 1;
    while(this.textureWidth < this.image.width) this.textureWidth*= 2;
    while(this.textureHeight < this.image.height) this.textureHeight*= 2;
    if(this.textureWidth !== oldTexW || this.textureHeight !== oldTexH){
        if(this.glTexture !== null){
            gl.deleteTexture(this.glTexture);
            this.glTexture = null;
        }
        this.glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        var textureArray = new Uint8Array(this.textureWidth*this.textureHeight*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureWidth, this.textureHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray);
    }else{
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    }
    
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.bindTexture(gl.TEXTURE_2D, null);

};

MxeTextWGL.prototype.getPrepared = function() {
    return this.glTexture !== null;
};

MxeTextWGL.prototype.getWidth = function() {
    if(! this.valid && ! this.update()) return 0;
    if(this.image !== null) return this.image.width;
    return 0;
};

MxeTextWGL.prototype.getHeight = function() {
    if(! this.valid && ! this.update()) return 0;
    if(this.image !== null) return this.image.height;
    return 0;
};

MxeTextWGL.prototype.update = function(ctx, gl) {
    if(this.valid) return true;
    if(this.lines === null || this.lines.length === 0){
        this.valid = true;
        //this.width = 0;
        this.height = 0;
        return true;
    }
    
    if(! ctx) ctx = this.contents.player.render.render2D.getOffscreenContext();
    if(! gl) gl = this.contents.player.render.gl;
    if(! ctx || ! gl) return false;

    var fontPxSize = this.fontSize*96.0/72.0;
    var font = "";
    if(this.fontStyle != null) font = font + this.fontStyle;
    font = font + " " + fontPxSize + "px";
    if(this.fontFamily != null) font = font + " " + this.fontFamily;
    ctx.font = font;
    
    var alignType = 0;
    switch(this.alignment){
    case "center":
        alignType = 1;
        ctx.textAlign = "center";
        break;
    case "right":
        alignType = 2;
        ctx.textAlign = "right";
        break;
    case "left":
        alignType = 3;
        ctx.textAlign = "left";
        break;
    default:
        alignType = 0;
        ctx.textAlign = "left";
        break;
    }

    ctx.textBaseline = "top";
    
    var i;
    var lineWidth;
    var metrics;
    var lineWidthTable;
    var itemHeight = this.measureFontHeight(font, fontPxSize);
    this.height = (itemHeight + this.lineDistance) * this.lines.length;
    if(alignType === 0){
        lineWidthTable = new Float32Array(this.lines.length);
        this.lineWidthMax = 0;
        for(i=0; i<this.lines.length; i++){
            metrics = ctx.measureText(this.lines[i]);
            lineWidth = metrics.width + 2;
            if(lineWidth > this.lineWidthMax)
                this.lineWidthMax = lineWidth;
        }
        lineWidthTable[i] = this.width = this.lineWidthMax;
    }else{
        this.lineWidthMax = this.width;
    }
    
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);

    if(ctx.canvas.width < this.width || ctx.canvas.height < this.height)
        throw new Mxe2DContextTooSmallException("", this.width, this.height);
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.fillStyle = "#ffffff";
    var lineDistanceSum = 0;
    var lineX = 0;
    for(i=0; i<this.lines.length; i++){
        switch(alignType){
        case 1: lineX = Math.floor(this.width / 2); break;
        case 2: lineX = this.width; break;
        }
        ctx.fillText(this.lines[i], lineX, Math.floor(itemHeight*i+lineDistanceSum));
        lineDistanceSum+= this.lineDistance;
    }
    
    this.image = ctx.getImageData(0, 0, this.width, this.height);
    this.createTexture(gl);
    
    this.valid = true;
    return true;
};

MxeTextWGL.prototype.prepareRender = function(render, frame) {
    try{
        this.update(render.render2D.getOffscreenContext(), render.gl);
    }catch(e){
        if(e.name === Mxe2DContextTooSmallException.prototype.name){
            render.render2D.resizeOffscreenCanvas(e.requestWidth, e.requestHeight);
            this.update(render.render2D.getOffscreenContext(), render.gl);
        }else{
            throw e;
        }
    }
};

MxePlayerWGL.prototype.createMxeTrack3D = MxeContentsWGL.prototype.createMxeTrack3D = function(score, index, label) {
    return new MxeTrack3DWGL(score, index, label);
};

var MxeTrack3DWGL = function() {
    this.initialize.apply(this, arguments);
};
MxeTrack3DWGL.prototype = Object.create(MxeTrack3D.prototype);
MxeTrack3DWGL.prototype.constructor = MxeTrack3DWGL;

MxeTrack3DWGL.prototype.initialize = function(score, index, label) {
    MxeTrack3D.prototype.initialize.apply(this, arguments);
};
