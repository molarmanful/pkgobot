# pkgobot
A Pokémon GO bot created at /hack 2016.

![Sample Screenshot](https://github.com/molarmanful/pkgobot/blob/master/screenshot.png?raw=true)

##Installation
Simply download the repo as a `.zip` file (or clone in desktop).

##Usage
Make sure you have a Pokémon GO account already, preferably one that you are not using (to prevent any risk of your favorite account from getting banned).

`cd` into the directory if you haven't already. `node index.js` takes 3-5 command line arguments, in order:

1. Google Maps API key (both the Geocoder and Javascript APIs). See the _Token_ section.
2. Email/Username.
3. Password.
4. Optional. Defaults to `{type:'name',name:'Galvanize San Francisco'}`. Location as a JSON object; can be one of (as examples):
    * `{type:'name',name:'Times Square'}`
    * `{type:'coords',coords:{latitude:0,longitude:0,altitude:0}}`
5. Optional. Defaults to `google`. Can be either `google` or `ptc` depending on what account you used for arguments 2 and 3.

After successfully running the command, web output is hosted at `http://localhost:8080`

##Token
1. Go to [The Google Developers Console](https://console.developers.google.com).
2. Create a project, and in the "Library" tab at the sidebar, add the Google Maps Geocoder and Javascript APIs.
3. Click the "Credentials" tab at the sidebar and click "Create credentials > API Key > Browser Key."
4. Finish creating the browser key. You now have your API key!
