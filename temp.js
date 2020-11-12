const replaceFile = (contents, stringReplace, value) => {
  return new Promise( (resolve, reject) => {
    switch(stringReplace) {
      case 'Channelname':
        var newValue = String(contents).replace(/Channelname/g, value);
        resolve(newValue);
        break;
      case 'couchdbname':
        var newValue = String(contents).replace(/couchdbname/g, 'couchdb' + value);
        resolve(newValue);
        break;
      case 'couchdbpassword':
        var newValue = String(contents).replace(/COUCHDB_PASSWORD=/g, 'COUCHDB_PASSWORD=' + value);
        resolve(newValue);
        break;
      case 'couchdbpassword':
        var newValue = String(contents).replace(/COUCHDB_PASSWORD=/g, 'COUCHDB_PASSWORD=' + value);
        resolve(newValue);
        break;
      case 'couchdbuser':
        var newValue = String(contents).replace(/COUCHDB_USER=/g, 'COUCHDB_USER=' + value);
        resolve(newValue);
        break;
      case 'countpeer': //ok
        var newValue = String(contents).replace(/countpeer/g, value);
        resolve(newValue);
        break;
      case 'description':
        var newValue = String(contents).replace(/description/g, value);
        resolve(newValue);
        break;
      case 'keyorg':
        var newValue = String(contents).replace(/keyorg/g, value);
        resolve(newValue);
        break;
      case 'networkname':
        var newValue = String(contents).replace(/networkname/g, value);
        resolve(newValue);
        break;     
      case 'ordererca':
        var newValue = String(contents).replace(/ordererca/g, value);
        resolve(newValue);
        break;      
      case 'ordererpeer':
        var newValue = String(contents).replace(/ordererpeer/g, value);
        resolve(newValue);
        break;
      case 'OrganizationOrgs':
        var newValue = String(contents).replace(/OrganizationOrgs/g, value);
        resolve(newValue);
        break;
      case 'orgname'://ok
        var newValue = String(contents).replace(/orgname/g, value);
        resolve(newValue);
        break;
      case 'peernumber':
        var newValue = String(contents).replace(/peernumber/g, 'peer' + value);
        resolve(newValue);
        break;
      case 'peersOrgs':
        var newValue = String(contents).replace(/peersOrgs/g, value);
        resolve(newValue);
        break;
      case 'portca':
        var newValue = String(contents).replace(/portca/g, value);
        resolve(newValue);
        break;
      case 'portcouch':
        var newValue = String(contents).replace(/portcouch/g, value);
        resolve(newValue);
        break;
      case 'portnumber':
        var newValue = String(contents).replace(/portnumber/g, value);
        resolve(newValue);
        break;
      case 'portorderer':
        var newValue = String(contents).replace(/portorderer/g, value);
        resolve(newValue);
        break;
      case 'orderer':
        var newValue = String(contents).replace(/orderer/g, value);
        resolve(newValue);
        break;
      case 'portpeer':
        var newValue = String(contents).replace(/portpeer/g, value);
        resolve(newValue);
        break;
      case 'portpeer2':
        var newValue = String(contents).replace(/portpeer2/g, value);
        resolve(newValue);
        break;     
      case 'wallet-name':
        var newValue = String(contents).replace(/wallet-name/g, value);
        resolve(newValue);
        break;
      default:
        console.log('Não encontou a opção');
    }
  } )
};