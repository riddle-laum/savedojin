// ----- main ----- //
savedojin.main = async ()=>{
  // show info
  console.log('[savedojin]', 'savedojin :', savedojin.version);

  // get website domain
  const domain = location.hostname;
  console.log('[savedojin]', 'website :', domain);
  
  // call module
  if(savedojin.modules[domain]) await savedojin.deploy(await savedojin.modules[domain].main());
  else console.warn('[savedojin]', `"${domain}" is not supported`), alert(`[savedojin] "${domain}" is not supported`);
};