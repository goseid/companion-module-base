export type InputValue = number | string | boolean | Array<string | number>

export interface CompanionOptionValues {
	[key: string]: InputValue | undefined
}

/**
 * The common properties for an input field
 */
export interface CompanionInputFieldBase {
	/** The unique id of this input field within the input group */
	id: string
	/** The type of this input field */
	type:
		| 'static-text'
		| 'textinput'
		| 'dropdown'
		| 'multidropdown'
		| 'colorpicker'
		| 'number'
		| 'checkbox'
		| 'custom-variable'
	/** The label of the field */
	label: string
	/** A hover tooltip for this field */
	tooltip?: string
	/**
	 * A function called to check whether this input should be visible, based on the current options selections within the input group
	 *
	 * Note: This function must not depend on anything outside of its scope. If it does it will fail to compile and will be skipped.
	 */
	isVisible?: (options: CompanionOptionValues) => boolean
}

/**
 * A static un-editable line of text
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'important-line',
 * 	type: 'static-text',
 * 	label: 'Important info',
 * 	value: 'Some message here'
 * }
 * ```
 */
export interface CompanionInputFieldStaticText extends CompanionInputFieldBase {
	type: 'static-text'
	/** The text to show */
	value: string
}

/**
 * A colour picker input
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'bg',
 * 	type: 'colorpicker',
 * 	label: 'Background color',
 * 	'default': combineRgb(255, 0, 0)
 * }
 * ```
 */
export interface CompanionInputFieldColor extends CompanionInputFieldBase {
	type: 'colorpicker'
	/**
	 * The default color value to set when creating this action/feedback/instance
	 */
	default: number
}

/**
 * A basic text input field
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'val',
 * 	type: 'textinput',
 * 	label: 'Provide name',
 * 	'default': 'Bob'
 * }
 * ```
 */
export interface CompanionInputFieldTextInput extends CompanionInputFieldBase {
	type: 'textinput'
	/**
	 * The default text value
	 */
	default?: string
	/**
	 * Whether a value is required
	 * Note: values may not conform to this, it is a visual hint only
	 */
	required?: boolean
	/**
	 * A regex to use to inform the user if the current input is valid.
	 * Note: values may not conform to this, it is a visual hint only
	 */
	regex?: string
	/**
	 * Whether to suggest variables to the user
	 */
	useVariables?: boolean
}

export type DropdownChoiceId = string | number
/**
 * An option for a dropdown input
 *
 * Available for actions/feedbacks/config
 */
export interface DropdownChoice {
	/** Value of the option */
	id: DropdownChoiceId
	/** Label to show to users */
	label: string
}

/**
 * A dropdown input field
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'val',
 * 	type: 'dropdown',
 * 	label: 'Select name',
 * 	choices: [
 * 		{ id: 'bob', label: 'Bob' },
 * 		{ id: 'sally', label: 'Sally' },
 * 	],
 * 	default: 'bob'
 * }
 * ```
 */
export interface CompanionInputFieldDropdown extends CompanionInputFieldBase {
	type: 'dropdown'

	/** The possible choices */
	choices: DropdownChoice[]

	/** The default selected value */
	default: DropdownChoiceId

	/** Allow custom values to be defined by the user */
	allowCustom?: boolean
	/** Check custom value against regex */
	regex?: string

	/** The minimum number of entries the dropdown must have before it allows searching */
	minChoicesForSearch?: number
}

/**
 * A multi-select dropdown input field
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'val',
 * 	type: 'multidropdown',
 * 	label: 'Select name',
 * 	choices: [
 * 		{ id: 'bob', label: 'Bob' },
 * 		{ id: 'sally', label: 'Sally' },
 * 	],
 * 	default: 'bob'
 * }
 * ```
 */
export interface CompanionInputFieldMultiDropdown extends CompanionInputFieldBase {
	type: 'multidropdown'

	/** The possible choices */
	choices: DropdownChoice[]

	/** The default selected values */
	default: DropdownChoiceId[]

	/** The minimum number of entries the dropdown must have before it allows searching */
	minChoicesForSearch?: number

	/** The minimum number of selected values */
	minSelection?: number
	/** The maximum number of selected values */
	maxSelection?: number
}

/**
 * A checkbox input field
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'doit',
 * 	type: 'checkbox',
 * 	label: 'Do the thing',
 * 	default: true
 * }
 * ```
 */
export interface CompanionInputFieldCheckbox extends CompanionInputFieldBase {
	type: 'checkbox'
	/** The default value */
	default: boolean
}

/**
 * A number input field
 *
 * Available for actions/feedbacks/config
 *
 * ### Example
 * ```js
 * {
 * 	id: 'size',
 * 	type: 'number',
 * 	label: 'Target size',
 * 	default: 50,
 * 	min: 0,
 * 	max: 100
 * }
 * ```
 */
export interface CompanionInputFieldNumber extends CompanionInputFieldBase {
	type: 'number'

	/** The default value */
	default: number

	/**
	 * Whether a value is required
	 * Note: values may not conform to this, it is a visual hint only
	 */
	required?: boolean
	/**
	 * The minimum value to allow
	 * Note: values may not conform to this, it is a visual hint only
	 */
	min: number
	/**
	 * The maximum value to allow
	 * Note: values may not conform to this, it is a visual hint only
	 */
	max: number

	/** The stepping of the arrows */
	step?: number

	/** Whether to show a slider for the input */
	range?: boolean
}

/**
 * A custom variable picker input
 *
 * Available for actions
 *
 * ### Example
 * ```js
 * {
 * 	id: 'destination',
 * 	type: 'custom-variable',
 * 	label: 'Save result to variable',
 * }
 * ```
 */
export interface CompanionInputFieldCustomVariable extends CompanionInputFieldBase {
	type: 'custom-variable'
}
