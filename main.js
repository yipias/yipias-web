// main.js - YipiAs App de Taxis (VERSIÓN FINAL - CON FIREBASE CORREGIDO)
const WHATSAPP_PHONE = '+51904635462';

// ===== TARIFAS POR KILOMETRAJE =====
const TARIFAS_KM = [
  [0, 6, 9], [1, 6, 9], [2, 8, 11], [3, 9, 12], [4, 11, 14], [5, 14, 18],
  [6, 17, 21], [7, 20, 24], [8, 23, 27], [9, 25, 29], [10, 27, 31],
  [11, 30, 34], [12, 32, 37], [13, 35, 40], [14, 38, 43], [15, 40, 45],
  [16, 43, 48], [17, 46, 51], [18, 48, 53], [19, 51, 56], [20, 51, 56],
  [21, 54, 61], [22, 56, 63], [23, 59, 66], [24, 61, 68], [25, 64, 71],
  [26, 67, 74], [27, 69, 76], [28, 72, 79], [29, 74, 81], [30, 77, 84],
  [31, 75, 85], [32, 78, 88], [33, 80, 90], [34, 83, 93], [35, 85, 95],
  [36, 88, 98], [37, 90, 100], [38, 92, 102], [39, 95, 105], [40, 97, 117],
  [41, 94, 114], [42, 97, 117], [43, 99, 119], [44, 101, 121], [45, 104, 124],
  [46, 106, 126], [47, 108, 128], [48, 111, 131], [49, 113, 133], [50, 115, 135],
  [51, 111, 131], [52, 113, 133], [53, 115, 135], [54, 118, 138], [55, 120, 140],
  [56, 122, 142], [57, 124, 144], [58, 126, 146], [59, 128, 148], [60, 131, 151],
  [61, 133, 153], [62, 135, 155], [63, 137, 157], [64, 139, 159], [65, 141, 161],
  [66, 144, 164], [67, 146, 166], [68, 148, 168], [69, 150, 170], [70, 152, 172],
  [71, 154, 174], [72, 157, 177], [73, 159, 179], [74, 161, 181], [75, 163, 183],
  [76, 165, 185], [77, 168, 188], [78, 170, 190], [79, 172, 192], [80, 174, 194],
  [81, 176, 196], [82, 178, 198], [83, 181, 201], [84, 183, 203], [85, 185, 205],
  [86, 187, 207], [87, 189, 209], [88, 191, 211], [89, 194, 214], [90, 196, 216],
  [91, 198, 218], [92, 200, 220], [93, 202, 222], [94, 205, 225], [95, 207, 227],
  [96, 209, 229], [97, 211, 231], [98, 213, 233], [99, 215, 235], [100, 218, 238],
  [101, 207, 227], [102, 209, 229], [103, 211, 231], [104, 213, 233], [105, 215, 235],
  [106, 217, 237], [107, 219, 239], [108, 221, 241], [109, 223, 243], [110, 225, 245],
  [111, 227, 247], [112, 229, 249], [113, 231, 251], [114, 233, 253], [115, 236, 256],
  [116, 238, 258], [117, 240, 260], [118, 242, 262], [119, 244, 264], [120, 246, 266],
  [121, 248, 268], [122, 250, 270], [123, 252, 272], [124, 254, 274], [125, 256, 276],
  [126, 258, 278], [127, 260, 280], [128, 262, 282], [129, 264, 284], [130, 266, 286],
  [131, 268, 288], [132, 270, 290], [133, 272, 292], [134, 274, 294], [135, 276, 296],
  [136, 279, 299], [137, 281, 301], [138, 283, 303], [139, 285, 305], [140, 287, 307],
  [141, 289, 309], [142, 291, 311], [143, 293, 313], [144, 295, 315], [145, 297, 317],
  [146, 299, 319], [147, 301, 321], [148, 303, 323], [149, 305, 325], [150, 307, 327],
  [151, 290, 310], [152, 292, 312], [153, 294, 314], [154, 296, 316], [155, 298, 318],
  [156, 300, 320], [157, 301, 321], [158, 303, 323], [159, 305, 325], [160, 307, 327],
  [161, 309, 329], [162, 311, 331], [163, 313, 333], [164, 315, 335], [165, 317, 337],
  [166, 319, 339], [167, 321, 341], [168, 323, 343], [169, 324, 344], [170, 326, 346],
  [171, 328, 348], [172, 330, 350], [173, 332, 352], [174, 334, 354], [175, 336, 356],
  [176, 338, 358], [177, 340, 360], [178, 342, 362], [179, 344, 364], [180, 346, 366],
  [181, 348, 368], [182, 349, 369], [183, 351, 371], [184, 353, 373], [185, 355, 375],
  [186, 357, 377], [187, 359, 379], [188, 361, 381], [189, 363, 383], [190, 365, 385],
  [191, 367, 387], [192, 369, 389], [193, 371, 391], [194, 372, 392], [195, 374, 394],
  [196, 376, 396], [197, 378, 398], [198, 380, 400], [199, 382, 402], [200, 384, 414],
  [201, 386, 416], [202, 388, 418], [203, 390, 420], [204, 392, 422], [205, 394, 424],
  [206, 396, 426], [207, 397, 427], [208, 399, 429], [209, 401, 431], [210, 403, 433],
  [211, 405, 435], [212, 407, 437], [213, 409, 439], [214, 411, 441], [215, 413, 443],
  [216, 415, 445], [217, 417, 447], [218, 419, 449], [219, 420, 450], [220, 422, 452],
  [221, 424, 454], [222, 426, 456], [223, 428, 458], [224, 430, 460], [225, 432, 462],
  [226, 434, 464], [227, 436, 466], [228, 438, 468], [229, 440, 470], [230, 442, 472],
  [231, 444, 474], [232, 445, 475], [233, 447, 477], [234, 449, 479], [235, 451, 481],
  [236, 453, 483], [237, 455, 485], [238, 457, 487], [239, 459, 489], [240, 461, 491],
  [241, 463, 493], [242, 465, 495], [243, 467, 497], [244, 468, 498], [245, 470, 500],
  [246, 472, 502], [247, 474, 504], [248, 476, 506], [249, 478, 508], [250, 480, 510],
  [251, 482, 512], [252, 484, 514], [253, 486, 516], [254, 488, 518], [255, 490, 520],
  [256, 492, 522], [257, 493, 523], [258, 495, 525], [259, 497, 527], [260, 499, 529],
  [261, 501, 531], [262, 503, 533], [263, 505, 535], [264, 507, 537], [265, 509, 539],
  [266, 511, 541], [267, 513, 543], [268, 515, 545], [269, 516, 546], [270, 518, 548],
  [271, 520, 550], [272, 522, 552], [273, 524, 554], [274, 526, 556], [275, 528, 558],
  [276, 530, 560], [277, 532, 562], [278, 534, 564], [279, 536, 566], [280, 538, 568],
  [281, 540, 570], [282, 541, 571], [283, 543, 573], [284, 545, 575], [285, 547, 577],
  [286, 549, 579], [287, 551, 581], [288, 553, 583], [289, 555, 585], [290, 557, 587],
  [291, 559, 589], [292, 561, 591], [293, 563, 593], [294, 564, 594], [295, 566, 596],
  [296, 568, 598], [297, 570, 600], [298, 572, 602], [299, 574, 604], [300, 576, 606],
  [301, 578, 608], [302, 580, 610], [303, 582, 612], [304, 584, 614], [305, 586, 616],
  [306, 588, 618], [307, 589, 619], [308, 591, 621], [309, 593, 623], [310, 595, 625],
  [311, 597, 627], [312, 599, 629], [313, 601, 631], [314, 603, 633], [315, 605, 635],
  [316, 607, 637], [317, 609, 639], [318, 611, 641], [319, 612, 642], [320, 614, 644],
  [321, 616, 646], [322, 618, 648], [323, 620, 650], [324, 622, 652], [325, 624, 654],
  [326, 626, 656], [327, 628, 658], [328, 630, 660], [329, 632, 662], [330, 634, 664],
  [331, 636, 666], [332, 637, 667], [333, 639, 669], [334, 641, 671], [335, 643, 673],
  [336, 645, 675], [337, 647, 677], [338, 649, 679], [339, 651, 681], [340, 653, 683],
  [341, 655, 685], [342, 657, 687], [343, 659, 689], [344, 660, 690], [345, 662, 692],
  [346, 664, 694], [347, 666, 696], [348, 668, 698], [349, 670, 700], [350, 672, 702],
  [351, 674, 704], [352, 676, 706], [353, 678, 708], [354, 680, 710], [355, 682, 712],
  [356, 684, 714], [357, 685, 715], [358, 687, 717], [359, 689, 719], [360, 691, 721],
  [361, 693, 723], [362, 695, 725], [363, 697, 727], [364, 699, 729], [365, 701, 731],
  [366, 703, 733], [367, 705, 735], [368, 707, 737], [369, 708, 738], [370, 710, 740],
  [371, 712, 742], [372, 714, 744], [373, 716, 746], [374, 718, 748], [375, 720, 750],
  [376, 722, 752], [377, 724, 754], [378, 726, 756], [379, 728, 758], [380, 730, 760],
  [381, 732, 762], [382, 733, 763], [383, 735, 765], [384, 737, 767], [385, 739, 769],
  [386, 741, 771], [387, 743, 773], [388, 745, 775], [389, 747, 777], [390, 749, 779],
  [391, 751, 781], [392, 753, 783], [393, 755, 785], [394, 756, 786], [395, 758, 788],
  [396, 760, 790], [397, 762, 792], [398, 764, 794], [399, 766, 796], [400, 768, 798],
  [401, 770, 800], [402, 772, 802], [403, 774, 804], [404, 776, 806], [405, 778, 808],
  [406, 780, 810], [407, 781, 811], [408, 783, 813], [409, 785, 815], [410, 787, 817],
  [411, 789, 819], [412, 791, 821], [413, 793, 823], [414, 795, 825], [415, 797, 827],
  [416, 799, 829], [417, 801, 831], [418, 803, 833], [419, 804, 834], [420, 806, 836],
  [421, 808, 838], [422, 810, 840], [423, 812, 842], [424, 814, 844], [425, 816, 846],
  [426, 818, 848], [427, 820, 850], [428, 822, 852], [429, 824, 854], [430, 826, 856],
  [431, 828, 858], [432, 829, 859], [433, 831, 861], [434, 833, 863], [435, 835, 865],
  [436, 837, 867], [437, 839, 869], [438, 841, 871], [439, 843, 873], [440, 845, 875],
  [441, 847, 877], [442, 849, 879], [443, 851, 881], [444, 852, 882], [445, 854, 884],
  [446, 856, 886], [447, 858, 888], [448, 860, 890], [449, 862, 892], [450, 864, 894],
  [451, 866, 896], [452, 868, 898], [453, 870, 900], [454, 872, 902], [455, 874, 904],
  [456, 876, 906], [457, 877, 907], [458, 879, 909], [459, 881, 911], [460, 883, 913],
  [461, 885, 915], [462, 887, 917], [463, 889, 919], [464, 891, 921], [465, 893, 923],
  [466, 895, 925], [467, 897, 927], [468, 899, 929], [469, 900, 930], [470, 902, 932],
  [471, 904, 934], [472, 906, 936], [473, 908, 938], [474, 910, 940], [475, 912, 942],
  [476, 914, 944], [477, 916, 946], [478, 918, 948], [479, 920, 950], [480, 922, 952],
  [481, 924, 954], [482, 925, 955], [483, 927, 957], [484, 929, 959], [485, 931, 961],
  [486, 933, 963], [487, 935, 965], [488, 937, 967], [489, 939, 969], [490, 941, 971],
  [491, 943, 973], [492, 945, 975], [493, 947, 977], [494, 948, 978], [495, 950, 980],
  [496, 952, 982], [497, 954, 984], [498, 956, 986], [499, 958, 988], [500, 960, 990],
  [501, 962, 992], [502, 964, 994], [503, 966, 996], [504, 968, 998], [505, 970, 1000],
  [506, 972, 1002], [507, 973, 1003], [508, 975, 1005], [509, 977, 1007], [510, 979, 1009],
  [511, 981, 1011], [512, 983, 1013], [513, 985, 1015], [514, 987, 1017], [515, 989, 1019],
  [516, 991, 1021], [517, 993, 1023], [518, 995, 1025], [519, 996, 1026], [520, 998, 1028],
  [521, 1000, 1030], [522, 1002, 1032], [523, 1004, 1034], [524, 1006, 1036], [525, 1008, 1038],
  [526, 1010, 1040], [527, 1012, 1042], [528, 1014, 1044], [529, 1016, 1046], [530, 1018, 1048],
  [531, 1020, 1050], [532, 1021, 1051], [533, 1023, 1053], [534, 1025, 1055], [535, 1027, 1057],
  [536, 1029, 1059], [537, 1031, 1061], [538, 1033, 1063], [539, 1035, 1065], [540, 1037, 1067],
  [541, 1039, 1069], [542, 1041, 1071], [543, 1043, 1073], [544, 1044, 1074], [545, 1046, 1076],
  [546, 1048, 1078], [547, 1050, 1080], [548, 1052, 1082], [549, 1054, 1084], [550, 1056, 1086],
  [551, 1058, 1088], [552, 1060, 1090], [553, 1062, 1092], [554, 1064, 1094], [555, 1066, 1096],
  [556, 1068, 1098], [557, 1069, 1099], [558, 1071, 1101], [559, 1073, 1103], [560, 1075, 1105],
  [561, 1077, 1107], [562, 1079, 1109], [563, 1081, 1111], [564, 1083, 1113], [565, 1085, 1115],
  [566, 1087, 1117], [567, 1089, 1119], [568, 1091, 1121], [569, 1092, 1122], [570, 1094, 1124],
  [571, 1096, 1126], [572, 1098, 1128], [573, 1100, 1130], [574, 1102, 1132], [575, 1104, 1134],
  [576, 1106, 1136], [577, 1108, 1138], [578, 1110, 1140], [579, 1112, 1142], [580, 1114, 1144],
  [581, 1116, 1146], [582, 1117, 1147], [583, 1119, 1149], [584, 1121, 1151], [585, 1123, 1153],
  [586, 1125, 1155], [587, 1127, 1157], [588, 1129, 1159], [589, 1131, 1161], [590, 1133, 1163],
  [591, 1135, 1165], [592, 1137, 1167], [593, 1139, 1169], [594, 1140, 1170], [595, 1142, 1172],
  [596, 1144, 1174], [597, 1146, 1176], [598, 1148, 1178], [599, 1150, 1180], [600, 1152, 1182],
  [601, 1154, 1184], [602, 1156, 1186], [603, 1158, 1188], [604, 1160, 1190], [605, 1162, 1192],
  [606, 1164, 1194], [607, 1165, 1195], [608, 1167, 1197], [609, 1169, 1199], [610, 1171, 1201],
  [611, 1173, 1203], [612, 1175, 1205], [613, 1177, 1207], [614, 1179, 1209], [615, 1181, 1211],
  [616, 1183, 1213], [617, 1185, 1215], [618, 1187, 1217], [619, 1188, 1218], [620, 1190, 1220],
  [621, 1192, 1222], [622, 1194, 1224], [623, 1196, 1226], [624, 1198, 1228], [625, 1200, 1230],
  [626, 1202, 1232], [627, 1204, 1234], [628, 1206, 1236], [629, 1208, 1238], [630, 1210, 1240],
  [631, 1212, 1242], [632, 1213, 1243], [633, 1215, 1245], [634, 1217, 1247], [635, 1219, 1249],
  [636, 1221, 1251], [637, 1223, 1253], [638, 1225, 1255], [639, 1227, 1257], [640, 1229, 1259],
  [641, 1231, 1261], [642, 1233, 1263], [643, 1235, 1265], [644, 1236, 1266], [645, 1238, 1268],
  [646, 1240, 1270], [647, 1242, 1272], [648, 1244, 1274], [649, 1246, 1276], [650, 1248, 1278],
  [651, 1250, 1280], [652, 1252, 1282], [653, 1254, 1284], [654, 1256, 1286], [655, 1258, 1288],
  [656, 1260, 1290], [657, 1261, 1291], [658, 1263, 1293], [659, 1265, 1295], [660, 1267, 1297],
  [661, 1269, 1299], [662, 1271, 1301], [663, 1273, 1303], [664, 1275, 1305], [665, 1277, 1307],
  [666, 1279, 1309], [667, 1281, 1311], [668, 1283, 1313], [669, 1284, 1314], [670, 1286, 1316],
  [671, 1288, 1318], [672, 1290, 1320], [673, 1292, 1322], [674, 1294, 1324], [675, 1296, 1326],
  [676, 1298, 1328], [677, 1300, 1330], [678, 1302, 1332], [679, 1304, 1334], [680, 1306, 1336],
  [681, 1308, 1338], [682, 1309, 1339], [683, 1311, 1341], [684, 1313, 1343], [685, 1315, 1345],
  [686, 1317, 1347], [687, 1319, 1349], [688, 1321, 1351], [689, 1323, 1353], [690, 1325, 1355],
  [691, 1327, 1357], [692, 1329, 1359], [693, 1331, 1361], [694, 1332, 1362], [695, 1334, 1364],
  [696, 1336, 1366], [697, 1338, 1368], [698, 1340, 1370], [699, 1342, 1372], [700, 1344, 1374],
  [701, 1346, 1376], [702, 1348, 1378], [703, 1350, 1380], [704, 1352, 1382], [705, 1354, 1384],
  [706, 1356, 1386], [707, 1357, 1387], [708, 1359, 1389], [709, 1361, 1391], [710, 1363, 1393],
  [711, 1365, 1395], [712, 1367, 1397], [713, 1369, 1399], [714, 1371, 1401], [715, 1373, 1403],
  [716, 1375, 1405], [717, 1377, 1407], [718, 1379, 1409], [719, 1380, 1410], [720, 1382, 1412],
  [721, 1384, 1414], [722, 1386, 1416], [723, 1388, 1418], [724, 1390, 1420], [725, 1392, 1422],
  [726, 1394, 1424], [727, 1396, 1426], [728, 1398, 1428], [729, 1400, 1430], [730, 1402, 1432],
  [731, 1404, 1434], [732, 1405, 1435], [733, 1407, 1437], [734, 1409, 1439], [735, 1411, 1441],
  [736, 1413, 1443], [737, 1415, 1445], [738, 1417, 1447], [739, 1419, 1449], [740, 1421, 1451],
  [741, 1423, 1453], [742, 1425, 1455], [743, 1427, 1457], [744, 1428, 1458], [745, 1430, 1460],
  [746, 1432, 1462], [747, 1434, 1464], [748, 1436, 1466], [749, 1438, 1468], [750, 1440, 1470],
  [751, 1442, 1472], [752, 1444, 1474], [753, 1446, 1476], [754, 1448, 1478], [755, 1450, 1480],
  [756, 1452, 1482], [757, 1453, 1483], [758, 1455, 1485], [759, 1457, 1487], [760, 1459, 1489],
  [761, 1461, 1491], [762, 1463, 1493], [763, 1465, 1495], [764, 1467, 1497], [765, 1469, 1499],
  [766, 1471, 1501], [767, 1473, 1503], [768, 1475, 1505], [769, 1476, 1506], [770, 1478, 1508],
  [771, 1480, 1510], [772, 1482, 1512], [773, 1484, 1514], [774, 1486, 1516], [775, 1488, 1518],
  [776, 1490, 1520], [777, 1492, 1522], [778, 1494, 1524], [779, 1496, 1526], [780, 1498, 1528],
  [781, 1500, 1530], [782, 1501, 1531], [783, 1503, 1533], [784, 1505, 1535], [785, 1507, 1537],
  [786, 1509, 1539], [787, 1511, 1541], [788, 1513, 1543], [789, 1515, 1545], [790, 1517, 1547],
  [791, 1519, 1549], [792, 1521, 1551], [793, 1523, 1553], [794, 1524, 1554], [795, 1526, 1556],
  [796, 1528, 1558], [797, 1530, 1560], [798, 1532, 1562], [799, 1534, 1564], [800, 1536, 1566],
  [801, 1538, 1568], [802, 1540, 1570], [803, 1542, 1572], [804, 1544, 1574], [805, 1546, 1576],
  [806, 1548, 1578], [807, 1549, 1579], [808, 1551, 1581], [809, 1553, 1583], [810, 1555, 1585],
  [811, 1557, 1587], [812, 1559, 1589], [813, 1561, 1591], [814, 1563, 1593], [815, 1565, 1595],
  [816, 1567, 1597], [817, 1569, 1599], [818, 1571, 1601], [819, 1572, 1602], [820, 1574, 1604],
  [821, 1576, 1606], [822, 1578, 1608], [823, 1580, 1610], [824, 1582, 1612], [825, 1584, 1614],
  [826, 1586, 1616], [827, 1588, 1618], [828, 1590, 1620], [829, 1592, 1622], [830, 1594, 1624],
  [831, 1596, 1626], [832, 1597, 1627], [833, 1599, 1629], [834, 1601, 1631], [835, 1603, 1633],
  [836, 1605, 1635], [837, 1607, 1637], [838, 1609, 1639], [839, 1611, 1641], [840, 1613, 1643],
  [841, 1615, 1645], [842, 1617, 1647], [843, 1619, 1649], [844, 1620, 1650], [845, 1622, 1652],
  [846, 1624, 1654], [847, 1626, 1656], [848, 1628, 1658], [849, 1630, 1660], [850, 1632, 1662],
  [851, 1634, 1664], [852, 1636, 1666], [853, 1638, 1668], [854, 1640, 1670], [855, 1642, 1672],
  [856, 1644, 1674], [857, 1645, 1675], [858, 1647, 1677], [859, 1649, 1679], [860, 1651, 1681],
  [861, 1653, 1683], [862, 1655, 1685], [863, 1657, 1687], [864, 1659, 1689], [865, 1661, 1691],
  [866, 1663, 1693], [867, 1665, 1695], [868, 1667, 1697], [869, 1668, 1698], [870, 1670, 1700],
  [871, 1672, 1702], [872, 1674, 1704], [873, 1676, 1706], [874, 1678, 1708], [875, 1680, 1710],
  [876, 1682, 1712], [877, 1684, 1714], [878, 1686, 1716], [879, 1688, 1718], [880, 1690, 1720],
  [881, 1692, 1722], [882, 1693, 1723], [883, 1695, 1725], [884, 1697, 1727], [885, 1699, 1729],
  [886, 1701, 1731], [887, 1703, 1733], [888, 1705, 1735], [889, 1707, 1737], [890, 1709, 1739],
  [891, 1711, 1741], [892, 1713, 1743], [893, 1715, 1745], [894, 1716, 1746], [895, 1718, 1748],
  [896, 1720, 1750], [897, 1722, 1752], [898, 1724, 1754], [899, 1726, 1756], [900, 1728, 1758],
  [901, 1730, 1760], [902, 1732, 1762], [903, 1734, 1764], [904, 1736, 1766], [905, 1738, 1768],
  [906, 1740, 1770], [907, 1741, 1771], [908, 1743, 1773], [909, 1745, 1775], [910, 1747, 1777],
  [911, 1749, 1779], [912, 1751, 1781], [913, 1753, 1783], [914, 1755, 1785], [915, 1757, 1787],
  [916, 1759, 1789], [917, 1761, 1791], [918, 1763, 1793], [919, 1764, 1794], [920, 1766, 1796],
  [921, 1768, 1798], [922, 1770, 1800], [923, 1772, 1802], [924, 1774, 1804], [925, 1776, 1806],
  [926, 1778, 1808], [927, 1780, 1810], [928, 1782, 1812], [929, 1784, 1814], [930, 1786, 1816],
  [931, 1788, 1818], [932, 1789, 1819], [933, 1791, 1821], [934, 1793, 1823], [935, 1795, 1825],
  [936, 1797, 1827], [937, 1799, 1829], [938, 1801, 1831], [939, 1803, 1833], [940, 1805, 1835],
  [941, 1807, 1837], [942, 1809, 1839], [943, 1811, 1841], [944, 1812, 1842], [945, 1814, 1844],
  [946, 1816, 1846], [947, 1818, 1848], [948, 1820, 1850], [949, 1822, 1852], [950, 1824, 1854],
  [951, 1826, 1856], [952, 1828, 1858], [953, 1830, 1860], [954, 1832, 1862], [955, 1834, 1864],
  [956, 1836, 1866], [957, 1837, 1867], [958, 1839, 1869], [959, 1841, 1871], [960, 1843, 1873],
  [961, 1845, 1875], [962, 1847, 1877], [963, 1849, 1879], [964, 1851, 1881], [965, 1853, 1883],
  [966, 1855, 1885], [967, 1857, 1887], [968, 1859, 1889], [969, 1860, 1890], [970, 1862, 1892],
  [971, 1864, 1894], [972, 1866, 1896], [973, 1868, 1898], [974, 1870, 1900], [975, 1872, 1902],
  [976, 1874, 1904], [977, 1876, 1906], [978, 1878, 1908], [979, 1880, 1910], [980, 1882, 1912],
  [981, 1884, 1914], [982, 1885, 1915], [983, 1887, 1917], [984, 1889, 1919], [985, 1891, 1921],
  [986, 1893, 1923], [987, 1895, 1925], [988, 1897, 1927], [989, 1899, 1929], [990, 1901, 1931],
  [991, 1903, 1933], [992, 1905, 1935], [993, 1907, 1937], [994, 1908, 1938], [995, 1910, 1940],
  [996, 1912, 1942], [997, 1914, 1944], [998, 1916, 1946], [999, 1918, 1948], [1000, 1920, 1950]
];

