// [buhidoh.net]
main = {
  main: ()=>{
    const r =  {urls:[],title:''};
    if(document.querySelectorAll('.ently_text > a').length)
      for(var dom of document.querySelectorAll('.ently_text > a')) r.urls.push(dom.href);
    else for(var dom of document.querySelectorAll('.ently_text > p > a')) r.urls.push(dom.href);
    r.title = 'buhidoh-' + location.href.split(/\/|\./g)[4];
    return r;
  }
}