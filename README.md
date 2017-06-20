# CrmJS

CrmJS is a tiny JavaScript library to help reduce the complexities of interacting with the Web API and forms and make code more readable by hiding away all the long Xrm functions.

This library will enable you to focus on what you are trying to do and not obfuscate your code with Microsoft Dynamics CRM XRM calls.

Compatibility: Microsoft Dynamics 2016/365 (On-Premise/Online)
(May work with older versions but is untested at this point)

- jQuery Promises Support
- Works without jQuery
- Removes need for url prefixes when making API calls
- Extracts lookup objects from arrays

> This library was created to remove common wrapper functions I was using for most scripts. This way, all the CRM touchpoints are in this library and any future changes to the Web API or Xrm object can be addressed in one place.

> I hope this may help someone and would appreciate any feedback you may have.

# Documentation

1. [Changing the CRM Web API version](#changing-the-crm-web-api-version)<br />
2. [API](#api)<br />
    2.1 [GET](#get)<br />
    2.2 [POST](#post)<br />
    2.3 [PUT](#put)<br />
    2.4 [Workflows](#workflows)<br />
    2.5 [Actions](#actions)<br />
3. [Form](#form)<br />
    3.1 [Get Type](#get-type)<br />
    3.2 [Get Value](#get-value)<br />
    3.3 [Set Value](#set-value)<br />
    3.4 [Set Lookup Value](#set-lookup-value)<br />
    3.5 [Get GUID of Current Record](#get-guid-of-current-record)<br />
    3.6 [Make Field Mandatory](#make-field-mandatory)<br />
    3.7 [Make Field Optional](#make-field-optional)<br />
    3.8 [Show Field](#show-field)<br />
    3.9 [Hide Field](#hide-field)<br />
    3.10 [Show Tab](#show-tab)<br />
    3.11 [Hide Tab](#hide-tab)<br />
    3.12 [Show Section](#show-section)<br />
    3.13 [Hide Section](#hide-section)<br />
    3.14 [Make Field Read-Only](#make-field-read-only)<br />
    3.15 [Make Field Editable](#make-field-editable)<br />
    3.16 [Add Field Error](#add-field-error)<br />
    3.17 [Clear Field Error](#clear-field-error)<br />

### Changing the CRM Web API version
The api version can be updated using the crmJsConfig object. The default version is 8.1.

The value passed to the apiVersion property must be of type string.

```
crmJsConfig.apiVersion = '8.0'
```

## API
Using the API object, you can query the Web API using GET, POST, PUT without the url prefixes as well as trigger workflows and actions.

### GET
You can make GET requests to the Web API without needing the full url.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| url | Mandatory | The last part of the request, usually the plural logical name. |
| callback | Mandatory (without jQuery Promises) | A function to capture the result of the request. |
| error | Optional | A function to capture a failed request. |

**jQuery Promises**<br /><br />
If jQuery is loaded on the page and you do not provide a callback, a jQuery promise will be returned.
```
crmJs.api.get('accounts').then(function (result) {
	console.log(result);
});
```

**jQuery Ajax**<br /><br />
If jQuery is loaded on the page and a callback function is passed in as the second parameter, a traditional jQuery Ajax call will be triggered.
```
crmJs.api.get('accounts', function (result) {
	console.log(result);
});
```
An optional error function can be passed to the function as the third parameter to capture errors with the Ajax call.
```
crmJs.api.get('accounts', function (result) {
	console.log('success');
}, function (e) {
	console.log('error')
});
```
**Without jQuery**<br /><br />
If jQuery is not loaded on the page, a XMLHttpRequest will be called, with the second parameter callback function becoming mandatory.
```
crmJs.api.get('accounts', function (result) {
	console.log(result);
});
```

Similarly to the jQuery ajax call, an error function can be passed in as the third parameter which will fire if the request fails.

### POST
You can make POST requests to the Web API without needing the full url.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| url | Mandatory | The last part of the request, usually the plural logical name. |
| data | Mandatory | The data you wish to send in the post request. |
| callback | Mandatory (without jQuery Promises) | A function to capture the result of the request. |
| error | Optional | A function to capture a failed request. |

**jQuery Promises**<br /><br />
If jQuery is loaded on the page and you do not provide a callback, a jQuery promise will be returned.
```
crmJs.api.post('accounts', data).then(function (result) {
	console.log(result);
});
```
**jQuery Ajax**<br /><br />
If jQuery is loaded on the page and a callback function is passed in as the second parameter, a traditional jQuery Ajax call will be triggered.
```
crmJs.api.get('accounts', data, function (result) {
	console.log(result);
});
```
An optional error function can be passed to the function as the third parameter to capture errors with the Ajax call.
```
crmJs.api.get('accounts', data, function (result) {
	console.log(‘success’);
}, function (e) {
	console.log('error')
});
```
**Without jQuery**<br /><br />
If jQuery is not loaded on the page, a XMLHttpRequest will be called, with the second parameter callback function becoming mandatory.
```
crmJs.api.get('accounts', data, function (result) {
	console.log(result);
});
```
Similarly to the jQuery ajax call, an error function can be passed in as the third parameter which will fire if the request fails.

### PUT
>Works in the same way as POST requests and has the same parameters, but uses the PUT protocol.

### Workflows
Using CrmJS, you can run a workflow against a record.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| workflowId | Mandatory | The guid of the workflow to execute. |
| pluralEntityName | Mandatory | The plural name of the entityType to execute (e.g. accounts). |
| id | Mandatory | The guid of the record to execute against. |
| successMessage | Optional | The message which will show as an alert once the workflow has been executed. |

```
crmJs.api.workflows.run(
    'CF5EC6FB-A10F-46AC-A999-C9C5F8204B54',
    'accounts',
    crmJs.form.getCurrentEntityId(), 
    'Workflow run'
);
```

### Actions
Using CrmJS, you can run an action against a record.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| actionName | Mandatory | The unique name of the action. |
| pluralEntityName | Mandatory | The plural name of the entityType to execute (e.g. accounts). |
| id | Mandatory | The guid of the record to execute against. |
| callback | Optional | Function to be called once the action has been executed. |

```
var recordId = crmJs.form.getCurrentEntityId();
var actionName = 'dgd_CopySalesOrderAction';
var pluralEntityName = ‘salesorders’;
crmJs.api.actions.run(
    actionName, 
    pluralEntityName, 
    recordId, 
    function (result) {
	    //retrieve return values from result
});
```
## Form
Using the form object, you can interact with your CRM forms and customise field behaviour.

### Get Type
Retrieves the current form type.
See [CRM Form Types](https://msdn.microsoft.com/en-us/library/gg327828.aspx#BKMK_getFormType)

**Return Values**<br /><br />

| Type | Description |
| ------ | ------ |
| String | Returns the form type in the form a string |

```
if (crmJs.form.getType() == 'Create') {
	//New form
};
```

### Get Value
Gets the value of a form field
>The function will return the value based on the type of field you are retrieving from.
>Lookups will return an object instead of an array.


| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

**Return Values**<br /><br />

| Type | Description |
| ------ | ------ |
| Varied | Based on the type of form field. |

```
var customer = crmJs.form.getValue('customerid');
console.log(customer.name);
```



### Set Value
Sets the value of a form field.
>This is not intended to be used for lookups. It will work if an array containing an object is passing in as the value, but there is a dedicated function for this.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |
| value | Mandatory | The value to set the form field. |

```
crmJs.form.setValue('name', 'hello world');
```

### Set Lookup Value
Sets the value of a lookup field. Removes the need for wrapping the object in an array.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |
| id | Mandatory | The guid of the target record to set for the lookup. |
| name | Mandatory | The name of the target record to set for the lookup. |
| entityType | Mandatory | The logical name of the target record to set for the lookup. |

```
crmJs.form.setLookup(
    'CF5EC6FB-A10F-46AC-A999-C9C5F8204B54',
    'John Doe',
    'systemuser'
);
```

### Get GUID of Current Record
Gets the guid of the current record.

**Return Values**<br /><br />

| Type | Description |
| ------ | ------ |
| String | The guid of the current record. |

```
var currentRecordId = crmJs.form.getCurrentEntityId();
```

### Make Field Mandatory
Makes a form field mandatory.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.businessRequired.setRequired('telephone1');
```

### Make Field Optional
Makes a form field optional.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.businessRequired.setOptional('telephone1');
```

### Show Field
Makes a form field visible.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.visibility.setVisible('telephone1');
```

### Hide Field
Makes a form field hidden.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.visibility.setHidden('telephone1');
```

### Show Tab
Makes a tab on the form visible.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| tabName | Mandatory | The name of the tab. |

```
crmJs.form.visibility.tabs.setVisible('DETAILS_TAB');
```

### Hide Tab
Makes a tab on the form hidden.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| tabName | Mandatory | The name of the tab. |

```
crmJs.form.visibility.tabs.setHidden('DETAILS_TAB');
```

### Show Section
Makes a section on the form visible.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| tabName | Mandatory | The name of the tab the section is in. |
| sectionName | Mandatory | The name of the section. |

```
crmJs.form.visibility.sections.setVisible('DETAILS_TAB', 'ADDRESS');
```

### Hide Section
Makes a section on the form hidden.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| tabName | Mandatory | The name of the tab the section is in. |
| sectionName | Mandatory | The name of the section. |

```
crmJs.form.visibility.sections.setHidden('DETAILS_TAB', 'ADDRESS');
```

### Make Field Read-Only
Disables a field on the form.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.readonly.disable('customerid');
```

### Make Field Editable
Enables a field on the form.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.readonly.enable('customerid');
```

### Add Field Error
Adds an error message to a field on the form.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |
| message | Mandatory | The error message to be shown on the field. |

```
crmJs.form.fieldError.set('customerid', 'Hello world');
```

### Clear Field Error
Clears the error messages of a field on the form.

| Parameter | Required | Description |
| ------ | ------ | ------ |
| attributeName | Mandatory | The schema name of the form field. |

```
crmJs.form.fieldError.clear('customerid');
```
