// [ja.erocool.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.vimg')) r.urls.push(dom.dataset.src);
    var locate;
    r.title = 'ercool-' +(([(locate = location.href.split(/\/|\./g)).length - 1] == '' || locate[locate.length - 1] == 'html') ? locate[locate.length - 2] : locate[locate.length - 1]);
    return r;
  } 
}