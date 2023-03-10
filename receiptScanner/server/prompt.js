export const header = 'The data is like this:\n';

export const format =
	'\n\nI would like to only have the following JSON format.\nFormat:\n{"Merchant": "Merchant name", \n"Category": "Select one(Food and Dining, Transportation, Housing and Utilities, Entertainment and Leisure, Shopping, Health and Wellness, Personal Care and Beauty, Travel and Vacation, Education and Learning, Technology and Electronics, Gifts and Donations, Home and Garden, Finances and Fees, Other)", \n"Date": "YYYY-MM-DD", \n"Description": "string", \n"Payment Method": "Select one(Cash, Credit Card, Debit Card, Check)", \n"Amount": "only numbers, including tax and tips", \n"Items": ["item1", "item2"]\n}';

export const inform =
	'\n\nSupplementary Information:\nItems: Exclude names that irrelevant to the category, like label numbers, items related to price etc.\n\nIf any of the fields cannot be found, leave them empty. DO NOT PROVIDE CHOICES NOT GIVEN.';
