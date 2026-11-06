const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');const path=require('path');
const FPS=30;const data=JSON.parse(fs.readFileSync(path.join(__dirname,process.env.DATA||'data.json')));
const only=process.argv[2];const out=path.join(__dirname,'out');fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.join(__dirname,process.env.TPL||'template.html'));await p.evaluate(()=>Promise.all(['700 40px Amiri','500 40px Kufi','700 40px Ruqaa'].map(f=>document.fonts.load(f))));
for(const d of data){if(only&&!d.id.startsWith(only))continue;
 const total=await p.evaluate(d=>setup(d),d);const N=Math.ceil(total*FPS);
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',''+FPS,'-i','-','-f','lavfi','-i','anullsrc=r=44100:cl=stereo','-shortest','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-preset','medium','-c:a','aac','-movflags','+faststart',path.join(out,(process.env.PFX||'')+d.id+'.mp4')]);
 for(let i=0;i<N;i++){const url=await p.evaluate(t=>{renderAt(t);return document.getElementById('c').toDataURL('image/jpeg',0.93)},i/FPS);
   const buf=Buffer.from(url.split(',')[1],'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log(d.id,total.toFixed(1)+'s');}
await b.close();})();
