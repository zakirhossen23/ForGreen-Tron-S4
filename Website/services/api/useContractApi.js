import TronWeb from 'tronweb';

export default async function useContract(privateKey) {
	let contract = null;

	const fullNode = 'https://api.nileex.io';
	const solidityNode = 'https://api.nileex.io';
	const eventServer = 'https://event.nileex.io';
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	contract = await tronWeb.contract().at('TUpepEX2yeQqwPJ3AvX526z5MwTZj9ygxE');

	return contract;
}

