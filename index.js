p=require('pokemon-go-node-api')
E=require('express')
app=E()
a=process.argv.slice(2)
l=console.log
c=p.GetLocationCoords
Pk=[]
stat='walking'

process.stdout.write('\033c')
p.init(a[1],a[2],a[3]||{type:'name',name:'Galvanize San Francisco'},a[4]||'google',e=>{
  if(e)throw e;
  app.use(E.static(__dirname+'/public'))
  app.get('/loc',(_,y)=>{
    y.setHeader('Content-Type','application/json')
    y.json({key:a[0],lat:c().latitude,long:c().longitude,pk:Pk,stat:stat})
  })
  l('Location:',p.playerInfo.locationName+';','lat',p.playerInfo.latitude+',','long',p.playerInfo.longitude)
  p.GetProfile((e,P)=>{
    if(e)throw e;
    l('Username:',P.username)
    app.set('title',P.username)
    l('Poke storage:',P.poke_storage)
    l('Item storage:',P.item_storage)
    l('Pokecoins:',P.currency[0].amount)
    l('Stardust:',P.currency[1].amount)
    setInterval(_=>{
      p.Heartbeat((e,m)=>{
        if(e)throw e;
        Pk=[]
        m.cells.map(x=>{
          x.NearbyPokemon[0]&&Pk.push(p.pokemonlist[x.NearbyPokemon[0].PokedexNumber-1].name)
          x.MapPokemon.map(X=>{
            l('Catching',pk=p.pokemonlist[X.PokedexTypeId-1].name)
            p.EncounterPokemon(X,_=>{
              l('A wild',pk,'appeared!')
              stat='catching '+pk
              p.CatchPokemon(X,1,1.95,1,1,(a,b)=>{
                l(st['ERR','Caught','Escaped','Fled','Missed'][b.Status])
                stat=`catching ${pk} - `+st
              })
            })
          })
        })
      })
    },5000)
  })
  setInterval(_=>{
    p.SetLocation({
      type:'coords',
      coords:{
        latitude:c().latitude+(Math.random()*2-1)/1e5,
        longitude:c().longitude+(Math.random()*2-1)/1e5,
        altitude:c().altitude
      }
    },_=>{})
  },500)
})

app.listen(8080,'127.0.0.1')
