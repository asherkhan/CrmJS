var crmJsConfig = {
    apiVersion: '8.1'
};

var crmJs = {
    api: {
        get: function (url, callback, error) {
            if (!this.context.loaded) {
                this.context.init();
            }
            if (typeof jQuery == 'undefined') { //XMLHttpRequest
                if (typeof callback != 'function') {
                    console.error('Callback not defined');
                    return;
                }
                var xhr = new XMLHttpRequest();
                xhr.open('GET', crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Prefer', 'odata.include-annotations=OData.Community.Display.V1.FormattedValue');
                xhr.setRequestHeader('OData-MaxVersion', '4.0');
                xhr.setRequestHeader('OData-Version', '4.0');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var result = JSON.parse(xhr.responseText);
                        callback(result);
                    }
                    else {
                        console.error(xhr.responseText);
                        if (typeof error == 'function') {
                            error(xhr.responseText);
                        }
                        return;
                    }
                };
                xhr.send();
            }
            else {
                if (typeof callback != 'function') { //Jquery Promises
                    return $.ajax({
                        type: 'GET',
                        url: crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url,
                        headers: {
                            'Accept': 'application/json',
                            'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue',
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0'
                        }
                    });
                }
                else { //Jquery Standard
                    $.ajax({
                        type: 'GET',
                        url: crmJs.api.context.clientUrl + '/api/data/v8.0/' + url,
                        headers: {
                            'Accept': 'application/json',
                            'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue',
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0'
                        },
                        success: callback,
                        error: error
                    });
                }
            }
        },
        post: function (url, data, callback, error) {
            if (!this.context.loaded) {
                this.context.init();
            }
            if (typeof jQuery == 'undefined') { //XMLHttpRequest
                if (typeof callback != 'function') {
                    console.error('Callback not defined');
                    return;
                }
                var xhr = new XMLHttpRequest();
                xhr.open('POST', crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Prefer', 'odata.include-annotations=OData.Community.Display.V1.FormattedValue');
                xhr.setRequestHeader('OData-MaxVersion', '4.0');
                xhr.setRequestHeader('OData-Version', '4.0');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var result = JSON.parse(xhr.responseText);
                        callback(result);
                    }
                    else {
                        console.error(xhr.responseText);
                        if (typeof error == 'function') {
                            error(xhr.responseText);
                        }
                        return;
                    }
                };
                xhr.send(data);
            }
            else {
                if (typeof callback != 'function') { //jQuery Promises
                    return $.ajax({
                        type: 'POST',
                        url: crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url,
                        data: data,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                else { //jQuery Standard Ajax Call
                    $.ajax({
                        type: 'POST',
                        url: crmJs.api.context.clientUrl + '/api/data/v8.0/' + url,
                        data: data,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        success: callback,
                        error: error
                    });
                }
            }
        },
        put: function (url, data, callback, error) {
            if (!this.context.loaded) {
                this.context.init();
            }
            if (typeof jQuery == 'undefined') { //XMLHttpRequest
                if  (typeof callback != 'function') {
                    console.error('Callback not defined');
                    return;
                }
                var xhrUrl = crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url;
                var xhr = new XMLHttpRequest();
                xhr.open('PUT', xhrUrl);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Prefer', 'odata.include-annotations=OData.Community.Display.V1.FormattedValue');
                xhr.setRequestHeader('OData-MaxVersion', '4.0');
                xhr.setRequestHeader('OData-Version', '4.0');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var result = JSON.parse(xhr.responseText);
                        callback(result);
                    }
                    else {
                        console.error(xhr.responseText);
                        if (typeof error == 'function') {
                            error(xhr.responseText);
                        }
                        return;
                    }
                };
                xhr.send(data);                
            }
            else {
                if (typeof callback != 'function') { //jQuery Promises
                    return $.ajax({
                        type: 'PUT',
                        url: crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url,
                        data: data,
                        headers: {
                            'Content-Type': 'application/json',
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0'
                        }
                    });
                }
                else { // jQuery Standard Ajax Call
                    $.ajax({
                        type: 'PUT',
                        url: crmJs.api.context.clientUrl + '/api/data/v' + crmJsConfig.apiVersion + '/' + url,
                        data: data,
                        headers: {
                            'Content-Type': 'application/json',
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0'
                        },
                        success: callback,
                        error: error
                    });
                }
            }
        },
        workflows: {
            run: function (workflowId, pluralEntityName, id, successMessage) {
                if (!crmJs.api.context.loaded) {
                    crmJs.api.context.init();
                }
                var data = { 'EntityId': id };
                var url = crmJs.api.context.clientUrl
                    + '/api/data/v' + crmJsConfig.apiVersion + '/workflows(' + workflowId + ')/Microsoft.Dynamics.CRM.ExecuteWorkflow';
                req.open('POST', url, false);
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        req.onreadystatechange = null;
                        if (this.status == 200 || this.status == 204) {
                            if (typeof successMessage != undefined) {
                                alert(successMessage);
                            }                                
                        } else {
                            console.error(this.responseText);
                        }
                    }
                };
                req.send(JSON.stringify(data));
            }
        },
        actions: {
            run: function (action, pluralEntityName, id, callback) {
                if (!crmJs.api.context.loaded) {
                    crmJs.api.context.init();
                }

                var oDataEndpoint = crmJs.api.context.clientUrl + '/api/data/v' + 
                    crmJsConfig.apiVersion + '/' + pluralEntityName + '(' + id +')/Microsoft.Dynamics.CRM.' + action;
                var req = new XMLHttpRequest();
                req.open('POST', oDataEndpoint, false);
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        req.onreadystatechange = null;
                        if (this.status == 200 && typeof callback == 'function') {
                            var result = JSON.parse(this.responseText);
                            callback(result);
                        }
                        else if (this.status == 200 || this.status == 204) {
                            console.log('succeeded');
                        } else {
                            console.log('failed');
                            console.error(this.responseText);
                        }
                    }
                };
                req.send();
            }
        },
        context: {
            loaded: false,
            context: {},
            clientUrl: '',
            init: function () {
                this.context = this.getContext();
                this.clientUrl = this.context.getClientUrl();
                this.loaded = true;
            },
            getContext: function () {
                if (typeof GetGlobalContext != 'undefined') {
                    return GetGlobalContext();
                }
                else if (typeof Xrm != 'undefined') {
                    return Xrm.Page.context;
                }
                else { 
                    throw new Error('Context is not available.');
                }
            }
        }
    },
    form: {
        getType: function () {
            var formType = Xrm.Page.ui.getFormType();
            if (formType == null) {
                console.error('No valid form type return');
                return;
            }
            var type = '';
            switch (formType) {
                case 1: type = 'Create'; break;
                case 2: type = 'Update'; break;
                case 3: type = 'Read Only'; break;
                case 4: type = 'Disabled'; break;
                case 5: type = 'Quick Create'; break;
                case 6: type = 'Bulk Edit'; break;
                case 11: type = 'Read Optimized'; break;
                default: console.error('No valid form type returned'); break;
            }
            return formType == '' ? null : formType;            
        },
        getValue: function (attributeName) {
            var field = Xrm.Page.getAttribute(attributeName);
            if (field == null || typeof field.getValue != 'function') {
                console.error('Attribute "' + attributeName + '" does not exist on the form');
                return;
            }
            var value = field.getValue();
            if (Array.isArray(value)) {
                return value[0];
            }
            return value;
        },
        setValue: function (attributeName, value) {
            var field = Xrm.Page.getAttribute(attributeName);
            if (field == null || typeof field.getValue != 'function') {
                console.error('Attribute "' + attributeName + '" does not exist on the form');
                return false;
            }
            field.setValue(value);
            return true;
        },
        setLookup: function (attributeName, id, name, logicalName) {
            var field = Xrm.Page.getAttribute(attributeName);
            if (field == null || typeof field.getValue != 'function') {
                console.error('Attribute "' + attributeName + '" does not exist on the form');
                return;
            }
            var lookupValue = new Array();
            lookupValue[0] = {
                id: id,
                name: name,
                entityType: logicalName
            };
            field.setValue(lookupValue);
        },
        getCurrentEntityId: function () {
            return Xrm.Page.data.entity.getId();
        },
        businessRequired: {
            setRequired: function (attributeName) {
                var field = Xrm.Page.getAttribute(attributeName);
                if (field == null || typeof field.getValue != 'function') {
                    console.error('Attribute "' + attributeName + '" does not exist on the form');
                    return;
                }
                field.setRequiredLevel('required');
                return true;
            },
            setOptional: function (attributeName) {
                var field = Xrm.Page.getAttribute(attributeName);
                if (field == null || typeof field.getValue != 'function') {
                    console.error('Attribute "' + attributeName + '" does not exist on the form');
                    return;
                }
                field.setRequiredLevel('none');
            }
        },
        visibility: {
            setVisible: function (attributeName) {
                var control = Xrm.Page.getControl(attributeName);
                if (control == null || typeof control.setVisible != 'function') {
                    console.error('The control for attribute "' + attributeName + '" does not exist on the form');
                    return;
                }
                control.setVisible(true);
            },
            setHidden: function (attributeName) {
                var control = Xrm.Page.getControl(attributeName);
                if (control == null || typeof control.setVisible != 'function') {
                    console.error('The control for attribute "' + attributeName + '" does not exist on the form');
                    return;
                }
                control.setVisible(false);
            },
            tabs: {
                setVisible: function (tabName) {
                    if (Xrm.Page.ui.tabs.get(tabName) == null) {
                        console.error('Tab ' + tabName + ' does not exist on the form');
                        return;
                    }
                    Xrm.Page.ui.tabs.get(tabName).setVisible(true);
                },
                setHidden: function (tabName) {
                    if (Xrm.Page.ui.tabs.get(tabName) == null) {
                        console.error('Tab ' + tabName + ' does not exist on the form');
                        return;
                    }
                    Xrm.Page.ui.tabs.get(tabName).setVisible(false);
                }
            },
            sections: {
                setVisible: function (tabName, sectionName) {
                    if (Xrm.Page.ui.tabs.get(tabName) == null) {
                        console.error('Tab ' + tabName + ' does not exist on the form');
                        return;
                    }
                    if (Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName) == null) {
                        console.error('Section ' + sectionName + ' does not exist in the tab ' + tabName);
                        return;
                    }
                    Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName).setVisible(true);
                },
                setHidden: function (tabName, sectionName) {
                    if (Xrm.Page.ui.tabs.get(tabName) == null) {
                        console.error('Tab ' + tabName + ' does not exist on the form');
                        return;
                    }
                    if (Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName) == null) {
                        console.error('Section ' + sectionName + ' does not exist in the tab ' + tabName);
                        return;
                    }
                    Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName).setVisible(false);
                }
            }
        },
        readonly: {
            enable: function (attributeName) {
                var control = Xrm.Page.getControl(attributeName);
                if (control == null || typeof control.setDisabled != 'function') {
                    console.error('The control for attribute "' + attributeName + '" does not exist on the form');
                    return;
                }
                control.setDisabled(false);
            },
            disable: function (attributeName) {
                var control = Xrm.Page.getControl(attributeName);
                if (control == null || typeof control.setDisabled != 'function') {
                    console.error('The control for attribute "' + attributeName + '" does not exist on the form');
                    return;
                }
                control.setDisabled(true);
            }
        },
        fieldError: {
            set: function (controlName, message) {
                Xrm.Page.getControl(controlName).setNotification(message);
            },
            clear: function (controlName) {
                Xrm.Page.getControl(controlName).clearNotification();
            }
        }
    }
};
