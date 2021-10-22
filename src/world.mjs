// [erodoujinshi-world.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.kijibox img')) r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'erodoujinshi-world-' + location.href.split(/\.|\//)[4];
    return r;
  } 
}