import { useState, useEffect } from 'react';

export default function useContract() {
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {

				if (window.localStorage.getItem("login-type") === "tronlink"){
					const contract = { contract: null, signerAddress: null }
	
					contract.contract =  await window?.tronWeb?.contract().at('TREtANk2e8WBHJ6uVSPp7bfnWT5xACrnKx');
					contract.signerAddress =  window?.tronWeb?.defaultAddress?.base58;
					window.contract = contract.contract;
					setContractInstance(contract);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return contractInstance;
}
