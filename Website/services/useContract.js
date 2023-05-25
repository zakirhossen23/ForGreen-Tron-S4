import { useState, useEffect } from 'react';

export default function useContract() {
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null
	});

	useEffect(() => {
		const fetchData = async () => {
			try {

				if (window.localStorage.getItem("login-type") === "tronlink"){
					const contract = { contract: null, signerAddress: null }
	
					contract.contract =  await window?.tronWeb?.contract().at('TR4fkthXhTsXmVFmMTco7eDcApx3aU9KiY');
					contract.signerAddress =  window?.tronWeb?.defaultAddress?.base58;
					window.contract = contract.contract;
					setContractInstance(contract);
				}
			} catch (error) {
				console.error(error);
			}
		};

		setTimeout(()=>{
			fetchData();
		},1500)
		
	}, []);

	return contractInstance;
}
