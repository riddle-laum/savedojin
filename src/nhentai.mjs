// [nhentai.net]
main = {
  main: async ()=>{
    const r = {urls:[],title:''};
    for(let dom of document.querySelectorAll('.thumb-container > a')){
      let res = new DOMParser().parseFromString(await fetch(dom.href).then(res=>res.text()), 'text/html').querySelector('#image-container > a > img').src;
      if(!res) continue;
      r.urls.push(res);
    }
    let temp = location.href.split('/');
    r.title = 'nhentai-' + temp[3] + '-' + temp[4];
    return r;
  }
}