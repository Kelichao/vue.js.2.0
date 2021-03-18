var a = {
	"id": "36cde52a-d24c-4bff-8871-96e306495847",
	"name": "釜山水库",
	"description": "",
	"auth": null,
	"events": null,
	"variables": [],
	"order": [
		"d43e579c-6900-4fa3-90da-279acd75eb07",
		"6f5bfc91-e498-49f0-b4a6-d47c75952b60",
		"b277d7bb-8cbf-4718-87cb-6c28f63c466c",
		"312b9f1e-ce83-4e08-a7c0-af5eac22abaf"
	],
	"folders_order": [],
	"protocolProfileBehavior": {},
	"folders": [],
	"requests": [
		{
			"id": "312b9f1e-ce83-4e08-a7c0-af5eac22abaf",
			"name": "获取因子列表11111",
			"url": "http://172.19.6.231:8893/wms/wms/outside/v1/interpolation/factors.do",
			"description": "",
			"data": null,
			"dataOptions": null,
			"dataMode": null,
			"headerData": [],
			"method": "GET",
			"pathVariableData": [],
			"queryParams": [],
			"auth": null,
			"events": [],
			"folder": null,
			"headers": "",
			"pathVariables": {}
		},
		{
			"id": "6f5bfc91-e498-49f0-b4a6-d47c75952b60",
			"name": "地图站点详情",
			"url": "http://172.19.6.231:8893/wms/wms/outside/v1/map/site-data.do?siteId=2c90827271c3757f0171c4b793e70006&dateType=1440&dateTime=1599494400000",
			"description": "",
			"data": null,
			"dataOptions": null,
			"dataMode": null,
			"headerData": [],
			"method": "GET",
			"pathVariableData": [],
			"queryParams": [
				{
					"key": "siteId",
					"value": "2c90827271c3757f0171c4b793e70006",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "dateType",
					"value": "1440",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "dateTime",
					"value": "1599494400000",
					"equals": true,
					"description": null,
					"enabled": true
				}
			],
			"auth": null,
			"events": [],
			"folder": null,
			"headers": "",
			"pathVariables": {}
		},
		{
			"id": "b277d7bb-8cbf-4718-87cb-6c28f63c466c",
			"name": "获取站点历史数据",
			"url": "http://172.19.6.231:8893/wms/wms/outside/v1/map/site-history-data.do?siteId=2c90827271c3757f0171c4b793e70006&dateType=1440&beginTime=1598889600000&endTime=1599062400000&factorCode=NH3",
			"description": "",
			"data": null,
			"dataOptions": null,
			"dataMode": null,
			"headerData": [],
			"method": "GET",
			"pathVariableData": [],
			"queryParams": [
				{
					"key": "siteId",
					"value": "2c90827271c3757f0171c4b793e70006",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "dateType",
					"value": "1440",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "beginTime",
					"value": "1598889600000",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "endTime",
					"value": "1599062400000",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "factorCode",
					"value": "NH3",
					"equals": true,
					"description": null,
					"enabled": true
				}
			],
			"auth": null,
			"events": [],
			"folder": null,
			"headers": "",
			"pathVariables": {}
		},
		{
			"id": "d43e579c-6900-4fa3-90da-279acd75eb07",
			"name": "地图整体水质查询",
			"url": "http://172.19.6.231:8893/wms/wms/outside/v1//map/total-data.do?factorCode=TP&dateType=1440&dateTime=1599494400000",
			"description": "",
			"data": null,
			"dataOptions": null,
			"dataMode": null,
			"headerData": [],
			"method": "GET",
			"pathVariableData": [],
			"queryParams": [
				{
					"key": "factorCode",
					"value": "TP",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "dateType",
					"value": "1440",
					"equals": true,
					"description": null,
					"enabled": true
				},
				{
					"key": "dateTime",
					"value": "1599494400000",
					"equals": true,
					"description": null,
					"enabled": true
				}
			],
			"auth": null,
			"events": [],
			"folder": null,
			"headers": "",
			"pathVariables": {}
		}
	]
}