const mongoose = require('mongoose')
const Schema = mongoose.Schema

const performanceSchema = new Schema(
	{
		'Sort Order': Number,
		Investment_ID: Number,
		Investment_Name: Number,
		Program_Form_Set_ID: Number,
		Program_Form_Set_Name: String,
		Agency_ID: Number,
		Agency_Name: String,
		Program_ID: Number,
		Program_Name: String,
		Impact_Area_ID: Number,
		Impact_Area: String,
		Outcome_Type_ID: Number,
		Outcome_Type_Name: String,
		Standard_Outcome_ID: Number,
		Strategy_ID: String,
		Strategy_Name: Number,
		Outcome_Indicator_Type_ID: Number,
		Outcome_Indicator_Type_Name: String,
		Standard_Outcome_Indicator_ID: Number,
		Outcome_Indicator_ID: Number,
		Outcome_Indicator_Name: String,
		Form_Status: String,
		Form_Section_ID: Number,
		Form_Section_Header: String,
		'Unique Count': Schema.Types.Mixed,
		'Annual Target 2019 (if applicable)': Number
	},
	{ strict: false }
)

const Performance = mongoose.model(
	'Performance',
	performanceSchema,
	'performance'
)

module.exports = Performance
