var MxeDefaultController = function(contents) {
    this.contents = contents;
    this.registerEventListeners();
};

MxeDefaultController.prototype.registerEventListeners = function() {
    var contents = this.contents;
    var score;
    var track;
    var eventproc = MxeDefaultController.eventproc;
    
    
    score = contents.scores[0];
    
    score = contents.scores[1];
    
    track = score.tracks[0];
    score.addEventListener("onexitframe", eventproc.onExitFrame13, this, [60,120,180,240,300,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame32, this, [360,420,480,540,600,]);
    
    track = score.tracks[2];
    track.addEventListener("onclick", eventproc.onCastClick0, this, [0,]);
    
    track = score.tracks[3];
    track.addEventListener("onclick", eventproc.onCastClick1, this, [0,]);
    
    track = score.tracks[4];
    track.addEventListener("onclick", eventproc.onCastClick2, this, [0,]);
    
    track = score.tracks[5];
    track.addEventListener("onclick", eventproc.onCastClick3, this, [0,]);
    
    track = score.tracks[6];
    track.addEventListener("onclick", eventproc.onCastClick4, this, [0,]);
    
    score = contents.scores[2];
    
    track = score.tracks[2];
    track.addEventListener("onclick", eventproc.onCastClick14, this, [80,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame8, this, [0,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame7, this, [1,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame9, this, [[20,39],[90,95],]);
    score.addEventListener("onexitframe", eventproc.onExitFrame11, this, [40,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame10, this, [[50,69],[110,115],]);
    score.addEventListener("onexitframe", eventproc.onExitFrame12, this, [70,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame14, this, [80,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame15, this, [96,116,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame16, this, [130,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame26, this, [140,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame17, this, [141,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame28, this, [150,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame30, this, [162,]);
    
    score = contents.scores[3];
    
    track = score.tracks[5];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[6];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[8];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[9];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[11];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[12];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[14];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[15];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[17];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[18];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[20];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[21];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[23];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[24];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[26];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[27];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[29];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[30];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[32];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[33];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[36];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[37];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[39];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[40];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[42];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[43];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[45];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[46];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[48];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[49];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[51];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[52];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[54];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[55];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[57];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[58];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[60];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[61];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[63];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[64];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[68];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[69];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[71];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[72];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[74];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[75];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[77];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[78];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[80];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[81];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[83];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[84];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[86];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[87];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[89];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[90];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[92];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[93];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[95];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[96];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[99];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[100];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[102];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[103];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[105];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[106];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[108];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[109];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[111];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[112];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[114];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[115];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[117];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[118];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[120];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[121];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[123];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[124];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[126];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[127];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[131];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[132];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[134];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[135];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[137];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[138];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[140];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[141];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[143];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[144];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[146];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[147];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[149];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[150];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[152];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[153];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[155];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[156];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[158];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[159];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[162];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[163];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[165];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[166];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[168];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[169];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[171];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[172];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[174];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[175];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[177];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[178];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[180];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[181];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[183];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[184];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[186];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[187];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[189];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[190];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[194];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[195];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[197];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[198];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[200];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[201];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[203];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[204];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[206];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[207];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[209];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[210];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[212];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[213];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[215];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[216];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[218];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[219];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[221];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[222];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[225];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[226];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[228];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[229];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[231];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[232];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[234];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[235];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[237];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[238];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[240];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[241];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[243];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[244];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[246];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[247];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[249];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[250];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[252];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[253];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[257];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[258];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[260];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[261];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[263];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[264];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[266];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[267];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[269];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[270];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[272];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[273];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[275];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[276];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[278];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[279];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[281];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[282];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[284];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[285];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[288];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[289];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[291];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[292];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[294];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[295];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[297];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[298];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[300];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[301];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[303];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[304];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[306];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[307];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[309];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[310];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[312];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[313];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[315];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[316];
    track.addEventListener("onclick", eventproc.onCastClick21, this, [1,]);
    
    track = score.tracks[322];
    track.addEventListener("onclick", eventproc.onCastClick25, this, [20,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame22, this, [0,]);
    score.addEventListener("onexitframe", eventproc.onExitFrame24, this, [30,]);
    
    track = score.tracks[323];
    score.addEventListener("onexitframe", eventproc.onExitFrame23, this, [10,]);
 
 	this.contents=contents;
	this.Room1Score=this.contents.scoresL["Room1Score"];
	this.WalkerScore=this.contents.scoresL["WalkerScore"];
	this.FinalRoom=this.contents.scoresL["FinalRoom"];
	this.RootScore=this.contents.scoresL["スコア0"];
	
  this.WalkerScore.tracks[0].setPuppet(true);
  this.WalkerScore.tracks[0].frame.pos=[0,85,-170];
  this.WalkerScore.tracks[0].frame.visible=true;
  
  this.FinalRoom.tracksL["CastBoard"].setPuppet(true);
  this.FinalRoom.tracksL["CastBoard"].frame.visible=true;
  
  console.log(this.FinalRoom);
};

const VK_UP=38;
const VK_DOWN=40;
const VK_LEFT=37;
const VK_RIGHT=39;
const VK_Z=90;
const VK_X=88;

var hold={VK_UP:false,VK_DOWN:false,VK_LEFT:false,VK_RIGHT:false,VK_Z:false,VK_X:false};



function Enable(tag){
	hold[tag]=true;
	console.log(tag);
}

function Unable(){
	hold[VK_UP]=false;
	hold[VK_DOWN]=false;
	hold[VK_LEFT]=false;
	hold[VK_RIGHT]=false;
	hold[VK_Z]=false;
	hold[VK_X]=false;
}

var getKeyState=function(keyCode){
    return hold[keyCode];
};

MxeDefaultController.eventproc = {};

//=============================================
// SCRIPT CAST 0
//=============================================

var SelectedRoomX=0;
var SelectedRoom=1;

const LingeriesRoom=1;
const TopsRoom=2;
const BottomsRoom=3;
const BagsRoom=4;
const SundriesRoom=5;

MxeDefaultController.eventproc.onCastClick0 = function(e) {
  this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['SelectLingeries']);
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['Stop']);
  SelectedRoomX=this.WalkerScore.tracks[0].frame.pos[0];
  SelectedRoom=LingeriesRoom;
};

//=============================================
// SCRIPT CAST 1
//=============================================

MxeDefaultController.eventproc.onCastClick1 = function(e) {
  this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['SelectTops']);
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['Stop']);
  SelectedRoomX=this.WalkerScore.tracks[0].frame.pos[0];
  SelectedRoom=TopsRoom;
};

//=============================================
// SCRIPT CAST 2
//=============================================

MxeDefaultController.eventproc.onCastClick2 = function(e) {
  this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['SelectBottoms']);
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['Stop']);
  SelectedRoomX=this.WalkerScore.tracks[0].frame.pos[0];
  SelectedRoom=BottomsRoom;
};

//=============================================
// SCRIPT CAST 3
//=============================================

MxeDefaultController.eventproc.onCastClick3 = function(e) {
  this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['SelectBags']);
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['Stop']);
  SelectedRoomX=this.WalkerScore.tracks[0].frame.pos[0];
  SelectedRoom=BagsRoom;
};

//=============================================
// SCRIPT CAST 4
//=============================================

MxeDefaultController.eventproc.onCastClick4 = function(e) {
  this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['SelectSundries']);
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['Stop']);
  SelectedRoomX=this.WalkerScore.tracks[0].frame.pos[0];
  SelectedRoom=SundriesRoom;
};

//=============================================
// SCRIPT CAST 6
//=============================================

var SeekingState=1; //1:ライン選択、2:ライン内徘徊、3:ボードアクションステート

//=============================================
// SCRIPT CAST 7
//=============================================

var keyBuffer = [];



MxeDefaultController.eventproc.onExitFrame7 = function(e) {
	var XTranslation=this.WalkerScore.tracks[0].frame.pos[0];
	if(getKeyState(VK_LEFT)){
		console.log("VK_LEFT");
		if(XTranslation>-420){
			this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['MoveToLeft']);
		}
	
	}else if(getKeyState(VK_RIGHT)){
		console.log("VK_RIGHT");
		if(XTranslation<420){
			this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['MoveToRight']);
		}
	}
};

//=============================================
// SCRIPT CAST 8
//=============================================

MxeDefaultController.eventproc.onExitFrame8 = function(e) {
  console.log("Init");
};

//=============================================
// SCRIPT CAST 9
//=============================================

MxeDefaultController.eventproc.onExitFrame9 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[0]-=10;
};

