// EroCool.com
// https://ja.erocool.com/

export function getImgList(){
  const r = {urls:[],title:''};
  var locate;
  for(let dom of document.getElementsByClassName('vimg'))
    r.urls.push(dom.dataset.src);
  r.title = 'erocool-';
  r.title += (locate = location.href.split(/\/|\./g))[locate.length - 1] == '' || locate[locate.length - 1] == 'html' ? locate[locate.length - 2] : locate[locate.length - 1];
  return r;
}