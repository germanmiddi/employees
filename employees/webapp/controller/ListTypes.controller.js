sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("employees.controller.ListTypes", {
            onAfterRendering: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel()
                oJSONModel.loadData("./localService/mockdata/ListData.json", false)
                oJSONModel.attachRequestCompleted(function(oEventModel){
                    console.log(JSON.stringify(oJSONModel.getData()))
                })
                this.getView().setModel(oJSONModel)
                
            },
          
        });
    });
