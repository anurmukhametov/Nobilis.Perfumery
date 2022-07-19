define("NsFreePerfumeCountModule", [
    "ServiceHelper",
    "NsFreePerfumeCountModuleResources",
    "IndicatorModule",
], function (ServiceHelper) {
    /* Класс, который генерирует конфигурацию представления модуля */
    Ext.define("Terrasoft.configuration.NsFreePerfumeCountViewConfig", {
        extend: "Terrasoft.BaseModel",
        alternateClassName: "Terrasoft.NsFreePerfumeCountViewConfig",
        /* Генерирует конфигурацию представления модуля показателя валюты. */
        generate: function (config) {
            var style = config.style || "";
            var fontStyle = config.fontStyle || "";
            var wrapClassName = Ext.String.format("{0}", style);
            var id = Terrasoft.Component.generateId();
            /* Возвращаемый конфигурационный объект представления. */
            var result = {
                name: id,
                itemType: Terrasoft.ViewItemType.CONTAINER,
                classes: { wrapClassName: [wrapClassName, "indicator-module-wrapper"] },
                styles: {
                    display: "table",
                    width: "100%",
                    height: "100%",
                },
                items: [
                    {
                        name: id + "-wrap",
                        itemType: Terrasoft.ViewItemType.CONTAINER,
                        styles: {
                            display: "table-cell",
                            "vertical-align": "middle",
                        },
                        classes: { wrapClassName: ["indicator-wrap"] },
                        items: [
                            /* Отображение названия валюты. */
                            {
                                name: "indicator-caption" + id,
                                itemType: Terrasoft.ViewItemType.LABEL,
                                caption: { bindTo: "CurrencyName" },
                                classes: { labelClass: ["indicator-caption"] },
                            },
                            /* Отображение курса валюты. */
                            {
                                name: "indicator-value" + id,
                                itemType: Terrasoft.ViewItemType.LABEL,
                                caption: {
                                    bindTo: "CurrencyValue",
                                },
                                classes: { labelClass: ["indicator-value " + fontStyle] },
                            },
                        ],
                    },
                ],
            };
            return result;
        },
    });

    /* Класс модели представления модуля */
    Ext.define("Terrasoft.configuration.NsFreePerfumeCountViewModel", {
        extend: "Terrasoft.BaseModel",
        alternateClassName: "Terrasoft.NsFreePerfumeCountViewModel",
        Ext: null,
        Terrasoft: null,
        sandbox: null,
        columns: {
            /* Название валюты. */
            CurrencyName: {
                type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
                dataValueType: Terrasoft.DataValueType.TEXT,
                value: null,
            },
            /* Значение валюты. */
            CurrencyValue: {
                type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
                dataValueType: Terrasoft.DataValueType.FLOAT,
                value: null,
            },
        },
        onRender: Ext.emptyFn,
        onGetServiceInfoClick: function () {
            ServiceHelper.callService(
                "NsPerfumeryService",
                "GetFreePerfumeCount",
                function (response) {
                    return response.GetFreePerfumeCountResult;
                },
                {},
                this
            );
        },
        /* В зависимости от названия, возвращает значение валюты. Метод приведен в качестве примера. Для пользовательской задачи необходимо выбрать индивидуальный способ получения данных, например, REST API, запрос к базе данных и т. д. */
        getCurrencyValue: function (currencyName, callback, scope) {
            ServiceHelper.callService(
                "NsPerfumeryService",
                "GetFreePerfumeCount",
                function (response) {
                    debugger;
                    result = response.GetFreePerfumeCountResult;
                    callback.call(scope || this, result);
                },
                {},
                this
            );
        },
        /* Получает и отображает данные на дашборде. */
        prepareIndicator: function (callback, scope) {
            this.getCurrencyValue(
                this.get("CurrencyName"),
                function (currencyValue) {
                    this.set("CurrencyValue", currencyValue);
                    callback.call(scope);
                },
                this
            );
        },
        /* Инициализирует дашборд. */
        init: function (callback, scope) {
            this.prepareIndicator(callback, scope);
        },
    });

    /* Класс модуля дашборда. */
    Ext.define("Terrasoft.configuration.NsFreePerfumeCountModule", {
        extend: "Terrasoft.IndicatorModule",
        alternateClassName: "Terrasoft.NsFreePerfumeCountModule",
        /* Название класса модели представления дашборда. */
        viewModelClassName: "Terrasoft.NsFreePerfumeCountViewModel",
        /* Название класса-генератора конфигурации представления. */
        viewConfigClassName: "Terrasoft.NsFreePerfumeCountViewConfig",
        /* Подписка на сообщения сторонних модулей. */
        subscribeMessages: function () {
            this.sandbox.subscribe("GenerateIndicator", this.onGenerateIndicator, this, [
                this.sandbox.id,
            ]);
        },
    });

    return Terrasoft.NsFreePerfumeCountModule;
});
