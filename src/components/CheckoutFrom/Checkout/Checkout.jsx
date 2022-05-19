import React, { useEffect, useState } from "react";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CssBaseline,
	CircularProgress,
} from "@material-ui/core";
import AddressFrom from "../AddressFrom";
import PaymentFrom from "../PaymentFrom";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const steps = ["shipping address", "Payment details"];

const Checkout = ({ cart }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	const classes = useStyles();
	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				setCheckoutToken(token);
			} catch (error) {}
		};

		generateToken();
	}, [cart]);
	const nextStep = () => setActiveStep((prevActionStep) => prevActionStep + 1);
	const backStep = () => setActiveStep((prevActionStep) => prevActionStep - 1);
	const next = (data) => {
		setShippingData(data);
		nextStep();
	};
	const Confirmation = () => (
		<>
			{" "}
			<Typography variant="h2" align="center">
				Finish
			</Typography>
			<Typography component={Link} to="/" variant="body2">
				Back to home
			</Typography>
		</>
	);
	const Form = () =>
		activeStep === 0 ? (
			<AddressFrom checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentFrom
				shippingData={shippingData}
				backStep={backStep}
				checkoutToken={checkoutToken}
				nextStep={nextStep}
			/>
		);

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{+activeStep === steps.length ? (
						<Confirmation />
					) : checkoutToken ? (
						<Form />
					) : (
						<div style={{ textAlign: "center" }}>
							<CircularProgress />
						</div>
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