// ===== TARIFAS POR HORAS =====
const TARIFAS_HORAS = [
  [1, 38, 43], [2, 77, 82], [3, 108, 113], [4, 143, 148], [5, 179, 184],
  [6, 207, 212], [7, 242, 247], [8, 276, 281], [9, 300, 305], [10, 333, 338],
  [11, 366, 371], [12, 384, 389]
];

// ===== FUNCIÓN PARA REDONDEAR KILÓMETROS =====
function redondearKilometros(km) {
  const decimal = km - Math.floor(km);
  return decimal >= 0.5 ? Math.ceil(km) : Math.floor(km);
}

// ===== FUNCIÓN PARA OBTENER TARIFA POR KM =====
function obtenerTarifaKm(km, numPasajeros) {
  if (numPasajeros > 6) throw new Error('El número máximo de pasajeros es 6');
  
  const columna = numPasajeros <= 4 ? 1 : 2;
  const kmRedondeado = redondearKilometros(km);
  
  if (kmRedondeado > 1000) {
    return TARIFAS_KM[TARIFAS_KM.length - 1][columna];
  }
  
  const tarifa = TARIFAS_KM.find(item => item[0] === kmRedondeado);
  return tarifa ? tarifa[columna] : null;
}

// ===== FUNCIÓN PARA OBTENER TARIFA POR HORAS =====
function obtenerTarifaHoras(horas, numPasajeros) {
  if (numPasajeros > 6) throw new Error('El número máximo de pasajeros es 6');
  
  const columna = numPasajeros <= 4 ? 1 : 2;
  const tarifa = TARIFAS_HORAS.find(item => item[0] === horas);
  return tarifa ? tarifa[columna] : null;
}

