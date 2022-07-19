define("ClientMessageBridge", ["ConfigurationConstants"],
    function(ConfigurationConstants) {
        return {
            /* Сообщения. */
            messages: {
                /* Имя сообщения. */
                "UpdatePerfumery": {
                    /* Тип сообщения — широковещательное, без указания конкретного подписчика. */
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    /* Направление сообщения — публикация. */
                    "direction": Terrasoft.MessageDirectionType.PUBLISH
                }
            },
            methods: {
                /* Инициализация схемы. */
                init: function() {
                    /* Вызов родительского метода. */
                    this.callParent(arguments);
                    /* Добавление нового конфигурационного объекта в коллекцию конфигурационных объектов. */
                    this.addMessageConfig({
                        /* Имя сообщения, получаемого по WebSocket. */
                        sender: "UpdatePerfumery",
                        /* Имя сообщения, с которым оно будет разослано. */
                        messageName: "UpdatePerfumery"
                    });
                
                }
            }
        };
    });