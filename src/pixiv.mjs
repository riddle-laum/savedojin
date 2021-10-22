// [www.pixiv.net]
main = {
  main: async ()=>{
    const r = {urls:[],title:''};
    let temp, extend = null;
    // search extend
    for(var dom of document.querySelectorAll('button'))
      if(dom.querySelector('div:nth-child(2)') && dom.querySelector('div:nth-child(2)').innerText == 'すべて見る'){
        extend = dom;
        break;
      }
    
    // open extend
    if(extend !== null){
      // some images in this page
      extend.click();
      await savedojin.assets.sleep(1000); // 1s(1000ms) for now, adjust later
    }
    for(var dom of document.querySelectorAll('.gtm-expand-full-size-illust'))
      r.urls.push(dom.href);
    r.title = 'pixiv-' + (temp = location.href.split('/'))[temp.length - 1];
    return r;
  }
}