// [eromanga-yoru.com]
main = class{
  static async main(){
    const r = {urls:[],title:[]};
    const series = this.getSeries();
    r.title.push('eromanga-yoru');
    for(let url of series){
      r.title.push(url.split('/')[4]);
      let parent;
      if(url == location.href) parent = document;
      else parent = new DOMParser().parseFromString(await fetch(url).then(res=>res.text()), 'text/html');
      r.urls.push(...this.getImgList(parent));
    }
    r.title = r.title.join('-');
    return r;
  };
  static getSeries(){
    const series = [];
    if(!document.querySelector('.box_rensaku') && !document.querySelector('.easy-series-toc')) return [location.href];
    if(document.querySelector('.box_rensaku'))
      for(var dom of document.querySelector('.box_rensaku').querySelectorAll('a')) series.push(dom.href);
    else{
      series.push(location.href);
      for(var dom of document.querySelector('.easy-series-toc').querySelectorAll('a')) series.push(dom.href);
    }
    return series;
  };
  static getImgList(parent){
    const urls = [];
    for(var dom of parent.querySelectorAll('.entry-content img')) urls.push(dom.src);
    return urls;
  };
}