// ===== FUNCIONES PARA VALIDACIÓN DE HORA (SIN AM/PM) =====
function validarFormatoHora(hora) {
  const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(hora);
}

function validarFechaHora(fechaId, horaInputId, mensajeError) {
  const fecha = document.getElementById(fechaId)?.value;
  const horaInput = document.getElementById(horaInputId)?.value;
  
  if (!fecha || !horaInput) {
    alert('Por favor selecciona fecha y hora');
    return false;
  }
  
  if (!validarFormatoHora(horaInput)) {
    alert('Formato de hora inválido. Use HH:MM (formato 24h)');
    return false;
  }
  
  // Crear objeto Date con la fecha y hora seleccionadas
  const [año, mes, dia] = fecha.split('-').map(Number);
  const [horas, minutos] = horaInput.split(':').map(Number);
  
  const fechaSeleccionada = new Date(año, mes - 1, dia, horas, minutos, 0);
  const ahora = new Date();
  
  // Calcular diferencia en minutos
  const diffMinutos = Math.floor((fechaSeleccionada - ahora) / 60000);
  
  console.log('Fecha seleccionada:', fechaSeleccionada);
  console.log('Ahora:', ahora);
  console.log('Diferencia minutos:', diffMinutos);
  
  if (diffMinutos < 30) {
    alert(`❌ La hora debe ser al menos 30 minutos mayor a la hora actual.\nFaltan ${30 - diffMinutos} minutos.`);
    return false;
  }
  
  return true;
}

