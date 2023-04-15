import TronWeb from 'tronweb';

export default async function useContract(privateKey) {
	let contract = null;

	const fullNode = 'https://api.nileex.io';
	const solidityNode = 'https://api.nileex.io';
	const eventServer = 'https://event.nileex.io';
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	contract = await tronWeb.contract().at('TPSazvJzv25M8P6tpb8maJ51x1mEMyYPns');

	return contract;
}

