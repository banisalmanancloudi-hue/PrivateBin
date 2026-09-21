const aiBtn=document.createElement("button");aiBtn.className="ai-button";aiBtn.id="aiGenerate";aiBtn.innerHTML="✦ Generate background AI";
document.querySelector(".controls").insertBefore(aiBtn,document.querySelector("#generate"));
const promptLabel=document.createElement("label");promptLabel.innerHTML='Prompt background AI<textarea id="aiPrompt" rows="4" placeholder="Contoh: anak muda belajar di malam hari, suasana islami, cinematic"></textarea><small class="ai-help">Jelaskan subjek, suasana, pencahayaan, lokasi, dan gaya.</small>';
document.querySelector(".controls").insertBefore(promptLabel,aiBtn);
let aiImage=null;
function drawWithAI(){draw()}
window.draw=drawWithAI;
aiBtn.onclick=async()=>{const prompt=$("#aiPrompt").value.trim();if(!prompt){$("#status").textContent="Isi prompt AI dulu";return}aiBtn.disabled=true;aiBtn.textContent="⏳ Membuat background...";$("#status").textContent="AI sedang bekerja…";try{const r=await fetch("/api/generate-image",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,size:$("#ratio").value==="story"?"1024x1536":"1024x1024"})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Gagal membuat gambar");const img=new Image();img.onload=()=>{window.aiImage=img;draw();};img.src=data.image;$("#status").textContent="Background AI siap ✓"}catch(e){$("#status").textContent=e.message}finally{aiBtn.disabled=false;aiBtn.textContent="✦ Generate background AI"}};