// NUEVO: Configurador de hora SIN AM/PM
function configurarTimePicker24h(inputId, hiddenId) {
  const input = document.getElementById(inputId);
  const hidden = document.getElementById(hiddenId);
  
  if (!input || !hidden) return;
  
  function validarFormatoHora(hora) {
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(hora);
  }
  
  function actualizarHidden() {
    if (validarFormatoHora(input.value)) {
      hidden.value = input.value;
      input.classList.remove('error');
      input.classList.add('valid');
    } else {
      hidden.value = '';
      input.classList.remove('valid');
      input.classList.add('error');
    }
  }
  
  input.addEventListener('input', function() {
    let value = this.value.replace(/[^0-9]/g, '');
    
    if (value.length >= 3) {
      this.value = value.slice(0,2) + ':' + value.slice(2,4);
    } else {
      this.value = value;
    }
    
    const partes = this.value.split(':');
    if (partes[0]) {
      let hora = parseInt(partes[0]);
      if (hora > 23) this.value = '23' + (partes[1] ? ':' + partes[1] : '');
    }
    if (partes[1]) {
      let minutos = parseInt(partes[1]);
      if (minutos > 59) this.value = partes[0] + ':59';
    }
    
    actualizarHidden();
  });
  
  input.addEventListener('blur', function() {
    if (!validarFormatoHora(this.value)) {
      this.value = '';
      hidden.value = '';
    }
    actualizarHidden();
  });
  
  actualizarHidden();
}

function configurarDatePicker(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const hoyStr = `${año}-${mes}-${dia}`;
  
  input.min = hoyStr;
  input.value = hoyStr; // Poner hoy por defecto
  
  // Bloquear escritura manual
  input.addEventListener('keydown', function(e) {
    e.preventDefault();
    return false;
  });
  
  input.addEventListener('click', function() {
    this.showPicker();
  });
}

function configurarBotonesX() {
  document.querySelectorAll('.clear-input').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        targetInput.value = '';
        if (targetId.includes('HoraInput')) {
          const hiddenId = targetId.replace('Input', 'Inicio');
          const hidden = document.getElementById(hiddenId);
          if (hidden) hidden.value = '';
        }
      }
    });
  });
}

// Variables globales
let map;
let pickupAutocomplete;
let dropoffAutocomplete;
let horasAutocomplete;
let directionsService;
let directionsRenderer;
let pickupMarker = null;
let dropoffMarker = null;
let pickupPlace = null;
let dropoffPlace = null;
let horasPickupPlace = null;
let distanceMeters = null;
let ultimaReserva = null;
let userLocationMarker = null;