//=============================================
// SCRIPT CAST 10
//=============================================

MxeDefaultController.eventproc.onExitFrame10 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[0]+=10;
};

//=============================================
// SCRIPT CAST 11
//=============================================

MxeDefaultController.eventproc.onExitFrame11 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[0]-=10;
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['NormalRun']);
};

//=============================================
// SCRIPT CAST 12
//=============================================

MxeDefaultController.eventproc.onExitFrame12 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[0]+=10;
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['NormalRun']);
};

//=============================================
// SCRIPT CAST 13
//=============================================

MxeDefaultController.eventproc.onExitFrame13 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[2]+=10;
  if(this.WalkerScore.tracks[0].frame.pos[2]>=0){
	this.WalkerScore.tracks[0].frame.pos=[0,25,-50];
	this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['FirstState']);
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['FinalRoomStand']);
	this.RootScore.seekFrame(this.RootScore.frameLabelPos['FinalRoom']);
  }
};

//=============================================
// SCRIPT CAST 14
//=============================================

MxeDefaultController.eventproc.onExitFrame14 = function(e) {
  var XTranslation = this.WalkerScore.tracks[0].frame.pos[0];
  
  if(getKeyState(VK_LEFT) && XTranslation > -120){
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['FinalRoomLeft']);
  }else if(getKeyState(VK_RIGHT) && XTranslation <120){
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['FinalRoomRight']);
  }else if(getKeyState(VK_Z)){
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['EnterLine']);
	SeekingState=2;
  }else if(getKeyState(VK_X)){
	this.WalkerScore.tracks[0].frame.pos=[SelectedRoomX,82,-50];
	switch(SelectedRoom){
		case LingeriesRoom:
			this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['CloseLingeries']);
		break;
		case TopsRoom:
			this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['CloseTops']);
		break;
		case BottomsRoom:
			this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['CloseBottoms']);
		break;
		case BagsRoom:
			this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['CloseBags']);
		break;
		case SundriesRoom:
			this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['CloseSundries']);
		break;
	}
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['HomeBack']);
	this.RootScore.seekFrame(this.RootScore.frameLabelPos['DoorRoom']);
  }
};

