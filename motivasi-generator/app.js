const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const quotes={
 motivasi:["Hari ini mungkin berat, tetapi kamu tidak harus berhenti.","Pelan bukan berarti gagal. Yang penting, kamu tetap bergerak.","Tidak harus sempurna untuk memulai. Mulailah, lalu bertumbuh.","Satu langkah kecil hari ini tetap membawa kamu lebih dekat."],
 islami:["Jaga niat, rapikan ikhtiar, lalu serahkan hasil kepada Allah.","Saat hati lelah, berhenti sejenak untuk mengingat bahwa Allah selalu dekat.","Tidak semua jawaban datang cepat. Tetap berdoa, berusaha, dan bersabar.","Semoga langkah kecilmu menjadi jalan menuju keberkahan."],
 mutiara:["Tidak semua proses harus terlihat untuk menjadi berarti.","Yang tenang bukan berarti tanpa masalah; ia hanya belajar tidak menyerah pada keadaan.","Jadilah alasan seseorang kembali percaya pada kebaikan.","Waktu mengajarkan: yang tulus tidak selalu ramai, tetapi sering kali paling berarti."],
 belajar:["Belajar satu halaman hari ini lebih baik daripada menunggu sempurna.","Kalau sulit, pecah menjadi kecil. Kalau lelah, istirahat. Jangan menyerah.","Tidak perlu mengalahkan siapa pun. Cukup kalahkan rasa ingin berhenti.","Konsisten 30 menit setiap hari bisa mengubah kemampuanmu."],
};
const palettes={
 night:{bg1:"#0d1612",bg2:"#182b20",accent:"#dfc98f",soft:"#a9c4ae"},
 sand:{bg1:"#342b21",bg2:"#776348",accent:"#f0d8a3",soft:"#f3e4c5"},
 forest:{bg1:"#0b241a",bg2:"#24533a",accent:"#d4d89c",soft:"#b9d2b9"},
 rose:{bg1:"#281b23",bg2:"#5b3546",accent:"#e5b9c7",soft:"#e0c9d1"}
};
let theme="night", category="motivasi";
const canvas=$("#canvas"),ctx=canvas.getContext("2d");
function setRatio(){
 const r=$("#ratio").value; const sizes={square:[1080,1080],portrait:[1080,1350],story:[1080,1920]};
 [canvas.width,canvas.height]=sizes[r];
 draw();
}
function roundRect(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
function wrap(text,max){const words=text.trim().split(/\s+/);const lines=[];let line="";
 for(const word of words){const test=line?line+" "+word:word;if(ctx.measureText(test).width>max&&line){lines.push(line);line=word}else line=test}if(line)lines.push(line);return lines}
function draw(){
 const w=canvas.width,h=canvas.height,p=palettes[theme];
 const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,p.bg1);g.addColorStop(1,p.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 const glow=ctx.createRadialGradient(w*.78,h*.16,20,w*.78,h*.16,w*.6);glow.addColorStop(0,p.accent+"30");glow.addColorStop(1,"transparent");ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 ctx.strokeStyle=p.accent+"55";ctx.lineWidth=2;ctx.beginPath();ctx.arc(w*.5,h*.5,Math.min(w,h)*.36,0,Math.PI*2);ctx.stroke();
 ctx.fillStyle=p.accent;ctx.font="700 "+Math.max(22,w*.024)+"px Inter";ctx.textAlign="center";ctx.fillText(category==="islami"?"☾  RENUNGAN":"✦  "+category.toUpperCase(),w/2,h*.16);
 const text=$("#quote").value.trim()||quotes[category][0];const size=category==="islami"?Math.max(42,w*.052):Math.max(40,w*.05);
 ctx.font="700 "+size+"px Inter";const lines=wrap(text,w*.78);const lineH=size*1.22;let y=(h-lineH*lines.length)/2;
 ctx.fillStyle="#f7f5ee";for(const line of lines){ctx.fillText(line,w/2,y);y+=lineH}
 ctx.fillStyle=p.soft;ctx.font="400 "+Math.max(20,w*.021)+"px Inter";ctx.fillText("NurMotivasi",w/2,h*.86);
 ctx.fillStyle=p.accent+"aa";ctx.font="600 "+Math.max(14,w*.014)+"px Inter";ctx.fillText("BUAT BAIK • BAGIKAN BAIK",w/2,h*.90);
}
function useQuote(q){$("#quote").value=q;draw()}
$("#category").addEventListener("change",e=>{category=e.target.value;$("#quote").value=quotes[category][0];draw()});
$("#quote").addEventListener("input",draw);$("#ratio").addEventListener("change",setRatio);
$$(".theme").forEach(b=>b.onclick=()=>{$$(".theme").forEach(x=>x.classList.remove("active"));b.classList.add("active");theme=b.dataset.theme;draw()});
$$(".quick button").forEach(b=>b.onclick=()=>useQuote(b.dataset.quote));
$$(".idea-list button").forEach(b=>b.onclick=()=>{$("#category").value=b.dataset.cat;category=b.dataset.cat;$("#quote").value=quotes[category][0];draw();window.scrollTo({top:document.querySelector(".studio-grid").offsetTop-20,behavior:"smooth"})});
$("#generate").onclick=()=>{draw();$("#status").textContent="Gambar diperbarui ✓"};
$("#random").onclick=()=>{const list=quotes[category];useQuote(list[Math.floor(Math.random()*list.length)]);$("#status").textContent="Inspirasi baru ✦"};
$("#copy").onclick=async()=>{try{await navigator.clipboard.writeText($("#quote").value);$("#status").textContent="Teks disalin ✓"}catch{$("#status").textContent="Pilih dan salin teks secara manual"}};
$("#download").onclick=()=>{draw();const a=document.createElement("a");a.download="nurmotivasi-"+category+".png";a.href=canvas.toDataURL("image/png");a.click();$("#status").textContent="PNG siap diunduh ✓"};
setRatio();$("#quote").value=quotes[category][0];draw();