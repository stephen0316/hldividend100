export const DIVIDEND_SNAPSHOT = {
  "date": "2026-11-24",
  "yieldPct": 4.33,
  "source": "computed-ttm",
  "metricType": "TTM（总股本加权）",
  "sourceUrl": "https://oss-ch.csindex.com.cn/static/html/csindex/public/uploads/file/autofile/cons/930955cons.xls",
  "sourceUrls": [
    "https://oss-ch.csindex.com.cn/static/html/csindex/public/uploads/file/autofile/cons/930955cons.xls",
    "https://datacenter-web.eastmoney.com/api/data/v1/get"
  ],
  "period": "ttm",
  "weighting": "total-shares",
  "calculation": {
    "methodology": "ttm-total-shares-adjusted-dps-v1",
    "period": "ttm",
    "weighting": "total-shares",
    "startDate": "2025-11-24",
    "endDate": "2026-11-24",
    "startExclusive": true,
    "constituentCount": 100,
    "coveredConstituents": 100,
    "dividendEventCount": 167,
    "totalMarketCap": 23670441974797.81,
    "cashEquivalentTtm": 1024265713467.651,
    "formula": "sum(currentTotalShares * splitAdjustedTrailing12MonthDps) / sum(currentTotalMarketCap)",
    "limitations": "按当前成分和总股本汇总历史分红，含送转调整；非中证官方股息率或基金分红率。配股、合并等其他公司行为未作独立复核。"
  },
  "components": [
    {
      "code": "000001",
      "name": "平安银行",
      "totalShares": 19405918198,
      "totalMarketCap": 238692793835.4,
      "close": 12.3,
      "adjustedDpsTtm": 0.609,
      "cashEquivalentTtm": 11818204182.581999,
      "events": [
        {
          "exDate": "2026-09-24",
          "reportDate": "2026-06-30",
          "cashPer10": 2.49,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-12",
          "reportDate": "2025-12-31",
          "cashPer10": 3.6,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000088",
      "name": "盐田港",
      "totalShares": 5199483346,
      "totalMarketCap": 23865628558.14,
      "close": 4.59,
      "adjustedDpsTtm": 0.195,
      "cashEquivalentTtm": 1013899252.47,
      "events": [
        {
          "exDate": "2026-06-23",
          "reportDate": "2025-12-31",
          "cashPer10": 1.07,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-11-26",
          "reportDate": "2025-06-30",
          "cashPer10": 0.88,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000333",
      "name": "美的集团",
      "totalShares": 7630380988,
      "totalMarketCap": 719010800499.24,
      "close": 94.23,
      "adjustedDpsTtm": 3.8,
      "cashEquivalentTtm": 28995447754.399998,
      "events": [
        {
          "exDate": "2026-06-29",
          "reportDate": "2025-12-31",
          "cashPer10": 38,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000423",
      "name": "东阿阿胶",
      "totalShares": 639826824,
      "totalMarketCap": 32765531657.04,
      "close": 51.21,
      "adjustedDpsTtm": 2.7803014,
      "cashEquivalentTtm": 1778911414.5247536,
      "events": [
        {
          "exDate": "2026-08-31",
          "reportDate": "2026-06-30",
          "cashPer10": 13.44811,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-25",
          "reportDate": "2025-12-31",
          "cashPer10": 14.354904,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000513",
      "name": "丽珠集团",
      "totalShares": 887907171,
      "totalMarketCap": 27036773356.95,
      "close": 30.45,
      "adjustedDpsTtm": 2.45,
      "cashEquivalentTtm": 2175372568.9500003,
      "events": [
        {
          "exDate": "2026-10-14",
          "reportDate": "2026-06-30",
          "cashPer10": 10.2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-16",
          "reportDate": "2025-12-31",
          "cashPer10": 14.3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000538",
      "name": "云南白药",
      "totalShares": 1784262603,
      "totalMarketCap": 98491295685.6,
      "close": 55.2,
      "adjustedDpsTtm": 1.583,
      "cashEquivalentTtm": 2824487700.549,
      "events": [
        {
          "exDate": "2026-04-30",
          "reportDate": "2025-12-31",
          "cashPer10": 15.83,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000589",
      "name": "贵州轮胎",
      "totalShares": 1554390104,
      "totalMarketCap": 5999945801.44,
      "close": 3.86,
      "adjustedDpsTtm": 0.13,
      "cashEquivalentTtm": 202070713.52,
      "events": [
        {
          "exDate": "2026-06-15",
          "reportDate": "2025-12-31",
          "cashPer10": 0.9,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-05",
          "reportDate": "2025-09-30",
          "cashPer10": 0.4,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000625",
      "name": "长安汽车",
      "totalShares": 9912905548,
      "totalMarketCap": 66119080005.16,
      "close": 6.67,
      "adjustedDpsTtm": 0.166823,
      "cashEquivalentTtm": 1653700642.234004,
      "events": [
        {
          "exDate": "2026-07-16",
          "reportDate": "2025-12-31",
          "cashPer10": 1.16823,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-11-28",
          "reportDate": "2025-06-30",
          "cashPer10": 0.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000651",
      "name": "格力电器",
      "totalShares": 5601405741,
      "totalMarketCap": 226856932510.5,
      "close": 40.5,
      "adjustedDpsTtm": 3,
      "cashEquivalentTtm": 16804217223,
      "events": [
        {
          "exDate": "2026-08-27",
          "reportDate": "2025-12-31",
          "cashPer10": 20,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-23",
          "reportDate": "2025-09-30",
          "cashPer10": 10,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000858",
      "name": "五粮液",
      "totalShares": 3881608005,
      "totalMarketCap": 276952731156.75,
      "close": 71.35,
      "adjustedDpsTtm": 5.1576852,
      "cashEquivalentTtm": 20020112159.590027,
      "events": [
        {
          "exDate": "2026-07-16",
          "reportDate": "2025-12-31",
          "cashPer10": 25.796852,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-18",
          "reportDate": "2025-09-30",
          "cashPer10": 25.78,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000895",
      "name": "双汇发展",
      "totalShares": 3464661213,
      "totalMarketCap": 87829161749.55,
      "close": 25.35,
      "adjustedDpsTtm": 0.8,
      "cashEquivalentTtm": 2771728970.4,
      "events": [
        {
          "exDate": "2026-04-29",
          "reportDate": "2025-12-31",
          "cashPer10": 8,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000915",
      "name": "华特达因",
      "totalShares": 234331485,
      "totalMarketCap": 4234369933.95,
      "close": 18.07,
      "adjustedDpsTtm": 2,
      "cashEquivalentTtm": 468662970,
      "events": [
        {
          "exDate": "2026-07-01",
          "reportDate": "2025-12-31",
          "cashPer10": 20,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "000999",
      "name": "华润三九",
      "totalShares": 1664217858,
      "totalMarketCap": 42271133593.2,
      "close": 25.4,
      "adjustedDpsTtm": 1.0050000000000001,
      "cashEquivalentTtm": 1672538947.2900002,
      "events": [
        {
          "exDate": "2026-10-16",
          "reportDate": "2026-06-30",
          "cashPer10": 4.15,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-29",
          "reportDate": "2025-12-31",
          "cashPer10": 5.9,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "001227",
      "name": "兰州银行",
      "totalShares": 5695697168,
      "totalMarketCap": 11847050109.44,
      "close": 2.08,
      "adjustedDpsTtm": 0.08,
      "cashEquivalentTtm": 455655773.44,
      "events": [
        {
          "exDate": "2026-06-24",
          "reportDate": "2025-12-31",
          "cashPer10": 0.3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-02-09",
          "reportDate": "2025-06-30",
          "cashPer10": 0.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "001965",
      "name": "招商公路",
      "totalShares": 6795094992,
      "totalMarketCap": 73794731613.12,
      "close": 10.86,
      "adjustedDpsTtm": 0.373,
      "cashEquivalentTtm": 2534570432.016,
      "events": [
        {
          "exDate": "2026-07-31",
          "reportDate": "2025-12-31",
          "cashPer10": 3.73,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002003",
      "name": "伟星股份",
      "totalShares": 1188889653,
      "totalMarketCap": 15538787764.71,
      "close": 13.07,
      "adjustedDpsTtm": 0.4,
      "cashEquivalentTtm": 475555861.20000005,
      "events": [
        {
          "exDate": "2026-05-20",
          "reportDate": "2025-12-31",
          "cashPer10": 4,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002007",
      "name": "华兰生物",
      "totalShares": 1825690986,
      "totalMarketCap": 20447739043.2,
      "close": 11.2,
      "adjustedDpsTtm": 0.7,
      "cashEquivalentTtm": 1277983690.1999998,
      "events": [
        {
          "exDate": "2026-11-17",
          "reportDate": "2026-06-30",
          "cashPer10": 2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-15",
          "reportDate": "2025-12-31",
          "cashPer10": 5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002032",
      "name": "苏泊尔",
      "totalShares": 797176772,
      "totalMarketCap": 38439863945.84,
      "close": 48.22,
      "adjustedDpsTtm": 2.63,
      "cashEquivalentTtm": 2096574910.36,
      "events": [
        {
          "exDate": "2026-05-28",
          "reportDate": "2025-12-31",
          "cashPer10": 26.3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002267",
      "name": "陕天然气",
      "totalShares": 1112075445,
      "totalMarketCap": 7206248883.6,
      "close": 6.48,
      "adjustedDpsTtm": 0.2,
      "cashEquivalentTtm": 222415089,
      "events": [
        {
          "exDate": "2026-06-25",
          "reportDate": "2025-12-31",
          "cashPer10": 2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002332",
      "name": "仙琚制药",
      "totalShares": 989204866,
      "totalMarketCap": 8329104971.72,
      "close": 8.42,
      "adjustedDpsTtm": 0.30000000000000004,
      "cashEquivalentTtm": 296761459.8000001,
      "events": [
        {
          "exDate": "2026-09-16",
          "reportDate": "2026-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-28",
          "reportDate": "2025-12-31",
          "cashPer10": 2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002508",
      "name": "老板电器",
      "totalShares": 945022916,
      "totalMarketCap": 14647855198,
      "close": 15.5,
      "adjustedDpsTtm": 1,
      "cashEquivalentTtm": 945022916,
      "events": [
        {
          "exDate": "2026-10-14",
          "reportDate": "2026-06-30",
          "cashPer10": 5,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-03",
          "reportDate": "2025-12-31",
          "cashPer10": 5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002746",
      "name": "仙坛股份",
      "totalShares": 860538727,
      "totalMarketCap": 4793200709.39,
      "close": 5.57,
      "adjustedDpsTtm": 0.35,
      "cashEquivalentTtm": 301188554.45,
      "events": [
        {
          "exDate": "2026-09-23",
          "reportDate": "2026-06-30",
          "cashPer10": 1.5,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-28",
          "reportDate": "2025-12-31",
          "cashPer10": 2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002807",
      "name": "江阴银行",
      "totalShares": 2707532067,
      "totalMarketCap": 11425785322.74,
      "close": 4.22,
      "adjustedDpsTtm": 0.3,
      "cashEquivalentTtm": 812259620.1,
      "events": [
        {
          "exDate": "2026-10-16",
          "reportDate": "2026-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-29",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 1
        },
        {
          "exDate": "2025-12-03",
          "reportDate": "2025-09-30",
          "cashPer10": 1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002839",
      "name": "张家港行",
      "totalShares": 2444344974,
      "totalMarketCap": 10706230986.12,
      "close": 4.38,
      "adjustedDpsTtm": 0.12,
      "cashEquivalentTtm": 293321396.88,
      "events": [
        {
          "exDate": "2026-05-21",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002958",
      "name": "青农商行",
      "totalShares": 5555705649,
      "totalMarketCap": 16333774608.06,
      "close": 2.94,
      "adjustedDpsTtm": 0.12,
      "cashEquivalentTtm": 666684677.88,
      "events": [
        {
          "exDate": "2026-07-08",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "002966",
      "name": "苏州银行",
      "totalShares": 4470662011,
      "totalMarketCap": 44483087009.45,
      "close": 9.95,
      "adjustedDpsTtm": 0.15,
      "cashEquivalentTtm": 670599301.65,
      "events": [
        {
          "exDate": "2026-06-24",
          "reportDate": "2025-12-31",
          "cashPer10": 1.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600000",
      "name": "浦发银行",
      "totalShares": 33305838300,
      "totalMarketCap": 356039411427,
      "close": 10.69,
      "adjustedDpsTtm": 0.42000000000000004,
      "cashEquivalentTtm": 13988452086.000002,
      "events": [
        {
          "exDate": "2026-07-16",
          "reportDate": "2025-12-31",
          "cashPer10": 4.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600008",
      "name": "首创环保",
      "totalShares": 7340590677,
      "totalMarketCap": 19672783014.36,
      "close": 2.68,
      "adjustedDpsTtm": 0.12,
      "cashEquivalentTtm": 880870881.24,
      "events": [
        {
          "exDate": "2026-06-18",
          "reportDate": "2025-12-31",
          "cashPer10": 0.8,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-09",
          "reportDate": "2025-06-30",
          "cashPer10": 0.4,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600015",
      "name": "华夏银行",
      "totalShares": 15914928468,
      "totalMarketCap": 106948319304.96,
      "close": 6.72,
      "adjustedDpsTtm": 0.42000000000000004,
      "cashEquivalentTtm": 6684269956.56,
      "events": [
        {
          "exDate": "2026-07-30",
          "reportDate": "2025-12-31",
          "cashPer10": 3.2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-23",
          "reportDate": "2025-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600016",
      "name": "民生银行",
      "totalShares": 43782418502,
      "totalMarketCap": 153676288942.02,
      "close": 3.51,
      "adjustedDpsTtm": 0.17099999999999999,
      "cashEquivalentTtm": 7486793563.841999,
      "events": [
        {
          "exDate": "2026-09-15",
          "reportDate": "2026-06-30",
          "cashPer10": 1.18,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-02",
          "reportDate": "2025-12-31",
          "cashPer10": 0.53,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600018",
      "name": "上港集团",
      "totalShares": 23279933678,
      "totalMarketCap": 138515605384.1,
      "close": 5.95,
      "adjustedDpsTtm": 0.245,
      "cashEquivalentTtm": 5703583751.11,
      "events": [
        {
          "exDate": "2026-10-15",
          "reportDate": "2026-06-30",
          "cashPer10": 0.5,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-23",
          "reportDate": "2025-12-31",
          "cashPer10": 1.45,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-13",
          "reportDate": "2025-06-30",
          "cashPer10": 0.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600019",
      "name": "宝钢股份",
      "totalShares": 21782084749,
      "totalMarketCap": 134395462901.33,
      "close": 6.17,
      "adjustedDpsTtm": 0.31,
      "cashEquivalentTtm": 6752446272.19,
      "events": [
        {
          "exDate": "2026-09-16",
          "reportDate": "2026-06-30",
          "cashPer10": 1.3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-25",
          "reportDate": "2025-12-31",
          "cashPer10": 1.8,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600027",
      "name": "华电国际",
      "totalShares": 11611774184,
      "totalMarketCap": 60729578982.32,
      "close": 5.23,
      "adjustedDpsTtm": 0.13999999999999999,
      "cashEquivalentTtm": 1625648385.7599998,
      "events": [
        {
          "exDate": "2026-06-26",
          "reportDate": "2025-12-31",
          "cashPer10": 1.4,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600036",
      "name": "招商银行",
      "totalShares": 25219845601,
      "totalMarketCap": 1097567680555.52,
      "close": 43.52,
      "adjustedDpsTtm": 2.016,
      "cashEquivalentTtm": 50843208731.616,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 10.03,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-16",
          "reportDate": "2025-06-30",
          "cashPer10": 10.13,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600064",
      "name": "南京高科",
      "totalShares": 1730339644,
      "totalMarketCap": 12250804679.52,
      "close": 7.08,
      "adjustedDpsTtm": 0.32,
      "cashEquivalentTtm": 553708686.08,
      "events": [
        {
          "exDate": "2026-07-17",
          "reportDate": "2025-12-31",
          "cashPer10": 3.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600132",
      "name": "重庆啤酒",
      "totalShares": 483971198,
      "totalMarketCap": 19121702032.98,
      "close": 39.51,
      "adjustedDpsTtm": 2.5,
      "cashEquivalentTtm": 1209927995,
      "events": [
        {
          "exDate": "2026-06-18",
          "reportDate": "2025-12-31",
          "cashPer10": 12,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-18",
          "reportDate": "2025-06-30",
          "cashPer10": 13,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600177",
      "name": "雅戈尔",
      "totalShares": 4623441902,
      "totalMarketCap": 41564742698.98,
      "close": 8.99,
      "adjustedDpsTtm": 0.56,
      "cashEquivalentTtm": 2589127465.1200004,
      "events": [
        {
          "exDate": "2026-09-18",
          "reportDate": "2026-06-30",
          "cashPer10": 2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-05",
          "reportDate": "2025-12-31",
          "cashPer10": 2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-03-27",
          "reportDate": "2025-09-30",
          "cashPer10": 0.8,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-04",
          "reportDate": "2025-06-30",
          "cashPer10": 0.8,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600285",
      "name": "羚锐制药",
      "totalShares": 567115486,
      "totalMarketCap": 13554060115.4,
      "close": 23.9,
      "adjustedDpsTtm": 1.1,
      "cashEquivalentTtm": 623827034.6,
      "events": [
        {
          "exDate": "2026-06-11",
          "reportDate": "2025-12-31",
          "cashPer10": 11,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600332",
      "name": "白云山",
      "totalShares": 1625790949,
      "totalMarketCap": 30727448936.1,
      "close": 18.9,
      "adjustedDpsTtm": 0.75,
      "cashEquivalentTtm": 1219343211.75,
      "events": [
        {
          "exDate": "2026-09-10",
          "reportDate": "2026-06-30",
          "cashPer10": 3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-16",
          "reportDate": "2025-12-31",
          "cashPer10": 4.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600377",
      "name": "宁沪高速",
      "totalShares": 5037747500,
      "totalMarketCap": 73349603600,
      "close": 14.56,
      "adjustedDpsTtm": 0.49000000000000005,
      "cashEquivalentTtm": 2468496275,
      "events": [
        {
          "exDate": "2026-07-13",
          "reportDate": "2025-12-31",
          "cashPer10": 4.9,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600398",
      "name": "海澜之家",
      "totalShares": 4802770296,
      "totalMarketCap": 30545619082.56,
      "close": 6.36,
      "adjustedDpsTtm": 0.6799999999999999,
      "cashEquivalentTtm": 3265883801.2799997,
      "events": [
        {
          "exDate": "2026-10-14",
          "reportDate": "2026-06-30",
          "cashPer10": 2.7,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-11",
          "reportDate": "2025-12-31",
          "cashPer10": 4.1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600461",
      "name": "洪城环境",
      "totalShares": 1435469988,
      "totalMarketCap": 11928755600.28,
      "close": 8.31,
      "adjustedDpsTtm": 0.46699999999999997,
      "cashEquivalentTtm": 670364484.3959999,
      "events": [
        {
          "exDate": "2026-07-03",
          "reportDate": "2025-12-31",
          "cashPer10": 4.67,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600519",
      "name": "贵州茅台",
      "totalShares": 1250081601,
      "totalMarketCap": 1825119137460,
      "close": 1460,
      "adjustedDpsTtm": 51.98123,
      "cashEquivalentTtm": 64980779220.34923,
      "events": [
        {
          "exDate": "2026-06-26",
          "reportDate": "2025-12-31",
          "cashPer10": 280.2423,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-19",
          "reportDate": "2025-09-30",
          "cashPer10": 239.57,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600572",
      "name": "康恩贝",
      "totalShares": 2540530151,
      "totalMarketCap": 10187525905.51,
      "close": 4.01,
      "adjustedDpsTtm": 0.15,
      "cashEquivalentTtm": 381079522.65,
      "events": [
        {
          "exDate": "2026-06-24",
          "reportDate": "2025-12-31",
          "cashPer10": 1.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600582",
      "name": "天地科技",
      "totalShares": 4138588892,
      "totalMarketCap": 20568786793.24,
      "close": 4.97,
      "adjustedDpsTtm": 0.3,
      "cashEquivalentTtm": 1241576667.6,
      "events": [
        {
          "exDate": "2026-06-12",
          "reportDate": "2025-12-31",
          "cashPer10": 3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600585",
      "name": "海螺水泥",
      "totalShares": 5277060044,
      "totalMarketCap": 94248292385.84,
      "close": 17.86,
      "adjustedDpsTtm": 0.74,
      "cashEquivalentTtm": 3905024432.56,
      "events": [
        {
          "exDate": "2026-09-30",
          "reportDate": "2026-06-30",
          "cashPer10": 1.3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-02",
          "reportDate": "2025-12-31",
          "cashPer10": 6.1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600600",
      "name": "青岛啤酒",
      "totalShares": 1364195121,
      "totalMarketCap": 72984438973.5,
      "close": 53.5,
      "adjustedDpsTtm": 2.35,
      "cashEquivalentTtm": 3205858534.35,
      "events": [
        {
          "exDate": "2026-07-16",
          "reportDate": "2025-12-31",
          "cashPer10": 23.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600612",
      "name": "老凤祥",
      "totalShares": 523117764,
      "totalMarketCap": 16268962460.4,
      "close": 31.1,
      "adjustedDpsTtm": 1.5199999999999998,
      "cashEquivalentTtm": 795139001.2799999,
      "events": [
        {
          "exDate": "2026-10-14",
          "reportDate": "2026-06-30",
          "cashPer10": 2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-15",
          "reportDate": "2025-12-31",
          "cashPer10": 13.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600642",
      "name": "申能股份",
      "totalShares": 4894079376,
      "totalMarketCap": 45759642165.6,
      "close": 9.35,
      "adjustedDpsTtm": 0.45999999999999996,
      "cashEquivalentTtm": 2251276512.96,
      "events": [
        {
          "exDate": "2026-07-14",
          "reportDate": "2025-12-31",
          "cashPer10": 4.6,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600690",
      "name": "海尔智家",
      "totalShares": 9298538164,
      "totalMarketCap": 210890845559.52,
      "close": 22.68,
      "adjustedDpsTtm": 0.89151,
      "cashEquivalentTtm": 8289739758.58764,
      "events": [
        {
          "exDate": "2026-08-21",
          "reportDate": "2025-12-31",
          "cashPer10": 8.9151,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600704",
      "name": "物产中大",
      "totalShares": 5171179890,
      "totalMarketCap": 25235357863.2,
      "close": 4.88,
      "adjustedDpsTtm": 0.22,
      "cashEquivalentTtm": 1137659575.8,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-30",
          "reportDate": "2025-09-30",
          "cashPer10": 1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600741",
      "name": "华域汽车",
      "totalShares": 3152723984,
      "totalMarketCap": 49087912430.88,
      "close": 15.57,
      "adjustedDpsTtm": 1,
      "cashEquivalentTtm": 3152723984,
      "events": [
        {
          "exDate": "2026-07-28",
          "reportDate": "2025-12-31",
          "cashPer10": 10,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600757",
      "name": "长江传媒",
      "totalShares": 1213650273,
      "totalMarketCap": 9575700653.97,
      "close": 7.89,
      "adjustedDpsTtm": 0.41,
      "cashEquivalentTtm": 497596611.92999995,
      "events": [
        {
          "exDate": "2026-06-17",
          "reportDate": "2025-12-31",
          "cashPer10": 4.1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600795",
      "name": "国电电力",
      "totalShares": 17835619082,
      "totalMarketCap": 96669055424.44,
      "close": 5.42,
      "adjustedDpsTtm": 0.141,
      "cashEquivalentTtm": 2514822290.562,
      "events": [
        {
          "exDate": "2026-07-13",
          "reportDate": "2025-12-31",
          "cashPer10": 1.41,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600820",
      "name": "隧道股份",
      "totalShares": 3144096094,
      "totalMarketCap": 15751921430.94,
      "close": 5.01,
      "adjustedDpsTtm": 0.16999999999999998,
      "cashEquivalentTtm": 534496335.97999996,
      "events": [
        {
          "exDate": "2026-09-18",
          "reportDate": "2026-06-30",
          "cashPer10": 0.5,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-31",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600887",
      "name": "伊利股份",
      "totalShares": 6325360667,
      "totalMarketCap": 208736902011,
      "close": 33,
      "adjustedDpsTtm": 1.38,
      "cashEquivalentTtm": 8728997720.46,
      "events": [
        {
          "exDate": "2026-06-05",
          "reportDate": "2025-12-31",
          "cashPer10": 9,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-17",
          "reportDate": "2025-09-30",
          "cashPer10": 4.8,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600901",
      "name": "江苏金租",
      "totalShares": 5791866431,
      "totalMarketCap": 44944883504.56,
      "close": 7.76,
      "adjustedDpsTtm": 0.3,
      "cashEquivalentTtm": 1737559929.3,
      "events": [
        {
          "exDate": "2026-06-15",
          "reportDate": "2025-12-31",
          "cashPer10": 1.7,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-12",
          "reportDate": "2025-06-30",
          "cashPer10": 1.3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600908",
      "name": "无锡银行",
      "totalShares": 2194681695,
      "totalMarketCap": 12926675183.55,
      "close": 5.89,
      "adjustedDpsTtm": 0.24000000000000002,
      "cashEquivalentTtm": 526723606.8,
      "events": [
        {
          "exDate": "2026-07-07",
          "reportDate": "2025-12-31",
          "cashPer10": 1.3,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-11-25",
          "reportDate": "2025-06-30",
          "cashPer10": 1.1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600919",
      "name": "江苏银行",
      "totalShares": 18351324463,
      "totalMarketCap": 249027472962.91,
      "close": 13.57,
      "adjustedDpsTtm": 0.5641,
      "cashEquivalentTtm": 10351982129.5783,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 2.332,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-14",
          "reportDate": "2025-06-30",
          "cashPer10": 3.309,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600941",
      "name": "中国移动",
      "totalShares": 21702251023,
      "totalMarketCap": 2338851592748.71,
      "close": 107.77,
      "adjustedDpsTtm": 4.7112,
      "cashEquivalentTtm": 102243645019.5576,
      "events": [
        {
          "exDate": "2026-09-30",
          "reportDate": "2026-06-30",
          "cashPer10": 25.1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-05",
          "reportDate": "2025-12-31",
          "cashPer10": 22.012,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "600998",
      "name": "九州通",
      "totalShares": 5042470234,
      "totalMarketCap": 26019146407.44,
      "close": 5.16,
      "adjustedDpsTtm": 0.2,
      "cashEquivalentTtm": 1008494046.8000001,
      "events": [
        {
          "exDate": "2026-06-08",
          "reportDate": "2025-12-31",
          "cashPer10": 2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601000",
      "name": "唐山港",
      "totalShares": 5925928614,
      "totalMarketCap": 30814828792.8,
      "close": 5.2,
      "adjustedDpsTtm": 0.2,
      "cashEquivalentTtm": 1185185722.8,
      "events": [
        {
          "exDate": "2026-05-27",
          "reportDate": "2025-12-31",
          "cashPer10": 2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601006",
      "name": "大秦铁路",
      "totalShares": 19759713378,
      "totalMarketCap": 98008178354.88,
      "close": 4.96,
      "adjustedDpsTtm": 0.22177000000000002,
      "cashEquivalentTtm": 4382111635.839061,
      "events": [
        {
          "exDate": "2026-10-19",
          "reportDate": "2026-06-30",
          "cashPer10": 0.8008,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 1.4169,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601009",
      "name": "南京银行",
      "totalShares": 12363567245,
      "totalMarketCap": 166908157807.5,
      "close": 13.5,
      "adjustedDpsTtm": 0.22294999999999998,
      "cashEquivalentTtm": 2756457317.27275,
      "events": [
        {
          "exDate": "2026-06-15",
          "reportDate": "2025-12-31",
          "cashPer10": 2.2295,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601077",
      "name": "渝农商行",
      "totalShares": 11357000000,
      "totalMarketCap": 82338250000,
      "close": 7.25,
      "adjustedDpsTtm": 0.32091,
      "cashEquivalentTtm": 3644574869.9999995,
      "events": [
        {
          "exDate": "2026-06-16",
          "reportDate": "2025-12-31",
          "cashPer10": 1.1755,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-23",
          "reportDate": "2025-06-30",
          "cashPer10": 2.0336,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601098",
      "name": "中南传媒",
      "totalShares": 1796000000,
      "totalMarketCap": 20025400000,
      "close": 11.15,
      "adjustedDpsTtm": 0.45,
      "cashEquivalentTtm": 808200000,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 4.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601166",
      "name": "兴业银行",
      "totalShares": 21162864665,
      "totalMarketCap": 427489866233,
      "close": 20.2,
      "adjustedDpsTtm": 1.066,
      "cashEquivalentTtm": 22559613732.89,
      "events": [
        {
          "exDate": "2026-06-12",
          "reportDate": "2025-12-31",
          "cashPer10": 5.01,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-02-06",
          "reportDate": "2025-06-30",
          "cashPer10": 5.65,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601169",
      "name": "北京银行",
      "totalShares": 21142984272,
      "totalMarketCap": 133623660599.04,
      "close": 6.32,
      "adjustedDpsTtm": 0.27799999999999997,
      "cashEquivalentTtm": 5877749627.615999,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 2.78,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601186",
      "name": "中国铁建",
      "totalShares": 13579541500,
      "totalMarketCap": 77946568210,
      "close": 5.74,
      "adjustedDpsTtm": 0.3,
      "cashEquivalentTtm": 4073862450,
      "events": [
        {
          "exDate": "2026-07-28",
          "reportDate": "2025-12-31",
          "cashPer10": 3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601229",
      "name": "上海银行",
      "totalShares": 14317174642,
      "totalMarketCap": 123414045414.04,
      "close": 8.62,
      "adjustedDpsTtm": 0.52,
      "cashEquivalentTtm": 7444930813.84,
      "events": [
        {
          "exDate": "2026-10-27",
          "reportDate": "2026-06-30",
          "cashPer10": 3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-08",
          "reportDate": "2025-12-31",
          "cashPer10": 2.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601288",
      "name": "农业银行",
      "totalShares": 349983033873,
      "totalMarketCap": 2775365458612.89,
      "close": 7.93,
      "adjustedDpsTtm": 0.3792,
      "cashEquivalentTtm": 132713566444.64159,
      "events": [
        {
          "exDate": "2026-10-21",
          "reportDate": "2026-06-30",
          "cashPer10": 1.297,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-13",
          "reportDate": "2025-12-31",
          "cashPer10": 1.3,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-15",
          "reportDate": "2025-06-30",
          "cashPer10": 1.195,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601298",
      "name": "青岛港",
      "totalShares": 6491100000,
      "totalMarketCap": 64975911000,
      "close": 10.01,
      "adjustedDpsTtm": 0.4853,
      "cashEquivalentTtm": 3150130830,
      "events": [
        {
          "exDate": "2026-10-28",
          "reportDate": "2026-06-30",
          "cashPer10": 1.399,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-08-10",
          "reportDate": "2025-12-31",
          "cashPer10": 1.988,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-24",
          "reportDate": "2025-06-30",
          "cashPer10": 1.466,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601328",
      "name": "交通银行",
      "totalShares": 88363784223,
      "totalMarketCap": 793506782322.54,
      "close": 8.98,
      "adjustedDpsTtm": 0.3247,
      "cashEquivalentTtm": 28691720737.2081,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 1.684,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-25",
          "reportDate": "2025-06-30",
          "cashPer10": 1.563,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601398",
      "name": "工商银行",
      "totalShares": 356406257089,
      "totalMarketCap": 3286065690360.58,
      "close": 9.22,
      "adjustedDpsTtm": 0.4613999999999999,
      "cashEquivalentTtm": 164445847020.86456,
      "events": [
        {
          "exDate": "2026-10-21",
          "reportDate": "2026-06-30",
          "cashPer10": 1.511,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-13",
          "reportDate": "2025-12-31",
          "cashPer10": 1.689,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-15",
          "reportDate": "2025-06-30",
          "cashPer10": 1.414,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601528",
      "name": "瑞丰银行",
      "totalShares": 1962161395,
      "totalMarketCap": 10419077007.45,
      "close": 5.31,
      "adjustedDpsTtm": 0.31000000000000005,
      "cashEquivalentTtm": 608270032.45,
      "events": [
        {
          "exDate": "2026-09-10",
          "reportDate": "2026-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-05-12",
          "reportDate": "2025-12-31",
          "cashPer10": 2.1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601568",
      "name": "北元化工",
      "totalShares": 3972222224,
      "totalMarketCap": 12870000005.76,
      "close": 3.24,
      "adjustedDpsTtm": 0.05,
      "cashEquivalentTtm": 198611111.20000002,
      "events": [
        {
          "exDate": "2026-06-22",
          "reportDate": "2025-12-31",
          "cashPer10": 0.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601577",
      "name": "长沙银行",
      "totalShares": 4021553754,
      "totalMarketCap": 40255753077.54,
      "close": 10.01,
      "adjustedDpsTtm": 0.45,
      "cashEquivalentTtm": 1809699189.3,
      "events": [
        {
          "exDate": "2026-09-30",
          "reportDate": "2026-06-30",
          "cashPer10": 2.2,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-20",
          "reportDate": "2025-12-31",
          "cashPer10": 2.3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601658",
      "name": "邮储银行",
      "totalShares": 120095053492,
      "totalMarketCap": 708560815602.8,
      "close": 5.9,
      "adjustedDpsTtm": 0.2183,
      "cashEquivalentTtm": 26216750177.3036,
      "events": [
        {
          "exDate": "2026-07-13",
          "reportDate": "2025-12-31",
          "cashPer10": 0.953,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-12",
          "reportDate": "2025-06-30",
          "cashPer10": 1.23,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601668",
      "name": "中国建筑",
      "totalShares": 41320390444,
      "totalMarketCap": 192139815564.6,
      "close": 4.65,
      "adjustedDpsTtm": 0.2718,
      "cashEquivalentTtm": 11230882122.6792,
      "events": [
        {
          "exDate": "2026-07-16",
          "reportDate": "2025-12-31",
          "cashPer10": 2.718,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601728",
      "name": "中国电信",
      "totalShares": 91507138699,
      "totalMarketCap": 641465042279.99,
      "close": 7.01,
      "adjustedDpsTtm": 0.2514,
      "cashEquivalentTtm": 23004894668.9286,
      "events": [
        {
          "exDate": "2026-09-10",
          "reportDate": "2026-06-30",
          "cashPer10": 1.606,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-10",
          "reportDate": "2025-12-31",
          "cashPer10": 0.908,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601766",
      "name": "中国中车",
      "totalShares": 28698864088,
      "totalMarketCap": 190560457544.32,
      "close": 6.64,
      "adjustedDpsTtm": 0.23,
      "cashEquivalentTtm": 6600738740.240001,
      "events": [
        {
          "exDate": "2026-10-15",
          "reportDate": "2026-06-30",
          "cashPer10": 1.1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-08-13",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601800",
      "name": "中国交建",
      "totalShares": 16213786279,
      "totalMarketCap": 94688511869.36,
      "close": 5.84,
      "adjustedDpsTtm": 0.19573,
      "cashEquivalentTtm": 3173524388.38867,
      "events": [
        {
          "exDate": "2026-07-23",
          "reportDate": "2025-12-31",
          "cashPer10": 0.7793,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-01-09",
          "reportDate": "2025-06-30",
          "cashPer10": 1.178,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601818",
      "name": "光大银行",
      "totalShares": 59085551061,
      "totalMarketCap": 192618896458.86,
      "close": 3.26,
      "adjustedDpsTtm": 0.175,
      "cashEquivalentTtm": 10339971435.675,
      "events": [
        {
          "exDate": "2026-07-30",
          "reportDate": "2025-12-31",
          "cashPer10": 0.7,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-02-05",
          "reportDate": "2025-06-30",
          "cashPer10": 1.05,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601825",
      "name": "沪农商行",
      "totalShares": 9644444445,
      "totalMarketCap": 93068888894.25,
      "close": 9.65,
      "adjustedDpsTtm": 0.4439,
      "cashEquivalentTtm": 4281168889.1355,
      "events": [
        {
          "exDate": "2026-09-24",
          "reportDate": "2026-06-30",
          "cashPer10": 2.499,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-29",
          "reportDate": "2025-12-31",
          "cashPer10": 1.94,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601838",
      "name": "成都银行",
      "totalShares": 4238435356,
      "totalMarketCap": 88668067647.52,
      "close": 20.92,
      "adjustedDpsTtm": 1.4100000000000001,
      "cashEquivalentTtm": 5976193851.960001,
      "events": [
        {
          "exDate": "2026-09-18",
          "reportDate": "2026-06-30",
          "cashPer10": 4.89,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-13",
          "reportDate": "2025-12-31",
          "cashPer10": 9.21,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601860",
      "name": "紫金银行",
      "totalShares": 3661104277,
      "totalMarketCap": 9042927564.19,
      "close": 2.47,
      "adjustedDpsTtm": 0.1,
      "cashEquivalentTtm": 366110427.70000005,
      "events": [
        {
          "exDate": "2026-06-09",
          "reportDate": "2025-12-31",
          "cashPer10": 0.5,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-02-05",
          "reportDate": "2025-06-30",
          "cashPer10": 0.5,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601916",
      "name": "浙商银行",
      "totalShares": 27464635963,
      "totalMarketCap": 84591078766.04,
      "close": 3.08,
      "adjustedDpsTtm": 0.131,
      "cashEquivalentTtm": 3597867311.1530004,
      "events": [
        {
          "exDate": "2026-06-26",
          "reportDate": "2025-12-31",
          "cashPer10": 1.31,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601919",
      "name": "中远海控",
      "totalShares": 15218324687,
      "totalMarketCap": 270277446441.12,
      "close": 17.76,
      "adjustedDpsTtm": 0.8700000000000001,
      "cashEquivalentTtm": 13239942477.690002,
      "events": [
        {
          "exDate": "2026-10-23",
          "reportDate": "2026-06-30",
          "cashPer10": 4.3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-26",
          "reportDate": "2025-12-31",
          "cashPer10": 4.4,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601921",
      "name": "浙版传媒",
      "totalShares": 2222222223,
      "totalMarketCap": 16066666672.29,
      "close": 7.23,
      "adjustedDpsTtm": 0.32000000000000006,
      "cashEquivalentTtm": 711111111.3600001,
      "events": [
        {
          "exDate": "2026-09-07",
          "reportDate": "2026-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-24",
          "reportDate": "2025-12-31",
          "cashPer10": 2.2,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601928",
      "name": "凤凰传媒",
      "totalShares": 2544900000,
      "totalMarketCap": 22980447000,
      "close": 9.03,
      "adjustedDpsTtm": 0.5,
      "cashEquivalentTtm": 1272450000,
      "events": [
        {
          "exDate": "2026-10-23",
          "reportDate": "2026-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-08-21",
          "reportDate": "2025-12-31",
          "cashPer10": 4,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601988",
      "name": "中国银行",
      "totalShares": 322212411814,
      "totalMarketCap": 2419815212723.14,
      "close": 7.51,
      "adjustedDpsTtm": 0.2263,
      "cashEquivalentTtm": 72916668793.5082,
      "events": [
        {
          "exDate": "2026-07-10",
          "reportDate": "2025-12-31",
          "cashPer10": 1.169,
          "bonusPer10": 0
        },
        {
          "exDate": "2025-12-11",
          "reportDate": "2025-06-30",
          "cashPer10": 1.094,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601997",
      "name": "贵阳银行",
      "totalShares": 3656198076,
      "totalMarketCap": 21205948840.8,
      "close": 5.8,
      "adjustedDpsTtm": 0.3,
      "cashEquivalentTtm": 1096859422.8,
      "events": [
        {
          "exDate": "2026-06-10",
          "reportDate": "2025-12-31",
          "cashPer10": 3,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "601998",
      "name": "中信银行",
      "totalShares": 55645162264,
      "totalMarketCap": 530854847998.56,
      "close": 9.54,
      "adjustedDpsTtm": 0.396,
      "cashEquivalentTtm": 22035484256.544003,
      "events": [
        {
          "exDate": "2026-11-20",
          "reportDate": "2026-06-30",
          "cashPer10": 2.03,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-10",
          "reportDate": "2025-12-31",
          "cashPer10": 1.93,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "603128",
      "name": "华贸物流",
      "totalShares": 1309046494,
      "totalMarketCap": 6623775259.64,
      "close": 5.06,
      "adjustedDpsTtm": 0.22400000000000003,
      "cashEquivalentTtm": 293226414.656,
      "events": [
        {
          "exDate": "2026-07-29",
          "reportDate": "2025-12-31",
          "cashPer10": 2.24,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "603195",
      "name": "公牛集团",
      "totalShares": 1803446009,
      "totalMarketCap": 72155874820.09,
      "close": 40.01,
      "adjustedDpsTtm": 1.9,
      "cashEquivalentTtm": 3426547417.1,
      "events": [
        {
          "exDate": "2026-06-04",
          "reportDate": "2025-12-31",
          "cashPer10": 19,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "603323",
      "name": "苏农银行",
      "totalShares": 2220395581,
      "totalMarketCap": 9836352423.83,
      "close": 4.43,
      "adjustedDpsTtm": 0.20909090909090908,
      "cashEquivalentTtm": 464264530.57272726,
      "events": [
        {
          "exDate": "2026-10-22",
          "reportDate": "2026-06-30",
          "cashPer10": 1,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-06-18",
          "reportDate": "2025-12-31",
          "cashPer10": 1.2,
          "bonusPer10": 1
        }
      ]
    },
    {
      "code": "603368",
      "name": "柳药集团",
      "totalShares": 397211355,
      "totalMarketCap": 6160748116.05,
      "close": 15.51,
      "adjustedDpsTtm": 0.6799999999999999,
      "cashEquivalentTtm": 270103721.4,
      "events": [
        {
          "exDate": "2026-06-16",
          "reportDate": "2025-12-31",
          "cashPer10": 6.8,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "603658",
      "name": "安图生物",
      "totalShares": 571424768,
      "totalMarketCap": 21571284992,
      "close": 37.75,
      "adjustedDpsTtm": 1.31,
      "cashEquivalentTtm": 748566446.08,
      "events": [
        {
          "exDate": "2026-06-01",
          "reportDate": "2025-12-31",
          "cashPer10": 13.1,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "603883",
      "name": "老百姓",
      "totalShares": 766639096,
      "totalMarketCap": 11284927493.12,
      "close": 14.72,
      "adjustedDpsTtm": 0.5700000000000001,
      "cashEquivalentTtm": 436984284.72,
      "events": [
        {
          "exDate": "2026-09-10",
          "reportDate": "2026-06-30",
          "cashPer10": 3,
          "bonusPer10": 0
        },
        {
          "exDate": "2026-07-03",
          "reportDate": "2025-12-31",
          "cashPer10": 2.7,
          "bonusPer10": 0
        }
      ]
    },
    {
      "code": "603899",
      "name": "晨光股份",
      "totalShares": 915795377,
      "totalMarketCap": 20614553936.27,
      "close": 22.51,
      "adjustedDpsTtm": 1,
      "cashEquivalentTtm": 915795377,
      "events": [
        {
          "exDate": "2026-05-20",
          "reportDate": "2025-12-31",
          "cashPer10": 10,
          "bonusPer10": 0
        }
      ]
    }
  ],
  "capturedAt": "2026-11-25T03:03:01.510Z",
  "lastAttemptAt": "2026-11-25T03:02:58.231Z",
  "lastAttemptStatus": "ok",
  "lastError": null,
  "failureCount": 0,
  "captureMethod": "scheduled-fetch",
  "parseMethod": "ttm-total-shares-adjusted-dps-v1",
  "dataMode": "snapshot",
  "status": "ok"
};

export default DIVIDEND_SNAPSHOT;