// ===== CONFIGURACIÓN DE FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyAGPUHsI-gX67ISkXBhIl6-Lr0Uo9enKX4",
  authDomain: "yipias-web-f06e1.firebaseapp.com",
  projectId: "yipias-web-f06e1",
  storageBucket: "yipias-web-f06e1.firebasestorage.app",
  messagingSenderId: "454915066576",
  appId: "1:454915066576:web:eb5a4235d6a8b3ded12cd5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== SISTEMA DE PESTAÑAS CON LIMPIEZA =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando pestañas...');
  
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
  
  function limpiarDatosMapa() {
    console.log('Limpiando datos del mapa...');
    
    if (pickupMarker) {
      pickupMarker.setMap(null);
      pickupMarker = null;
    }
    if (dropoffMarker) {
      dropoffMarker.setMap(null);
      dropoffMarker = null;
    }
    
    if (directionsRenderer) directionsRenderer.setDirections({ routes: [] });
    
    pickupPlace = null;
    dropoffPlace = null;
    horasPickupPlace = null;
    distanceMeters = null;
    
    const progDistance = document.getElementById('progDistance');
    const progPrice = document.getElementById('progPrice');
    if (progDistance) progDistance.textContent = '—';
    if (progPrice) progPrice.textContent = 'S/ 0.00';
    
    if (map) {
      map.setCenter({ lat: -5.1945, lng: -80.6328 });
      map.setZoom(11);
    }
  }
  
  const tabProgramada = document.getElementById('tabProgramada');
  const tabPorHoras = document.getElementById('tabPorHoras');
  const formProgramada = document.getElementById('formProgramada');
  const formPorHoras = document.getElementById('formPorHoras');
  const pickupInput = document.getElementById('pickup');
  const dropoffInput = document.getElementById('dropoff');
  const horasRecojoInput = document.getElementById('horasRecojo');
  
  if (tabProgramada && tabPorHoras && formProgramada && formPorHoras) {
    
    function activarProgramada() {
      formPorHoras.classList.remove('active-form');
      formPorHoras.classList.add('hidden-form');
      
      setTimeout(() => {
        tabProgramada.classList.add('active');
        tabPorHoras.classList.remove('active');
        
        formProgramada.classList.remove('hidden-form');
        formProgramada.classList.add('active-form');
        
        limpiarDatosMapa();
        if (horasRecojoInput) horasRecojoInput.value = '';
      }, 50);
    }
    
    function activarPorHoras() {
      formProgramada.classList.remove('active-form');
      formProgramada.classList.add('hidden-form');
      
      setTimeout(() => {
        tabPorHoras.classList.add('active');
        tabProgramada.classList.remove('active');
        
        formPorHoras.classList.remove('hidden-form');
        formPorHoras.classList.add('active-form');
        
        limpiarDatosMapa();
        if (pickupInput) pickupInput.value = '';
        if (dropoffInput) dropoffInput.value = '';
        setTimeout(() => initHorasAutocomplete(), 100);
      }, 50);
    }
    
    tabProgramada.addEventListener('click', activarProgramada);
    tabPorHoras.addEventListener('click', activarPorHoras);
    
    // Estado inicial: ninguna pestaña activa
    tabProgramada.classList.remove('active');
    tabPorHoras.classList.remove('active');
    formProgramada.classList.remove('active-form');
    formProgramada.classList.add('hidden-form');
    formPorHoras.classList.remove('active-form');
    formPorHoras.classList.add('hidden-form');
  }
  
  const horasSelect = document.getElementById('horasCantidad');
  const horasPrice = document.getElementById('horasPrice');
  const horasPaxInput = document.getElementById('horasPax');
  
  function actualizarPrecioHoras() {
    const horas = parseInt(horasSelect.value);
    const pax = parseInt(horasPaxInput.value);
    try {
      const precio = obtenerTarifaHoras(horas, pax);
      if (precio) horasPrice.textContent = `S/ ${precio}.00`;
    } catch (error) {
      alert(error.message);
      horasPaxInput.value = 6;
    }
  }
  
  if (horasSelect && horasPrice && horasPaxInput) {
    horasSelect.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i} ${i === 1 ? 'hora' : 'horas'}`;
      if (i === 3) option.selected = true;
      horasSelect.appendChild(option);
    }
    
    horasSelect.addEventListener('change', actualizarPrecioHoras);
    horasPaxInput.addEventListener('change', actualizarPrecioHoras);
    horasPaxInput.addEventListener('input', actualizarPrecioHoras);
    horasPaxInput.max = 6;
    horasPaxInput.addEventListener('change', function() {
      if (this.value > 6) {
        alert('El número máximo de pasajeros es 6');
        this.value = 6;
        actualizarPrecioHoras();
      }
    });
    actualizarPrecioHoras();
  }
  
  function initHorasAutocomplete() {
    const horasRecojoInput = document.getElementById('horasRecojo');
    if (horasRecojoInput && typeof google !== 'undefined' && map) {
      if (horasAutocomplete) google.maps.event.clearInstanceListeners(horasAutocomplete);
      
      const piuraBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-5.5, -81.5),
        new google.maps.LatLng(-4.5, -80.0)
      );
      
      horasAutocomplete = new google.maps.places.Autocomplete(horasRecojoInput, {
        fields: ["place_id", "geometry", "formatted_address", "name"],
        componentRestrictions: { country: 'pe' },
        types: ['geocode', 'establishment'],
        bounds: piuraBounds,
        strictBounds: true
      });
      
      horasAutocomplete.addListener('place_changed', () => {
        horasPickupPlace = horasAutocomplete.getPlace();
        if (horasPickupPlace?.geometry) {
          map.panTo(horasPickupPlace.geometry.location);
          map.setZoom(15);
          if (pickupMarker) pickupMarker.setMap(null);
          pickupMarker = new google.maps.Marker({
            position: horasPickupPlace.geometry.location,
            map: map,
            title: 'Punto de recojo (horas)',
            icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', scaledSize: new google.maps.Size(40, 40) },
            label: { text: 'H', color: 'white', fontSize: '14px', fontWeight: 'bold' }
          });
        }
      });
    }
  }
  
  // ===== BOTONES DE RESERVA CON FIREBASE =====
const progReserveBtn = document.getElementById('progReserveBtn');
if (progReserveBtn) {
  progReserveBtn.addEventListener('click', function() {
    if (!validarFechaHora('progFecha', 'progHoraInput', 'La hora debe ser al menos 30 minutos mayor a la hora actual')) {
      return;
    }
    
    // Determinar qué tipo de persona está activo en programada
    const esNatural = document.querySelector('#formProgramada .persona-btn.active')?.getAttribute('data-tipo') === 'natural';
    
    let nombres, apellidos, dni;
    
    if (esNatural) {
      // PERSONA NATURAL
      nombres = document.getElementById('progNombres')?.value || '';
      apellidos = document.getElementById('progApellidos')?.value || '';
      dni = document.getElementById('progDni')?.value || '';
    } else {
      // PERSONA JURÍDICA
      nombres = document.getElementById('progNombresRep')?.value || '';
      apellidos = document.getElementById('progRazonSocial')?.value || '';
      dni = document.getElementById('progRuc')?.value || '';
    }
    
    const telefono = document.getElementById('progTelefono')?.value || '';
    const recojo = document.getElementById('pickup')?.value || '';
    const destino = document.getElementById('dropoff')?.value || '';
    const fecha = document.getElementById('progFecha')?.value || '';
    const horaInicio = document.getElementById('progHoraInicio')?.value || '';
    const pax = parseInt(document.getElementById('progPax')?.value) || 1;
    const distancia = document.getElementById('progDistance')?.textContent || '—';
    const precio = document.getElementById('progPrice')?.textContent || 'S/ 0.00';
    
    // Obtener coordenadas - VERSIÓN CORREGIDA
    let recojoLat = null, recojoLng = null, destinoLat = null, destinoLng = null;

    try {
      if (pickupPlace?.geometry?.location) {
        if (typeof pickupPlace.geometry.location.lat === 'function') {
          recojoLat = pickupPlace.geometry.location.lat();
          recojoLng = pickupPlace.geometry.location.lng();
        } else {
          recojoLat = pickupPlace.geometry.location.lat;
          recojoLng = pickupPlace.geometry.location.lng;
        }
      }
    } catch (e) {
      console.log('Error coordenadas recojo:', e);
    }

    try {
      if (dropoffPlace?.geometry?.location) {
        if (typeof dropoffPlace.geometry.location.lat === 'function') {
          destinoLat = dropoffPlace.geometry.location.lat();
          destinoLng = dropoffPlace.geometry.location.lng();
        } else {
          destinoLat = dropoffPlace.geometry.location.lat;
          destinoLng = dropoffPlace.geometry.location.lng;
        }
      }
    } catch (e) {
      console.log('Error coordenadas destino:', e);
    }
    
    // Generar enlace a Google Maps
    const mapsLink = (recojoLat && recojoLng && destinoLat && destinoLng) 
      ? `https://www.google.com/maps/dir/${recojoLat},${recojoLng}/${destinoLat},${destinoLng}`
      : null;
    
    if (!nombres || !apellidos || !dni || !telefono || !recojo || !destino || !fecha || !horaInicio) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Preparar datos para Firebase
    const reservaData = {
      tipoReserva: 'programada',
      fechaReserva: firebase.firestore.FieldValue.serverTimestamp(),
      tipoPersona: esNatural ? 'natural' : 'juridica',
      nombres: nombres,
      documento: dni,
      telefono: telefono,
      lugarRecojo: recojo,
      destino: destino,
      fechaViaje: fecha,
      horaInicio: horaInicio,
      pasajeros: pax,
      distancia: distancia,
      precio: precio,
      recojoLat: recojoLat,
      recojoLng: recojoLng,
      destinoLat: destinoLat,
      destinoLng: destinoLng,
      mapsLink: mapsLink
    };
    
    // Si es natural, guarda apellidos; si es jurídica, guarda razón social
    if (esNatural) {
      reservaData.apellidos = apellidos;
    } else {
      reservaData.razonSocial = apellidos;
    }
    
    // Guardar en Firebase
    db.collection('reservas').add(reservaData)
      .then((docRef) => {
        console.log('✅ Reserva guardada en Firebase con ID:', docRef.id);
        
        // 🔥 REDIRECCIÓN DIRECTA A WHATSAPP
        const mensaje = "Envía este mensaje para confirmar tu reserva.";
        const telefonoWhatsApp = "51904635462"; // Solo números
        window.open(`https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
        
        // Opcional: limpiar formulario después de reservar
        // document.getElementById('formProgramada').reset();
      })
      .catch((error) => {
        console.error('❌ Error al guardar en Firebase:', error);
        alert('Reserva recibida, pero hubo un problema técnico. Te contactaremos igualmente.');
        
        // 🔥 AÚN ASÍ, REDIRIGIR A WHATSAPP
        const mensaje = "Envía este mensaje para confirmar tu reserva.";
        const telefonoWhatsApp = "51904635462";
        window.open(`https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
      });
  });
}
  
  const horasReserveBtn = document.getElementById('horasReserveBtn');
