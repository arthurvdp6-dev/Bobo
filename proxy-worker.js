// Proxy Cloudflare Worker pour BOBO Loot (à utiliser seulement si le navigateur bloque Nitrado).
// Dans Cloudflare : Workers > Créer > colle ce code > Settings > Variables : ajoute PROXY_KEY (un mot de passe à toi).
const CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS','Access-Control-Allow-Headers':'Authorization,token,Content-Type,Accept,X-Proxy-Key'};
export default{async fetch(req,env){
  if(req.method==='OPTIONS')return new Response(null,{headers:CORS});
  if(!env.PROXY_KEY||req.headers.get('X-Proxy-Key')!==env.PROXY_KEY)return new Response('Clé de proxy invalide',{status:403,headers:CORS});
  const target=new URL(req.url).searchParams.get('u');
  if(!target||!target.startsWith('https://'))return new Response('URL manquante',{status:400,headers:CORS});
  const h=new Headers();for(const k of['Authorization','token','Content-Type','Accept']){const v=req.headers.get(k);if(v)h.set(k,v)}
  const r=await fetch(target,{method:req.method,headers:h,body:['GET','HEAD'].includes(req.method)?undefined:await req.arrayBuffer()});
  const out=new Headers(r.headers);for(const[k,v]of Object.entries(CORS))out.set(k,v);
  return new Response(r.body,{status:r.status,headers:out});
}};
