path = require('path');
// export json of config
exports.config = function(){
  data = {
    // edit below here
    music_dir: "C:/Users/corne/Music",
    sc_dl_dir: "soundcloud",
    sc_client_id: "062e8dac092fe1ed9e16ee10dd88d566",
    youtube: {
      dl_dir: "youtube",
      quality: "highest"
    },
    // set true if you want taglib enabled
    taglib:true
    // and above here
  }
  data.music_dir = path.normalize(data.music_dir);
  if(data.music_dir.lastIndexOf("/") == data.music_dir.length-1){
    data.music_dir = data.music_dir.substr(0, data.music_dir.length-1);
  }
  return data;
}
