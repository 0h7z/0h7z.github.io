import{d as s}from"./Base64.min.8c55affc.js";import{k as a,w as n,b as _,t as d,o as i,u as p}from"./vendor.a4facede.js";import{_ as f}from"./index.52790e1e.js";const u={font:"mono",larger:""},l={__name:"b64dec",setup(m){const c=p(),t=a({str:""}),r=o=>{try{const e=s(o);return e&&navigator.clipboard.writeText(e),`${e||"> Nothing to do."}`}catch(e){return console.debug(e),"> Decode failed."}};return n(()=>t.str=r(c.hash.replace(/^#*/,""))),(o,e)=>(i(),_("div",u,d(t.str),1))}},v=f(l,[["__scopeId","data-v-f04b4c2c"]]);export{v as default};