if (horasReserveBtn) {
  horasReserveBtn.addEventListener('click', function() {
    if (!validarFechaHora('horasFecha', 'horasHoraInput', 'La hora debe ser al menos 30 minutos mayor a la hora actual')) {
      return;
    }
    
    // Determinar qué tipo de persona está activo en horas
    const esNatural = document.querySelector('#formPorHoras .persona-btn.active')?.getAttribute('data-tipo') === 'natural';
    
    let nombres, apellidos, dni;
    
    if (esNatural) {
      // PERSONA NATURAL
      nombres = document.getElementById('horasNombres')?.value || '';
      apellidos = document.getElementById('horasApellidos')?.value || '';
      dni = document.getElementById('horasDni')?.value || '';
    } else {
      // PERSONA JURÍDICA
      nombres = document.getElementById('horasNombresRep')?.value || '';
      apellidos = document.getElementById('horasRazonSocial')?.value || '';
      dni = document.getElementById('horasRuc')?.value || '';
    }
    
    const telefono = document.getElementById('horasTelefono')?.value || '';
    const recojo = document.getElementById('horasRecojo')?.value || '';
    const fecha = document.getElementById('horasFecha')?.value || '';
    const horaInicio = document.getElementById('horasHoraInicio')?.value || '';
    const horas = parseInt(document.getElementById('horasCantidad')?.value) || 3;
    const pax = parseInt(document.getElementById('horasPax')?.value) || 1;
    const precio = document.getElementById('horasPrice')?.textContent || 'S/ 75.00';
    
    // Obtener coordenadas - VERSIÓN CORREGIDA
    let recojoLat = null, recojoLng = null;

    try {
      if (horasPickupPlace?.geometry?.location) {
        if (typeof horasPickupPlace.geometry.location.lat === 'function') {
          recojoLat = horasPickupPlace.geometry.location.lat();
          recojoLng = horasPickupPlace.geometry.location.lng();
        } else {
          recojoLat = horasPickupPlace.geometry.location.lat;
          recojoLng = horasPickupPlace.geometry.location.lng;
        }
      }
    } catch (e) {
      console.log('Error coordenadas recojo:', e);
    }
    
    // Generar enlace a Google Maps (solo punto de recojo)
    const mapsLink = (recojoLat && recojoLng) 
      ? `https://www.google.com/maps/search/?api=1&query=${recojoLat},${recojoLng}`
      : null;
    
    if (!nombres || !apellidos || !dni || !telefono || !recojo || !fecha || !horaInicio) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Preparar datos para Firebase
    const reservaData = {
      tipoReserva: 'horas',
      fechaReserva: firebase.firestore.FieldValue.serverTimestamp(),
      tipoPersona: esNatural ? 'natural' : 'juridica',
      nombres: nombres,
      documento: dni,
      telefono: telefono,
      lugarRecojo: recojo,
      fechaServicio: fecha,
      horaInicio: horaInicio,
      horasContratadas: horas,
      pasajeros: pax,
      precio: precio,
      recojoLat: recojoLat,
      recojoLng: recojoLng,
      mapsLink: mapsLink
    };
    
    // Si es natural, guarda apellidos; si es jurídica, guarda razón social
    if (esNatural) {
      reservaData.apellidos = apellidos;
    } else {
      reservaData.razonSocial = apellidos;
    }
    
    // Guardar en Firebase
    db.collection('reservas').add(reservaData)
      .then((docRef) => {
        console.log('✅ Reserva guardada en Firebase con ID:', docRef.id);
        
        // 🔥 REDIRECCIÓN DIRECTA A WHATSAPP
        const mensaje = "Envía este mensaje para confirmar tu reserva.";
        const telefonoWhatsApp = "51904635462";
        window.open(`https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
      })
      .catch((error) => {
        console.error('❌ Error al guardar en Firebase:', error);
        alert('Reserva recibida, pero hubo un problema técnico. Te contactaremos igualmente.');
        
        // 🔥 AÚN ASÍ, REDIRIGIR A WHATSAPP
        const mensaje = "Envía este mensaje para confirmar tu reserva.";
        const telefonoWhatsApp = "51904635462";
        window.open(`https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
      });
  });
}
  
  // ===== BOTONES DE UBICACIÓN ACTUAL =====
  const useMyLocationPickup = document.getElementById('useMyLocationPickup');
  const useMyLocationHoras = document.getElementById('useMyLocationHoras');

    // ===== BOTONES DE SELECCIÓN EN MAPA (AGREGAR AQUÍ) =====
  // Variables para selección en mapa
  let mapClickHandler = null;
  let pendingLocationInput = null;

  function enableMapSelection(inputElement) {
    if (!map) {
      alert('El mapa no está listo. Intenta de nuevo.');
      return;
    }
    
    // Remover handler anterior si existe
    if (mapClickHandler) {
      google.maps.event.removeListener(mapClickHandler);
    }
    
    pendingLocationInput = inputElement;
    
    // Cambiar cursor y hacer zoom al mapa
    map.setOptions({ draggableCursor: 'crosshair' });
    map.setZoom(15);
    
    alert(`Haz clic en el mapa para seleccionar ${inputElement.id === 'pickup' ? 'el punto de recojo' : inputElement.id === 'dropoff' ? 'el destino' : 'el punto de recojo'}`);
    
    mapClickHandler = map.addListener('click', function(event) {
      const clickedLocation = event.latLng;
      
      // Hacer zoom a la ubicación seleccionada
      map.setCenter(clickedLocation);
      map.setZoom(18);
      
      // Obtener dirección
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          pendingLocationInput.value = address;
          
          // Actualizar marcador
          if (pendingLocationInput.id === 'pickup') {
            if (pickupMarker) pickupMarker.setMap(null);
            pickupMarker = new google.maps.Marker({
              position: clickedLocation,
              map: map,
              title: 'Punto de recojo',
              icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', scaledSize: new google.maps.Size(40, 40) },
              label: { text: 'A', color: 'white', fontSize: '14px', fontWeight: 'bold' }
            });
            
            pickupPlace = {
              geometry: { location: clickedLocation },
              formatted_address: address,
              name: address
            };
            
            if (dropoffPlace?.geometry) calculateAndDisplayRoute();
          } 
          else if (pendingLocationInput.id === 'dropoff') {
            if (dropoffMarker) dropoffMarker.setMap(null);
            dropoffMarker = new google.maps.Marker({
              position: clickedLocation,
              map: map,
              title: 'Destino final',
              icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', scaledSize: new google.maps.Size(40, 40) },
              label: { text: 'B', color: 'white', fontSize: '14px', fontWeight: 'bold' }
            });
            
            dropoffPlace = {
              geometry: { location: clickedLocation },
              formatted_address: address,
              name: address
            };
            
            if (pickupPlace?.geometry) calculateAndDisplayRoute();
          }
          else if (pendingLocationInput.id === 'horasRecojo') {
            if (pickupMarker) pickupMarker.setMap(null);
            pickupMarker = new google.maps.Marker({
              position: clickedLocation,
              map: map,
              title: 'Punto de recojo (horas)',
              icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', scaledSize: new google.maps.Size(40, 40) },
              label: { text: 'H', color: 'white', fontSize: '14px', fontWeight: 'bold' }
            });
            
            horasPickupPlace = {
              geometry: { location: clickedLocation },
              formatted_address: address,
              name: address
            };
          }
          
          // Restaurar cursor
          map.setOptions({ draggableCursor: null });
          
          // Remover listener
          if (mapClickHandler) {
            google.maps.event.removeListener(mapClickHandler);
            mapClickHandler = null;
          }
          
          pendingLocationInput = null;
        } else {
          alert('No se pudo obtener la dirección');
        }
      });
    });
  }

  // Crear botón para pickup
  const pickupWrapper = document.getElementById('pickup')?.parentNode;
  if (pickupWrapper && !document.getElementById('selectMapPickup')) {
    const btn = document.createElement('div');
    btn.className = 'current-location-btn';
    btn.id = 'selectMapPickup';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M12 2v2M12 18v2M4 10h2M18 10h2"></path>
      </svg>
      <span>Seleccionar en mapa</span>
    `;
    btn.addEventListener('click', () => enableMapSelection(document.getElementById('pickup')));
    pickupWrapper.parentNode.insertBefore(btn, pickupWrapper.nextSibling);
  }

  // Crear botón para dropoff
  const dropoffWrapper = document.getElementById('dropoff')?.parentNode;
  if (dropoffWrapper && !document.getElementById('selectMapDropoff')) {
    const btn = document.createElement('div');
    btn.className = 'current-location-btn';
    btn.id = 'selectMapDropoff';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M12 2v2M12 18v2M4 10h2M18 10h2"></path>
      </svg>
      <span>Seleccionar en mapa</span>
    `;
    btn.addEventListener('click', () => enableMapSelection(document.getElementById('dropoff')));
    dropoffWrapper.parentNode.insertBefore(btn, dropoffWrapper.nextSibling);
  }

  // Crear botón para horas
  const horasWrapper = document.getElementById('horasRecojo')?.parentNode;
  if (horasWrapper && !document.getElementById('selectMapHoras')) {
    const btn = document.createElement('div');
    btn.className = 'current-location-btn';
    btn.id = 'selectMapHoras';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M12 2v2M12 18v2M4 10h2M18 10h2"></path>
      </svg>
      <span>Seleccionar en mapa</span>
    `;
    btn.addEventListener('click', () => enableMapSelection(document.getElementById('horasRecojo')));
    horasWrapper.parentNode.insertBefore(btn, horasWrapper.nextSibling);
  }
  
  function getCurrentLocation(inputElement, buttonElement) {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }
    
    buttonElement.classList.add('loading');
    buttonElement.style.pointerEvents = 'none';
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: userLocation }, (results, status) => {
          buttonElement.classList.remove('loading');
          buttonElement.style.pointerEvents = 'auto';
          
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;
            inputElement.value = address;
            
            map.setCenter(userLocation);
            map.setZoom(15);
            
            if (pickupMarker) pickupMarker.setMap(null);
            
            pickupMarker = new google.maps.Marker({
              position: userLocation,
              map: map,
              title: 'Tu ubicación',
              icon: { 
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
                scaledSize: new google.maps.Size(40, 40) 
              },
              label: { text: '📍', color: 'white', fontSize: '16px' }
            });
            
            if (inputElement.id === 'pickup') {
              pickupPlace = {
                geometry: { location: userLocation },
                formatted_address: address,
                name: address
              };
            } else if (inputElement.id === 'horasRecojo') {
              horasPickupPlace = {
                geometry: { location: userLocation },
                formatted_address: address,
                name: address
              };
            }
            
          } else {
            alert('No se pudo obtener la dirección de tu ubicación');
          }
        });
      },
      (error) => {
        buttonElement.classList.remove('loading');
        buttonElement.style.pointerEvents = 'auto';
        
        let mensaje = 'Error al obtener tu ubicación: ';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            mensaje += 'Permiso denegado. Por favor activa la ubicación.';
            break;
          case error.POSITION_UNAVAILABLE:
            mensaje += 'Información de ubicación no disponible.';
            break;
          case error.TIMEOUT:
            mensaje += 'Tiempo de espera agotado.';
            break;
          default:
            mensaje += 'Error desconocido.';
        }
        alert(mensaje);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }
  
  if (useMyLocationPickup) {
    useMyLocationPickup.addEventListener('click', () => {
      getCurrentLocation(pickupInput, useMyLocationPickup);
    });
  }
  
  if (useMyLocationHoras) {
    useMyLocationHoras.addEventListener('click', () => {
      getCurrentLocation(horasRecojoInput, useMyLocationHoras);
    });
  }
  
  // ===== CONFIGURAR SELECTORES DE HORA (SIN AM/PM) =====
  configurarTimePicker24h('progHoraInput', 'progHoraInicio');
  configurarTimePicker24h('horasHoraInput', 'horasHoraInicio');
  
  // ===== CONFIGURAR SELECTORES DE FECHA =====
  configurarDatePicker('progFecha');
  configurarDatePicker('horasFecha');
  
  // ===== CONFIGURAR BOTONES X =====
  configurarBotonesX();
  
  // ===== MANEJADORES DE MODALES =====
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) event.target.style.display = 'none';
  });
  
  const modalProgramadaBtn = document.getElementById('modalProgramadaBtn');
  if (modalProgramadaBtn) {
    modalProgramadaBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let mensaje = ultimaReserva?.tipo === 'programada'
        ? `¡Gracias por tu preferencia! Recuerda qué la tarifa no incluye peajes, estacionamiento ni paradas adicionales, y el tiempo de cortesía es de 5 minutos, pasado el tiempo se genera un cargo adicional.`
        : `¡Gracias por tu preferencia! Recuerda que la tarifa no incluye peajes, estacionamiento ni paradas adicionales, y el tiempo de cortesía es de 5 minutos.`;
      
      window.open(`https://wa.me/${WHATSAPP_PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(mensaje)}`, '_blank');
      document.getElementById('modalProgramada').style.display = 'none';
    });
  }
  
  const modalPorHorasBtn = document.getElementById('modalPorHorasBtn');
  if (modalPorHorasBtn) {
    modalPorHorasBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let mensaje = ultimaReserva?.tipo === 'horas'
        ? `¡Gracias por tu preferencia! Recuerda: El servicio por hora es válido solo en zonas urbanas. El máximo recorrido en una hora es de 20 kilómetros, pasado ese kilometraje se cobrará S/3.00 por kilómetro adicional. Pasados los 30 minutos se considera una hora completa, y el tiempo corre desde la llegada del móvil.`
        : `¡Gracias por tu preferencia! Recuerda las condiciones del servicio por horas.`;
      
      window.open(`https://wa.me/${WHATSAPP_PHONE.replace(/\D/g,'')}?text=${encodeURIComponent(mensaje)}`, '_blank');
      document.getElementById('modalPorHoras').style.display = 'none';
    });
  }
  
  // ===== SELECTOR DE PERSONA NATURAL / JURÍDICA =====
  function configurarSelectorPersona(formId) {
    const btns = document.querySelectorAll(`#${formId} .persona-btn`);
    const naturalId = formId === 'formProgramada' ? 'progCamposNatural' : 'horasCamposNatural';
    const juridicaId = formId === 'formProgramada' ? 'progCamposJuridica' : 'horasCamposJuridica';
    
    const camposNatural = document.getElementById(naturalId);
    const camposJuridica = document.getElementById(juridicaId);
    
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tipo = this.getAttribute('data-tipo');
        
        btns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        if (tipo === 'natural') {
          camposNatural.classList.remove('hidden-campos');
          camposNatural.classList.add('active-campos');
          camposJuridica.classList.remove('active-campos');
          camposJuridica.classList.add('hidden-campos');
        } else {
          camposJuridica.classList.remove('hidden-campos');
          camposJuridica.classList.add('active-campos');
          camposNatural.classList.remove('active-campos');
          camposNatural.classList.add('hidden-campos');
        }
      });
    });
  }
  
  configurarSelectorPersona('formProgramada');
  configurarSelectorPersona('formPorHoras');

  // ===== MODALES DE EXPLICACIÓN (UNA VEZ POR SESIÓN) =====
  const modalExplicacionProgramada = document.getElementById('modalExplicacionProgramada');
  const modalExplicacionHoras = document.getElementById('modalExplicacionHoras');
  
  const mostroProgramada = sessionStorage.getItem('mostroExplicacionProgramada');
  const mostroPorHoras = sessionStorage.getItem('mostroExplicacionHoras');
  
  if (tabProgramada && modalExplicacionProgramada && !mostroProgramada) {
    tabProgramada.addEventListener('click', function mostrarUnaVez(e) {
      if (!tabProgramada.classList.contains('active')) {
        modalExplicacionProgramada.style.display = 'block';
        sessionStorage.setItem('mostroExplicacionProgramada', 'true');
        tabProgramada.removeEventListener('click', mostrarUnaVez);
      }
    });
  }
  
  if (tabPorHoras && modalExplicacionHoras && !mostroPorHoras) {
    tabPorHoras.addEventListener('click', function mostrarUnaVez(e) {
      if (!tabPorHoras.classList.contains('active')) {
        modalExplicacionHoras.style.display = 'block';
        sessionStorage.setItem('mostroExplicacionHoras', 'true');
        tabPorHoras.removeEventListener('click', mostrarUnaVez);
      }
    });
  }
  
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  
  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(element => observer.observe(element));

  // ===== CARRUSEL =====
  const scrollContainer = document.querySelector('.destinations-scroll');
  const cards = document.querySelectorAll('.dest-card');
  if (scrollContainer && cards.length > 0) {
    let scrollAmount = 0;
    const cardWidth = cards[0].offsetWidth + 16;
    const maxScroll = (cards.length - 3) * cardWidth;
    function autoScroll() {
      scrollAmount += cardWidth;
      if (scrollAmount > maxScroll) scrollAmount = 0;
      scrollContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
    let interval = setInterval(autoScroll, 3000);
    scrollContainer.addEventListener('mouseenter', () => clearInterval(interval));
    scrollContainer.addEventListener('mouseleave', () => interval = setInterval(autoScroll, 3000));
  }

  // ===== SMOOTH SCROLL =====
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });
  
    // ===== MENÚ HAMBURGUESA =====
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    
    // Cerrar al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (event) => {
      if (!hamburgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
      }
    });
  }
});

