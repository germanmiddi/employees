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

        return Controller.extend("employees.controller.View1", {
            onAfterRendering: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel()
                var oView = this.getView()
                var i18nBundle = oView.getModel("i18n").getResourceBundle()

                // var oJSON = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key: "US",
                //             text: i18nBundle.getText("countryUS")
                //         },
                //         {
                //             key: "UK",
                //             text: i18nBundle.getText("countryUK")
                //         },
                //         {
                //             key: "ES",
                //             text: i18nBundle.getText("countryES")
                //         },
                //         {
                //             key: "PT",
                //             text: "portugal"
                //         },
                //     ]
                // }
                // oJSONModel.setData(oJSON)

                oJSONModel.loadData("./localService/mockdata/Employees.json", false)
                oJSONModel.attachRequestCompleted(function(oEventModel){
                    console.log(JSON.stringify(oJSONModel.getData()))
                })
                oView.setModel(oJSONModel)
                
            },
            onValidate: function(){
                let inputEmployee = this.byId("inputEmployee")
                let valueEmployee = inputEmployee.getValue()

                if(valueEmployee.length === 6){
                    this.byId("labelCountry").setVisible(true)
                    this.byId("slCountry").setVisible(true)
                }else{
                    this.byId("labelCountry").setVisible(false)
                    this.byId("slCountry").setVisible(false)
                }
            },
            onFilter: function () {
                let oJSON = this.getView().getModel().getData()
                let filter = []

                if(oJSON.EmployeeId !== ""){
                    filter.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId) )
                }
                if(oJSON.CountryKey !== ""){
                    filter.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey) )
                }

                let oList = this.getView().byId("tableEmployee")
                let oBinding = oList.getBinding("items")
                oBinding.filter(filter)
            },
            onClearFilter: function(){
               let oModel = this.getView().getModel()
               oModel.setProperty("/EmploeeId", "")     
               oModel.setProperty("/CountryKey", "")     
            },
            showPostalCode: function(oEvent){

                let itemPressed = oEvent.getSource()
                let oContext = itemPressed.getBindingContext()

                let objectContext = oContext.getObject()

                sap.m.MessageToast.show(objectContext.PostalCode)


            }
        });
    });
