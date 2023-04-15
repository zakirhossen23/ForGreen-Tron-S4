import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';

export default function DirectDonateModal({
	show,
	onHide,
	eventId,
	contract,
	senderAddress,
	EventWallet,

}) {
	const [Alert, setAlert] = useState('');

	const Web3 = require("web3")

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}


	const [Amount, AmountInput] = UseFormInput({
		type: 'text',
		placeholder: 'Amount',
	});

	function activateWarningModal(TextAlert) {
		var alertELM = document.getElementById("alert");
		alertELM.style = 'contents';
		setAlert(TextAlert)
	}
	function activateWorkingModal(TextAlert) {
		var alertELM = document.getElementById("workingalert");
		alertELM.style = 'contents';
		setAlert(TextAlert)
	}

	async function DonateCoin() {

		var DonateBTN = document.getElementById("DonateBTN");
		DonateBTN.disabled = true;

		try {
			activateWorkingModal("Transferring....")
			console.log("Donating")

			var tronweb = window.tronWeb
			var tx = await tronweb.transactionBuilder.sendTrx(EventWallet, (Number(Amount) * 1e6).toFixed(5), window?.tronWeb?.defaultAddress?.base58.toString())
			var signedTx = await tronweb.trx.sign(tx)
			var broastTx = await tronweb.trx.sendRawTransaction(signedTx)
			const Raised = Number( await contract.getEventRaised(eventId).call()) + Number(Amount);
			
			activateWorkingModal("Done! Please confirm Updating Raised...")

			const result2 = await contract._setEventRaised(eventId, Raised.toString()).send({
				feeLimit: 1_000_000_000,
				shouldPollResponse: false
			});
		
			activateWorkingModal("Success!")
			window.document.getElementsByClassName("btn-close")[0].click();
			DonateBTN.disabled = false;
			await sleep(200)
			window.location.reload();
		} catch (e) {
			console.error(e);
			activateWarningModal(`Error! Please try again!`);
			var alertELM = document.getElementById("workingalert");
			alertELM.style.display = 'none';
			return;
		}

	}
	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Donate Coin
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<div id='alert' style={{ display: 'none', fontSize: "30px" }} className="alert alert-danger" role="alert">
						{Alert}
					</div>
					<div id='workingalert' style={{ display: 'none', fontSize: "30px" }} className="alert alert-success" role="alert">
						{Alert}
					</div>
					
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Amount in TRX</Form.Label>
						{AmountInput}
					</Form.Group>
					<div className="d-grid">
						<Button variant="primary" id="DonateBTN" onClick={DonateCoin}>
							Donate
						</Button>

					</div>
				</Form>
			</Modal.Body>

		</Modal>

	);
}
