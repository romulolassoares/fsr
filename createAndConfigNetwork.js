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
    const templateConfigTx = path.join(process.cwd(), '/template/configtx');
    
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
          case 'OrganizationsOrgs':
            var newValue = String(contents).replace(/OrganizationsOrgs/g, value);
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
    async function copyFiles(){
      console.log(pathNetwork)
      const  newBase = path.join(pathNetwork.trim(), 'base');
      await createNewFile('base.yaml', newBase, templateBase);
      await createNewFile('docker-compose-ca.yaml', newBase, templateBase);
      await createNewFile('docker-compose-cli.yaml', newBase, templateBase);
      await createNewFile('docker-compose-couchdb.yaml', newBase, templateBase);
      await createNewFile('docker-compose-orderer.yaml', newBase, templateBase);
      await createNewFile('docker-compose-peer.yaml', newBase, templateBase);
      await createNewFile('docker-compose.yaml', newBase, templateBase);
      const  newNetworkConfig = path.join(pathNetwork.trim(), 'networkconfig');
      await createNewFile('ca.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('certificateAuthorities.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('chaincode.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('channel.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('identityPrivateSig.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('network-config.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('orderers.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('org.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('organizationsCA.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('organizationsOrgMSP.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('peer.yaml', newNetworkConfig, templateNetworkConfig);
      await createNewFile('peerchannel.yaml', newNetworkConfig, templateNetworkConfig);
      const  newCrypto = path.join(pathNetwork.trim(), 'crypto');
      await createNewFile('cryptogen.yaml', newCrypto, templateCrypto);
      await createNewFile('peer-cryptogen.yaml', newCrypto, templateCrypto);
      const newConfigTX = path.join(pathNetwork.trim(), 'configtx');
      await createNewFile('aplication-configtx-base.yaml', newConfigTX, templateConfigTx);
      await createNewFile('channel-configtx-base.yaml', newConfigTX, templateConfigTx);
      await createNewFile('configtx.yaml', newConfigTX, templateConfigTx);
      await createNewFile('orderegenesis-configtx-base.yaml', newConfigTX, templateConfigTx);
      await createNewFile('orderer-configtx-base.yaml', newConfigTX, templateConfigTx);
      await createNewFile('ordererpeer-configtx-base.yaml', newConfigTX, templateConfigTx);
      await createNewFile('peer-configtx-base.yaml', newConfigTX, templateConfigTx);

    }
    //++++++++++++++++++++++++Start++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Altera o escrito dos arquivos
    // da pasta base --------------------------------------------
    async function changeBase(folder, networkName){
      const base = path.join(pathNetwork, folder,'/base.yaml');

      await changeWrite(base, 'networkname', networkName);    
    }
    
    async function changeDocker(folder, networkName){
      const dockerCompose = path.join(pathNetwork, folder, '/docker-compose.yaml');
    
      await changeWrite(dockerCompose, 'networkname', networkName);
    
    }
    
    async function changeDockerComposeCA(folder, orgName, keyOrg, portCA, networkName){
      const dockerComposeCA = path.join(pathNetwork, folder, '/docker-compose-ca.yaml');
    
      await changeWrite(dockerComposeCA, 'orgname', orgName);
      await changeWrite(dockerComposeCA, 'keyorg', keyOrg);
      await changeWrite(dockerComposeCA, 'portca', portCA);
      await changeWrite(dockerComposeCA, 'networkname', networkName);
    
    }
    
    async function changeDockerComposeCLI(folder, networkName){
      const dockerComposeCLI = path.join(pathNetwork, folder, '/docker-compose-cli.yaml');
    
      await changeWrite(dockerComposeCLI, 'networkname', networkName);
    };
    
    async function changedockerComposeCouchDB(folder, networkName, couchdbName, couchdbUser, couchdbPassword, portCouch){
      const dockerComposeCouchDB = path.join(pathNetwork, folder, '/docker-compose-couchdb.yaml');
    
      await changeWrite(dockerComposeCouchDB, 'couchdbname', couchdbName);
      await changeWrite(dockerComposeCouchDB, 'couchdbuser', couchdbUser);
      await changeWrite(dockerComposeCouchDB, 'couchdbpassword', couchdbPassword);
      await changeWrite(dockerComposeCouchDB, 'portcouch', portCouch);
      await changeWrite(dockerComposeCouchDB, 'networkname', networkName);
    }
    
    async function changeDockerComposeOrderer(folder, networkName, portOrderer, ordererPeer){
      const dockerComposeOrderer = path.join(pathNetwork, folder, '/docker-compose-orderer.yaml');
    
      await changeWrite(dockerComposeOrderer, 'networkname', networkName);
      await changeWrite(dockerComposeOrderer, 'portorderer', portOrderer);
      await changeWrite(dockerComposeOrderer, 'ordererpeer', ordererPeer);
    }
    
    async function changeDockerComposePeer(folder, orgName, peerNumber, couchdbName, portCouch, portPeer2, networkName){
      const dockerComposePeer = path.join(pathNetwork, folder, '/docker-compose-peer.yaml');
    
      await changeWrite(dockerComposePeer, 'orgname', orgName);
      await changeWrite(dockerComposePeer, 'peernumber', peerNumber);
      await changeWrite(dockerComposePeer, 'couchdbname', couchdbName);
      await changeWrite(dockerComposePeer, 'portcouch', portCouch);
      await changeWrite(dockerComposePeer, 'portpeer2', portPeer2);
      await changeWrite(dockerComposePeer, 'networkname', networkName);
    }
    //--------------------------------------------------------------------------------
    // da pasta networkconfig---------------------------------------------------------
    async function changeCA(folder, portCA, orgName){
      const ca = path.join(pathNetwork, folder, '/ca.yaml');
    
      await changeWrite(ca, 'portca', portCA);
      await changeWrite(ca, 'orgname', orgName);
    }

    async function changeChannel(folder, ChannelName) {
      const channel = path.join(pathNetwork, folder, '/channel.yaml');

      await changeWrite(channel, 'Channelname', ChannelName);
    }

    async function changeIdentityPrivateSig(folder, orgName, keyOrg){
      const identityPrivateSig = path.join(pathNetwork, folder, '/identityPrivateSig.yaml');

      await changeWrite(identityPrivateSig, 'orgname', orgName);
      await changeWrite(identityPrivateSig, 'keyorg', keyOrg);
    }

    async function changeNetworkConfig(folder) {
      const netowrkConfig = path.join(pathNetwork, folder, '/network-config.yaml');

      await changeWrite(netowrkConfig, 'networkname', networkName);
      await changeWrite(netowrkConfig, 'description', description);
    }

    async function changeOrderers(folder, portOrderer, orderer){
      const orderers = path.join(pathNetwork, folder, '/orderers.yaml');

      await changeWrite(orderers, 'portorderer', portOrderer);
      await changeWrite(orderers, 'orderer', orderer);
    }

    async function changeOrg(folder, networkName, orgName, description, walletName){
      const org = path.join(pathNetwork, folder, '/org.yaml');

      await changeWrite(org, 'networkname', networkName);
      await changeWrite(org, 'orgname', orgName);
      await changeWrite(org, 'description', description);
      await changeWrite(org, 'wallet-name', walletName);
    }

    async function changeOrganizationsCA(folder, orgName, keyOrg){
      const organizationsCA = path.join(pathNetwork, folder, '/organizationsCA.yaml');

      await changeWrite(organizationsCA, 'orgname', orgName);
      await changeWrite(organizationsCA, 'keyorg', keyOrg);
    }

    async function changeOrganizationsOrgMSP(folder, orgName, peersOrgs){
      const organizationsOrgMSP = path.join(pathNetwork, folder, '/organizationsOrgMSP.yaml');

      await changeWrite(organizationsOrgMSP, 'orgname', orgName);
      await changeWrite(organizationsOrgMSP, 'peersOrgs', peersOrgs);
    }

    async function changePeer(folder, portPeer, orgName, peerNumber){
      const peer = path.join(pathNetwork, folder, '/peer.yaml');

      await changeWrite(peer, 'portpeer', portPeer);
      await changeWrite(peer, 'orgname', orgName);
      await changeWrite(peer, 'peernumber', peerNumber);
    }

    async function changePeerChannel(folder, orgName, peerNumber){
      const peerChannel = path.join(pathNetwork, folder, '/peerchannel.yaml');

      await changeWrite(peerChannel, 'orgname', orgName);
      await changeWrite(peerChannel, 'peernumber', peerNumber);
    }
    //--------------------------------------------------------------------------------
    // da pasta crypto----------------------------------------------------------------
    async function changeCryptogen(folder, orderer){
      const cryptogen = path.join(pathNetwork, folder, '/cryptogen.yaml');

      await changeWrite(cryptogen, 'orderer', orderer);
    }
    async function changePeerCryptogen(folder, orgName, countPeer){
      const peerCryptogen = path.join(pathNetwork, folder, 'peer-cryptogen.yaml');

      await changeWrite(peerCryptogen, 'orgname', orgName);
      await changeWrite(peerCryptogen, 'countpeer', countPeer);
    }
    //--------------------------------------------------------------------------------
    // da pasta crypto----------------------------------------------------------------
    async function changeAplicationCongitxBase(folder, OrganizationsOrgs){
      const aplicationConfigtxBase = path.join(pathNetwork, folder, 'aplication-configtx-base.yaml');

      await changeWrite(aplicationConfigtxBase, 'OrganizationsOrgs', OrganizationsOrgs);
    }
    async function changeChannelConfigtxBase(folder,OrganizationsOrgs){
      const configtx = path.join(pathNetwork, folder, 'channel-configtx-base.yaml');

      await changeWrite(configtx, 'OrganizationsOrgs', OrganizationsOrgs);
    }
    async function changeOrdererGenesisConfigtxBase(folder, OrganizationsOrgs){
      const ordererGenesisConfigtxBase = path.join(pathNetwork, folder, 'orderegenesis-configtx-base.yaml');

      await changeWrite(ordererGenesisConfigtxBase, 'OrganizationsOrgs', OrganizationsOrgs);
    }
    async function changeOrdererConfigtxBase(folder, orderer, portorderer){
      const ordererConfigtxBase = path.join(pathNetwork, folder, 'orderer-configtx-base.yaml');

      await changeWrite(ordererConfigtxBase, 'portorderer', portorderer);
      await changeWrite(ordererConfigtxBase, 'orderer', orderer);
    }
    async function changePeerConfigtxBase(folder, orgName){
      const peerConfigtxBase = path.join(pathNetwork, folder, 'peer-configtx-base.yaml');

      await changeWrite(peerConfigtxBase, 'orgname', orgName);
    }
    //+++++++++++++++++++++++End+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Efetua as funções
    async function make() {
      // Define as variáveis
      const orgName = 'nome_da_organização';
      const networkName = 'nome_da_network';
      const keyOrg = 'chave_da_org';
      const portCA = 'porta_Ca';
      const couchdbName = 'Nome_do_couchdb';
      const couchdbUser = 'usuário_do_couchdb';
      const couchdbPassword = 'senha_do_couchdb';
      const portCouch = 'porta_Couch';
      const portOrderer= 'porta_ordem';
      const ordererPeer= 'peer_ordem';
      const peerNumber= 'numero_peer';
      const portPeer= 'porta_peer';
      const portPeer2= 'porta_peer2';
      const orderer = '_ordem_';
      const description = 'Descrição';
      const walletName = 'nome_da_carteira'
      const peersOrgs = 'peers_da_organização'
      const countPeer = 'Total_de_peers';
      const OrganizationsOrgs = "Orgs_da_Organização";
      const ChannelName = "Nome_do_canal";

      const folderBase = 'base';    
      const folderNetworkConfig = 'networkconfig';
      const folderCrypto = 'crypto';
      const folderConfigtx = 'configtx';
      await copyFiles();
      // Troca as informações dos arquivos da pasta base
      await changeBase(folderBase, networkName);    
      await changeDocker(folderBase, networkName);    
      await changeDockerComposeCA(folderBase, orgName, keyOrg, portCA, networkName);    
      await changeDockerComposeCLI(folderBase, networkName);
      await changedockerComposeCouchDB(folderBase, networkName, couchdbName, couchdbUser, couchdbPassword, portCouch);    
      await changeDockerComposeOrderer(folderBase, networkName, portOrderer, ordererPeer);
      await changeDockerComposePeer(folderBase, orgName, peerNumber, couchdbName, portCouch, portPeer2, networkName);
      // Troca as informações dos arquivos da pasta networkconfig
      await changeCA(folderNetworkConfig, portCA, orgName);
      await changeChannel(folderNetworkConfig, ChannelName);
      await changeIdentityPrivateSig(folderNetworkConfig, orgName, keyOrg);
      await changeOrderers(folderNetworkConfig, portOrderer, orderer);
      await changeOrg(folderNetworkConfig, networkName, orgName, description, walletName);
      await changeOrganizationsCA(folderNetworkConfig, orgName, keyOrg);
      await changeOrganizationsOrgMSP(folderNetworkConfig, orgName, peersOrgs);
      await changePeer(folderNetworkConfig, portPeer, orgName, peerNumber);
      await changePeerChannel(folderNetworkConfig, orgName, peerNumber);
      // Troca as informações dos arquivos da pasta crypto
      await changeCryptogen(folderCrypto, orderer);
      await changePeerCryptogen(folderCrypto, orgName, countPeer);
      // Troca as informações dos arquivos da pasta configtx
      await changeAplicationCongitxBase(folderConfigtx, OrganizationsOrgs);
      await changeChannelConfigtxBase(folderConfigtx, OrganizationsOrgs);
      await changeOrdererGenesisConfigtxBase(folderConfigtx, OrganizationsOrgs);
      await changeOrdererConfigtxBase(folderConfigtx, orderer, portOrderer);
      await changePeerConfigtxBase(folderConfigtx, orgName);

    }

   

    await fs.stat(pathNetwork, async function(err, stats){
      if(err) {

        if(fs.existsSync(networks)) {
          fs.mkdirSync(pathNetwork.trim());
          fs.mkdirSync(path.join(pathNetwork.trim(), 'base'));
          fs.mkdirSync(path.join(pathNetwork.trim(), 'configtx'));
          fs.mkdirSync(path.join(pathNetwork.trim(), 'crypto'));
          fs.mkdirSync(path.join(pathNetwork.trim(), 'networkconfig'));
        } else {
          fs.mkdirSync(networks.trim());
          fs.mkdirSync(pathNetwork.trim());
          fs.mkdirSync(path.join(pathNetwork.trim(), 'base'));
          fs.mkdirSync(path.join(pathNetwork.trim(), 'configtx'));
          fs.mkdirSync(path.join(pathNetwork.trim(), 'crypto'));
          fs.mkdirSync(path.join(pathNetwork.trim(), 'networkconfig'));
        }

        await make();
      }
      else{
        console.log('Essa networks já existe');
        await make()
      }
    })

  }
}