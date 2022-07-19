define('NsPerfumery1Page', [], function () {
	return {
		entitySchemaName: 'NsPerfumery',
		attributes: {},
		modules: /**SCHEMA_MODULES*/ {
			'Chart3a38aa26-67da-4f7b-bf96-1c57352dbc1d': {
				moduleId: 'Chart3a38aa26-67da-4f7b-bf96-1c57352dbc1d',
				moduleName: 'CardWidgetModule',
				config: {
					parameters: {
						viewModelConfig: {
							widgetKey: 'Chart3a38aa26-67da-4f7b-bf96-1c57352dbc1d',
							recordId: '35950fa4-1282-4355-88bf-1330f4d0391e',
							primaryColumnValue: {
								getValueMethod: 'getPrimaryColumnValue',
							},
						},
					},
				},
			},
			// "Indicatorfa550403-684b-4618-850f-c7f83c0a9c09": {
			//     moduleId: "Indicatorfa550403-684b-4618-850f-c7f83c0a9c09",
			//     moduleName: "CardWidgetModule",
			//     config: {
			//         parameters: {
			//             viewModelConfig: {
			//                 widgetKey: "Indicatorfa550403-684b-4618-850f-c7f83c0a9c09",
			//                 recordId: "35950fa4-1282-4355-88bf-1330f4d0391e",
			//                 primaryColumnValue: {
			//                     getValueMethod: "getPrimaryColumnValue",
			//                 },
			//             },
			//         },
			//     },
			// },
			NsFreePerfumeCountModule: {
				moduleId: 'NsFreePerfumeCountModule',
				moduleName: 'NsFreePerfumeCountModule',
				config: {
					parameters: {
						viewModelConfig: {
							widgetKey: 'NsFreePerfumeCountModule',
							recordId: '35950fa4-1282-4355-88bf-1330f4d0391e',
							primaryColumnValue: {
								getValueMethod: 'getPrimaryColumnValue',
							},
						},
						CurrencyName: 'Количество продуктов без цены',
						style: 'widget-blue',
					},
					configurationMessage: 'GetIndicatorConfig',
				},
			},
		} /**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/ {
			Schema51a1e1c7Detail677f2c3e: {
				schemaName: 'Schema51a1e1c7Detail',
				entitySchemaName: 'NsPriceDynamics',
				filter: {
					detailColumn: 'Perfumery',
					masterColumn: 'Id',
				},
			},
			Schema694ca68cDetail4946ef64: {
				schemaName: 'Schema694ca68cDetail',
				entitySchemaName: 'NsInterestedContact',
				filter: {
					detailColumn: 'Perfumery',
					masterColumn: 'Id',
				},
			},
		} /**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/ {
			Manufacturer: {
				'da5a6e74-f7e0-4012-a318-dd143d20e7fc': {
					uId: 'da5a6e74-f7e0-4012-a318-dd143d20e7fc',
					enabled: true,
					removed: false,
					ruleType: 1,
					baseAttributePatch: 'Industry',
					comparisonType: 3,
					autoClean: false,
					autocomplete: false,
					type: 0,
					value: 'b8bf3236-f46b-1410-c393-00155d043205',
					dataValueType: 10,
				},
			},
		} /**SCHEMA_BUSINESS_RULES*/,
		methods: {
			/**
			 * Инициализация модуля
			 */
			init: function () {
				this.callParent(arguments)
				if (!this.isAddMode()) {
					this.subscriptionFunction()
				}
			},

			/**
			 * Удаление представления модуля
			 */
			destroy: function () {
				this.unSubscriptionFunction()
				this.callParent(arguments)
			},

			/**
			 * Подписка на серверные события
			 */
			subscriptionFunction: function () {
				Terrasoft.ServerChannel.on(
					Terrasoft.EventName.ON_MESSAGE,
					this.onServerMessageHandler,
					this
				)
			},

			/**
			 * Отписка от событий
			 */
			unSubscriptionFunction: function () {
				Terrasoft.ServerChannel.un(
					Terrasoft.EventName.ON_MESSAGE,
					this.onServerMessageHandler,
					this
				)
			},

			/**
			 * Обработчик сообщений сервера
			 * @param {*} scope
			 * @param {*} message
			 */
			onServerMessageHandler: function (scope, message) {
				if (message && message.Header.Sender === 'UpdatePerfumery') {
					this.reloadEntity(this)
				}
			},

			/**
			 * Вызывается перед открытием диалогового окна выбора изображения
			 * @returns
			 */
			beforePhotoFileSelected: function () {
				return true
			},

			/**
			 * Получение изображения по ссылке
			 * @returns
			 */
			getPhotoSrcMethod: function () {
				var imageColumnValue = this.get('Picture')
				if (imageColumnValue) {
					return this.getSchemaImageUrl(imageColumnValue)
				}
				return this.Terrasoft.ImageUrlBuilder.getUrl(
					this.get('Resources.Images.DefaultLogo')
				)
			},

			/**
			 * Обработка изменения изображения
			 * @param {*} photo
			 * @returns
			 */
			onPhotoChange: function (photo) {
				if (!photo) {
					this.set('Picture', null)
					return
				}
				this.Terrasoft.ImageApi.upload({
					file: photo,
					onComplete: this.onPhotoUploaded,
					onError: this.Terrasoft.emptyFn,
					scope: this,
				})
			},

			/**
			 * Сохранение ссылки на измененное изображение
			 * @param {*} imageId
			 */
			onPhotoUploaded: function (imageId) {
				var imageData = {
					value: imageId,
					displayValue: 'Image',
				}
				this.set('Picture', imageData)
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/ {} /**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/ [
			{
				operation: 'insert',
				name: 'Name5ee663a0-ba40-4912-9002-cba3452f4628',
				values: {
					layout: {
						colSpan: 24,
						rowSpan: 1,
						column: 0,
						row: 0,
						layoutName: 'ProfileContainer',
					},
					bindTo: 'Name',
				},
				parentName: 'ProfileContainer',
				propertyName: 'items',
				index: 0,
			},
			{
				operation: 'insert',
				name: 'Manufacturerbedb1c4f-946c-4424-96c1-99280023ebd3',
				values: {
					layout: {
						colSpan: 24,
						rowSpan: 1,
						column: 0,
						row: 1,
						layoutName: 'ProfileContainer',
					},
					bindTo: 'Manufacturer',
				},
				parentName: 'ProfileContainer',
				propertyName: 'items',
				index: 1,
			},
			{
				operation: 'insert',
				name: 'Weight2aaab522-a7aa-4e5a-b8e7-9e5e25ae30ec',
				values: {
					layout: {
						colSpan: 24,
						rowSpan: 1,
						column: 0,
						row: 2,
						layoutName: 'ProfileContainer',
					},
					bindTo: 'Weight',
				},
				parentName: 'ProfileContainer',
				propertyName: 'items',
				index: 2,
			},
			{
				operation: 'insert',
				name: 'Price12adcd9c-696d-40b7-9d32-76a5aa4b1406',
				values: {
					layout: {
						colSpan: 24,
						rowSpan: 1,
						column: 0,
						row: 3,
						layoutName: 'ProfileContainer',
					},
					bindTo: 'Price',
				},
				parentName: 'ProfileContainer',
				propertyName: 'items',
				index: 3,
			},
			{
				operation: 'insert',
				name: 'NsFreePerfumeCountModule',
				values: {
					layout: {
						colSpan: 24,
						rowSpan: 4,
						column: 0,
						row: 4,
						layoutName: 'ProfileContainer',
						useFixedColumnHeight: true,
					},
					itemType: 4,
					classes: {
						wrapClassName: ['card-widget-grid-layout-item'],
					},
				},
				parentName: 'ProfileContainer',
				propertyName: 'items',
				index: 4,
			},
			{
				operation: 'insert',
				name: 'PhotoContainer',
				values: {
					itemType: 7,
					wrapClass: ['image-edit-container'],
					layout: {
						colSpan: 12,
						rowSpan: 12,
						column: 0,
						row: 0,
					},
					items: [],
				},
				parentName: 'Header',
				propertyName: 'items',
				index: 0,
			},
			{
				operation: 'insert',
				name: 'Picture',
				values: {
					getSrcMethod: 'getPhotoSrcMethod',
					onPhotoChange: 'onPhotoChange',
					beforeFileSelected: 'beforePhotoFileSelected',
					readonly: false,
					generator: 'ImageCustomGeneratorV2.generateCustomImageControl',
				},
				parentName: 'PhotoContainer',
				propertyName: 'items',
				index: 0,
			},
			{
				operation: 'insert',
				name: 'Chart3a38aa26-67da-4f7b-bf96-1c57352dbc1d',
				values: {
					layout: {
						colSpan: 12,
						rowSpan: 12,
						column: 12,
						row: 0,
						layoutName: 'Header',
						useFixedColumnHeight: true,
					},
					itemType: 4,
					classes: {
						wrapClassName: ['card-widget-grid-layout-item'],
					},
				},
				parentName: 'Header',
				propertyName: 'items',
				index: 1,
			},
			{
				operation: 'insert',
				name: 'Tab9410546eTabLabel',
				values: {
					caption: {
						bindTo: 'Resources.Strings.Tab9410546eTabLabelTabCaption',
					},
					items: [],
					order: 0,
				},
				parentName: 'Tabs',
				propertyName: 'tabs',
				index: 0,
			},
			{
				operation: 'insert',
				name: 'Schema694ca68cDetail4946ef64',
				values: {
					itemType: 2,
					markerValue: 'added-detail',
				},
				parentName: 'Tab9410546eTabLabel',
				propertyName: 'items',
				index: 0,
			},
			{
				operation: 'insert',
				name: 'Schema51a1e1c7Detail677f2c3e',
				values: {
					itemType: 2,
					markerValue: 'added-detail',
				},
				parentName: 'Tab9410546eTabLabel',
				propertyName: 'items',
				index: 1,
			},
		] /**SCHEMA_DIFF*/,
	}
})
