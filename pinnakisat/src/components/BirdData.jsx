const BirdData = ({birdDataBank}) => {

birdDataBank = {
1:{"fi": "Anseriformes - Sorsalinnut"},
2:{"fi":"Kyhmyjoutsen"},
3:{"fi": "Pikkujoutsen"},
4:{"fi":  "Laulujoutsen"},
5:{"fi":  "Metsähanhi"},
6:{"fi":  "Lyhytnokkahanhi"},
7:{"fi":  "Tundrahanhi"},
8:{"fi":  "Kiljuhanhi"},
9:{"fi":  "Merihanhi"},
10:{"fi":  "Lumihanhi"},
11:{"fi":  "Kanadanhanhi"},
12:{"fi":  "Valkoposkihanhi"},
13:{"fi":  "Sepelhanhi"},
14:{"fi":  "Punakaulahanhi"},
15:{"fi":  "Ruostesorsa"},
16:{"fi":  "Ristisorsa"},
17:{"fi":  "Mandariinisorsa"},
18:{"fi":  "Haapana"},
19:{"fi":  "Amerikanhaapana"},
20:{"fi":  "Harmaasorsa"},
21:{"fi":  "Tavi"},
22:{"fi":  "Amerikantavi"},
23:{"fi":  "Sinisorsa"},
24:{"fi":  "Nokisorsa"},
25:{"fi":  "Jouhisorsa"},
26:{"fi":  "Heinätavi"},
27:{"fi":  "Sinisiipitavi"},
28:{"fi":  "Lapasorsa"},
29:{"fi":  "Punapäänarsku"},
30:{"fi":  "Punasotka"},
31:{"fi":  "Amerikantukkasotka"},
32:{"fi":  "Ruskosotka"},
33:{"fi":  "Tukkasotka"},
34:{"fi":  "Lapasotka"},
35:{"fi":  "Pikkulapasotka"},
36:{"fi":  "Haahka"},
37:{"fi":  "Kyhmyhaahka"},
38:{"fi":  "Allihaahka"},
39:{"fi":  "Virta-alli"},
40:{"fi":  "Alli"},
41:{"fi":  "Mustalintu"},
42:{"fi":  "Amerikanmustalintu"},
43:{"fi":  "Pilkkaniska"},
44:{"fi":  "Pilkkasiipi"},
45:{"fi":  "Kyhmypilkkasiipi"},
46:{"fi":  "Telkkä"},
47:{"fi":  "Uivelo"},
48:{"fi":  "Tukkakoskelo"},
49:{"fi":  "Isokoskelo"},
50:{"fi":  "Kuparisorsa"},
52:{"fi":  "Pyy"},
53:{"fi":  "Riekko"},
54:{"fi":  "Kiiruna"},
55:{"fi":  "Teeri"},
56:{"fi":  "Metso"},
57:{"fi":  "Peltopyy"},
58:{"fi":  "Viiriäinen"},
59:{"fi":  "Fasaani"},
61:{"fi":  "Kaakkuri"},
62:{"fi":  "Kuikka"},
63:{"fi":  "Tundrakuikka"},
64:{"fi":  "Amerikanjääkuikka"},
65:{"fi":  "Jääkuikka"},
67:{"fi":  "Pikku-uikku"},
68:{"fi":  "Silkkiuikku"},
69:{"fi":  "Härkälintu"},
70:{"fi":  "Mustakurkku-uikku"},
71:{"fi":  "Mustakaulauikku"},
73:{"fi":  "Myrskylintu"},
74:{"fi":  "Nokiliitäjä"},
75:{"fi":  "Pikkuliitäjä"},
76:{"fi":  "Merikeiju"},
77:{"fi":  "Myrskykeiju"},
78:{"fi":  "Madeirankeiju"},
80:{"fi":  "Suula"},
81:{"fi":  "Merimetso"},
82:{"fi":  "Karimetso"},
83:{"fi":  "Pelikaani"},
85:{"fi":  "Kaulushaikara"},
86:{"fi":  "Pikkuhaikara"},
87:{"fi":  "Yöhaikara"},
88:{"fi":  "Rääkkähaikara"},
89:{"fi":  "Lehmähaikara"},
90:{"fi":  "Silkkihaikara"},
91:{"fi":  "Jalohaikara"},
92:{"fi":  "Harmaahaikara"},
93:{"fi":  "Ruskohaikara"},
94:{"fi":  "Mustahaikara"},
95:{"fi":  "Kattohaikara"},
96:{"fi":  "Pronssi-iibis"},
97:{"fi":  "Kapustahaikara"},
99:{"fi":  "Mehiläishaukka"},
100:{"fi":  "Haarahaukka"},
101:{"fi":  "Isohaarahaukka"},
102:{"fi":  "Aromerikotka"},
103:{"fi":  "Merikotka"},
104:{"fi":  "Pikkukorppikotka"},
105:{"fi":  "Hanhikorppikotka"},
106:{"fi":  "Munkkikorppikotka"},
107:{"fi":  "Käärmekotka"},
108:{"fi":  "Ruskosuohaukka"},
109:{"fi":  "Sinisuohaukka"},
110:{"fi":  "Arosuohaukka"},
111:{"fi":  "Niittysuohaukka"},
112:{"fi":  "Kanahaukka"},
113:{"fi":  "Varpushaukka"},
114:{"fi":  "Hiirihaukka"},
115:{"fi":  "Arohiirihaukka"},
116:{"fi":  "Piekana"},
117:{"fi":  "Pikkukiljukotka"},
118:{"fi":  "Kiljukotka"},
119:{"fi":  "Arokotka"},
120:{"fi":  "Keisarikotka"},
121:{"fi":  "Maakotka"},
122:{"fi":  "Pikkukotka"},
123:{"fi":  "Sääksi"},
125:{"fi":  "Pikkutuulihaukka"},
126:{"fi":  "Tuulihaukka"},
127:{"fi":  "Punajalkahaukka"},
128:{"fi":  "Ampuhaukka"},
129:{"fi":  "Nuolihaukka"},
130:{"fi":  "Välimerenhaukka"},
131:{"fi":  "Aavikkohaukka"},
132:{"fi":  "Tunturihaukka"},
133:{"fi":  "Muuttohaukka"},
135:{"fi":  "Luhtakana"},
136:{"fi":  "Luhtahuitti"},
137:{"fi":  "Pikkuhuitti"},
138:{"fi":  "Kääpiöhuitti"},
139:{"fi":  "Ruisrääkkä"},
140:{"fi":  "Liejukana"},
141:{"fi":  "Kurnuliejukana"},
142:{"fi":  "Nokikana"},
143:{"fi":  "Kurki"},
144:{"fi":  "Hietakurki"},
145:{"fi":  "Neitokurki"},
146:{"fi":  "Pikkutrappi"},
147:{"fi":  "Idänkaulustrappi"},
148:{"fi":  "Isotrappi"},
150:{"fi":  "Meriharakka"},
151:{"fi":  "Pitkäjalka"},
152:{"fi":  "Avosetti"},
153:{"fi":  "Paksujalka"},
154:{"fi":  "Aavikkojuoksija"},
155:{"fi":  "Pääskykahlaaja"},
156:{"fi":  "Aropääskykahlaaja"},
157:{"fi":  "Pikkutylli"},
158:{"fi":  "Tylli"},
159:{"fi":  "Mustajalkatylli"},
160:{"fi":  "Ylänkötylli"},
161:{"fi":  "Aavikkotylli"},
162:{"fi":  "Kaspiantylli"},
163:{"fi":  "Gobintylli"},
164:{"fi":  "Keräkurmitsa"},
165:{"fi":  "Siperiankurmitsa"},
166:{"fi":  "Amerikankurmitsa"},
167:{"fi":  "Kapustarinta"},
168:{"fi":  "Tundrakurmitsa"},
169:{"fi":  "Arohyyppä"},
170:{"fi":  "Suohyyppä"},
171:{"fi":  "Töyhtöhyyppä"},
172:{"fi":  "Isosirri"},
173:{"fi":  "Pulmussirri"},
174:{"fi":  "Rusokaulasirri"},
175:{"fi":  "Pikkusirri"},
176:{"fi":  "Lapinsirri"},
177:{"fi":  "Siperiansirri"},
178:{"fi":  "Amerikansirri"},
179:{"fi":  "Valkoperäsirri"},
180:{"fi":  "Eskimosirri"},
181:{"fi":  "Palsasirri"},
182:{"fi":  "Suippopyrstösirri"},
183:{"fi":  "Kuovisirri"},
184:{"fi":  "Merisirri"},
185:{"fi":  "Suosirri"},
186:{"fi":  "Pitkäkoipisirri"},
187:{"fi":  "Jänkäsirriäinen"},
188:{"fi":  "Tundravikla"},
189:{"fi":  "Suokukko"},
190:{"fi":  "Jänkäkurppa"},
191:{"fi":  "Taivaanvuohi"},
192:{"fi":  "Amerikantaivaanvuohi"},
193:{"fi":  "Heinäkurppa"},
194:{"fi":  "Siperiankurppa"},
195:{"fi":  "Tundrakurppelo"},
196:{"fi":  "Lehtokurppa"},
197:{"fi":  "Mustapyrstökuiri"},
198:{"fi":  "Punakuiri"},
199:{"fi":  "Taigakuovi"},
200:{"fi":  "Pikkukuovi"},
201:{"fi":  "Kuovi"},
202:{"fi":  "Rantakurvi"},
203:{"fi":  "Rantasipi"},
204:{"fi":  "Amerikansipi"},
205:{"fi":  "Metsäviklo"},
206:{"fi":  "Mustaviklo"},
207:{"fi":  "Valkoviklo"},
208:{"fi":  "Keltajalkaviklo"},
209:{"fi":  "Preeriaviklo"},
210:{"fi":  "Lampiviklo"},
211:{"fi":  "Liro"},
212:{"fi":  "Punajalkaviklo"},
213:{"fi":  "Karikukko"},
214:{"fi":  "Amerikanvesipääsky"},
215:{"fi":  "Vesipääsky"},
216:{"fi":  "Isovesipääsky"},
217:{"fi":  "Leveäpyrstökihu"},
218:{"fi":  "Merikihu"},
219:{"fi":  "Tunturikihu"},
220:{"fi":  "Isokihu"},
221:{"fi":  "Mustanmerenlokki"},
222:{"fi":  "Nokisiipilokki"},
223:{"fi":  "Preerianaurulokki"},
224:{"fi":  "Naurulokki"},
225:{"fi":  "Kaitanokkalokki"},
226:{"fi":  "Välimerenlokki"},
227:{"fi":  "Kalalokki"},
228:{"fi":  "Selkälokki"},
229:{"fi":  "Harmaalokki"},
230:{"fi":  "Aroharmaalokki"},
231:{"fi":  "Etelänharmaalokki"},
232:{"fi":  "Ohotanlokki"},
233:{"fi":  "Grönlanninlokki"},
234:{"fi":  "Isolokki"},
235:{"fi":  "Merilokki"},
236:{"fi":  "Ruusulokki"},
237:{"fi":  "Pikkukajava"},
238:{"fi":  "Jäälokki"},
239:{"fi":  "Tiiralokki"},
240:{"fi":  "Pikkulokki"},
241:{"fi":  "Hietatiira"},
242:{"fi":  "Räyskä"},
243:{"fi":  "Riuttatiira"},
244:{"fi":  "Kalatiira"},
245:{"fi":  "Lapintiira"},
246:{"fi":  "Pikkutiira"},
247:{"fi":  "Valkoposkitiira"},
248:{"fi":  "Mustatiira"},
249:{"fi":  "Valkosiipitiira"},
250:{"fi":  "Etelänkiisla"},
251:{"fi":  "Pohjankiisla"},
252:{"fi":  "Ruokki"},
253:{"fi":  "Riskilä"},
254:{"fi":  "Pikkuruokki"},
255:{"fi":  "Lunni"},
257:{"fi":  "Arokyyhky"},
259:{"fi":  "Kesykyyhky"},
260:{"fi":  "Uuttukyyhky"},
261:{"fi":  "Sepelkyyhky"},
262:{"fi":  "Turkinkyyhky"},
263:{"fi":  "Turturikyyhky"},
264:{"fi":  "Idänturturikyyhky"},
266:{"fi":  "Harakkakäki"},
267:{"fi":  "Käki"},
269:{"fi":  "Tornipöllö"},
270:{"fi":  "Kyläpöllönen"},
271:{"fi":  "Huuhkaja"},
272:{"fi":  "Tunturipöllö"},
273:{"fi":  "Hiiripöllö"},
274:{"fi":  "Varpuspöllö"},
275:{"fi":  "Minervanpöllö"},
276:{"fi":  "Lehtopöllö"},
277:{"fi":  "Viirupöllö"},
278:{"fi":  "Lapinpöllö"},
279:{"fi":  "Sarvipöllö"},
280:{"fi":  "Suopöllö"},
281:{"fi":  "Helmipöllö"},
283:{"fi":  "Kehrääjä"},
285:{"fi":  "Piikkipyrstökiitäjä"},
286:{"fi":  "Tervapääsky"},
287:{"fi":  "Vaaleakiitäjä"},
288:{"fi":  "Alppikiitäjä"},
289:{"fi":  "Kafferikiitäjä"},
291:{"fi":  "Kuningaskalastaja"},
292:{"fi":  "Mehiläissyöjä"},
293:{"fi":  "Vihermehiläissyöjä"},
294:{"fi":  "Sininärhi"},
295:{"fi":  "Harjalintu"},
297:{"fi":  "Käenpiika"},
298:{"fi":  "Harmaapäätikka"},
299:{"fi":  "Vihertikka"},
300:{"fi":  "Palokärki"},
301:{"fi":  "Käpytikka"},
302:{"fi":  "Tammitikka"},
303:{"fi":  "Valkoselkätikka"},
304:{"fi":  "Pikkutikka"},
305:{"fi":  "Pohjantikka"},
307:{"fi":  "Arokiuru"},
308:{"fi":  "Ylänkökiuru"},
309:{"fi":  "Valkosiipikiuru"},
310:{"fi":  "Mustakiuru"},
311:{"fi":  "Lyhytvarvaskiuru"},
312:{"fi":  "Pikkukiuru"},
313:{"fi":  "Töyhtökiuru"},
314:{"fi":  "Kangaskiuru"},
315:{"fi":  "Kiuru"},
316:{"fi":  "Tunturikiuru"},
317:{"fi":  "Törmäpääsky"},
318:{"fi":  "Kalliopääsky"},
319:{"fi":  "Haarapääsky"},
320:{"fi":  "Räystäspääsky"},
321:{"fi":  "Ruostepääsky"},
322:{"fi":  "Isokirvinen"},
323:{"fi":  "Mongoliankirvinen"},
324:{"fi":  "Nummikirvinen"},
325:{"fi":  "Taigakirvinen"},
326:{"fi":  "Metsäkirvinen"},
327:{"fi":  "Tundrakirvinen"},
328:{"fi":  "Niittykirvinen"},
329:{"fi":  "Lapinkirvinen"},
330:{"fi":  "Luotokirvinen"},
331:{"fi":  "Keltavästäräkki"},
332:{"fi":  "Sitruunavästäräkki"},
333:{"fi":  "Virtavästäräkki"},
334:{"fi":  "Västäräkki"},
335:{"fi":  "Tilhi"},
336:{"fi":  "Koskikara"},
337:{"fi":  "Peukaloinen"},
338:{"fi":  "Rautiainen"},
339:{"fi":  "Taigarautiainen"},
340:{"fi":  "Mustakurkkurautiainen"},
341:{"fi":  "Alppirautiainen"},
342:{"fi":  "Ruostepyrstö"},
343:{"fi":  "Punarinta"},
344:{"fi":  "Satakieli"},
345:{"fi":  "Etelänsatakieli"},
346:{"fi":  "Rubiinisatakieli"},
347:{"fi":  "Sinirinta"},
348:{"fi":  "Sinipyrstö"},
349:{"fi":  "Mustaleppälintu"},
350:{"fi":  "Leppälintu"},
351:{"fi":  "Pensastasku"},
352:{"fi":  "Nokitasku"},
353:{"fi":  "Sepeltasku"},
354:{"fi":  "Mustapäätasku"},
355:{"fi":  "Arotasku"},
356:{"fi":  "Kivitasku"},
357:{"fi":  "Nunnatasku"},
358:{"fi":  "Rusotasku"},
359:{"fi":  "Aavikkotasku"},
360:{"fi":  "Kivikkorastas"},
361:{"fi":  "Sinirastas"},
362:{"fi":  "Kirjorastas"},
363:{"fi":  "Korpirastas"},
364:{"fi":  "Sepelrastas"},
365:{"fi":  "Mustarastas"},
366:{"fi":  "Harmaakurkkurastas"},
367:{"fi":  "Ruosterastas"},
368:{"fi":  "Ruostesiipirastas"},
369:{"fi":  "Mustakaularastas"},
370:{"fi":  "Räkättirastas"},
371:{"fi":  "Laulurastas"},
372:{"fi":  "Punakylkirastas"},
373:{"fi":  "Kulorastas"},
374:{"fi":  "Viirusirkkalintu"},
375:{"fi":  "Pensassirkkalintu"},
376:{"fi":  "Viitasirkkalintu"},
377:{"fi":  "Ruokosirkkalintu"},
378:{"fi":  "Paksunokkakerttunen"},
379:{"fi":  "Pikkukultarinta"},
380:{"fi":  "Aavikkokultarinta"},
381:{"fi":  "Vaaleakultarinta"},
382:{"fi":  "Kultarinta"},
383:{"fi":  "Sarakerttunen"},
384:{"fi":  "Ruokokerttunen"},
385:{"fi":  "Kenttäkerttunen"},
386:{"fi":  "Viitakerttunen"},
387:{"fi":  "Luhtakerttunen"},
388:{"fi":  "Rytikerttunen"},
389:{"fi":  "Rastaskerttunen"},
390:{"fi":  "Ruskokerttu"},
391:{"fi":  "Rusorintakerttu"},
392:{"fi":  "Samettipääkerttu"},
393:{"fi":  "Mustakurkkukerttu"},
394:{"fi":  "Kääpiökerttu"},
395:{"fi":  "Kirjokerttu"},
396:{"fi":  "Hernekerttu"},
397:{"fi":  "Pensaskerttu"},
398:{"fi":  "Lehtokerttu"},
399:{"fi":  "Mustapääkerttu"},
400:{"fi":  "Amurinuunilintu"},
401:{"fi":  "Burjatianuunilintu"},
402:{"fi":  "Idänuunilintu"},
403:{"fi":  "Lapinuunilintu"},
404:{"fi":  "Hippiäisuunilintu"},
405:{"fi":  "Taigauunilintu"},
406:{"fi":  "Kashmirinuunilintu"},
407:{"fi":  "Siperianuunilintu"},
408:{"fi":  "Ruskouunilintu"},
409:{"fi":  "Vuoriuunilintu"},
410:{"fi":  "Balkaninuunilintu"},
411:{"fi":  "Sirittäjä"},
412:{"fi":  "Tiltaltti"},
413:{"fi":  "Iberiantiltaltti"},
414:{"fi":  "Pajulintu"},
415:{"fi":  "Hippiäinen"},
416:{"fi":  "Tulipäähippiäinen"},
417:{"fi":  "Harmaasieppo"},
418:{"fi":  "Pikkusieppo"},
419:{"fi":  "Sepelsieppo"},
420:{"fi":  "Kirjosieppo"},
421:{"fi":  "Viiksitimali"},
422:{"fi":  "Pyrstötiainen"},
423:{"fi":  "Viitatiainen"},
424:{"fi":  "Hömötiainen"},
425:{"fi":  "Lapintiainen"},
426:{"fi":  "Töyhtötiainen"},
427:{"fi":  "Kuusitiainen"},
428:{"fi":  "Sinitiainen"},
429:{"fi":  "Valkopäätiainen"},
430:{"fi":  "Talitiainen"},
431:{"fi":  "Pähkinänakkeli"},
432:{"fi":  "Puukiipijä"},
433:{"fi":  "Pussitiainen"},
434:{"fi":  "Kuhankeittäjä"},
435:{"fi":  "Punapyrstölepinkäinen"},
436:{"fi":  "Pikkulepinkäinen"},
437:{"fi":  "Mustaotsalepinkäinen"},
438:{"fi":  "Isolepinkäinen"},
439:{"fi":  "Etelänisolepinkäinen"},
440:{"fi":  "Punapäälepinkäinen"},
441:{"fi":  "Valko-otsalepinkäinen"},
442:{"fi":  "Närhi"},
443:{"fi":  "Kuukkeli"},
444:{"fi":  "Harakka"},
445:{"fi":  "Pähkinähakki"},
446:{"fi":  "Naakka"},
447:{"fi":  "Idännaakka"},
448:{"fi":  "Mustavaris"},
449:{"fi":  "Varis"},
450:{"fi":  "Korppi"},
451:{"fi":  "Kottarainen"},
452:{"fi":  "Punakottarainen"},
453:{"fi":  "Varpunen"},
454:{"fi":  "Pensasvarpunen"},
455:{"fi":  "Pikkuvarpunen"},
456:{"fi":  "Peippo"},
457:{"fi":  "Järripeippo"},
458:{"fi":  "Keltahemppo"},
459:{"fi":  "Viherpeippo"},
460:{"fi":  "Tikli"},
461:{"fi":  "Vihervarpunen"},
462:{"fi":  "Hemppo"},
463:{"fi":  "Vuorihemppo"},
464:{"fi":  "Urpiainen"},
465:{"fi":  "Tundraurpiainen"},
466:{"fi":  "Kirjosiipikäpylintu"},
467:{"fi":  "Pikkukäpylintu"},
468:{"fi":  "Isokäpylintu"},
469:{"fi":  "Aavikkotulkku"},
470:{"fi":  "Punavarpunen"},
471:{"fi":  "Taviokuurna"},
472:{"fi":  "Punatulkku"},
473:{"fi":  "Nokkavarpunen"},
474:{"fi":  "Viirukerttuli"},
475:{"fi":  "Kettusirkku"},
476:{"fi":  "Valkokurkkusirkku"},
477:{"fi":  "Lapinsirkku"},
478:{"fi":  "Pulmunen"},
479:{"fi":  "Harmaapääsirkku"},
480:{"fi":  "Mäntysirkku"},
481:{"fi":  "Keltasirkku"},
482:{"fi":  "Peltosirkku"},
483:{"fi":  "Kivikkosirkku"},
484:{"fi":  "Ruostekurkkusirkku"},
485:{"fi":  "Pohjansirkku"},
486:{"fi":  "Pikkusirkku"},
487:{"fi":  "Kastanjasirkku"},
488:{"fi":  "Kultasirkku"},
489:{"fi":  "Pajusirkku"},
490:{"fi":  "Mustapääsirkku"},
490:{"fi":  "Harmaasirkku"},
491:{"fi":  "Idänpikkusieppo"},
492:{"fi":  "Preeriakahlaaja"},
 };
}

export default BirdData