p=require('pokemon-go-node-api')
E=require('express')
app=E()
a=process.argv.slice(2)
l=console.log
c=p.GetLocationCoords
Pk=[]
pkmn=[]
egg=[]
item=[]
stat='walking'
lvl=''
stop=[]

process.stdout.write('\033c')
p.init(a[1],a[2],a[3]||{type:'name',name:'Galvanize San Francisco'},a[4]||'google',e=>{
  if(e)throw e;
  l('Location:',p.playerInfo.locationName+';','lat',p.playerInfo.latitude+',','long',p.playerInfo.longitude)
  p.GetProfile((e,P)=>{
    if(e)throw e;
    l('Username:',P.username)
    l('Poke storage:',P.poke_storage)
    l('Item storage:',P.item_storage)
    l('Pokecoins:',P.currency[0].amount)
    l('Stardust:',P.currency[1].amount)
    app.use(E.static(__dirname+'/public'))
    app.get('/loc',(_,y)=>{
      y.setHeader('Content-Type','application/json')
      y.json({user:P.username,coins:P.currency[0].amount,dust:P.currency[1].amount,key:a[0],lat:c().latitude,lng:c().longitude,pk:Pk,stat:stat,pkmn:pkmn,egg:egg,lvl:lvl,item:item,stop:stop})
    })
    setInterval(_=>{
      p.GetInventory((e,i)=>{
        egg=[]
        pkmn=[]
        item=[]
        e||i.inventory_delta.inventory_items.map(x=>{
          x.inventory_item_data.pokemon&&(x.inventory_item_data.pokemon.is_egg?egg.push(x.inventory_item_data.pokemon.egg_km_walked_target+'km\tEgg'):pkmn.push(`CP${x.inventory_item_data.pokemon.cp}\t`+p.pokemonlist[x.inventory_item_data.pokemon.pokemon_id-1].name))
          x.inventory_item_data.player_stats&&(lvl='lvl'+x.inventory_item_data.player_stats.level)
          x.inventory_item_data.item&&item.push(x.inventory_item_data.item.count+'\t'+x.inventory_item_data.item.item_id)
        })
      })
      p.Heartbeat((e,m)=>{
        if(e)throw e;
        Pk=[]
        m.cells.map(x=>{
          x.NearbyPokemon[0]&&Pk.push(p.pokemonlist[x.NearbyPokemon[0].PokedexNumber-1].name)
          x.MapPokemon.map(X=>{
            l('Catching',pk=p.pokemonlist[X.PokedexTypeId-1].name)
            p.EncounterPokemon(X,_=>{
              l('A wild',pk,'appeared!')
              p.CatchPokemon(X,1,1.95,1,1,(a,b)=>{
                  b&&(st=['ERR','Caught','Escaped','Fled','Missed'][b.Status],stat=st=='Caught'||st=='ERR'?'walking':`catching ${pk} - `+st)
              })
            })
          })
          x.Fort.map(X=>{
            stop.push({lat:X.Latitude,lng:X.Longitude})
            X.FortType&&X.Enabled&&p.GetFort(X.FortId,X.Latitude,X.Longitude,(a,b)=>{
              b&&b.result==1&&(l(b,'Used PokeStop'))
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
        latitude:c().latitude+(Math.random()*2-1)/5e4,
        longitude:c().longitude+(Math.random()*2-1)/5e4,
        altitude:c().altitude
      }
    },_=>{})
  },100)
})

app.listen(8080,'127.0.0.1')
