p=require('pokemon-go-node-api')
a=process.argv.slice(2)
l=console.log
process.stdout.write('\033c')
p.init(a[0],a[1],a[2]||{type:'name',name:'Galvanize San Francisco'},a[3]||'google',e=>{
  if(e)throw e;
  l('Location:',p.playerInfo.locationName+';','lat',p.playerInfo.latitude+',','long',p.playerInfo.longitude)
  p.GetProfile((e,P)=>{
    if(e)throw e;
    l('Username:',P.username)
    l('Poke storage:',P.poke_storage)
    l('Item storage:',P.item_storage)
    l('Pokecoins:',P.currency[0].amount)
    l('Stardust:',P.currency[1].amount)
    setInterval(_=>{
      p.Heartbeat((e,m)=>{
        if(e)throw e;
        m.cells.map(x=>{
          x.NearbyPokemon[0]&&l(p.pokemonlist[x.NearbyPokemon[0].PokedexNumber-1].name,'is nearby')
          x.MapPokemon.map(X=>{
            l('Catching',pk=p.pokemonlist[X.PokedexTypeId-1].name)
            p.encounterPokemon(X,_=>{
              l('A wild ',pk,'appeared!')
              p.catchPokemon(X,1,1.95,1,1,(a,b)=>{
                l(['ERR','Caught','Escaped','Fled','Missed'][b.Status])
              })
            })
          })
        })
      })
    },5000)
  })
})
