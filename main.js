const fs = require('fs');
const fsex = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const readline = require('readline');

module.exports = {
  async creatAndSave(nameNetwork) {

    const networks = path.join(process.cwd(), 'network');
    const pathNetwork = networks + '/' + nameNetwork;

    const templateBase = path.join(process.cwd(), '/template/base');
    const templateNetworkConfig = path.join(process.cwd(), '/template/networkconfig');
    const templateCrypto = path.join(process.cwd(), '/template/crypto');
    
    //Leitura do arquivo
    const readFile = (file) => {
      return new Promise( (resolve, reject) => {
        fs.readFile(file, (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data); 
          }
        } );
        //processLineByLine(file);
      } );
    };
    //Leitura linha por linha
    async function processLineByLine(file) {
      const fileStream = fs.createReadStream(file);
    
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      } );
      for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`${line}`);
      };
    };
    //Leitura do diretorio
    const readDirectory = (path) => {
      return new Promise ( (resolve, reject) => {
        fs.readdir(path, function(err, items) {
          if (err)
            reject(err);
          else
            resolve(items);
        } );
      } );
    };
    //Escreve no arquivo
    const writeFile = (file, contents) => {
      return new Promise ( (resolve, reject) => {
        fs.writeFile(file, contents, (err) => {
          if (err)
            return reject('Erro ao escrever o arquivo (' + err + ')');
          resolve('Seccess');
        } )
      } )
    }
    //Adiciona no arquivo
    const appendFile = ( file, contents ) => {
      return new Promise ( (resolve, reject) => {
        fs.appendFile( file, contents, (err) => {
          if (err)
            return reject('Erro ao anexar ao arquivo (' + ')' );
          resolve('Seccess');
        } )
      } )
    }
    //Altera uma informação no arquivo dado uma opção
    const replaceFile = (contents, stringReplace, value) => {
      return new Promise( (resolve, reject) => {
        switch(stringReplace) {
          case 'couchdbname':
            var newValue = String(contents).replace(/couchdbname/g, ' ' + value);
            resolve(newValue);
            break;
          case 'couchdbuser':
            var newValue = String(contents).replace(/COUCHDB_USER=/g, 'COUCHDB_USER=' + value);
            resolve(newValue);
            break;
          case 'couchdbpassword':
            var newValue = String(contents).replace(/COUCHDB_PASSWORD=/g, 'COUCHDB_PASSWORD=' + value);
            resolve(newValue);
            break;
          case 'portcouch':
            var newValue = String(contents).replace(/portcouch/g, value);
            resolve(newValue);
            break;
          case 'networkname':
            var newValue = String(contents).replace(/networkname/g, value);
            resolve(newValue);
            break;
          case 'orgname':
            var newValue = String(contents).replace(/orgname/g, value);
            resolve(newValue);
            break;
          case 'keyorg':
            var newValue = String(contents).replace(/keyorg/g, value);
            resolve(newValue);
            break;
          case 'portca':
            var newValue = String(contents).replace(/portca/g, value);
            resolve(newValue);
            break;
          case 'portorderer':
            var newValue = String(contents).replace(/portorderer/g, value);
            resolve(newValue);
            break;
          case 'ordererpeer':
            var newValue = String(contents).replace(/ordererpeer/g, value);
            resolve(newValue);
            break;
          case 'peernumber':
            var newValue = String(contents).replace(/peernumber/g, value);
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
          case 'orderer':
            var newValue = String(contents).replace(/orderer/g, value);
            resolve(newValue);
            break;
          case 'description':
            var newValue = String(contents).replace(/description/g, value);
            resolve(newValue);
            break;
          case 'wallet-name':
            var newValue = String(contents).replace(/wallet-name/g, value);
            resolve(newValue);
            break;
          case 'peersOrgs':
            var newValue = String(contents).replace(/peersOrgs/g, value);
            resolve(newValue);
            break;
          case 'countpeer':
            var newValue = String(contents).replace(/countpeer/g, value);
            resolve(newValue);
            break;
          default:
            console.log('Não encontou a opção');
        }
      } )
    };
    //Copia um arquivo para outro diretorio
    async function createNewFile(file, newDir, oldDir){
      const oldFile = path.join(oldDir, file);
      const newFile = path.join(newDir, file);
      await fs.copyFile(oldFile, newFile, (err) => {
        if (err) throw err;
      });
    }
    //Cria um novo diretorio
    async function createDir(path){
      await fs.mkdir(path,function(e){
        if(!e || (e && e.code === 'EEXIST')){
        } else {
        }
      });
    }
    //Troca a escrita
    async function changeWrite(file, option, value){
      // Efetua a alteração nos arquivos
      const fileReader = await readFile(file); // Efetua a leitura do arquivo
      const fileReplace = await Promise.resolve (replaceFile(String(fileReader), option, value.toLocaleLowerCase())); // Efetua a troca do escrito
      await Promise.resolve(writeFile(file, fileReplace)); // Escreve no arquivo com os dados alterados
    
    }
    //seleciona e copia os arquivos usando a função creatDir() e createNewFile
    async function copiaArquivos(path){
      console.log(path)
      await createNewFile('base.yaml', path, templateBase);
      await createNewFile('docker-compose-ca.yaml', path, templateBase);
      await createNewFile('docker-compose-cli.yaml', path, templateBase);
      await createNewFile('docker-compose-couchdb.yaml', path, templateBase);
      await createNewFile('docker-compose-orderer.yaml', path, templateBase);
      await createNewFile('docker-compose-peer.yaml', path, templateBase);
      await createNewFile('docker-compose.yaml', path, templateBase);

      await createNewFile('ca.yaml', path, templateNetworkConfig);
      await createNewFile('certificateAuthorities.yaml', path, templateNetworkConfig);
      await createNewFile('chaincode.yaml', path, templateNetworkConfig);
      await createNewFile('identityPrivateSig.yaml', path, templateNetworkConfig);
      await createNewFile('orderers.yaml', path, templateNetworkConfig);
      await createNewFile('org.yaml', path, templateNetworkConfig);
      await createNewFile('organizationsCA.yaml', path, templateNetworkConfig);
      await createNewFile('organizationsOrgMSP.yaml', path, templateNetworkConfig);
      await createNewFile('peer.yaml', path, templateNetworkConfig);
      await createNewFile('peerchannel.yaml', path, templateNetworkConfig);

      await createNewFile('cryptogen.yaml', pathNetwork, templateCrypto);
      await createNewFile('peer-cryptogen.yaml', pathNetwork, templateCrypto);

    }
    //++++++++++++++++++++++++Start++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Altera o escrito dos arquivos
    // da pasta base --------------------------------------------
    async function changeBase(networkName){
      const base = path.join(pathNetwork, '/base.yaml');

      await changeWrite(base, 'networkname', networkName);    
    }
    
    async function changeDocker(networkName){
      const dockerCompose = path.join(pathNetwork, '/docker-compose.yaml');
    
      await changeWrite(dockerCompose, 'networkname', networkName);
    
    }
    
    async function changeDockerComposeCA(orgName, keyOrg, portCA, networkName){
      const dockerComposeCA = path.join(pathNetwork, '/docker-compose-ca.yaml');
    
      await changeWrite(dockerComposeCA, 'orgname', orgName);
      await changeWrite(dockerComposeCA, 'keyorg', keyOrg);
      await changeWrite(dockerComposeCA, 'portca', portCA);
      await changeWrite(dockerComposeCA, 'networkname', networkName);
    
    }
    
    async function changeDockerComposeCLI(networkName){
      const dockerComposeCLI = path.join(pathNetwork, '/docker-compose-cli.yaml');
    
      await changeWrite(dockerComposeCLI, 'networkname', networkName);
    };
    
    async function changedockerComposeCouchDB(networkName, couchdbName, couchdbUser, couchdbPassword, portCouch){
      const dockerComposeCouchDB = path.join(pathNetwork, '/docker-compose-couchdb.yaml');
    
      await changeWrite(dockerComposeCouchDB, 'couchdbname', couchdbName);
      await changeWrite(dockerComposeCouchDB, 'couchdbuser', couchdbUser);
      await changeWrite(dockerComposeCouchDB, 'couchdbpassword', couchdbPassword);
      await changeWrite(dockerComposeCouchDB, 'portcouch', portCouch);
      await changeWrite(dockerComposeCouchDB, 'networkname', networkName);
    }
    
    async function changeDockerComposeOrderer(networkName, portOrderer, ordererPeer){
      const dockerComposeOrderer = path.join(pathNetwork, '/docker-compose-orderer.yaml');
    
      await changeWrite(dockerComposeOrderer, 'networkname', networkName);
      await changeWrite(dockerComposeOrderer, 'portorderer', portOrderer);
      await changeWrite(dockerComposeOrderer, 'ordererpeer', ordererPeer);
    }
    
    async function changeDockerComposePeer(orgName, peerNumber, couchdbName, portCouch, portPeer2, networkName){
      const dockerComposePeer = path.join(pathNetwork, '/docker-compose-peer.yaml');
    
      await changeWrite(dockerComposePeer, 'orgname', orgName);
      await changeWrite(dockerComposePeer, 'peernumber', peerNumber);
      await changeWrite(dockerComposePeer, 'couchdbname', couchdbName);
      await changeWrite(dockerComposePeer, 'portcouch', portCouch);
      await changeWrite(dockerComposePeer, 'portpeer2', portPeer2);
      await changeWrite(dockerComposePeer, 'networkname', networkName);
    }
    //--------------------------------------------------------------------------------
    // da pasta networkconfig---------------------------------------------------------
    async function changeCA(portCA, orgName){
      const ca = path.join(pathNetwork, '/ca.yaml');
    
      await changeWrite(ca, 'portca', portCA);
      await changeWrite(ca, 'orgname', orgName);
    }

    async function changeIdentityPrivateSig(orgName, keyOrg){
      const identityPrivateSig = path.join(pathNetwork, '/identityPrivateSig.yaml');

      await changeWrite(identityPrivateSig, 'orgname', orgName);
      await changeWrite(identityPrivateSig, 'keyorg', keyOrg);
    }

    async function changeOrderers(portOrderer, orderer){
      const orderers = path.join(pathNetwork, '/orderers.yaml');

      await changeWrite(orderers, 'portorderer', portOrderer);
      await changeWrite(orderers, 'orderer', orderer);
    }

    async function changeOrg(networkName, orgName, description, walletName){
      const org = path.join(pathNetwork, '/org.yaml');

      await changeWrite(org, 'networkname', networkName);
      await changeWrite(org, 'orgname', orgName);
      await changeWrite(org, 'description', description);
      await changeWrite(org, 'wallet-name', walletName);
    }

    async function changeOrganizationsCA(orgName, keyOrg){
      const organizationsCA = path.join(pathNetwork, '/organizationsCA.yaml');

      await changeWrite(organizationsCA, 'orgname', orgName);
      await changeWrite(organizationsCA, 'keyorg', keyOrg);
    }

    async function changeOrganizationsOrgMSP(orgName, peersOrgs){
      const organizationsOrgMSP = path.join(pathNetwork, '/organizationsOrgMSP.yaml');

      await changeWrite(organizationsOrgMSP, 'orgname', orgName);
      await changeWrite(organizationsOrgMSP, 'peersOrgs', peersOrgs);
    }

    async function changePeer(portPeer, orgName, peerNumber){
      const peer = path.join(pathNetwork, '/peer.yaml');

      await changeWrite(peer, 'portpeer', portPeer);
      await changeWrite(peer, 'orgname', orgName);
      await changeWrite(peer, 'peernumber', peerNumber);
    }

    async function changePeerChannel(orgName, peerNumber){
      const peerChannel = path.join(pathNetwork, '/peerchannel.yaml');

      await changeWrite(peerChannel, 'orgname', orgName);
      await changeWrite(peerChannel, 'peernumber', peerNumber);
    }
    //--------------------------------------------------------------------------------
    // da pasta crypto----------------------------------------------------------------
    async function changeCryptogen(orderer){
      const cryptogen = path.join(pathNetwork, '/cryptogen.yaml');

      await changeWrite(cryptogen, 'orderer', orderer);
    }
    async function changePeerCryptogen(orgName, countPeer){
      const peerCryptogen = path.join(pathNetwork, 'peer-cryptogen.yaml');

      await changeWrite(peerCryptogen, 'orgname', orgName);
      await changeWrite(peerCryptogen, 'countpeer', countPeer);
    }
    //+++++++++++++++++++++++End+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Efetua as funções
    async function make() {
      // Define as variáveis
      const orgName = 'joao';
      const networkName = 'ufjf_DCC';
      const keyOrg = '12345joao67890';
      const portCA = '127.0.0.1';
      const couchdbName = 'Banco_de_dados';
      const couchdbUser = 'admin';
      const couchdbPassword = '12345rr';
      const portCouch = '1.2.3.4';
      const portOrderer= '1000';
      const ordererPeer= '10';
      const peerNumber= '02030';
      const portPeer= '5.6.3.5';
      const portPeer2= '2.3.4.5';
      const orderer = '5.3.8.1';
      const description = 'Similique ex beatae quod maiores. Dicta magni aspernatur ipsum.';
      const walletName = 'wallet001'
      const peersOrgs = '5_dd'
      const countPeer = '5'
    
      await copiaArquivos(pathNetwork);
      // Troca as informações dos arquivos da pasta base
      await changeBase(networkName);    
      await changeDocker(networkName);    
      await changeDockerComposeCA(orgName, keyOrg, portCA, networkName);    
      await changeDockerComposeCLI(networkName);
      await changedockerComposeCouchDB(networkName, couchdbName, couchdbUser, couchdbPassword, portCouch);    
      await changeDockerComposeOrderer(networkName, portOrderer, ordererPeer);
      await changeDockerComposePeer(orgName, peerNumber, couchdbName, portCouch, portPeer2, networkName);
      // Troca as informações dos arquivos da pasta networkconfig
      await changeCA(portCA, orgName);
      await changeIdentityPrivateSig(orgName, keyOrg);
      await changeOrderers(portOrderer, orderer);
      await changeOrg(networkName, orgName, description, walletName);
      await changeOrganizationsCA(orgName, keyOrg);
      await changeOrganizationsOrgMSP(orgName, peersOrgs);
      await changePeer(portPeer, orgName, peerNumber);
      await changePeerChannel(orgName, peerNumber);
      // Troca as informações dos arquivos da pasta crypto
      await changeCryptogen(orderer);
      await changePeerCryptogen(orgName, countPeer);

    }

   

    await fs.stat(pathNetwork, async function(err, stats){
      if(err) {

        if(fs.existsSync(networks)) {
          fs.mkdirSync(pathNetwork.trim());
        } else {
          fs.mkdirSync(networks.trim());
          fs.mkdirSync(pathNetwork.trim());
        }

        await make();
      }
      else{
        console.log('Essa networks já existe');
        await make();//Deletar
      }
    })

  }
}