MxeDefaultController.eventproc.onCastClick14 = function(e) {
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['EnterLine']);
};

//=============================================
// SCRIPT CAST 15
//=============================================

MxeDefaultController.eventproc.onExitFrame15 = function(e) {
  this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['FinalRoomStand']);
};

//=============================================
// SCRIPT CAST 16
//=============================================

MxeDefaultController.eventproc.onExitFrame16 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[2]+=4;
  if(this.WalkerScore.tracks[0].frame.pos[2]>=30){
	this.WalkerScore.tracks[0].frame.pos[2]=30;
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['LineWalk']);
  }
};

//=============================================
// SCRIPT CAST 17
//=============================================

MxeDefaultController.eventproc.onExitFrame17 = function(e) {
	if(SeekingState == 3) return;
	
	if(getKeyState(VK_LEFT)){
		var XRot;
		XRot = this.WalkerScore.tracks[0].frame.rot[0];
		XRot-=0.3/Math.PI;
		if(XRot < -Math.PI/2) XRot=-Math.PI/2;
		this.WalkerScore.tracks[0].frame.rot[0]=XRot;
	}else if(getKeyState(VK_RIGHT)){
		var XRot;
		XRot = this.WalkerScore.tracks[0].frame.rot[0];
		XRot+=0.3/Math.PI;
		if(XRot > 0) XRot=0;
		this.WalkerScore.tracks[0].frame.rot[0]=XRot;		
	}
	
	var ZTranslation = this.WalkerScore.tracks[0].frame.pos[2];
	
	if(getKeyState(VK_UP)){
		ZTranslation+=4;
		if(ZTranslation >= 225) ZTranslation = 225;
	}else if(getKeyState(VK_DOWN)){
		ZTranslation-=4;
		if(ZTranslation<=30) ZTranslation = 30;
	}else if(getKeyState(VK_X)){
		this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['BackToLineSelect']);
		this.WalkerScore.tracks[0].frame.rot[0]=0;
		SeekingState=1;
	}
	
	this.WalkerScore.tracks[0].frame.pos[2] = ZTranslation;
};