// ===== FUNCIONES DEL MAPA =====
function initMap() {
  const defaultCenter = { lat: -5.1945, lng: -80.6328 };
  
  map = new google.maps.Map(document.getElementById('map'), { 
    center: defaultCenter, 
    zoom: 11,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
      { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }
    ],
    mapTypeControl: false,
    fullscreenControl: true,
    streetViewControl: false
  });

  const piuraBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-5.5, -81.5),
    new google.maps.LatLng(-4.5, -80.0)
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        map.setCenter(userLocation);
        map.setZoom(15);
        
        userLocationMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Tu ubicación',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(30, 30)
          }
        });
      },
      () => {
        console.log('No se pudo obtener la ubicación, usando Piura centro');
        map.setCenter(defaultCenter);
      }
    );
  }

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true,
    polylineOptions: { strokeColor: '#0d6efd', strokeWeight: 6, strokeOpacity: 1 }
  });

  const pickupInput = document.getElementById('pickup');
  if (pickupInput) {
    pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, { 
      fields: ["place_id", "geometry", "formatted_address", "name"],
      componentRestrictions: { country: 'pe' },
      types: ['geocode', 'establishment'],
      bounds: piuraBounds,
      strictBounds: true
    });
    
    pickupAutocomplete.addListener('place_changed', () => {
      pickupPlace = pickupAutocomplete.getPlace();
      if (pickupPlace?.geometry) {
        map.panTo(pickupPlace.geometry.location);
        map.setZoom(15);
        updatePickupMarker(pickupPlace.geometry.location, 'A', 'green');
        if (dropoffPlace?.geometry) calculateAndDisplayRoute();
      }
    });
  }

  const dropoffInput = document.getElementById('dropoff');
  if (dropoffInput) {
    dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, { 
      fields: ["place_id", "geometry", "formatted_address", "name"],
      componentRestrictions: { country: 'pe' },
      types: ['geocode', 'establishment']
    });
    
    dropoffAutocomplete.addListener('place_changed', () => {
      dropoffPlace = dropoffAutocomplete.getPlace();
      if (dropoffPlace?.geometry) {
        map.panTo(dropoffPlace.geometry.location);
        map.setZoom(15);
        updateDropoffMarker(dropoffPlace.geometry.location, 'B', 'red');
        if (pickupPlace?.geometry) calculateAndDisplayRoute();
      }
    });
  }

  window.initHorasAutocomplete = function() {
    const horasRecojoInput = document.getElementById('horasRecojo');
    if (horasRecojoInput && typeof google !== 'undefined' && map) {
      if (horasAutocomplete) google.maps.event.clearInstanceListeners(horasAutocomplete);
      
      horasAutocomplete = new google.maps.places.Autocomplete(horasRecojoInput, {
        fields: ["place_id", "geometry", "formatted_address", "name"],
        componentRestrictions: { country: 'pe' },
        types: ['geocode', 'establishment'],
        bounds: piuraBounds,
        strictBounds: true
      });
      
      horasAutocomplete.addListener('place_changed', () => {
        horasPickupPlace = horasAutocomplete.getPlace();
        if (horasPickupPlace?.geometry) {
          map.panTo(horasPickupPlace.geometry.location);
          map.setZoom(15);
          if (pickupMarker) pickupMarker.setMap(null);
          pickupMarker = new google.maps.Marker({
            position: horasPickupPlace.geometry.location,
            map: map,
            title: 'Punto de recojo (horas)',
            icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', scaledSize: new google.maps.Size(40, 40) },
            label: { text: 'H', color: 'white', fontSize: '14px', fontWeight: 'bold' }
          });
        }
      });
    }
  };
}

