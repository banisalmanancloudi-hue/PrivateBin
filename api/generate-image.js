export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
 if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:"OPENAI_API_KEY belum dikonfigurasi di server."});
 try{
  const body=req.body||{}; const prompt=body.prompt; const size=body.size||"1024x1024";
  if(!prompt||prompt.length>2000) return res.status(400).json({error:"Prompt wajib diisi dan maksimal 2000 karakter."});
  const composed="Create a cinematic background for a motivational social-media quote card. Scene: "+prompt+". Leave the central area visually calm and uncluttered for overlaid typography. No words, letters, captions, logos, watermarks, or readable text. Respectful, tasteful, uplifting visual tone.";
  const r=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.OPENAI_API_KEY},body:JSON.stringify({model:"gpt-image-2",prompt:composed,size,quality:"high",output_format:"png"})});
  const data=await r.json();
  if(!r.ok) return res.status(r.status).json({error:(data.error&&data.error.message)||"Gagal membuat gambar."});
  const item=data&&data.data&&data.data[0];
  if(item&&item.b64_json) return res.status(200).json({image:"data:image/png;base64,"+item.b64_json});
  if(item&&item.url) return res.status(200).json({image:item.url});
  return res.status(502).json({error:"Respons image generation tidak berisi gambar."});
 }catch(e){return res.status(500).json({error:e.message||"Terjadi kesalahan."})}
}