//=============================================
// SCRIPT CAST 20
//=============================================

var cast_distance_x;
var cast_distance_y;
var cast_distance_z;
var cast_velocity_x;
var cast_velocity_y;
var cast_velocity_z;
const cast_frame_num = 60.0;
var cast_count;
var cast_board_temp_x;
var cast_board_temp_y;
var cast_board_temp_z;

var Rotation_Total;

var rotation_velocity;

//=============================================
// SCRIPT CAST 21
//=============================================

MxeDefaultController.eventproc.onCastClick21 = function(e) {
	if(SeekingState == 1) return;
	var l=this.FinalRoom.tracks[e.track.index].frame.pos;
	console.log(this.FinalRoom.tracks[e.track.index]);
	var w=new Array(3);
	w[0]=this.FinalRoom.tracks[e.track.index].frame.worldMatrix[12];
	w[1]=this.FinalRoom.tracks[e.track.index].frame.worldMatrix[13];
	w[2]=this.FinalRoom.tracks[e.track.index].frame.worldMatrix[14];
	
	cast_board_temp_x=w[0];
	cast_board_temp_y=w[1];
	cast_board_temp_z=w[2];
	
	var Rot;
	if(w[1]>=20){
		Rot=this.FinalRoom.tracks[e.track.index-1].frame.rot[1];
	}else{
		Rot=this.FinalRoom.tracks[e.track.index-2].frame.rot[1];
	}
	
	if(Rot>=3){
		Rotation_Total=Math.PI/2;
		this.FinalRoom.tracksL["CastBoard"].frame.rot[1]=Math.PI;
	}else{
		Rotation_Total=-Math.PI/2;
		this.FinalRoom.tracksL["CastBoard"].frame.rot[1]=0;
	}
	
	l=this.WalkerScore.tracks[0].frame.pos;
	cast_distance_x=l[0]-w[0];
	cast_distance_y=l[1]-w[1];
	cast_distance_z=l[2]-w[2]+15;
	
	cast_velocity_x=cast_distance_x/cast_frame_num;
	cast_velocity_y=cast_distance_y/cast_frame_num;
	cast_velocity_z=cast_distance_z/cast_frame_num;
	
	rotation_velocity=Rotation_Total/cast_frame_num;
	cast_count=0;
	
	this.FinalRoom.tracksL["CastBoard"].frame.pos=w;
	this.WalkerScore.tracks[0].frame.rot[0]=0;
	
	this.FinalRoom.seekFrame(this.FinalRoom.frameLabelPos['BoardCasting']);
	
	SeekingState=3;
};

//=============================================
// SCRIPT CAST 22
//=============================================

MxeDefaultController.eventproc.onExitFrame22 = function(e) {
	console.log("Casted");
};

//=============================================
// SCRIPT CAST 23
//=============================================

