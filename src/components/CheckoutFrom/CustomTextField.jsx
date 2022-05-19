import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";
const FormInput = ({ name, label }) => {
	const { control } = useFormContext();
	return (
		<Grid item xs={12} sm={6}>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<>
						<TextField
							{...field}
							label={label}
							name={name}
							required
							fullWidth
						/>
					</>
				)}
			/>
		</Grid>
	);
};
export default FormInput;
