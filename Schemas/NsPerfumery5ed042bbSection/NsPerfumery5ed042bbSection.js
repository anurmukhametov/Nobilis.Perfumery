define("NsPerfumery5ed042bbSection", ["ServiceHelper"], function (ServiceHelper) {
    return {
        entitySchemaName: "NsPerfumery",
        details: /**SCHEMA_DETAILS*/ {} /**SCHEMA_DETAILS*/,
        diff: /**SCHEMA_DIFF*/ [] /**SCHEMA_DIFF*/,
        methods: {
            /**
             * Добавление действия
             */
            getSectionActions: function () {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(
                    this.getButtonMenuItem({
                        Caption: { bindTo: "Resources.Strings.GetServiceInfoButtonCaption" },
                        Click: { bindTo: "onGetServiceInfoClick" },
                        Enabled: true,
                    })
                );
                return actionMenuItems;
            },

            /**
             * Вызов веб-сервиса
             */
            onGetServiceInfoClick: function () {
                ServiceHelper.callService(
                    "NsPerfumeryService",
                    "GetFreePerfumeCount",
                    function (response) {
                        var result = response.GetFreePerfumeCountResult;
                        this.showInformationDialog(`Количество продуктов без цены: ${result}`);
                    },
                    {},
                    this
                );
            },
        },
    };
});
