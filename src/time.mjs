// [eromanga-time.com]
main = class{
  static async main(){
    const r = this.getImgUrl(document);
    r.title = 'eromanga-time-' + r.title;
    for(var url of this.getSeriesUrl()){
      var {urls} = this.getImgUrl(new DOMParser().parseFromString(await fetch(url).then(res=>res.text()), 'text/html'));
      r.urls.push(...urls);
      r.title += '-' + url.split('/')[4];;
    }
    return r;
  };
  static getImgUrl(parent){
    const r = {urls:[],title:''};
    for(var dom of parent.querySelectorAll('.entry-content img'))
      if(dom.srcset) r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = location.href.split('/')[4];
    return r;
  };
  static getSeriesUrl(){
    let urllist = [];
    for(let dom of document.querySelectorAll('.easy-series-toc a'))
      if(dom.href.match(/\/content\//) && !urllist.includes(dom.href))
        urllist.push(dom.href);
    return urllist;
  };
}