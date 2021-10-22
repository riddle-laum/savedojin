// ----- assets ----- //
savedojin.assets = {
  srcsetParse: (srcsets)=>{
    if(!(srcsets instanceof Array)) return void 0;
    const urls = [];
    for(const i in srcsets){
      const sizes = {};
      for(const val of srcsets[i].split(/,(\n|\s+|)/g)){
        if(!val.match(/^.+ [0-9]+w/)) continue;
        const [_url, _size] = val.match(/[^\s].+ [0-9]+w/g)[0].split(' ');
        sizes[+_size.split('w')[0]] = _url;
      }
      if(!Object.keys(sizes).length) continue;
      urls.push(sizes[Object.keys(sizes).reduce((a,b)=>a>b?a:b)]); // getmax
    }
    return urls;
  },
  sleep: async (delay)=>{
    if(+delay !== +delay || delay < 1) return;
    await new Promise(resolve=>setTimeout(()=>resolve(), delay));
  },
  queryParamParser: (locate)=>{
    let param = locate.split('?')[1];
    if(!param) return null;
    let obj = {};
    for(const val of param.split(/&/g)){
      const [key, value] = val.split('=');
      obj[key] = value ? value : true;
    }
    return obj;
  }
};
