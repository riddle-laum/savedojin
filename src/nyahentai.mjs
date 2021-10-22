// [ja.nyahentai.com]
main = {
  main: async ()=>{
    const r = {urls:[],title:''};
    let rescnt = 0;
    await new Promise(async resolve=>{
      for(var dom of document.querySelectorAll('.gallerythumb'))
        (async()=>{
          rescnt++;
          r.urls.push(new DOMParser().parseFromString(await fetch(dom.href).then(res=>res.text()), 'text/html').querySelector('.current-img').src);
          rescnt--;
          if(rescnt == 0) resolve();
        })();
    });
    r.title = 'nyahentai-' + location.href.substr(0,location.href.length - 1).split('/').pop();
    return r;
  }
}