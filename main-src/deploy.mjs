// ----- deploy ----- //
savedojin.deploy = async ({urls, title})=>{
  if(!(urls instanceof Array) || !urls.length) throw new Error('invalid value in "urls"');
  let dom = document.createElement('html');
  dom.appendChild(document.createElement('head'));
  dom.appendChild(document.createElement('body'));
  dom.querySelector('head').appendChild(document.createElement('meta'));
  dom.querySelector('meta').setAttribute('charset', 'utf-8');
  dom.querySelector('body').appendChild(document.createElement('div'));
  dom.querySelector('div').setAttribute('id', 'main-contents');
  for(const url of urls){
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('style', 'width:100%;');
    dom.querySelector('div').appendChild(img);
  }
  document.querySelector('html').remove();
  document.appendChild(dom);
  if(typeof(title) == 'string') document.title = title;
};