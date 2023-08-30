export const header = 'The data is like this:\n';

export const format =
	'\n\nI would like to only have the following JSON format.\nFormat:\n{"merchant": "Merchant name", \n"category": "Select one(Food and Dining, Transportation, Housing and Utilities, Entertainment and Leisure, Shopping, Health and Wellness, Personal Care and Beauty, Travel and Vacation, Education and Learning, Technology and Electronics, Gifts and Donations, Home and Garden, Finances and Fees, Other)", \n"date": "YYYY-MM-DD", \n"description": "string", \n"paymentMethod": "Select one(Cash, Credit Card, Debit Card, Check)", \n"amount": "only numbers, including tax and tips", \n"items": ["item1", "item2"] (Exclude irrelevant names to the category(label numbers, price, total etc.))\n}';

export const inform =
	'\n\nSupplementary Information:\nIf any of the fields cannot be found, leave them empty. DO NOT PROVIDE CHOICES NOT GIVEN.';
