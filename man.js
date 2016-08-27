p=require('pokemon-go-node-api')
a=process.argv.slice(2)
r=require('repl')
p.init(a[0],a[1],a[2]||{type:'name',name:'Galvanize San Francisco'},a[3]||'google',e=>{
  r.start({
    prompt:'pkgo > ',
    useGlobal:true
  })
})