function updatePickupMarker(location, label, color = 'green') {
  if (pickupMarker) pickupMarker.setMap(null);
  const colors = { green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  pickupMarker = new google.maps.Marker({
    position: location, map: map, title: 'Punto de recojo',
    icon: { url: colors[color] || colors.green, scaledSize: new google.maps.Size(40, 40) },
    label: { text: label, color: 'white', fontSize: '14px', fontWeight: 'bold' }
  });
}

function updateDropoffMarker(location, label, color = 'red') {
  if (dropoffMarker) dropoffMarker.setMap(null);
  const colors = { red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
  dropoffMarker = new google.maps.Marker({
    position: location, map: map, title: 'Destino final',
    icon: { url: colors[color] || colors.red, scaledSize: new google.maps.Size(40, 40) },
    label: { text: label, color: 'white', fontSize: '14px', fontWeight: 'bold' }
  });
}

function calculateAndDisplayRoute() {
  if (!pickupPlace?.geometry || !dropoffPlace?.geometry) return;
  
  directionsService.route({
    origin: pickupPlace.geometry.location,
    destination: dropoffPlace.geometry.location,
    travelMode: google.maps.TravelMode.DRIVING
  }, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
      
      const distance = result.routes[0].legs[0].distance.value / 1000;
      distanceMeters = result.routes[0].legs[0].distance.value;
      const pax = parseInt(document.getElementById('progPax')?.value) || 1;
      
      try {
        const tarifa = obtenerTarifaKm(distance, pax);
        document.getElementById('progDistance').textContent = distance.toFixed(2) + ' km';
        document.getElementById('progPrice').textContent = `S/ ${tarifa}.00`;
        
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(pickupPlace.geometry.location);
        bounds.extend(dropoffPlace.geometry.location);
        map.fitBounds(bounds);
      } catch (error) {
        alert(error.message);
        document.getElementById('progPax').value = 6;
      }
    }
  });
}

// ===== VALIDACIÓN Y ACTUALIZACIÓN EN TIEMPO REAL =====
const progPax = document.getElementById('progPax');
if (progPax) {
  progPax.max = 6;
  progPax.addEventListener('change', function() {
    if (this.value > 6) {
      alert('El número máximo de pasajeros es 6');
      this.value = 6;
    }
  });
  
  const progDistanceSpan = document.getElementById('progDistance');
  const progPriceSpan = document.getElementById('progPrice');
  
  function actualizarPrecioProgramada() {
    const distanceText = progDistanceSpan?.textContent;
    if (!distanceText || distanceText === '—') return;
    const kmMatch = distanceText.match(/([\d.]+)/);
    if (!kmMatch) return;
    const km = parseFloat(kmMatch[0]);
    const pax = parseInt(progPax.value) || 1;
    try {
      const tarifa = obtenerTarifaKm(km, pax);
      if (progPriceSpan) progPriceSpan.textContent = `S/ ${tarifa}.00`;
    } catch (error) {
      console.log('Error actualizando precio:', error);
    }
  }
  
  progPax.addEventListener('change', actualizarPrecioProgramada);
  progPax.addEventListener('input', actualizarPrecioProgramada);
}