MxeDefaultController.eventproc.onExitFrame23 = function(e) {
	++cast_count;
	var Translation=this.FinalRoom.tracksL["CastBoard"].frame.pos;
	Translation[0]+=cast_velocity_x;
	Translation[1]+=cast_velocity_y;
	Translation[2]+=cast_velocity_z;
	
	this.FinalRoom.tracksL["CastBoard"].frame.pos=Translation;
	
	var Rotation=this.FinalRoom.tracksL["CastBoard"].frame.rot[1];
	Rotation+=rotation_velocity;
	this.FinalRoom.tracksL["CastBoard"].frame.rot[1]=Rotation;
	
	if(cast_count == cast_frame_num){
		this.FinalRoom.seekFrame(this.FinalRoom.frameLabelPos['BoardCasted']);
		//SeekingStateChange
	}
};

//=============================================
// SCRIPT CAST 24
//=============================================

MxeDefaultController.eventproc.onExitFrame24 = function(e) {
	++cast_count;
	var Translation=this.FinalRoom.tracksL["CastBoard"].frame.pos;
	
	Translation[0]+=cast_velocity_x;
	Translation[1]+=cast_velocity_y;
	Translation[2]+=cast_velocity_z;
	
	this.FinalRoom.tracksL["CastBoard"].frame.pos=Translation;
	
	var Rotation=this.FinalRoom.tracksL["CastBoard"].frame.rot[1];
	Rotation+=rotation_velocity;
	this.FinalRoom.tracksL["CastBoard"].frame.rot[1]=Rotation;
	
	if(cast_count == cast_frame_num){
		this.FinalRoom.seekFrame(1);
		SeekingState=2;
	}
};

//=============================================
// SCRIPT CAST 25
//=============================================

MxeDefaultController.eventproc.onCastClick25 = function(e) {
	var w=[cast_board_temp_x,cast_board_temp_y,cast_board_temp_z];
	var l=this.WalkerScore.tracks[0].frame.pos;

	cast_distance_x=w[0]-l[0];
	cast_distance_y=w[1]-l[1];
	cast_distance_z=w[2]-l[2]-15;
	
	cast_velocity_x=cast_distance_x/cast_frame_num;
	cast_velocity_y=cast_distance_y/cast_frame_num;
	cast_velocity_z=cast_distance_z/cast_frame_num;
	
	cast_count=0;
	
	if(Rotation_Total>0){
		Rotation_Total=-Math.PI/2;
	}else{
		Rotation_Total=Math.PI/2;
	}
	
	rotation_velocity=Rotation_Total/cast_frame_num;
	
	this.FinalRoom.seekFrame(this.FinalRoom.frameLabelPos['BoardBacking']);
};

//=============================================
// SCRIPT CAST 26
//=============================================

MxeDefaultController.eventproc.onExitFrame26 = function(e) {
/*-- original script (1-4) -----------------
OnEvent ExitFrame(Score,Track: Integer);
begin
  TrackProperty[FinalRoom:CastBoard].CopyTrack(-1);
end;
  -- original script (1-4) -----------------*/
};

//=============================================
// SCRIPT CAST 28
//=============================================

MxeDefaultController.eventproc.onExitFrame28 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[2]-=4;
  if(this.WalkerScore.tracks[0].frame.pos[2]<=-50){
	this.WalkerScore.tracks[0].frame.pos[2]=-50;
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['FinalRoomStand']);
  }
};

//=============================================
// SCRIPT CAST 30
//=============================================

MxeDefaultController.eventproc.onExitFrame30 = function(e) {
  this.WalkerScore.tracks[0].frame.pos[2]-=6;
  if(this.WalkerScore.tracks[0].frame.pos[2]<=-170){
	this.WalkerScore.tracks[0].frame.pos[2]=-170;
	this.WalkerScore.seekFrame(this.WalkerScore.frameLabelPos['NormalRun']);
  }
};

//=============================================
// SCRIPT CAST 32
//=============================================

MxeDefaultController.eventproc.onExitFrame32 = function(e) {
  this.Room1Score.seekFrame(this.Room1Score.frameLabelPos['FirstState']);
  
};

MxePlayer.registerControllerClass(MxeDefaultController);