import { useState, useEffect, useMemo, useCallback, useRef } from "react";

const ZADANIA = [
  {id:1,topics:[{a:"Biológia ako veda",n:"Biológia ako veda, biologické vedy",k:"teória"},{a:"Systém a fylogenéza rastlín",n:"Znaky jednoklíčnolistových a dvojklíčnolistových rastlín",k:"teória"},{a:"Biológia bunky",n:"Osmotické javy v bunke",k:"praktikum"}]},
  {id:2,topics:[{a:"Biológia bunky",n:"Bunková teória a predstavitelia",k:"teória"},{a:"Biológia človeka",n:"Pohlavná sústava muža a ženy",k:"teória"},{a:"Systém a fylogenéza rastlín",n:"Určovanie rastlín",k:"praktikum"}]},
  {id:3,topics:[{a:"Systém a fylogenéza živočíchov",n:"Jednobunkovce (meňavky, bičíkovce, výtrusovce, nálevníky)",k:"teória"},{a:"Biológia bunky",n:"Príjem a výdaj látok bunkou",k:"teória"},{a:"Biológia ako veda",n:"Práca s mikroskopom",k:"praktikum"}]},
  {id:4,topics:[{a:"Biológia rastlín",n:"Rastlinné pletivá",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Drsnokožce a ryby",k:"teória"},{a:"Genetika",n:"Dedičnosť krvných skupín A, B, 0",k:"odborný text"}]},
  {id:5,topics:[{a:"Huby a lišajníky",n:"Huby",k:"teória"},{a:"Morfológia a fyziológia živočíchov",n:"Fylogenéza krycej, opornej a pohybovej sústavy v živočíšnej ríši",k:"teória"},{a:"Biológia človeka",n:"Lateralita párových orgánov",k:"praktikum"}]},
  {id:6,topics:[{a:"Biológia človeka",n:"Ontogenéza človeka",k:"teória"},{a:"Morfológia a fyziológia živočíchov",n:"Fylogenéza tráviacej sústavy živočíchov",k:"teória"},{a:"Biológia človeka",n:"Zisťovanie rozloženia chuťových buniek",k:"praktikum"}]},
  {id:7,topics:[{a:"Ekológia",n:"Ekológia ako veda, ekologické pojmy a odvetvia",k:"teória"},{a:"Biológia rastlín",n:"Výživa rastlín",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Rosnička zelená",k:"odborný text"}]},
  {id:8,topics:[{a:"Systém a fylogenéza živočíchov",n:"Prvoústovce – Ploskavce a Hlístovce",k:"teória"},{a:"Biológia človeka",n:"Pohybová sústava človeka",k:"teória"},{a:"Biológia bunky",n:"Prieduchy a hydatódy",k:"odborný text"}]},
  {id:9,topics:[{a:"Lišajníky",n:"Lišajníky",k:"teória"},{a:"Biológia človeka",n:"Oporná sústava človeka",k:"teória"},{a:"Biológia človeka",n:"Meranie krvného tlaku",k:"praktikum"}]},
  {id:10,topics:[{a:"Biológia človeka",n:"Tráviaca sústava človeka",k:"teória"},{a:"Fyziológia rastlín",n:"Fotosyntéza",k:"teória"},{a:"Biológia rastlín",n:"Bunkové organely – pozorovanie",k:"praktikum"}]},
  {id:11,topics:[{a:"Biológia živočíchov",n:"Fylogenéza dýchacej sústavy živočíchov",k:"teória"},{a:"Biológia rastlín",n:"Kvety nahosemenných a krytosemenných rastlín, súkvetia",k:"teória"},{a:"Biológia človeka",n:"Frekvencia dýchania a apnoická pauza",k:"praktikum"}]},
  {id:12,topics:[{a:"Biológia človeka",n:"Hormonálna sústava človeka",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Článkonožce",k:"teória"},{a:"Biológia rastlín",n:"Kvetné vzorce a diagramy",k:"odborný text"}]},
  {id:13,topics:[{a:"Biológia živočíchov",n:"Tkanivá živočíchov",k:"teória"},{a:"Biológia bunky",n:"Bunkový cyklus",k:"teória"},{a:"Biológia človeka",n:"Ruffierov test zdatnosti organizmu",k:"praktikum"}]},
  {id:14,topics:[{a:"Systém a fylogenéza rastlín",n:"Nižšie rastliny",k:"teória"},{a:"Genetika",n:"Mutácie",k:"teória"},{a:"Biológia človeka",n:"Epitelové bunky – pozorovanie",k:"praktikum"}]},
  {id:15,topics:[{a:"Biológia rastlín",n:"Nepohlavné a pohlavné rozmnožovanie rastlín",k:"teória"},{a:"Biológia človeka",n:"Krv a zložky krvi",k:"teória"},{a:"Genetika",n:"Kodóny a aminokyseliny",k:"odborný text"}]},
  {id:16,topics:[{a:"Ekológia",n:"Abiotické faktory",k:"teória"},{a:"Biológia človeka",n:"Imunitný systém človeka",k:"teória"},{a:"Biológia bunky",n:"Pozorovanie sklereidov",k:"praktikum"}]},
  {id:17,topics:[{a:"Biológia človeka",n:"Obehová sústava človeka",k:"teória"},{a:"Biológia bunky",n:"Mitóza a meióza",k:"teória"},{a:"Biológia rastlín",n:"Pozorovanie chromoplastov",k:"praktikum"}]},
  {id:18,topics:[{a:"Biológia rastlín",n:"Vegetatívne a generatívne orgány rastlinného tela",k:"teória"},{a:"Biológia človeka",n:"Nervová sústava človeka",k:"teória"},{a:"Fyziológia živočíchov",n:"Tráviaca sústava živočíchov",k:"odborný text"}]},
  {id:19,topics:[{a:"Nebunkové a prokaryotické organizmy",n:"Baktérie",k:"teória"},{a:"Biológia rastlín",n:"Príjem, vedenie a výdaj vody rastlinou",k:"teória"},{a:"Ekológia",n:"Ochrana prírody",k:"odborný text"}]},
  {id:20,topics:[{a:"Systém a fylogenéza rastlín",n:"Nahosemenné rastliny",k:"teória"},{a:"Genetika",n:"Mendelove zákony dedičnosti",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Určovanie živočíchov – bezstavovce",k:"praktikum"}]},
  {id:21,topics:[{a:"Genetika",n:"Gonozómová dedičnosť",k:"teória"},{a:"Biológia živočíchov",n:"Termoregulácia živočíchov",k:"teória"},{a:"Ekológia",n:"Klimatické zmeny – príčiny a dôsledky",k:"odborný text"}]},
  {id:22,topics:[{a:"Biológia človeka",n:"Vylučovacia sústava a kožná sústava človeka",k:"teória"},{a:"Biológia bunky",n:"Prokaryotická a eukaryotická bunka",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Hmyz",k:"odborný text"}]},
  {id:23,topics:[{a:"Biológia ako veda",n:"Významní predstavitelia biológie a vedecké objavy",k:"teória"},{a:"Genetika",n:"Nukleové kyseliny – DNA, RNA, syntéza",k:"teória"},{a:"Biológia rastlín",n:"Koreň",k:"odborný text"}]},
  {id:24,topics:[{a:"Biológia živočíchov",n:"Fylogenéza vylučovacej sústavy živočíchov",k:"teória"},{a:"Ekológia",n:"Potravové reťazce",k:"teória"},{a:"Biológia bunky",n:"Škrobové zrná – pozorovanie",k:"praktikum"}]},
  {id:25,topics:[{a:"Biológia človeka",n:"Dýchacia sústava človeka",k:"teória"},{a:"Ekológia",n:"Populácia",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Určovanie živočíchov – stavovce",k:"praktikum"}]},
  {id:26,topics:[{a:"Biológia živočíchov",n:"Zmyslové orgány živočíchov",k:"teória"},{a:"Ekológia",n:"Zmeny svetového životného prostredia",k:"teória"},{a:"Biológia človeka",n:"Zásady správnej výživy",k:"odborný text"}]},
  {id:27,topics:[{a:"Systém a fylogenéza rastlín",n:"Výtrusné rastliny",k:"teória"},{a:"Systém a fylogenéza živočíchov",n:"Vtáky a cicavce",k:"teória"},{a:"Biológia človeka",n:"Zrenicový reflex",k:"praktikum"}]},
  {id:28,topics:[{a:"Biológia človeka",n:"Zmyslové orgány človeka",k:"teória"},{a:"Etológia",n:"Správanie živočíchov",k:"teória"},{a:"Genetika",n:"Hemofília a daltonizmus",k:"odborný text"}]},
  {id:29,topics:[{a:"Systém a fylogenéza rastlín",n:"Machorasty a rodozmena",k:"teória"},{a:"Biológia živočíchov",n:"Mnohobunkovce – hubky, pŕhlivce a nepŕhlivce",k:"teória"},{a:"Biológia človeka",n:"Obehová sústava a choroby obehovej sústavy",k:"odborný text"}]},
  {id:30,topics:[{a:"Nebunkové organizmy",n:"Vírusy",k:"teória"},{a:"Genetika",n:"Proteosyntéza",k:"teória"},{a:"Systém a fylogenéza rastlín",n:"Ihličnany – pozorovanie",k:"praktikum"}]}
];


const E = {
"1-0":`## Čo je biológia
**Biológia** je prírodná veda o živých organizmoch – ich stavbe, funkciách, vývoji a vzájomných vzťahoch.

## Znaky živých organizmov
- **Metabolizmus** – látková a energetická premena
- **Dráždivosť** – reakcia na podnety
- **Rast a vývoj**, **rozmnožovanie**, **dedičnosť a variabilita**, **pohyb**, **adaptácia**

## Biologické vedy (disciplíny)
- **Botanika** – rastliny; **Zoológia** – živočíchy; **Mikrobiológia** – mikroorganizmy
- **Mykológia** – huby; **Cytológia** – bunky; **Histológia** – tkanivá
- **Anatómia** – stavba; **Fyziológia** – funkcie; **Genetika** – dedičnosť
- **Ekológia** – vzťahy organizmov a prostredia; **Etológia** – správanie
- **Evolučná biológia**, **Paleontológia**, **Antropológia**

## Metódy biológie
Pozorovanie, experiment, klasifikácia (systematizácia), porovnávanie, modelovanie.

## Na maturite sa pýtajú
Vymenovanie biologických vied s príkladmi, znaky živých organizmov, rozdiel medzi autotrofiou a heterotrofiou.`,

"1-1":`## Základné rozdelenie krytosemenných
Krytosemenné rastliny (Angiospermae) sa delia podľa počtu klíčnych listov na dve skupiny.

## Jednoklíčnolistové (Monocotyledonae)
- **1 klíčny list** (kotyledón)
- **Súbežná (paralelná) žilnatina** listov
- Kvety **trojčetné** (3 alebo násobky 3 – 3 lupienky, 3+3 tyčiniek...)
- **Vláknitý** koreňový systém
- Cievne zväzky **roztrúsené** v stonke (bez kambium → no druhotné hrubnutie)
- Príklady: **trávy, pšenica, kukurica, ľalia, tulipán, orchidey, palmy**

## Dvojklíčnolistové (Dicotyledonae)
- **2 klíčne listy** (kotyledóny)
- **Sieťová žilnatina** (prstovitá, vajcovitá)
- Kvety **4- alebo 5-četné** (štyri alebo päť lupienkov, tyčiniek...)
- **Kôlový** koreňový systém
- Cievne zväzky **usporiadané do prstenca** (kambium → druhotné hrubnutie u drevín)
- Príklady: **ruža, jablôň, slnečnica, mak, fazuľa, dub, breza**

## Na maturite sa pýtajú
Tabuľkové porovnanie oboch skupín, zaradenie konkrétnych rastlín, prečo trávy nemôžu hrubknúť (nemajú kambium).`,

"1-2":`## Čo je osmóza
**Osmóza** je prechod vody cez polopriepustnú (semipermeabilnú) membránu z oblasti **nižšej** koncentrácie rozpustených látok do oblasti **vyššej** koncentrácie.

## Kľúčové pojmy
- **Turgor** – napätie bunky pri vniknutí vody (v hypotonickom prostredí); bunka je pevná
- **Plazmoláza** – oddelenie cytoplazmy od bunkovej steny; nastáva v **hypertonickom** roztoku (bunka stráca vodu)
- **Deplazmolýza** – návrat do normálu po prenesení späť do slabšieho roztoku
- **Hypotonický roztok** – nižšia koncentrácia než vnútri bunky → voda vstupuje do bunky
- **Hypertonický roztok** – vyššia koncentrácia → voda z bunky vystupuje
- **Izotonický roztok** – rovnaká koncentrácia → bunka nemení objem

## Pomôcky a postup
Cibuľa, mikroskop, sklíčka, 10% roztok NaCl, destilovaná voda.
1. Pripraviť tenký rez pokožky cibule
2. Pozorovať v destilovanej vode → bunky sú turgidné (plné)
3. Pridať kvapku 10% NaCl → pozorovanie plazmolázy (cytoplazma sa oddeľuje od steny)
4. Pridať destilovanú vodu → deplazmolýza

## Záver
Rastlinné bunky reagujú na osmotické podmienky prostredia – turgor dáva rastlinám pevnosť, plazmoláza môže byť smrteľná pri dlhom trvaní.`,


"2-0":`## Bunková teória – 3 základné tvrdenia
1. Všetky živé organizmy sa skladajú z **buniek** a ich produktov
2. **Bunka je základná stavebná a funkčná jednotka** živých organizmov
3. Každá bunka vzniká len z inej bunky – delením (**Omnis cellula e cellula**)

## Hlavní predstavitelia
- **Robert Hooke** (1665) – prvý pozoroval bunkové steny korkového tkaniva, zaviedol pojem *bunka*
- **Anton van Leeuwenhoek** (17. stor.) – zdokonalil mikroskop, objavil baktérie a prvoky
- **Matthias Schleiden** (1838) – bunková stavba rastlín
- **Theodor Schwann** (1839) – bunková stavba živočíchov; spolu so Schleideinom 1. bunková teória
- **Rudolf Virchow** (1858) – „Omnis cellula e cellula" – každá bunka pochádza z bunky

## Typy buniek
- **Prokaryotická bunka** – bez membránového jadra (baktérie, archebaktérie)
- **Eukaryotická bunka** – s membránovým jadrom (rastliny, živočíchy, huby, prvoky)

## Na maturite sa pýtajú
Vymenovanie a vysvetlenie 3 tvrdení bunkovej teórie, mená vedcov v správnom poradí a ich prínosy.`,

"2-1":`## Pohlavná sústava muža
- **Semenníky** – produkcia spermií (spermatogenéza) a testosterónu; uložené v miešku (scrotum)
- **Nadsemenník (epididymis)** – dozrievanie a skladovanie spermií
- **Chámovod (ductus deferens)** – prenos spermií k uretère
- **Semenné vačky** – produkujú fruktózu a sekrét pre spermie
- **Predstojnica (prostata)** – zásaditý sekrét (neutralizuje kyslosť vagíny)
- **Cowperove žľazy** – lubrikácia; **Penis** – pohlavný orgán
- **Sperma** = spermie + sekréty prídavných žliaz

## Pohlavná sústava ženy
- **Vaječníky (ovaria)** – produkcia vajíčok (oogenéza), estrogénu a progesterónu
- **Vajcovody (Fallopiove trubice)** – vedenie vajíčka, miesto oplodnenia
- **Maternica (uterus)** – vývoj plodu; sliznica = endometrium
- **Krčok maternice (cervix)** + **Vagína** – pôrodný kanál

## Menštruačný cyklus (~28 dní)
Folikulárna fáza → **ovulácia** (14. deň, pod vplyvom LH) → luteálna fáza → menštruácia (ak nenastalo oplodnenie).

## Na maturite sa pýtajú
Porovnanie oboch sústav, hormóny (testosterón, estrogén, progesterón, FSH, LH), menštruačný cyklus.`,

"2-2":`## Čo je určovanie rastlín
Identifikácia druhu alebo rodu rastliny pomocou **dichotomického (dvojklúčového) určovacieho kľúča** – pri každom kroku vyberieš medzi dvomi protikladnými vlastnosťami (A alebo B).

## Sledované morfologické znaky
- Tvar a okraj listu (celokrajný, pilovitý, laločnatý)
- Usporiadanie listov (striedavé, vstrebané, protistojné, praslenové)
- Žilnatina (súbežná = jednoklíčnolistové; sieťová = dvojklíčnolistové)
- Typ stonky (bylina, ker, strom)
- Farba, tvar, počet lupienkov kvetu; typ plodu (bobule, struk, nažka...)

## Postup
1. Vziať rastlinu s listami (ideálne s kvetmi alebo plodmi)
2. Postupovať cez kľúč krok za krokom
3. Pri každom kroku vybrať tvrdenie, ktoré lepšie zodpovedá rastline
4. Na konci kľúč ukáže druh/rod
5. Overiť v fotografickom atlase alebo herbári

## Záver
Kľúčové je rozlíšiť žilnatinu, tvar listu a usporiadanie. Chyby nastávajú hlavne pri zámenách podobných druhov – preto sa overuje v atlase.`,


"3-0":`## Čo sú jednobunkovce
Organizmy zložené z **jednej bunky**, ktorá vykonáva všetky životné funkcie. Patria medzi prvoky (Protista) – eukaryoty.

## Meňavky (Rhizopoda / Amoeba)
- Pohyb pomocou **pseudopódií** (panôžok) – výbežkov cytoplazmy
- Príjem potravy **fagocytózou** → potravová vakuola
- Rozmnožovanie binárnym delením
- Parazity: *Entamoeba histolytica* → **amébová úplavica**

## Bičíkovce (Flagellata)
- Pohyb pomocou **bičíkov** (flagiel)
- *Euglena viridis* – má chloroplasty → mixotrofia (svetlo = autotrofia; tma = heterotrofia)
- Parazity: *Trypanosoma* (spavá choroba), *Giardia* (lambliáza), *Leishmania*

## Výtrusovce (Sporozoa / Apicomplexa)
- Všetky sú **obligátne parazity**, bez pohybových organel
- Rozmnožovanie **výtrusmi (sporami)**
- *Plasmodium* spp. → **malária**; prenáša komár rodu *Anopheles*
- *Toxoplasma gondii* → toxoplazmóza; prenáša mačka

## Nálevníky (Ciliata)
- Pohyb pomocou **riasiniek (cílií)**
- *Paramecium caudatum* – riasenka; 2 jadrá: **makronukleus** (metabolizmus) + **mikronukleus** (pohlavné rozmnožovanie – konjugácia)

## Na maturite sa pýtajú
Porovnanie skupín, pohybové organely, príklady parazitov a choroby ktoré spôsobujú.`,

"3-1":`## Pasívny transport (bez energie ATP)
Smer: z miesta vyššej → nižšej koncentrácie (po koncentračnom spáde).
- **Difúzia** – prechod malých nepolárnych molekúl cez membránu (O₂, CO₂, etanol)
- **Osmóza** – prechod vody cez semipermeabilnú membránu
- **Facilitovaná difúzia** – s pomocou **kanálových proteínov** alebo **nosičov** (glukóza, ióny); rýchlejšia ako prostá difúzia

## Aktívny transport (vyžaduje ATP)
Smer: z nižšej → vyššej koncentrácie (proti spádu).
- Pomocou **transportných proteínov (pump, ATPáz)**
- Príklad: **Na⁺/K⁺ pumpa** – vyhadzuje 3 Na⁺ von, čerpá 2 K⁺ dnu → membránový potenciál

## Vezikulárny transport
- **Endocytóza** – príjem látok do bunky (membrána sa preliačí dnu):
  - *Fagocytóza* – pevné telieska (baktérie, bunky)
  - *Pinocytóza* – kvapaliny a rozpustené látky
  - *Receptorovo sprostredkovaná endocytóza* – LDL cholesterol, hormóny
- **Exocytóza** – výdaj látok von (sekrečné vezikuly sa spájajú s membránou): inzulín, neurotransmitery

## Na maturite sa pýtajú
Rozlíšiť pasívny vs. aktívny (spotreba energie), konkrétne príklady pre každý typ; rozdiel fagocytóza vs. pinocytóza.`,

"3-2":`## Stavba svetelného mikroskopu
- **Okuár** – šošovka pri oku (10× alebo 15×)
- **Objektív** – šošovka pri preparáte (4×, 10×, 40×, 100×); otáča sa na **revolveri**
- **Kondenzor** – sústreďuje svetlo na preparát
- **Platforma (stolík)** – plošina pre preparát + posuvné skrutky
- **Makroskruby** – hrubé zaostrenie; **Mikroskruby** – jemné doostrovanie
- **Zrkadlo alebo žiarovka** – zdroj svetla; **Stojan, rameno, pätka**

## Zväčšenie
Výsledné zväčšenie = **okuár × objektív** (napr. 10 × 40 = 400×)

## Postup pozorovania
1. Nastaviť zdroj svetla (zavrieť clonu kondenzora len čiastočne)
2. Umiestniť preparát na platformu, zaistiť sponami
3. Zaostriť **makroskrubou** (pohľad zboku – nechybovať objektívom o preparát!)
4. Doladiť **mikroskrubou**
5. Pri prechode na silnejší objektív – znovu doladiť mikroskrubou (NIE makroskrubou)

## Príprava preparátu
Tenký rez → na podložné sklíčko → kvapka vody → krycie sklíčko → pritlačiť bez vzduchových bublín.

## Záver
Najčastejšia chyba: poškrabanie objektívu o sklíčko pri priblížovaní zhora. Vždy priblížiť zboku, potom otáčať makroskrubou smerom od preparátu.`,


"4-0":`## Čo sú rastlinné pletivá
**Rastlinné pletivá (tkanivá)** sú skupiny buniek rovnakej stavby, pôvodu a funkcie.

## Deliace pletivá (meristémy) – bunky sa delia
- **Vrcholový meristém** – na vrcholoch koreňov a stonky → **primárny (dĺžkový) rast**
- **Bočný meristém (kambium)** – u drevín → **druhotné (hrubkové) hrubnutie**
- **Intercalárny meristém** – na báze článkov tráv (trávy rastú odspodu)

## Trvalé pletivá (vznikajú diferenciáciou meristémových buniek)
- **Krycie** – ochrana pred vysychaním a poškodením: *epiderma* (1 vrstva, prieduchy, kutikula), *periderm/korok* (druhotná ochrana drevín)
- **Vodivé** – transport: *xylém* (drevo) – voda a minerály zdola nahor; *floém* (lýko) – asimiláty (cukry) zhora nadol
- **Základné (parenchym)** – fotosyntéza, zásobovanie (škrob, cukry), výplň orgánov
- **Pevnostné** – mechanická podpora: *kolenchym* (živé bunky, hrubé rohy stien; mladé orgány), *sklerenchym* (mŕtve bunky, rovnomerne zhrubnuté steny; drevo, sklereidry)
- **Vylučovacie** – silice, živice, nektár, latex (mliečnice)

## Na maturite sa pýtajú
Rozdiely medzi kolenchymom a sklerenchymom, rozdiel xylém vs. floém (smer transportu, živý/mŕtvy), funkcia kambium.`,

"4-1":`## Drsnokožce (Chondrichthyes)
- **Chrupková kostra** (bez kostí)
- Koža pokrytá **plakoidnými šupinami** (drsné na dotyk – ako brúsny papier)
- **Chýba plávací mechúr** → musia neustále plávať, inak klesnú
- **5–7 žiabrových štrbín** otvorených navonok (bez operkula)
- Vnútorné oplodnenie; vajcorodé aj živorodé
- Príklady: **žralok biely** (*Carcharodon*), rája (*Raja*), pila

## Kostnaté ryby (Osteichthyes)
- **Kostnená kostra**
- **Plávací mechúr** – hydrostatická funkcia (regulácia hĺbky bez plavania)
- Žiabre kryté **žiabrovým vekom (operculum)**
- Šupiny **cykloidné** alebo **ktenoidné** (hladšie)
- Chladnokrvné (poikilotermné)
- Vonkajšie oplodnenie a **neresenie** (väčšina)
- **Bočná čiara** – zmyslový orgán pre vibrácie a tlak vody
- Príklady: karas, kapor, losos, pstruh, treska

## Spoločné znaky rýb
Vodné prostredie, dýchanie žiabrami, pohyb plutvami, chladnokrvnosť, bočná čiara.

## Na maturite sa pýtajú
Rozdiely drsnokožce vs. kostnaté ryby (kostra, šupiny, žiabre, plávací mechúr).`,

"4-2":`## Sústava ABO – genetický základ
Gén **I** na chromozóme 9 existuje v 3 alelách: **Iᴬ**, **Iᴮ**, **Iᴼ**
- Iᴬ → antigén A na povrchu erytrocytov; Iᴮ → antigén B; Iᴼ → žiadny antigén (recesívna)

## Krvné skupiny, genotypy a protilátky
| Krvná skupina | Genotypy | Antigén na RBC | Protilátky v plazme |
|---|---|---|---|
| **A** | IᴬIᴬ alebo IᴬIᴼ | A | anti-B |
| **B** | IᴮIᴮ alebo IᴮIᴼ | B | anti-A |
| **AB** | IᴬIᴮ | A + B | žiadne (univers. prijímateľ) |
| **0** | IᴼIᴼ | žiadny | anti-A aj anti-B (univers. darca) |

## Kodominnacia
Skupin AB je príkladom **kodominancie** – obe alely Iᴬ a Iᴮ sa prejavujú súčasne.

## Rh faktor
Prítomnosť (Rh+) alebo neprítomnosť (Rh−) antigénu D. Rh-inkompatibilita matky a plodu → hemolytická choroba novorodenca.

## Na maturite sa pýtajú
Genetické úlohy – Punettov štvorec pre krvné skupiny, určenie možných krvných skupín detí, základy transfúznych pravidiel.`,


"5-0":`## Čo sú huby
Huby (Fungi) tvoria samostatné kráľovstvo – nie sú ani rastliny, ani živočíchy.

## Základné znaky
- **Heterotrofné** – nedokážu fotosyntetizovať; saprofyty, parazity alebo symbionty
- Bunková stena z **chitínu** (nie celulózy ako rastliny)
- Zásobná látka **glykogén** (ako živočíchy)
- Telo = **mycélium** (podhubie) zo sieťovitých vlákien nazývaných **hyfy**

## Skupiny húb
- **Zygomycota (dutkovce):** *Mucor* – plesne na chlebe, zelenine
- **Ascomycota (vreckaté huby):** droždie, smrčky, hľuzovky, *Aspergillus*, *Penicillium* (penicilín)
- **Basidiomycota (stopkovýtrusné):** šampiňón, bedľa, hríb, **muchotrávka zelená** (*Amanita phalloides* – najjedovatejšia)

## Ekologický a praktický význam
- **Saprofyty** – rozklad organickej hmoty → kolobeh živín
- **Mykoriza** – symbióza s koreňmi rastlín (huba dostáva cukry, rastlina lepšie vstrebáva minerály)
- **Lišajníky** – symbióza huby + riasy/sinice
- **Úžitkové:** droždie (kvasenie, pečenie), penicilín, syry (plesňové), jedlé huby

## Na maturite sa pýtajú
Prečo nie sú huby rastliny (chitín, glykogén, heterotrofia), mykoriza, zástupcovia skupín, jedovaté druhy.`,

"5-1":`## Krytia sústava (fylogenéza)
- Jednobunkovce: membrána; Pŕhlivce: epitel (1 vrstva)
- Červy: epidermis + kutikula
- Ryby: **šupiny** – plakoidné (drsnokožce), cykloidné/ktenoidné (kostnaté)
- Obojživelníky: holá vlhká koža (kožné dýchanie)
- Plazy: suché **šupiny z rohoviny** (ochrana pred vysychaním)
- Vtáky: **perie** (tepelná izolácia, let)
- Cicavce: **srsť/vlasy**, potné a mazové žľazy, tukové tkanivo

## Oporná sústava (fylogenéza)
- Bezstavovce: vonkajšia kostra (**exoskelet**) z chitínu (článkonožce)
- Ryby: chrupka (drsnokožce) alebo kosti (kostnaté)
- Obojživelníky → cicavce: vnútorná kostnená kostra (**endoskelet**)

## Pohybová sústava (fylogenéza)
- Prvoky: pseudopódia, bičíky, riasinkya
- Pŕhlivce: epitelosvalové bunky
- Ploskavce + obrúčavce: **kožno-svalový vak** (pozdĺžne + kruhové svaly)
- Článkonožce: priečne pruhované svaly na **exoskeletu**
- Stavovce: priečne pruhované svaly na **endoskeletu**

## Na maturite sa pýtajú
Porovnanie exo- vs. endoskelet (výhody, nevýhody), prechod od kožno-svalového vaku k vyčleneným svalom.`,

"5-2":`## Čo je lateralita
**Lateralita** je preferencia jednej strany tela pred druhou – vyplýva z **lateralizácie mozgu** (rozdelenia funkcií medzi ľavú a pravú hemisféru). Ľavá hemisféra riadi pravú stranu tela a naopak.

## Typy
- **Praváctvo** (~90% ľudí) – dominantná pravá ruka; riadi ľavá hemisféra
- **Ľaváctvo** (~10%) – dominantná ľavá ruka; riadi pravá hemisféra
- **Ambidextria** – rovnocenné ovládanie oboch rúk (vzácne)

## Testované párové orgány
- **Ruky:** dominantná ruka pri písaní, hádzaní, strihání
- **Nohy:** kopnutie lopty, stúpanie na schod
- **Oči:** test – napnúť prst pred vzdialený bod, zatvoriť jedno oko; ktoré oko neposunie objekt = dominantné
- **Uši:** priloženie ucha k dverám

## Postup
1. Každý účastník vykoná niekoľko úloh (písanie, hádzanie, kopanie, test oka)
2. Zaznamenať výsledky pre každý orgán
3. Určiť celkovú laterálnu dominanciu
4. Štatisticky spracovať výsledky skupiny a porovnať s populačnými hodnotami

## Záver
Väčšina ľudí (~90%) je praváci. Lateralita je podmienená geneticky aj prostredím; vynucovanie praváctva u ľavákov môže spôsobovať problémy.`,

"6-0":`## Prenatálny vývoj (pred narodením)
**Zárodočné obdobie (embryogenéza)** – prvé 2 mesiace:
- Oplodnenie → **zygóta** → rýhovanie → morula → blastula → **gastrulácia** (vznik 3 zárodočných listov: ektoderm, mezoderm, entoderm)
- 3. týždeň: vznik nervovej trubice (základ CNS)
- 4. týždeň: začína biť srdce
- 8. týždeň: základ všetkých orgánov → zárodok sa nazýva **plod (fetus)**

**Plodové obdobie (fetogenéza)** – 3. mesiac až narodenie:
- Rast a dozrievanie orgánov; výživa cez **placentu** a **pupočníkový povraz**

## Postnatálny vývoj (po narodení)
- **Novorodenec** (0–28 dní) → **Dojča** (1 mes.–1 rok) → **Batoľa** (1–3 roky)
- **Predškolský vek** (3–6) → **Školský vek** (6–12)
- **Puberta/adolescencia** (12–20) – pohlavné dozrievanie, sekundárne pohlavné znaky
  - Chlapci: rast semenníkov, ochlpenie, mutácia (hlasu); Dievčatá: menzes, rast prsníkov
- **Dospelosť** (20–60) → **Staroba** (nad 60) – involučné zmeny

## Hormonálna regulácia puberty
FSH a LH (z hypofýzy) stimulujú pohlavné žľazy → testosterón (u chlapcov), estrogén (u dievčat).

## Na maturite sa pýtajú
Fázy prenatálneho vývoja, zárodočné listy a čo z nich vzniká, etapy postnatálneho vývoja.`,

"6-1":`## Evolúcia tráviacej sústavy – prehľad
- **Jednobunkovce:** trávenie **intracelulárne** – v potravových vakuolách (fagocytóza)
- **Hubky:** intracelulárne v choanocytoch (žiadna trávacia dutina)
- **Pŕhlivce:** **gastrovaskulárna dutina** – 1 otvor (ústa = riť), trávenie čiastočne extracelulárne
- **Ploskavce:** slepá (1 otvor), vetvená črevná dutina; pásomnice nemajú vôbec (vstrebávajú celým povrchom)
- **Hlístovce:** prvý **priechodný tráviaci trakt** (ústa → riť) – kľúčový evolučný skok
- **Obrúčavce (žížaly):** priechodný trakt, hltan, vola, žalúdok
- **Článkonožce:** dobre vyvinutý trakt, slinné žľazy, hepatopankreas
- **Ryby:** žalúdok, črevá, pečeň, pankreas, žlčník
- **Vtáky:** zob → vola → žľaznatý žalúdok → **svalnatý žalúdok (svalník)** – mletie tvrdého semena
- **Prežúvavce (cicavce):** **4-komorový žalúdok** – bachor, čiapočka, kniha, slez; fermentácia celulózy baktériami

## Kľúčové evolučné kroky
1. Vznik gastrovaskulárnej dutiny (pŕhlivce)
2. Vznik priechodného traktu (hlístovce)
3. Žľazy – pečeň, pankreas (ryby a vyššie)
4. Špecializácia (svalník vtákov, 4-komorový žalúdok prežúvacov)

## Na maturite sa pýtajú
Porovnanie intracelulárneho a extracelulárneho trávenia, evolučné novinky v jednotlivých skupinách.`,

"6-2":`## Chuťové poháriky a papily
**Chuťové bunky** sú sústredené v **chuťových pohároch** uložených v papilách jazyka.
Typy papíl:
- **Hríbovité (fungiformes)** – predná 2/3 jazyka; obsahujú chuťové poháriky
- **Ohraničené (vallatae)** – zadná časť, V-tvar (8–12 ks); obsahujú chuťové poháriky
- **Listovité (foliatae)** – boky jazyka; chuťové poháriky
- **Vláskovité (filiformes)** – hmatové; **neobsahujú** chuťové poháriky!

## 5 základných chutí a ich lokalizácia
Sladké – predná časť; slané – predná + boky; kyslé – boky; horké – zadná časť; **umami** – celý jazyk (chuť glutamátu).

## Pomôcky a postup
Roztok cukru, NaCl, octu, chinínového sulfátu (horký); vatové tyčinky; mapa jazyka.
1. Nakresliť mapu jazyka
2. Tyčinkou navlhčenou v roztoku testovať rôzne oblasti jazyka (od špičky dozadu)
3. Účastník nesmie vedieť, aký roztok dostáva (slepý test)
4. Zaznačiť, kde bola chuť vnímaná, porovnať s klasickou mapou

## Záver
Lokalizácia chutí nie je tak striktná, ako sa kedysi zobrazovalo v učebniciach – chuťové poháriky pre rôzne chute sú roztrúsené po celom jazyku, s určitou prevahou v daných oblastiach.`,

"7-0":`## Čo študuje ekológia
**Ekológia** je veda o vzájomných vzťahoch organizmov navzájom a s neživým prostredím.

## Základné ekologické pojmy
- **Ekosystém** = biotop + biocenóza + ich vzájomné vzťahy (les, jazero, step)
- **Biotop (stanovište)** – miesto s určitými abiotickými podmienkami
- **Biocenóza** – súbor všetkých organizmov v danom biotope
- **Populácia** – jedinci toho istého druhu na rovnakom mieste a v rovnakom čase
- **Ekologická nika** – funkčné postavenie druhu v ekosystéme (čím sa živí, kto ho loví, kde žije)
- **Habitat** – miesto kde druh žije; **Biosféra** – celý obal Zeme obývaný organizmami

## Odvetvia ekológie
- **Autekológia** – vzťah jedinca/druhu k prostrediu
- **Synekológia** – vzťah spoločenstiev k prostrediu
- **Populačná ekológia**, **Krajinná ekológia**, **Globálna ekológia**

## Vzťahy medzi organizmami
Predácia, parazitizmus, komenzalizmus, mutalizmus (symbióza), kompetícia (medzidruhová aj vnútrodruhová), amenzalizmus.

## Na maturite sa pýtajú
Definície pojmov (ekosystém, biocenóza, biotop, ekologická nika), rozlíšenie medzidruhových vzťahov s príkladmi.`,

"7-1":`## Minerálna výživa rastlín
Rastliny prijímajú **anorganické živiny z pôdy** cez koreňové vlášenie.

**Makroprvky** (potrebné vo väčšom množstve): N, P, K, Ca, Mg, S
**Mikroprvky / stopové prvky**: Fe, Mn, Zn, Cu, B, Mo

## Funkcie kľúčových prvkov
- **N (dusík)** – stavba bielkovín, nukleových kyselín, chlorofylu; nedostatok → žltnutie listov
- **P (fosfor)** – ATP, nukleové kyseliny, fosfolipidy membrán
- **K (draslík)** – osmóza, otváranie prieduchov, aktivácia enzýmov
- **Ca (vápnik)** – bunková stena (pektáty), signalizácia
- **Mg (horčík)** – stredom molekuly chlorofylu
- **Fe (železo)** – syntéza chlorofylu, elektrónový prenos v dýchaní

## Typy výživy rastlín
- **Autotrofná** – fotosyntéza (zelené rastliny)
- **Heterotrofná** – mäsožravé rastliny (*Drosera* – rosička, *Dionaea* – mucholapka, *Pinguicula* – tučnica)
- **Symbiotická** – bôbovité s hlízkorrými baktériami *Rhizobium* (fixácia N₂ zo vzduchu); mykoriza

## Hnojenie
Dodávanie živín do pôdy: **organické** (hnoj, kompost) alebo **anorganické** (priemyselné hnojivá NPK – dusík-fosfor-draslík).

## Na maturite sa pýtajú
Funkcie jednotlivých prvkov, príznaky nedostatku, príklady mäsožravých rastlín a prečo ich jedia hmyz.`,

"7-2":`## Základný popis
**Rosnička zelená** (*Hyla arborea*) patrí do triedy Obojživelníky (Amphibia), rad Žaby (Anura).

## Rozlišovacie znaky
- Dĺžka tela 3,5–5 cm; jasnozelená farba chrbta (**kamuflážna**), bielo-žlté brucho
- **Priľnavé prísavky na prstoch** – umožňujú šplhanie po listoch, konároch, skalách
- Bubienok (tympanická membrána) za očami; samce majú hlasový mechúr

## Spôsob života
- Súmrakové až nočné zviera; živí sa **hmyzom a inými bezstavovcami**
- Obýva vlhké biotopy: rybníky, mokrade, lesy pri vode
- **Zimný spánok** od októbra do marca (hibernácia)

## Rozmnožovanie
- Jar, máj–jún; samce lákajú samice hlasným ľahaním (nafúknutý hlasový mechúr)
- **Externé oplodnenie** vo vode; vajíčka kladú do vody
- Larva (pulec) dýcha žiabrami → **metamorfóza** → dospelá žaba s pľúcami

## Ochrana a význam
- **Chránený druh** v SR; **bioinidikátor** – citlivý na znečistenie vody a prostredia
- Pokles populácií celosvetovo (strata mokradí, chytridiomykóza – hubová choroba obojživelníkov)`,

"8-0":`## Prvoústovce – základný pojem
U **prvoústovcov (Protostomia)** sa z prvotného otvoru zárodku (blastopóru) vyvíjajú **ústa**.

## Ploskavce (Platyhelminthes)
- Trojvrstvové telo (ektoderm, mezoderm, entoderm), **bez telovej dutiny (acoelom)**
- Dorzoventrálne sploštené telo
- **Voľnožijúce:** planárie (*Planaria*) – sladká voda, výrazná schopnosť **regenerácie**
- **Parazitické motolice:** *Fasciola hepatica* – pečeňová motolica; medzihostiteľ = slimák
- **Pásomnice:** *Taenia solium* (sviňová), *Taenia saginata* (hovädzí) – tráviaci trakt nemajú, vstrebávajú živiny **celým povrchom tela**; telo = scolex (hlavica s prísavkami) + proglotidy
- Vylučovanie: **protonefrídie (plameňové bunky)**

## Hlístovce (Nematoda)
- Valcovité telo, **pseudocoelom** (nepravá telová dutina)
- **Priechodný tráviaci trakt** (ústa → riť) – evolučná novinka oproti ploskavcom
- **Voľnožijúce:** *Caenorhabditis elegans* – modelový organizmus molekulárnej biológie
- **Parazitické:**
  - *Ascaris lumbricoides* – škrkavka detská (tenké črevo)
  - *Enterobius vermicularis* – mrvinček detský
  - *Trichinella spiralis* – trichinóza (svaly)

## Na maturite sa pýtajú
Priechodný vs. slepý tráviaci trakt, spôsob výživy pásomníc, životné cykly (medzihostiteľ).`,

"8-1":`## Kostrové svaly – stavba a funkcia
Pohybová sústava = oporná sústava (kosti) + **aktívna pohybová sústava (svaly)**.

Kostrové svaly sú **priečne pruhované** – vedome ovládané (somatická NS).
Svalové vlákno obsahuje myofibrily s **aktínom** (tenké vlákna) a **myozínom** (hrubé vlákna).

## Mechanizmus kontrakcie (teória sklzných vlákien)
1. Nervový impulz → uvoľnenie Ca²⁺ z sarkoplazmatického retikula
2. Ca²⁺ viaže sa na troponín → obnaží väzobné miesta na aktíne
3. Myozínové hlavičky sa viažu na aktín → ATPáza štiepi ATP → posuvný pohyb
4. Aktínové vlákna sklzajú medzi myozínovými → **sarkoméra sa skráti** → sval sa stiahne

## Typy svalových vlákien
- **Pomalé oxidatívne (červené)** – vytrvalostný výkon, bohaté na myoglobín a mitochondrie
- **Rýchle glykolytické (biele)** – silový krátkodobý výkon, rýchlo sa unavia

## Antagonisty a synergisty
Svaly pracujú v pároch: **biceps** (flexor – ohýba predlaktie) vs. **triceps** (extenzor – naťahuje).

## Druhy pohybov
Flexia/extenzia, abdukcia/addukcia, rotácia, pronácia/supinácia.

## Na maturite sa pýtajú
Stavba sarkoméry (Z-disky, aktín, myozín), mechanizmus kontrakcie, antagonisty/synergisty.`,

"8-2":`## Prieduchy (stomata)
Štrbinovité otvory v pokožke (epidermis) listu, ktoré zabezpečujú **výmenu plynov** a transpiráciu.
- Skladajú sa z dvoch **strážnych buniek** s chloroplastmi a elastickou bunkovou stenou
- **Mechanizmus otvárania:** vo svetle strážne bunky fotosyntezujú → hromadí sa glukóza a K⁺ → zvýšenie osmotického tlaku → voda vstupuje osmózou → turgor → bunky sa klenuú → prieduch sa **otvorí**
- Zatvárajú sa: v tme, pri suchu (hormón **ABA – kyselina abscisová**), pri vysokom CO₂
- Väčšina na **spodnej strane listu** – znižuje priame zahrievanie a výpar
- Funkcie: transpirácia (výpar vody), príjem CO₂ na fotosyntézu, výdaj O₂

## Hydatódy (vodné prieduchy)
Špeciálne štruktúry na okrajoch a špičkách listov – vylučujú **kvapalinu (nie paru)**.
- Proces = **gutácia** – nastáva pri vysokej pôdnej vlhkosti a nízkej transpirácii (ráno, hmlisté počasie)
- **Nie sú aktívne regulované** (vždy otvorené); poháňa ich koreňový tlak
- Výskyt: špinat, jahoda, trávy – kvapky vody na okrajoch listov ráno

## Kľúčový rozdiel
Prieduchy regulujú **plynný výpar** aktívne; hydatódy vylučujú **kvapalnú vodu** pasívne (gutácia).`,

"9-0":`## Čo sú lišajníky
Lišajníky (Lichenes) sú **symbiotické organizmy** zložené z dvoch partnerov:
- **Huba (mykobiont)** – väčšinou vreckaté huby (Ascomycota); tvorí sieť hýf
- **Riasa alebo sinica (fotobiont)** – fotosyntetizuje a produkuje organické látky

Vzájomný vzťah = **mutualizmus**: huba poskytuje vodu, minerály a ochranu; fotobiont poskytuje cukry z fotosyntézy.

## Morfologické typy
- **Korovité** – tesne prirastené k substrátu (skalám, kôre stromu), nedajú sa odlúpnuť
- **Listovité** – voľnejšie prirastené, dajú sa odlúpnuť (napr. *Xanthoria*)
- **Kríčkovité** – vzpriamená rozvetvená stielka (napr. *Cladonia* – sobí mach, *Usnea*)

## Ekologický a praktický význam
- **Pionierske organizmy** – prvé osídľujú holé skaly; postupne rozkladajú kameň → tvorba pôdy (pedogenéza)
- **Bioindikátory znečistenia ovzdušia** – citlivé na SO₂, ťažké kovy; chýbanie lišajníkov v meste = znečistený vzduch
- **Potrava:** sobí mach (*Cladonia rangiferina*) = hlavná potrava sobov
- **Lakmus** – pH indikátor získaný z lišajníkov
- **Farmácia:** kyselina usnová (antibakteriálna účinok)
- **Parfumérstvo:** *Evernia prunastri* (dubový mach) – fixatív vôní

## Na maturite sa pýtajú
Zloženie lišajníka, typ vzťahu (mutualizmus), použitie ako bioindikátora, prečo sú pioniermi.`,

"9-1":`## Kostra – delenie
**Oporná sústava** = pasívna časť pohybovej sústavy.

**Osová kostra:**
- **Lebka (cranium)** – 22 kostí; mozgová + tvárová časť
- **Chrbtica** – 33–34 stavcov: 7 krčných + 12 hrudných + 5 driekových + 5 krížových (zrastených) + 4–5 kostrčových
- **Rebrá** – 12 párov (7 pravých, 3 nepravé, 2 voľné); **hrudná kosť (sternum)**

**Kostra končatín:**
- Horná: kľúčna kosť + lopatka → plecová (humerus) → vretenná (radius) + lakťová (ulna) → zápästné (8) → záprstné (5) → články prstov (14)
- Dolná: panva → stehenná (femur) → ihlica (tibia) + lýtková (fibula) → predpriehlavkové (7) → priehlavkové (5) → články prstov (14)

## Stavba kosti
- **Periost (okostica)** – vonkajší povlak; výživa, rast, hojenie
- **Kompaktné tkanivo** – pevná vonkajšia vrstva
- **Hubovité (špongiózne) tkanivo** – ľahká vnútorná mriežka
- **Kostná dreň** – červená (krvotvorba) alebo žltá (tukové bunky u dospelých)

## Kĺby
Pohyblivé (synoviálne): kĺbna hlavica + jamka + kĺbne púzdro + synoviálna tekutina + väzivo.

## Na maturite sa pýtajú
Počty a typy stavcov, kosti končatín v správnom poradí, stavba kosti (vrstvy), typy kĺbov.`,

"9-2":`## Čo je krvný tlak
**Krvný tlak (KT)** je tlak krvi na steny ciev, vyjadruje sa v **mmHg** (milimetroch ortuťového stĺpca).
- **Systolický tlak** – max. tlak pri kontrakcii ľavej komory (systola); norma ~**120 mmHg**
- **Diastolický tlak** – min. tlak pri relaxácii srdca (diastola); norma ~**80 mmHg**
- Zapisuje sa ako **120/80 mmHg**

## Klasifikácia hodnôt
Optimálny: < 120/80 | Normálny: 120–129/80–84 | Vyšší normálny: 130–139/85–89
**Hypertenzia 1. st.:** ≥ 140/90 | **Hypotenzia:** < 90/60

## Meranie – sfygmomanometer (tlakomer)
1. Manžeta sa nafúkne na rameni nad artéria brachialis (skomprimuje tepnu)
2. Vzduch sa pomaly vypúšťa
3. Počúvame **Korotkovove zvuky** stetoskopom: **prvý úder = systolický TK; posledný zvuk = diastolický TK**
4. Moderné digitálne prístroje merajú automaticky

## Faktory ovplyvňujúce KT
Zvyšujú: fyzická aktivita, stres, soľ, alkohol, fajčenie, obezita, vek.
Znižujú: pravidelné cvičenie, zdravá strava, normálna hmotnosť.

## Záver
Dlhodobá hypertenzia poškodzuje cievy, srdce, obličky a mozog → prevencia = meranie, zdravý životný štýl.`,

"10-0":`## Stavba tráviacej sústavy
**Tráviaca sústava** spracúva potravu mechanicky aj chemicky a vstrebáva živiny.

**Ústna dutina:** zuby (mechanické drvenie), jazyk (miešanie, chuť), **slinné žľazy** (sliny: amyláza štiepi škrob, mucín mazanie)
**Hltan (pharynx):** kríženie tráviacej a dýchacej sústavy; reflex prehĺtania
**Pažerák (oesophagus):** peristaltické pohyby posúvajú potravu do žalúdka; trvá ~10 sek.
**Žalúdok (gaster):** **HCl** (pH 1–2) – denaturácia bielkovín a aktivácia pepsínu; **pepsín** – trávenie bielkovín; žalúdočná sliznica produkuje hlien (ochrana pred HCl)
**Tenké črevo (6–7 m) – hlavné miesto trávenia a vstrebávania:**
- *Dvanástnik (duodenum):* prijíma žlč (zo žlčníka, emulguje tuky) a pankreatickú šťavu (lipáza, proteázy – trypsín, amyláza)
- *Lačník + kyčelník:* vstrebávanie živín cez **klky** (zvyšujú plochu); tuky → mliečnice (lymfa); ostatné → kapiláry → vrátnicová žila → pečeň
**Hrubé črevo:** vstrebávanie vody, tvorba stolice, črevná mikrobiota (baktérie vitamín K)
**Konečník + análny otvor:** vylučovanie exkrementov

## Pečeň
Tvorba žlče, detoxikácia, zásobovanie glykogénom, syntéza plazmatických bielkovín (albumín, fibrinogén).

## Na maturite sa pýtajú
Enzýmy a kde pôsobia, funkcia klkov, úloha pečene a pankreasu.`,

"10-1":`## Čo je fotosyntéza
Fotosyntéza je proces, pri ktorom rastliny, riasy a sinice **premieňajú svetelnú energiu na chemickú** (organickú hmotu).
**Súhrnná rovnica:** 6 CO₂ + 6 H₂O → **C₆H₁₂O₆** (glukóza) + 6 O₂ (za prítomnosti svetla a chlorofylu)

## Fázy fotosyntézy v chloroplaste

**1. Svetelná fáza** (v tylakoidných membránach):
- Chlorofyl zachytáva svetlo (fotosystémy PSI a PSII)
- **Fotolýza vody:** H₂O → 2H⁺ + 2e⁻ + ½O₂ → vzniká O₂ (uvoľňuje sa do atmosféry)
- Tvorí sa **ATP** (fotofosforylýcia) a **NADPH** (redukujúci agent)

**2. Temnostná fáza / Calvinov cyklus** (v stróme chloroplastov):
- CO₂ sa viaže na **RuBP** (5C) pomocou enzýmu **RuBisCO**
- Vzniká **3-fosfoglycerát** (3PGA), ktorý sa redukuje za spotreby ATP a NADPH na **G3P (glyceraldehyd-3-fosfát)**
- G3P → glukóza; RuBP sa regeneruje

## Faktory ovplyvňujúce fotosyntézu
Intenzita svetla, koncentrácia CO₂, teplota (optimum ~25°C), dostupnosť vody, vlnová dĺžka (chlorofyl absorbuje červenú a modrú, odráža zelenú).

## Na maturite sa pýtajú
Kde prebieha svetelná vs. temnostná fáza, čo je produktom každej fázy, odkiaľ pochádza O₂ (z vody, nie z CO₂).`,

"10-2":`## Čo pozorujeme
Cieľom je pozorovanie **bunkových organel viditeľných svetelným mikroskopom** v rastlinných bunkách.

## Organely a čo vidíme
- **Chloroplasty** – zelené oválne organely (3–10 μm); v listoch, stonkách; zodpovedné za zelenú farbu
- **Chromoplasty** – žlté/oranžové/červené; v plodoch (paprika, mrkva), petáloch
- **Amyloplasty** – bezfarebné zásobné plastidy; v zemiakoch (škrob)
- **Centrálna vakuola** – veľká, priehľadná; tlačí cytoplazmu k okraju bunky
- **Bunková stena** – viditeľná ako pevná hranica bunky (celulóza)
- **Jadro** – oválne; po farbení (napr. hematoxylínom) intenzívne sfarbené

## Pomôcky a postup
Listy špenátu / bazalky / elodey (pre chloroplasty); mrkva/paprika (pre chromoplasty); mikroskop, sklíčka.
1. Pripraviť tenký rez alebo odreninu pletiva
2. Umiestniť na sklíčko do kvapky vody, zakryť krycím sklíčkom
3. Pozorovať pri 100–400× zväčšení
4. Nakresliť a popísať pozorované organely

## Záver
Svetelný mikroskop umožňuje pozorovanie väčších organel (chloroplasty, vakuola, jadro). Pre membrány, ribozómy a ER je potrebný elektrónový mikroskop.`,

"11-0":`## Evolúcia dýchacích orgánov
- **Jednobunkovce + Pŕhlivce + Ploskavce:** difúziou cez celý povrch tela (ploché telo = krátka difúzna vzdialenosť)
- **Obrúčavce (žížaly):** **kožné dýchanie** – vlhká koža s hustou kapilárnou sieťou
- **Článkonožce – vodné** (raky, kraby): **žiabre**; **suchozemský hmyz: vzdušnicová sústava (tracheae)** – sieť trubičiek priamo k tkanivám (bez nutnosti krvného obehu); pavúky: pľúcne vaky
- **Ryby:** **žiabre** (lamely s bohatým kapilárnym zásobením, protismerný tok vody a krvi = maximálna extrakcia O₂)
- **Obojživelníky:** larva = žiabre; dospelec = **pľúca + kožné dýchanie** (holá vlhká koža)
- **Plazy:** pľúca (jednoduchšie, vreckovité)
- **Vtáky:** pľúca + **9 vzduchových vakov** – vzduch prechádza pľúcami jedným smerom (vždy čerstvý vzduch) → extrémne efektívne; adaptácia na let
- **Cicavce:** pľúca s **alveolami** (vzdušné váčky; plocha ~70 m² u človeka) → veľká plocha na výmenu plynov

## Kľúčové evolučné skoky
1. Vznik žiabier (článkonožce, ryby) 2. Vznik pľúc (obojživelníky) 3. Vzduchové vaky vtákov 4. Alveoly cicavcov

## Na maturite sa pýtajú
Porovnanie tracheálneho a pľúcneho dýchania, prečo kožné dýchanie nestačí veľkým živočíchom, vzduchové vaky vtákov.`,

"11-1":`## Časti kvetu krytosemenných
**Kvet** je rozmnožovací orgán krytosemenných rastlín.
- **Kvetné lôžko (receptaculum)** – nesie všetky časti kvetu
- **Kalich (calyx)** – zelené kališné lístky (sepaly); ochrana puku
- **Koruna (corolla)** – farebné lupienky (petaly); lákanie opeľovačov
- **Tyčinky (andreceum)** – mužský pohlavný orgán: nitka + peľnica (2 peľové vačky s peľom)
- **Piestik (gyneceum)** – ženský pohlavný orgán: blizna (zachytenie peľu) + čnelka + semenník (vajíčka)

## Nahosemenné rastliny
Nemajú kvet v pravom zmysle – majú **šišky**. Mužské šišky produkujú peľ; ženské šišky nesú vajíčka (semená sú nahé, bez oplodnice).

## Typy kvetov
- **Obojpohlavný** (tyčinky + piestik) vs. **jednopohlavný** (len tyčinkový alebo len piestikový)
- **Pravidelný (aktinomorfný)** – viaceré osi súmernosti (tulipán, ruža)
- **Nepravidelný (zygomorfný)** – jedna os súmernosti (fialka, šalvia, orchidea)

## Súkvetia – typy
- **Hrozno** – kvety na krátkych stopkách na priamej osi (ríbezle, vinič)
- **Klas** – kvety bez stopky (pšenica, trávy)
- **Okolík** – stopky rôznej dĺžky v jednej rovine (mrkva, kôpor, fenikel)
- **Úbor** – plochá osa, drobné kvety (slnečnica, sedmokráska, arnika)
- **Lata** – vetvené hrozno (orgován)`,

"11-2":`## Frekvencia dýchania
Počet **dychov za minútu** (1 dych = vdych + výdych).
Normálne hodnoty v pokoji: dospelí **12–20 dychov/min**; deti 20–30/min.

## Dychové objemy
- **Dychový objem (DV)** – vzduch pri normálnom dýchaní (~500 ml)
- **Inspiračný rezervný objem** – maximálny extra nádych (~2500 ml)
- **Exspiračný rezervný objem** – maximálny extra výdych (~1200 ml)
- **Vitálna kapacita (VC)** = DV + oba rezervné objemy (~4500 ml)
- **Reziduálny objem (RV)** – zostatok po max. výdychu (~1200 ml); pľúca sa nikdy úplne nevyprázdnia
- **Totálna pľúcna kapacita** = VC + RV (~5700 ml)

## Apnoická pauza
**Apnoe** = zastavenie dýchania. Test: po normálnom **výdychu** zadržíme dych → meríme čas.
- Norma u dospelých: **30–40 s**; trénovaní plavci: 60–90 s aj viac

## Postup praktika
1. Spočítať dýchanie v pokoji (1 minúta)
2. Vykonať 30 drepov za 45 sekúnd → znovu spočítať frekvenciu
3. Zadržať dych po výdychu → zmerať apnoickú pauzu
4. Porovnať s normami a so spolužiakmi

## Záver
Trénovaní jedinci majú nižšiu kľudovú frekvenciu, rýchlejší návrat k nej po záťaži a dlhšiu apnoickú pauzu. Frekvencia dýchania je riadená CO₂ hladinou v krvi (nie O₂).`,

"12-0":`## Ako funguje hormonálna sústava
**Hormóny** sú chemické posly vylučované žľazami s vnútornou sekréciou (endokrinnými žľazami) priamo do **krvi**. Pôsobia na vzdialené cieľové bunky cez receptory.

## Hlavné žľazy a ich hormóny

**Hypofýza (podvesok mozgový)** – „dirigent" endokrinnej sústavy:
- Predný lalok: **GH** (rastový h.), **TSH** (stimuluje štítnu žľazu), **ACTH** (stimuluje kôru nadobličiek), **FSH a LH** (pohlavné žľazy), **prolaktín** (tvorba mlieka)
- Zadný lalok: **ADH (vazopresín)** – zadržiavanie vody v obličkách; **oxytocín** – stiahnutia maternice pri pôrode, laktácia

**Štítna žľaza:** **tyroxín T₄** a trijódtyronín T₃ – regulácia metabolizmu, rast a vývoj; **kalcitonín** – znižuje Ca²⁺ v krvi

**Prištítne telieska:** **PTH (parathormón)** – zvyšuje Ca²⁺ v krvi (antagonista kalcitonínu)

**Nadobličky:**
- Kôra: **kortizol** (stres, metabolizmus sacharidov), **aldosterón** (zadržiavanie Na⁺/K⁺), pohlavné hormóny
- Dreň: **adrenalín + noradrenalín** – reakcia na stres („boj alebo útek")

**Pankreas – Langerhansove ostrovčeky:**
- B-bunky → **inzulín** – znižuje glykémiu (glukóza vstupuje do buniek)
- A-bunky → **glukagón** – zvyšuje glykémiu (glykogén → glukóza)

**Pohlavné žľazy:** testosterón (semenníky), estrogén + progesterón (vaječníky)
**Epifýza:** melatonín – cirkadiánny rytmus, spánok

## Na maturite sa pýtajú
Inzulín vs. glukagón (antagonisty), adrenalín (čo vyvoláva), ADH (pôsobí kde), hormóny pri strese.`,

"12-1":`## Článkonožce – spoločné znaky
- **Článkované telo** (hlava, hruď, brucho) a **článkované prívesky (končatiny)**
- **Vonkajší kostra (exoskeleton)** z **chitínu** – pevná, chráni, je miestom úponu svalov; pravidelná zvliekanie (ekdysis)
- Otvorená obehová sústava (hemolymfa v dutinách)
- Nervová sústava: párové gangliá, jadrovitý mozog

## Kôrovce (Crustacea)
2 páry tykadiel, žiabre, väčšinou vodné. Zástupcovia: rak, krab, garnát, kreveta, morský slimák.

## Pajúkovce (Arachnida)
4 páry nôh, **žiadne tykadlá**, chelicéry a pedipalpy; pľúcne vaky alebo tracheae.
Zástupcovia: pavúk, škorpión, **roztoč, kliešť** (prenáša lymeskú boreliózu, encefalitídu).

## Stonožky (Myriapoda)
Mnoho článkov; stonožka (1 pár nôh/článok), mnohonôžka (2 páry/článok).

## Hmyz (Insecta)
**3 páry nôh, 3-článkové telo** (hlava-hruď-brucho), zvyčajne 2 páry krídiel, 1 pár tykadiel. **Vzdušnicová sústava** (tracheae) – priamy prívod O₂ bez krvi.
- **Úplná premena (holometabólia):** vajce → larva → kukla → imago (motýle, chrobáky, muchy, včely)
- **Neúplná premena (hemimetabólia):** vajce → nymfa → imago (koník, teplomer, šváb)

## Na maturite sa pýtajú
Znaky jednotlivých tried (počet nôh, tykadlá, dýchanie), typy premeny u hmyzu, kliešť ako vektor chorôb.`,

"12-2":`## Čo je kvetný vzorec
**Kvetný vzorec** je zápis morfológie kvetu pomocou dohodnutých symbolov a čísel – kompaktný „kód" kvetu.

## Symboly kvetného vzorca
- ⊕ = pravidelný (aktinomorfný) kvet; ↕ = nepravidelný (zygomorfný)
- ⚥ = obojpohlavný; ♂ = tyčinkový kvet; ♀ = piestikový kvet
- **K** = kalich (calyx); **C** = koruna (corolla); **A** = tyčinky (andreceum); **G** = piestik (gyneceum)
- **P** = okvietie nediferencované (perigon – keď kalich a koruna nie sú rozlíšené)
- Čísla = počet orgánov; **(n)** = orgány zrastené; **∞** = veľa; podčiarknuté **G** = podkvetnník; nadčiarknuté = nadkvetnník

## Príklady
- **Tulipán:** ⊕ ⚥ P(3+3) A(3+3) G(3) – 6 okvietnych lístkov (3+3), 6 tyčiniek, 3 zrastené plodolisty
- **Ruža:** ⊕ ⚥ K5 C5 A∞ G∞ – 5 kališných, 5 lupienkov, veľa tyčiniek, veľa plodolistov
- **Šalvia:** ↕ ⚥ K(5) C(2+3) A2 G(2) – nepravidelný, 2 tyčinky

## Kvetný diagram
Grafické znázornenie prierezu kvetom zhora – zobrazuje počet, polohu a zrastenie orgánov v kruhu.

## Na maturite sa pýtajú
Rozlúštiť/napísať kvetný vzorec pre konkrétnu rastlinu, rozlíšiť aktino- vs. zygomorfný kvet.`,

"13-0":`## Čo je tkanivo
**Tkanivo** je skupina buniek rovnakej stavby, funkcie a pôvodu. Štyri základné typy u živočíchov:

## Epitelové tkanivo
Pokrýva povrchy tela a vnútrajšok dutín (črevá, cievy, dýchacie cesty). Bunky tesne vedľa seba, málo medzibunkovej hmoty. Typy podľa tvaru: **dlaždicové** (koža), **stĺpcové** (črevá), **cylindrické** (priedušky). Podľa počtu vrstiev: jednovrstvové vs. mnohovrstvové. Funkcie: ochrana, vstrebávanie, vylučovanie, zmyslová recepcia.

## Väzivové tkanivo
Bunky s veľkým množstvom **medzibunkovej hmoty (matrix)** a vlákien (kolagénové, elastické, retikulárne). Bunky: fibroblasty (tvorba vlákien), makrofágy (fagocytóza), tukové bunky. Typy: voľné väzivo, tukové tkanivo, chrupka (chondrocyty), **kosť** (osteocyty), **krv** (špeciálne tekuté väzivo).

## Svalové tkanivo
- **Priečne pruhované (kostrové)** – vedome ovládané; rýchle stiahnutia
- **Hladké (viscerálne)** – nevedome; črevá, cievy, maternica; pomalé, vytrvalé
- **Srdcové** – priečne pruhované, ale nevedome; autonómny rytmus, spojené interkalárnym diskom

## Nervové tkanivo
**Neuróny** – vedenie nervových impulzov: telo bunky (soma) + dendrity (príjem signálov) + axón (vedenie signálu). **Gliové bunky** – podpora, výživa, myelinizácia (Schwannove bunky, oligodendrocyty), ochrana (mikroglia).

## Na maturite sa pýtajú
Porovnanie troch typov svalového tkaniva, rozdiel medzi vedome a nevedome ovládanými svalmi, stavba neurónu.`,

"13-1":`## Čo je bunkový cyklus
**Bunkový cyklus** je sled dejov od vzniku bunky po jej rozdelenie do dvoch dcérskych buniek.

## Interfáza (~90% celkového času)
Bunka rastie a pripravuje sa na delenie:
- **G₁ fáza** – rast bunky, syntéza proteínov a organel; kontrolný bod: má bunka dostatok živín a rastových faktorov?
- **S fáza (syntetická)** – **replikácia DNA** → obsah DNA sa zdvojnásobí (1 → 2 exempláre každého chromozómu = chromatidy)
- **G₂ fáza** – ďalší rast, kontrola správnosti replikácie; syntéza proteínov deliaceho vretena

## M fáza – mitotické delenie (karyokinéza + cytokinéza)
- **Profáza:** chromozómy kondenzujú, rozpadá sa jadrový obal, tvorí sa deliace vreteno
- **Metafáza:** chromozómy sa zoraďujú na **ekvatoriálnej platni** (najdobre viditeľné!)
- **Anafáza:** centroméry sa roztrhajú, chromatidy sa ťahajú k opačným pólom
- **Telofáza:** obnova jadrových obalov, dekondenzácia; **cytokinéza** = rozdelenie cytoplazmy

## Kontrolné body (checkpointy)
- G₁/S – kontroluje veľkosť bunky a dostupnosť živín
- G₂/M – kontroluje úplnosť replikácie DNA
- Metafázny – kontroluje správne pripojenie chromozómov na vreteno
Poruchy kontrolných bodov → nekontrolované delenie = **rakovina (nádor)**

## G₀ fáza
Niektoré diferencované bunky (neuróny, svalové bunky) trvalo vystúpia z cyklu a nedelia sa.`,

"13-2":`## Čo je Ruffierov test
**Ruffierov index (RI)** hodnotí zdatnosť kardiovaskulárneho systému podľa reakcie pulzu na záťaž.

## Postup merania
1. Odpočinok 5 minút → zmerať pulz **P₁** (merať 10 sekúnd, výsledok × 6 = tepov/min)
2. Vykonať **30 drepov za 45 sekúnd**
3. Ihneď po záťaži: zmerať pulz **P₂** (prvých 10 sekúnd × 6)
4. Po 1 minúte odpočinku: zmerať pulz **P₃** (10 sekúnd × 6)

## Výpočet Ruffierovho indexu
**RI = (P₁ + P₂ + P₃ − 200) / 10**

## Hodnotenie výsledku
- RI ≤ 0 → výborná zdatnosť
- 0,1 – 5 → dobrá zdatnosť
- 5,1 – 10 → priemerná zdatnosť
- 10,1 – 15 → znížená zdatnosť
- RI > 15 → zlá zdatnosť (odporúčaná návšteva lekára)

## Záver a vysvetlenie
Nižší index = lepšia kardiorespiračná kondícia. Trénovaný človek má nižší kľudový pulz, miernejší vzostup pri záťaži a **rýchlejší návrat** k pokojovej hodnote – srdce je efektívnejšie a silnejšie. P₁ < 60 je výborná kľudová srdcová frekvencia.`,

"14-0":`## Čo sú nižšie rastliny
**Nižšie rastliny** nemajú diferenciáciu na korene, stonku a listy – celé telo nazývame **stielka (thallus)**. Patria sem riasy a sinice (hoci sinice sú prokaryoty).

## Riasy (Algae)
Fotoautotrofy, prevažne vodné. Rozdeľujeme ich podľa farbív:
- **Zelené riasy (Chlorophyta):** *Chlorella* (jednobunn.), *Chlamydomonas* (bičíkovec), *Spirogyra* (vláknitá), *Ulva* (morský šalát); najbližší príbuzní suchozemských rastlín
- **Hnedé riasy (Phaeophyta):** kelp (*Macrocystis*), chaluha (*Fucus*); morský ekosystém, zdroj jódu a alginátu
- **Červené riasy (Rhodophyta):** *Porphyra* → nori (japonská kuchyňa); agar-agar z bunkovej steny
- **Rozsievky (Bacillariophyta):** kremičitá schránka (frustula); základ morského planktónu (50 % O₂ na Zemi!)

## Sinice (Cyanobacteria) – pozor: prokaryoty!
- Fotosyntetizujú a uvoľňujú O₂ – prispeli ku kyslíkatej atmosfére Zeme
- *Anabaena*, *Nostoc*, *Microcystis* (toxické „kvety" v stojatých vodách)
- **Endosymbiotická teória:** chloroplasty vznikli z pohltenej sinice (endosymbiont)

## Ekologický význam rias
Primárni producenti v morách, základ potravových reťazcov, produkcia O₂, viazanie CO₂.

## Na maturite sa pýtajú
Rozdiely skupín rias (pigmenty, prostredie), čo je stielka, prečo sú sinice prokaryoty, endosymbiotická teória.`,

"14-1":`## Čo je mutácia
**Mutácia** je trvalá, zdediteľná zmena genetickej informácie (DNA alebo chromozómov). Môže byť spontánna alebo indukovaná mutagénmi.

## Génové (bodové) mutácie – zmena jedného/niekoľkých nukleotidov
- **Substitúcia** – zámen bázy za inú:
  - *Missense* – zmena aminokyseliny (napr. kosáčikovitá anémia: Glu→Val na 6. pozícii hemoglobínu)
  - *Nonsense* – vznik **stopkodónu** → predčasné ukončenie proteínu (väčšinou nefunkčný)
  - *Synonymná (tichá)* – aminokyselina sa nezmení (degenerácia kódu)
- **Inzercia** – vloženie bázy → **posunová (frameshift) mutácia** – zmení čítací rámec pre všetky nasledujúce kodóny
- **Delécia** – vymazanie bázy → tiež frameshift

## Chromozómové mutácie – zmena štruktúry chromozómu
Delécia, duplikácia, inverzia, translokácia segmentov chromozómu.

## Genómové mutácie – zmena počtu chromozómov
- **Polyploidia** – násobky celej sady (triploidy, tetraploidy); časté u rastlín (pšenica hexaploidná)
- **Aneuploidia** – o 1 chromozóm viac/menej:
  - Trizómia 21 → **Downov syndróm** (47 chromozómov)
  - 45, X → **Turnerov syndróm** (žena bez jedného X)
  - 47, XXY → **Klinefelterov syndróm** (muž s extra X)

## Mutagény
UV žiarenie, ionizujúce žiarenie (röntgen, gama), chemikálie (benzopyrén, aflatoxín, horčičný plyn).`,

"14-2":`## Čo pozorujeme
Bukálne epitelové bunky (z vnútornej strany líca) sú príkladom **dlaždicového epitelu** – ploché, nepravidelné bunky.

## Pomôcky a postup
Vatový tampón alebo drevenná špachtle; podložné a krycie sklíčko; roztok **metylénovej modri** (farbí kyslé zložky bunky – jadro modro); mikroskop.
1. Jemne potrenúť vnútorné líce vatovou tyčinkou
2. Preniesť bunky na podložné sklíčko do kvapky destilovanej vody (alebo fyziologického roztoku)
3. Pridať kvapku metylénovej modri; nechať pôsobiť 1–2 min
4. Zakryť krytím sklíčkom (odstrániť vzduchové bubliny)
5. Pozorovať pri 200–400× zväčšení

## Čo vidíme v preparáte
- Ploché, nepravidelné bunky (väčší ako krvinky)
- **Centrálne sfarbené jadro** (tmavšie modré) – dobre viditeľné po farbení
- Bledá cytoplazma
- Viditeľné hranice bunkovej membrány (nie bunková stena – epitel živočícha!)

## Záver
Bukálne bunky sú jednoducho dostupné. Preparát demonštruje základnú stavbu živočíšnej bunky bez bunkovej steny (na rozdiel od rastlinných buniek). Jadro je dobre viditeľné po farbení, kým bez farbiva splýva s cytoplazmou.`,

"15-0":`## Nepohlavné (vegetatívne) rozmnožovanie rastlín
Prebieha **bez spájania pohlavných buniek** → potomkovia sú geneticky identickí s rodičom (klony).
Prirodzené formy: **výhonky/stolóny** (jahoda, trávy), **podzemné hľuzy** (zemiaky), **cibuľky** (tulipán, cibuľa), **plazivé výbežky (odnože)**, **fragmentácia** (rozpadnutie tela), **výtrusy** (machorasty, paprade).
Umelé formy: odrezky, štepenie, ohýbanie (marcottage), **mikropropagácia** (kultura tkanív v laboratóriu).

## Pohlavné rozmnožovanie rastlín
Spojenie pohlavných buniek (**gamét**) → oplodnenie → **zygóta** → embryo. Génová rekombinácia → variabilita potomkov (výhoda pre evolúciu!).
U krytosemenných prebieha **dvojité oplodnenie** (unikát v rastlinnej ríši):
- 1. spermia + vajíčko → **zygóta** (→ zárodok/embryo)
- 2. spermia + 2 polárne jadrá → **endosperm** (3n) = zásobné tkanivo semena

## Rodozmena (alternácia generácií)
Striedanie dvoch fáz v životnom cykle:
- **Sporofyt (2n)** – diploidná fáza, produkuje výtrusy meiózou
- **Gametofyt (n)** – haploidná fáza, produkuje gamety mitózou
U machorastov prevláda **gametofyt**; u papradí a vyšších rastlín prevláda **sporofyt**.

## Na maturite sa pýtajú
Dvojité oplodnenie (čo z čoho vzniká), výhody pohlavného vs. nepohlavného rozmnožovania, konkrétne príklady vegetatívneho rozmnožovania.`,

"15-1":`## Zloženie krvi
**Krv** je tekuté väzivo; tvorí ~8 % telesnej hmotnosti.
- **Krvná plazma (~55% objemu):** ~90% voda + bielkoviny (albumín – osmóza; globulíny – imunita; fibrinogén – zrážanie) + glukóza, hormóny, elektrolyty, odpadové látky
- **Krvné bunky (~45%):** erytrocyty, leukocyty, trombocyty

## Červené krvinky (erytrocyty)
Dvojdutinové (biconcávne) disky bez jadra (u cicavcov) → maximálna plocha pre hemoglobín.
**Hemoglobín** (Fe²⁺) – viaže O₂ (→ oxyhemoglobín) a CO₂. Životnosť: ~120 dní; tvoria sa v červenej kostnej dreni (hematopoéza).

## Biele krvinky (leukocyty)
- **Granulocyty:** neutrofily (fagocytóza baktérií), eozinofily (parazity, alergeny), bazofily (histamín)
- **Agranulocyty:** lymfocyty T (bunková imunita) a B (protilátky), monocyty (→ makrofágy)

## Krvné doštičky (trombocyty)
Bezjadrové fragmenty megakaryocytov. Funkcia: **hemostáza (zrážanie krvi)** → koagulačná kaskáda → fibrín → krvná zrazenina.

## Funkcie krvi
Transport O₂, CO₂, živín, hormónov, odpadov; termoregulácia; imunita; hemostáza; regulácia pH.

## Na maturite sa pýtajú
Stavba hemoglobínu, funkcie jednotlivých typov leukocytov, proces zrážania krvi, krvné skupiny (→ Zadanie 4).`,

"15-2":`## Genetický kód – základné pojmy
**Kodón** = trojica nukleotidov na mRNA, ktorá kóduje jednu aminokyselinu (alebo signalizuje Stop).
4 bázy (A, U, G, C) v trojiciach → 4³ = **64 rôznych kodónov** pre 20 aminokyselín + 3 stopkodóny.

## Vlastnosti genetického kódu
- **Degenerovaný (redundantný)** – väčšina aminokyselín je kódovaná viacerými kodónmi (napr. Leu má 6 kodónov, Trp len 1)
- **Neprekrývajúci sa** – každý nukleotid patrí len do jedného kodónu
- **Bez interpunkcie** – čítanie prebieha súvisle od AUG bez prestávok
- **Takmer univerzálny** – rovnaký pre (takmer) všetky organizmy – dôkaz spoločného predka
- **Štartovací kodón: AUG** → kóduje metionín (Met); iniciuje transláciu
- **Stopkodóny: UAA, UAG, UGA** – nekódujú žiadnu aminokyselinu, ukončujú transláciu

## Ako čítať tabuľku genetického kódu
Kodón na mRNA čítame 5'→3'. Tabuľka má prvú bázu v riadku, druhú v stĺpci, tretiu v podstĺpci.
Príklad: AUG = Met (štart); UUU = Phe; GGC = Gly; UAA = Stop.

## Na maturite sa pýtajú
Určiť aminokyselinovú sekvenciu z mRNA sekvencie pomocou tabuľky genetického kódu, vysvetliť degeneráciu kódu a čo je stopkodón.`,

"16-0":`## Čo sú abiotické faktory
**Abiotické faktory** sú neživé zložky prostredia, ktoré ovplyvňujú výskyt a aktivitu organizmov.

## Klimatické faktory
- **Teplota** – ovplyvňuje rýchlosť metabolizmu; poikilotermné vs. homeotermné živočíchy; adaptácie (hibernácia, migrácia)
- **Svetlo** – fotosyntéza, fotoperiodizmus (dĺžka dňa → kvitnutie, migrácia vtákov, hniezdiaci inštinkt)
- **Zrážky/vlhkosť** – hygrofyty (vlhko), xerofyty (sucho – kaktusy, rozchodníky), mezofyty (stredné vlhko)
- **Vietor** – mechanický stres, šírenie peľu a semien, transpirácia

## Edafické (pôdne) faktory
- **pH pôdy** – acidofyty (kyslá pôda: borievka, vresovec), neutrofyty (neutrálna), bazofyty (zásaditá: veternica)
- **Textúra pôdy** – ílová (drží vodu), piesčitá (prepúšťa rýchlo), hlinitá (optimálna)
- **Obsah minerálnych látok** (N, P, K)

## Kľúčové ekologické zákony
- **Liebigov zákon minima:** rast a rozmiestnenie organizmov obmedzuje faktor, ktorý je v **minime**, nie celkový súčet faktorov
- **Shelfordov zákon tolerancie:** každý organizmus má **optimum** a **hranice tolerancie** pre každý faktor; mimo tieto limity neprežije
- **Ekologická valencia** – rozsah tolerancie: **eurytopné** (tolerujú veľké rozsahy) vs. **stenotopné** (úzka tolerancia)

## Na maturite sa pýtajú
Liebigov zákon s príkladom, Shelfordova krivka (schéma), rozdelenie rastlín podľa vlhkosti a pôdneho pH.`,

"16-1":`## Nešpecifická (vrodená) imunita
Funguje **okamžite**, bez predchádzajúceho kontaktu s patogénom. Nerozeznáva konkrétne druhy hrozieb.
- **Fyzikálne bariéry:** koža (neporušená), riasinky v dýchacích cestách, sliznice
- **Chemické bariéry:** HCl v žalúdku (pH 1–2), lysozým v slinách, slzách, hliene; interferóny (antivirálne proteíny)
- **Bunky:** fagocyty – **neutrofily** (pohltia a zabijú baktérie), **makrofágy** (fagocytóza + prezentácia antigénu); **NK-bunky** (natural killers – ničia nádorové bunky a vírusom infikované bunky)
- **Zápal** – lokálna reakcia (sčervenenie, opuch, teplo, bolesť) → zvýšený prietok krvi a prísun fagocytov
- **Komplementový systém** – kaskáda proteínov → lýza patogénu (opora)

## Špecifická (získaná) imunita
Pomalší rozvoj (dni–týždne), ale **silný, špecifický a pamäťový**.

**Humorálna imunita** – B-lymfocyty → plazmatické bunky → **protilátky (imunoglobulíny)**. Protilátky: neutralizácia, opsonizácia (označenie pre fagocyty), aktivácia komplementu.

**Bunková imunita** – T-lymfocyty:
- **T pomocné (CD4⁺)** – koordinujú imunitnú odpoveď (aktivujú B-lymfocyty a cytotoxické T)
- **Cytotoxické T (CD8⁺)** – ničia infikované bunky a nádorové bunky
- **Pamäťové bunky** – základ **imunologickej pamäti** (pri 2. kontakte rýchla odpoveď) → princíp vakcinácie

## Na maturite sa pýtajú
Rozdiel nešpecifická vs. špecifická imunita, humorálna vs. bunková, antigén vs. protilátka, ako funguje vakcína.`,

"16-2":`## Čo sú sklereidry
**Sklereidry** sú bunky **sklerenchymu** – pevnostného pletiva s rovnomerne **lignitifikovanými** (zdrevnatenými) bunkovými stenami. Sú **mŕtve** – funkčné je len ich zhrubnutá stena.

## Typy sklereidov
- **Brachysklereidry (kamenné bunky)** – krátke, izodiametrické; v hruškovom mäse (dávajú mu zrnitú textúru), v peciatkoch čerešní a sliviek
- **Makrosklereidry** – dlhé, stĺpcovité; v osemení semien strukovín
- **Osteosklereidry** – tvar kostí/činky; v listoch niektorých rastlín

## Pomôcky a postup
Hruška (plod), mikroskop, skalpel/žiletka, sklíčka; **floroglucinol** (farbivo na ligníntizované bunky – farbia sa červenofialovo po pridaní kvapky HCl).
1. Odrezať tenký rez z hrušky (cca 1 mm)
2. Umiestniť na sklíčko, pridať kvapku floroglucinolu + kvapku HCl
3. Zakryť krycím sklíčkom
4. Pozorovať pri 100–400×

## Čo vidíme
- Guľaté až oválne kamenné bunky
- Extrémne **hrubé bunkovné steny** sfarbené **červenofialovo** (ligníntizácia)
- Viditeľné **kanáliky (pory)** v stenách – spájali susedné bunky počas života
- Prázdny lúmen (bunka je mŕtva, cytoplazma zanikla)

## Záver
Kamenné bunky sú zodpovedné za zrnitú textúru hrušky; floroglucinol je špecifický test na prítomnosť lignínu.`,

"17-0":`## Stavba srdca
Srdce = duté svalové čerpadlo uložené v **perikarde** (osrdcovníku) v hrudníku.
**4 dutiny:** pravá predsieň + pravá komora (→ pľúcny obeh); ľavá predsieň + ľavá komora (→ veľký obeh).
**Chlopne** (zabraňujú spätnému toku): **mitrálna** (ľ. predsieň/komora), **trikuspidálna** (pravá), **aortálna**, **pľúcna**.
Stena ľavej komory je 3× hrubšia (musí prečerpať krv do celého tela).

## Elektrická aktivita srdca
**SA uzol (sinoatriálny)** – prirodzený pacemaker v pravej predsieni; generuje impulz ~70×/min.
Impulz → **AV uzol** (predsieň-komorový) → **Hisov zväzok** → **Purkyňove vlákna** → synchronizovaná kontrakcia komôr.
**EKG** zaznamenáva elektrickú aktivitu srdca: vlna P (predsiene), komplex QRS (komory), vlna T (relaxácia komôr).

## Krvné cievy
- **Tepny (artérie)** – vedú krv **od** srdca; silná elastická stena
- **Žily (vény)** – vedú krv **k** srdcu; tenšia stena, **chlopne** (zabraňujú spätnému toku)
- **Kapiláry** – miesto výmeny látok; stena = 1 vrstva endotelu

## Dva obehy
**Malý (pľúcny):** pravá komora → pľúcnica → pľúca (okysličenie) → pľúcne žily → ľavá predsieň
**Veľký (systémový):** ľavá komora → aorta → celé telo → dutiny žily (venae cavae) → pravá predsieň

## Lymfatický systém
Vracia tkanivovú tekutinu (lymfu) do krvi; lymfatické uzliny filtrujú cudzorodé látky; dôležitý pre imunitu.`,

"17-1":`## Mitóza – somatické delenie (2n → 2n)
Výsledok: **2 dcérske bunky** s rovnakým počtom chromozómov ako materská bunka.

**Fázy mitózy:**
- **Profáza:** chromozómy kondenzujú (sesterchromatidy viditeľné), rozpadá sa jadrový obal, tvorí sa deliace vreteno (mikrotubuly z centrozómov)
- **Metafáza:** chromozómy sa zaraďujú na **ekvatoriálnu platňu** (najlepšie viditeľné! – používa sa na karyotypizáciu)
- **Anafáza:** centroméry sa roztrhajú, sesterchromatidy sa ťahajú k opačným pólom → každý pól má celú sadu chromozómov
- **Telofáza:** obnova jadrových obalov, dekondenzácia; **cytokinéza** – rozdelenie cytoplazmy (u rastlín: bunková platňa; u živočíchov: prísavkový prstenec)

## Meióza – redukčné delenie (2n → 4× n)
Výsledok: **4 haploidné bunky** – pohlavné bunky (gamety) alebo výtrusy.

**Meióza I (redukčná):**
- **Profáza I:** **synapsa** – párovanie homologických chromozómov (bivalenty); **crossing-over** = výmena úsekov chromatíd medzi homológmi (rekombinácia génov!)
- **Metafáza I – Anafáza I:** homologické chromozómy sa oddelia k pólom (nie chromatidy!)
- Výsledok: 2 haploidné bunky (každá s 2 chromatidami)

**Meióza II:** prebieha ako mitóza → 4 haploidné bunky (spermatidy alebo vajíčka).

## Crossing-over = zdroj genetickej variability
Rekombinácia génov na homologných chromozómoch → nové kombinácie alel → variabilita potomkov.`,

"17-2":`## Čo sú chromoplasty
**Chromoplasty** sú plastidy obsahujúce farebné pigmenty – **karotény** (oranžové), **xantofyly** (žlté) a **lykopén** (červený). Nemajú chlorofyl → nerobí fotosyntézu.

## Výskyt a farby
- **Oranžové** – mrkva (koreň s karoténom), tekvica, rakytník
- **Červené** – paradajka (lykopén), červená paprika
- **Žlté** – žlté kvety, žlté plody, banán

## Pomôcky a postup
Mrkva alebo paradajka; mikroskop; skalpel; sklíčka.
1. Urobiť tenký priečny rez mrkvy alebo paradajky (čo tenší, tým lepší – ideálne žiletkou)
2. Umiestniť na sklíčko do kvapky vody
3. Zakryť krycím sklíčkom
4. Pozorovať pri 100–400×

## Čo vidíme
- Bunky naplnené **oranžovými/červenými/žltými granulami** rôznych tvarov
- Chromoplasty môžu byť guľaté, vejárovité, tyčinkovité, kryštalické (záleží od druhu rastliny)
- V mrkvách: ihlicovité kryštaly karoténu
- Jadro môže byť vytlačené na okraj bunky hustou masou chromoplastov

## Ekologický a evolučný význam
Pestrofarebnosť plodov a kvetov láka **živočíchov** – opeľovačov (kvety) a konzumentov plodov (šírenie semien). Karotén je tiež predchadzač vitamínu A u živočíchov.

## Záver
Chromoplasty môžu vzniknúť z chloroplastov (zelené ovocie dozrieva → žltne/červenie pri premene chloroplastov na chromoplasty).`,

"18-0":`## Vegetatívne orgány
Zabezpečujú základné životné funkcie (výživa, transport, opora).

**Koreň (radix):** príjem vody a minerálov, ukotvenie, zásobovanie. Pásma: koreňová čiapočka → deliace pásmo → elongačné pásmo → **absorbčné pásmo** (koreňové vlášenie – max. absorpcia) → pásmo bočných koreňov. Typy: kôlový (dvojklíčnolistové), vláknitý (jednoklíčnolistové).

**Stonka (caulis):** transport (xylém, floém), podpora, zásobovanie. Typy: bylinnná, drevnatá, plazivá, šplhavá; podzemné: **rizóm** (papraď, trávy), **hľuza** (zemiak), **cibuľa** (tulipán).

**List (folium):** fotosyntéza, transpirácia, výmena plynov. Časti: čepeľ + stopka + pošva/prílistky. Žilnatina: súbežná (jednoklíčnolistové) vs. sieťová (dvojklíčnolistové).

## Generatívne (reprodukčné) orgány
- **Kvet** – sexuálne rozmnožovanie; stavba: kalich + koruna + tyčinky + piestik
- **Plod (fructus)** – vzniká zo **semenníka** po oplodnení; chrání a šíri semená:
  - *Dužnaté:* bobule (paradajka, ríbezle), kôstkovice (čerešňa, slivka), malvica (jablko, hruška)
  - *Suché:* struk (fazuľa, hrach), šešuľa (repka, reďkevička), nažka (slnečnica, púpava), obilka (pšenica), tobolka
- **Semeno** = zárodok (embryo) + zásobné tkanivo (endosperm alebo kotyledóny) + osemenie

## Na maturite sa pýtajú
Pásma koreňa a ich funkcie, typy plodov s príkladmi, rozdiel medzi plodom a semenom.`,

"18-1":`## Delenie nervovej sústavy
**Centrálna nervová sústava (CNS):** mozog + miecha

**Mozog (encephalon):**
- **Veľký mozog (cerebrum):** 2 hemisféry; mozgová kôra (kortex) = sivá hmota (neuróny), vnútri biela hmota (axóny). Funkcie: myslenie, reč, pamäť, vôľa, spracovanie zmyslových podnetov. Laloke: frontálny (vôľa, reč), parietálny (hmat, priestor), temporálny (sluch, pamäť), okcipitálny (zrak)
- **Medzimozog (diencephalon):** talamus (bránka zmyslových informácií), hypotalamus (regulácia teploty, hladu, smädu, cyklu spánku; tvorba hypofyzárnych hormónov)
- **Mozgový kmeň** (stredný mozog, most, predĺžená miecha): zrakové/sluchové reflexy, riadenie dýchania a TK, prehĺtanie
- **Mozoček (cerebellum):** koordinácia pohybov, rovnováha, jemná motorika

**Miecha (medulla spinalis):** vedenie impulzov mozog ↔ periféria; reflexné oblúky (napr. kolenný reflex).

**Periférna NS (PNS):**
- **Somatická** – vedome ovládané pohyby (kostrové svaly)
- **Autonómna (vegetatívna):** sympatikus (stres – „fight or flight": ↑TK, ↑pulz, dilatácia zreníc) vs. parasympatikus (pokoj – „rest and digest": ↓TK, peristaltika)

## Neurotransmitery
Acetylcholín, dopamín, serotonín, noradrenalín, GABA (inhibičný), glutamát (excitačný).`,

"18-2":`## Evolúcia tráviacej sústavy – špecializácie
(Súvisí so Zadaním 6-1 – doplnkové info pre odborný text)

## Slepý vs. priechodný tráviaci trakt
- **Slepý (1 otvor):** pŕhlivce, ploskavce – potrava vstupuje a odpad vychádza tými istými ústami
- **Priechodný (2 otvory, ústa → riť):** od hlístoviek vyššie → efektívnejšie trávenie

## Špecializované adaptácie živočíchov

**Prežúvavce (krava, ovca, jeleň):** **4-komorový žalúdok**
- *Bachor (rumen)* – fermentácia celulózy baktériami a prvoky; obrovský objem
- *Čiapočka (reticulum)* – triedenie a regurgitácia (prežúvanie)
- *Kniha (omasum)* – vstrebávanie vody a mastných kyselín
- *Slez (abomasum)* – pravý žalúdok s enzýmami (HCl, pepsín)

**Vtáky:**
- *Vola* – zmäkčenie potravy; *žľaznatý žalúdok* – enzymatické trávenie; **svalnatý žalúdok (svalník/Gizzard)** – mechanické mletie semien (obsahujú kamienky)

**Hady:** prehĺtajú korisť celú → žalúdok s proteázami, pomalé trávenie (týždne)

**Hmyz:** proboscis (motýle, komáre), slinné žľazy (enzýmy), stredné črevo (trávenie), rektum (vstrebávanie vody)

## Na maturite sa pýtajú
Funkcia každej komory u prežúvavcov, prečo majú vtáky svalnatý žalúdok, aký enzým štiepi celulózu (nie živočíšny, ale baktérie v bachore).`,

"19-0":`## Stavba baktériovej bunky
**Baktérie** sú prokaryotické jednobunkové organizmy – **bez membránového jadra**.
- **Bunková stena** z **peptidoglykánu (mureínu)** – základ Grammovho farbenia:
  - **Gram-pozitívne (Gr+):** hrubá vrstva peptidoglykánu → farbia sa **modrofialovo**
  - **Gram-negatívne (Gr−):** tenká vrstva + vonkajšia membrána (LPS) → farbia sa **ružovo/červeno**
- **Nukleoid** – kruhová DNA voľne v cytoplazme (bez jadrovej membrány)
- **Plazmidy** – malé kruhové DNA; nesú gény rezistencie na antibiotiká; prenášajú sa medzi baktériami (konjugácia)
- **Ribozómy 70S** (menšie ako eukaryotické 80S – terč antibiotík: streptomycín, tetracyklín)
- **Bičíky** (pohyb), **fimbrie** (priľnutie k hostiteľovi alebo k povrchom), **puzdro** (ochrana)
- **Endospóry** – extrémne odolné kľudové štádiá (Clostridium, Bacillus) – odolávajú vareniu!

## Tvary baktérií
Koky (guľaté: stafylokoky, streptokoky), bacily (tyčinkovité), spirily (špirálovité), vibria (vírgula).

## Ekologický a lekársky význam
- Patogény: *Mycobacterium tuberculosis* (TBC), *Salmonella* (otrava jedlom), *Staphylococcus aureus* (hnisavé infekcie), *Streptococcus*, *Clostridium tetani* (tetanus)
- Benefičné: fixácia dusíka (*Rhizobium* – hlízkové baktérie), výroba antibiotík (aktinomycéty), fermentácia (jogurt, kyslá kapusta), črevná mikrobiota

## Na maturite sa pýtajú
Rozdiel prokaryot vs. eukaryot (jadro, organely, veľkosť), Grammovo farbenie, funkcia plazmidov, príklady patogénnych baktérií.`,

"19-1":`## Príjem vody – osmóza cez koreňové vlášenie
Voda prechádza z pôdy (nižšia koncentrácia) do koreňových vláskov (vyššia koncentrácia osmotík – sugary, ióny) osmózou.
Dvomi cestami cez kortex koreňa:
- **Apoplastová cesta** – cez bunkovné steny a medzibunkové priestory (rýchla, pasívna)
- **Symplastová cesta** – cez cytoplazmu a plazmodesmy (cez bunky)
**Kaspáryho pásik** (na endodermálnych bunkách) – suberin zapečatí steny → voda musí prejsť cez membránu (kontrolný bod!).

## Vedenie vody nahor – xylém
Voda stúpa v **xylémových cievach** (mŕtve trubičky) dvoma silami:
1. **Koreňový tlak** – aktívne čerpanie iónov do xylému → osmotický vstup vody (menej dôležité)
2. **Transpiračný ťah** (hlavná sila!) – výpar vody z listov → podtlak v xylémových cievach → voda je **ťahaná** hore kontinuálnym stĺpcom; funguje vďaka **kohézii** (väzby medzi molekulami vody) a **adhézii** (väzby k stenám ciev); dosah aj 100+ m (sekvojové stromy!)

## Výdaj vody
- **Transpirácia** – výpar vody cez **prieduchy** listov (~90% všetkej vody) – aktívne regulovaná
- **Gutácia** – vylučovanie kvapkavej vody cez **hydatódy** (pasívna, pri veľkom koreňovom tlaku)
- **Kutikula** – malý výpar cez povrch listu mimo prieduchov (~10%)

## Na maturite sa pýtajú
Transpiračný ťah (kohézia-adhézia), rozdiel prieduchy vs. hydatódy, úloha Kaspáryho pásika.`,

"19-2":`## Druhy ochrany prírody
- **In situ ochrana** – priamo v prírode, v prirodzenom prostredí
- **Ex situ ochrana** – mimo prirodzeného prostredia (ZOO, arboréta, botanické záhrady, **genobanka** – uchováva semená, spermie, embryá)

## Kategórie chránených území v SR (od najvyššej ochrany)
1. **Národný park (NP)** – najvyššia ochrana; Tatranský NP, Pieninský NP, Slovenský raj NP, Nízke Tatry NP, Poloniny NP, Muránska planina NP, Malá Fatra NP, Veľká Fatra NP, Slovenský kras NP
2. **Chránená krajinná oblasť (CHKO)** – rozsiahlejšie územie s menšou ochranou
3. **Prírodná rezervácia (PR) / Národná prírodná rezervácia (NPR)**
4. **Prírodná pamiatka (PP)** – mimoriadne prírodné hodnoty

## Medzinárodné dohovory
- **CITES** – obchod s ohrozenými druhmi (Washington, 1973)
- **Ramsarský dohovor** – ochrana mokradí (1971)
- **Dohovor o biologickej diverzite** (Rio de Janeiro, 1992)
- **Natura 2000** – sieť chránených území EÚ (ptačie oblasti + habitatové oblasti)

## Červené zoznamy IUCN – kategórie ohrozenia
EX (vyhynuté), EW (vyhynuté v prírode), **CR** (kriticky ohrozené), **EN** (ohrozené), **VU** (zraniteľné), NT (takmer ohrozené), LC (málo dotknuto).

## Na maturite sa pýtajú
Rozdiely in situ vs. ex situ, aspoň 3 národné parky v SR, princíp CITES, kategórie IUCN.`,

"20-0":`## Základné znaky nahosemenných
**Nahosemenné (Gymnospermae)** – semená **nie sú uzavreté v plode (oplodnici)**, ležia nahé na semenných šupinách šišiek. Sú to dreviny (stromy alebo kry).

## Hlavné skupiny

**Cykasy (Cycadophyta):**
Tropické, palmovité dreviny; relikty druhohornej flóry. *Cycas revoluta* – ozdobná rastlina.

**Ginkgo (Ginkgophyta):**
*Ginkgo biloba* – **„žijúca fosília"** (nezmenila sa od druhohor); vejárovité listy; dvojdomá rastlina (mužské a ženské na separátnych stromoch). Výťažok listov → zlepšenie pamäti (liek).

**Ihličnany (Coniferophyta):** najrozšírenejšia skupina:
- *Pinus sylvestris* (borovica lesná) – ihly po 2 vo fascikuloch
- *Picea abies* (smrek obyčajný) – štvorcové ostré ihly, visiace šišky
- *Abies alba* (jedľa biela) – ploché mäkké ihly, šišky stoja hore
- *Larix decidua* (smrekovec opadavý) – **opadavý** ihličnan; ihly v chomáčikoch
- *Taxus baccata* (tis obyčajný) – jedovatý; červené mizdry (nie pravé plody)

**Adaptácie ihličiek na sucho a chlad:**
Tuhé, s hrubou kutikulu a voskovým povlakom; stomaty v ryhách → znižuje transpiráciu.

## Ekologický a hospodársky význam
Tajga (boreálne lesy) = najrozsiahlejšia suchozemská biomasa; drevo (stavebníctvo, papier), živica, terpentín, smola.

## Na maturite sa pýtajú
Rozdiely 4 hlavných ihličnanov (ihly, šišky), prečo sú nahosemenné (semená bez oplodnice), čo je fascikulus.`,

"20-1":`## Mendel a jeho experimenty
**Gregor Johann Mendel** (1822–1884) – augustiánsky mních z Brna; experimenty s **hrachom setým** (*Pisum sativum*); vypracoval zákony dedičnosti, ktoré publikoval v roku 1866. Ocenený až posmrtne.

## 1. Mendlov zákon – zákon segregácie (rozštiepenia)
**Formulácia:** Alely jedného génu sa pri tvorbe gamét od seba **segregujú** – každá gameta dostane len jednu alelu daného génu.
**Kríženie:** PP × pp → F₁: všetci Pp (uniformná – 1. zákon dominancie)
F₁ × F₁: Pp × Pp → F₂: **3 dominantné : 1 recesívne** (25% PP + 50% Pp + 25% pp)

## 2. Mendlov zákon – zákon nezávislého rozdeľovania
**Formulácia:** Gény pre rôzne znaky sa dedia **nezávisle** od seba, ak sú na **rôznych chromozómoch**.
**Dihybridné kríženie:** AaBb × AaBb → F₂: fenotypový pomer **9:3:3:1** (4 kombinácie fenotypov).
Neplatí pre **spriahnuté gény** (na tom istom chromozóme) – tie sa dedia spolu (s výnimkou crossing-over).

## Kľúčové pojmy
- **Alela** – alternatívna forma génu (A alebo a)
- **Genotyp** – genetická výbava (AA, Aa, aa); **Fenotyp** – viditeľné vlastnosti
- **Dominantný** – prejavuje sa aj v heterozygote; **recesívny** – prejavuje sa len v homozygote
- **Punettov štvorec** – grafický nástroj na určenie pravdepodobnosti genotypov potomkov`,

"20-2":`## Cieľ
Naučiť sa určovať bezstavovce pomocou **dichotomického určovacieho kľúča**.

## Hlavné skupiny bezstavovcov a ich znaky
- **Obrúčavce (Annelida):** článkované valcovité telo, setae (štetinky), chýbajú nohy; žížala, pijavica
- **Mäkkýše (Mollusca):** mäkké telo, noha, plášť (tvorí ulitu); slimák, slávka, chobotnica
- **Článkonožce (Arthropoda):**
  - Hmyz: **6 nôh, 3 časti tela, tykadlá 1 pár** (motýľ, chrobák, včela)
  - Pavúkovce: **8 nôh, 2 časti tela, žiadne tykadlá** (pavúk, kliešť)
  - Kôrovce: **10+ nôh, 2 páry tykadiel** (rak, krab)
  - Mnohonôžky: mnohočlánkové, 2 páry nôh/článok
- **Ostnokožce (Echinodermata):** paprskovitá symetria, tŕne; hviezdica, ježovka, holotúria

## Postup určovania
1. Zobrať živočícha alebo obrázok/model
2. Postupovať cez kľúč: pri každom kroku odpovedať na morfologickú otázku (napr. „má nohy?" → áno/nie)
3. Pokračovať do konca kľúča → zapísaná identifikácia
4. Overiť v atlase bezstavovcov

## Záver
Kľúčové rozlišovacie znaky: **počet nôh** (0/6/8/10+/veľa), počet tykadiel, prítomnosť ulity/schránky, typ tela (článkované/nečlánkované).`,

"21-0":`## Pohlavné chromozómy u človeka
- Žena: **XX** – oba chromozómy X nesú gény (diploidné pre X-viazané gény)
- Muž: **XY** – Y chromozóm je malý, nesie len gén SRY (určenie pohlavia) a niekoľko ďalších; X-viazané gény muž má len **1 kópiu** → hemizygot

## X-viazaná recesívna dedičnosť
Gén je na **X chromozóme**, alela je **recesívna**.
- Žena: heterozygotná X^A X^a = **prenašačka (nosička)** – neprejavuje ochorenie (má zdravú X^A)
- Muž: X^a Y = **postihnutý** (len jedna kópia génu, žiadna zdravá kópia)
→ **Postihnutí sú väčšinou muži; ženy sú nosiče**

**Príklady X-viazaných recesívnych chorôb:**
- **Daltonizmus (farbosleposť)** – neschopnosť rozlíšiť červenú a zelenú
- **Hemofília A** (faktor VIII) a **hemofília B** (faktor IX) – porucha zrážania krvi
- **Duchennova muskulárna dystrofia** – progresívne svalové ochorenie

## X-viazaná dominantná dedičnosť (vzácnejšia)
Postihnuté aj ženy aj muži, ženy 2× častejšie.

## Y-viazaná (holandrická) dedičnosť
Gén len na Y → prenáša sa **výlučne z otca na syna**. Príklad: SRY gén (určenie mužského pohlavia).

## Genetické úlohy – postup
1. Zapísať genotypy rodičov s chromozómami (napr. X^H X^h × X^H Y)
2. Zostaviť Punettov štvorec
3. Určiť genotypy a fenotypy potomkov + pravdepodobnosti

## Na maturite sa pýtajú
Dedičnosť hemofílie alebo daltonizmu, prečo sú postihnutí hlavne muži, definovanie nosičky.`,

"21-1":`## Poikilotermné (ektotermné) živočíchy
Telesná teplota závisí od **okolitého prostredia** – menia sa s ňou. Väčšina bezstavovcov, ryby, obojživelníky, plazy.
- Nižší energetický výdaj (neohreváva sa), ale obmedzená aktivita pri nízkych teplotách
- **Behaviorálna termoregulácia:** vyhľadávanie slnka alebo tieňa, orientácia tela
- **Hibernácia** (zimný spánok) pri nízkych teplotách; **estivécia** (letný spánok) pri suchu

## Homeotermné (endotermné) živočíchy
Udržiavajú **stálu telesnú teplotu** nezávisle od okolia – vtáky (39–42°C) a cicavce (36–38°C).

**Mechanizmy tvorby tepla (termogenéza):**
- Svalové chvenie (triasenie)
- **Nebrandové teplo** – hnedé tukové tkanivo (termogenín = UCP1) u novorodencov a hibernantov; priamo mení energiu na teplo bez ATP
- Vazokonstriktácia periférie (krv sa sústredí k jadru)

**Mechanizmy chladenia:**
- Potenie (odpar vody z kože)
- Zadýchavanie (psy nemajú potné žľazy na koži → lapajú dych)
- Vazodilatácia (rozšírenie povrchových ciev – uši zajaca)

**Adaptácie polárnych živočíchov:**
Hrubá vrstva tuku (ľadový medveď, tulene), hustá srsť, **protismerný výmenník tepla** v cievach nôh (zabraňuje stratám tepla do ľadu).`,

"21-2":`## Príčiny klimatickej zmeny
**Klimatická zmena** = dlhodobá zmena priemernej teploty a počasia; dnes primárne spôsobená **ľudskou činnosťou**.

**Skleníkový efekt – zosilnený antropogénne:**
- **CO₂** – spaľovanie fosílnych palív (uhlie, ropa, zemný plyn), odlesňovanie
- **CH₄** – chov dobytka, ryžové polia, skládky, ropovody
- **N₂O** – hnojivá, spaľovanie biomasy
- **CFC (freóny)** – ničia aj ozónovú vrstvu; zakázané Montrealským protokolom (1987)
- **Odlesňovanie** – menej CO₂ sa pohltíme; strata biotopov; erőzia pôdy

## Dôsledky
- Rast priemernej teploty (+1,1–1,3°C od predindustriálneho obdobia)
- **Topenie ľadovcov a polárnej čiapky** → zvyšovanie hladiny morí (ohrozenie nízko položených území)
- Extrémne javy: sucho, záplavy, hurikány, požiare
- **Acidifikácia oceánov** (CO₂ + H₂O → H₂CO₃ → znižuje pH → škodí koralám a mäkkýšom)
- Zmeny ekosystémov, posun druhov k pólom a do vyšších výšok, hroziaca vyhynutia

## Riešenia
- **Parížska dohoda (2015)** – obmedzenie oteplenia na max. 1,5°C
- Obnoviteľné zdroje energie (solar, vietor, voda)
- Energetická efektivita, elektromobilita, zachytávanie CO₂ (CCS)
- Ochrana lesov, obnova ekosystémov`,

"22-0":`## Vylučovacia sústava

**Obličky (renes)** – párový orgán; filtrujú krv a tvoria moč.
**Nefron** = základná funkčná jednotka (~1 milión/oblička):
- **Malpighiho teliesko** = glomerulus (kapilárny klbko) + Bowmanov puzdier → **filtrácia** (~180 l filtrátu/deň!)
- **Proximálny tubul** – reabsorpcia glukózy, aminokyselín, väčšiny vody a iónov
- **Henleho slučka** – koncentrácia moča (reabsorpcia vody)
- **Distálny tubul + zberný kanálik** – jemná regulácia (aldosterón → Na⁺; ADH → voda)
- Konečný moč: ~1,5–2 l/deň (urea, kreatinín, elektrolyty, voda)

**Ďalšie časti:** močovody → močový mechúr → urethra (močová trubica).

## Kožná sústava
Koža je najväčší orgán tela (1,5–2 m²).
- **Epidermis** – vonkajšia vrstva; keratinocyty (tvorba keratínu), **melanocyty** (melanín – ochrana pred UV)
- **Dermis (korium)** – hlbšia vrstva; kolagén + elastín, cievy, nervy, vlasové folikuly, **mazové žľazy** (sebum), **potné žľazy** (termoregulácia)
- **Podkožné tkanivo (hypodermis)** – tukové tkanivo (izolácia, zásobovanie energiou)
- **Deriváty kože:** vlasy, nechty, mazové a potné žľazy

## Funkcie kože
Ochrana (pred mechanickým poranením, UV, patogénmi), termoregulácia, vylučovanie (pot), syntéza vitamínu D (UV), zmyslové receptory (hmat, bolesť, teplota).

## Na maturite sa pýtajú
Fázy filtrácie v obličke (filtrácia → reabsorpcia → sekrécia), hormóny regulujúce obličky (ADH, aldosterón), vrstvy kože a funkcie každej.`,

"22-1":`## Prokaryotická bunka
- **Veľkosť:** 0,1–10 μm
- **Jadro:** nemá membránovú obálku → DNA voľne v **nukleoide**
- **Bunková stena:** peptidoglykán (mureín)
- **Organely:** ŽIADNE membránové! Len **ribozómy 70S**
- **DNA:** kruhová, jedna; + plazmidy
- **Rozmnožovanie:** binárne delenie (asexuálne)
- **Pohyb:** bičíky (flagely)
- **Zástupcovia:** baktérie, archebaktérie

## Eukaryotická bunka
- **Veľkosť:** 10–100 μm
- **Jadro:** uzavreté v **dvojitej jadrovej membráne** (nuclear envelope); obsahuje chromozómy
- **Membránové organely:**
  - Mitochondria – bunkové dýchanie, tvorba ATP
  - Chloroplasty – fotosyntéza (len u rastlín a rias)
  - Endoplazmatické retikulum (ER) – hladké (lipidy, detox) a hrubé (proteíny)
  - Golgiho aparát – triedenie a sekrécia proteínov
  - Lyzozómy – intracelulárne trávenie (hydrolytické enzýmy)
  - Vakuoly – rastlinné (centrálna vakuola), kontraktilné (prvoky)
- **Ribozómy 80S** (cytoplazmatické); 70S v mitochondriách a chloroplastoch
- **Bunková stena:** rastliny (celulóza), huby (chitín), živočíchy (NEMAJÚ)
- **Zástupcovia:** rastliny, živočíchy, huby, prvoky

## Endosymbiotická teória
Mitochondrie a chloroplasty vznikli z pohltenej baktérie, s ktorou ancestrálna eukaryota vstúpila do **symbiózy** (Lynn Margulis, 1967). Dôkazy: vlastná DNA, 70S ribozómy, dvojitá membrána.`,

"22-2":`## Stavba hmyzu
Hmyz (Insecta) je najpočetnejšia skupina živočíchov (~1 milión popísaných druhov).
Telo: **3 časti** – **hlava** (mozog, 1 pár tykadiel, zložené oči, ústne ústrojenstvo) + **hruď (thorax)** (3 páry nôh, 1–2 páry krídiel) + **brucho (abdomen)** (trávenie, rozmnožovanie, vylučovanie – Malpighiho trubice).
Exoskeleton z chitínu; dýchanie: **vzdušnicová sústava (tracheae)** – vzduch ide priamo k tkanivám.

## Typy vývoja (premeny)
**Úplná premena (holometabólia):** vajce → **larva** (húsenica/červ – aktívne žerie, rastie) → **kukla** (metamorfóza, nepríjme potravu) → **imago** (dospelec, rozmnožovanie)
→ Motýle, chrobáky, muchy, včely, mravce, osi, komáre

**Neúplná premena (hemimetabólia):** vajce → **nymfa** (podobná dospelcovi, ale bez krídiel; niekoľko línianí) → **imago**
→ Kobylky, vši, šváby, teplomery, cvrčky

## Ekologický a hospodársky význam
- **Opeľovanie** – včely, motýle, chrobáky; nevyhnutné pre produkciu potravín
- **Škodcovia** – kobylky (záplavy), vaošky (podkôrne), vrtivce (ovocné stromy)
- **Vektory chorôb** – komáre (malária, horúčka dengue), vši (týfus)
- **Produkcia** – med, vosk, hodváb (*Bombyx mori*), šelak
- **Biológia pôdy** – mravce a termity aerujú a obohacujú pôdu

## Na maturite sa pýtajú
Rozdiely holometabólia vs. hemimetabólia s príkladmi, stavba hmyzieho tela, vzdušnicové dýchanie (prečo limituje veľkosť hmyzu).`,

"23-0":`## Kľúčové osobnosti biológie

- **Aristoteles** (384–322 p. n. l.) – prvý systematik živočíchov; „otec biológie"
- **William Harvey** (1628) – objav krvného obehu (srdce ako pumpa)
- **Anton van Leeuwenhoek** (17. stor.) – zdokonalil mikroskop, objavil baktérie, prvoky, spermie
- **Carl Linné (Linnaeus)** (1707–1778) – **binomická nomenklatúra** (rod + druh); *Systema Naturae*
- **Robert Hooke** (1665) – popis bunkovej steny korkového tkaniva; zaviedol pojem **„bunka"**
- **Matthias Schleiden** (1838) + **Theodor Schwann** (1839) – bunková teória (rastliny + živočíchy)
- **Rudolf Virchow** (1858) – *Omnis cellula e cellula*
- **Charles Darwin** (1859) – teória evolúcie prírodným výberom; *O pôvode druhov*
- **Alfred Russel Wallace** – súčasne a nezávisle navrhol prírodný výber
- **Gregor Johann Mendel** (1866) – zákony dedičnosti; hrachu
- **Louis Pasteur** (19. stor.) – likvidácia teórie spontánnej generácie (labúťa bania); vakcinácia (antrax, besnota); pasterizácia
- **Robert Koch** – identifikácia *M. tuberculosis* a *Vibrio cholerae*; **Kochove postuláty** (kritériá pre patogén)
- **James Watson + Francis Crick** (1953) – dvojitá špirálovitá štruktúra DNA; **Rosalind Franklin** (RTG difrakčný snímok DNA – kľúčový podklad)
- **Alexander Fleming** (1928) – náhodný objav **penicilínu** (*Penicillium notatum*)

## Na maturite sa pýtajú
Mená a objavy v správnom kontexte, Darwin vs. Lamarck (prírodný výber vs. dedenie získaných vlastností), Mendel a rok 1866.`,

"23-1":`## DNA – stavba a vlastnosti
**DNA (deoxyribonukleová kyselina)** nesie genetickú informáciu.
- **Nukleotid** = deoxyribóza + fosfátová skupina + dusíkatá báza (A, T, G alebo C)
- **Dvojitá špirálovitá štruktúra** (Watson & Crick, 1953): 2 antiparalelné polynukleotidové reťazce + vodíkové väzby medzi bazami
- **Komplementárne páry:** A=T (2 vodíkové väzby), G≡C (3 vodíkové väzby)
- **Replikácia DNA** – semikonzervatívna: helikáza rozbalí špirálu; DNA polymeráza syntetizuje nové vlákna na templátovom; každá dcérska DNA má 1 stará + 1 nová vlákno

## RNA – typy a funkcie
**RNA (ribonukleová kyselina)** – jednovláknová; ribóza (nie deoxyribóza); **uracil (U)** namiesto tymínu.
- **mRNA (messenger)** – nesie kópiu informácie z DNA k ribozómom (templát pre transláciu)
- **tRNA (transfer)** – prenáša špecifickú aminokyselinu k ribozómu; obsahuje **antikodon** (komplementárny ku kodónu na mRNA)
- **rRNA (ribozomálna)** – stavebná a katalytická zložka ribozómov

## Tok genetickej informácie – centrálna dogma
**DNA → (transkripcia) → mRNA → (translácia) → proteín**
Transkripcia (v jadre): RNA polymeráza číta templátové vlákno DNA a syntetizuje mRNA.
Translácia (na ribozómoch): mRNA + tRNA → reťazec aminokyselín → proteín.

## Na maturite sa pýtajú
Stavba nukleotidu, komplementárne páry, semikonzervatívna replikácia, rozdiely DNA vs. RNA, typy RNA a ich funkcie.`,

"23-2":`## Funkcie koreňa
Príjem vody a minerálov, ukotvenie rastliny, zásobovanie (škrob, cukor), vegetatívne rozmnožovanie.

## Pásma koreňa (od vrcholu smerom nahor)
1. **Koreňová čiapočka (calyptra)** – chráni vrcholový meristém pred poškodením pri rastu pôdou; bunky sa neustále obnovia
2. **Deliace pásmo (meristém)** – aktívne mitózy; tvorba nových buniek
3. **Elongačné (predlžovacie) pásmo** – bunky sa predlžujú → koreň rastie do dĺžky
4. **Absorbčné pásmo** – **koreňové vlášenie** (dlhé výbežky epidermálnych buniek) → maximálna plocha pre absorpciu vody a minerálov
5. **Pásmo bočných koreňov** – starší úsek; vytváranie bočných (laterálnych) koreňov

## Typy koreňov
- **Kôlový (pivotový)** – hrubý hlavný + tenké bočné; typický pre dvojklíčnolistové (mrkva, repa)
- **Vláknitý** – spleť rovnako hrubých koreňov; jednoklíčnolistové (trávy)
- **Špeciálne:** vzdušné (orchidey, brečtan), dychové/vzdušné (mangrovníky – vyčnievajú z vody pre O₂), zásobné (mrkva, cukrová repa), haustória (parazitické rastliny – imelo), prísavky (viniča)

## Na maturite sa pýtajú
Nakresliť a popísať pásma koreňa, funkcia koreňovej čiapočky, rozdiely typov koreňov, príklady špeciálnych koreňov.`,

"24-0":`## Evolúcia vylučovacích orgánov
**Vylučovanie** = odstraňovanie metabolických odpadov (amoniak, urea, kyselina močová, CO₂, H₂O).

- **Jednobunkovce:** kontraktilná vakuola (osmóza), odpad difunduje cez membránu
- **Pŕhlivce:** difúzia a osmóza cez celý povrch
- **Ploskavce:** **protonefrídie** (plameňové bunky) – najjednoduchší vylučovací orgán; ciliované bunky hnajú tekutinu do kanálika
- **Obrúčavce (žížaly):** **metanefrídie** – trubičky s lievikovitým vstupom; efektívnejšie ako protonefrídie; konečný exkrét = amoniak alebo urea
- **Článkonožce – suchozemské:** **Malpighiho trubice** – vstupujú do tráviaceho traktu; vylučujú **kyselinu močovú** (tuhá, pasty → úspora vody – adaptácia na súš); morské kôrovce: zelené žľazy (anténálne)
- **Ryby:**
  - Sladkovodné: hyperosmotické voči vode → neustále vstupuje voda → obličky tvoria veľké množstvo zriedeného moča; exkrét = amoniak
  - Morské: strácajú vodu → tvoria málo koncentrovaného moča; exkrét = trimetylamín a iné
- **Obojživelníky:** mezonefros; exkrét = **urea** (menej toxická ako amoniak, nevyžaduje toľko vody)
- **Plazy a vtáky:** metanefros; exkrét = **kyselina močová** (nerozpustná, tuhá → minimálna strata vody; biela zložka trusu vtákov)
- **Cicavce:** metanefros s dobre vyvinutými nefrónmi; exkrét = **urea** (moč)

## Kľúčový trend
Prechod z amoniaku (toxický, potrebuje vodu) → urea (menej toxická) → kyselina močová (najmenej toxická, tuhá) = adaptácia na suchozemský život.`,

"24-1":`## Základná štruktúra
**Potravový reťazec** je lineárna séria, ktorá znázorňuje tok energie a látok medzi organizmami prostredníctvom stravy.

## Typy organizmov v reťazci
- **Producenti (autotrofi)** – zelené rastliny, riasy, sinice → 1. trofická úroveň; viažu slnečnú energiu fotosyntézou
- **Primárni konzumenti (herbivory)** – slimáky, hmyz, zajace, kravy → 2. trofická úroveň
- **Sekundárni konzumenti (malé karnivory)** – líška, žaba, drozd → 3. trofická úroveň
- **Terciárni konzumenti (top predátori)** – orol, vlk, veľké žraloky → 4.–5. trofická úroveň
- **Dekompozitery (saprofyty)** – huby, baktérie → rozkladajú mŕtvu organiku → minerálne látky späť do pôdy

## Potravová sieť
V prírode sú reťazce prepletené → **potravová sieť** (jeden druh môže konzumovať viacero zdrojov a sám byť konzumovaný viacerými druhmi). Stabilnejšia ako lineárny reťazec.

## Pravidlo 10 % (energetická pyramída)
Pri každom prechode na ďalší trofický stupeň sa prenesie len **~10 % energie** (90 % sa stráca ako teplo, pohyb, výkaly). Preto pyramída biomasy a energie je vždy užšia smerom nahor.

## Bioakumulácia
Niektoré látky (DDT, ťažké kovy, PCB) sa hromadia v telách → na vrchole reťazca je ich koncentrácia **10 000 až 100 000-násobne** vyššia ako v prostredí (biomagnifikácia).

## Na maturite sa pýtajú
Nakresliť a popísať potravový reťazec, vysvetliť pravidlo 10%, čo je bioakumulácia a prečo je nebezpečná.`,

"24-2":`## Čo sú škrobové zrná
**Škrobové zrná** sú zásobné polysacharidové granule uložené v **amyloplastoch** (zásobné leukoplasty) v rastlinných bunkách.

## Výskyt
Zemiakové hľuzy, obilniny (pšenica, ryža, kukurica), strukoviny, zeler, šípky.

## Pomôcky a postup
Zemiak (hľuza), mikroskop, podložné + krycie sklíčko, **Lugolovo činidlo** (roztok KI + I₂ – typická tmavomodrá/čierna reakcia so škrobom – dôkazová reakcia!).
1. Urobiť tenký rez zemiaka alebo oškrabovať povrch na sklíčko
2. Umiestniť na sklíčko do kvapky vody
3. Pridať **kvapku Lugolového roztoku** → okamžite zmení farbu
4. Zakryť krycím sklíčkom
5. Pozorovať pri 200–400×

## Čo vidíme
- Vajcovité až oválne granule sfarbené **tmavomodro až čierno** (Lugolov test)
- Viditeľné **hilum** – centrum granule (bod, kde začal rast)
- Koncentrické **lamely** (vrstvy) okolo hila – rastové vrstvy
- Typy: jednoduché (1 hilum), **zložené** (viac hil – zemiak!), polojednoduché

## Záver
Škrob = hlavná zásobná látka rastlín; v živočíchoch je zásobnou látkou glykogén. Lugolov test = jednoduchý chemický dôkaz prítomnosti škrobu v potravine.`,

"25-0":`## Stavba dýchacej sústavy
- **Nosná dutina:** filtrácia (riasinkový epitel, hlien), ohrev a zvlhčenie vzduchu; čuchové receptory
- **Hltan (pharynx)** – kríženie tráviacej a dýchacej sústavy
- **Hrtan (larynx)** – **hlasivky** (tvorba hlasu), **epiglottis** (zabraňuje vdýchnutiu potravy pri prehĺtaní)
- **Priedušnica (trachea)** – chrupkové podkovovité krúžky (zabraňujú kolapsu); riasinkový + pohárnikovitý epitel
- **Priedušky (bronchi)** – pravá + ľavá → sekundárne → terciárne → bronchioly → terminálne bronchioly → **alveolárne vačky**
- **Pľúca (pulmones)** – pravé (3 laloky), ľavé (2 laloky); obalené **pleurou** (dvojitá blana; pleurálna dutina s tekutinou)
- **Alveoly** – 700 mil. váčkov s celkovou plochou ~70 m²; stena = 1 vrstva pneumocytov + kapiláry → difúzia O₂ do krvi, CO₂ von

## Mechanika dýchania
- **Nádych (inspirácia):** bránica sa stiahne a splošťuje, medzirebrové svaly zdvihnú rebrá → hrudník sa roztiahne → pľúca sa nafúknu (podtlak)
- **Výdych (exspirácia):** bránica a svaly relaxujú → hrudník sa zmenší → vzduch vytlačený von (väčšinou pasívny)

## Riadenie dýchania
**Dýchacie centrum** v predĺženej mieche; senzory na CO₂ v krvi → zvýšenie CO₂ → rýchlejšie dýchanie (NIE na pokles O₂).

## Choroby
Astma (bronchospazmus), CHOCHP (emfyzém, bronchitída), zápal pľúc (pneumónia), TBC (*M. tuberculosis*), rakovina pľúc (85% = fajčenie).

## Na maturite sa pýtajú
Cesta vzduchu (nosa → alveoly), riadenie dýchania (CO₂), porovnanie dýchacieho povrchu vtákov a cicavcov, dychové objemy.`,

"25-1":`## Čo je populácia
**Populácia** = súbor jedincov toho istého biologického druhu, žijúcich na rovnakom území v rovnakom čase, ktorí sa môžu vzájomne rozmnožovať a sú od seba relatívne izolovaní.

## Charakteristiky populácie
- **Početnosť** – celkový počet jedincov
- **Hustota** – počet jedincov na jednotku plochy (napr. ind./km²)
- **Veková štruktúra** – podiel rôznych vekových skupín; pyramída veku: rozrastajúca (základ širší) vs. stabilná vs. zanikajúca
- **Pohlavná štruktúra** – pomer samcov a samíc
- **Pôrodnosť (natalita)** a **Úmrtnosť (mortalita)** – určujú smer zmeny populácie
- **Migrácia** – imigrácia (prísun) vs. emigrácia (odchod)

## Rast populácie
- **Exponenciálny rast (J-krivka)** – pri neobmedzených zdrojoch; dN/dt = rN
- **Logistický rast (S-krivka)** – realistickejší; limitovaný **nosnou kapacitou prostredia (K)**: dN/dt = rN(K−N)/K
- **K** = maximálny počet jedincov, ktorý môže prostredie dlhodobo uživiť

## Regulácia počtu
- **Hustotne závislá regulácia** – silnejšia pri veľkej populácii: predácia, parazitizmus, choroby, kompeícia o potravu
- **Hustotne nezávislá regulácia** – klimatické pohromy, požiare, záplavy (nezávisí od hustoty)

## Na maturite sa pýtajú
Nakresliť a vysvetliť J-krivku vs. S-krivku, definovať nosnú kapacitu K, rozdiely hustotne závislej vs. nezávislej regulácie.`,

"25-2":`## Hlavné triedy stavovcov a ich znaky

**Ryby (Pisces):**
Vodné, žiabre, plutvy, šupiny, chladnokrvné, vonkajšie oplodnenie (väčšina); bočná čiara.

**Obojživelníky (Amphibia):**
Holá vlhká koža (kožné dýchanie!), pľúca u dospelcov, 4 končatiny, vajce do vody, larva s žiabrami → metamorfóza, chladnokrvné.

**Plazy (Reptilia):**
Šupiny alebo štítky z rohoviny, suché vajce s blanou na súši (amniotické vajce – revolúcia!), pľúca, chladnokrvné.

**Vtáky (Aves):**
Perie, zobák, 2 krídla + 2 nohy, teplokrvné, vajíčka s tvrdou vápenatou škrupinou, vzduchové vaky.

**Cicavce (Mammalia):**
Srsť/vlasy, mliečne žľazy (laktácia), živorodosť (+ vajcorodé: vtákopysk), teplokrvné, placenta (u väčšiny), diferencované zuby.

## Postup určovania
1. Zistiť: je pokryté srsťou? perím? šupinami? Má plutvy alebo nohy?
2. Zaradiť do triedy podľa kľúčových znakov
3. Použiť kľúč pre danú triedu (napr. pre vtáky: tvar zobáka – kruté = dravec, ploché = kačica, dlhé tenké = brodiaci; farba, biotop)
4. Overiť v atlase stavozcov

## Záver
Najčastejšia zámena: reptilia vs. obojživelníky (šupiny vs. holá koža) a vtáky vs. netopier (obe lietajú, ale netopier = cicavec s kožatými krídlami).`,

"26-0":`## Typy receptorov podľa podnetu
- **Fotoreceptory** – svetlo (tyčinky a čapíky oka)
- **Mechanoreceptory** – tlak, zvuk, vibrácie, pohyb (ucho, hmat, bočná čiara rýb)
- **Chemoreceptory** – chemické látky (čuch, chuť)
- **Termoreceptory** – teplota (kožné receptory, tepelné orgány hadov)
- **Nocireceptory** – bolestivé podnety (voľné nervové zakončenia)
- **Elektroreceptory** – elektrické polia (žraloky, *Electrophorus electricus*)
- **Magnetoreceptory** – zemské magnetické pole (migrácia vtákov, rýb, včely)

## Evolúcia zmyslových orgánov
- Jednobunkovce: fotosenzitívna **stigma** (ocelot) u *Euglena*
- Pŕhlivce: jednoduché svetlocitlivé bunky
- Ploskavce: **oceloty** (jamkovité oči)
- Hlístovce: chemoreceptory na ústach
- Mäkkýše: od jamkovitého oka (slimák) po **komorové oko** (chobotnica) – nezávislý evolučný vývoj podobný oku stavovcov!
- Hmyz: **fazetové (zložené) oči** – každá fasetka vníma malý výsek; vysoká frekvencia obrázkov (dobre vnímajú pohyb); UV videnie
- Stavovce: **komorové oko** (rohovka + šošovka + sietnica); vnútorné ucho (kochlea pre zvuk + vestibulárny aparát pre rovnováhu)

## Bočná čiara rýb
Rada **mechanoreceptorov** v kanálikoch pozdĺž tela → vnímanie tlakových zmien a vibrácií vody → detekcia predátorov, koristi, orientácia v skupinách.

## Na maturite sa pýtajú
Rozdiely fazetové vs. komorové oko, bočná čiara, elektroreceptory žralokov, evolučný rad zmyslových orgánov.`,

"26-1":`## Znečistenie ovzdušia
- **SO₂ a NOₓ** → reakcia s vodnou parou → **kyslé dažde** (pH < 5,6) → poškodenie lesov, kyslenie jazier, korózia
- **Skleníkové plyny** (CO₂, CH₄, N₂O) → globálne otepľovanie (→ Zadanie 21)
- **CFC (freóny)** → rozklad ozónu → **ozónová diera** → zvýšené UV-B žiarenie → rakovina kože (melanóm), katarakta, poškodenie planktónu
- **Tuhé časticové látky (PM2.5, PM10)** – dýchacie problémy, kardiovaskulárne choroby
- Montrealský protokol (1987) – globálny zákaz CFC → ozónová vrstva sa pomaly obnovuje

## Znečistenie vôd
- **Eutrofizácia** – nadmerné hnojivá/odpadové vody → explózia riasného a sinicového rastu → spotrebovanie O₂ → úhyn rýb
- **Priemyselné toxíny** – ťažké kovy (Hg, Pb, Cd), PCB, pesticídy → bioakumulácia
- **Plastové znečistenie** – microplastics v potrave, v organizmoch

## Odlesňovanie (deforestácia)
Strata biotopov (hlavná príčina vyhynutí), erőzia pôdy, zmena mikroklímy, menej CO₂ pohltenia, ničenie tradičných kultúr.

## Dezertifikácia
Rozširovanie púšti (sucho + zlé poľnohospodárske praktiky + odlesňovanie) → strata produkcie potravín.

## Strata biodiverzity – 5 hlavných príčin (HIPPO)
**H** – Habitat loss; **I** – Invasive species; **P** – Pollution; **P** – Population growth (human); **O** – Overharvesting.`,

"26-2":`## Základné skupiny živín a ich funkcie

**Sacharidy (40–55% energie):** primárny zdroj energie (1 g = 4 kcal); glukóza pre bunkovú dýchanie, laktóza v mlieku, vláknina (nestráviteľná → peristaltika, prevencia rakoviny hrubého čreva). Zdroje: obilniny, zelenina, ovocie, strukoviny. Obmedzovať: cukry a sladkosti.

**Tuky (25–35% energie):** 1 g = 9 kcal; stavba membrán, vitamíny rozpustné v tuku (A, D, E, K), hormóny, tepelná izolácia. **Nenasýtené** (olivový olej, ryby – prospešné) vs. **nasýtené** (červené mäso, maslo – s mierou) vs. trans-tuky (škodlivé).

**Bielkoviny (10–20% energie):** enzýmy, hormóny, protilátky, stavba tkanív; **esenciálne aminokyseliny** (9 z 20 musíme prijať z potravy: mäso, vajcia, mliečne výrobky = kompletné proteíny; strukoviny + obilniny = neúplné, ale spolu kompletné).

**Vitamíny:** organické mikronutrienty; vo vode rozpustné (B, C – denná potreba) vs. v tuku rozpustné (A, D, E, K – zásoby). Nedostatok → avitaminózy (C → skorbut, D → krivica, B₁ → beri-beri).

**Minerálne látky:** Ca (kosti, zuby), Fe (hemoglobín), I (tyroxín), Na/K (osmóza, nervový impulz), Zn, Mg.

**Voda:** ~2–3 l/deň; rozpúšťadlo, termoregulácia, transport.

## Odporúčania (WHO)
Pestrá strava, 5 porcií zeleniny a ovocia/deň, obmedziť soľ (<5 g/deň), cukry (<10% energie), tuk – kvalita dôležitejšia ako množstvo.`,

"27-0":`## Čo sú výtrusné rastliny
**Výtrusné rastliny (Pteridophyta)** sa rozmnožujú **výtrusmi (sporami)**, nie semenami. Majú pravé korene, stonky a listy (na rozdiel od machorastov), ale **bez semien**.

## Paprade (Filicopsida) – najpočetnejšia skupina
- Veľké listy = **vaje (fronds)** – stočené v púčiku (circinátny vývoj)
- Na spodnej strane vají sú **výtrusnice (sporangiá)** zoskupené do kupičiek (**sori**)
- **Životný cyklus:** sporofyt (2n, dominantný) → výtrusy (n) → prvolisty (gametofyt, srdcovitý, n) → gamety → oplodnenie (vyžaduje vodu!) → sporofyt
- Príklady: *Dryopteris filix-mas* (papraď samcová), *Asplenium* (sleziník), *Pteridium* (papraďovec)

## Prasličky (Equisetopsida)
- Článkovaná dutá stonka; listy redukované na šupiny pri uzloch; chlorofyl v stonke
- *Equisetum arvense* (prasička roľná) – burinný druh; liečivé využitie (kremičité zlúčeniny)
- V paleozoiku: prasličky boli stromy (Calamites, 30 m!) → dnes ložiská uhlia

## Lykovce (Lycopodiopsida)
- Malé, s malými šupinovitými listami (mikrofilmi)
- *Lycopodium* (lykovce), *Selaginella*

## Ekologický a hospodársky význam
Tvorba **uhlia** (fosiliizované pozostatky paleozoických výtrusných drevín – bohatých na uhlík). Paprade ako dekoratívne a liečivé rastliny.

## Na maturite sa pýtajú
Rozdiely papraď-prasička-lykovce, schéma životného cyklu paprade (alternácia generácií), prečo potrebujú vodu na oplodnenie.`,

"27-1":`## Vtáky (Aves)
**Adaptácie na let:**
- **Perie** – tepelná izolácia (páperovité) + aerodynamická funkcia (letové)
- **Duté kosti** – znižujú hmotnosť
- **Vzduchové vaky** (9 ks) – zásobník vzduchu, jednosmerný tok cez pľúca → extrémne efektívné dýchanie pri lete
- **Silné hrudné svaly** (pectoralis major – až 25% hmotnosti), **kýl na hrudi** (hrebeň hrudnej kosti – úpon svalov)
- **Zobák bez zubov** – ľahší (zuby nahradza zob a svalník)
- **Endotermné** (teplokrvné); vyššia teplota (39–42°C)
- Vajíčka s tvrdou vápenatou škrupinou; rodičovská starostlivosť

## Cicavce (Mammalia)
**Typické znaky:**
- **Srsť/vlasy** – tepelná izolácia
- **Mliečne žľazy** – laktácia; mláďatá živené mliekom
- **Diferenciované zuby** – sekáče, špičáky, predstoličky, stoličky (adaptácia na typ potravy)
- **Endotermné** (teplokrvné, 36–38°C)
- **Veľký mozog** – najvyvinutejšia mozgová kôra

**Typy cicavcov:**
- *Vajcorodé (Monotremata):* **vtákopysk**, ježura – kladú vajíčka, mliečne žľazy bez bradaviek
- *Vačkovce (Marsupialia):* **klokan**, koala, opčum – krátka gravidita, vývoj v vačku
- *Placentovce (Placentalia):* väčšina cicavcov; dlhá gravidita, dobre vyvinuté mláďa

## Na maturite sa pýtajú
Adaptácie vtákov na let (aspoň 5), rozdiely troch skupín cicavcov (rozmnožovanie), vtákopysk = cicavec prečo (mliečne žľazy, srsť).`,

"27-2":`## Čo je zrenicový reflex
**Zrenicový (pupilárny) reflex** = mimovoľné zúženie (**mioza**) alebo rozšírenie (**mydriáza**) zrenice v reakcii na zmenu intenzity svetla. Chráni sietnicu pred preexponovaním.

## Anatomia
- **Zrenica** – otvor v dúhovke (iris), cez ktorý vstupuje svetlo do oka
- **Dúhovka** – pigmentovaná; obsahuje 2 skupiny hladkých svalov:
  - **Zvierač zrenice (m. sphincter pupillae)** → mióza (zužuje zrenicu)
  - **Rozširovač zrenice (m. dilator pupillae)** → mydriáza (rozširuje zrenicu)

## Neurálna dráha reflexu
1. Svetlo na sietnicu → signál cez **zrakový nerv (n. opticus, II.)** do pretektálneho jadra stredného mozgu
2. Z pretektálneho jadra → **okulomotorický nerv (n. oculomotorius, III.)** → **zvierač zrenice**
3. Zrenica sa **zúži** (mióza) – reflex trvá ~200–300 ms

**Konsenzuálny reflex:** pri osvetlení jedného oka sa zúži **aj druhé** (pretektálne jadro posiela signál bilaterálne) → dôležitý neurologický test!

## Postup
1. Vstúpiť do tmavej miestnosti alebo zakryť oči na 30 sekúnd (zrenica sa rozšíri)
2. Svietiť baterkou do oka z boku → pozorovať rýchlu miózu
3. Zaznačiť čas reakcie a symetriu oboch zreníc
4. Opakovať pre obe oči a porovnať

## Záver
Normálna reakcia = rýchla, symetrická mióza v oboch očiach. Asymetria, pomalá reakcia alebo absencia reflexu naznačuje poranenie zrakového alebo okulomotorického nervu (neurologický test pri úrazoch).`,

"28-0":`## Zrak – oko
- **Rohovka** → **šošovka** (zaostrenie; akomodácia = zmena tvaru šošovky) → **sklovec** → **sietnica (retina)**
- Sietnica: **tyčinky** (čiernobiely videnie, periférne, tma) + **čapíky** (farebné videnie, červená/zelená/modrá, ostrý stred)
- **Žltá škvrna (macula lutea)** – miesto najostrejšieho videnia (len čapíky)
- **Slepá škvrna** – výstup zrakového nervu (bez receptorov)
- **Vady:** krátkozrakosť (myopia – dlhé oko, korekcia: rozptylka), ďalekozrakosť (hyperopia – krátke oko, korekcia: konvexná šošovka), astigmatizmus (nepravidelná rohovka), šedý zákal (katarakta – zákal šošovky), zelený zákal (glaukóm – ↑tlak v oku)

## Sluch a rovnováha – ucho
- **Vonkajšie ucho:** ušnica + vonkajší zvukovod → **bubienok**
- **Stredné ucho:** 3 kostičky (**kladivko → nákova → strmienok**) prenášajú vibrácie; Eustachova trubica (vyrovnávanie tlaku)
- **Vnútorné ucho:** **kochlea (slimák)** – Cortiho orgán s vláskovými bunkami → prevod na nervový signál; **vestibulárny aparát** – 3 polkruhové kanáliky (rotácia) + utriculus + sacculus (smer gravitácie) → rovnováha

## Čuch a chuť
**Čuch:** čuchový epitel v nosnej dutine (čuchové bunky) → čuchový nerv (I.) → limbický systém (emócie, pamäť). ~10 000 rôznych vôní.
**Chuť:** chuťové poháriky na jazyku → 5 základných chutí (→ Zadanie 6).

## Hmat
Meissnerove telieska (jemný dotyk), Paciniho telieska (tlak, vibrácie), Ruffiniho (ťah, teplo), Krkusove (chlad), voľné zakončenia (bolesť).`,

"28-1":`## Čo je etológia
**Etológia** = veda o správaní živočíchov v ich prirodzenom prostredí. Zakladatelia: **Konrad Lorenz** (vtlach), **Nikolaas Tinbergen** (4 otázky etológie), **Karl von Frisch** (tanec včiel) → **Nobelova cena 1973**.

## Vrodené (inštinktívne) správanie
- **Reflexy** – jednoduché, automatické (koleno-reflex, stiahnutie ruky od horúceho)
- **Taxie** – pohyb smerom k/od podnetu: fototaxia (k svetlu), chemotaxia, geotaxia
- **Fixná akčná vzorka (FAP)** – komplexné vrodené správanie spustené kľúčovým stimulom (napr. rodič začne kŕmiť, keď vidí červené škvrny na zobáku mláďaťa rybárika)
- **Vtlach (imprinting)** – rýchle učenie v **senzitívnom (kritickom) období** (kačiatká nasledujú prvý pohyblivý objekt → Lorenz); ireverzibilné

## Naučené správanie
- **Habituácia** – prestávanie reagovať na opakovaný podnet bez následkov (najjednoduchšie učenie)
- **Klasické podmieňovanie** (**Pavlov**) – neutral stimulus + nepodmienená reakcia → podmienený reflex (pes/zvonec/slina)
- **Operantné podmieňovanie** (**Skinner**) – správanie zosilnené (odmena) alebo potlačené (trest)
- **Riešenie problémov (insight/vhľad)** – kognitívne; primáty, vrany (schopnosť používať nástroje)

## Sociálne správanie
- Hierarchia dominancie (alfa samec/samica)
- Komunikácia: zvuky, feromóny, vizuálne signály, **tanec včiel (von Frisch)** – kruhový (blízko) a vagový (smer + vzdialenosť)
- **Altruizmus** – pomoc iným; kin selection – pomáhanie príbuzným → šírenie vlastných génov (Hamilton)`,

"28-2":`## Hemofília – porucha zrážania krvi
**Hemofília A** = deficit koagulačného **faktora VIII** (gén F8 na chromozóme X)
**Hemofília B** = deficit faktora **IX** (Christmas disease; gén F9)
- Dedičnosť: **X-viazaná recesívna** (→ viď Zadanie 21)
- Postihnutí: väčšinou **muži**; ženy sú nosiče
- Príznaky: predĺžené krvácanie po poraneniach, spontánne krvácanie do kĺbov (hemartróza), svaly, vnútorné orgány
- Liečba: infúzie chýbajúceho faktora, genová terapia
- Historický príklad: kráľovná Viktória bola nosičkou; hemofília sa rozšírila do európskych kráľovských rodín (Španielsko, Rusko – cárevič Aleksej)

## Daltonizmus (farbosleposť)
Neschopnosť rozlíšiť určité farby – najčastejšie **červenú a zelenú** (trichromatická/dichromatická porucha).
- Gény pre **červené (OPN1LW)** a **zelené (OPN1MW)** čapíkové receptory sú na chromozóme **X**
- **X-viazané recesívne** → postihnutých **muži ~8 %**, ženy ~0,4 %
- Diagnostika: **Ishiharov farebný test** (čísla v bodkovaných kruhoch)
- Ľudia s daltonizmom môžu mať problém s rozlišovaním dopravných svetiel, zrelosti ovocia

## Na maturite sa pýtajú
Pravdepodobnosť hemofílie a daltonizmu v potomstve (genetická úloha), prečo sú postihnutí hlavne muži, čo je nosička.`,

"29-0":`## Čo sú machorasty
**Machorasty (Bryophyta)** sú nižšie suchozemské rastliny bez pravých cievnych tkanív (xylém, floém).
- Bez pravých koreňov → príjem vody cez **rizoidy** (vláskovité výbežky)
- Rastú na vlhkých miestach (voda potrebná na oplodnenie – spermie musia plávať)
- Zástupcovia: **rašelinník (*Sphagnum*)**, plahtovník (*Marchantia*), steblomach, rohomach

## Rodozmena u machorastov – gametofyt dominuje!
- **Gametofyt (n) = dominantná, zelená rastlinka:**
  - Haploidné telo; vykonáva fotosyntézu; žije samostatne
  - Produkuje gamety: **archegóniá** (♀ – vajíčko) a **anterídiá** (♂ – spermie s bičíkmi)
  - Spermie potrebujú vodu (kvapky dažďa) na doplavanie k vajíčku → oplodnenie
- **Sporofyt (2n) = závislá fáza (parazituje na gametofyte):**
  - Diploidné telo = **sporogón** (stopka + tobolka s výtrusmi)
  - Meióza → výtrusy (n) → klíčia → nový gametofyt

**Porovnanie s papraďou:** u paprade je dominantný sporofyt (2n); u machorastov gametofyt (n).

## Ekologický význam rašelinníkov
- **Rašeliniská** = obrovská zásobáreň uhlíka (sekvestrácia CO₂); celkovo viac CO₂ ako v lesoch!
- Rašelina zadržiava vodu × objem (špongiová štruktúra) → regulácia odtoku
- Palivo, substrat v záhradníctve, historická konzervácia (rašelinoví muži)

## Na maturite sa pýtajú
Porovnanie makrorastov a papradí (čo je dominantná generácia), stavba sporofytu machorastov, prečo potrebujú vodu, ekologická funkcia rašelinísk.`,

"29-1":`## Hubky (Porifera)
**Najjednoduchšie mnohobunkové živočíchy** – bez tkanív a orgánov.
- **Kanálová sústava:** voda vstupuje cez **póry** (ostia) do centrálnej dutiny (spongocoel) → von cez **osculum**
- **Choanocyty** (límcové bunky s bičíkmi) – hnajú vodu + zachytávajú potravu (filtrácia); trávenie **intracelulárne**
- Kostra: **spongín** (proteín) alebo kremičité/vápennaté **spikuly** (ihlice)
- Vodné – morské (väčšina) aj sladkovodné; prichytené k substrátu (sedentárne)
- Historické využitie: priemyselné špongie (*Spongia officinalis*)

## Pŕhlivce (Cnidaria)
- **Radiálna symetria** (ako hviezdica, kruh)
- **Diploblatické** – 2 zárodočné listy (ektoderm, entoderm); medzi nimi mesogleia
- **Žihavé bunky (cnidocyty/nematocysty)** – unikát Cnidaria; výboj paralyzuje korisť
- **Gastrovaskulárna dutina** – 1 otvor = ústa aj riť; trávenie čiastočne extracelulárne
- **Polymorfizmus:** **polyp** (prichytený, trubicovitý: *Hydra*, koráli, sasanky) ↔ **medúza** (voľnoplávajúca, dáždnikový tvar)
- Príklady: *Hydra* (sladká voda), medúzy (morská žihľava), koráli (vápenaté kostry → útesy), Sifonofóry (*Physalia* – vojnová loď)

## Nepŕhlivce (Ctenophora)
- **Radiálna symetria**; 8 radov **hrebeňových doštičiek** (ciliárnych) → pohyb; bioluminiscencia
- Bez nematocyst – lovia lepkavými tentalami
- Výlučne morské; predátory zooplanktónu; napr. *Pleurobrachia* (morské egreše)`,

"29-2":`## Srdce a obehy – krátke zhrnutie
(Základy → Zadanie 17; tu dôraz na choroby)
Ľavá komora → aorta → telo → vena cava → pravá predsieň (veľký obeh)
Pravá komora → pľúcnica → pľúca → pľúcne žily → ľavá predsieň (malý obeh)

## Najčastejšie kardiovaskulárne choroby

**Ateroskleróza:**
Ateromatózne plaky (cholesterol + Ca + zápal) v stene tepien → zúženie → ischémia (nedokrvenie). Rizikové faktory: fajčenie, DM, hypertenzia, obezita, nezdravá strava, fyzická neaktivita.

**Infarkt myokardu (srdcový infarkt – AIM):**
Uzatvorenie **koronárnej artérie** trombom → nekróza časti srdcového svalu. Príznaky: silná bolesť za hrudnou kosťou, vyžarujúca do ľavého ramena, čeľuste; studený pot; dýchavičnosť. Liečba: trombolýza, angioplastika so stentom, koronárny bypass.

**Mŕtvica (CMP – Cievna Mozgová Príhoda):**
Ischemická (trombóza/embólia cievy – ~85%) alebo hemoragická (prasknutie cievy). Trvalé neurologické poškodenie. FAST test: Face drooping, Arm weakness, Speech difficulty, Time to call.

**Hypertenzia** (→ Zadanie 9-2): dlhodobé poškodenie ciev, srdca, obličiek, mozgu.

**Srdcové zlyhanie:** srdce nedokáže prečerpávať dostatočné množstvo krvi → dýchavičnosť, opuchy.

## Prevencia
Zdravá strava (menej soli, tukov), pravidelné cvičenie, nefajčenie, kontrola TK a cholesterolu, zvládanie stresu.`,

"30-0":`## Čo sú vírusy
Vírusy sú **acellulárne (nebunkové)** infekčné agenty – stoja na hranici živého a neživého. Nemajú vlastný metabolizmus ani ribozómy → **obligátne intracelulárne parazity**.

## Stavba vírusu (virión)
- **Nukleová kyselina** – DNA **alebo** RNA (nikdy oboje); jedno- alebo dvojvláknová
- **Kapsida** – proteínový obal z opakujúcich sa podjednotiek (kapsomery); chráni NA a pomáha pri infekcii; tvary: ikozaédrický, helikálny, komplexný
- **Lipidový obal (envelope)** – u obalených vírusov (HIV, chrípka, SARS-CoV-2); pochádza z membrány hostiteľa; obsahuje glykoproteíny (hemaglutinín, spikes)
- **Bakteriofágy** – vírusy napádajúce baktérie; ikozaédrická hlavica + helikálny chvost

## Replikačný cyklus (litický)
1. **Adsorpcia** – pripojenie glykoproteinov na špecifický receptor hostiteľovej bunky
2. **Penetrácia** – vstup NA (alebo celého vírusu) do bunky
3. **Replikácia NA** a syntéza kapsidových proteínov (vírus využíva **ribozómy, enzýmy a ATP hostiteľa**)
4. **Montáž (assembly)** – skladanie nových viriónov
5. **Uvoľnenie** – lýzou bunky alebo pučaním (obalené vírusy)

**Lyzogénny cyklus:** vírusová DNA sa integruje do chromozómu hostiteľa ako **profág** (latentná infekcia); aktivuje sa neskôr (stres, UV).

## Príklady vírusov
DNA: herpes, adenovírus, variola (kiahne), HPV
RNA: **HIV** (AIDS), **SARS-CoV-2** (COVID-19), chrípka (influenza), poliomyelitída, hepatitída C, osýpky

## Protivirálna ochrana
Vakcinácia (profylaxia), interferóny (prirodzená obrany), protivirálne lieky (antiretrovírusová terapia pri HIV).`,

"30-1":`## Tok informácie – centrálna dogma
**DNA → (transkripcia) → mRNA → (translácia) → proteín**

## 1. Transkripcia (prepis) – v jadre
**RNA polymeráza** sa naviazaná na promótor génu; číta templátové vlákno DNA 3'→5' a syntetizuje mRNA 5'→3' (komplementárne, ale U namiesto T).
**Spracovanie mRNA u eukaryotov:**
- Pridanie **5'-čiapky** (methylguanozín) – ochrana a rozpoznanie ribozómom
- Pridanie **3'-polyA chvosta** – stabilizácia mRNA
- **Splicing** – odstránenie intrónov (nekódujúce úseky) a spojenie exónov → maturná mRNA

## 2. Translácia (preklad) – na ribozómoch (v cytoplazme)
- **Iniciácia:** malá podjednotka ribozómu + mRNA + iniciátorová tRNA (antikodon UAC, nesie Met → AUG je štartovací kodón)
- **Elongácia:**
  - tRNA s príslušným antikodonúm zaujme miesto A na ribozóme (komplementarné ku kodónu na mRNA)
  - **Peptidyltransferáza** (rRNA!) tvorí peptidovú väzbu medzi aminokyselinami
  - Ribozóm sa posunie (translokácia) o 1 kodón; prázdna tRNA odchádza z miesta E
- **Terminácia:** stopkodón (UAA, UAG, UGA) → release faktor → polypeptid sa uvoľní

## Posttranslačné úpravy
Skladanie (folding) do 3D štruktúry, glykozylácia, fosforylácia, odštiepenie signálneho peptidu, tvorba disulfidických mostíkov → **aktívny proteín**.

## Polyzómy
Viac ribozómov súčasne translatuje tú istú mRNA → efektívna produkcia proteínu.

## Na maturite sa pýtajú
Schéma proteosyntézy (transkripcia + translácia), kodón vs. antikodon, čo je splicing, 3 fázy translácie.`,

"30-2":`## Cieľ pozorovania
Rozoznávanie ihličnanov podľa morfologických znakov ihiel a šišiek – základná determinačná zručnosť.

## Pozorovanie vegetatívnych znakov ihiel
- **Borovica (*Pinus sylvestris*):** ihly po **2 vo fascikuloch** (zväzočkoch); dlhé (4–7 cm), tuhé, stočené; šišky vajcovité
- **Smrek (*Picea abies*):** ihly **jednotlivo**, **štvorcové** v priereze → ostré (picú!); ihly sú na stopočkách; šišky **visiace** (6–16 cm), hnedé
- **Jedľa (*Abies alba*):** ihly **jednotlivo**, **ploché**, mäkké (nebolestivé); na spodnej strane 2 biele prúžky (stomaty); šišky **stoja hore** (po dozretí sa rozpadajú na strome!)
- **Smrekovec (*Larix decidua*):** ihly v **chomáčikoch** (20–40 spolu); **opadavý ihličnan** → na jeseň zožltne a opadne; šišky vajcovité, zostávajú na strome roky

## Pozorovanie šišiek
Mužské (peľové) šišky – malé, mäkké, kvitnú a odpadávajú. Ženské (semenné) šišky – väčšie, tvrdé šupiny so semenami.

## Pomôcky a postup
Konáriky 4 druhov ihličnanov, ihly a šišky; lupa, mikroskop, pravítko.
1. Nazbierať vzorky konárikov
2. Určiť: sú ihly jednotlivé alebo v zväzočkoch? Aký je tvar v priereze?
3. Pozorovať šišky: smerujú hore (jedľa) alebo visia (smrek)?
4. Nakresliť a označiť všetky vzorky

## Záver
Najjednoduchší kľúč: Ihly v zväzočkoch → borovica. Ihly opadavé v chomáčikoch → smrekovec. Ihly ploché, mäkké, šišky hore → jedľa. Ihly štvorcové, ostré, šišky visiace → smrek.`,
};

/* ──────────────────────────────────────────────────────────────
   R = ROZPRÁVANIE (20 min) — rozšírené, jednoducho vysvetlené
   verzie tém. Kľúče sú rovnaké ako v E ("zadanieId-topicIndex").
   Ak kľúč chýba, appka zobrazí stručnú verziu z E.
   POZOR: E sa nemení; toto je len doplnková vrstva.
   ────────────────────────────────────────────────────────────── */
const R = {
"1-0":`## Predstav si to takto
Predstav si, že svet je obrovský dom plný živých vecí – rastlín, zvierat, húb aj malých neviditeľných tvorov. **Biológia** je jednoducho ten predmet, ktorý skúma všetko, čo žije. Slovo pochádza z gréčtiny: *bios* znamená „život" a *logos* znamená „veda" alebo „náuka". Takže biológia = **náuka o živote**.

Keď niečo žije, robí to veci, ktoré kameň alebo voda nikdy nerobia: rastie, je, dýcha, rozmnožuje sa, reaguje na svet okolo. A presne tieto veci biológia sleduje a vysvetľuje.

## Ako spoznáme, že je niečo živé
Aby sme nepomýlili živé s neživým, biológovia si všímajú niekoľko znakov. Ak ich tvor má, je živý. Predstav si to ako kontrolný zoznam:

- **Metabolizmus (látková premena)** – organizmus prijíma látky (jedlo, vodu, vzduch) a premieňa ich na energiu a stavebný materiál. Je to ako keď autu dolievaš benzín, aby mohlo jazdiť.
- **Dráždivosť** – reaguje na podnety z okolia. Keď sa dotkneš slimáka, schová tykadlá; keď ťa zaštípe komár, plesneš ho.
- **Rast a vývoj** – z malého sa stane veľké. Zo semienka strom, z dieťaťa dospelý.
- **Rozmnožovanie** – tvorí potomstvo, aby život pokračoval ďalej.
- **Dedičnosť a premenlivosť** – potomkovia sa podobajú na rodičov, ale nie sú úplne rovnakí.
- **Pohyb** – aj rastlina sa pohybuje, len pomaly (otáča listy za slnkom).
- **Adaptácia** – prispôsobuje sa prostrediu. Polárny medveď má hustý kožuch, kaktus zase tŕne namiesto listov.

Keď to zhrnieš jednou vetou: **živé je to, čo prijíma energiu, reaguje, rastie a rozmnožuje sa.**

## Prečo je biológií toľko
Život je tak pestrý, že jeden človek nemôže vedieť všetko o všetkom. Preto sa biológia rozdelila na menšie vedy, kde sa každá špecializuje na jednu vec. Predstav si veľkú nemocnicu, kde je detský lekár, zubár, očný lekár – každý je odborník na niečo. V biológii je to podobné:

- **Botanika** – skúma rastliny.
- **Zoológia** – skúma živočíchy (zvieratá).
- **Mykológia** – skúma huby.
- **Mikrobiológia** – skúma maličké organizmy, ktoré nevidíme okom (baktérie, prvoky).
- **Cytológia** – skúma bunky (najmenšie stavebné kamene života).
- **Histológia** – skúma tkanivá (skupiny buniek, čo robia spolu jednu prácu).
- **Anatómia** – skúma stavbu tela (z čoho sa skladá).
- **Fyziológia** – skúma funkcie (ako to v tele funguje).
- **Genetika** – skúma dedičnosť (prečo sa podobáš na rodičov).
- **Ekológia** – skúma vzťahy organizmov a prostredia (kto s kým žije a ako).
- **Etológia** – skúma správanie živočíchov (prečo robia to, čo robia).
- **Evolučná biológia** – skúma, ako sa život menil počas miliónov rokov.
- **Paleontológia** – skúma skameneliny, teda dávno vyhynuté organizmy.
- **Antropológia** – skúma človeka a jeho vývoj.

## Ako biológovia pracujú (metódy)
Vedec nehádá – on zisťuje. A robí to pomocou overených krokov:

1. **Pozorovanie** – najprv si len pozorne všíma, čo sa deje. Napríklad si všimne, že rastlina sa nakláňa k oknu.
2. **Otázka a hypotéza** – položí si otázku „prečo?" a vymyslí možnú odpoveď (hypotézu): „možno sa nakláňa za svetlom".
3. **Experiment** – vymyslí pokus, ktorý to overí. Dá jednu rastlinu k oknu a druhú do tmy a pozoruje rozdiel.
4. **Porovnávanie a meranie** – zapisuje si údaje, porovnáva.
5. **Záver** – ak sa hypotéza potvrdí, vie odpoveď. Ak nie, vymyslí novú.

Pomáhajú si aj **klasifikáciou** (triedením organizmov do skupín, aby bol v tom poriadok) a **modelovaním** (zjednodušeným obrazom skutočnosti, napr. model bunky).

## Slovníček po lopate
- **Organizmus** = každý jeden živý tvor (jedna huba, jeden pes, jedna baktéria).
- **Autotrof** = tvor, ktorý si vie sám vyrobiť potravu (rastlina cez fotosyntézu). „Auto" = sám.
- **Heterotrof** = tvor, ktorý musí jesť iných (zvieratá, huby, človek). Sám si potravu nevyrobí.
- **Hypotéza** = vedecký tip, ktorý ešte treba overiť.

## Príklad zo života
Keď ráno zjeme raňajky, naše telo robí presne to, čo biológia opisuje: prijíma látky (metabolizmus), z jedla získa energiu, vďaka ktorej rastieme a hýbeme sa. Keď nás zazvoní budík, reagujeme (dráždivosť). To všetko sú znaky života, ktoré máme spoločné aj s mravcom aj s dubom.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Začni definíciou: biológia je veda o živote, slovo z gréčtiny *bios* + *logos*.
2. Vymenuj a vysvetli **znaky živých organizmov** (každý jednou vetou s príkladom) – to je tvoja najsilnejšia časť, lebo na ňu nadviažeš všetko ostatné.
3. Vysvetli, prečo sa biológia delí na **biologické vedy**, a vymenuj aspoň 8–10 s krátkym popisom.
4. Opíš **metódy** biológie (pozorovanie, experiment, klasifikácia).
5. Vysvetli rozdiel **autotrof vs. heterotrof** – to skúšajúci radi počujú.
6. Na záver povedz vetu, prečo je biológia dôležitá (zdravie, jedlo, ochrana prírody).

**Tip:** ak nevieš ďalej, vráť sa k znakom života a uveď ďalší príklad – vždy máš o čom hovoriť.`,

"1-1":`## Predstav si to takto
Kvitnúce rastliny (tie, čo majú kvety a semená skryté v plode) voláme **krytosemenné**. A tie sa delia na dve veľké rodiny podľa jednej maličkej veci: **koľko prvých lístkov vyklíči zo semienka**. Tieto prvé lístky sa volajú **klíčne listy** (odborne kotyledóny).

Predstav si, že zo semienka vystrčí prvé „uška". Ak vystrčí **jedno** uško, je to **jednoklíčnolistová** rastlina. Ak vystrčia **dve** ušká, je to **dvojklíčnolistová** rastlina. Z tohto jediného rozdielu vyplýva prekvapivo veľa ďalších vlastností.

## Prvá skupina: jednoklíčnolistové
Po latinsky **Monocotyledonae** („mono" = jeden). Patria sem trávy, obilniny a mnoho pekných kvetov. Spoznáš ich podľa týchto znakov:

- **1 klíčny list** – zo semienka vyrazí jedno „uško".
- **Súbežná (rovnobežná) žilnatina** – žilky na liste idú vedľa seba ako koľajnice, nikde sa nekrížia. Pozri sa na list trávy alebo tulipánu.
- **Trojčetné kvety** – počet lupienkov je 3 alebo násobok troch (3, 6...).
- **Vláknitý koreň** – namiesto jedného hrubého koreňa má veľa tenkých koreňov ako metla.
- **Cievne zväzky roztrúsené** v stonke (sú rozhádzané ako bodky). Nemajú **kambium**, preto nehrubnú do strán – tráva nikdy nezhrubne na strom.
- **Príklady:** trávy, pšenica, kukurica, raž, ľalia, tulipán, cibuľa, orchidey, palmy.

## Druhá skupina: dvojklíčnolistové
Po latinsky **Dicotyledonae** („di" = dva). Patrí sem väčšina stromov, kríkov a bylín, ktoré poznáme zo záhrady. Znaky:

- **2 klíčne listy** – zo semienka vyrazia dve „ušká".
- **Sieťovitá žilnatina** – žilky sa vetvia a krížia ako pavučina alebo cestná sieť. Pozri si list dubu alebo fazule.
- **Štvor- alebo päťčetné kvety** – počet lupienkov je 4 alebo 5 (alebo ich násobky).
- **Kôlový koreň** – majú jeden hlavný hrubý koreň (ako mrkva), z ktorého idú menšie.
- **Cievne zväzky usporiadané do kruhu (prstenca)**. Majú **kambium**, preto môžu **hrubnúť do strán** – preto stromy rok čo rok pridávajú letokruhy.
- **Príklady:** ruža, jabloň, slnečnica, mak, fazuľa, dub, breza, púpava.

## Najdôležitejší trik na zapamätanie
Stačí si zapamätať číslo **1 verzus 2** a všetko ostatné z neho logicky plynie:

| Znak | Jednoklíčnolistové | Dvojklíčnolistové |
|---|---|---|
| Klíčne listy | 1 | 2 |
| Žilnatina | súbežná (koľajnice) | sieťovitá (pavučina) |
| Kvety | trojčetné (3) | 4- alebo 5-četné |
| Koreň | vláknitý (metla) | kôlový (mrkva) |
| Cievne zväzky | roztrúsené | v kruhu |
| Hrubnutie (kambium) | nie | áno |
| Príklad | tráva, kukurica | dub, fazuľa |

## Prečo trávy nezhrubnú na strom
Lebo nemajú **kambium** – to je tenká vrstva buniek, ktorá dokáže tvoriť nové bunky do hrúbky. Dvojklíčnolistové dreviny ho majú, preto pribúdajú letokruhy a kmeň hrubne. Jednoklíčnolistové ho nemajú, preto tráva ostáva tenká celý život. Toto je obľúbená otázka na maturite.

## Slovníček po lopate
- **Klíčny list (kotyledón)** = prvý lístok, čo vyrastie zo semienka.
- **Žilnatina** = usporiadanie žiliek na liste (rozvádzajú vodu a živiny).
- **Kambium** = vrstva buniek, vďaka ktorej rastlina hrubne.
- **Cievne zväzky** = „potrubie" rastliny na vodu a živiny.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Povedz, že obe skupiny patria medzi **krytosemenné** rastliny a delíme ich podľa počtu klíčnych listov.
2. Opíš **jednoklíčnolistové** – všetkých 5–6 znakov s príkladmi (trávy, kukurica).
3. Opíš **dvojklíčnolistové** – tie isté znaky, ale opačne (dub, fazuľa).
4. Urob **porovnanie v tabuľke** (žilnatina, kvety, koreň, hrubnutie) – ukáž, že vidíš logiku.
5. Vysvetli **prečo trávy nehrubnú** (chýba kambium).
6. Na záver zaraď pár konkrétnych rastlín do správnej skupiny – tým ukážeš, že tomu naozaj rozumieš.`,

"1-2":`## Predstav si to takto
Predstav si bunku ako malý balónik naplnený vodou s rozpustenými látkami (soľami, cukrami). Steny balónika sú **polopriepustná membrána** – to znamená, že cez ňu ľahko prejde voda, ale rozpustené látky (napr. soľ) cez ňu prejdú ťažko alebo vôbec.

A teraz pozor na hlavnú myšlienku: **voda sa vždy snaží premiestniť tam, kde je viac rozpustených látok**, aby to „zriedila" a vyrovnala. Tomuto samovoľnému prechodu vody cez membránu hovoríme **osmóza**. Je to ako keď sa dav ľudí presúva z preplnenej miestnosti do prázdnej, aby sa rozložili rovnomerne – len tu sa presúva voda.

## Tri prostredia, ktoré musíš poznať
Všetko závisí od toho, či je vonku viac alebo menej rozpustených látok ako vnútri bunky:

- **Hypotonické prostredie** – vonku je menej solí ako v bunke (napr. čistá voda). Voda preto **vchádza dnu** a bunka napučí. „Hypo" = menej.
- **Hypertonické prostredie** – vonku je viac solí ako v bunke (napr. slaná voda). Voda preto **odchádza von** a bunka splaskne. „Hyper" = viac.
- **Izotonické prostredie** – vonku aj vnútri je rovnako. Voda síce prechádza tam aj späť, ale rovnako, takže bunka sa **nemení**. „Izo" = rovnako.

## Čo sa pri tom deje s rastlinnou bunkou
Rastlinná bunka má okolo membrány ešte pevnú **bunkovú stenu** (ako škatuľa okolo balónika). Preto reaguje takto:

- **Turgor** – keď je v hypotonickom prostredí (veľa vody), voda vchádza dnu, bunka sa nafúkne a tlačí na stenu. Tento tlak drží rastlinu pevnú a vzpriamenú. Práve preto je čerstvý šalát chrumkavý a zvädnutý mäkký – zvädnutý stratil turgor.
- **Plazmolýza** – keď je v hypertonickom prostredí (veľa soli), voda z bunky uniká, cytoplazma sa scvrkne a **odtrhne sa od bunkovej steny**. Bunka „splaskne" zvnútra. Keď to trvá dlho, bunka odumrie.
- **Deplazmolýza** – keď scvrknutú bunku vrátime späť do čistej vody, voda znova vojde dnu a cytoplazma sa **vráti k stene**. Bunka sa zotaví (ak nebola plazmolýza príliš dlhá).

## Praktikum: ako sa to pozoruje (krok za krokom)
**Pomôcky:** cibuľa, mikroskop, podložné a krycie sklíčko, 10 % roztok kuchynskej soli (NaCl), destilovaná (čistá) voda, pinzeta, kvapkadlo.

1. Z vnútornej strany šupky cibule odlúpni tenkú priehľadnú blanku (pokožku).
2. Polož ju na sklíčko, kvapni **destilovanú vodu** a prikry krycím sklíčkom.
3. Pozoruj pod mikroskopom – bunky sú plné, napäté, **turgidné** (sú v hypotonickom prostredí).
4. Teraz z jednej strany pridaj kvapku **10 % soli** a z druhej strany ju filtračným papierikom potiahni, aby soľ pretiekla cez vzorku.
5. Pozoruj – cytoplazma sa začne sťahovať od steny: vidíš **plazmolýzu** (hypertonické prostredie).
6. Nakoniec znova pridaj destilovanú vodu – bunka sa zotaví: **deplazmolýza**.

## Slovníček po lopate
- **Osmóza** = samovoľný prechod vody cez polopriepustnú membránu k vyššej koncentrácii látok.
- **Polopriepustná membrána** = prepúšťa vodu, ale nie rozpustené látky.
- **Turgor** = vnútorný tlak vody, ktorý drží rastlinu pevnú.
- **Plazmolýza** = odtrhnutie cytoplazmy od steny pri strate vody.
- **Deplazmolýza** = návrat do normálu po doplnení vody.

## Príklad zo života
Keď posolíš uhorkový šalát, po chvíli pustí vodu a zmäkne. Prečo? Soľ vytvorila okolo buniek **hypertonické** prostredie, takže voda z buniek vyšla von – to je plazmolýza v praxi. Rovnako preto sa potraviny **nakladajú do soli alebo cukru**: mikróbom sa odoberie voda a nemôžu rásť.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je **osmóza** a prečo voda putuje k vyššej koncentrácii.
2. Opíš **tri prostredia** (hypo-, hyper-, izotonické) a čo voda v každom robí.
3. Opíš tri stavy rastlinnej bunky: **turgor, plazmolýza, deplazmolýza**.
4. Prejdi **postup pokusu s cibuľou** krok za krokom – ukáž, že vieš, čo robíš a prečo.
5. Pridaj **príklad zo života** (posolený šalát, nakladanie potravín) – tým ukážeš pochopenie.
6. Na záver zhrň, prečo je osmóza pre rastliny dôležitá (drží ich vzpriamené, riadi príjem vody).`,

"2-0":`## Predstav si to takto
Predstav si, že staviaš obrovský hrad z LEGO kociek. Každá jedna kocka je malá, ale keď ich spojíš, vznikne celý hrad. **Bunka** je presne taká LEGO kocka života – je to najmenšia časť, z ktorej sú postavené všetky živé veci, od malej baktérie až po veľkú veľrybu aj teba.

A **bunková teória** je súhrn troch dôležitých pravidiel, ktoré vedci objavili o tom, ako to s týmito „kockami života" funguje.

## Tri základné tvrdenia (toto je jadro témy)
1. **Všetko živé sa skladá z buniek.** Či je to strom, pes alebo človek – všetko je postavené z buniek, prípadne z vecí, ktoré bunky vyrobili (napríklad kosti či vlasy).
2. **Bunka je základná stavebná a funkčná jednotka života.** „Stavebná" znamená, že z nej je telo postavené. „Funkčná" znamená, že v nej prebieha život – dýchanie, výživa, rozmnožovanie.
3. **Každá bunka vzniká len z inej bunky** – delením. Bunka sa nemôže zjaviť z ničoho. Latinsky sa to povie krásne: **Omnis cellula e cellula** = „každá bunka z bunky".

## Kto na to prišiel (vedci v správnom poradí)
Predstav si to ako reťaz objaviteľov, kde každý pridal jeden kúsok:

- **Robert Hooke (1665)** – pozeral cez mikroskop na kúsok korku a videl malé komôrky. Pripomínali mu mníšske cely, tak ich nazval *bunky* (cells). Bol prvý, kto to slovo použil.
- **Anton van Leeuwenhoek (17. storočie)** – vylepšil mikroskop tak, že prvýkrát uvidel živé baktérie a prvoky. Volal ich „zvieratká".
- **Matthias Schleiden (1838)** – zistil, že **rastliny** sú zložené z buniek.
- **Theodor Schwann (1839)** – zistil to isté o **živočíchoch**. Spolu so Schleidenom dali dohromady prvú bunkovú teóriu.
- **Rudolf Virchow (1858)** – pridal to slávne „každá bunka pochádza z bunky".

## Dva typy buniek
Bunky nie sú všetky rovnaké. Delíme ich na dva základné typy podľa toho, či majú „trezor" na svoju DNA:

- **Prokaryotická bunka** – jednoduchá, **bez jadra**. DNA jej voľne pláva v bunke. Patria sem baktérie. („Pro" = pred, teda „pred jadrom".)
- **Eukaryotická bunka** – zložitejšia, **s jadrom** (DNA je bezpečne uložená v jadre ako v trezore). Majú ju rastliny, živočíchy, huby aj človek. („Eu" = pravé, teda „pravé jadro".)

## Slovníček po lopate
- **Bunka** = najmenšia stavebná a funkčná jednotka života.
- **Jadro** = riadiace centrum bunky, kde je uložená DNA.
- **Prokaryot** = bunka bez jadra (baktéria).
- **Eukaryot** = bunka s jadrom (rastlina, živočích, človek).

## Príklad zo života
Keď sa porežeš, rana sa po čase zahojí. Prečo? Lebo okolité bunky sa začnú **deliť** a vytvoria nové bunky, ktoré zaplnia ranu. To je presne tretie tvrdenie bunkovej teórie v praxi – nová bunka vznikla z existujúcej bunky.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Začni vysvetlením, čo je bunka (LEGO kocka života).
2. Vymenuj a vysvetli **3 tvrdenia bunkovej teórie** – to je najdôležitejšie.
3. Prejdi **vedcov v poradí** (Hooke → Leeuwenhoek → Schleiden → Schwann → Virchow) a povedz, čím prispel každý.
4. Vysvetli rozdiel **prokaryot vs. eukaryot** (bez jadra / s jadrom).
5. Na záver pridaj príklad (hojenie rany) – ukážeš, že rozumieš deleniu buniek.`,

"2-1":`## Predstav si to takto
Rozmnožovacia (pohlavná) sústava je ako **továreň na nový život**. U muža a u ženy vyzerá inak, ale cieľ majú spoločný – vytvoriť pohlavné bunky a umožniť vznik nového človeka. Muž vyrába spermie, žena vajíčka, a keď sa stretnú, môže vzniknúť dieťa.

## Pohlavná sústava muža (továreň na spermie)
Predstav si cestu, ktorou spermia putuje od výroby až von:

- **Semenníky** – hlavná „fabrika". Vyrábajú **spermie** a mužský hormón **testosterón**. Sú uložené vonku z tela v miešku, lebo spermie potrebujú trochu nižšiu teplotu než zvyšok tela.
- **Nadsemenník** – „sklad", kde spermie dozrievajú a čakajú.
- **Chámovod** – „potrubie", ktoré spermie odvádza ďalej.
- **Semenné vačky a predstojnica (prostata)** – pridávajú tekutinu s cukrom (fruktózou) ako palivo pre spermie. Prostata pridáva zásaditý sekrét, ktorý chráni spermie pred kyslým prostredím vagíny.
- **Penis** – pohlavný orgán, ktorým sperma opúšťa telo.
- **Sperma** = spermie + všetky tieto tekutiny dokopy.

## Pohlavná sústava ženy (továreň na vajíčka a domov pre plod)
- **Vaječníky** – „fabrika" na **vajíčka** a ženské hormóny **estrogén** a **progesterón**.
- **Vajcovody** – „chodby", kadiaľ putuje vajíčko. Práve tu sa najčastejšie stretne so spermiou – nastáva **oplodnenie**.
- **Maternica** – „izbička", kde rastie plod počas tehotenstva. Jej výstelka sa volá endometrium.
- **Krčok maternice a vagína** – tvoria pôrodný kanál, ktorým dieťa prichádza na svet.

## Menštruačný cyklus (asi 28 dní)
Predstav si ho ako mesačný kolobeh, ktorý pripravuje telo ženy na možné tehotenstvo:

1. **Folikulárna fáza** – vo vaječníku dozrieva vajíčko.
2. **Ovulácia** (asi 14. deň) – zrelé vajíčko sa uvoľní. Spustí to hormón **LH**.
3. **Luteálna fáza** – maternica si pripravuje hrubú výstelku pre prípad, že príde oplodnené vajíčko.
4. **Menštruácia** – ak k oplodneniu nedošlo, výstelka sa odlúči a odíde z tela. A cyklus začína odznova.

## Slovníček po lopate
- **Spermia** = mužská pohlavná bunka.
- **Vajíčko** = ženská pohlavná bunka.
- **Ovulácia** = uvoľnenie zrelého vajíčka z vaječníka.
- **Hormón** = chemický „odkaz", ktorý riadi telo (FSH, LH, testosterón, estrogén, progesterón).

## Príklad zo života
Hormóny FSH a LH fungujú ako „dispečer" – posielajú signály z mozgu (z hypofýzy) do pohlavných žliaz a hovoria im, kedy majú pracovať. Práve preto sa cyklus opakuje pravidelne každý mesiac.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Povedz, že obe sústavy slúžia na rozmnožovanie, a porovnaj ich.
2. Opíš **mužskú sústavu** – sleduj cestu spermie (semenníky → nadsemenník → chámovod → žľazy → penis).
3. Opíš **ženskú sústavu** (vaječníky → vajcovody → maternica → vagína).
4. Vymenuj **hormóny** a čo robia.
5. Vysvetli **menštruačný cyklus** po fázach – to skúšajúci radi počujú.`,

"2-2":`## Predstav si to takto
Určovanie rastlín je ako **hra „uhádni kto"**, ale s rastlinami. Máš pred sebou neznámu rastlinu a pomocou série otázok typu „áno/nie" postupne zužuješ možnosti, až kým nezistíš, o aký druh ide. Nástroj, ktorý ti tie otázky kladie, sa volá **určovací kľúč**.

## Ako funguje dichotomický kľúč
Slovo **dichotomický** znamená „rozdvojený" – pri každom kroku si vyberáš medzi **dvomi** protikladnými možnosťami (A alebo B). Napríklad:
- *„List má súbežné žilky? → choď na bod 5. List má sieťovité žilky? → choď na bod 8."*

A takto skáčeš z bodu na bod, až ťa kľúč dovedie k názvu rastliny. Je to ako rázcestník, kde vždy ideš buď doľava, alebo doprava.

## Čo si na rastline všímame (znaky)
Aby si vedel odpovedať na otázky kľúča, musíš sa pozrieť na konkrétne znaky:

- **List** – aký má tvar a okraj? (hladký = celokrajný, zúbkovaný = pilovitý, vykrajovaný = laločnatý)
- **Usporiadanie listov na stonke** – striedajú sa, sú oproti sebe, alebo v praslenoch (viac dokola)?
- **Žilnatina** – súbežná (rovnobežné žilky) znamená jednoklíčnolistovú rastlinu; sieťovitá znamená dvojklíčnolistovú.
- **Typ stonky** – je to mäkká bylina, drevnatý ker, alebo strom?
- **Kvet** – farba, počet lupienkov, tvar.
- **Plod** – bobuľa, struk, nažka?

## Postup krok za krokom
1. Vezmi rastlinu, ideálne aj s kvetmi alebo plodmi (s nimi je určovanie ľahšie).
2. Otvor určovací kľúč a začni na prvom bode.
3. Pri každom kroku porovnaj dve možnosti a vyber tú, ktorá sedí.
4. Postupuj ďalej, kým ťa kľúč nedovedie ku konkrétnemu druhu alebo rodu.
5. **Over si výsledok** vo fotografickom atlase alebo herbári – aby si mal istotu.

## Slovníček po lopate
- **Určovací kľúč** = pomôcka s otázkami, ktorá vedie k názvu rastliny.
- **Dichotomický** = pri každom kroku vyberáš z dvoch možností.
- **Žilnatina** = usporiadanie žiliek na liste.
- **Herbár** = zbierka vylisovaných, vysušených rastlín.

## Príklad zo života
Je to ako keď v aplikácii hľadáš film podľa filtrov: „akčný? áno/nie", „z roku 2020? áno/nie" – a postupne sa dopracuješ k jedinému výsledku. Pri rastlinách robíš to isté, len filtre sú listy, kvety a žilnatina.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je určovanie rastlín a načo slúži.
2. Opíš, ako funguje **dichotomický kľúč** (výber z dvoch možností).
3. Vymenuj **znaky**, ktoré sledujeme (list, žilnatina, stonka, kvet, plod).
4. Prejdi **postup** krok za krokom.
5. Zdôrazni, prečo je dôležité **overiť** výsledok v atlase (riziko zámeny podobných druhov).`,

"3-0":`## Predstav si to takto
Predstav si, že celý dom – kuchyňu, spálňu aj dielňu – máš stlačený do jednej jedinej izby. To je **jednobunkovec**: organizmus, ktorý má len **jednu bunku**, no tá jedna bunka musí zvládnuť úplne všetko – prijímať potravu, hýbať sa, dýchať aj rozmnožovať sa. Patria medzi **prvoky** a sú to eukaryoty (majú jadro).

Delíme ich do štyroch skupín podľa toho, **ako sa pohybujú**.

## Meňavky – pohyb pomocou panôžok
- Pohybujú sa tak, že vystrčia výbežok cytoplazmy (**panôžku, pseudopódium**) a „prelejú" sa doň. Vyzerá to, akoby sa rozlievali.
- Potravu prijímajú tak, že ju **obtečú a pohltia** (fagocytóza) – ako keby si rukami objal loptu.
- Známy parazit: *Entamoeba histolytica* spôsobuje **amébovú úplavicu** (hnačkové ochorenie).

## Bičíkovce – pohyb pomocou bičíka
- Majú dlhý **bičík**, ktorým sa poháňajú ako lodička s vrtuľou.
- *Euglena viridis* je zaujímavá: na svetle si vyrába potravu ako rastlina (fotosyntéza), v tme sa živí ako zviera. Vie oboje – voláme to mixotrofia.
- Parazity: *Trypanosoma* (spavá choroba), *Giardia* (črevné ťažkosti).

## Výtrusovce – nehybní paraziti
- **Nemajú žiadne pohybové orgány** – sú to vždy parazity vnútri iného tela.
- Rozmnožujú sa **výtrusmi (spórami)**.
- Najznámejší: *Plasmodium* spôsobuje **maláriu** a prenáša ho komár rodu *Anopheles*. *Toxoplasma* prenáša mačka.

## Nálevníky – pohyb pomocou riasiniek
- Majú telo pokryté množstvom drobných chĺpkov (**riasiniek, cílií**), ktorými veslujú ako stonožka.
- *Paramecium* (črievička) je typický príklad. Zvláštnosť: má **dve jadrá** – veľké (riadi bežný život) a malé (slúži pri rozmnožovaní).

## Slovníček po lopate
- **Pseudopódium (panôžka)** = výbežok cytoplazmy na pohyb a lov.
- **Bičík** = dlhý vláknitý „bič" na pohyb.
- **Riasinky (cílie)** = mnoho krátkych chĺpkov na pohyb.
- **Parazit** = organizmus, ktorý žije na úkor iného a škodí mu.

## Príklad zo života
Malária je dodnes jedna z najnebezpečnejších chorôb na svete a spôsobuje ju práve maličký výtrusovec. Ukazuje to, že aj jednobunkový organizmus môže byť pre človeka veľmi nebezpečný.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je jednobunkovec (všetko v jednej bunke).
2. Prejdi **4 skupiny** podľa pohybu: meňavky (panôžky), bičíkovce (bičík), výtrusovce (žiadny pohyb), nálevníky (riasinky).
3. Pri každej skupine uveď **príklad a parazita/chorobu**.
4. Spomeň zvláštnosti (Euglena – mixotrofia, Paramecium – dve jadrá).
5. Na záver zdôrazni význam (malária, úplavica).`,

"3-1":`## Predstav si to takto
Bunku obklopuje **membrána** – tenká blana, ktorá funguje ako **vrátnik na bráne mesta**. Rozhoduje, čo pustí dnu a čo von. Niektoré veci prejdú zadarmo a samé, na iné treba „zaplatiť" energiu. Podľa toho rozdeľujeme transport (prenos látok) na **pasívny** (zadarmo) a **aktívny** (za energiu).

## Pasívny transport – zadarmo, bez energie
Látky sa pohybujú samé z miesta, kde je ich veľa, tam, kde je ich málo (po koncentračnom spáde) – ako keď sa dav rozlieva z preplnenej miestnosti do prázdnej.

- **Difúzia** – malé molekuly (kyslík O₂, oxid uhličitý CO₂) prejdú cez membránu samé.
- **Osmóza** – to isté, ale týka sa **vody**.
- **Facilitovaná difúzia** – väčšie molekuly (napr. glukóza) potrebujú „dvere" – bielkovinový kanál. Stále je to zadarmo, len treba pomocníka.

## Aktívny transport – za energiu (ATP)
Niekedy bunka potrebuje látku tlačiť **proti smeru** – z miesta, kde je jej málo, tam, kde je jej veľa. To je ako tlačiť loptu do kopca – musíš vynaložiť silu. Tou silou je energia **ATP**.

- Robia to špeciálne bielkovinové **pumpy**.
- Najznámejšia je **sodíkovo-draslíková pumpa (Na⁺/K⁺)** – vytláča 3 ióny sodíka von a vťahuje 2 ióny draslíka dnu. Vďaka tomu funguje napr. nervový vzruch.

## Vezikulárny transport – preprava vo „vrecúškach"
Keď je látka príliš veľká na bránu, bunka ju zabalí do mechúrika (vezikuly):

- **Endocytóza** – príjem dnu (membrána sa preliači a pohltí látku):
  - *Fagocytóza* = „zjedenie" pevnej častice (napr. biela krvinka pohltí baktériu).
  - *Pinocytóza* = „pitie" kvapaliny.
- **Exocytóza** – výdaj von (mechúrik sa spojí s membránou a vyleje obsah). Takto bunka vylučuje napr. inzulín.

## Slovníček po lopate
- **Membrána** = blana okolo bunky, ktorá riadi prechod látok.
- **ATP** = „batéria" bunky, zdroj energie.
- **Pasívny transport** = bez energie, po spáde.
- **Aktívny transport** = s energiou, proti spádu.

## Príklad zo života
Keď biela krvinka v tvojom tele „zožerie" baktériu, robí **fagocytózu** – pohltí ju do mechúrika a strávi. Práve takto ťa imunitný systém chráni pred infekciou.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli membránu ako „vrátnika" a rozdiel pasívny vs. aktívny transport (energia!).
2. Opíš pasívny: **difúzia, osmóza, facilitovaná difúzia** s príkladmi.
3. Opíš aktívny: pumpy + **Na⁺/K⁺ pumpa**.
4. Opíš vezikulárny: **endocytóza** (fago- vs. pinocytóza) a **exocytóza**.
5. Pridaj príklad (biela krvinka, inzulín).`,

"3-2":`## Predstav si to takto
Mikroskop je ako **ďalekohľad naopak** – ďalekohľad približuje veľké vzdialené veci, mikroskop zväčšuje maličké blízke veci, ktoré okom nevidíš. Vďaka nemu vieš pozorovať bunky, baktérie či kúsok cibuľovej šupky.

## Z čoho sa mikroskop skladá
Rozdeľme ho na tri časti – optickú (sklá), mechanickú (kostra) a osvetľovaciu (svetlo):

**Optická časť (cez ňu sa pozeráš):**
- **Okulár** – šošovka pri oku, väčšinou zväčšuje 10×.
- **Objektív** – šošovka pri vzorke. Je ich viac (4×, 10×, 40×, 100×) a sú na otočnom koliesku zvanom **revolver**.

**Osvetľovacia časť:**
- **Zdroj svetla** (žiarovka alebo zrkadlo) – presvetľuje vzorku zospodu.
- **Kondenzor** – sústreďuje svetlo presne na vzorku.

**Mechanická časť (kostra):**
- **Stolík (platforma)** – sem položíš preparát a uchytíš ho sponami.
- **Makroskrutka** – hrubé, rýchle zaostrenie.
- **Mikroskrutka** – jemné doladenie ostrosti.
- **Stojan, rameno, pätka** – držia všetko pokope.

## Ako vypočítaš zväčšenie
Jednoducho **vynásobíš okulár × objektív**. Napríklad 10× (okulár) krát 40× (objektív) = **400-násobné zväčšenie**.

## Postup pozorovania krok za krokom
1. Zapni svetlo a nastav kondenzor.
2. Polož preparát na stolík a uchyť ho.
3. Začni najslabším objektívom a zaostri **makroskrutkou** – pričom sa pozeraj zboku, aby si objektívom nenarazil do skla!
4. Dolaď ostrosť **mikroskrutkou**.
5. Keď prepneš na silnejší objektív, dolaďuj už **len mikroskrutkou** (nikdy nie makro – poškriabal by si sklo).

## Príprava preparátu
Tenký rez vzorky polož na **podložné sklíčko**, kvapni naň vodu a prikry **krycím sklíčkom** tak, aby nevznikli vzduchové bubliny (tlač šikmo).

## Slovníček po lopate
- **Okulár** = sklo pri oku.
- **Objektív** = sklo pri vzorke.
- **Preparát** = pripravená vzorka na sklíčku.
- **Zväčšenie** = okulár × objektív.

## Príklad zo života
Najčastejšia chyba začiatočníka: pri zaostrovaní zhora pritlačí objektív o sklíčko a poškriabe ho. Preto sa vždy zaostruje **smerom od preparátu** a sleduje sa to zboku.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, načo slúži mikroskop.
2. Vymenuj **časti** (optická – okulár, objektív; osvetľovacia – svetlo, kondenzor; mechanická – stolík, skrutky).
3. Ukáž **výpočet zväčšenia** (okulár × objektív).
4. Opíš **postup pozorovania** krok za krokom.
5. Spomeň najčastejšiu chybu (poškriabanie objektívu) a ako jej predísť.`,

"4-0":`## Predstav si to takto
Rovnako ako sa tvoje telo skladá z rôznych tkanív (svalové, kostné, kožné), aj rastlina má svoje **pletivá** – skupiny buniek rovnakého pôvodu a tvaru, ktoré robia spolu jednu prácu. Slovo „pletivo" je rastlinná obdoba slova „tkanivo".

Rastlinné pletivá delíme na dve veľké skupiny: tie, čo **rastú a delia sa** (deliace), a tie, čo už majú **hotovú úlohu** (trvalé).

## Deliace pletivá (meristémy) – „rastové zóny"
Tu sa bunky neustále delia, takže rastlina práve tu rastie:
- **Vrcholový meristém** – na špičkách koreňov a stonky. Vďaka nemu rastlina rastie **do dĺžky** (vyššie a hlbšie).
- **Bočný meristém (kambium)** – u stromov a kríkov. Vďaka nemu kmeň **hrubne** (pribúdajú letokruhy).
- **Interkalárny meristém** – na spodku článkov tráv, preto tráva dorastá odspodu (aj keď ju pokosíš, znova vyrastie).

## Trvalé pletivá – „hotoví špecialisti"
Vznikajú z deliacich buniek, ktoré sa už ďalej nedelia a dostali konkrétnu úlohu:

- **Krycie** – ochrana povrchu (ako koža). *Epiderma* je tenká vrstvička s voskovou vrstvou (kutikulou) proti vysychaniu a s prieduchmi na dýchanie. U stromov ju nahrádza **korok**.
- **Vodivé** – „potrubie" rastliny. **Xylém (drevo)** vedie vodu a minerály **zdola nahor** (z koreňa do listov). **Floém (lýko)** vedie cukry z fotosyntézy **zhora nadol** (z listov do celého tela).
- **Základné (parenchym)** – výplň a sklady; tu prebieha fotosyntéza a ukladá sa škrob.
- **Pevnostné** – „kostra" rastliny, dáva jej pevnosť: *kolenchym* (živé bunky, ohybná opora mladých častí) a *sklerenchym* (mŕtve, tvrdé bunky, pevná opora).
- **Vylučovacie** – tvoria živice, silice, nektár či latex.

## Slovníček po lopate
- **Pletivo** = skupina buniek rastliny s rovnakou úlohou.
- **Meristém** = deliace pletivo, kde rastlina rastie.
- **Xylém** = vedie vodu nahor (mŕtve bunky).
- **Floém** = vedie cukry nadol (živé bunky).
- **Kambium** = bočné deliace pletivo, vďaka ktorému strom hrubne.

## Príklad zo života
Keď narežeš strom a vidíš **letokruhy**, pozeráš sa na prácu kambia – každý rok pridalo novú vrstvu dreva. A keď posekáš trávnik a o týždeň je tráva opäť vysoká, je to vďaka interkalárnemu meristému, ktorý dorastá odspodu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je pletivo (rastlinná obdoba tkaniva).
2. Opíš **deliace pletivá** (vrcholové, bočné/kambium, interkalárne) a kde rastlina rastie.
3. Prejdi **trvalé pletivá** – hlavne krycie, vodivé, základné, pevnostné.
4. Zdôrazni rozdiel **xylém vs. floém** (smer, živé/mŕtve) – obľúbená otázka.
5. Vysvetli **kolenchym vs. sklerenchym** a pridaj príklad (letokruhy, kosenie trávy).`,

"4-1":`## Predstav si to takto
Ryby sa delia na dve veľké skupiny podľa toho, **z čoho majú kostru**. Jedny majú kostru z mäkkej **chrupky** (ako máš ty v nose alebo uchu) – to sú **drsnokožce**. Druhé majú kostru z tvrdej **kosti** – to sú **kostnaté ryby**. Z tohto jediného rozdielu vyplýva veľa ďalších vlastností.

## Drsnokožce (napr. žralok, raja)
- **Chrupková kostra** – mäkká, pružná, žiadne pravé kosti.
- Koža pokrytá drsnými **plakoidnými šupinami** – na dotyk ako brúsny papier (odtiaľ názov drsnokožce).
- **Nemajú plávací mechúr!** Preto by klesli ku dnu, keby sa zastavili – musia **stále plávať**.
- Žiabre majú otvorené priamo navonok cez **5–7 štrbín** (nemajú kryt).
- Príklady: žralok biely, raja, pílohryz.

## Kostnaté ryby (napr. kapor, pstruh, losos)
- **Kostnená kostra** – tvrdá, z pravých kostí.
- Majú **plávací mechúr** – mešec naplnený plynom. Funguje ako **ponorka**: rybe stačí zmeniť množstvo plynu a vznáša sa v ľubovoľnej hĺbke bez plávania.
- Žiabre kryté pevným vekom – **operkulom**.
- Šupiny hladšie (cykloidné/ktenoidné).
- Majú **bočnú čiaru** – zmyslový orgán, ktorý cíti vibrácie a tlak vody (ryba tak „cíti" pohyb okolo seba aj v tme).

## Spoločné znaky všetkých rýb
Žijú vo vode, dýchajú **žiabrami**, pohybujú sa **plutvami**, sú **chladnokrvné** (teplota tela závisí od vody) a majú **bočnú čiaru**.

## Slovníček po lopate
- **Chrupka** = mäkké pružné tkanivo (kostra drsnokožcov).
- **Plávací mechúr** = vzduchový mešec na udržanie hĺbky (len kostnaté ryby).
- **Operculum** = žiabrové veko.
- **Bočná čiara** = zmyslový orgán na vnímanie pohybu vody.
- **Chladnokrvný (poikilotermný)** = teplota tela kolíše podľa okolia.

## Príklad zo života
Prečo musí žralok stále plávať, kým kapor môže nehybne stáť na mieste? Lebo žralok nemá plávací mechúr a klesol by, kým kapor si vďaka mechúru udrží hĺbku aj v pokoji. To je najlepší dôkaz rozdielu medzi oboma skupinami.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Povedz, že ryby delíme podľa kostry na drsnokožce (chrupka) a kostnaté (kosť).
2. Opíš **drsnokožce** – všetky znaky (chrupka, plakoidné šupiny, bez mechúra, žiabrové štrbiny).
3. Opíš **kostnaté ryby** – kosť, plávací mechúr, operculum, bočná čiara.
4. Vymenuj **spoločné znaky** rýb.
5. Pridaj príklad (žralok musí plávať vs. kapor stojí) – ukážeš pochopenie.`,

"4-2":`## Predstav si to takto
Krv ľudí nie je všetka rovnaká – delíme ju na **krvné skupiny** A, B, AB a 0. Predstav si, že každá červená krvinka má na povrchu „nálepku" (antigén). Podľa toho, akú nálepku má, určíme skupinu. A v krvnej plazme zase plávajú „strážcovia" (protilátky), ktorí útočia na cudzie nálepky.

## Genetický základ
O krvnej skupine rozhoduje gén **I**, ktorý má tri verzie (alely):
- **Iᴬ** → vyrobí nálepku **A**
- **Iᴮ** → vyrobí nálepku **B**
- **Iᴼ** → nevyrobí žiadnu nálepku (je recesívna, teda „slabšia")

Keďže každý človek má dve alely (jednu od mamy, jednu od ocka), vznikajú rôzne kombinácie.

## Tabuľka skupín
| Krvná skupina | Genotypy | Nálepka (antigén) | Strážca (protilátka) |
|---|---|---|---|
| A | IᴬIᴬ alebo IᴬIᴼ | A | anti-B |
| B | IᴮIᴮ alebo IᴮIᴼ | B | anti-A |
| AB | IᴬIᴮ | A aj B | žiadny |
| 0 | IᴼIᴼ | žiadna | anti-A aj anti-B |

## Kodominancia – keď sa prejavia obe naraz
Skupina **AB** je špeciálna: alely Iᴬ aj Iᴮ sú rovnako silné, takže sa **prejavia obe súčasne** (krvinka má nálepku A aj B). Tomuto javu hovoríme **kodominancia** – ani jedna nepotlačí druhú.

## Pravidlá pre transfúziu (darovanie krvi)
- Skupina **AB** = **univerzálny prijímateľ** (nemá protilátky, prijme od kohokoľvek).
- Skupina **0** = **univerzálny darca** (nemá nálepky, môže darovať komukoľvek).
- Ak by si zmiešal nesprávne skupiny, strážcovia (protilátky) by zaútočili na cudzie nálepky a krv by sa zrazila – to je nebezpečné.

## Rh faktor
Okrem ABO máme ešte **Rh faktor** – buď nálepku D máš (**Rh+**), alebo nemáš (**Rh−**). Dôležité je to v tehotenstve: ak má Rh− matka Rh+ dieťa, môže vzniknúť problém (hemolytická choroba novorodenca).

## Slovníček po lopate
- **Antigén** = „nálepka" na krvinke.
- **Protilátka** = „strážca" v plazme, ktorý útočí na cudzie nálepky.
- **Kodominancia** = obe alely sa prejavia naraz (skupina AB).
- **Alela** = jedna verzia génu.

## Príklad zo života
Keď ideš darovať krv, najprv ti zistia skupinu. Ak si „nulka" (0), si veľmi cenný darca, lebo tvoju krv môže prijať takmer každý. Práve preto nemocnice po krvi skupiny 0 vždy túžia.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli antigény (nálepky) a protilátky (strážcov).
2. Ukáž **3 alely** (Iᴬ, Iᴮ, Iᴼ) a ako z nich vznikajú skupiny.
3. Prejdi **tabuľku** skupín, genotypov a protilátok.
4. Vysvetli **kodominanciu** na skupine AB.
5. Spomeň **transfúzne pravidlá** (univerzálny darca/prijímateľ) a **Rh faktor**. Priprav sa aj na výpočet cez Punnettov štvorec.`,

"5-0":`## Predstav si to takto
Huby nie sú ani rastliny, ani zvieratá – tvoria **vlastnú ríšu** (kráľovstvo). Vyzerajú trochu ako rastliny (nehýbu sa, rastú zo zeme), ale vnútri fungujú celkom inak. Predstav si hubu skôr ako „rozkladača", ktorý sa živí tým, čo nájde okolo seba.

## Prečo huby nie sú rastliny (toto je kľúčové)
Tri veci ich jasne odlišujú od rastlín:
- **Nevedia fotosyntézu** – nemajú zelené farbivo (chlorofyl), takže si potravu nevyrobia zo slnka. Musia ju získať z okolia – sú **heterotrofné** (ako zvieratá).
- **Bunková stena z chitínu** – z tej istej látky, z akej majú chrobáky pancier (rastliny majú celulózu).
- **Zásobnú látku majú glykogén** – presne ako živočíchy (rastliny majú škrob).

## Z čoho sa huba skladá
Telo huby je sieť tenkých vlákien – **hýf**. Celá tá spletená sieť sa volá **mycélium (podhubie)** a je skrytá pod zemou alebo v dreve. To, čo zbierame v lese, je len „plodnica" – časť na rozmnožovanie, akoby jablko stromu.

## Skupiny húb
- **Dutkovce (Zygomycota):** napr. *Mucor* – sivá pleseň na starom chlebe.
- **Vreckaté huby (Ascomycota):** droždie (kvasinky), smrčky, hľuzovky a *Penicillium*, z ktorej sa vyrába **penicilín** (prvé antibiotikum).
- **Stopkovýtrusné (Basidiomycota):** klasické huby z lesa – hríb, šampiňón, bedľa, ale aj smrteľne jedovatá **muchotrávka zelená**.

## Načo sú huby dobré (a kedy škodia)
- **Saprofyty** – rozkladajú odumreté listy a drevo, takže vracajú živiny do pôdy. Bez nich by les zarástol odpadom.
- **Mykoríza** – priateľstvo (symbióza) huby a koreňov stromu: huba dáva stromu vodu a minerály, strom dáva hube cukry. Obaja vyhrávajú.
- **Lišajník** – spojenie huby a riasy.
- **Úžitok:** droždie (chlieb, pivo), penicilín, plesňové syry, jedlé huby.
- **Škoda:** jedovaté huby, plesne na potravinách, kožné plesne.

## Slovníček po lopate
- **Heterotrof** = nevyrobí si potravu sám, musí ju prijať.
- **Hýfa** = jedno vlákno huby; **mycélium** = celá sieť vlákien.
- **Chitín** = pevná látka bunkovej steny húb.
- **Mykoríza** = symbióza huby a koreňa rastliny.

## Príklad zo života
Keď zabudneš chlieb v skrini a po týždni je plesnivý, sleduješ hubu *Mucor* pri práci. A keď ti lekár predpíše antibiotikum, často vďačíš práve hube *Penicillium*, z ktorej penicilín pochádza.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Povedz, že huby tvoria samostatnú ríšu.
2. Vysvetli **3 dôvody, prečo nie sú rastliny** (heterotrofia, chitín, glykogén) – to je jadro.
3. Opíš stavbu (hýfy, mycélium, plodnica).
4. Vymenuj **3 skupiny** s príkladmi.
5. Zhrň **význam** (saprofyty, mykoríza, úžitok aj škoda) – spomeň muchotrávku ako jedovatý druh.`,

"5-1":`## Predstav si to takto
Príroda počas miliónov rokov „vylepšovala" telá živočíchov – ako keď výrobca áut postupne zdokonaľuje modely. Pozrime sa, ako sa postupne menili tri „obaly a podpory" tela: **krytie (koža), opora (kostra)** a **pohyb (svaly)**. Slovo **fylogenéza** znamená práve tento vývoj skupiny počas dejín.

## Krytie tela (koža) – od jednoduchého k zložitému
- Jednobunkovce majú len membránu; pŕhlivce tenký epitel.
- Červy: pokožka s ochrannou vrstvičkou (kutikulou).
- Ryby: **šupiny**.
- Obojživelníky (žaby): **holá vlhká koža** – dýchajú aj cez ňu, preto nesmú vyschnúť.
- Plazy: suché **rohovinové šupiny** – prvý raz koža chráni pred vysychaním, takže plazy mohli naplno opustiť vodu.
- Vtáky: **perie** – izolácia a let.
- Cicavce: **srsť**, k tomu potné a mazové žľazy.

## Opora tela (kostra) – dva základné typy
- Bezstavovce (chrobáky, kraby): **vonkajšia kostra (exoskelet)** z chitínu – pancier zvonku. Nevýhoda: aby rástli, musia ho zhodiť (zvliekanie).
- Stavovce: **vnútorná kostra (endoskelet)** – kosti vnútri tela. Rastie spolu s telom a umožňuje veľké rozmery (preto sú slony a veľryby veľké, ale chrobák nikdy).

## Pohyb (svaly) – od chĺpkov k svalom
- Prvoky: panôžky, bičíky, riasinky.
- Ploskavce a obrúčavce: **kožno-svalový vak** – svaly tvoria súvislý obal pod kožou.
- Článkonožce: svaly už pripevnené zvnútra na exoskelet.
- Stavovce: svaly pripevnené na endoskelet – presný a silný pohyb.

## Slovníček po lopate
- **Fylogenéza** = vývoj skupiny organizmov počas dejín Zeme.
- **Exoskelet** = vonkajšia kostra (pancier zvonku).
- **Endoskelet** = vnútorná kostra (kosti vnútri).
- **Kožno-svalový vak** = súvislá vrstva svalov pod kožou u červov.

## Príklad zo života
Prečo neexistuje chrobák veľký ako pes? Lebo vonkajšia kostra (pancier) by bola pri takej veľkosti príliš ťažká a krehká. Vnútorná kostra stavovcov je oveľa pevnejšia pri veľkých rozmeroch – preto môžu byť cicavce obrovské.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **fylogenéza** (vývoj počas dejín).
2. Prejdi vývoj **krytia** (od membrány po srsť), zdôrazni prelom u plazov (suchá koža = život na suchu).
3. Porovnaj **exoskelet vs. endoskelet** (výhody a nevýhody).
4. Opíš vývoj **svalstva** (kožno-svalový vak → svaly na kostre).
5. Pridaj príklad (prečo nie sú obrie chrobáky).`,

"5-2":`## Predstav si to takto
Všimol si si, že väčšina ľudí píše pravou rukou? Tomu, že uprednostňujeme jednu stranu tela, sa hovorí **lateralita**. A súvisí to s mozgom: ten je rozdelený na dve polovice (hemisféry), pričom **ľavá polovica riadi pravú stranu tela** a **pravá polovica ľavú stranu** – je to prekrížené.

## Typy laterality
- **Praváctvo** (asi 90 % ľudí) – dominantná je pravá ruka; riadi ju ľavá hemisféra.
- **Ľaváctvo** (asi 10 %) – dominantná ľavá ruka; riadi ju pravá hemisféra.
- **Ambidextria** – vzácni ľudia, ktorí ovládajú obe ruky rovnako dobre.

## Ktoré orgány testujeme
Lateralita sa netýka len rúk – máme párových orgánov viac:
- **Ruky** – ktorou píšeš, hádžeš, strihaš.
- **Nohy** – ktorou kopneš do lopty alebo vykročíš na schod.
- **Oči** – ktoré oko je dominantné (test nižšie).
- **Uši** – ktoré priložíš k dverám, keď chceš počuť.

## Praktikum: ako to zistíme (postup)
1. Každý vyskúša sériu úloh: napíše vetu, hodí loptičku, kopne, priloží ucho.
2. **Test dominantného oka:** vystri ruku, palcom „zakry" vzdialený bod a striedavo žmúr očami. Oko, pri ktorom palec **neskočí** bokom, je dominantné.
3. Zapíšeš výsledky pre každý orgán.
4. Určíš celkovú dominanciu a porovnáš so spolužiakmi.
5. Štatisticky vyhodnotíš (koľko % triedy sú praváci) a porovnáš s tým, že v populácii je praváctvo asi 90 %.

## Slovníček po lopate
- **Lateralita** = uprednostňovanie jednej strany tela.
- **Hemisféra** = jedna polovica mozgu.
- **Dominantný orgán** = ten, ktorý prirodzene používaš ako prvý.
- **Ambidextria** = rovnaká zručnosť oboch rúk.

## Príklad zo života
Možno poznáš niekoho, kto bol „prepísaný" z ľaváka na praváka. Násilné nútenie ľaváka písať pravou rukou môže spôsobiť ťažkosti (napr. v reči či písaní), preto sa to dnes už nerobí – rešpektuje sa prirodzená lateralita.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli **lateralitu** a prepojenie s hemisférami (prekríženie ľavá/pravá).
2. Vymenuj **typy** (praváctvo ~90 %, ľaváctvo ~10 %, ambidextria).
3. Vymenuj **testované orgány** (ruky, nohy, oči, uši).
4. Opíš **postup pokusu**, najmä test dominantného oka.
5. Na záver pridaj, že lateralita je daná geneticky aj prostredím a netreba ju nasilu meniť.`,

"6-0":`## Predstav si to takto
Vývoj človeka je dlhá cesta od jednej jedinej bunky až po dospelého človeka. Rozdelíme ju na dve veľké časti: **pred narodením** (prenatálny vývoj, v maternici) a **po narodení** (postnatálny vývoj, celý ostatný život).

## Pred narodením – v maternici
**Zárodočné obdobie (prvé 2 mesiace):**
- Oplodnené vajíčko = **zygóta** (jedna bunka).
- Začne sa deliť: 2 → 4 → 8 buniek… (rýhovanie), vznikne guľôčka buniek (morula, potom blastula).
- **Gastrulácia** – vytvoria sa tri základné vrstvy buniek (zárodočné listy), z ktorých neskôr vznikne celé telo:
  - *ektoderm* → koža a nervová sústava,
  - *mezoderm* → svaly, kosti, krv,
  - *entoderm* → vnútorné orgány (črevá, pľúca).
- 3. týždeň: základ mozgu a miechy. 4. týždeň: **začne biť srdce**. 8. týždeň: sú založené všetky orgány a zárodok sa odteraz volá **plod**.

**Plodové obdobie (3. mesiac až pôrod):**
- Orgány už len rastú a dozrievajú. Plod sa vyživuje cez **placentu** a **pupočnú šnúru** od matky.

## Po narodení – etapy života
- **Novorodenec** (0–28 dní) → **dojča** (do 1 roka) → **batoľa** (1–3 roky)
- **Predškolský vek** (3–6) → **školský vek** (6–12)
- **Puberta / dospievanie** (12–20) – telo pohlavne dozrieva, objavujú sa druhotné pohlavné znaky:
  - chlapci: hĺbka hlasu (mutácia), ochlpenie, rast svalov;
  - dievčatá: menštruácia, rast prsníkov.
- **Dospelosť** (20–60) → **staroba** (nad 60) – telo postupne starne.

## Čo riadi pubertu
Z mozgu (z hypofýzy) sa uvoľnia hormóny **FSH a LH**, ktoré „naštartujú" pohlavné žľazy – tie potom tvoria **testosterón** (chlapci) a **estrogén** (dievčatá).

## Slovníček po lopate
- **Zygóta** = oplodnené vajíčko, prvá bunka nového človeka.
- **Zárodočné listy** = tri vrstvy buniek, z ktorých vznikne telo.
- **Placenta** = orgán, cez ktorý plod dostáva výživu od matky.
- **Druhotné pohlavné znaky** = znaky dospievania (ochlpenie, mutácia, menštruácia…).

## Príklad zo života
Že srdce začne biť už okolo 4. týždňa tehotenstva, keď je zárodok menší než hrášok, je úžasné – väčšina ostatných orgánov vtedy ešte ani neexistuje. Ukazuje to, aký dôležitý je krvný obeh pre vývoj.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Rozdeľ vývoj na **prenatálny a postnatálny**.
2. Opíš **zárodočné obdobie** (zygóta → delenie → gastrulácia → 3 zárodočné listy a čo z nich vznikne).
3. Spomeň míľniky (3. týždeň nervová trubica, 4. týždeň srdce, 8. týždeň plod) a **plodové obdobie** (placenta).
4. Vymenuj **etapy po narodení**.
5. Vysvetli **hormonálnu reguláciu puberty** (FSH, LH → testosterón/estrogén).`,

"6-1":`## Predstav si to takto
Trávenie je premena potravy na malé kúsky, ktoré telo vie vstrebať. Počas vývoja živočíchov sa tráviaca sústava postupne „vylepšovala" – od jednoduchého pohltenia potravy jednou bunkou až po zložitý žalúdok kravy. Poďme tou cestou postupne.

## Od najjednoduchšieho k zložitému
- **Jednobunkovce:** trávia **vnútri bunky** (intracelulárne) – pohltia potravu do mechúrika a strávia ju. Žiadne črevo nepotrebujú.
- **Pŕhlivce (napr. medúza):** majú **jednu dutinu s jedným otvorom**, ktorý slúži ako ústa aj ako riť zároveň. Potrava ide dnu aj von tou istou dierou.
- **Ploskavce (ploské červy):** majú vetvenú slepú črevnú dutinu, stále len s jedným otvorom. Pásomnica nemá črevo vôbec – vstrebáva potravu **celým povrchom tela** (žije v hotovej strave v črevách hostiteľa).
- **Hlístovce:** veľký prelom – prvýkrát vzniká **priechodný tráviaci trakt** (samostatné ústa na jednom konci a riť na druhom). Potrava ide jedným smerom ako po výrobnej linke. Toto je obrovský evolučný skok.
- **Obrúčavce (dážďovka):** trakt s rôznymi časťami (hltan, vole, žalúdok).
- **Článkonožce:** ešte dokonalejší trakt so slinnými žľazami.
- **Ryby a vyššie:** pribúdajú veľké tráviace žľazy – **pečeň a pankreas**.
- **Vtáky:** majú **svalnatý žalúdok (svalník)**, kde melú tvrdé zrná (často aj s prehltnutými kamienkami namiesto zubov).
- **Prežúvavce (krava, ovca):** majú **štvorkomorový žalúdok** (bachor, čepiec, kniha, slez). V bachore im baktérie pomáhajú stráviť trávu (celulózu), ktorú by samy nestrávili.

## Tri najdôležitejšie evolučné kroky
1. **Gastrovaskulárna dutina** s jedným otvorom (pŕhlivce).
2. **Priechodný trakt** ústa → riť (hlístovce) – jednosmerná linka.
3. **Tráviace žľazy a špecializácia** (pečeň, pankreas; svalník vtákov; štvorkomorový žalúdok prežúvavcov).

## Slovníček po lopate
- **Intracelulárne trávenie** = trávenie vnútri bunky.
- **Extracelulárne trávenie** = trávenie mimo buniek, v tráviacej dutine.
- **Gastrovaskulárna dutina** = dutina s jedným otvorom (ústa = riť).
- **Priechodný trakt** = samostatné ústa a riť, jednosmerný pohyb potravy.

## Príklad zo života
Krava celý deň prežúva – vráti si potravu z bachora späť do úst a znova ju požuje. Prečo? Lebo tráva je tvrdá a ťažko stráviteľná. Vďaka štvorkomorovému žalúdku a baktériám v ňom dokáže získať živiny aj z obyčajnej trávy, čo človek nedokáže.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli rozdiel **intracelulárne vs. extracelulárne** trávenie.
2. Prejdi vývoj od jednobunkovcov cez pŕhlivce a ploskavce po **hlístovce** (priechodný trakt – kľúčový skok).
3. Pokračuj cez obrúčavce a článkonožce k stavovcom (pečeň, pankreas).
4. Opíš špecializácie: **svalník vtákov** a **štvorkomorový žalúdok prežúvavcov**.
5. Zhrň **3 hlavné evolučné kroky** a pridaj príklad (krava a prežúvanie).`,

"6-2":`## Predstav si to takto
Jazyk nie je len jeden veľký „chuťový senzor" – je pokrytý množstvom malých hrbolčekov zvaných **papily**, a v niektorých z nich sa skrývajú **chuťové poháriky** s **chuťovými bunkami**. Tie zachytávajú chuť a posielajú signál do mozgu. Tento pokus zisťuje, kde presne na jazyku tieto chuťové bunky sú.

## Druhy papíl na jazyku
- **Hríbovité papily** – na prednej časti jazyka, majú chuťové poháriky.
- **Ohraničené papily** – vzadu, usporiadané do tvaru písmena V (je ich len asi 8–12, ale sú veľké), majú chuťové poháriky.
- **Listovité papily** – po bokoch jazyka, tiež s chuťovými pohárikmi.
- **Vláskovité papily** – sú najpočetnejšie, ale **nemajú chuťové poháriky**! Slúžia len na **hmat** a vnímanie textúry jedla (preto je jazyk drsný).

## Päť základných chutí
Jazyk rozoznáva: **sladkú, slanú, kyslú, horkú** a **umami** (chuť mäsa/bujónu). Dnes vieme, že všetky chute vnímame po celom jazyku – staršia predstava o presných „mapách chutí" je prekonaná, ale citlivosť na niektoré chute môže byť na rôznych miestach mierne odlišná.

## Praktikum: ako sa to zisťuje (postup)
1. Priprav si roztoky štyroch chutí: cukor (sladká), soľ (slaná), citrón/ocot (kyslá), káva/chinín (horká).
2. Osuš jazyk a vatovou tyčinkou nanášaj roztok postupne na rôzne miesta (špička, boky, zadná časť).
3. Po každom nanesení si vypláchni ústa vodou, aby sa chute nemiešali.
4. Zaznamenaj, kde a ako silno chuť cítiš.
5. Vyhodnoť a porovnaj výsledky.

## Slovníček po lopate
- **Papila** = hrbolček na jazyku.
- **Chuťový pohárik** = štruktúra s chuťovými bunkami.
- **Umami** = piata chuť (mäsová, bujónová).
- **Vláskovité papily** = hmatové papily bez chuťových pohárikov.

## Príklad zo života
Keď máš silnú nádchu, jedlo ti „nechutí". Prečo? Lebo veľkú časť chuti v skutočnosti tvorí **vôňa** – jazyk síce vníma základné chute, ale jemné rozdiely (napr. medzi jablkom a hruškou) rozoznáš až pomocou čuchu. Chuť a čuch spolupracujú.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že chuť vnímajú chuťové bunky v chuťových pohárikoch v papilách.
2. Vymenuj **druhy papíl** a zdôrazni, že **vláskovité nemajú** chuťové poháriky (sú hmatové).
3. Vymenuj **5 základných chutí** (vrátane umami).
4. Opíš **postup pokusu** (roztoky, vatová tyčinka, vyplachovanie).
5. Pridaj príklad (nádcha a spolupráca chuti s čuchom).`,

"7-0":`## Predstav si to takto
Predstav si les. Nie sú v ňom len stromy – sú tam aj zvieratá, huby, baktérie, voda, slnko, pôda. A toto všetko je navzájom poprepájané: srnka žerie trávu, líška loví srnku, huby rozkladajú spadnuté lístie. **Ekológia** je veda, ktorá skúma práve tieto **vzťahy** – kto s kým a ako súvisí, a ako organizmy súvisia s neživým prostredím (vodou, vzduchom, pôdou).

## Základné pojmy (toto musíš poznať)
Poďme od najmenšieho k najväčšiemu:
- **Populácia** – všetci jedinci **jedného druhu** na jednom mieste a v jednom čase (napr. všetky srnky v jednom lese).
- **Biocenóza (spoločenstvo)** – **všetky organizmy** žijúce spolu na jednom mieste (srnky + stromy + huby + baktérie…).
- **Biotop (stanovište)** – samotné **neživé miesto** s jeho podmienkami (les, jazero, lúka).
- **Ekosystém** – biotop + biocenóza + ich vzťahy dohromady. Teda celý fungujúci „systém" (les ako celok).
- **Ekologická nika** – „povolanie" druhu v ekosystéme: čím sa živí, kto ho loví, kde žije. (Pozor: biotop je adresa, nika je zamestnanie.)
- **Biosféra** – celý obal Zeme, kde existuje život.

## Odvetvia ekológie
- **Autekológia** – skúma jeden druh a jeho vzťah k prostrediu.
- **Synekológia** – skúma celé spoločenstvá.
- Ďalej **populačná, krajinná a globálna** ekológia.

## Vzťahy medzi organizmami (kto ako vychádza s kým)
- **Predácia** – jeden loví a žerie druhého (líška a zajac).
- **Parazitizmus** – jeden žije na úkor druhého a škodí mu (kliešť a pes).
- **Komenzalizmus** – jeden má prospech, druhému to neškodí ani nepomáha.
- **Mutualizmus (symbióza)** – obaja majú prospech (včela a kvet).
- **Kompetícia (súťaž)** – dvaja súperia o tú istú vec (dva levy o korisť).
- **Amenzalizmus** – jeden škodí druhému, no sám z toho nič nemá.

## Slovníček po lopate
- **Ekosystém** = živé + neživé + ich vzťahy na jednom mieste.
- **Populácia** = jedinci jedného druhu na jednom mieste.
- **Biocenóza** = všetky druhy spolu.
- **Ekologická nika** = „zamestnanie" druhu v prírode.

## Príklad zo života
Akvárium je malý ekosystém: voda a kamene sú biotop, rybky a rastliny biocenóza, a ich vzájomné vzťahy (rastliny tvoria kyslík, rybky vydychujú CO₂) tvoria ekosystém. Ak jeden článok vypadne, pokazí sa rovnováha.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo ekológia skúma (vzťahy organizmov a prostredia).
2. Vysvetli pojmy od populácie cez biocenózu a biotop po **ekosystém** (postupne, od malého k veľkému).
3. Rozlíš **biotop vs. ekologická nika** (adresa vs. povolanie).
4. Vymenuj **odvetvia** (aut-, synekológia…).
5. Prejdi **vzťahy medzi organizmami** s príkladmi a pridaj príklad ekosystému (akvárium).`,

"7-1":`## Predstav si to takto
Rastlina je ako kuchár, ktorý si vie navariť cukor zo slnka (fotosyntéza). Ale aj kuchár potrebuje suroviny – soľ, korenie, vodu. Rastlina si tieto „minerálne suroviny" (živiny) naberá **koreňmi z pôdy**. Bez nich by hladovala, aj keby mala dosť svetla.

## Aké živiny rastlina potrebuje
Delíme ich podľa množstva:
- **Makroprvky** (potrebuje ich veľa): dusík (N), fosfor (P), draslík (K), vápnik (Ca), horčík (Mg), síra (S).
- **Mikroprvky / stopové prvky** (stačí maličko): železo (Fe), mangán, zinok, meď a ďalšie.

## Čo robia najdôležitejšie prvky
- **Dusík (N)** – stavebný materiál bielkovín a chlorofylu. Pri nedostatku rastlina **žltne** (nemá z čoho tvoriť zelené farbivo).
- **Fosfor (P)** – súčasť ATP (energia) a DNA.
- **Draslík (K)** – riadi otváranie prieduchov a hospodárenie s vodou.
- **Vápnik (Ca)** – spevňuje bunkové steny.
- **Horčík (Mg)** – sedí v strede molekuly chlorofylu (bez neho niet zeleného farbiva).
- **Železo (Fe)** – potrebné na tvorbu chlorofylu.

## Typy výživy rastlín
- **Autotrofná** – bežná, cez fotosyntézu (zelené rastliny).
- **Heterotrofná (mäsožravé rastliny)** – rastliny ako rosička či mucholapka rastú na chudobnej pôde (napr. v rašelinisku), kde je málo dusíka. Preto si ho doháňajú tým, že **chytajú a trávia hmyz** – z neho získajú dusík.
- **Symbiotická** – bôbovité rastliny (fazuľa, hrach) majú na koreňoch hľúzky s baktériami *Rhizobium*, ktoré vedia chytať dusík priamo zo vzduchu. Rastlina dostane dusík, baktéria cukor.

## Hnojenie
Keď v pôde chýbajú živiny, dodávame ich **hnojením**: buď **organicky** (hnoj, kompost), alebo **priemyselnými hnojivami** (NPK = dusík, fosfor, draslík).

## Slovníček po lopate
- **Makroprvok** = živina potrebná vo veľkom množstve.
- **Mikroprvok** = živina potrebná v malom množstve.
- **Autotrof** = vyrobí si potravu sám.
- **Mäsožravá rastlina** = dopĺňa si dusík z chyteného hmyzu.

## Príklad zo života
Keď izbová rastlina začne žltnúť, často jej chýba dusík alebo železo. Preto sa kvetom dáva hnojivo – je to ako vitamíny pre rastlinu. A mucholapka v kvetináči nechytá muchy „zo zlomyseľnosti", ale preto, že v pôde nemá dosť dusíka.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že rastlina berie minerálne živiny koreňmi z pôdy.
2. Rozdeľ ich na **makroprvky a mikroprvky**.
3. Opíš **funkcie kľúčových prvkov** (najmä N, Mg, Fe – súvis s chlorofylom).
4. Prejdi **typy výživy** (autotrofná, mäsožravé rastliny, symbióza s Rhizobium).
5. Spomeň **hnojenie** a pridaj príklad (žltnúca rastlina, mucholapka).`,

"7-2":`## Predstav si to takto
Toto zadanie je „odborný text" – dostaneš popis konkrétneho živočícha a máš o ňom porozprávať. Naším hrdinom je **rosnička zelená** – malá jasnozelená žabka, ktorá vie šplhať po listoch a stromoch. Je to obojživelník, teda tvor, ktorý žije časť života vo vode a časť na suchu.

## Ako vyzerá a podľa čoho ju spoznáš
- Je maličká – len **3,5 až 5 cm**.
- Má **jasnozelenú farbu chrbta**, ktorá jej slúži ako **maskovanie** (kamufláž) medzi listami, a svetlé bruško.
- Na prstoch má **priľnavé prísavky** – vďaka nim sa vie prichytiť a šplhať po listoch a konároch (iné žaby to nedokážu).
- Samce majú **hlasový mechúr**, ktorým hlasno „spievajú".

## Ako žije
- Je **nočná** – cez deň oddychuje, v noci loví.
- Živí sa **hmyzom** a inými drobnými bezstavovcami.
- Žije pri vode – pri rybníkoch, mokradiach, vlhkých lesoch.
- Cez zimu **prespáva** (hibernácia) od októbra do marca, schovaná pod lístím alebo v zemi.

## Ako sa rozmnožuje
- Na jar (máj–jún) samce hlasno volajú, aby prilákali samice.
- **Oplodnenie je vonkajšie** (vo vode) – samica nakladie vajíčka do vody.
- Z vajíčka sa vyliahne **pulec**, ktorý dýcha žiabrami ako rybka. Postupne prejde **premenou (metamorfózou)** – narastú mu nohy, zmiznú žiabre, vytvoria sa pľúca – a stane sa z neho dospelá žaba dýchajúca vzduch.

## Prečo je dôležitá
- Je **chránený druh** na Slovensku.
- Je **bioindikátor** – keďže má jemnú vlhkú kožu, je veľmi citlivá na znečistenie. Ak rosničky z oblasti zmiznú, je to varovný signál, že prostredie je znečistené.

## Slovníček po lopate
- **Obojživelník** = tvor žijúci časť života vo vode, časť na suchu.
- **Metamorfóza** = premena z larvy (pulca) na dospelca.
- **Bioindikátor** = organizmus, podľa ktorého poznáme stav prostredia.
- **Hibernácia** = zimný spánok.

## Príklad zo života
Keď v lete počuješ pri rybníku hlasné „kvákanie", často sú to práve samce rosničiek, ktoré lákajú samice. Ich miznutie po celom svete vedcov znepokojuje – je to ako keď v bani zhasne kanárik: znamenie, že s prostredím nie je niečo v poriadku.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Zaraď rosničku (obojživelník, žaba) a opíš jej **vzhľad** (veľkosť, farba, prísavky).
2. Vysvetli **kamufláž** a **prísavky** ako prispôsobenie životu na stromoch.
3. Opíš **spôsob života** (nočná, hmyzožravá, hibernácia).
4. Podrobne prejdi **rozmnožovanie a metamorfózu** (pulec → žaba, žiabre → pľúca).
5. Vysvetli, prečo je **bioindikátor** a chránený druh.`,

"8-0":`## Predstav si to takto
Červy nie sú všetky rovnaké. Pozrieme sa na dve skupiny „prvoústovcov" (volajú sa tak preto, že počas vývoja zárodku im najprv vznikajú ústa). Sú to **ploskavce** (ploské červy) a **hlístovce** (oblé červy). Hlavný rozdiel medzi nimi je obrovský evolučný skok v tráviacej sústave.

## Ploskavce – ploché ako stužka
- Telo majú **sploštené** (ako rezanec), čo im pomáha dýchať celým povrchom.
- **Nemajú telovú dutinu.**
- Delíme ich na:
  - **Voľne žijúce** – napr. *Planária*, ktorá žije v sladkej vode a má úžasnú schopnosť **regenerácie** (keď ju rozrežeš, dorastú jej chýbajúce časti).
  - **Motolice** – parazity, napr. *pečeňová motolica*, ktorá žije v pečeni oviec a má medzihostiteľa slimáka.
  - **Pásomnice** – parazity v črevách. Zaujímavosť: **nemajú vôbec žiadne črevo!** Žijú priamo v hotovej strave hostiteľa, takže živiny **vstrebávajú celým povrchom tela**. Telo majú z hlavičky s prísavkami (scolex) a článkov.

## Hlístovce – oblé ako špageta
- Telo majú **valcovité** (okrúhle v priereze).
- **Veľký prelom:** majú **priechodný tráviaci trakt** – samostatné ústa a samostatnú riť. Potrava ide jedným smerom ako po linke. Ploskavce mali len jeden otvor; toto je obrovský evolučný krok vpred.
- Parazity:
  - *škrkavka detská* – žije v tenkom čreve,
  - *mrvinček* – časté u detí,
  - *Trichinella* – spôsobuje trichinózu (usadzuje sa vo svaloch).

## Slovníček po lopate
- **Prvoústovce** = živočíchy, ktorým sa pri vývoji najprv tvoria ústa.
- **Regenerácia** = schopnosť dorásť stratené časti tela.
- **Medzihostiteľ** = organizmus, v ktorom parazit prežíva časť svojho cyklu.
- **Priechodný tráviaci trakt** = samostatné ústa a riť.

## Príklad zo života
Pásomnica môže v ľudskom čreve dorásť aj niekoľko metrov, a pritom nemá ani kúsok čreva – jednoducho „pije" už strávené živiny celým telom. Práve preto je škrkavku či pásomnicu treba liečiť, inak oberá hostiteľa o výživu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **prvoústovce**.
2. Opíš **ploskavce** – ploché telo, voľne žijúce (planária, regenerácia) aj parazity (motolice, pásomnice).
3. Zdôrazni, že pásomnica **nemá črevo** a vstrebáva povrchom.
4. Opíš **hlístovce** a hlavne **priechodný tráviaci trakt** ako evolučný skok.
5. Vymenuj **parazity** a choroby; porovnaj slepý vs. priechodný trakt.`,

"8-1":`## Predstav si to takto
Pohybová sústava má dve časti: **kosti** (pasívna časť – samé sa nehýbu) a **svaly** (aktívna časť – tie ťahajú). Predstav si bábku na nitkách: kosti sú drievka bábky a svaly sú nitky, ktoré ich ťahajú. Bez svalov by sa kostra ani nepohla.

## Z čoho sa sval skladá
Kostrový sval je **priečne pruhovaný** a ovládame ho vôľou (sami sa rozhodneme zdvihnúť ruku). Vnútri svalu sú tenké vlákna, a v nich sa striedajú dva typy bielkovín:
- **Aktín** – tenké vlákna,
- **Myozín** – hrubé vlákna.

Tieto dve bielkoviny sú kľúčom k pohybu.

## Ako sa sval stiahne (zjednodušene)
Predstav si dva hrebene, ktoré do seba zapadajú a vťahujú sa do seba:
1. Z nervu príde signál „stiahni sa".
2. V svale sa uvoľní **vápnik (Ca²⁺)**, ktorý funguje ako „štartér".
3. Myozínové hlavičky sa zachytia o aktín a **pritiahnu ho** k sebe (spotrebuje sa pritom energia ATP).
4. Vlákna sa vsunú do seba, sval sa **skráti** – to je sťah (kontrakcia).

Voláme to **teória sklzných vlákien**, lebo vlákna sa do seba zasúvajú.

## Dva typy svalových vlákien
- **Pomalé (červené)** – vydržia dlho, hodia sa na vytrvalosť (maratón). Majú veľa „elektrární" (mitochondrií).
- **Rýchle (biele)** – silné, ale rýchlo sa unavia. Hodia sa na krátky výkon (šprint, zdvih činky).

## Svaly pracujú v pároch (antagonisty)
Sval vie len ťahať, nie tlačiť. Preto pracujú v dvojiciach proti sebe:
- **Biceps** ohne ruku v lakti.
- **Triceps** ruku zase vystrie.
Jeden je „ohýbač", druhý „naťahovač" – voláme ich **antagonisty** (protihráči).

## Slovníček po lopate
- **Aktín a myozín** = bielkoviny, ktoré spôsobujú sťah svalu.
- **Kontrakcia** = stiahnutie svalu.
- **ATP** = energia potrebná na sťah.
- **Antagonisty** = dvojica svalov pracujúcich proti sebe (biceps × triceps).

## Príklad zo života
Keď zdvihneš činku, stiahne sa biceps a triceps sa uvoľní. Keď ruku vystrieš, je to naopak. Práve preto si v posilňovni cvičíš obe strany ruky – aby boli protihráči vyvážení.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Rozlíš **pasívnu (kosti)** a **aktívnu (svaly)** časť pohybovej sústavy.
2. Opíš stavbu svalu a bielkoviny **aktín a myozín**.
3. Vysvetli **mechanizmus sťahu** (signál → vápnik → sklz vlákien → skrátenie) – teóriu sklzných vlákien.
4. Porovnaj **pomalé a rýchle vlákna**.
5. Vysvetli **antagonisty** (biceps × triceps) a pridaj príklad z posilňovne.`,

"8-2":`## Predstav si to takto
List rastliny musí „dýchať" – prijímať oxid uhličitý a vypúšťať kyslík a vodnú paru. Na to slúžia maličké otvory zvané **prieduchy**. A okrem nich majú niektoré rastliny aj „vodné kohútiky" – **hydatódy**, cez ktoré vytlačia prebytočnú tekutú vodu. Tieto dve veci si často pletú, tak ich poriadne rozlíšime.

## Prieduchy (stomata) – „okná na dýchanie"
- Sú to štrbinovité otvory v pokožke listu.
- Tvoria ich dve **strážne (zatváracie) bunky** – ako dve pery, ktoré sa otvárajú a zatvárajú.
- **Ako sa otvárajú:** keď svieti slnko, strážne bunky fotosyntetizujú, nasajú do seba vodu (osmózou), napučia, vyklenú sa – a štrbina medzi nimi sa **otvorí**.
- **Kedy sa zatvárajú:** v noci, alebo keď je sucho (vtedy ich zatvorí hormón **kyselina abscisová, ABA**), aby rastlina zbytočne nestrácala vodu.
- Väčšina prieduchov je na **spodnej strane listu** – tam je chládok, takže rastlina menej vody vyparí.
- **Funkcie:** výpar vody (transpirácia), príjem CO₂ na fotosyntézu, výdaj O₂.

## Hydatódy – „vodné kohútiky"
- Sú na **okrajoch a špičkách listov**.
- Vylučujú **tekutú vodu** (nie paru) – tomuto sa hovorí **gutácia**.
- Deje sa to vtedy, keď je v pôde veľa vody a rastlina ju nestíha vyparovať (typicky ráno alebo za vlhkého počasia). Voda je pretláčaná z koreňov nahor (koreňový tlak) a musí niekde uniknúť.
- **Nedajú sa regulovať** – sú stále otvorené.

## Kľúčový rozdiel (na toto sa pýtajú)
- **Prieduchy** vypúšťajú vodu ako **paru** a vedia sa **otvárať/zatvárať** (aktívne).
- **Hydatódy** vypúšťajú vodu ako **kvapky** a sú stále otvorené (pasívne).

## Slovníček po lopate
- **Prieduch (stoma)** = otvor na výmenu plynov a paru.
- **Strážne bunky** = dve bunky, čo otvárajú/zatvárajú prieduch.
- **Gutácia** = vytláčanie tekutej vody hydatódami.
- **Transpirácia** = výpar vody z rastliny (cez prieduchy).

## Príklad zo života
Keď ráno vidíš na okrajoch listov trávy malé kvapôčky vody (a nie je to rosa), je to **gutácia** cez hydatódy – rastlina vytlačila prebytočnú vodu. A keď je horúce poludnie a rastlina vädne, často má zatvorené prieduchy, aby šetrila vodu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli **prieduchy** – stavba (strážne bunky) a funkcie.
2. Opíš **mechanizmus otvárania** (svetlo → voda → turgor → otvorenie) a zatvárania (sucho, ABA).
3. Vysvetli, prečo sú **na spodnej strane** listu.
4. Opíš **hydatódy** a **gutáciu**.
5. Zhrň **kľúčový rozdiel** (para + regulácia vs. kvapky + stále otvorené) a pridaj príklad (kvapky na tráve ráno).`,

"9-0":`## Predstav si to takto
Lišajník je úžasný príklad **spolupráce dvoch úplne odlišných organizmov**, ktoré spolu vytvoria jeden „tím" a fungujú ako jeden. Sú to **huba** a **riasa (alebo sinica)**. Sami by na holej skale neprežili, ale spolu zvládnu aj tie najdrsnejšie podmienky.

## Kto je v tíme a kto čo robí
- **Huba** – tvorí telo (sieť vlákien), drží vodu a chráni partnera. Ale sama si potravu nevyrobí.
- **Riasa/sinica** – vie **fotosyntézu**, takže vyrába cukry (potravu) pre oboch.

Tento vzťah, kde **obaja získavajú** (huba má jedlo, riasa má vodu a ochranu), sa volá **mutualizmus** (vzájomne prospešná symbióza).

## Tvary lišajníkov
- **Korovité** – prilepené na skale či kôre tak pevne, že sa nedajú odlúpnuť.
- **Listovité** – voľnejšie, dajú sa odlúpnuť (vyzerajú ako lístočky).
- **Kríčkovité** – vetvené, vzpriamené (napr. sobí mach).

## Prečo sú dôležité
- **Priekopníci (pionierske organizmy)** – ako prví osídľujú holé skaly, kde nič iné nerastie. Pomaly rozkladajú kameň a vytvárajú **prvú pôdu**, do ktorej potom môžu prísť rastliny.
- **Bioindikátory čistoty vzduchu** – sú veľmi citlivé na znečistenie (najmä oxid siričitý). Ak v meste nerastú lišajníky, je to znak, že vzduch je špinavý. Na čistom vidieku ich nájdeš všade.
- **Potrava** – sobí mach je hlavnou potravou sobov v zime.
- **Využitie** – z lišajníkov sa získava lakmus (indikátor pH) a látky do liekov a parfumov.

## Slovníček po lopate
- **Symbióza/mutualizmus** = spolužitie, z ktorého majú prospech obaja.
- **Mykobiont** = hubová zložka lišajníka.
- **Fotobiont** = riasa/sinica (fotosyntetická zložka).
- **Pionier** = organizmus, ktorý ako prvý osídli holé miesto.
- **Bioindikátor** = organizmus prezrádzajúci stav prostredia.

## Príklad zo života
Všimni si stromy a kamene na vidieku – často sú obrastené lišajníkmi. V centre veľkého mesta ich takmer nenájdeš. Práve preto vedci podľa lišajníkov merajú, ako čistý je vzduch v danej oblasti.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že lišajník = huba + riasa/sinica.
2. Opíš, **kto čo robí** a že ide o **mutualizmus**.
3. Vymenuj **tvary** (korovité, listovité, kríčkovité).
4. Vysvetli, prečo sú **pionieri** (tvorba pôdy) a **bioindikátory** (čistota vzduchu).
5. Spomeň **využitie** (sobí mach, lakmus) a pridaj príklad (mesto vs. vidiek).`,

"9-1":`## Predstav si to takto
Kostra je **stavebné lešenie tela** – dáva mu tvar, drží orgány a chráni ich (lebka chráni mozog, rebrá srdce a pľúca). Človek má vyše 200 kostí. Rozdelíme ich na **osovú kostru** (stred tela) a **kostru končatín** (ruky a nohy).

## Osová kostra (stred tela)
- **Lebka** – chráni mozog; má mozgovú časť a tvárovú časť.
- **Chrbtica** – „stĺp" tela z 33–34 stavcov, rozdelených na úseky:
  - 7 **krčných**, 12 **hrudných**, 5 **driekových**, 5 zrastených **krížových**, 4–5 **kostrčových**.
  - (Pomôcka: 7-12-5 ako ráno o 7, obed o 12, večera o 5.)
- **Rebrá** – 12 párov; chránia srdce a pľúca. Vpredu sa väčšina pripája na **hrudnú kosť**.

## Kostra končatín
- **Horná končatina:** kľúčna kosť + lopatka → ramenná kosť → vretenná + lakťová kosť → kosti zápästia → záprstia → články prstov.
- **Dolná končatina:** panva → stehenná kosť (najdlhšia v tele) → píšťala + ihlica → kosti priehlavku → články prstov.

## Z čoho je kosť
- **Okostica (periost)** – tenký obal navrchu; vyživuje kosť a stará sa o hojenie.
- **Kompaktné tkanivo** – tvrdá, pevná vonkajšia vrstva.
- **Hubovité tkanivo** – ľahká „špongiová" mriežka vnútri (pevná, ale ľahká).
- **Kostná dreň** – vnútri; **červená** tvorí krvinky, **žltá** je tukové zásoby.

## Kĺby
Tam, kde sa kosti stretávajú a majú sa hýbať, je **kĺb**: hlavica jednej kosti zapadá do jamky druhej, celé je to v puzdre s klzkou tekutinou (aby to „nevŕzgalo").

## Slovníček po lopate
- **Osová kostra** = lebka, chrbtica, rebrá.
- **Stavec** = jedna kosť chrbtice.
- **Okostica** = obal kosti, ktorý ju vyživuje a hojí.
- **Kostná dreň** = vnútro kosti; červená tvorí krv.

## Príklad zo života
Keď si zlomíš kosť, hojí sa práve vďaka **okostici**, ktorá tvorí nové kostné bunky. A keď daruješ kostnú dreň, pomáhaš niekomu, komu telo nevie tvoriť krvinky – lebo červená dreň je „továreň na krv".

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli funkcie kostry (opora, ochrana, tvar).
2. Opíš **osovú kostru** – lebka, chrbtica (počty stavcov!), rebrá.
3. Vymenuj **kosti končatín** v správnom poradí.
4. Opíš **stavbu kosti** (okostica, kompaktné a hubovité tkanivo, dreň).
5. Vysvetli **kĺb** a pridaj príklad (hojenie zlomeniny, darovanie drene).`,

"9-2":`## Predstav si to takto
Srdce je pumpa, ktorá tlačí krv do ciev. A **krvný tlak** je sila, ktorou krv tlačí na steny ciev – ako tlak vody v záhradnej hadici. Meriame ho v jednotkách **mmHg** a zapisujeme dvomi číslami, napríklad **120/80**.

## Čo znamenajú tie dve čísla
- **Horné číslo (systolický tlak, ~120)** – tlak vo chvíli, keď sa srdce **stiahne** a vystrelí krv (systola). Je vyšší.
- **Dolné číslo (diastolický tlak, ~80)** – tlak vo chvíli, keď srdce **oddychuje** medzi údermi (diastola). Je nižší.

Takže 120/80 znamená: pri stiahnutí tlak 120, pri oddychu 80.

## Aké hodnoty sú normálne
- **Optimálny:** menej ako 120/80.
- **Vysoký tlak (hypertenzia):** 140/90 a viac – dlhodobo nebezpečný.
- **Nízky tlak (hypotenzia):** menej ako 90/60 – môže spôsobiť závrat.

## Ako sa tlak meria (tlakomer)
1. Na rameno sa nasadí **manžeta** a nafúkne sa, až stlačí tepnu (krv chvíľu neprúdi).
2. Vzduch sa pomaly vypúšťa.
3. Stetoskopom počúvame **Korotkovove zvuky**: keď krv prvýkrát „prerazí" – to je **systolický** tlak; keď zvuky zmiznú – to je **diastolický** tlak.
4. Digitálne tlakomery to zmerajú automaticky.

## Čo tlak zvyšuje a znižuje
- **Zvyšujú:** stres, soľ, alkohol, fajčenie, nadváha, vek, nedostatok pohybu.
- **Znižujú:** pravidelný pohyb, zdravá strava, normálna hmotnosť.

## Slovníček po lopate
- **Systolický tlak** = pri stiahnutí srdca (horné číslo).
- **Diastolický tlak** = pri oddychu srdca (dolné číslo).
- **Hypertenzia** = vysoký tlak; **hypotenzia** = nízky tlak.
- **mmHg** = jednotka tlaku.

## Príklad zo života
Vysoký tlak sa volá „tichý zabijak", lebo dlho nebolí, no potichu poškodzuje srdce, obličky aj mozog. Preto si ho dospelí pravidelne merajú – aby problém zachytili skôr, než narobí škodu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je krvný tlak (sila krvi na steny ciev).
2. Vysvetli **systolický a diastolický** tlak (stiahnutie vs. oddych) a zápis 120/80.
3. Uveď **normálne hodnoty** a čo je hyper-/hypotenzia.
4. Opíš **postup merania** tlakomerom (manžeta, Korotkovove zvuky).
5. Vymenuj **faktory** a pridaj príklad („tichý zabijak", prevencia).`,

"10-0":`## Predstav si to takto
Tráviaca sústava je ako **dlhá výrobná linka**, ktorá rozoberie jedlo na maličké kúsky, aby ich telo vedelo vstrebať a využiť. Potrava putuje jedným smerom: ústa → pažerák → žalúdok → tenké črevo → hrubé črevo → von. Po ceste ju spracúvajú rôzne „stanice" a „chemikálie" (enzýmy).

## Cesta potravy krok za krokom
- **Ústna dutina** – zuby jedlo rozdrvia, jazyk ho mieša a sliny obsahujú enzým **amylázu**, ktorý už tu začína štiepiť škrob. (Preto chlieb po chvíli žuvania zosladne.)
- **Hltan a pažerák** – „chodba", ktorá vlnovitými pohybmi (peristaltika) tlačí sústo do žalúdka.
- **Žalúdok** – obsahuje **kyselinu chlorovodíkovú (HCl)**, ktorá zničí baktérie a pripraví bielkoviny, a enzým **pepsín**, ktorý bielkoviny štiepi. Sliznica sa pred kyselinou chráni hlienom.
- **Tenké črevo (6–7 m)** – tu sa odohráva väčšina trávenia a vstrebávania:
  - Do dvanástnika prichádza **žlč** (z pečene, rozbíja tuky na kvapôčky) a **pankreatická šťava** (enzýmy na tuky, bielkoviny aj škrob).
  - Stena čreva je pokrytá miliónmi výbežkov – **klkov** – ktoré obrovsky zväčšujú plochu, takže sa vstrebe čo najviac živín do krvi.
- **Hrubé črevo** – vstrebáva sa voda, formuje sa stolica a žijú tu **prospešné baktérie**, ktoré tvoria napr. vitamín K.
- **Konečník** – odchod nestrávených zvyškov.

## Pečeň – chemická továreň tela
Pečeň tvorí **žlč**, **odbúrava jedy** (detoxikácia), skladuje cukor vo forme glykogénu a vyrába dôležité bielkoviny krvi.

## Slovníček po lopate
- **Enzým** = bielkovina, ktorá urýchľuje štiepenie potravy (amyláza, pepsín, lipáza).
- **Peristaltika** = vlnovité sťahy, ktoré posúvajú potravu.
- **Klky** = výbežky tenkého čreva, ktoré zväčšujú vstrebávaciu plochu.
- **Žlč** = tekutina z pečene, ktorá rozbíja tuky.

## Príklad zo života
Keď dlho žuješ kúsok rožka, začne chutiť sladko. Prečo? Lebo slinná amyláza rozštiepila škrob na jednoduchý cukor. To je dôkaz, že trávenie začína už v ústach.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav tráviacu sústavu ako výrobnú linku a vymenuj jej časti.
2. Prejdi **cestu potravy** s enzýmami (ústa – amyláza, žalúdok – HCl a pepsín, tenké črevo – žlč a pankreatické enzýmy).
3. Zdôrazni funkciu **klkov** (zväčšenie plochy).
4. Opíš **hrubé črevo** (voda, baktérie, vitamíny).
5. Vysvetli úlohu **pečene a pankreasu**; pridaj príklad (sladnúci rožok).`,

"10-1":`## Predstav si to takto
Fotosyntéza je **najdôležitejší proces na Zemi** – rastliny pri ňom premieňajú slnečné svetlo na potravu (cukor) a pritom vyrábajú kyslík, ktorý dýchame. Predstav si list ako maličkú **solárnu kuchyňu**: vezme svetlo, vodu a oxid uhličitý, a vyrobí z toho cukor a kyslík.

## Súhrnná rovnica (toto si zapamätaj)
**6 CO₂ + 6 H₂O + svetlo → C₆H₁₂O₆ (glukóza) + 6 O₂**

Teda: oxid uhličitý + voda + svetlo → cukor + kyslík. Prebieha v **chloroplastoch** (zelených organelách) za pomoci farbiva **chlorofylu**.

## Dve fázy fotosyntézy
**1. Svetelná fáza** (potrebuje svetlo, prebieha v tylakoidoch):
- Chlorofyl zachytí svetlo.
- Nastane **fotolýza vody** – voda sa rozbije a uvoľní sa **kyslík (O₂)**. Pozor: kyslík pochádza z **vody**, nie z CO₂!
- Vyrobí sa energia (ATP) a „prenášač" NADPH pre druhú fázu.

**2. Temnostná fáza / Calvinov cyklus** (svetlo priamo nepotrebuje, prebieha v stróme):
- Pomocou energie z prvej fázy sa **oxid uhličitý (CO₂)** poskladá do **cukru (glukózy)**.
- Kľúčový enzým sa volá **RuBisCO**.

Jednoducho: prvá fáza vyrobí energiu a kyslík zo svetla a vody; druhá fáza z tej energie a z CO₂ poskladá cukor.

## Čo fotosyntézu ovplyvňuje
Intenzita svetla, množstvo CO₂, teplota (najlepšie okolo 25 °C) a dostatok vody. Chlorofyl pohlcuje červené a modré svetlo, a zelené odráža – **preto sú rastliny zelené**.

## Slovníček po lopate
- **Chloroplast** = organela, kde prebieha fotosyntéza.
- **Chlorofyl** = zelené farbivo, ktoré zachytáva svetlo.
- **Fotolýza vody** = rozbitie vody, pri ktorom vzniká kyslík.
- **Calvinov cyklus** = temnostná fáza, kde z CO₂ vzniká cukor.

## Príklad zo života
Vďaka fotosyntéze stromov a rias máme kyslík na dýchanie – preto sa pralesy a oceány volajú „pľúca planéty". Každý nádych, ktorý urobíš, je darom od fotosyntetizujúcich organizmov.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli význam fotosyntézy (potrava + kyslík) a napíš **súhrnnú rovnicu**.
2. Povedz, kde prebieha (chloroplast, chlorofyl).
3. Opíš **svetelnú fázu** (fotolýza vody → kyslík, ATP, NADPH) – zdôrazni, že O₂ je z vody.
4. Opíš **temnostnú fázu** (z CO₂ vzniká glukóza, enzým RuBisCO).
5. Vymenuj **faktory** a vysvetli, prečo sú rastliny zelené; pridaj príklad („pľúca planéty").`,

"10-2":`## Predstav si to takto
Toto praktikum je o tom, čo všetko vieš v rastlinnej bunke uvidieť pod **bežným školským (svetelným) mikroskopom**. Nie všetko – tie najmenšie časti vidno len pod elektrónovým mikroskopom – ale tie väčšie a farebné „orgániky bunky" (organely) áno.

## Čo v bunke uvidíš
- **Chloroplasty** – malé **zelené** guľôčky; sú v listoch a robia fotosyntézu. Krásne sa pozorujú v lístku vodnej rastliny *elodey*.
- **Chromoplasty** – **žlté, oranžové, červené** plastidy; sú v plodoch a kvetoch (mrkva, paprika). Dávajú im farbu.
- **Amyloplasty** – **bezfarebné** zásobné plastidy plné škrobu; nájdeš ich v zemiaku.
- **Centrálna vakuola** – veľký priehľadný „mech" s vodou, ktorý tlačí ostatný obsah bunky k okraju.
- **Bunková stena** – pevná hranica okolo bunky (vidno ju ako jasný okraj).
- **Jadro** – riadiace centrum; dobre ho vidno po **zafarbení**.

## Postup pozorovania
1. Priprav tenký rez alebo zoškrab tenkú vrstvičku pletiva (napr. lístok elodey, šupku cibule, kúsok mrkvy).
2. Polož na sklíčko do kvapky vody a prikry krycím sklíčkom.
3. Pozoruj pri zväčšení 100–400×.
4. Nakresli a popíš, čo vidíš.

## Slovníček po lopate
- **Organela** = „orgánik" vo vnútri bunky s určitou úlohou.
- **Plastid** = skupina organel (chloroplast, chromoplast, amyloplast).
- **Vakuola** = veľký mech s vodou v rastlinnej bunke.
- **Svetelný mikroskop** = bežný školský mikroskop.

## Príklad zo života
Prečo je mrkva oranžová a list zelený? Lebo mrkva má **chromoplasty** (oranžové) a list **chloroplasty** (zelené). Pod mikroskopom tieto farebné guľôčky priamo uvidíš – farba zeleniny teda nie je náhoda, ale práca konkrétnych organel.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že svetelný mikroskop ukáže len väčšie organely.
2. Opíš **plastidy** (chloro-, chromo-, amyloplasty) a ich farby/funkcie.
3. Spomeň **vakuolu, bunkovú stenu a jadro**.
4. Prejdi **postup** prípravy a pozorovania.
5. Zdôrazni, čo už svetelný mikroskop **neukáže** (membrány, ribozómy – tie len elektrónový); pridaj príklad (farba mrkvy vs. listu).`,

"11-0":`## Predstav si to takto
Každý živočích potrebuje **kyslík** a potrebuje sa zbaviť **oxidu uhličitého**. Spôsob, akým to robí (dýchanie), sa počas vývoja zvierat postupne zdokonaľoval – od jednoduchého „cez celú kožu" až po dokonalé pľúca cicavcov a vtákov. Poďme tou cestou.

## Vývoj dýchania od jednoduchého k dokonalému
- **Jednobunkovce, pŕhlivce, ploskavce:** dýchajú **celým povrchom tela** (difúziou). Funguje to len preto, že sú malé alebo ploché.
- **Obrúčavce (dážďovka):** **kožné dýchanie** – cez vlhkú kožu s množstvom vlásočníc. Preto dážďovka po daždi vylieza – v zaliatej zemi by sa udusila.
- **Článkonožce:** vodné (raky) majú **žiabre**; suchozemský hmyz má **vzdušnice (trachey)** – sieť trubičiek, ktoré privedú vzduch priamo k bunkám.
- **Ryby:** **žiabre** – krásne prispôsobenie: voda a krv tečú proti sebe, takže ryba získa z vody maximum kyslíka.
- **Obojživelníky:** pulec má žiabre, dospelá žaba **pľúca + kožu** (preto musí mať kožu vlhkú).
- **Plazy:** jednoduché **pľúca** (môžu žiť úplne na suchu).
- **Vtáky:** pľúca + **vzduchové vaky** – vzduch preteká pľúcami stále jedným smerom, takže majú vždy čerstvý kyslík. Toto je najefektívnejšie dýchanie – potrebujú ho na náročný let.
- **Cicavce:** pľúca s miliónmi mechúrikov – **alveol**. U človeka majú dohromady plochu asi ako tenisový kurt (~70 m²), aby sa vstrebalo dosť kyslíka.

## Kľúčové evolučné skoky
1. Žiabre (ryby), 2. pľúca (obojživelníky a vyššie), 3. vzduchové vaky vtákov, 4. alveoly cicavcov.

## Slovníček po lopate
- **Difúzia** = samovoľný prechod plynu cez povrch.
- **Žiabre** = orgán na dýchanie vo vode.
- **Vzdušnice (trachey)** = sieť trubičiek na dýchanie u hmyzu.
- **Alveoly** = pľúcne mechúriky, kde sa vymieňajú plyny.

## Príklad zo života
Prečo nemôže byť hmyz veľký ako pes? Lebo dýcha vzdušnicami, ktoré privádzajú vzduch len na krátku vzdialenosť – pri veľkom tele by sa vnútorné bunky neudusili kyslíkom. Preto je veľkosť hmyzu obmedzená spôsobom dýchania.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, načo slúži dýchanie (kyslík dnu, CO₂ von).
2. Prejdi vývoj: povrch tela → kožné dýchanie → žiabre/vzdušnice → pľúca.
3. Zdôrazni **vzduchové vaky vtákov** (jednosmerný prúd) a **alveoly cicavcov** (obrovská plocha).
4. Vysvetli, prečo kožné dýchanie nestačí veľkým zvieratám.
5. Pridaj príklad (prečo nie je obrí hmyz).`,

"11-1":`## Predstav si to takto
Kvet je **rozmnožovací orgán** rastliny – jeho úlohou je vytvoriť semená. Predstav si ho ako dobre zariadenú „svadobnú sálu": má ozdoby na prilákanie hostí (opeľovačov), mužskú časť (peľ) aj ženskú časť (vajíčka).

## Časti kvetu (zvonka dnu)
- **Kvetné lôžko** – „základňa", na ktorej všetko stojí.
- **Kalich** – zelené lístky vonku; chránia puk, kým sa kvet neotvorí.
- **Koruna** – farebné lupienky; ich úlohou je **lákať opeľovače** (včely, motýle) farbou a vôňou.
- **Tyčinky** – **mužská** časť; na konci majú peľnicu plnú **peľu** (peľ = mužské pohlavné bunky).
- **Piestik** – **ženská** časť; má bliznu (na ňu dosadne peľ), čnelku a dole **semenník** s vajíčkami.

## Nahosemenné vs. krytosemenné
- **Krytosemenné** majú pravý kvet a semená skryté v plode.
- **Nahosemenné** (ihličnany) nemajú pravé kvety, ale **šišky** – a ich semená sú „nahé" (nie sú uzavreté v plode).

## Typy kvetov
- **Obojpohlavný** – má tyčinky aj piestik (väčšina kvetov).
- **Jednopohlavný** – len mužský alebo len ženský.
- **Pravidelný** – súmerný do všetkých strán (tulipán, ruža).
- **Nepravidelný** – súmerný len cez jednu os (fialka, šalvia).

## Súkvetia (keď je kvetov veľa pokope)
Niektoré rastliny nemajú jeden kvet, ale celé zoskupenie – **súkvetie**:
- **Klas** – kvety bez stopiek na osi (pšenica).
- **Okolík** – stopky vychádzajú z jedného bodu do roviny (mrkva, kôpor).
- **Úbor** – množstvo drobných kvetov na plochom lôžku (slnečnica, sedmokráska – to, čo vyzerá ako jeden kvet, je v skutočnosti stovky kvietkov!).
- **Hrozno** a **lata** – kvety na vetviacej sa osi.

## Slovníček po lopate
- **Tyčinka** = mužská časť kvetu (tvorí peľ).
- **Piestik** = ženská časť kvetu (obsahuje vajíčka).
- **Blizna** = vrchol piestika, kam dosadá peľ.
- **Súkvetie** = skupina viacerých kvetov pokope.

## Príklad zo života
To, čo považuješ za „jeden kvet" slnečnice, je v skutočnosti **úbor** – stovky drobných kvietkov natlačených na jednom lôžku. Každé slnečnicové semienko vzniklo z jedného takého kvietka. Preto je z jednej slnečnice toľko semien.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že kvet je rozmnožovací orgán.
2. Opíš **časti kvetu** zvonka dnu (kalich, koruna, tyčinky, piestik) a kto je mužský/ženský.
3. Rozlíš **krytosemenné (kvet) a nahosemenné (šišky)**.
4. Vymenuj **typy kvetov** (obojpohlavný/jednopohlavný, pravidelný/nepravidelný).
5. Opíš **súkvetia** s príkladmi a pridaj príklad (slnečnica = úbor).`,

"11-2":`## Predstav si to takto
Toto praktikum skúma **dýchanie** – koľkokrát za minútu sa nadýchneš, koľko vzduchu sa zmestí do pľúc a ako dlho vydržíš bez dychu. A hlavne, ako sa to zmení po námahe.

## Frekvencia dýchania
Je to **počet dychov za minútu** (jeden dych = nádych + výdych). V pokoji má dospelý človek **12–20 dychov za minútu**, dieťa viac (20–30). Keď behaš, frekvencia stúpne, lebo svaly potrebujú viac kyslíka.

## Koľko vzduchu sa zmestí do pľúc (objemy)
- **Dychový objem** – vzduch pri bežnom pokojnom dýchaní (~0,5 litra).
- **Vitálna kapacita** – najviac vzduchu, koľko vieš vydýchnuť po najhlbšom nádychu (~4,5 litra).
- **Reziduálny objem** – vzduch, ktorý v pľúcach zostane stále (nikdy ich úplne nevyprázdniš), aby nesplaskli.

## Apnoická pauza
**Apnoe** znamená zadržanie dychu. Test: po normálnom **výdychu** zadržíš dych a meriaš, ako dlho vydržíš. Bežne to je **30–40 sekúnd**, trénovaní plavci aj minútu a viac.

## Postup praktika
1. V pokoji spočítaj svoje dychy za 1 minútu.
2. Sprav 30 drepov za 45 sekúnd.
3. Hneď znova spočítaj dychy – uvidíš, že frekvencia stúpla.
4. Zmeraj svoju apnoickú pauzu.
5. Porovnaj výsledky so spolužiakmi a s normami.

## Dôležitý fakt
Dýchanie riadi predovšetkým hladina **oxidu uhličitého (CO₂)** v krvi, nie nedostatok kyslíka. Keď CO₂ stúpne, mozog ti dá povel „nadýchni sa". Práve preto pri zadržaní dychu cítiš nutkanie nadýchnuť sa skôr kvôli hromadeniu CO₂ než kvôli nedostatku kyslíka.

## Slovníček po lopate
- **Frekvencia dýchania** = počet dychov za minútu.
- **Vitálna kapacita** = najväčší možný výdych po najhlbšom nádychu.
- **Apnoe** = zadržanie dychu.
- **Reziduálny objem** = vzduch, ktorý zostane v pľúcach vždy.

## Príklad zo života
Trénovaný športovec dýcha v pokoji pomalšie a po námahe sa rýchlejšie „dá dokopy" než netrénovaný človek. Práve preto je frekvencia dýchania dobrým ukazovateľom kondície.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli **frekvenciu dýchania** a normálne hodnoty.
2. Opíš základné **pľúcne objemy** (dychový, vitálna kapacita, reziduálny).
3. Vysvetli **apnoickú pauzu** a ako sa meria.
4. Prejdi **postup praktika** (pokoj → drepy → znova meranie).
5. Zdôrazni, že dýchanie riadi **CO₂**; pridaj príklad (kondícia športovca).`,

"12-0":`## Predstav si to takto
Telo potrebuje, aby spolu jeho časti „komunikovali". Jedna cesta sú nervy (rýchle, ako telefonát). Druhá cesta sú **hormóny** – chemické odkazy, ktoré sa vypustia do krvi a tá ich roznesie po tele (pomalšie, ale na diaľku, ako poslaný list). Hormóny vyrábajú **žľazy s vnútornou sekréciou** (endokrinné žľazy) a každý hormón pôsobí len na tie bunky, ktoré naň majú „zámok" (receptor).

## Hlavné žľazy a čo riadia
- **Hypofýza (podvesok mozgový)** – „dirigent" celého orchestra. Riadi ostatné žľazy. Vyrába rastový hormón (GH), hormóny pre štítnu žľazu (TSH), pre pohlavné žľazy (FSH, LH) a ďalšie. Jej zadná časť vylučuje **ADH** (zadržiava vodu v obličkách) a **oxytocín** (sťahy maternice pri pôrode).
- **Štítna žľaza** – vyrába **tyroxín**, ktorý riadi rýchlosť metabolizmu (ako „plynový pedál" tela). Pri nedostatku jódu sa zväčší (struma).
- **Nadobličky** – ich dreň vyrába **adrenalín**, hormón stresu („boj alebo útek") – zrýchli srdce, rozšíri zreničky, pripraví telo na akciu.
- **Pankreas** – riadi cukor v krvi dvomi protichodnými hormónmi:
  - **Inzulín** – cukor (glukózu) **znižuje** (vpúšťa ho z krvi do buniek).
  - **Glukagón** – cukor **zvyšuje** (uvoľní zásoby).
- **Pohlavné žľazy** – testosterón (semenníky), estrogén a progesterón (vaječníky).

## Inzulín a glukagón – dokonalí protihráči
Predstav si ich ako termostat na cukor:
- Po jedle cukor stúpne → pankreas pustí **inzulín** → cukor sa schová do buniek → hladina klesne.
- Keď máš hlad a cukor klesá → pankreas pustí **glukagón** → uvoľní zásoby → hladina stúpne.
Keď inzulín nefunguje, vzniká **cukrovka (diabetes)**.

## Slovníček po lopate
- **Hormón** = chemický odkaz roznášaný krvou.
- **Endokrinná žľaza** = žľaza, ktorá vylučuje hormóny do krvi.
- **Inzulín** = znižuje cukor v krvi; **glukagón** = zvyšuje ho.
- **Adrenalín** = hormón stresu.

## Príklad zo života
Keď ťa niečo zľakne, srdce sa rozbúši, máš „motýle v bruchu" a si pripravený utekať. To je **adrenalín** z nadobličiek v akcii – telo sa v zlomku sekundy pripravilo na nebezpečenstvo.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo sú hormóny a ako sa líšia od nervovej sústavy (krv vs. nervy, pomalé vs. rýchle).
2. Predstav **hypofýzu** ako riadiacu žľazu.
3. Prejdi **hlavné žľazy** (štítna, nadobličky, pankreas, pohlavné) a ich hormóny.
4. Podrobne vysvetli **inzulín vs. glukagón** (termostat na cukor) a spomeň cukrovku.
5. Opíš **adrenalín** (boj/útek) a pridaj príklad (zľaknutie).`,

"12-1":`## Predstav si to takto
Článkonožce sú **najúspešnejšia skupina živočíchov na Zemi** – patrí sem hmyz, pavúky, raky aj stonožky. Spoznáš ich podľa toho, že majú **článkované telo aj nohy** (akoby boli poskladané z dielikov) a tvrdý **vonkajší pancier** (exoskelet) z chitínu. Aby mohli rásť, musia ten pancier zhodiť a vytvoriť si nový – to sa volá zvliekanie.

## Štyri hlavné skupiny (rozlíšiš ich podľa nôh a tykadiel)
- **Kôrovce** (rak, krab, kreveta): žijú väčšinou vo vode, dýchajú **žiabrami**, majú **2 páry tykadiel**.
- **Pavúkovce** (pavúk, škorpión, kliešť): majú **4 páry nôh** a **žiadne tykadlá**. Patrí sem **kliešť**, ktorý prenáša boreliózu a kliešťovú encefalitídu.
- **Stonožky a mnohonôžky**: dlhé telo s množstvom článkov a nôh.
- **Hmyz** (chrobák, motýľ, včela, mucha): **3 páry nôh (6 nôh)**, telo z 3 častí (hlava, hruď, bruško), zvyčajne **2 páry krídel** a **1 pár tykadiel**. Dýcha **vzdušnicami**.

## Premena hmyzu (metamorfóza)
Hmyz počas života mení podobu, a to dvoma spôsobmi:
- **Úplná premena:** vajce → larva (húsenica) → kukla → dospelec. Larva vyzerá úplne inak než dospelec. (motýľ, chrobák, mucha, včela)
- **Neúplná premena:** vajce → nymfa → dospelec. Nymfa už vyzerá ako malý dospelec, len bez krídel. (koník, šváb)

## Slovníček po lopate
- **Exoskelet** = vonkajšia kostra (pancier) z chitínu.
- **Zvliekanie** = zhodenie panciera, aby živočích mohol rásť.
- **Úplná premena** = s kuklou (larva ≠ dospelec).
- **Neúplná premena** = bez kukly (nymfa ≈ malý dospelec).

## Príklad zo života
Húsenica a motýľ sú to isté zviera v rôznych štádiách úplnej premeny – húsenica sa zakuklí a vyletí z nej motýľ. A keď nájdeš na pse prisatého kliešťa, máš dočinenia s pavúkovcom, ktorý môže preniesť nebezpečnú chorobu – preto sa kliešť odstraňuje čo najskôr.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vymenuj **spoločné znaky** článkonožcov (články, exoskelet, zvliekanie).
2. Prejdi **4 skupiny** a rozlíš ich podľa **nôh a tykadiel**.
3. Pri hmyze zdôrazni **6 nôh a 3 časti tela**.
4. Vysvetli **úplnú vs. neúplnú premenu** s príkladmi.
5. Spomeň **kliešť ako prenášač chorôb** a pridaj príklad (húsenica → motýľ).`,

"12-2":`## Predstav si to takto
Kvetný vzorec je **skratkový zápis kvetu** – niečo ako chemický vzorec, ale pre kvet. Namiesto dlhého opisu „má 5 kališných lístkov, 5 lupienkov…" sa použijú písmená a čísla. Botanik si tak vie z pár znakov prečítať stavbu celého kvetu.

## Čo znamenajú písmená
Každá časť kvetu má svoje písmeno:
- **K** = kalich (zelené lístky)
- **C** = koruna (farebné lupienky)
- **A** = tyčinky (mužská časť)
- **G** = piestik (ženská časť)
- **P** = okvetie (keď kalich a koruna nie sú rozlíšené, napr. tulipán)

Číslo za písmenom hovorí, **koľko** ich je. Zátvorka znamená, že sú **zrastené**. Symbol ⊕ značí pravidelný kvet, ↕ nepravidelný.

## Príklady (prečítaj kvet ako vetu)
- **Ruža:** ⊕ K5 C5 A∞ G∞ → pravidelná, 5 kališných lístkov, 5 lupienkov, veľa tyčiniek, veľa piestikov.
- **Tulipán:** ⊕ P(3+3) A(3+3) G(3) → pravidelný, okvetie 6 lístkov v dvoch kruhoch, 6 tyčiniek, 3 zrastené plodolisty.
- **Šalvia:** ↕ K(5) C(2+3) A2 → nepravidelná, zrastený kalich, len 2 tyčinky.

## Kvetný diagram
Je to **obrázok prierezu kvetom zhora** – krúžky a značky ukazujú, koľko častí kvet má a ako sú rozmiestnené dokola. Vzorec to povie slovami/číslami, diagram to ukáže obrázkom.

## Slovníček po lopate
- **Kvetný vzorec** = zápis stavby kvetu písmenami a číslami.
- **Kvetný diagram** = obrázok prierezu kvetom.
- **Pravidelný (⊕)** = súmerný do všetkých strán.
- **Nepravidelný (↕)** = súmerný len cez jednu os.

## Príklad zo života
Je to ako recept v skratke: namiesto „vezmi 3 vajcia, 2 hrnčeky múky…" napíšeš „3v 2m". Botanik z kvetného vzorca okamžite „uvarí" v hlave obraz celého kvetu bez toho, aby ho videl.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je kvetný vzorec a načo slúži (skratkový zápis).
2. Prejdi **písmená** (K, C, A, G, P) a čo znamenajú čísla a zátvorky.
3. Vysvetli symboly **⊕ a ↕** (pravidelný/nepravidelný).
4. **Prečítaj alebo zostav vzorec** pre konkrétnu rastlinu (ruža, tulipán).
5. Rozlíš **vzorec vs. diagram** a pridaj príklad (recept v skratke).`,

"13-0":`## Predstav si to takto
Telo nie je len kopa rovnakých buniek – bunky sú špecializované a tie, čo robia spolu jednu prácu, tvoria **tkanivo**. Je to ako v meste, kde sa ľudia s rovnakým povolaním združujú: hasiči v jednej stanici, pekári v pekárni. U živočíchov máme **štyri základné typy tkanív**.

## Štyri základné tkanivá
- **Epitelové tkanivo (epitel)** – „obkladačky tela". Pokrýva povrch a vystiela dutiny (kožu, vnútro čreva, ciev). Bunky sú tesne pri sebe, takže tvoria ochranný obal. Funkcie: ochrana, vstrebávanie, vylučovanie.
- **Väzivové tkanivo** – „spojivo a výplň". Má veľa medzibunkovej hmoty. Patria sem prekvapivo rôzne veci: voľné väzivo, **tukové tkanivo**, **chrupka**, **kosť** a dokonca aj **krv** (tekuté väzivo!).
- **Svalové tkanivo** – „motor", zabezpečuje pohyb. Vie sa sťahovať.
- **Nervové tkanivo** – „elektrické vedenie", prenáša signály. Tvoria ho **neuróny**.

## Tri druhy svalového tkaniva (toto sa pýtajú)
- **Priečne pruhované (kostrové)** – ovládame ho **vôľou** (ruky, nohy). Rýchle, ale rýchlo sa unaví.
- **Hladké** – ovláda sa **bez vôle** (steny čriev, ciev, maternice). Pomalé, ale vytrvalé – nikdy si neoddýchne.
- **Srdcové** – je priečne pruhované (ako kostrové), ale pracuje **bez vôle** a neúnavne celý život.

## Stavba neurónu
Neurón (nervová bunka) má: **telo** (s jadrom), **dendrity** (krátke výbežky, ktoré prijímajú signály) a jeden dlhý **axón** (vedie signál ďalej). Pomáhajú mu gliové bunky (výživa, ochrana, izolácia).

## Slovníček po lopate
- **Tkanivo** = skupina buniek s rovnakou úlohou.
- **Epitel** = krycie/vystieľacie tkanivo.
- **Neurón** = nervová bunka.
- **Hladký sval** = sval ovládaný bez vôle.

## Príklad zo života
Tvoje srdce bije celý život bez prestávky a nikdy ti „neochabne" únavou – to je vďaka jedinečnému srdcovému svalu. Naopak, biceps po pár minútach držania činky vypovie službu, lebo kostrový sval sa rýchlo unaví.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **tkanivo** a vymenuj **4 základné typy**.
2. Opíš **epitel** (ochrana, vystielanie) a **väzivo** (vrátane krvi a kosti ako prekvapenia).
3. Podrobne prejdi **3 druhy svalového tkaniva** (vôľa/bez vôle).
4. Opíš **stavbu neurónu** (telo, dendrity, axón).
5. Pridaj príklad (srdcový sval vs. biceps).`,

"13-1":`## Predstav si to takto
Bunka nežije večne – narastie, zdvojí svoj obsah a rozdelí sa na dve nové bunky. Tento opakujúci sa kolobeh „naroď sa → rozrasti → rozdeľ sa" je **bunkový cyklus**. Predstav si to ako prípravu a samotné rozdelenie jedného koláča na dva rovnaké.

## Dve hlavné časti cyklu
**1. Interfáza** – príprava (trvá najdlhšie, asi 90 % času). Delí sa na:
- **G₁** – bunka rastie, vyrába bielkoviny.
- **S** – **zdvojí sa DNA** (aby každá nová bunka dostala kompletnú kópiu). Toto je kľúčový krok.
- **G₂** – bunka dorastie a skontroluje, či je DNA v poriadku.

**2. M fáza (mitóza)** – samotné delenie. Prebieha v 4 krokoch:
- **Profáza** – chromozómy sa „zbalia" (zviditeľnia), rozpadne sa obal jadra.
- **Metafáza** – chromozómy sa zoradia do **stredu** bunky (ako na štartovej čiare). Tu sú najlepšie viditeľné.
- **Anafáza** – chromozómy sa **roztrhnú na polovice** a každá ide na opačnú stranu.
- **Telofáza** – vytvoria sa dve nové jadrá a bunka sa rozdelí na dve (cytokinéza).

## Kontrolné body – „kontrola kvality"
Pred dôležitými krokmi má bunka **kontrolné body**, kde si overí, či je všetko v poriadku (dosť živín, správne skopírovaná DNA). Ak tieto kontroly **zlyhajú**, bunka sa môže začať deliť **nekontrolovane** – a tak vzniká **rakovina (nádor)**. Preto sú tieto kontroly životne dôležité.

## Slovníček po lopate
- **Bunkový cyklus** = kolobeh života bunky od vzniku po delenie.
- **Interfáza** = príprava (rast + zdvojenie DNA).
- **Mitóza** = samotné delenie na dve bunky.
- **Kontrolný bod** = miesto kontroly kvality; pri zlyhaní hrozí rakovina.

## Príklad zo života
Rakovina je v podstate **pokazený bunkový cyklus** – bunka ignoruje kontrolné body a delí sa donekonečna. Práve preto výskum rakoviny tak veľmi skúma, ako tieto kontroly fungujú a prečo zlyhávajú.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je bunkový cyklus (kolobeh).
2. Opíš **interfázu** (G₁, S – zdvojenie DNA, G₂).
3. Prejdi **4 fázy mitózy** (profáza → metafáza → anafáza → telofáza).
4. Vysvetli **kontrolné body** a súvis s **rakovinou**.
5. Pridaj príklad (rakovina = pokazený cyklus).`,

"13-2":`## Predstav si to takto
Ruffierov test je jednoduchý spôsob, ako zmerať **kondíciu srdca** – ako dobre tvoje srdce zvláda námahu a ako rýchlo sa po nej upokojí. Princíp je jasný: čím trénovanejší si, tým menej sa ti pri drepoch zrýchli pulz a tým rýchlejšie sa vráti do pokoja.

## Postup merania
Zmeriaš si pulz **trikrát**:
1. **P₁** – v pokoji, po 5 minútach oddychu.
2. Sprav **30 drepov za 45 sekúnd**.
3. **P₂** – hneď po drepoch (prvých 10 sekúnd × 6).
4. **P₃** – po jednej minúte oddychu.

(Tip: meriaš 10 sekúnd a vynásobíš šiestimi, aby si dostal tepy za minútu.)

## Výpočet
Dosadíš do vzorca:
**RI = (P₁ + P₂ + P₃ − 200) / 10**

## Ako vyhodnotiť výsledok
- **RI ≤ 0** → výborná kondícia
- **0–5** → dobrá
- **5–10** → priemerná
- **10–15** → slabšia
- **nad 15** → zlá (vhodné poradiť sa s lekárom)

Platí: **čím nižšie číslo, tým lepšie**.

## Prečo to funguje
Trénované srdce je silnejšie – pri jednom údere vystrelí viac krvi, takže nemusí biť tak často. Preto má športovec nižší pokojový pulz, miernejší nárast pri záťaži a **rýchlejší návrat** do pokoja. Netrénované srdce sa zadýcha skôr a upokojuje sa pomaly.

## Slovníček po lopate
- **Pulz (tep)** = počet úderov srdca za minútu.
- **Ruffierov index** = číslo vyjadrujúce kondíciu srdca.
- **Záťaž** = fyzická námaha (drepy).
- Platí: nižší index = lepšia kondícia.

## Príklad zo života
Dvaja ľudia spravia 30 drepov. Športovcovi pulz stúpne mierne a o minútu je späť v pokoji (nízky index). Človeku bez pohybu pulz vyletí a dlho neklesá (vysoký index). Test tak jasne ukáže rozdiel v kondícii.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo Ruffierov test meria (kondícia srdca).
2. Opíš **postup** (P₁, drepy, P₂, P₃).
3. Uveď **vzorec** a ako sa pulz meria (10 s × 6).
4. Vysvetli **hodnotenie** (nižšie = lepšie).
5. Vysvetli **prečo** to funguje (silné srdce) a pridaj príklad (športovec vs. netrénovaný).`,

"14-0":`## Predstav si to takto
„Nižšie rastliny" sú jednoduché organizmy, ktoré ešte **nemajú pravý koreň, stonku ani listy**. Ich telo je jednoliate a voláme ho **stielka**. Patria sem hlavne **riasy** – väčšinou vodné organizmy, od mikroskopických až po obrovské morské chaluhy.

## Riasy podľa farby
Riasy delíme podľa farbív, ktoré majú:
- **Zelené riasy** – majú rovnaké zelené farbivo ako rastliny; sú ich **najbližší príbuzní** (z nich sa vyvinuli suchozemské rastliny). Napr. *Spirogyra*, morský šalát.
- **Hnedé riasy** – veľké morské chaluhy a kelp; zdroj jódu.
- **Červené riasy** – napr. *Porphyra*, z ktorej je morská riasa „nori" na sushi; vyrába sa z nich aj agar.
- **Rozsievky** – mikroskopické riasy s krásnou kremičitou schránkou; tvoria základ morského planktónu a vyrábajú **obrovskú časť kyslíka na Zemi**.

## Sinice – pozor, nie sú to riasy!
Sinice vyzerajú podobne ako riasy a tiež fotosyntetizujú, ale sú to **prokaryoty** (bunky bez jadra) – teda skôr baktérie. Sú veľmi dôležité:
- Práve sinice kedysi **obohatili atmosféru Zeme o kyslík** (umožnili vznik dýchajúceho života).
- Niektoré tvoria toxické „vodné kvety" v stojatých vodách v lete.

## Endosymbiotická teória
Krásna myšlienka: **chloroplasty** (zelené organely rastlín) kedysi vznikli tak, že väčšia bunka **pohltila sinicu** a nestrávila ju – sinica v nej zostala žiť a stala sa z nej chloroplast. Preto majú chloroplasty vlastnú DNA, podobnú baktériám.

## Slovníček po lopate
- **Stielka** = jednoduché telo bez koreňa, stonky a listov.
- **Riasa** = vodný fotosyntetický organizmus (eukaryot).
- **Sinica** = fotosyntetizujúci prokaryot (bez jadra).
- **Endosymbióza** = jedna bunka žije vnútri druhej k vzájomnému prospechu.

## Príklad zo života
Keď ješ sushi, riasa „nori" okolo neho je červená riasa. A agar, na ktorom v laboratóriu pestujú baktérie, tiež pochádza z rias. Riasy teda nie sú len „machuľa vo vode" – majú obrovský praktický význam aj pre kyslík, ktorý dýchame.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **stielka** a čo sú nižšie rastliny.
2. Prejdi **skupiny rias** podľa farby s príkladmi.
3. Zdôrazni, že **sinice sú prokaryoty** a ich význam (kyslík v atmosfére).
4. Vysvetli **endosymbiotickú teóriu** (vznik chloroplastov).
5. Spomeň **ekologický význam** (kyslík, planktón) a pridaj príklad (nori, agar).`,

"14-1":`## Predstav si to takto
DNA je „návod na stavbu tela" zapísaný v bunke. **Mutácia** je **chyba (preklep) v tomto návode** – trvalá zmena, ktorá sa dedí ďalej. Niektoré mutácie sú neškodné, iné spôsobia chorobu a zriedka môže byť mutácia aj výhodná (to poháňa evolúciu).

## Tri úrovne mutácií (podľa veľkosti chyby)
**1. Génové (bodové) mutácie** – chyba v jednom „písmenku" DNA:
- **Substitúcia** – jedno písmeno sa zamení za iné. Niekedy to zmení aminokyselinu (napr. kosáčikovitá anémia), inokedy vznikne predčasný „STOP" a bielkovina je nefunkčná, a niekedy sa nestane nič (tichá mutácia).
- **Inzercia/delécia** – pridanie alebo vymazanie písmena. To **posunie čítanie** celého zvyšku návodu (ako keby si v texte vynechal písmeno – ďalej už nedáva zmysel).

**2. Chromozómové mutácie** – zmena **stavby** chromozómu (vypadne, zdvojí sa alebo sa prevráti väčší kus DNA).

**3. Genómové mutácie** – zmena **počtu** chromozómov:
- **Downov syndróm** – navyše jeden 21. chromozóm (spolu 47 namiesto 46).
- **Turnerov syndróm** – chýba jeden pohlavný chromozóm (žena s jediným X).
- **Klinefelterov syndróm** – muž s navyše X.

## Čo mutácie spôsobuje (mutagény)
- **UV žiarenie** (slnko, soláriá),
- **Ionizujúce žiarenie** (röntgen, rádioaktivita),
- **Chemikálie** (cigaretový dym, plesňové jedy).

## Slovníček po lopate
- **Mutácia** = trvalá zdediteľná zmena DNA.
- **Bodová mutácia** = chyba v jednom písmene DNA.
- **Frameshift (posunová)** = posunutie čítania po pridaní/vymazaní písmena.
- **Mutagén** = niečo, čo mutácie spôsobuje (UV, žiarenie, chemikálie).

## Príklad zo života
Prečo treba používať opaľovací krém? Lebo UV žiarenie zo slnka je **mutagén** – poškodzuje DNA kožných buniek a opakované poškodenie môže viesť k rakovine kože. Krém pôsobí ako štít proti tomuto „kazeniu návodu".

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli mutáciu ako „preklep v návode DNA".
2. Opíš **génové mutácie** (substitúcia, inzercia/delécia, frameshift).
3. Spomeň **chromozómové** mutácie.
4. Vysvetli **genómové** mutácie cez známe syndrómy (Downov, Turnerov, Klinefelterov).
5. Vymenuj **mutagény** a pridaj príklad (UV a opaľovací krém).`,

"14-2":`## Predstav si to takto
V tomto praktiku si pozrieš pod mikroskopom **vlastné bunky** – konkrétne ploché bunky z vnútornej strany líca (bukálne bunky). Sú to typické bunky **dlaždicového epitelu** – ploché ako dlaždice. Je to skvelý spôsob, ako uvidieť, ako vyzerá živočíšna bunka.

## Pomôcky
Vatová tyčinka, podložné a krycie sklíčko, farbivo **metylénová modrá** (zafarbí jadro na modro, aby bolo dobre vidieť), mikroskop.

## Postup krok za krokom
1. Vatovou tyčinkou jemne zotri vnútornú stranu líca.
2. Nanes bunky na sklíčko do kvapky vody.
3. Pridaj kvapku **metylénovej modrej** a nechaj pôsobiť 1–2 minúty.
4. Prikry krycím sklíčkom (bez bubliniek).
5. Pozoruj pri zväčšení 200–400×.

## Čo uvidíš
- **Ploché, nepravidelné bunky** (sú dosť veľké).
- Jasne **modro zafarbené jadro** v strede – farbivo ho zvýraznilo.
- Bledú cytoplazmu okolo jadra.
- **Bunkovú membránu** ako hranicu – ale pozor, **žiadnu bunkovú stenu**! Tú majú len rastliny, nie živočíchy.

## Slovníček po lopate
- **Bukálne bunky** = bunky z vnútra líca.
- **Dlaždicový epitel** = ploché bunky pokrývajúce povrch.
- **Metylénová modrá** = farbivo zvýrazňujúce jadro.
- **Bunková stena** = pevný obal – majú ho len rastliny, živočíchy nie.

## Príklad zo života
Tento pokus pekne ukazuje hlavný rozdiel medzi rastlinnou a živočíšnou bunkou: tvoja lícna bunka má len mäkkú membránu a nemá pevnú bunkovú stenu ani chloroplasty – preto sa živočíchy vedia voľne hýbať, kým rastlina je „zamurovaná" v pevných stenách.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo sú bukálne bunky a že sú dlaždicový epitel.
2. Vymenuj **pomôcky** a načo je metylénová modrá.
3. Prejdi **postup** krok za krokom.
4. Opíš, **čo vidíš** (ploché bunky, modré jadro, membrána bez steny).
5. Zdôrazni **rozdiel rastlinná vs. živočíšna bunka** (chýba bunková stena) a pridaj príklad.`,

"15-0":`## Predstav si to takto
Rastliny sa vedia rozmnožovať dvoma spôsobmi: buď **bez partnera** (nepohlavne – z jedného rodiča vznikne presná kópia), alebo **s partnerom** (pohlavne – zmieša sa peľ a vajíčko, potomok je nový a iný). Každý spôsob má svoje výhody.

## Nepohlavné (vegetatívne) rozmnožovanie – kópie
Vzniká **bez spojenia pohlavných buniek**, takže potomok je geneticky **identický klon** rodiča. Príklady:
- **Šľahúny (výhonky):** jahoda vyženie odnož, z ktorej narastie nová rastlina.
- **Hľuzy:** zo zemiaka („oka") vyrastie nová rastlina.
- **Cibuľky:** tulipán, cibuľa.
- **Umelo:** odrezky (zapichneš vetvičku a zakorení), štepenie ovocných stromov.

**Výhoda:** rýchle a spoľahlivé. **Nevýhoda:** všetci potomkovia sú rovnakí, takže ak príde choroba, zničí všetkých.

## Pohlavné rozmnožovanie – miešanie génov
Spojí sa **peľ (mužská bunka)** a **vajíčko (ženská bunka)** → vznikne **zygóta** → z nej nová rastlina. Potomkovia sú **rôznorodí** (každý iný), čo je výhoda pre prežitie druhu (variabilita).

**Dvojité oplodnenie** – unikát krytosemenných rastlín. Do vajíčka vniknú dve spermie:
- prvá oplodní vajíčko → vznikne **zárodok** (nová rastlinka),
- druhá splynie s ďalšími jadrami → vznikne **endosperm** = zásoba potravy pre klíčiace semienko.

## Rodozmena (striedanie generácií)
V živote rastliny sa striedajú dve fázy:
- **Sporofyt (2n)** – tvorí výtrusy.
- **Gametofyt (n)** – tvorí pohlavné bunky.
U machov prevláda gametofyt, u papradí a vyšších rastlín prevláda sporofyt.

## Slovníček po lopate
- **Nepohlavné rozmnožovanie** = bez partnera, vznikajú klony.
- **Pohlavné rozmnožovanie** = peľ + vajíčko, potomkovia sú rôzni.
- **Dvojité oplodnenie** = vznik zárodku aj endospermu naraz.
- **Endosperm** = zásobná potrava v semene.

## Príklad zo života
Keď zapichneš odrezok muškátu do zeme a zakorení, vytvoril si **klon** – identickú kópiu pôvodnej rastliny. To je vegetatívne rozmnožovanie v praxi. Naproti tomu jabĺčko zo semienka vyrastie do stromu, ktorý môže rodiť úplne iné jablká než materský strom – to je pohlavné rozmnožovanie a miešanie génov.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Rozlíš **nepohlavné** (klony) a **pohlavné** (variabilita) rozmnožovanie.
2. Uveď príklady **vegetatívneho** rozmnožovania (šľahúny, hľuzy, odrezky).
3. Vysvetli výhody/nevýhody oboch.
4. Podrobne opíš **dvojité oplodnenie** (zárodok + endosperm).
5. Vysvetli **rodozmenu** (sporofyt/gametofyt) a pridaj príklad (odrezok vs. semienko).`,

"15-1":`## Predstav si to takto
Krv je „tekutá rieka tela", ktorá rozváža kyslík a živiny a odváža odpad. Hoci vyzerá ako jednoduchá červená tekutina, je to vlastne **tekuté väzivo** – zložené z tekutej časti (plazmy) a z buniek, ktoré v nej plávajú.

## Z čoho sa krv skladá
- **Plazma (~55 %)** – tekutá časť, prevažne voda, v ktorej sú rozpustené bielkoviny, cukor, hormóny a odpadové látky. Je to „rieka", v ktorej všetko pláva.
- **Krvinky (~45 %)** – pevné zložky:
  - červené krvinky,
  - biele krvinky,
  - krvné doštičky.

## Tri typy krviniek
- **Červené krvinky (erytrocyty)** – „nosiči kyslíka". Majú tvar disku a u cicavcov **nemajú jadro** (aby sa zmestilo viac farbiva). Obsahujú **hemoglobín** – červené farbivo so železom, ktoré viaže kyslík. Žijú asi 120 dní.
- **Biele krvinky (leukocyty)** – „obrancovia tela". Bojujú proti infekciám: niektoré **požierajú baktérie** (fagocytóza), iné (**lymfocyty**) tvoria protilátky alebo ničia infikované bunky.
- **Krvné doštičky (trombocyty)** – „opravári". Pri poranení sa nalepia na ranu a spustia **zrážanie krvi** (vznik zrazeniny), aby krvácanie ustalo.

## Načo je krv dobrá
Rozváža **kyslík, živiny a hormóny**, odváža **odpad a CO₂**, pomáha udržiavať **teplotu**, **bráni telo** (imunita) a **zráža sa** pri poranení.

## Slovníček po lopate
- **Plazma** = tekutá časť krvi.
- **Hemoglobín** = červené farbivo viažuce kyslík (obsahuje železo).
- **Leukocyty** = biele krvinky (obrana).
- **Trombocyty** = krvné doštičky (zrážanie).

## Príklad zo života
Keď máš málo železa, telo nevie tvoriť dosť hemoglobínu, červené krvinky prenášajú málo kyslíka a ty si **unavený a bledý** – to je chudokrvnosť (anémia). Preto sa pri nej dopĺňa železo, „surovina" na výrobu hemoglobínu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že krv je **tekuté väzivo** a z čoho sa skladá (plazma + krvinky).
2. Opíš **červené krvinky** a **hemoglobín** (prenos kyslíka, železo).
3. Opíš **biele krvinky** (obrana, fagocytóza, lymfocyty).
4. Opíš **krvné doštičky** a **zrážanie**.
5. Vymenuj **funkcie krvi** a pridaj príklad (chudokrvnosť pri nedostatku železa).`,

"15-2":`## Predstav si to takto
DNA je návod a aby z neho bunka vyrobila bielkovinu, číta ho po **trojiciach písmen**. Každá trojica (na mRNA) sa volá **kodón** a určuje jednu **aminokyselinu** – jeden „korálik" budúcej bielkoviny. Je to ako morzeovka: z pár znakov sa skladajú slová.

## Základné čísla
- Máme **4 písmená (bázy):** A, U, G, C.
- Čítame ich po **trojiciach**.
- 4 × 4 × 4 = **64 možných kodónov**.
- Tých 64 kodónov kóduje **20 aminokyselín** + signál STOP.

## Špeciálne kodóny (toto musíš vedieť)
- **AUG = ŠTART** – tu sa začína čítanie (zároveň kóduje aminokyselinu metionín).
- **UAA, UAG, UGA = STOP** – tu sa čítanie končí; nekódujú žiadnu aminokyselinu.

## Vlastnosti genetického kódu
- **Degenerovaný** – jednu aminokyselinu môže kódovať viac kodónov (je tu „rezerva", lebo 64 kódov na 20 aminokyselín je veľa).
- **Univerzálny** – funguje takmer rovnako u všetkých organizmov (od baktérie po človeka). To je dôkaz, že všetok život má **spoločného predka**.
- **Neprekrývajúci sa a plynulý** – číta sa trojica za trojicou bez prestávok.

## Ako prečítať tabuľku
Z reťazca mRNA si rozdelíš písmená na trojice od štartu AUG a v tabuľke genetického kódu vyhľadáš, ktorú aminokyselinu daný kodón určuje. Napr. AUG = Met, UUU = fenylalanín, UAA = STOP.

## Slovníček po lopate
- **Kodón** = trojica písmen určujúca jednu aminokyselinu.
- **Aminokyselina** = stavebný „korálik" bielkoviny.
- **Štart kodón (AUG)** = začiatok čítania.
- **Stop kodón** = koniec čítania.

## Príklad zo života
To, že kód je takmer rovnaký u baktérie aj u človeka, využíva medicína: do baktérie vložia ľudský gén pre inzulín a baktéria ho prečíta a vyrobí ľudský inzulín pre diabetikov. Funguje to len preto, že genetický kód je univerzálny.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojmy **kodón** a **aminokyselina** (čítanie po trojiciach).
2. Uveď čísla (4 bázy → 64 kodónov → 20 aminokyselín).
3. Zdôrazni **štart (AUG)** a **stop** kodóny.
4. Opíš **vlastnosti kódu** (degenerovaný, univerzálny).
5. Ukáž, ako **prečítať** aminokyseliny z mRNA, a pridaj príklad (výroba inzulínu baktériou).`,

"16-0":`## Predstav si to takto
Každý organizmus ovplyvňuje okrem iných tvorov aj **neživé prostredie** – teplo, svetlo, voda, pôda. Týmto neživým podmienkam hovoríme **abiotické faktory** („a-" = bez, „bios" = život, teda neživé činitele). Rozhodujú o tom, kde aký druh môže žiť – ťava nežije v Arktíde a ľadový medveď v púšti.

## Klimatické faktory (počasie a podnebie)
- **Teplota** – riadi rýchlosť života. Niektoré zvieratá pred zimou **migrujú** alebo **upadnú do zimného spánku**.
- **Svetlo** – nutné pre fotosyntézu; dĺžka dňa spúšťa kvitnutie rastlín či ťahanie vtákov.
- **Voda (vlhkosť)** – podľa nárokov delíme rastliny na milovníkov sucha (**kaktusy**) a milovníkov vlhka.
- **Vietor** – roznáša peľ a semená, ale aj vysušuje.

## Pôdne (edafické) faktory
- **pH pôdy** – niektoré rastliny chcú kyslú pôdu (čučoriedky), iné zásaditú.
- **Typ pôdy** – piesočnatá rýchlo vysychá, ílovitá drží vodu, hlinitá je ideálna.
- **Množstvo živín** (dusík, fosfor, draslík).

## Dva dôležité zákony
- **Liebigov zákon minima:** rastlinu obmedzuje tá živina, ktorej je **najmenej** – nie celkový súčet. Je to ako sud z dosiek rôznej výšky: voda vytečie cez **najnižšiu** dosku, ostatné sú jedno. Aj keď má rastlina všetkého dosť, ale chýba jej jeden prvok, neporastie.
- **Shelfordov zákon tolerancie:** každý druh má svoje **optimum** a hranice, za ktorými neprežije. Príliš málo aj príliš veľa faktora škodí (napr. málo aj priveľa vody).

## Slovníček po lopate
- **Abiotický faktor** = neživá podmienka prostredia (teplo, svetlo, voda).
- **Liebigov zákon minima** = obmedzuje faktor, ktorého je najmenej.
- **Optimum** = podmienky, pri ktorých sa druhu darí najlepšie.
- **Tolerancia** = rozsah podmienok, ktoré druh znesie.

## Príklad zo života
Predstav si sud z dosiek rôznej výšky (Liebigov zákon): nech ostatné dosky nadstavíš akokoľvek vysoko, voda vytečie cez tú najnižšiu. Tak isto, ak rastline chýba dusík, nepomôže jej, že má vody a svetla nadbytok – rásť bude len po hranicu toho najvzácnejšieho prvku.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **abiotické faktory**.
2. Prejdi **klimatické faktory** (teplota, svetlo, voda, vietor) s adaptáciami.
3. Prejdi **pôdne faktory** (pH, typ pôdy, živiny).
4. Vysvetli **Liebigov zákon minima** (prirovnanie k sudu).
5. Vysvetli **Shelfordov zákon tolerancie** (optimum, hranice) a pridaj príklad.`,

"16-1":`## Predstav si to takto
Imunitný systém je **armáda tela**, ktorá ho bráni pred votrelcami (baktérie, vírusy). Má dve línie obrany: **nešpecifickú** (rýchla, všeobecná stráž, ktorá útočí na čokoľvek cudzie) a **špecifickú** (pomalšia, ale presná a s pamäťou – zapamätá si nepriateľa).

## Nešpecifická (vrodená) imunita – rýchla stráž
Funguje **okamžite** a útočí na všetko cudzie bez rozdielu:
- **Bariéry:** koža (múr okolo hradu), riasinky a sliny, **kyselina v žalúdku** (zničí prehltnuté baktérie).
- **Bunky:** **fagocyty** (napr. neutrofily a makrofágy), ktoré votrelcov jednoducho **zožerú** (fagocytóza). **NK-bunky** ničia nádorové a vírusom napadnuté bunky.
- **Zápal:** keď sa porežeš, miesto sčervenie, opuchne a hreje – to telo nahnalo do rany viac krvi a obranných buniek.

## Špecifická (získaná) imunita – presná a s pamäťou
Rozbehne sa pomalšie (dni), ale je **cielená** a **pamätá si**. Má dve vetvy:
- **Humorálna (B-lymfocyty)** – vyrábajú **protilátky**, presné „strely" ušité na konkrétneho votrelca. Protilátka sa naňho prilepí a označí ho na zničenie.
- **Bunková (T-lymfocyty)** – pomocné T-bunky riadia obranu, cytotoxické T-bunky **zabíjajú** infikované bunky.

## Imunologická pamäť a očkovanie
Po prekonaní choroby zostanú **pamäťové bunky**. Pri druhom stretnutí s tým istým votrelcom telo zareaguje **bleskovo** a ani neochorieš. **Očkovanie** toto využíva: dá telu neškodnú ukážku votrelca, telo si vytvorí pamäť – a keď príde skutočná choroba, je pripravené.

## Slovníček po lopate
- **Nešpecifická imunita** = rýchla, všeobecná obrana.
- **Špecifická imunita** = cielená obrana s pamäťou.
- **Protilátka** = presná „strela" proti konkrétnemu votrelcovi.
- **Pamäťové bunky** = základ imunity po chorobe/očkovaní.

## Príklad zo života
Prečo ovčie kiahne dostaneš zvyčajne len raz za život? Lebo po prvom prekonaní si telo vytvorí **pamäťové bunky** a pri ďalšom kontakte vírus zničí skôr, než stihne spôsobiť chorobu. Presne na tomto princípe stojí aj očkovanie.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav imunitu ako armádu s dvomi líniami.
2. Opíš **nešpecifickú** imunitu (bariéry, fagocyty, zápal).
3. Opíš **špecifickú** imunitu – humorálnu (protilátky) a bunkovú (T-lymfocyty).
4. Vysvetli **imunologickú pamäť** a princíp **očkovania**.
5. Pridaj príklad (ovčie kiahne raz za život).`,

"16-2":`## Predstav si to takto
Keď zahryzneš do hrušky, cítiš takú jemnú **zrnitosť** – akoby tam boli maličké tvrdé zrniečka. To nie je náhoda: sú to **kamenné bunky (sklereidy)**, špeciálne pevnostné bunky s veľmi hrubými, zdrevnatenými stenami. V tomto praktiku si ich pozrieš pod mikroskopom.

## Čo sú sklereidy
Sú to bunky **pevnostného pletiva (sklerenchymu)**. Ich steny sú **rovnomerne zhrubnuté a zdrevnatené** (spevnené lignínom). Bunka je **mŕtva** – ostala z nej len tvrdá stena, ktorá rastline dodáva pevnosť. Kamenné bunky v hruške dávajú dužine tú typickú zrnitú textúru.

## Pomôcky
Hruška, mikroskop, žiletka, sklíčka a farbivo **floroglucinol** (s kvapkou HCl) – to zafarbí zdrevnatené steny na **červenofialovo**, takže ich krásne vidno.

## Postup
1. Odrež veľmi tenký plátok z dužiny hrušky.
2. Polož ho na sklíčko a pridaj kvapku floroglucinolu + kvapku HCl.
3. Prikry krycím sklíčkom.
4. Pozoruj pri zväčšení 100–400×.

## Čo uvidíš
- Guľaté až oválne **kamenné bunky**.
- Veľmi **hrubé steny** zafarbené **červenofialovo** (dôkaz lignínu).
- V stenách jemné **kanáliky (póry)**, ktorými boli bunky kedysi prepojené.
- Prázdny vnútrajšok (bunka je mŕtva).

## Slovníček po lopate
- **Sklereidy (kamenné bunky)** = mŕtve pevnostné bunky s hrubými stenami.
- **Sklerenchym** = pevnostné pletivo z takýchto buniek.
- **Lignín** = látka, ktorá spevňuje (drevnatie) bunkovú stenu.
- **Floroglucinol** = farbivo, ktoré dokazuje lignín (sfarbí ho dočervena).

## Príklad zo života
Tá „pieskovitá" textúra hrušky, ktorú cítiš na jazyku, sú práve kamenné bunky. Jablko ich nemá, preto je jeho dužina hladká. Takže rozdiel v textúre dvoch druhov ovocia vieš vysvetliť na úrovni buniek.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo sú **sklereidy** a že patria do sklerenchymu (mŕtve, hrubé steny).
2. Spomeň, že dávajú hruške **zrnitú textúru**.
3. Vymenuj **pomôcky** a načo je floroglucinol (dôkaz lignínu).
4. Prejdi **postup** a opíš, **čo vidíš** (hrubé červenofialové steny, póry).
5. Pridaj príklad (zrnitá hruška vs. hladké jablko).`,

"17-0":`## Predstav si to takto
Srdce je **neúnavná pumpa**, ktorá celý život tlačí krv do celého tela. Krv obieha v uzavretom systéme ciev – ako voda v kúrení, ktorá sa stále dokola ženie cez radiátory a späť ku kotlu. Srdce je ten kotol a pumpa zároveň.

## Stavba srdca – 4 dutiny
Srdce má **4 komory** (dutiny): hore dve **predsiene**, dole dve **komory**. Pravá a ľavá polovica sú oddelené:
- **Pravá strana** – zbiera „použitú" krv bez kyslíka a posiela ju do pľúc.
- **Ľavá strana** – dostáva okysličenú krv z pľúc a tlačí ju do celého tela. Preto má **hrubšiu stenu** (musí tlačiť ďalej).
- Medzi predsieňami a komorami sú **chlopne** – jednosmerné „dvierka", ktoré bránia, aby sa krv vracala späť.

## Dva krvné obehy
Krv robí dva okruhy:
- **Malý (pľúcny) obeh:** srdce → pľúca → späť do srdca. Tu sa krv **okysličí** (naberie kyslík, zbaví sa CO₂).
- **Veľký (telový) obeh:** srdce → celé telo → späť do srdca. Tu krv **rozvezie kyslík** do orgánov.

## Tri druhy ciev
- **Tepny (artérie)** – vedú krv **od srdca**, majú hrubú pružnú stenu (znášajú vysoký tlak).
- **Žily (vény)** – vedú krv **k srdcu**, majú tenšiu stenu a **chlopne**, aby krv nestekala späť dole.
- **Vlásočnice (kapiláry)** – tenučké cievky, kde prebieha samotná výmena (kyslík a živiny von, odpad dnu).

## Srdce má vlastný „kardiostimulátor"
V srdci je **SA uzol** – zhluk buniek, ktorý sám tvorí elektrické impulzy (asi 70× za minútu) a núti srdce biť. Preto srdce bije samo, aj keby si naň nemyslel. Túto elektrickú aktivitu zaznamenáva **EKG**.

## Slovníček po lopate
- **Predsiene a komory** = štyri dutiny srdca.
- **Chlopne** = jednosmerné dvierka proti spätnému toku.
- **Tepna** = vedie krv od srdca; **žila** = k srdcu.
- **SA uzol** = prirodzený udávač rytmu srdca.

## Príklad zo života
Keď ti lekár meria pulz na zápästí, cíti vlnu krvi, ktorú práve vystrelila ľavá komora do tepny. Tých približne 70 úderov za minútu udáva malý SA uzol – tvoj vlastný vstavaný „metronóm".

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav srdce ako pumpu a opíš **4 dutiny** (predsiene, komory) a chlopne.
2. Vysvetli, prečo má **ľavá komora hrubšiu stenu**.
3. Opíš **malý a veľký obeh** (kde sa krv okysličuje vs. rozvádza).
4. Rozlíš **tepny, žily, vlásočnice**.
5. Vysvetli **SA uzol a EKG**; pridaj príklad (meranie pulzu).`,

"17-1":`## Predstav si to takto
Bunky sa delia dvoma rôznymi spôsobmi a treba ich poriadne rozlíšiť. **Mitóza** je „obyčajné kopírovanie" – z jednej bunky vzniknú dve **úplne rovnaké**. **Meióza** je „špeciálne delenie na pohlavné bunky" – z jednej bunky vzniknú **štyri**, každá s **polovičným** počtom chromozómov a každá iná.

## Mitóza – kopírka tela (2n → 2n)
Slúži na rast a obnovu tela. Z materskej bunky vzniknú **2 identické dcérske bunky** s rovnakým počtom chromozómov. Prebieha v 4 fázach:
- **Profáza** – chromozómy sa zviditeľnia, rozpadne sa obal jadra.
- **Metafáza** – chromozómy sa zoradia do stredu bunky.
- **Anafáza** – rozdelia sa a idú na opačné strany.
- **Telofáza** – vzniknú dve nové jadrá a bunka sa rozdelí.

## Meióza – výroba pohlavných buniek (2n → 4× n)
Slúži na tvorbu **pohlavných buniek** (spermie, vajíčka). Prebieha **dvakrát po sebe**, takže z jednej bunky vzniknú **4 bunky s polovičným počtom chromozómov** (haploidné). Prečo polovičné? Lebo pri oplodnení sa spoja dve pohlavné bunky a počet sa zase doplní na celý.

Dôležitý moment v meióze je **crossing-over** (kríženie): chromozómy od mamy a od ocka si **vymenia kúsky**, takže vzniknú úplne nové kombinácie génov.

## Hlavný rozdiel (toto sa pýtajú)
- **Mitóza:** 2 rovnaké bunky, plný počet chromozómov, na rast tela.
- **Meióza:** 4 rôzne bunky, polovičný počet, na rozmnožovanie.

## Slovníček po lopate
- **Mitóza** = delenie na 2 rovnaké bunky (rast tela).
- **Meióza** = delenie na 4 pohlavné bunky s polovicou chromozómov.
- **Haploidný (n)** = polovičný počet chromozómov; **diploidný (2n)** = plný.
- **Crossing-over** = výmena úsekov chromozómov → variabilita.

## Príklad zo života
Vďaka meióze a crossing-overu nie sú súrodenci (okrem jednovaječných dvojčiat) úplne rovnakí – každá pohlavná bunka má inú „namiešanú" kombináciu génov. Preto sa brat a sestra od tých istých rodičov môžu dosť líšiť.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že existujú **dva typy delenia** a načo slúžia.
2. Opíš **mitózu** a jej 4 fázy (2 rovnaké bunky).
3. Opíš **meiózu** (2 delenia → 4 haploidné bunky) a prečo polovičný počet.
4. Zdôrazni **crossing-over** ako zdroj variability.
5. Porovnaj mitózu a meiózu a pridaj príklad (rozdiely medzi súrodencami).`,

"17-2":`## Predstav si to takto
Toto praktikum je o tom, prečo je mrkva oranžová a paradajka červená. Za farbu zodpovedajú **chromoplasty** – malé farebné „balíčky" vo vnútri rastlinných buniek, naplnené farbivami. Pod mikroskopom si ich priamo pozrieš.

## Čo sú chromoplasty
Sú to plastidy (organely) plné farebných pigmentov:
- **Karotén** – oranžový (mrkva, tekvica),
- **Lykopén** – červený (paradajka),
- **Xantofyly** – žlté (žlté plody, banán).

Na rozdiel od chloroplastov **nemajú chlorofyl**, takže nerobia fotosyntézu – ich úlohou je dať plodu či kvetu **farbu**.

## Pomôcky a postup
Mrkva alebo paradajka, mikroskop, žiletka, sklíčka.
1. Žiletkou odrež čo najtenší rez z mrkvy alebo paradajky.
2. Polož na sklíčko do kvapky vody.
3. Prikry krycím sklíčkom.
4. Pozoruj pri zväčšení 100–400×.

## Čo uvidíš
- Bunky naplnené **oranžovými, červenými alebo žltými zrniečkami** (chromoplastmi).
- Ich tvar býva rôzny – v mrkve napríklad **ihlicovité kryštáliky** karoténu.
- Niekedy je jadro vytlačené na okraj, lebo bunka je nabitá chromoplastmi.

## Prečo sú farebné plody dôležité
Pestré farby plodov a kvetov **lákajú živočíchy** – kvety lákajú opeľovače, plody lákajú zvieratá, ktoré ich zjedia a roznesú semená. Farba je teda „reklama" rastliny.

## Slovníček po lopate
- **Chromoplast** = farebný plastid (oranžový, červený, žltý).
- **Karotén** = oranžové farbivo (mrkva); predchodca vitamínu A.
- **Lykopén** = červené farbivo (paradajka).
- **Chloroplast vs. chromoplast** = zelený (fotosyntéza) vs. farebný (farba).

## Príklad zo života
Keď paradajka dozrieva, mení farbu zo zelenej na červenú. Prečo? Lebo jej **chloroplasty sa premieňajú na chromoplasty** – zelený chlorofyl mizne a pribúda červený lykopén. Dozrievanie ovocia je teda prestavba organel priamo v bunkách.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo sú chromoplasty a aké pigmenty obsahujú.
2. Zdôrazni, že **nemajú chlorofyl** (nerobia fotosyntézu).
3. Prejdi **postup** pozorovania.
4. Opíš, **čo vidíš** (farebné zrniečka, kryštáliky karoténu).
5. Vysvetli **význam** (lákanie živočíchov) a pridaj príklad (dozrievanie paradajky = premena plastidov).`,

"18-0":`## Predstav si to takto
Rastlina má orgány tak ako človek – len iné. Delíme ich na **vegetatívne** (slúžia na prežitie: koreň, stonka, list) a **generatívne** (slúžia na rozmnožovanie: kvet, plod, semeno). Vegetatívne sú ako „práca a strava", generatívne ako „založenie rodiny".

## Vegetatívne orgány (na prežitie)
- **Koreň** – drží rastlinu v zemi a **nasáva vodu a minerály**. Najviac ich vstrebáva pásmo s **koreňovými vláskami** (zväčšujú plochu). Býva kôlový (mrkva) alebo vláknitý (tráva).
- **Stonka** – „diaľnica" rastliny: vedie vodu nahor a cukry nadol, drží listy a kvety k svetlu. Niektoré stonky sú premenené: hľuza (zemiak), cibuľa (tulipán).
- **List** – „solárny panel": prebieha v ňom **fotosyntéza**, dýchanie a výpar vody.

## Generatívne orgány (na rozmnožovanie)
- **Kvet** – rozmnožovací orgán (kalich, koruna, tyčinky, piestik).
- **Plod** – vzniká zo **semenníka** po oplodnení; jeho úlohou je **chrániť a rozšíriť semená**. Delíme ho na:
  - **dužnaté** (mäkké, šťavnaté): bobuľa (paradajka), kôstkovica (čerešňa), malvica (jablko),
  - **suché**: struk (fazuľa), nažka (slnečnica), obilka (pšenica).
- **Semeno** – obsahuje **zárodok** novej rastliny + zásobu potravy + obal.

## Rozdiel plod vs. semeno (na toto pozor)
**Semeno** je „dieťa rastliny" so zásobou potravy. **Plod** je „obal a baliaci materiál" okolo semien, ktorý ich chráni a pomáha rozšíriť (napr. chutná dužina zláka zviera, to plod zje a semená roznesie).

## Slovníček po lopate
- **Vegetatívne orgány** = koreň, stonka, list (prežitie).
- **Generatívne orgány** = kvet, plod, semeno (rozmnožovanie).
- **Plod** = obal vzniknutý zo semenníka, chráni semená.
- **Semeno** = zárodok novej rastliny + zásoba potravy.

## Príklad zo života
Keď ješ jablko, dužina je **plod** (obal) a jadierka vnútri sú **semená**. Príroda to vymyslela šikovne: ty (alebo zviera) zješ chutný plod a semienka sa dostanú inam – tak sa jabloň rozšíri na nové miesto.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Rozdeľ orgány na **vegetatívne a generatívne**.
2. Opíš **koreň, stonku, list** a ich funkcie (zdôrazni koreňové vlásky a fotosyntézu).
3. Opíš **kvet, plod, semeno**.
4. Vymenuj **typy plodov** (dužnaté vs. suché) s príkladmi.
5. Vysvetli **rozdiel plod vs. semeno** a pridaj príklad (jablko).`,

"18-1":`## Predstav si to takto
Nervová sústava je **riadiace a komunikačné centrum tela** – ako internet a počítač zároveň. Prijíma informácie (čo vidím, počujem, cítim), spracuje ich a vyšle príkazy (pohni rukou, utekaj). Delíme ju na **centrálnu** (mozog a miecha = veliteľstvo) a **periférnu** (nervy = káble do celého tela).

## Centrálna nervová sústava – veliteľstvo
**Mozog** má niekoľko častí:
- **Veľký mozog** – najväčší, tu sídli **myslenie, reč, pamäť, vôľa** a spracovanie zmyslov. Má dve hemisféry a štyri laloky (zrak vzadu, sluch po stranách…).
- **Medzimozog** (talamus, hypotalamus) – „prepínač" zmyslov a regulátor základných potrieb (hlad, smäd, teplota).
- **Mozgový kmeň** – riadi životne dôležité veci, na ktoré nemyslíš: **dýchanie, tlkot srdca**, prehĺtanie.
- **Mozoček** – stará sa o **rovnováhu a koordináciu** pohybov.

**Miecha** – „diaľnica" medzi mozgom a telom; riadi aj rýchle **reflexy**.

## Periférna nervová sústava – káble
- **Somatická** – ovládame ňou **vedome** pohyby (kostrové svaly).
- **Autonómna (vegetatívna)** – riadi telo **bez nášho vedomia** a má dve protichodné časti:
  - **Sympatikus** – „boj alebo útek": zrýchli srdce, rozšíri zreničky (stres),
  - **Parasympatikus** – „odpočinok a trávenie": spomalí srdce, naštartuje trávenie (pokoj).

## Slovníček po lopate
- **CNS** = mozog + miecha (veliteľstvo).
- **PNS** = nervy do tela (káble).
- **Reflex** = rýchla automatická reakcia bez rozmýšľania.
- **Sympatikus vs. parasympatikus** = stres vs. pokoj.

## Príklad zo života
Keď sa dotkneš horúcej platne, ruku odtiahneš **skôr, než stihneš pomyslieť** – to je **reflex** riadený miechou (signál nejde až do mozgu, aby to bolo rýchlejšie). A keď sa zľakneš, sympatikus ti rozbúši srdce; keď sa upokojíš, parasympatikus ho spomalí.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli funkciu nervovej sústavy a rozdelenie na **CNS a PNS**.
2. Prejdi časti **mozgu** (veľký mozog, medzimozog, kmeň, mozoček) a ich úlohy.
3. Spomeň **miechu a reflexy**.
4. Vysvetli **somatickú a autonómnu** PNS (sympatikus vs. parasympatikus).
5. Pridaj príklad (reflex pri horúcej platni).`,

"18-2":`## Predstav si to takto
Toto je „odborný text" – nadviažeš na to, ako sa u zvierat vyvíjala tráviaca sústava, a zameriaš sa na **špeciálne prispôsobenia** podľa toho, čo ktoré zviera žerie. Príroda totiž každému „zákazníkovi" prispôsobila trávenie na mieru.

## Slepý vs. priechodný trakt (základ)
- **Slepý trakt** (pŕhlivce, ploskavce) – len jeden otvor, ústa = riť.
- **Priechodný trakt** (od hlístoviek vyššie) – samostatné ústa a riť, potrava ide jedným smerom = oveľa efektívnejšie.

## Špeciálne prispôsobenia
**Prežúvavce (krava, ovca) – štvorkomorový žalúdok:**
Žerú trávu, ktorá sa ťažko trávi. Preto majú 4 komory:
- **Bachor** – tu baktérie kvasia a rozkladajú celulózu (toto je trik – samo zviera celulózu stráviť nevie).
- **Čepiec** – vracia potravu späť do úst na prežutie.
- **Kniha** – vstrebáva vodu.
- **Slez** – „pravý žalúdok" s kyselinou a enzýmami.

**Vtáky:** nemajú zuby, tak melú potravu vo **svalnatom žalúdku (svalníku)**, často aj pomocou prehltnutých kamienkov.

**Hady:** prehltnú korisť celú a trávia ju aj niekoľko týždňov.

## Kľúčový fakt (na toto sa pýtajú)
Celulózu (z trávy) **nevie stráviť žiadny živočích sám** – nemá na ňu enzým. Prežúvavcom ju trávia **baktérie v bachore**. Je to nádherný príklad symbiózy: krava dá baktériám domov a potravu, baktérie jej za to „odomknú" živiny z trávy.

## Slovníček po lopate
- **Bachor** = najväčšia komora žalúdka prežúvavcov, kde baktérie trávia celulózu.
- **Svalník** = svalnatý žalúdok vtákov na mletie potravy.
- **Celulóza** = vláknina rastlín, ktorú trávia len baktérie.
- **Prežúvanie** = vracanie potravy do úst na opätovné požutie.

## Príklad zo života
Krava dokáže prežiť na obyčajnej tráve, z ktorej by človek nezískal takmer nič. Tajomstvom je armáda baktérií v jej bachore. Človek nič podobné nemá – preto trávu jednoducho strážiť nevieme.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Pripomeň rozdiel **slepý vs. priechodný** trakt.
2. Podrobne opíš **štvorkomorový žalúdok** prežúvavcov a funkciu každej komory.
3. Opíš **svalník vtákov** a trávenie u hadov.
4. Zdôrazni, že **celulózu trávia baktérie**, nie samotné zviera.
5. Pridaj príklad (krava žije z trávy vďaka baktériám).`,

"19-0":`## Predstav si to takto
Baktérie sú najmenšie a najstaršie samostatné organizmy na Zemi. Sú to **prokaryoty** – jednoduché bunky **bez jadra** (ich DNA pláva voľne v bunke). Sú všade: v pôde, vode, vzduchu, v tebe. Väčšina je neškodná alebo prospešná, len malá časť spôsobuje choroby.

## Z čoho sa baktéria skladá
- **Bunková stena** – pevný obal (z látky peptidoglykán). Podľa nej delíme baktérie na **Gram-pozitívne** (hrubá stena, farbia sa modro) a **Gram-negatívne** (tenká stena, farbia sa červeno) – to pomáha lekárom určiť správne antibiotikum.
- **Nukleoid** – kruhová DNA voľne v bunke (žiadne jadro).
- **Plazmidy** – malé krúžky DNA navyše; často nesú **gény odolnosti voči antibiotikám** a baktérie si ich vedia navzájom vymieňať (preto sa šíri rezistencia).
- **Bičík** – na pohyb; **fimbrie** – na prichytenie.
- **Endospóra** – „pancierová schránka", do ktorej sa niektoré baktérie zabalia v zlých podmienkach. Prežije aj var!

## Tvary baktérií
- **Koky** – guľaté (streptokoky, stafylokoky),
- **Bacily** – tyčinkovité,
- **Spirily/vibriá** – zatočené.

## Škodlivé aj prospešné
- **Choroby:** tuberkulóza, salmonelóza (otrava jedlom), tetanus, hnisavé infekcie.
- **Prospech:** výroba jogurtu a kyslej kapusty (kvasenie), antibiotík, baktérie v črevách (trávenie a vitamíny), hľúzkové baktérie viažuce dusík.

## Slovníček po lopate
- **Prokaryot** = bunka bez jadra (baktéria).
- **Plazmid** = krúžok DNA navyše (často gény rezistencie).
- **Endospóra** = odolné kľudové štádium baktérie.
- **Gram-farbenie** = test, ktorý rozlíši baktérie podľa steny.

## Príklad zo života
Prečo netreba zneužívať antibiotiká? Lebo baktérie si cez **plazmidy** odovzdávajú gény odolnosti, a tak vznikajú „superbaktérie", na ktoré lieky prestanú zaberať. Naopak, jogurt je dôkaz, že baktérie vieme aj využiť – mlieko skvasia na zdravú potravinu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že baktérie sú **prokaryoty** (bez jadra).
2. Opíš **stavbu** (stena, nukleoid, plazmidy, bičík, endospóra).
3. Vysvetli **Gram-farbenie** a načo slúži.
4. Vymenuj **tvary** a uveď **škodlivé aj prospešné** baktérie.
5. Spomeň **rezistenciu na antibiotiká** (plazmidy) a pridaj príklad (jogurt, superbaktérie).`,

"19-1":`## Predstav si to takto
Strom musí dostať vodu z koreňov až do najvyšších listov – niekedy aj desiatky metrov vysoko, a to **bez akejkoľvek pumpy**! Ako to dokáže? Tu si vysvetlíme, ako voda do rastliny vchádza, ako stúpa nahor a ako z nej vychádza von.

## Príjem vody – osmózou cez korene
Voda vchádza do koreňových vláskov **osmózou** – ide tam, kde je viac rozpustených látok (a tých je viac vnútri koreňa než v pôde). Koreňové vlásky obrovsky zväčšujú plochu, takže rastlina nasaje čo najviac vody.

## Vedenie vody nahor – „transpiračný ťah"
Toto je hlavná myšlienka. Voda stúpa v drevných cievkach (xyléme) takto:
1. Z listov sa voda **vyparuje** (transpirácia).
2. Tým vznikne v cievkach **podtlak (ťah)**, ktorý vodu ťahá zdola nahor.
3. Funguje to preto, že molekuly vody **držia spolu** (kohézia) – tvoria neprerušený stĺpec ako retiazka. Keď sa hore jedna molekula odparí, potiahne celý stĺpec za sebou.

Predstav si to ako **pitie cez slamku**: keď nasaješ hore, celý stĺpec tekutiny sa pohne za tebou. Pri stromoch ten „ťah" robí slnko, ktoré vyparuje vodu z listov.

## Výdaj vody
- **Transpirácia** – výpar vody cez **prieduchy** (asi 90 % vody); rastlina to vie regulovať otváraním/zatváraním prieduchov.
- **Gutácia** – vytláčanie kvapiek tekutej vody cez **hydatódy** (keď je vody priveľa).

## Slovníček po lopate
- **Transpirácia** = výpar vody z rastliny cez prieduchy.
- **Transpiračný ťah** = sila, ktorá ťahá vodu nahor vďaka výparu z listov.
- **Kohézia** = molekuly vody držia spolu (tvoria stĺpec).
- **Xylém** = drevné cievy, ktorými stúpa voda.

## Príklad zo života
Najvyššie stromy sveta – sekvoje – ženú vodu do výšky cez 100 metrov, a to len vďaka výparu z listov a tomu, že molekuly vody držia spolu. Žiadne čerpadlo! Je to ako keby si cez slamku dlhú ako mrakodrap potiahol vodu len silou slnka.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Opíš **príjem vody** osmózou cez koreňové vlásky.
2. Vysvetli **transpiračný ťah** (výpar → podtlak → ťah) a prirovnaj k slamke.
3. Zdôrazni **kohéziu a adhéziu** vody (drží stĺpec).
4. Opíš **výdaj vody** (transpirácia cez prieduchy, gutácia cez hydatódy).
5. Pridaj príklad (sekvoje a voda do 100 m bez pumpy).`,

"19-2":`## Predstav si to takto
Príroda nie je nekonečná – mnohé druhy a krajiny sú ohrozené, preto ich treba chrániť. **Ochrana prírody** sú všetky spôsoby, ako zachovať rastliny, živočíchy a ekosystémy pre budúcnosť. Robí sa to dvoma hlavnými cestami: priamo v prírode, alebo „v záchrannej stanici".

## Dva spôsoby ochrany
- **In situ** („na mieste") – chránime druh **priamo tam, kde žije** (národný park, rezervácia). Je to najlepšie, lebo zostáva v prirodzenom prostredí.
- **Ex situ** („mimo miesta") – chránime ho **inde** (ZOO, botanická záhrada, **génová banka**, kde sa uchovávajú semená). Používa sa, keď je druh tak ohrozený, že v prírode by neprežil.

## Chránené územia na Slovensku (od najprísnejšej ochrany)
1. **Národný park (NP)** – najvyššia ochrana (napr. **Tatranský NP, Slovenský raj, Nízke Tatry, Malá a Veľká Fatra**).
2. **Chránená krajinná oblasť (CHKO)** – väčšie územie s miernejšou ochranou.
3. **Prírodná rezervácia.**
4. **Prírodná pamiatka** – jedinečný prírodný útvar.

## Medzinárodná ochrana
- **CITES** – dohovor, ktorý zakazuje obchod s ohrozenými druhmi (slonovina, exotické zvieratá).
- **Natura 2000** – sieť chránených území Európskej únie.

## Červený zoznam (IUCN)
Druhy sa zaraďujú podľa ohrozenia: **vyhynuté (EX)**, **kriticky ohrozené (CR)**, **ohrozené (EN)**, **zraniteľné (VU)** až po **málo dotknuté (LC)**.

## Slovníček po lopate
- **In situ** = ochrana priamo v prírode.
- **Ex situ** = ochrana mimo prírody (ZOO, génová banka).
- **CITES** = zákaz obchodu s ohrozenými druhmi.
- **Červený zoznam** = rebríček ohrozenia druhov.

## Príklad zo života
Keď si v ZOO, vidíš **ex situ** ochranu – mnohé ohrozené zvieratá sa tam rozmnožujú a niekedy sa vracajú späť do prírody. Keď turista nesmie odísť z chodníka v Tatranskom národnom parku, je to **in situ** ochrana citlivého prostredia.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je ochrana prírody a prečo je dôležitá.
2. Rozlíš **in situ a ex situ** s príkladmi.
3. Vymenuj **kategórie chránených území** v SR a aspoň 3 národné parky.
4. Spomeň **medzinárodné dohovory** (CITES, Natura 2000).
5. Vysvetli **Červený zoznam** a pridaj príklad (ZOO vs. národný park).`,

"20-0":`## Predstav si to takto
Nahosemenné rastliny sú stromy a kríky, ktoré majú namiesto kvetov **šišky** a ktorých semená sú „nahé" – ležia voľne na šupinách šišky, **nie sú uzavreté v plode**. Práve odtiaľ názov: „naho-semenné". Patria sem najmä ihličnany ako smrek, borovica či jedľa.

## Hlavné skupiny
- **Cykasy** – tropické palmovité dreviny, prežitky z čias dinosaurov.
- **Ginkgo** – „**živá fosília**", strom s vejárovitými listami, ktorý sa nezmenil milióny rokov; používa sa v liekoch na pamäť.
- **Ihličnany** – najrozšírenejšie nahosemenné, naše ihličnaté lesy.

## Štyri naše ihličnany (musíš ich rozlíšiť)
- **Borovica** – ihly vyrastajú **po dvoch v zväzočku**.
- **Smrek** – ihly **ostré, štvorhranné**, pichľavé; šišky **visia** nadol.
- **Jedľa** – ihly **ploché a mäkké**, nepichajú; šišky **stoja hore**.
- **Smrekovec** – jediný náš ihličnan, ktorý **na zimu opadá** (ihly v chomáčikoch).

## Prečo majú ihly (a nie listy)
Ihly sú prispôsobené na **sucho a mráz**: sú malé, tuhé, pokryté voskom a majú zapustené prieduchy. Vďaka tomu rastlina **stráca málo vody** a vydrží aj mrazivú zimu, keď je voda zamrznutá. Preto ihličnany zostávajú zelené celý rok a rastú aj na severe.

## Slovníček po lopate
- **Nahosemenné** = rastliny so semenami, ktoré nie sú v plode (sú na šiškách).
- **Šiška** = orgán nahosemenných nesúci semená.
- **Ihla** = list ihličnanu prispôsobený na sucho a mráz.
- **Živá fosília** = druh, ktorý sa milióny rokov nezmenil (ginkgo).

## Príklad zo života
Vianočný stromček je nahosemenná rastlina – väčšinou smrek alebo jedľa. Rozlíšiš ich ľahko: jedľa má mäkké ploché ihly a nepichá (preto je obľúbená), smrek pichá a má štvorhranné ihly. Ich „šuškanie" pod stromčekom sú ich šišky.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **nahosemenné** (semená na šiškách, nie v plode).
2. Vymenuj **skupiny** (cykasy, ginkgo – živá fosília, ihličnany).
3. Rozlíš **4 ihličnany** podľa ihiel a šišiek (borovica, smrek, jedľa, smrekovec).
4. Vysvetli **prispôsobenie ihiel** na sucho a mráz.
5. Spomeň **význam** (lesy, drevo) a pridaj príklad (vianočný stromček).`,

"20-1":`## Predstav si to takto
Prečo sa deti podobajú na rodičov? Túto otázku ako prvý vedecky preskúmal mních **Gregor Mendel**, ktorý v kláštornej záhrade krížil **hrach** a pozoroval, ako sa dedia vlastnosti. Objavil pri tom pravidlá – **Mendelove zákony dedičnosti** – ktoré platia dodnes a sú základom genetiky.

## Pár pojmov na úvod
- **Gén** – návod na jednu vlastnosť (napr. farbu kvetu).
- **Alela** – konkrétna verzia génu (napr. „červená" alebo „biela"). Označujeme veľkým a malým písmenom: **A** (dominantná) a **a** (recesívna).
- **Dominantná alela (A)** – prejaví sa, aj keď je len jedna.
- **Recesívna alela (a)** – prejaví sa, len keď sú **obe** recesívne (aa).
- **Genotyp** = aké alely má (AA, Aa, aa); **fenotyp** = ako vyzerá.

## 1. Mendelov zákon – o jednotnosti a štiepení
Keď skrížiš čistokrvného rodiča s dominantnou vlastnosťou (AA) a recesívnou (aa):
- **Prvá generácia** je **jednotná** – všetci potomkovia sú Aa a vyzerajú rovnako (prejaví sa dominantná vlastnosť).
- Keď skrížiš dvoch takýchto potomkov (Aa × Aa), v **druhej generácii** sa vlastnosti **rozštiepia** v pomere **3 : 1** (3 dominantné na 1 recesívneho).

## 2. Mendelov zákon – o nezávislom dedení
Ak sledujeme **dve rôzne vlastnosti** naraz (napr. farbu aj tvar), dedia sa **nezávisle** od seba (ak sú na rôznych chromozómoch). Pri krížení dvoch znakov vznikne pomer **9 : 3 : 3 : 1**.

## Punnettov štvorec
Je to **tabuľka**, do ktorej napíšeš alely od oboch rodičov a vyplníš kombinácie potomkov. Pomôže ti vypočítať, s akou pravdepodobnosťou bude potomok mať danú vlastnosť.

## Slovníček po lopate
- **Dominantná alela** = prejaví sa aj sama (veľké písmeno).
- **Recesívna alela** = prejaví sa len v dvojici (aa).
- **Genotyp vs. fenotyp** = výbava génov vs. vzhľad.
- **Punnettov štvorec** = tabuľka na výpočet potomkov.

## Príklad zo života
Dvaja hnedookí rodičia môžu mať modrooké dieťa. Ako? Ak sú obaja **Aa** (hnedá je dominantná, modrá recesívna), ich dieťa môže dostať od oboch recesívnu alelu (aa) a mať modré oči – presne v Mendelovom pomere 3:1. Punnettov štvorec to krásne ukáže.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav **Mendela** a pokusy s hrachom.
2. Vysvetli pojmy **gén, alela, dominantná/recesívna, genotyp/fenotyp**.
3. Opíš **1. zákon** (jednotnosť F1, štiepenie 3:1 v F2).
4. Opíš **2. zákon** (nezávislé dedenie, 9:3:3:1).
5. Ukáž **Punnettov štvorec** a pridaj príklad (hnedoocí rodičia, modrooké dieťa).`,

"20-2":`## Predstav si to takto
Toto praktikum je o určovaní **bezstavovcov** (živočíchov bez chrbtice) pomocou **určovacieho kľúča** – tej istej „hry áno/nie", akú sme používali pri rastlinách. Najdôležitejší rozlišovací znak je tu **počet nôh a častí tela**.

## Hlavné skupiny bezstavovcov
- **Obrúčavce** (dážďovka, pijavica) – článkované valcovité telo, **žiadne nohy**.
- **Mäkkýše** (slimák, slávka, chobotnica) – mäkké telo, často s **ulitou/schránkou**, „noha" na pohyb.
- **Článkonožce** – tu rozlišuješ podľa nôh:
  - **Hmyz** – **6 nôh**, 3 časti tela, 1 pár tykadiel,
  - **Pavúkovce** – **8 nôh**, 2 časti tela, žiadne tykadlá,
  - **Kôrovce** – **10 a viac nôh**, 2 páry tykadiel,
  - **Mnohonôžky** – množstvo nôh.
- **Ostnokožce** (hviezdica, ježovka) – **lúčovitá súmernosť** (telo do hviezdy) a tŕne.

## Postup určovania
1. Vezmi živočícha (alebo obrázok/model).
2. Postupuj cez kľúč – pri každom kroku odpovedz na otázku (napr. „má nohy? koľko?").
3. Pokračuj, kým nedôjdeš k názvu skupiny/druhu.
4. Over si výsledok v atlase.

## Najdôležitejšie rozlišovacie znaky
- **počet nôh** (0 / 6 / 8 / 10+ / veľa),
- **počet tykadiel**,
- **prítomnosť ulity alebo schránky**,
- **typ tela** (článkované / mäkké / hviezdicovité).

## Slovníček po lopate
- **Bezstavovec** = živočích bez chrbtice.
- **Určovací kľúč** = pomôcka s otázkami áno/nie.
- **Lúčovitá súmernosť** = telo usporiadané do hviezdy (ostnokožce).
- **Tykadlá** = zmyslové výbežky na hlave.

## Príklad zo života
Ako rýchlo rozoznáš pavúka od hmyzu? **Spočítaj nohy:** pavúk má 8 (a žiadne tykadlá), hmyz má 6 (a tykadlá). Preto pavúk nie je hmyz – je to častý chyták, na ktorom môžeš na skúške zažiariť.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je bezstavovec a načo slúži určovací kľúč.
2. Vymenuj **hlavné skupiny** s ich kľúčovými znakmi.
3. Zdôrazni rozlíšenie **hmyz (6) vs. pavúkovce (8)** podľa nôh.
4. Opíš **postup** určovania.
5. Zhrň **rozlišovacie znaky** (nohy, tykadlá, schránka) a pridaj príklad (pavúk ≠ hmyz).`,

"21-0":`## Predstav si to takto
O tom, či bude z dieťaťa chlapec alebo dievča, rozhodujú **pohlavné chromozómy**: žena má **XX**, muž má **XY**. A keďže niektoré gény ležia práve na chromozóme X, dedia sa zvláštnym spôsobom – inak u mužov a inak u žien. Tomu sa hovorí **gonozómová (na pohlavie viazaná) dedičnosť**.

## Prečo je to u mužov a žien rozdielne
- Žena má **dva X** – ak má na jednom chybný gén, druhý zdravý X ho **zachráni**.
- Muž má len **jeden X** (a malý Y) – ak má na svojom jedinom X chybný gén, **nemá náhradu** a choroba sa prejaví.

Preto pri chorobách viazaných na X platí: **postihnutí sú väčšinou muži, ženy bývajú len prenášačky** (nosička = má chybný gén na jednom X, ale je zdravá vďaka druhému X).

## Príklady chorôb viazaných na X
- **Daltonizmus (farbosleposť)** – neschopnosť rozlíšiť červenú a zelenú.
- **Hemofília** – krv sa zle zráža, aj malé poranenie dlho krváca.
Obe sú recesívne a viazané na X – preto nimi trpia hlavne muži.

## Dedičnosť cez Y
Gény na chromozóme Y sa prenášajú **len z otca na syna** (dcéra Y nedostane). Najdôležitejší je gén SRY, ktorý spúšťa vývoj mužského pohlavia.

## Ako riešiť genetické úlohy
1. Zapíš genotypy rodičov aj s chromozómami (napr. matka prenášačka X^H X^h × zdravý otec X^H Y).
2. Zostav **Punnettov štvorec**.
3. Urči, akí budú potomkovia a s akou pravdepodobnosťou.

## Slovníček po lopate
- **Gonozómy** = pohlavné chromozómy (X a Y).
- **Prenášačka (nosička)** = žena so zdravým a chybným X, sama zdravá.
- **Hemizygot** = muž s jedinou kópiou génu na X.
- **Daltonizmus, hemofília** = choroby viazané na X (hlavne u mužov).

## Príklad zo života
Farbosleposťou trpí oveľa viac mužov než žien. Prečo? Lebo mužovi stačí jeden chybný X (nemá náhradu), kým žena by potrebovala chybné **oba** X, čo je vzácne. Žena je preto zvyčajne len prenášačkou a chybný gén odovzdá synovi.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pohlavné chromozómy (žena XX, muž XY).
2. Vysvetli, **prečo sú postihnutí hlavne muži** (chýba im záložný X).
3. Definuj **prenášačku** a uveď **príklady** (daltonizmus, hemofília).
4. Spomeň **dedičnosť cez Y** (otec → syn).
5. Ukáž **postup riešenia úlohy** s Punnettovým štvorcom a pridaj príklad (farbosleposť).`,

"21-1":`## Predstav si to takto
Niektoré zvieratá sú „studenokrvné" a niektoré „teplokrvné". Jašterica sa musí najprv vyhriať na slnku, aby sa mohla hýbať, kým pes je teplý a aktívny aj v zime. Tento rozdiel je o **termoregulácii** – ako si zviera udržiava telesnú teplotu.

## Dve skupiny podľa teploty tela
- **Studenokrvné (poikilotermné)** – telesná teplota sa mení **podľa okolia**. Patria sem ryby, obojživelníky, plazy a väčšina bezstavovcov. Výhoda: spotrebujú málo energie (nemusia sa hriať). Nevýhoda: v zime sú spomalené alebo musia spať.
- **Teplokrvné (homeotermné)** – udržiavajú si **stálu teplotu** bez ohľadu na okolie. Patria sem **vtáky a cicavce**. Výhoda: sú aktívne za každého počasia. Nevýhoda: potrebujú veľa potravy (palivo na kúrenie).

## Ako sa zviera zahreje (tvorba tepla)
- **Triasenie (svalové chvenie)** – rýchle sťahy svalov vyrábajú teplo (aj ty sa trasieš v zime).
- **Hnedé tukové tkanivo** – špeciálny tuk, ktorý priamo mení energiu na teplo (majú ho bábätká a zvieratá v zimnom spánku).
- **Stiahnutie ciev** v koži – krv sa stiahne dovnútra, aby telo nestrácalo teplo cez povrch.

## Ako sa zviera ochladí
- **Potenie** – odparovaním potu sa telo chladí (človek, kôň).
- **Dychčanie** – psy nemajú potné žľazy, tak sa chladia rýchlym dýchaním s vyplazeným jazykom.
- **Rozšírenie ciev** v koži – odvádza teplo von (uši zajaca, slona fungujú ako chladič).

## Adaptácie polárnych zvierat
Hrubá vrstva tuku, hustá srsť/perie a šikovný „výmenník tepla" v cievach nôh, aby im teplo neunikalo do ľadu.

## Slovníček po lopate
- **Poikilotermný (studenokrvný)** = teplota tela podľa okolia.
- **Homeotermný (teplokrvný)** = stála teplota tela.
- **Termoregulácia** = udržiavanie telesnej teploty.
- **Triasenie/potenie** = spôsoby zahriatia/ochladenia.

## Príklad zo života
V chladné ráno vidíš jaštericu nehybne sedieť na slnku – „nabíja sa" teplom, kým sa nezohreje natoľko, aby mohla loviť (studenokrvná). Pes vedľa nej pobehuje aj v mraze, lebo je teplokrvný – len musí viac jesť, aby mal palivo na svoje vnútorné „kúrenie".

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem **termoregulácia**.
2. Porovnaj **studenokrvné a teplokrvné** zvieratá (výhody, nevýhody, príklady).
3. Opíš **spôsoby zahrievania** (triasenie, hnedý tuk, stiahnutie ciev).
4. Opíš **spôsoby chladenia** (potenie, dychčanie, rozšírenie ciev).
5. Spomeň **adaptácie polárnych zvierat** a pridaj príklad (jašterica vs. pes).`,

"21-2":`## Predstav si to takto
Toto je „odborný text" o **klimatickej zmene** – dlhodobom otepľovaní Zeme, ktoré dnes spôsobuje najmä **ľudská činnosť**. Predstav si Zem ako auto na slnku: skleníkové plyny fungujú ako zatvorené okná, ktoré dnu zadržiavajú teplo. Trochu je dobré (inak by bola Zem zamrznutá), ale priveľa škodí.

## Príčiny – zosilnený skleníkový efekt
Spaľovaním palív a ďalšou činnosťou pridávame do ovzdušia **skleníkové plyny**, ktoré zadržiavajú teplo:
- **Oxid uhličitý (CO₂)** – z áut, tovární, elektrární a z odlesňovania.
- **Metán (CH₄)** – z chovu dobytka, skládok, ryžových polí.
- **Oxid dusný a freóny.**
- **Odlesňovanie** – stromy pohlcujú CO₂; keď ich vyrúbeme, CO₂ sa hromadí.

## Dôsledky
- **Otepľovanie** – priemerná teplota Zeme stúpa.
- **Topenie ľadovcov** → stúpa hladina morí → zaplavujú sa nízko položené územia.
- **Extrémne počasie** – viac súch, záplav, požiarov, búrok.
- **Okyslenie oceánov** – CO₂ sa rozpúšťa vo vode a škodí koralom a mušliam.
- **Posun a vymieranie druhov** – zvieratá sa sťahujú za chladom k pólom a do hôr.

## Riešenia
- **Obnoviteľné zdroje** – slnko, vietor, voda namiesto uhlia a ropy.
- **Šetrenie energie**, elektromobily.
- **Ochrana a obnova lesov.**
- **Medzinárodné dohody** – Parížska dohoda (2015) sa snaží obmedziť otepľovanie.

## Slovníček po lopate
- **Skleníkový efekt** = zadržiavanie tepla skleníkovými plynmi.
- **Skleníkové plyny** = CO₂, metán a ďalšie.
- **Okyslenie oceánov** = pokles pH morí pohlcovaním CO₂.
- **Obnoviteľné zdroje** = energia zo slnka, vetra, vody.

## Príklad zo života
Keď necháš auto zatvorené na slnku, vnútri je oveľa teplejšie než vonku – sklo prepustí slnko dnu, ale teplo už nepustí von. Presne tak fungujú skleníkové plyny okolo Zeme. A čím viac ich pridávame, tým „tesnejšie zatvárame okná" planéty.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli **skleníkový efekt** (prirovnanie k autu na slnku).
2. Vymenuj **príčiny** a hlavné skleníkové plyny (CO₂, metán) + odlesňovanie.
3. Opíš **dôsledky** (otepľovanie, topenie ľadovcov, extrémne počasie, okyslenie oceánov).
4. Navrhni **riešenia** (obnoviteľné zdroje, ochrana lesov, dohody).
5. Pridaj príklad (zatvorené auto na slnku).`,

"22-0":`## Predstav si to takto
Toto zadanie spája dve veci: ako sa telo zbavuje odpadu (**vylučovacia sústava**) a najväčší orgán tela (**koža**). Predstav si telo ako domácnosť: vylučovacia sústava je „kanalizácia", ktorá odvádza odpad, a koža je „stena domu", ktorá chráni vnútro a aj trochu pomáha upratovať.

## Vylučovacia sústava – čistička krvi
Hlavný orgán sú **obličky** – dva fazuľovité orgány, ktoré **filtrujú krv** a vyrábajú moč. Pracujú v troch krokoch:
1. **Filtrácia** – z krvi sa odfiltruje obrovské množstvo tekutiny (až 180 litrov denne!).
2. **Spätné vstrebávanie** – väčšina vody a užitočné látky (cukor, soli) sa vrátia späť do krvi.
3. Zostane len **moč** (asi 1,5 litra denne) s odpadom, ktorý odíde cez močovody → močový mechúr → von.

Základná „filtračná jednotka" obličky sa volá **nefrón** a v každej obličke ich je asi milión.

## Koža – najväčší orgán
Koža má tri vrstvy:
- **Pokožka (epidermis)** – vrchná ochranná vrstva; obsahuje **melanín** (farbivo, ktoré chráni pred UV a dáva farbu pokožke).
- **Zamša (dermis)** – stredná vrstva; sú v nej cievy, nervy, **potné žľazy** a vlasové korienky.
- **Podkožné tkanivo** – tuková vrstva (izolácia a zásoba energie).

## Funkcie kože
- **Ochrana** (pred poranením, UV, baktériami),
- **Termoregulácia** (potenie ťa ochladí),
- **Vylučovanie** (cez pot odíde aj časť odpadu),
- **Tvorba vitamínu D** (vplyvom slnka),
- **Zmysly** (hmat, bolesť, teplo).

## Slovníček po lopate
- **Nefrón** = filtračná jednotka obličky.
- **Filtrácia → reabsorpcia → moč** = tri kroky tvorby moču.
- **Melanín** = farbivo chrániace pred UV.
- **Termoregulácia** = udržiavanie telesnej teploty (potenie).

## Príklad zo života
Keď je horúco, potíš sa – odparovaním potu sa koža (a celé telo) ochladzuje. Zároveň obličky vtedy vyrábajú menej, ale koncentrovanejšieho moču, aby si nestratil priveľa vody. Telo tak šikovne hospodári s vodou.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli úlohu vylučovacej sústavy (zbavovať telo odpadu).
2. Opíš **obličky a nefrón** a **3 kroky** tvorby moču.
3. Opíš cestu moču (obličky → mechúr → von).
4. Opíš **3 vrstvy kože** a melanín.
5. Vymenuj **funkcie kože** a pridaj príklad (potenie a hospodárenie s vodou).`,

"22-1":`## Predstav si to takto
Všetky bunky na svete sú dvoch typov: jednoduché **prokaryotické** (bez jadra) a zložité **eukaryotické** (s jadrom a „orgánikmi"). Predstav si to ako rozdiel medzi **jednoizbovým bytom** (prokaryot – všetko v jednej miestnosti) a **veľkým domom s mnohými miestnosťami** (eukaryot – každá organela má svoju izbu).

## Prokaryotická bunka – jednoduchá
- **Malá** (0,1–10 μm).
- **Nemá jadro** – DNA pláva voľne v bunke (nukleoid).
- **Nemá membránové organely** – len ribozómy.
- Má bunkovú stenu, často bičík.
- Patria sem **baktérie**.

## Eukaryotická bunka – zložitá
- **Väčšia** (10–100 μm).
- **Má jadro** – DNA je bezpečne uzavretá v jadre.
- **Má membránové organely** – každá robí inú prácu:
  - **Mitochondria** – „elektráreň", vyrába energiu (ATP).
  - **Chloroplast** – fotosyntéza (len rastliny).
  - **Endoplazmatické retikulum** – výroba bielkovín a tukov.
  - **Golgiho aparát** – „pošta", triedi a balí látky.
  - **Lyzozómy** – „tráviace mechúriky", rozkladajú odpad.
- Patria sem **rastliny, živočíchy, huby, prvoky**.

## Endosymbiotická teória
Krásna myšlienka: **mitochondrie a chloroplasty** kedysi boli samostatné baktérie, ktoré väčšia bunka pohltila a nestrávila – tie v nej zostali žiť. Dôkaz? Majú **vlastnú DNA** a vlastné ribozómy, podobné baktériám.

## Slovníček po lopate
- **Prokaryot** = bunka bez jadra (baktéria).
- **Eukaryot** = bunka s jadrom a organelami.
- **Organela** = „orgánik" bunky s konkrétnou úlohou.
- **Endosymbióza** = jedna bunka žije vnútri druhej.

## Príklad zo života
Mitochondrie v tvojich bunkách majú vlastnú DNA, ktorú dedíš **len po mame**. Práve preto sa pomocou mitochondriálnej DNA dá vystopovať materská línia predkov. Je to dôsledok toho, že mitochondria bola kedysi samostatná baktéria.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav rozdiel jednoizbový byt vs. veľký dom.
2. Opíš **prokaryotickú** bunku (bez jadra, bez organel).
3. Opíš **eukaryotickú** bunku a hlavné **organely** a ich funkcie.
4. Porovnaj veľkosť, jadro, bunkovú stenu.
5. Vysvetli **endosymbiotickú teóriu** a pridaj príklad (mitochondriálna DNA po mame).`,

"22-2":`## Predstav si to takto
Hmyz je **najpočetnejšia skupina živočíchov** – existuje ho asi milión druhov, viac než všetkých ostatných zvierat dokopy. Spoznáš ho podľa **6 nôh** a tela rozdeleného na **3 časti**. Tento odborný text sa zameriava na stavbu hmyzu a hlavne na to, ako sa hmyz počas života mení (premena).

## Stavba tela – tri časti
- **Hlava** – tykadlá, zložené oči, ústne ústrojenstvo (na hryzenie, cmúľanie…).
- **Hruď** – nesie **3 páry nôh** a zvyčajne **krídla**.
- **Bruško** – trávenie, rozmnožovanie, vylučovanie.

Hmyz má tvrdý vonkajší pancier (exoskelet) a dýcha **vzdušnicami** (sieťou trubičiek, ktoré privádzajú vzduch priamo k bunkám).

## Dva typy premeny (toto je jadro)
- **Úplná premena:** vajce → **larva** (húsenica – len žerie a rastie) → **kukla** (premieňa sa, nehýbe sa) → **dospelec**. Larva vyzerá úplne inak než dospelec. (motýľ, chrobák, mucha, včela)
- **Neúplná premena:** vajce → **nymfa** (vyzerá ako malý dospelec bez krídel) → **dospelec**. (kobylka, šváb)

## Význam hmyzu
- **Opeľovanie** – včely a motýle opeľujú rastliny; bez nich by sme nemali väčšinu ovocia a zeleniny!
- **Produkcia** – med, vosk, hodváb.
- **Škodcovia** – niektorý hmyz ničí úrodu.
- **Prenášače chorôb** – komáre prenášajú maláriu.

## Prečo nie je hmyz veľký
Keďže dýcha vzdušnicami (vzduch ide len na krátku vzdialenosť), pri veľkom tele by sa vnútorné bunky neudusili kyslíkom. Preto má hmyz obmedzenú veľkosť.

## Slovníček po lopate
- **Exoskelet** = vonkajší pancier z chitínu.
- **Vzdušnice** = trubičky na dýchanie.
- **Úplná premena** = s kuklou (larva ≠ dospelec).
- **Neúplná premena** = bez kukly (nymfa ≈ malý dospelec).

## Príklad zo života
Keby zmizli včely, bola by to katastrofa – opeľujú obrovskú časť plodín, ktoré jeme. Preto sa hovorí, že hmyz, hoci maličký, drží naše poľnohospodárstvo pri živote.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Povedz, že hmyz je najpočetnejšia skupina, a opíš **3 časti tela** + 6 nôh.
2. Spomeň **vzdušnicové dýchanie**.
3. Podrobne vysvetli **úplnú vs. neúplnú premenu** s príkladmi.
4. Vymenuj **význam** (opeľovanie, produkcia, škodcovia).
5. Vysvetli, **prečo je hmyz malý** (dýchanie), a pridaj príklad (včely a opeľovanie).`,

"23-0":`## Predstav si to takto
Biológia nevznikla naraz – stavali ju **generácie vedcov**, kde každý pridal dôležitý kúsok poznania. Toto zadanie je o tom, kto čo objavil. Predstav si to ako galériu portrétov, kde pri každom vedcovi visí jeho najväčší objav.

## Najdôležitejší vedci a ich objavy
- **Aristoteles** – staroveký „otec biológie", prvý triedil živočíchy.
- **Robert Hooke (1665)** – cez mikroskop uvidel bunky a dal im meno **„bunka"**.
- **Anton van Leeuwenhoek** – vylepšil mikroskop, prvý uvidel **baktérie a prvoky**.
- **Carl Linné** – zaviedol **dvojmenné pomenovanie** druhov (rod + druh, napr. *Homo sapiens*) – systém, ktorý používame dodnes.
- **Schleiden a Schwann** – sformulovali **bunkovú teóriu** (všetko živé sa skladá z buniek).
- **Charles Darwin (1859)** – **teória evolúcie prírodným výberom** (prežijú najlepšie prispôsobení).
- **Gregor Mendel (1866)** – objavil **zákony dedičnosti** (pokusmi s hrachom).
- **Louis Pasteur** – dokázal, že život nevzniká „sám od seba", zaviedol **očkovanie** a **pasterizáciu**.
- **Watson a Crick (1953)** – objavili **dvojzávitnicu DNA** (na základe snímok Rosalind Franklinovej).
- **Alexander Fleming (1928)** – náhodou objavil **penicilín** (prvé antibiotikum).

## Darwin vs. Lamarck (obľúbená otázka)
- **Lamarck** si myslel, že zviera odovzdá deťom vlastnosti, ktoré získalo počas života (napr. žirafa si naťahovaním predĺži krk a deti ho zdedia dlhší). To je **nesprávne**.
- **Darwin** vysvetlil to správne: v populácii sú náhodné rozdiely a **prežijú a rozmnožia sa tí najlepšie prispôsobení** (žirafy s prirodzene dlhším krkom dosiahli viac potravy, prežili a mali viac potomkov).

## Slovníček po lopate
- **Binomická nomenklatúra** = dvojmenné pomenovanie druhu (Linné).
- **Prírodný výber** = prežijú najlepšie prispôsobení (Darwin).
- **Bunková teória** = všetko živé sa skladá z buniek.
- **Penicilín** = prvé antibiotikum (Fleming).

## Príklad zo života
Keď ti lekár predpíše antibiotikum, vďačíš Flemingovi, ktorý si v roku 1928 všimol, že pleseň na miske zabíja baktérie. Bola to náhoda – ale pripravená myseľ ju premenila na objav, ktorý zachránil milióny životov.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že biológiu budovali generácie vedcov.
2. Prejdi **kľúčové osobnosti** a ich objavy (Hooke, Linné, Darwin, Mendel, Pasteur, Watson-Crick, Fleming).
3. Zdôrazni **bunkovú teóriu** a **objav DNA**.
4. Vysvetli rozdiel **Darwin vs. Lamarck**.
5. Pridaj príklad (Fleming a objav penicilínu).`,

"23-1":`## Predstav si to takto
DNA je **návod na stavbu celého tela** – obrovská kniha receptov uložená v každej bunke. RNA je „pracovná kópia" útržku tohto návodu, ktorá ho odnesie tam, kde sa podľa neho vyrobí bielkovina. Spolu zabezpečujú, aby telo vedelo, čo a ako má stavať.

## Stavba DNA – dvojzávitnica
DNA vyzerá ako **skrútený rebrík** (dvojzávitnica). Skladá sa z písmen – **báz**: A, T, G, C. Tie sa **párujú podľa pevného pravidla**:
- **A vždy s T**,
- **G vždy s C**.

Toto párovanie je kľúčové – znamená, že jedno vlákno je presným „odtlačkom" druhého. Preto sa DNA dá presne kopírovať.

## Replikácia (kopírovanie DNA)
Pri delení bunky sa DNA **rozzipsuje** na dve vlákna a ku každému sa dorobí nové, doplnkové vlákno. Vďaka pravidlu párovania (A-T, G-C) vznikne presná kópia. Každá nová DNA má jedno staré a jedno nové vlákno (semikonzervatívna replikácia).

## RNA – pracovná kópia
RNA je podobná DNA, ale je **jednovláknová** a namiesto T má **U (uracil)**. Máme tri druhy:
- **mRNA** – odnesie kópiu návodu z jadra k „továrni" (ribozómu).
- **tRNA** – privezie správnu aminokyselinu (stavebný diel).
- **rRNA** – tvorí samotnú továreň (ribozóm).

## Centrálna dogma (tok informácie)
**DNA → mRNA → bielkovina**
- **Transkripcia** – z DNA sa prepíše mRNA (v jadre).
- **Translácia** – podľa mRNA sa na ribozóme poskladá bielkovina.

## Slovníček po lopate
- **DNA** = návod na stavbu tela (dvojzávitnica).
- **Báza** = písmeno DNA (A, T, G, C).
- **Párovanie** = A-T a G-C.
- **mRNA** = pracovná kópia návodu; **transkripcia/translácia** = prepis/preklad.

## Príklad zo života
Predstav si DNA ako vzácnu kuchársku knihu, ktorú nesmieš vyniesť z knižnice (jadra). Tak si z nej **odpíšeš jeden recept** (mRNA) a ten odnesieš do kuchyne (ribozómu), kde podľa neho navaríš jedlo (bielkovinu). Originál knihy zostane bezpečne uložený.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli DNA ako návod a jej **dvojzávitnicovú** stavbu.
2. Zdôrazni **párovanie báz** (A-T, G-C) a načo je dôležité.
3. Opíš **replikáciu** (kopírovanie DNA).
4. Vymenuj **typy RNA** a rozdiely DNA vs. RNA.
5. Vysvetli **centrálnu dogmu** (DNA → mRNA → bielkovina) a pridaj príklad (kniha receptov).`,

"23-2":`## Predstav si to takto
Koreň je „spodná polovica" rastliny, ktorú nevidíme. Drží rastlinu v zemi a nasáva vodu s minerálmi. Tento odborný text sa zameriava na to, že koreň nie je všade rovnaký – má rôzne **pásma**, kde každé robí inú prácu, ako poschodia v dome.

## Pásma koreňa (od špičky nahor)
1. **Koreňová čiapočka** – „prilba" na špičke, ktorá chráni jemný rastový vrchol, keď sa koreň prediera zemou. Obrusuje sa a stále dorastá.
2. **Deliace pásmo** – tu sa bunky horlivo **delia** a vznikajú nové.
3. **Predlžovacie pásmo** – tu sa bunky **naťahujú**, takže koreň rastie do dĺžky (predlžuje sa do zeme).
4. **Absorbčné pásmo** – tu sú **koreňové vlásky**, ktoré obrovsky zväčšujú plochu a **nasávajú vodu a minerály**. Toto je hlavná „pijacia" zóna.
5. **Pásmo bočných koreňov** – starší úsek, z ktorého vyrastajú bočné korene.

## Typy koreňov
- **Kôlový** – jeden hrubý hlavný koreň (mrkva, repa); typický pre dvojklíčnolistové.
- **Vláknitý** – zväzok rovnako tenkých koreňov (trávy); typický pre jednoklíčnolistové.
- **Špeciálne korene:** vzdušné (orchidey), zásobné (mrkva), prísavné (brečtan, ktorý sa drží steny), príživnícke (imelo).

## Slovníček po lopate
- **Koreňová čiapočka** = ochranná „prilba" na špičke koreňa.
- **Koreňové vlásky** = jemné výbežky na nasávanie vody.
- **Kôlový koreň** = jeden hlavný hrubý koreň.
- **Vláknitý koreň** = zväzok tenkých koreňov.

## Príklad zo života
Mrkva je v skutočnosti **zásobný kôlový koreň** – rastlina si v ňom uložila zásoby cukru. Preto je sladká a hrubá. A keď presádzaš rastlinu a polámeš jej jemné koreňové vlásky, chvíľu vädne – stratila svoju „pijaciu" zónu a musí ju najprv obnoviť.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vymenuj **funkcie koreňa**.
2. Prejdi **pásma koreňa** od čiapočky po bočné korene (vieš ich aj nakresliť).
3. Zdôrazni **absorbčné pásmo a koreňové vlásky**.
4. Rozlíš **kôlový a vláknitý** koreň + špeciálne korene.
5. Pridaj príklad (mrkva = zásobný koreň, vädnutie po presádzaní).`,

"24-0":`## Predstav si to takto
Každé zviera vyrába odpad (najmä z rozkladu bielkovín) a musí sa ho zbaviť. Tento odpad je často **jedovatý amoniak**. Počas vývoja zvierat sa **vylučovanie zdokonaľovalo** tak, aby zviera čo najmenej strácalo vodu – čo bolo kľúčové pri prechode zo života vo vode na suchú zem.

## Vývoj vylučovacích orgánov
- **Jednobunkovce:** odpad jednoducho difunduje cez povrch; majú aj sťahovaciu vakuolu na prebytočnú vodu.
- **Ploskavce:** prvý jednoduchý orgán – **protonefrídie** (plameňové bunky).
- **Obrúčavce (dážďovka):** dokonalejšie **metanefrídie** (trubičky).
- **Hmyz:** **Malpighiho trubice**, ktoré vylučujú **kyselinu močovú** (takmer bez straty vody – výborné pre život na suchu).
- **Stavovce:** **obličky** s nefrónmi (čoraz dokonalejšie).

## Kľúčový trend (toto je jadro)
Odpad sa postupne menil podľa toho, koľko vody má zviera k dispozícii:
- **Amoniak** – veľmi jedovatý, treba veľa vody na zriedenie → ryby (žijú vo vode, vody majú dosť).
- **Močovina (urea)** – menej jedovatá, treba menej vody → obojživelníky, cicavce (aj človek).
- **Kyselina močová** – takmer netoxická, tuhá, takmer bez vody → plazy a vtáky (tá biela časť vtáčieho trusu!).

Trend je jasný: **od vodného života k suchozemskému sa odpad mení tak, aby sa šetrila voda.**

## Slovníček po lopate
- **Vylučovanie** = zbavovanie sa odpadu (najmä z bielkovín).
- **Amoniak** = jedovatý odpad, potrebuje veľa vody.
- **Močovina** = menej jedovatý odpad (cicavce).
- **Kyselina močová** = tuhý odpad šetriaci vodu (vtáky, plazy).

## Príklad zo života
Prečo je vtáčí trus z časti biely? Tá biela hmota je **kyselina močová** – vtákov spôsob, ako vylúčiť odpad takmer bez straty vody (dôležité, keď lietaš a nemôžeš nosiť ťažkú vodu navyše). Cicavce si to nemôžu dovoliť, preto vylučujú tekutý moč s močovinou.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je vylučovanie a prečo je odpad problém (toxicita).
2. Prejdi vývoj orgánov (protonefrídie → metanefrídie → Malpighiho trubice → obličky).
3. Zdôrazni **kľúčový trend**: amoniak → močovina → kyselina močová.
4. Prepoj typ odpadu s prostredím (voda vs. súš).
5. Pridaj príklad (biely vtáčí trus = kyselina močová).`,

"24-1":`## Predstav si to takto
V prírode jeden zje druhého a sám sa stane potravou pre ďalšieho. Tomuto „kto koho zje" hovoríme **potravový reťazec** – je to cesta, po ktorej putuje energia (pôvodne zo slnka) z jedného organizmu na druhý.

## Články reťazca
- **Producenti** – zelené rastliny. Vyrobia si potravu zo slnka (fotosyntéza). Sú začiatkom všetkého.
- **Primárni konzumenti (bylinožravce)** – žerú rastliny (zajac, húsenica).
- **Sekundárni konzumenti (mäsožravce)** – žerú bylinožravce (líška, žaba).
- **Terciárni konzumenti (vrcholoví predátori)** – na vrchole (orol, vlk).
- **Rozkladači (huby, baktérie)** – rozložia mŕtve telá a vrátia živiny do pôdy. Uzatvárajú kruh.

## Potravová sieť
V skutočnosti nejde o jednoduchú čiaru, ale o **sieť** – jeden druh žerie viacero druhov a sám je potravou pre viacerých. Čím je sieť pestrejšia, tým je príroda **stabilnejšia** (keď vypadne jeden článok, ostatné to vyrovnajú).

## Pravidlo 10 % (dôležité)
Pri každom kroku v reťazci sa ďalej prenesie len asi **10 % energie** – zvyšok sa stratí ako teplo a pohyb. Preto:
- predátorov na vrchole je vždy málo (energie hore už zostáva málo),
- reťazec má len 4–5 článkov (viac by sa „neuživilo").

## Bioakumulácia
Jedy (napr. ortuť, pesticídy) sa v telách hromadia a postupujú reťazcom nahor. Na vrchole (veľká ryba, dravec) môže byť ich koncentrácia **tisíce krát vyššia** než v prostredí. Preto sú vrcholoví predátori najohrozenejší otravou.

## Slovníček po lopate
- **Producent** = rastlina (vyrobí potravu zo slnka).
- **Konzument** = ten, kto žerie iných.
- **Rozkladač** = huba/baktéria (vracia živiny do pôdy).
- **Pravidlo 10 %** = na ďalší stupeň prejde len desatina energie.

## Príklad zo života
Prečo sa neodporúča jesť priveľa veľkých morských rýb (napr. tuniaka)? Lebo na vrchole potravového reťazca sa v nich **bioakumuluje ortuť** z celého reťazca pod nimi. Malá rybka má ortuti málo, ale veľký dravec, čo zožral tisíce malých rybiek, jej má nazhromaždené veľa.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli potravový reťazec ako tok energie zo slnka.
2. Prejdi **články** (producent → konzumenti → rozkladač).
3. Vysvetli **potravovú sieť** a prečo je stabilnejšia.
4. Vysvetli **pravidlo 10 %** (prečo je málo predátorov).
5. Vysvetli **bioakumuláciu** a pridaj príklad (ortuť v tuniakovi).`,

"24-2":`## Predstav si to takto
Rastliny si ukladajú energiu vo forme **škrobu** – tak ako si my odkladáme peniaze do banky. Tento škrob je uložený v drobných **škrobových zrnách** vnútri buniek (napr. v zemiaku). V tomto praktiku ich nielen uvidíš pod mikroskopom, ale aj **chemicky dokážeš** špeciálnym roztokom.

## Kde je škrob
V zemiakových hľuzách, v obilninách (pšenica, ryža, kukurica), v strukovinách. Sú to „špajze" rastliny.

## Pomôcky a postup
Zemiak, mikroskop, sklíčka a **Lugolov roztok** (jód) – ten so škrobom reaguje a sfarbí ho na **tmavomodro až čierno** (to je dôkazová reakcia na škrob!).
1. Zoškrab trochu zemiaka na sklíčko (alebo odrež tenučký rez).
2. Pridaj kvapku vody.
3. Kvapni naň **Lugolov roztok** – ihneď stmavne domodra/dočierna.
4. Prikry krycím sklíčkom a pozoruj pri 200–400×.

## Čo uvidíš
- **Oválne zrná** sfarbené tmavomodro (po pridaní jódu).
- V strede zrna bodku – **hilum** (miesto, kde zrno začalo rásť).
- Okolo hila jemné **vrstvy (lamely)** – ako letokruhy, ukazujú postupný rast zrna.

## Slovníček po lopate
- **Škrob** = zásobný cukor rastlín.
- **Amyloplast** = organela, kde sa škrob ukladá.
- **Lugolov roztok (jód)** = dôkaz škrobu (sfarbí ho dočierna).
- **Hilum** = stred škrobového zrna.

## Príklad zo života
Chceš zistiť, či potravina obsahuje škrob? Kvapni na ňu jód. Na zemiaku či bielom pečive okamžite stmavne domodra – škrob je tam. Na kúsku jablka sa nič nestane. Tento jednoduchý test sa naozaj používa na dôkaz škrobu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že škrob je zásobná látka rastlín (uložená v amyloplastoch).
2. Vymenuj, **kde** sa škrob nachádza.
3. Opíš **postup** a hlavne **Lugolov test** (jód → tmavomodrá).
4. Opíš, **čo vidíš** (zrná, hilum, lamely).
5. Zdôrazni rozdiel (rastliny = škrob, živočíchy = glykogén) a pridaj príklad (test jódom na pečive).`,

"25-0":`## Predstav si to takto
Dýchacia sústava privádza do tela **kyslík** a odvádza **oxid uhličitý**. Predstav si ju ako rozvetvený strom položený dolu hlavou: kmeň je priedušnica, konáre sú priedušky a na ich koncoch sú maličké mechúriky – **alveoly** – kde sa odohráva celá výmena.

## Cesta vzduchu
Vzduch prejde touto cestou:
**nos → hltan → hrtan → priedušnica → priedušky → bronchioly → alveoly**
- **Nos** – filtruje, ohrieva a zvlhčuje vzduch.
- **Hrtan** – sú v ňom **hlasivky** (tvoria hlas); **epiglotis** (hrtanová príklopka) zabráni, aby ti jedlo zapadlo do priedušnice.
- **Priedušnica** – vystužená chrupkovými krúžkami, aby sa nezalepila.
- **Alveoly** – asi 700 miliónov mechúrikov s obrovskou plochou (~70 m²). Tu **kyslík prechádza do krvi** a CO₂ von.

## Mechanika dýchania
- **Nádych:** **bránica** (sval pod pľúcami) sa stiahne a klesne, rebrá sa zdvihnú → hrudník sa zväčší → do pľúc sa nasaje vzduch.
- **Výdych:** bránica a svaly sa uvoľnia → hrudník sa zmenší → vzduch sa vytlačí von (väčšinou samo, bez námahy).

## Čo riadi dýchanie
Dýchacie centrum je v **predĺženej mieche**. Sleduje hladinu **oxidu uhličitého (CO₂)** v krvi – keď CO₂ stúpne, prikáže dýchať rýchlejšie. (Pozor: riadi sa podľa CO₂, nie podľa nedostatku kyslíka.)

## Slovníček po lopate
- **Alveoly** = pľúcne mechúriky, kde prebieha výmena plynov.
- **Bránica** = hlavný dýchací sval pod pľúcami.
- **Epiglotis** = príklopka brániaca vdýchnutiu potravy.
- **Dýchacie centrum** = riadi dýchanie podľa CO₂.

## Príklad zo života
Keď sa „zaprieš" a zadržíš dych, po chvíli ťa premôže nutkanie nadýchnuť sa – nie preto, že chýba kyslík, ale preto, že stúpla hladina **CO₂** a mozog ťa núti vydýchnuť ho. Práve preto sa nedá zadržať dych donekonečna.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli funkciu dýchacej sústavy (kyslík dnu, CO₂ von).
2. Prejdi **cestu vzduchu** (nos → alveoly) a úlohu hrtana (hlasivky, epiglotis).
3. Zdôrazni **alveoly** (veľká plocha, výmena plynov).
4. Opíš **mechaniku dýchania** (bránica, rebrá).
5. Vysvetli **riadenie dýchania podľa CO₂** a pridaj príklad (zadržanie dychu).`,

"25-1":`## Predstav si to takto
**Populácia** je skupina jedincov **toho istého druhu**, ktorí žijú na jednom mieste v jednom čase a môžu sa medzi sebou rozmnožovať (napr. všetky srnky v jednom lese). Ekológia skúma, ako sa takéto populácie správajú – či rastú, klesajú a prečo.

## Čím opisujeme populáciu
- **Početnosť** – koľko jedincov má.
- **Hustota** – koľko ich je na jednotku plochy (napr. srnky na km²).
- **Veková štruktúra** – koľko je mladých a starých (veľa mladých = populácia porastie).
- **Pomer pohlaví** – koľko samcov a samíc.
- **Pôrodnosť a úmrtnosť** – rodí sa viac, než umiera? Potom populácia rastie.

## Ako populácia rastie
- **Exponenciálny rast (J-krivka)** – keď je všetkého dostatok, populácia rastie čoraz rýchlejšie (zrýchľujúca sa krivka v tvare J). Nemôže trvať večne.
- **Logistický rast (S-krivka)** – reálnejší. Populácia najprv rastie rýchlo, ale potom sa spomalí a ustáli na hranici, ktorú prostredie uživí. Tejto hranici sa hovorí **nosná kapacita (K)**.

## Čo brzdí rast populácie
- **Hustotne závislé faktory** – pôsobia silnejšie pri veľkej populácii: nedostatok potravy, choroby, predátori (čím viac jedincov, tým ostrejší boj o zdroje).
- **Hustotne nezávislé faktory** – pôsobia bez ohľadu na počet: záplavy, mráz, požiare.

## Slovníček po lopate
- **Populácia** = jedinci jedného druhu na jednom mieste.
- **Hustota** = počet jedincov na plochu.
- **Nosná kapacita (K)** = koľko jedincov prostredie uživí.
- **J-krivka vs. S-krivka** = neobmedzený vs. obmedzený rast.

## Príklad zo života
Keď do nového prostredia bez nepriateľov prenikne druh (napr. králiky v Austrálii), najprv sa premnoží do tvaru **J** (exponenciálne). No keď minie potravu a objavia sa choroby, rast sa zastaví na **nosnej kapacite** – krivka prejde do tvaru **S**. Príroda si tak nastaví rovnováhu.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Definuj **populáciu**.
2. Vymenuj jej **charakteristiky** (početnosť, hustota, veková štruktúra…).
3. Vysvetli a **nakresli J-krivku a S-krivku**.
4. Definuj **nosnú kapacitu K**.
5. Rozlíš **hustotne závislé a nezávislé** faktory a pridaj príklad (králiky v Austrálii).`,

"25-2":`## Predstav si to takto
Toto praktikum je o určovaní **stavovcov** (živočíchov s chrbticou) pomocou určovacieho kľúča. Najrýchlejšie ich zaradíš podľa toho, **čím je pokryté ich telo** – srsť, perie, šupiny, alebo holá koža.

## Päť tried stavovcov a ich poznávacie znaky
- **Ryby** – telo so **šupinami**, **plutvy**, dýchajú **žiabrami**, chladnokrvné, žijú vo vode.
- **Obojživelníky** (žaba, mlok) – **holá vlhká koža**, larva (pulec) žije vo vode a dýcha žiabrami, dospelec má pľúca; chladnokrvné.
- **Plazy** (jašterica, had) – **suché šupiny z rohoviny**, kladú vajcia na suchu, pľúca; chladnokrvné.
- **Vtáky** – **perie**, zobák, krídla, **teplokrvné**, vajcia s tvrdou škrupinou.
- **Cicavce** – **srsť**, **mliečne žľazy** (kŕmia mláďatá mliekom), väčšinou živorodé, teplokrvné.

## Postup určovania
1. Pozri sa, **čím je telo pokryté** (srsť/perie/šupiny/holá koža).
2. Zaraď do triedy.
3. V rámci triedy použi podrobnejší kľúč (napr. u vtákov podľa tvaru zobáka: hákovitý = dravec, plochý = kačica).
4. Over si výsledok v atlase.

## Časté zámeny (na pozor)
- **Plaz vs. obojživelník:** plaz má suché šupiny, obojživelník holú vlhkú kožu.
- **Netopier vs. vták:** oba lietajú, ale netopier má **srsť a mláďatá kŕmi mliekom** → je to **cicavec**, nie vták!

## Slovníček po lopate
- **Stavovec** = živočích s chrbticou.
- **Teplokrvný** = stála teplota tela (vták, cicavec).
- **Chladnokrvný** = teplota podľa okolia (ryba, obojživelník, plaz).
- **Mliečne žľazy** = znak cicavcov.

## Príklad zo života
Netopier lieta ako vták, no nie je to vták – má srsť, rodí živé mláďatá a kŕmi ich mliekom, teda je to **cicavec**. Toto je klasický chyták: pri určovaní sa nepozeraj len na to, či zviera lieta, ale na pokryv tela a spôsob rozmnožovania.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že stavovce majú chrbticu, a delíme ich do **5 tried**.
2. Prejdi **znaky každej triedy** (pokryv tela, dýchanie, teplokrvnosť).
3. Opíš **postup** určovania (od pokryvu tela k triede).
4. Spomeň **časté zámeny** (plaz/obojživelník, netopier/vták).
5. Pridaj príklad (netopier = cicavec, nie vták).`,

"26-0":`## Predstav si to takto
Zmysly sú „okná tela do sveta" – cez ne organizmus vníma svetlo, zvuk, chuť, teplo či dotyk. Na to slúžia **receptory** – špeciálne bunky, ktoré zachytávajú podnet a premenia ho na nervový signál. Počas vývoja zvierat sa zmysly postupne zdokonaľovali.

## Typy receptorov (podľa toho, čo vnímajú)
- **Fotoreceptory** – svetlo (oko).
- **Mechanoreceptory** – tlak, zvuk, vibrácie (ucho, hmat).
- **Chemoreceptory** – chemické látky (čuch, chuť).
- **Termoreceptory** – teplotu.
- **Receptory bolesti** – poškodenie.
- Niektoré zvieratá majú aj špeciálne: **elektroreceptory** (žraloky cítia elektrické polia koristi) a **magnetoreceptory** (vtáky sa orientujú podľa magnetického poľa Zeme).

## Vývoj očí (od jednoduchého k zložitému)
- Jednobunkovce a ploskavce: len **svetlocitlivé bunky** alebo jamkové oči, ktoré rozoznajú svetlo a tmu.
- Hmyz: **zložené (fazetové) oči** – zložené z mnohých malých očiek; výborne vnímajú pohyb a vidia aj UV svetlo.
- Stavovce a chobotnice: dokonalé **komorové oko** s šošovkou a sietnicou (ostrý obraz). Zaujímavé je, že chobotnica vyvinula také oko **nezávisle** od stavovcov.

## Bočná čiara rýb
Ryby majú pozdĺž tela rad **mechanoreceptorov** – **bočnú čiaru**, ktorá vníma pohyb a tlak vody. Vďaka nej ryba „cíti" predátora alebo plávajúce ryby vedľa seba aj v tme či v kalnej vode.

## Slovníček po lopate
- **Receptor** = bunka, ktorá zachytí podnet a premení ho na signál.
- **Fazetové oko** = zložené oko hmyzu (mnoho malých očiek).
- **Komorové oko** = oko so šošovkou (stavovce, chobotnica).
- **Bočná čiara** = zmysel rýb na vnímanie pohybu vody.

## Príklad zo života
Prečo je tak ťažké plesknúť muchu? Lebo jej **fazetové oči** vnímajú pohyb oveľa rýchlejšie než naše oči – tvoj pohyb vidí ako spomalený film a stihne uletieť. Jej zmyslový systém je na vnímanie pohybu lepší než náš.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo sú receptory a vymenuj ich **typy** podľa podnetu.
2. Spomeň špeciálne zmysly (elektro-, magnetoreceptory).
3. Opíš **vývoj oka** od svetlocitlivých buniek po komorové oko.
4. Porovnaj **fazetové vs. komorové** oko.
5. Vysvetli **bočnú čiaru** rýb a pridaj príklad (prečo nepleskneš muchu).`,

"26-1":`## Predstav si to takto
Tento odborný text je o tom, ako človek poškodzuje životné prostredie a aké to má dôsledky. Predstav si Zem ako náš jediný domov – a my doň vypúšťame odpad do vzduchu, vody aj pôdy. Pozrime sa na hlavné problémy.

## Znečistenie ovzdušia
- **Kyslé dažde** – z tovární a áut sa do vzduchu dostávajú plyny (SO₂, NOₓ), ktoré sa spoja s vodou a padajú ako **kyslý dážď**, čo ničí lesy a okysľuje jazerá.
- **Ozónová diera** – freóny (CFC) rozkladali ochrannú **ozónovú vrstvu**, ktorá nás chráni pred UV žiarením. Po ich zákaze (Montrealský protokol) sa pomaly obnovuje.
- **Prach a jemné častice** – spôsobujú dýchacie a srdcové choroby.

## Znečistenie vôd
- **Eutrofizácia** – z polí sa do vôd splavia hnojivá → premnožia sa riasy a sinice → tie spotrebujú kyslík → **ryby sa udusia**. Voda „zazelenie" a zhnije.
- **Toxíny a ťažké kovy** (ortuť, olovo) – hromadia sa v organizmoch.
- **Plasty** – rozpadajú sa na mikroplasty, ktoré sa dostávajú do potravy.

## Ďalšie problémy
- **Odlesňovanie** – ničí biotopy (hlavná príčina vymierania druhov) a uvoľňuje CO₂.
- **Dezertifikácia** – zmena úrodnej pôdy na púšť.

## Päť hlavných príčin straty biodiverzity (HIPPO)
- **H** – strata biotopov (najväčšia hrozba),
- **I** – invázne druhy,
- **P** – znečistenie,
- **P** – premnoženie ľudí,
- **O** – nadmerný lov a rybolov.

## Slovníček po lopate
- **Kyslý dážď** = dážď okyslený plynmi z tovární a áut.
- **Eutrofizácia** = premnoženie rias z hnojív → úhyn rýb.
- **Ozónová vrstva** = ochranný štít pred UV žiarením.
- **Biodiverzita** = rozmanitosť živých organizmov.

## Príklad zo života
Keď v lete jazero zazelenie a začne zapáchať, často je to **eutrofizácia** – hnojivá z okolitých polí spôsobili premnoženie rias, tie spotrebovali kyslík a vodný život sa dusí. Je to priamy dôsledok toho, ako hospodárime s pôdou.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Opíš **znečistenie ovzdušia** (kyslé dažde, ozónová diera, prach).
2. Opíš **znečistenie vôd** (eutrofizácia, toxíny, plasty).
3. Spomeň **odlesňovanie a dezertifikáciu**.
4. Vymenuj **príčiny straty biodiverzity** (HIPPO).
5. Pridaj príklad (zazelenané jazero = eutrofizácia).`,

"26-2":`## Predstav si to takto
Telo je ako auto – potrebuje správne palivo a súčiastky, aby fungovalo. Tomu hovoríme **správna výživa**: prijímať vyvážene všetky **živiny**, ktoré telo potrebuje na energiu, rast a obranu. Pozrime sa, čo telo potrebuje a prečo.

## Tri hlavné živiny (makroživiny)
- **Sacharidy (cukry)** – hlavný **zdroj energie** (1 g = 4 kcal). Najlepšie sú zložité (obilniny, zelenina). Súčasťou je aj **vláknina**, ktorá nestrávená pomáha tráveniu. Sladkosti obmedzovať.
- **Tuky** – najvýdatnejší zdroj energie (1 g = 9 kcal), stavajú bunkové membrány a prenášajú vitamíny A, D, E, K. **Zdravé** sú nenasýtené (ryby, olivový olej), **menej zdravé** nasýtené (maslo, tučné mäso).
- **Bielkoviny** – „stavebný materiál" tela (svaly, enzýmy, protilátky). Niektoré aminokyseliny si telo nevie vyrobiť – musíme ich prijať z potravy (mäso, vajcia, strukoviny).

## Mikroživiny a voda
- **Vitamíny** – v malom množstve, ale nevyhnutné. Nedostatok spôsobuje choroby (nedostatok vitamínu C → skorbut, vitamínu D → krivica).
- **Minerály** – vápnik (kosti), železo (krv), jód (štítna žľaza).
- **Voda** – asi 2–3 litre denne; rozpúšťadlo a chladič tela.

## Zásady správnej výživy (WHO)
- Jedz **pestro** a vyvážene.
- Aspoň **5 porcií** zeleniny a ovocia denne.
- Obmedz **soľ a cukor**.
- Dbaj viac na **kvalitu** tukov než množstvo.

## Slovníček po lopate
- **Sacharidy** = hlavný zdroj energie.
- **Bielkoviny** = stavebný materiál tela.
- **Esenciálne látky** = tie, ktoré si telo nevyrobí a musí ich prijať.
- **Vitamíny a minerály** = mikroživiny, dôležité v malom množstve.

## Príklad zo života
Námorníci kedysi na dlhých plavbách ochoreli na **skorbut** (krvácanie ďasien, vyčerpanosť), lebo nejedli ovocie a chýbal im vitamín C. Keď začali so sebou brať citrusy, problém zmizol. Je to dôkaz, že aj malé množstvo správnej živiny je nevyhnutné.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli pojem správna výživa (palivo a súčiastky pre telo).
2. Prejdi **tri makroživiny** (sacharidy, tuky, bielkoviny) a ich funkcie.
3. Spomeň **vitamíny, minerály a vodu**.
4. Vymenuj **zásady správnej výživy**.
5. Pridaj príklad (skorbut a vitamín C u námorníkov).`,

"27-0":`## Predstav si to takto
Výtrusné rastliny sú „medzistupeň" vo vývoji rastlín. Už majú **pravé korene, stonku a listy** (na rozdiel od machu), ale ešte **nevyrábajú semená** – rozmnožujú sa **výtrusmi (spórami)**, čo sú maličké prachové zrniečka. Najznámejšie sú **paprade**.

## Paprade – najznámejšie výtrusné rastliny
- Majú veľké členité listy zvané **vaje**, ktoré sú v mladosti **stočené do slimáka** a postupne sa rozvíjajú.
- Na **spodnej strane listov** majú hnedé kôpky – to sú **výtrusnice**, v ktorých dozrievajú výtrusy.

## Životný cyklus (rodozmena) – toto je jadro
Paprade sa rozmnožujú v dvoch striedajúcich sa fázach:
1. **Veľká papraď** (sporofyt) vytvorí na listoch **výtrusy**.
2. Výtrus spadne na zem a vyklíči z neho **malá srdcovitá rastlinka** (gametofyt), často len pár milimetrov.
3. Na nej vzniknú pohlavné bunky. **Spermie potrebujú vodu** (kvapku dažďa), aby k vajíčku **doplávali**.
4. Po oplodnení z nej vyrastie zase veľká papraď.

Práve preto paprade žijú na **vlhkých miestach** – bez vody by sa spermie nemali ako dostať k vajíčku.

## Ďalšie výtrusné rastliny
- **Prasličky** – článkovaná dutá stonka (vyzerá ako malé „stromčeky"); kedysi (v prahorách) boli vysoké ako stromy.
- **Plavúne** – drobné, s šupinovitými listami.

## Význam
Pradávne stromovité výtrusné rastliny po odumretí vytvorili dnešné **ložiská uhlia** – kúrime teda zvyškami pralesov spred stoviek miliónov rokov.

## Slovníček po lopate
- **Výtrus (spóra)** = drobné rozmnožovacie zrnko (namiesto semena).
- **Vaje** = listy paprade.
- **Rodozmena** = striedanie veľkej (sporofyt) a malej (gametofyt) fázy.
- **Sporofyt vs. gametofyt** = veľká papraď vs. malá srdcovitá rastlinka.

## Príklad zo života
Keď zoberieš papraďový list a pozrieš sa naň zospodu, uvidíš pravidelné hnedé bodky. Mnohí si myslia, že je list „chorý" alebo zaprášený – v skutočnosti sú to **výtrusnice** plné spór, teda spôsob, akým sa papraď rozmnožuje.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že výtrusné rastliny majú orgány, ale rozmnožujú sa **výtrusmi**.
2. Opíš **papraď** (vaje, výtrusnice na spodku listov).
3. Podrobne prejdi **životný cyklus/rodozmenu** a prečo potrebujú vodu.
4. Spomeň **prasličky a plavúne**.
5. Vysvetli **význam** (vznik uhlia) a pridaj príklad (hnedé bodky na liste = výtrusnice).`,

"27-1":`## Predstav si to takto
Toto zadanie spája dve najvyspelejšie skupiny stavovcov: **vtáky** (majstri letu) a **cicavce** (medzi ne patríme aj my). Obe sú teplokrvné, ale každá je dokonale prispôsobená inému spôsobu života.

## Vtáky – stroje na lietanie
Celé telo vtáka je „odľahčené a vyladené" na let:
- **Perie** – izoluje a tvorí krídla.
- **Duté kosti** – ľahké, aby sa vták ľahšie vzniesol.
- **Vzduchové vaky** – vďaka nim prúdi cez pľúca stále čerstvý vzduch (najefektívnejšie dýchanie medzi živočíchmi) – let je totiž namáhavý.
- **Silné prsné svaly** upevnené na **kýle** (hrebeni na hrudnej kosti) – poháňajú krídla.
- **Zobák bez zubov** – ľahší než ťažká čeľusť so zubami.

## Cicavce – tvory s materstvom
Cicavce spoznáš podľa dvoch hlavných znakov:
- **Srsť** (chlpy) – izolácia.
- **Mliečne žľazy** – samica kŕmi mláďatá **mliekom** (odtiaľ názov „cicavce").
Majú aj rôzne typy **zubov** (rezáky, očné, stoličky) podľa potravy a najvyvinutejší mozog.

## Tri skupiny cicavcov (podľa rozmnožovania)
- **Vajcorodé** – **vtákopysk** a ježura; sú to cicavce, ktoré **kladú vajcia**! Napriek tomu mláďatá kŕmia mliekom.
- **Vačkovce** – **klokan, koala**; rodia veľmi malé mláďa, ktoré dorastá vo **vaku** na bruchu.
- **Placentovce** – väčšina cicavcov (vrátane človeka); mláďa sa plne vyvinie v tele matky cez **placentu**.

## Slovníček po lopate
- **Kýl** = hrebeň na hrudnej kosti, kde sú upevnené letové svaly.
- **Vzduchové vaky** = orgány na efektívne dýchanie vtákov.
- **Mliečne žľazy** = znak cicavcov (kŕmenie mliekom).
- **Vajcorodé/vačkovce/placentovce** = tri skupiny cicavcov.

## Príklad zo života
Vtákopysk je zmätúce zviera: má zobák ako kačica, kladie vajcia, ale predsa je to **cicavec** – pretože má srsť a kŕmi mláďatá mliekom. Ukazuje, že najistejším znakom cicavca nie je „rodí mláďatá", ale **mlieko a srsť**.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vymenuj aspoň 5 **adaptácií vtákov na let** (perie, duté kosti, vzduchové vaky, kýl, ľahký zobák).
2. Vysvetli **znaky cicavcov** (srsť, mliečne žľazy, zuby, mozog).
3. Opíš **3 skupiny cicavcov** podľa rozmnožovania.
4. Zdôrazni, prečo je **vtákopysk cicavec**.
5. Pridaj príklad (vtákopysk – mätúce zviera).`,

"27-2":`## Predstav si to takto
Zrenicový reflex je **automatická reakcia oka na svetlo** – keď je veľa svetla, zrenica sa zúži, keď je tma, rozšíri sa. Robí to **samo, bez tvojej vôle**, aby chránila citlivú sietnicu pred oslnením a zároveň v tme prepustila čo najviac svetla. Je to ako automatická clona vo fotoaparáte.

## Anatómia – čo sa hýbe
- **Zrenica** – čierny otvor v strede oka, cez ktorý vchádza svetlo.
- **Dúhovka** – farebný krúžok okolo zrenice; obsahuje dva svaly:
  - jeden zrenicu **zužuje** (pri silnom svetle),
  - druhý ju **rozširuje** (v tme).

## Ako reflex prebieha (dráha)
1. Svetlo dopadne na **sietnicu**.
2. Signál ide cez **zrakový nerv** do mozgu.
3. Mozog pošle príkaz späť cez iný nerv do svalu dúhovky.
4. Zrenica sa **zúži** – a to celé za necelú sekundu.

**Zaujímavosť (konsenzuálny reflex):** keď posvietiš len do jedného oka, zúži sa **aj druhé oko**. Práve preto lekári svietia do očí baterkou – testujú, či nervy a mozog fungujú správne.

## Postup pokusu
1. Zostaň 30 sekúnd v šere, aby sa zrenice rozšírili.
2. Posvieť baterkou z boku do jedného oka.
3. Sleduj **rýchle zúženie** zrenice.
4. Zopakuj pre druhé oko a porovnaj.

## Slovníček po lopate
- **Zrenica** = otvor, cez ktorý vchádza svetlo do oka.
- **Mióza** = zúženie zrenice; **mydriáza** = rozšírenie.
- **Reflex** = automatická reakcia bez vôle.
- **Konsenzuálny reflex** = reakcia oboch očí naraz.

## Príklad zo života
Keď vyjdeš z tmavého kina na slnko, na chvíľu zažmúriš a oslepí ťa – ale o sekundu sa zrenice zúžia a vidíš normálne. To je zrenicový reflex v akcii, ktorý chráni tvoju sietnicu pred náhlym prudkým svetlom.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je zrenicový reflex a načo slúži (ochrana sietnice).
2. Opíš **anatómiu** (zrenica, dúhovka, dva svaly).
3. Prejdi **dráhu reflexu** (sietnica → nerv → mozog → sval).
4. Vysvetli **konsenzuálny reflex** a jeho využitie v medicíne.
5. Opíš **postup pokusu** a pridaj príklad (kino → slnko).`,

"28-0":`## Predstav si to takto
Zmyslové orgány sú „okná tela do sveta" – cez ne vnímame svetlo, zvuk, vône, chute a dotyk. Najdôležitejšie sú **oko** (zrak) a **ucho** (sluch a rovnováha). Pozrime sa, ako fungujú.

## Oko – ako vzniká obraz
Oko funguje ako **fotoaparát**:
- **Rohovka a šošovka** zaostria svetlo (šošovka mení tvar – to je akomodácia, vďaka ktorej vidíš ostro zblízka aj zďaleka).
- Svetlo dopadne na **sietnicu** vzadu, kde sú zmyslové bunky:
  - **tyčinky** – čiernobiele videnie a videnie za šera,
  - **čapíky** – farebné videnie a ostrosť (najviac ich je v žltej škvrne).
- Signál ide do mozgu cez zrakový nerv.

**Chyby zraku:** krátkozrakosť (zle vidíš do diaľky – rieši rozptylka) a ďalekozrakosť (zle vidíš zblízka – rieši spojka).

## Ucho – sluch aj rovnováha
Ucho má tri časti:
- **Vonkajšie** – ušnica zachytí zvuk a vedie ho na **bubienok**.
- **Stredné** – tri maličké kostičky (**kladivko, nákova, strmienok**) zosilnia a prenesú chvenie.
- **Vnútorné** – **slimák (kochlea)** premení chvenie na nervový signál. Sú tu aj **polkruhové kanáliky**, ktoré zabezpečujú **rovnováhu** (cítiš, kde je hore a dole).

## Čuch, chuť a hmat
- **Čuch** – bunky v nose, prepojené na pamäť a emócie (preto vôňa vyvolá spomienky).
- **Chuť** – chuťové poháriky na jazyku.
- **Hmat** – receptory v koži na dotyk, tlak, teplo a bolesť.

## Slovníček po lopate
- **Akomodácia** = zaostrovanie zmenou tvaru šošovky.
- **Tyčinky a čapíky** = bunky sietnice (šero / farby).
- **Slimák (kochlea)** = časť ucha, ktorá vníma zvuk.
- **Polkruhové kanáliky** = orgán rovnováhy.

## Príklad zo života
Keď sa zatočíš dokola a zastavíš, hlava sa ti krúti. Prečo? Lebo tekutina v **polkruhových kanálikoch** ucha sa ešte chvíľu pohybuje a klame mozog, že sa stále točíš. To je dôkaz, že rovnováhu riadi práve ucho, nie oči.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že zmysly sú „okná do sveta", a vymenuj ich.
2. Opíš **oko** ako fotoaparát (rohovka, šošovka, sietnica, tyčinky/čapíky) a chyby zraku.
3. Opíš **ucho** (3 časti, slimák, rovnováha).
4. Stručne spomeň **čuch, chuť, hmat**.
5. Pridaj príklad (točenie hlavy a polkruhové kanáliky).`,

"28-1":`## Predstav si to takto
**Etológia** je veda o **správaní zvierat** – prečo robia to, čo robia. Niektoré správanie majú zvieratá vrodené (vedia to od narodenia), iné sa musia naučiť. Práve toto rozdelenie je jadrom témy.

## Vrodené správanie – „od narodenia"
Zviera to vie automaticky, bez učenia:
- **Reflexy** – jednoduché automatické reakcie (stiahnutie ruky od horúceho).
- **Taxie** – pohyb za podnetom (mol letí za svetlom).
- **Vtlačenie (imprinting)** – mláďa si v prvých hodinách života „vtlačí" do pamäti prvý pohyblivý objekt a považuje ho za matku. **Konrad Lorenz** dokázal, že húsatá nasledovali jeho, lebo ich uvideli ako prvého. Toto sa už nedá zmeniť.

## Naučené správanie – „získané skúsenosťou"
Zviera sa to naučí počas života:
- **Habituácia** – zvyknutie si: prestaneš reagovať na podnet, ktorý sa stále opakuje a nič neznamená (vtáky si zvyknú na strašiaka).
- **Klasické podmieňovanie (Pavlov)** – slávny pokus: psovi pred kŕmením vždy zazvonili. Po čase mu sliny tiekli **už len na zvuk zvončeka**, aj bez jedla. Naučil sa spojiť zvuk s jedlom.
- **Operantné podmieňovanie (Skinner)** – učenie cez **odmenu a trest**: za správne správanie odmena (zopakuje ho), za nesprávne trest (vyhne sa mu). Tak sa cvičia psy.
- **Vhľad (riešenie problémov)** – najvyššia forma: zviera vyrieši problém „premyslením" (vrany a šimpanzy používajú nástroje).

## Komunikácia zvierat
Zvieratá si odovzdávajú informácie zvukmi, vôňami (feromónmi) a pohybmi. Slávny je **tanec včiel** (Karl von Frisch): včela tancom ukáže ostatným **smer a vzdialenosť** ku kvetom.

## Slovníček po lopate
- **Etológia** = veda o správaní zvierat.
- **Vtlačenie (imprinting)** = mláďa nasleduje prvý videný objekt ako matku.
- **Klasické podmieňovanie** = spojenie podnetu s reakciou (Pavlovov pes).
- **Operantné podmieňovanie** = učenie cez odmenu a trest.

## Príklad zo života
Keď psík sadne na povel a dostane maškrtu, učí sa **operantným podmieňovaním** – odmena zvyšuje šancu, že povel zopakuje. A keď ti pri zvuku otvárania konzervy pribehne mačka, je to **klasické podmieňovanie** (zvuk = jedlo), presne ako Pavlovov pes.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo je etológia.
2. Opíš **vrodené správanie** (reflexy, taxie, vtlačenie – Lorenz).
3. Opíš **naučené správanie** (habituácia, Pavlov, Skinner, vhľad).
4. Spomeň **komunikáciu** (tanec včiel).
5. Pridaj príklad (cvičenie psa, mačka a konzerva).`,

"28-2":`## Predstav si to takto
Toto zadanie je o dvoch dedičných chorobách viazaných na chromozóm X: **hemofílii** (zlé zrážanie krvi) a **daltonizme** (farbosleposť). Obe majú spoločné to, že **postihujú hlavne mužov**, kým ženy bývajú len prenášačky. Prečo? Lebo gény pre ne ležia na X chromozóme.

## Hemofília – „krv sa nezráža"
Pri hemofílii telu chýba bielkovina potrebná na **zrážanie krvi**. Preto aj malé poranenie dlho krváca a môže dochádzať ku krvácaniu do kĺbov a svalov.
- Dedí sa ako **na X viazaná recesívna** choroba.
- **Muž** s chybným X je chorý (nemá náhradný X). **Žena** býva prenášačka (druhý zdravý X ju chráni).
- Lieči sa dodávaním chýbajúceho faktora.

## Daltonizmus – farbosleposť
Človek s daltonizmom **nerozozná určité farby**, najčastejšie červenú a zelenú. Gény pre farebné videnie sú na X chromozóme, preto je to opäť na X viazané recesívne ochorenie.
- Postihuje asi **8 % mužov**, ale len menej než 1 % žien.
- Zisťuje sa **Ishiharovým testom** (čísla skryté v bodkovaných kruhoch).

## Prečo hlavne muži (kľúčové)
Muž má len **jeden X** – ak je naňom chybný gén, nemá záložnú zdravú kópiu, takže ochorie. Žena má **dva X**, takže jej jeden zdravý X stačí na to, aby bola zdravá (len prenášačka). Aby ochorela aj žena, musela by mať chybné **oba** X, čo je zriedkavé.

## Slovníček po lopate
- **Hemofília** = porucha zrážania krvi.
- **Daltonizmus** = farbosleposť (najmä červená/zelená).
- **Prenášačka** = žena s chybným génom, ktorá je zdravá, ale môže ho odovzdať.
- **Na X viazaná recesívna dedičnosť** = postihuje hlavne mužov.

## Príklad zo života
Hemofília sa kedysi volala „kráľovská choroba" – kráľovná Viktória bola prenášačkou a cez svoje dcéry sa rozšírila do panovníckych rodín v Rusku a Španielsku. Krásne to ukazuje, ako sa choroba viazaná na X šíri cez zdravé ženy-prenášačky na ich synov.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav obe choroby ako **na X viazané recesívne**.
2. Opíš **hemofíliu** (zlé zrážanie, príznaky, liečba).
3. Opíš **daltonizmus** (farbosleposť, Ishiharov test).
4. Vysvetli, **prečo postihuje hlavne mužov** (jeden X bez náhrady).
5. Vieš vyriešiť úlohu s Punnettovým štvorcom; pridaj príklad (kráľovná Viktória).`,

"29-0":`## Predstav si to takto
Machorasty (machy) sú **najjednoduchšie suchozemské rastliny** – tie zelené mäkké „koberčeky", čo rastú na vlhkých skalách, kôre stromov a v lese. Sú dôležitým prvým krokom rastlín na suchú zem, no stále **veľmi závisia od vody**.

## Čím sú machy zvláštne
- **Nemajú pravé korene** – do podkladu sa držia len tenkými vláknami (**rizoidmi**) a vodu nasávajú celým povrchom.
- **Nemajú pravé cievy** (žiadny xylém ani floém), preto nemôžu narásť do výšky – zostávajú malé.
- Žijú na **vlhkých miestach**, lebo spermie sa potrebujú **doplávať** k vajíčku v kvapke vody.

## Rodozmena – pozor, opačne než u papradí!
U machov je **dominantná malá zelená rastlinka (gametofyt)** – to, čo bežne vidíme ako mach. Tá tvorí pohlavné bunky.
- Po oplodnení z nej vyrastie **sporofyt** – tenká stopka s tobolkou (vyzerá ako „zápalka" trčiaca z machu). Ten je **závislý** od zelenej rastlinky (žije na nej).
- V tobolke vznikajú výtrusy, z ktorých vyrastie nový mach.

**Rozdiel oproti papradi:** u machu prevláda **gametofyt** (zelená rastlinka), u paprade **sporofyt** (veľká papraď).

## Význam – rašeliniská
Mach **rašelinník** vytvára **rašeliniská** – obrovské „špongie" krajiny, ktoré:
- zadržiavajú veľké množstvo **vody** (bránia záplavám aj suchu),
- viažu obrovské množstvo **uhlíka** (pomáhajú proti otepľovaniu – viac než lesy!).

## Slovníček po lopate
- **Rizoidy** = vlákna, ktorými sa mach drží podkladu (nie pravé korene).
- **Gametofyt** = zelená rastlinka machu (dominantná).
- **Sporofyt** = tobolka na stopke (závislá fáza).
- **Rašelinník** = mach tvoriaci rašeliniská.

## Príklad zo života
Rašeliniská sú obrovské zásobárne vody a uhlíka – „špongie" prírody. Keď sa vysušia (napr. ťažbou rašeliny), uvoľní sa z nich nahromadený uhlík a krajina stratí schopnosť zadržiavať vodu. Preto sa dnes rašeliniská prísne chránia.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, čo sú machorasty a prečo zostávajú malé (bez ciev, bez koreňov).
2. Vysvetli, prečo potrebujú **vodu** (plávajúce spermie).
3. Opíš **rodozmenu** a zdôrazni, že **dominuje gametofyt**.
4. Porovnaj s **papraďou** (opačne – tam dominuje sporofyt).
5. Vysvetli **význam rašelinísk** (voda, uhlík) a pridaj príklad.`,

"29-1":`## Predstav si to takto
Toto zadanie je o najjednoduchších živočíchoch – o **hubkách** a **pŕhlivcoch**. Sú to vodné tvory, ktoré stoja na samom začiatku živočíšnej ríše. Hubky sú ešte takmer ako „kolónia buniek", pŕhlivce už majú jednoduché tkanivá a žihadlá.

## Hubky – „filtre mora"
- Sú to **najjednoduchšie mnohobunkové živočíchy** – nemajú ani tkanivá, ani orgány, dokonca ani nervy.
- Sú prichytené na dne a **filtrujú vodu**: voda vchádza pórmi dnu, hubka z nej zachytí drobnú potravu a von ju vypustí veľkým otvorom.
- Vodu poháňajú bunky s bičíkmi (**choanocyty**).

## Pŕhlivce – „tvory so žihadlami"
- Majú **lúčovitú súmernosť** (telo do kruhu, ako koleso).
- Ich poznávacím znakom sú **žihavé bunky** – mikroskopické „harpúny", ktorými omráčia korisť (preto medúza páli).
- Majú jednu tráviacu dutinu s **jediným otvorom** (ústa = riť).
- Vyskytujú sa v dvoch podobách:
  - **polyp** – prisadnutý, trubicovitý (sasanka, koral),
  - **medúza** – voľne plávajúca, tvaru dáždnika.
- Príklady: nezmar (sladkovodný), medúzy, koraly (ich vápenaté kostry tvoria útesy).

## Slovníček po lopate
- **Hubky** = najjednoduchšie živočíchy bez tkanív, filtrujú vodu.
- **Choanocyty** = bunky s bičíkmi, ktoré poháňajú vodu.
- **Žihavé bunky** = „harpúny" pŕhlivcov na omráčenie koristi.
- **Polyp vs. medúza** = prisadnutá vs. plávajúca forma.

## Príklad zo života
Koralové útesy, jeden z najkrajších ekosystémov na Zemi, sú dielom drobných **pŕhlivcov** (koralových polypov), ktorých vápenaté kostry sa za tisícky rokov nahromadili. A keď ťa v mori popáli medúza, cítiš účinok jej **žihavých buniek** – tie isté, ktorými loví korisť.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Predstav obe skupiny ako najjednoduchšie živočíchy.
2. Opíš **hubky** (bez tkanív, filtrácia vody, choanocyty).
3. Opíš **pŕhlivce** (lúčovitá súmernosť, žihavé bunky, jeden otvor).
4. Vysvetli **polyp vs. medúza**.
5. Pridaj príklad (koralové útesy, popálenie medúzou).`,

"29-2":`## Predstav si to takto
Srdce a cievy tvoria **obehovú sústavu** – rozvody krvi po tele. Toto zadanie sa zameriava na to, čo sa stane, keď tieto „rúry a pumpa" zlyhajú – teda na **choroby srdca a ciev**, ktoré sú dnes najčastejšou príčinou úmrtí.

## Krátke pripomenutie obehu
Ľavá strana srdca tlačí okysličenú krv do tela, pravá strana posiela krv do pľúc po kyslík. Krv prúdi tepnami (od srdca) a žilami (k srdcu).

## Hlavné choroby
- **Ateroskleróza (kôrnatenie tepien)** – na vnútorných stenách tepien sa usadzuje **cholesterol a vápnik**, čím sa tepna **zužuje** (ako zanesené potrubie). Je to základ väčšiny ďalších problémov.
- **Infarkt (srdcový infarkt)** – keď sa zúžená srdcová tepna úplne **upchá** zrazeninou, časť srdcového svalu **odumrie**, lebo nedostáva kyslík. Prejaví sa silnou bolesťou na hrudi, ktorá vyžaruje do ľavej ruky.
- **Mŕtvica (cievna mozgová príhoda)** – to isté, ale v mozgu: cieva sa upchá alebo praskne a časť mozgu odumiera. Pomôcka na rozpoznanie je test **FAST** (pokleslá tvár, slabá ruka, porucha reči, čas volať pomoc).
- **Vysoký tlak (hypertenzia)** – dlhodobo ničí cievy, srdce a obličky.

## Prečo to vzniká a ako sa brániť
**Rizikové faktory:** fajčenie, nezdravá strava (veľa tukov a soli), nedostatok pohybu, nadváha, stres.
**Prevencia:** zdravá strava, pohyb, nefajčiť, kontrolovať tlak a cholesterol.

## Slovníček po lopate
- **Ateroskleróza** = upchávanie tepien usadeninami.
- **Infarkt** = odumretie časti srdca pre nedostatok kyslíka.
- **Mŕtvica** = to isté v mozgu.
- **FAST** = test na rozpoznanie mŕtvice.

## Príklad zo života
Ateroskleróza je ako **zanášajúce sa vodovodné potrubie**: roky sa potichu zužuje, až sa raz upchá – a vtedy príde infarkt alebo mŕtvica. Práve preto sú zdravá strava a pohyb také dôležité – udržiavajú „potrubie" priechodné.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Krátko pripomeň obeh krvi (ľavá/pravá strana, tepny/žily).
2. Vysvetli **aterosklerózu** ako základ problémov.
3. Opíš **infarkt** a **mŕtvicu** (vrátane FAST testu).
4. Spomeň **hypertenziu** a **rizikové faktory**.
5. Zdôrazni **prevenciu** a pridaj príklad (zanesené potrubie).`,

"30-0":`## Predstav si to takto
Vírusy sú zvláštni „tvorovia" na **hranici medzi živým a neživým**. Sú maličké – oveľa menšie než baktérie – a sami nedokážu nič: nejedia, nedýchajú, nerozmnožujú sa. Aby sa rozmnožili, **musia napadnúť živú bunku** a zneužiť ju ako továreň. Preto sa o nich hovorí, že sú **vnútrobunkoví parazити**.

## Z čoho sa vírus skladá
Vírus je veľmi jednoduchý:
- **Dedičná informácia** – DNA alebo RNA (nikdy oboje), návod na výrobu nových vírusov.
- **Kapsida** – bielkovinový obal, ktorý chráni túto informáciu.
- Niektoré majú navyše **tukový obal** s výbežkami (HIV, chrípka, koronavírus) – tými sa prichytávajú na bunku.

## Ako sa vírus množí (zneužije bunku)
Predstav si lupiča, ktorý vtrhne do továrne a prinúti robotníkov vyrábať jeho výrobky:
1. **Prichytenie** – vírus sa pripojí na bunku ako kľúč do zámku.
2. **Vniknutie** – dostane do bunky svoju dedičnú informáciu.
3. **Zneužitie** – donúti bunku vyrábať **kópie vírusu** (vírus nemá vlastné nástroje, použije bunkové).
4. **Zostavenie** – z dielov sa poskladajú nové vírusy.
5. **Uvoľnenie** – bunka praskne (zahynie) a nové vírusy idú napadnúť ďalšie bunky.

Niekedy sa vírus do bunky **ukryje a čaká** (spí), kým ho niečo (stres, oslabenie) neprebudí – preto sa napríklad opar vracia.

## Príklady vírusov
HIV (AIDS), koronavírus (COVID-19), chrípka, osýpky, opar, žltačka. Špeciálne **bakteriofágy** napádajú baktérie.

## Slovníček po lopate
- **Vírus** = nebunkový parazit, množí sa len v živej bunke.
- **Kapsida** = bielkovinový obal vírusu.
- **Hostiteľská bunka** = bunka, ktorú vírus zneužije na množenie.
- **Bakteriofág** = vírus napádajúci baktérie.

## Príklad zo života
Prečo antibiotiká **nezaberajú na chrípku**? Lebo antibiotiká ničia baktérie, ale chrípku spôsobuje **vírus** – a ten sa skrýva vnútri tvojich buniek, kde antibiotikum nemá na čo zaútočiť. Proti vírusom preto používame **očkovanie** alebo špeciálne protivírusové lieky.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že vírus je na **hranici živého a neživého** a je vnútrobunkový parazit.
2. Opíš **stavbu** (dedičná informácia + kapsida + prípadný obal).
3. Prejdi **rozmnožovací cyklus** (prichytenie → vniknutie → zneužitie bunky → uvoľnenie).
4. Spomeň **latentnú infekciu** (vírus „spí").
5. Uveď **príklady** a vysvetli, prečo antibiotiká na vírusy nezaberajú.`,

"30-1":`## Predstav si to takto
Proteosyntéza je **výroba bielkovín podľa návodu v DNA**. Je to ako pečenie koláča: v knihe (DNA) je recept, ty si ho odpíšeš na lístoček (mRNA) a podľa neho v kuchyni (ribozóme) navaríš jedlo (bielkovinu). Prebieha v dvoch krokoch: **prepis (transkripcia)** a **preklad (translácia)**.

## Centrálna dogma (hlavná myšlienka)
**DNA → mRNA → bielkovina**
Informácia teda tečie z DNA cez pracovnú kópiu (mRNA) k hotovej bielkovine.

## 1. Transkripcia – prepis (v jadre)
Z DNA sa prepíše **pracovná kópia (mRNA)**:
- Enzým **RNA polymeráza** prečíta úsek DNA a vyrobí mRNA, ktorá je jeho doplnkom (len namiesto T má U).
- mRNA sa pred odchodom „doupraví" – odstránia sa z nej nepotrebné úseky (splicing) a pridajú sa ochranné konce.
- Hotová mRNA vyjde z jadra von, k ribozómu.

## 2. Translácia – preklad (na ribozóme)
Na ribozóme sa podľa mRNA poskladá bielkovina:
- mRNA sa číta po **trojiciach (kodónoch)**, začína sa štartovým kodónom **AUG**.
- **tRNA** priváža správne **aminokyseliny** – každá tRNA má „adresu" (antikodón), ktorá sa hodí ku kodónu na mRNA.
- Aminokyseliny sa navliekajú za sebou ako korálky na šnúrku.
- Pri **stop kodóne** sa výroba ukončí a hotová bielkovina sa uvoľní.

## Slovníček po lopate
- **Proteosyntéza** = výroba bielkovín podľa DNA.
- **Transkripcia** = prepis DNA do mRNA (v jadre).
- **Translácia** = preklad mRNA na bielkovinu (na ribozóme).
- **Kodón vs. antikodón** = trojica na mRNA vs. zodpovedajúca trojica na tRNA.

## Príklad zo života
Prečo sa originál DNA nesmie „vyniesť z jadra"? Lebo je príliš vzácny – je to hlavná kniha receptov celej bunky. Preto sa z neho urobí len **pracovná kópia (mRNA)**, ktorá sa odnesie do „kuchyne" (ribozómu). Keby sa originál poškodil, bunka by stratila návod natrvalo.

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli **centrálnu dogmu** (DNA → mRNA → bielkovina) a prirovnaj k receptu.
2. Opíš **transkripciu** (RNA polymeráza, úprava mRNA, výstup z jadra).
3. Opíš **transláciu** (čítanie kodónov, tRNA, navliekanie aminokyselín, stop kodón).
4. Vysvetli pojmy **kodón a antikodón**.
5. Pridaj príklad (prečo zostáva DNA v jadre).`,

"30-2":`## Predstav si to takto
Toto praktikum je o tom, ako **rozoznať naše ihličnany** – borovicu, smrek, jedľu a smrekovec – podľa ihličia a šišiek. Je to praktická zručnosť: keď pochopíš pár znakov, rozlíšiš ich na prvý pohľad.

## Štyri ihličnany a ako ich rozlíšiš
Najjednoduchšie je sledovať, **ako rastú ihly a aký majú tvar**:
- **Borovica** – ihly vyrastajú **po dvoch vo zväzočku**, sú dlhé. (Pomôcka: „bo-rovica" – po dvoch.)
- **Smrek** – ihly rastú **jednotlivo**, sú **štvorhranné a ostré** (pichajú!). Šišky **visia** nadol.
- **Jedľa** – ihly tiež jednotlivo, ale sú **ploché a mäkké** (nepichajú), zospodu majú dva biele prúžky. Šišky **stoja hore** a po dozretí sa rozpadnú priamo na strome.
- **Smrekovec** – jediný náš ihličnan, ktorý **na zimu opadáva**; ihly rastú v **chomáčikoch** a na jeseň zožltnú.

## Pomôcky a postup
Konáriky štyroch druhov, lupa, prípadne pravítko.
1. Nazbieraj vzorky konárikov.
2. Pozri sa: **jednotlivo alebo vo zväzočkoch**? Aký je **tvar** ihly (plochá/štvorhranná)?
3. Pozri šišky: **stoja, alebo visia**?
4. Nakresli a popíš každú vzorku.

## Jednoduchý kľúč (zapamätaj si)
- Ihly **vo zväzočkoch po dvoch** → **borovica**.
- Ihly **opadavé v chomáčikoch** → **smrekovec**.
- Ihly **ploché, mäkké, šišky hore** → **jedľa**.
- Ihly **štvorhranné, ostré, šišky visia** → **smrek**.

## Slovníček po lopate
- **Fascikulus (zväzoček)** = skupinka ihiel spolu (borovica po 2).
- **Opadavý ihličnan** = na zimu zhadzuje ihly (smrekovec).
- Smrek **pichá**, jedľa **nepichá** (mäkké ploché ihly).
- Jedľa – šišky **hore**; smrek – šišky **dole**.

## Príklad zo života
Klasická otázka pri vianočnom stromčeku: smrek, či jedľa? Chyť ihličie do dlane. Ak **pichá** a šišky visia, je to **smrek**. Ak je **mäkké** a ploché, je to **jedľa** (preto je obľúbenejšia – neopichá ti ruky pri zdobení).

## Ako to porozprávať na skúške (osnova na 20 minút)
1. Vysvetli, že ihličnany rozoznávame podľa **ihiel a šišiek**.
2. Prejdi **4 druhy** a ich znaky (borovica, smrek, jedľa, smrekovec).
3. Opíš **postup** pozorovania (jednotlivo/zväzočky, tvar, šišky).
4. Uveď **jednoduchý určovací kľúč**.
5. Pridaj príklad (smrek vs. jedľa pri vianočnom stromčeku).`,
};

/* ──────────────────────────────────────────────────────────────
   MARKDOWN RENDERER
   Blokový parser: nadpisy (#–####), tabuľky (| … |), číslované
   zoznamy (1.), odrážky vrátane vnorených (  - ), horizontálne
   oddeľovače (---) a odseky. Inline: **tučné**, *kurzíva*, `kód`.
   ────────────────────────────────────────────────────────────── */

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function mdInline(text) {
  // Najprv vyberieme `kód` spany, aby v nich neprebehlo bold/italic
  const codes = [];
  let t = text.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  t = escapeHtml(t);
  t = t
    .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
  t = t.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[+i])}</code>`);
  return t;
}

function parseList(lines, start) {
  const baseIndent = lines[start].match(/^(\s*)/)[1].length;
  let html = "<ul>";
  let i = start;
  while (i < lines.length) {
    const m = lines[i].match(/^(\s*)-\s+(.*)$/);
    if (!m) break;
    const indent = m[1].length;
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      const [nested, ni] = parseList(lines, i);
      html = html.replace(/<\/li>$/, nested + "</li>");
      i = ni;
      continue;
    }
    html += `<li>${mdInline(m[2])}</li>`;
    i++;
  }
  html += "</ul>";
  return [html, i];
}

const RE_HR = /^---+$/;
const RE_HEAD = /^(#{1,4})\s+(.*)$/;
const RE_UL = /^\s*-\s+/;
const RE_OL = /^\s*\d+\.\s+/;
const RE_TR = /^\s*\|.*\|\s*$/;
const RE_TSEP = /^\s*\|[\s:|-]+\|\s*$/;

function mdToHtml(text) {
  if (!text) return "";
  const lines = text.split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) { i++; continue; }

    if (RE_HR.test(line.trim())) { html += "<hr/>"; i++; continue; }

    const h = line.match(RE_HEAD);
    if (h) { const lvl = h[1].length; html += `<h${lvl}>${mdInline(h[2])}</h${lvl}>`; i++; continue; }

    // Tabuľka: hlavička + oddeľovací riadok |---|---|
    if (RE_TR.test(line) && i + 1 < lines.length && RE_TSEP.test(lines[i + 1])) {
      const parseRow = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const headers = parseRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && RE_TR.test(lines[i])) { rows.push(parseRow(lines[i])); i++; }
      let tbl = "<table><thead><tr>";
      headers.forEach((c) => (tbl += `<th>${mdInline(c)}</th>`));
      tbl += "</tr></thead><tbody>";
      rows.forEach((r) => {
        tbl += "<tr>";
        r.forEach((c) => (tbl += `<td>${mdInline(c)}</td>`));
        tbl += "</tr>";
      });
      tbl += "</tbody></table>";
      html += tbl;
      continue;
    }

    // Číslovaný zoznam
    if (RE_OL.test(line)) {
      const items = [];
      while (i < lines.length && RE_OL.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      html += "<ol>" + items.map((it) => `<li>${mdInline(it)}</li>`).join("") + "</ol>";
      continue;
    }

    // Odrážkový zoznam (vrátane vnorenia)
    if (RE_UL.test(line)) {
      const [listHtml, ni] = parseList(lines, i);
      html += listHtml;
      i = ni;
      continue;
    }

    // Odsek
    const para = [];
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !RE_HEAD.test(lines[i]) &&
      !RE_UL.test(lines[i]) &&
      !RE_OL.test(lines[i]) &&
      !RE_HR.test(lines[i].trim()) &&
      !RE_TR.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    html += `<p>${para.map(mdInline).join("<br/>")}</p>`;
  }
  return html;
}

const TAG_COLORS = {
  "teória":       { bg: "rgba(255,255,255,0.04)", text: "#e8e8e3", border: "rgba(255,255,255,0.22)", badge: "T", label: "Teória" },
  "praktikum":    { bg: "rgba(126,217,168,0.08)", text: "#9fe6c0", border: "rgba(126,217,168,0.30)", badge: "P", label: "Praktikum" },
  "odborný text": { bg: "rgba(212,175,103,0.08)", text: "#e3c887", border: "rgba(212,175,103,0.32)", badge: "O", label: "Odborný text" },
};

const T = {
  base: "#000000", elevated: "#0a0a0a", border: "rgba(255,255,255,0.12)",
  borderSoft: "rgba(255,255,255,0.06)",
  text: "#f4f4ef", textSec: "#8f8f88", active: "rgba(255,255,255,0.05)",
  accent: "#f4f4ef", accentText: "#ffffff", codeBg: "rgba(255,255,255,0.06)",
  tableHead: "rgba(255,255,255,0.04)",
  gold: "#c9a96a",
};

const LS_LAST = "mz_bio_last";
const LS_MODE = "mz_bio_mode";
const LS_LAYOUT = "mz_bio_layout";

const DEFAULT_LAYOUT = {
  sidebarVisible: true,
  sidebarWidth: 310,
  showFooter: true,
  showHeaderExtras: true,
  focusMode: false,
};

function loadJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

function loadLayout() {
  const saved = loadJSON(LS_LAYOUT, null);
  if (!saved || typeof saved !== "object") return { ...DEFAULT_LAYOUT };
  return { ...DEFAULT_LAYOUT, ...saved };
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

const SERIF = `Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif`;
const SANS = `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

function mdStyles(t) {
  return `
* { box-sizing:border-box; }
html, body, #root { margin:0; padding:0; height:100%; background:${t.base}; }
::selection { background:rgba(255,255,255,0.18); }
.bio-md { line-height:1.85; font-size:15.5px; color:${t.text}; max-width:880px; letter-spacing:0.1px;
  word-wrap:break-word; overflow-wrap:anywhere; }
.bio-md h1, .bio-md h2 { font-family:${SERIF}; font-size:23px; font-weight:600; margin:30px 0 14px;
  padding-bottom:10px; border-bottom:1px solid ${t.border}; color:${t.text}; letter-spacing:0.2px; }
.bio-md h1:first-child, .bio-md h2:first-child { margin-top:0; }
.bio-md h3 { font-family:${SERIF}; font-size:18px; font-weight:600; margin:22px 0 8px; color:${t.text}; }
.bio-md h4 { font-size:13px; font-weight:700; margin:16px 0 6px; color:${t.textSec};
  text-transform:uppercase; letter-spacing:1px; }
.bio-md p { margin:0 0 14px; }
.bio-md strong { font-weight:700; color:#ffffff; }
.bio-md em { font-style:italic; color:${t.textSec}; }
.bio-md ul, .bio-md ol { margin:10px 0 18px; padding-left:24px; }
.bio-md li { margin:7px 0; padding-left:4px; }
.bio-md ul ul, .bio-md ul ol, .bio-md ol ul { margin:5px 0; }
.bio-md ul { list-style:none; }
.bio-md ul > li { position:relative; }
.bio-md ul > li::before { content:""; position:absolute; left:-16px; top:11px; width:5px; height:5px;
  border-radius:50%; background:${t.gold}; }
.bio-md ul ul > li::before { background:transparent; border:1px solid ${t.textSec}; top:10px; }
.bio-md ol { list-style:decimal; }
.bio-md ol li::marker { color:${t.gold}; font-weight:700; }
.bio-md code { background:${t.codeBg}; padding:2px 7px; border-radius:5px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:13px;
  border:1px solid ${t.border}; color:#fff; }
.bio-md hr { border:none; border-top:1px solid ${t.border}; margin:24px 0; }
.bio-md table { border-collapse:collapse; width:100%; margin:18px 0; font-size:14px;
  border:1px solid ${t.border}; display:block; overflow-x:auto; }
.bio-md thead, .bio-md tbody, .bio-md tr { display:table; width:100%; table-layout:fixed; }
.bio-md th, .bio-md td { border:1px solid ${t.border}; padding:10px 12px; text-align:left; vertical-align:top; }
.bio-md th { background:${t.tableHead}; font-weight:700; color:#fff; text-transform:uppercase;
  font-size:12px; letter-spacing:0.6px; }
.bio-md tbody tr:nth-child(even) { background:rgba(255,255,255,0.02); }
.bio-scroll::-webkit-scrollbar { width:10px; height:10px; }
.bio-scroll::-webkit-scrollbar-thumb { background:${t.border}; border-radius:6px; }
.bio-scroll::-webkit-scrollbar-thumb:hover { background:rgba(255,255,255,0.25); }
.bio-scroll::-webkit-scrollbar-track { background:transparent; }
@keyframes bio-fadein {
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes bio-slidein {
  from { opacity:0; transform:translateX(-10px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes bio-scalein {
  from { opacity:0; transform:scale(0.96); }
  to   { opacity:1; transform:scale(1); }
}
@keyframes bio-appfade {
  from { opacity:0; }
  to   { opacity:1; }
}
@keyframes bio-glow-pulse {
  0%,100% { box-shadow: inset 2px 0 0 ${t.gold}; }
  50%      { box-shadow: inset 2px 0 0 ${t.gold}, 0 0 12px rgba(201,169,106,0.18); }
}
.bio-root { animation: bio-appfade 0.4s ease both; }
.bio-content-enter { animation: bio-fadein 0.38s cubic-bezier(0.22,1,0.36,1) both; }
.bio-title-enter   { animation: bio-slidein 0.3s cubic-bezier(0.22,1,0.36,1) both; }
.bio-sidebar-enter { animation: bio-scalein 0.35s cubic-bezier(0.22,1,0.36,1) both; }
.bio-zbtn {
  transition: background .18s ease, border-color .18s ease, transform .18s cubic-bezier(0.22,1,0.36,1);
  will-change: transform;
}
.bio-zbtn:hover { background:rgba(255,255,255,0.035) !important; transform:translateX(3px); }
.bio-zbtn:active { transform:translateX(1px) scale(0.99); }
.bio-zbtn.bio-active-item { animation: bio-glow-pulse 3s ease-in-out infinite; }
.bio-actbtn {
  transition: background .18s ease, border-color .18s ease, color .18s ease,
              transform .12s cubic-bezier(0.22,1,0.36,1), opacity .15s ease;
}
.bio-actbtn:hover { border-color:rgba(255,255,255,0.35) !important; }
.bio-actbtn:active { transform:scale(0.96) !important; }
.bio-tab-btn {
  transition: color .2s ease, border-color .2s ease, background .2s ease;
  position:relative;
}
.bio-tab-btn::after {
  content:""; position:absolute; bottom:-1px; left:0; right:0; height:2px;
  background:${t.gold}; border-radius:2px 2px 0 0;
  transform:scaleX(0); transform-origin:left;
  transition:transform .25s cubic-bezier(0.22,1,0.36,1);
}
.bio-tab-btn.bio-tab-active::after { transform:scaleX(1); }
.bio-tab-btn:not(.bio-tab-active):hover::after {
  transform:scaleX(0.4); background:rgba(255,255,255,0.2);
}
.bio-input-wrap input:focus {
  outline:none; border-color:rgba(201,169,106,0.5) !important;
  box-shadow:0 0 0 3px rgba(201,169,106,0.08);
  transition: border-color .2s ease, box-shadow .2s ease;
}
.bio-mode-btn {
  transition: background .2s ease, color .2s ease;
}
.bio-hamburger { display:none; }
.bio-resize-handle {
  position:absolute; top:0; right:-3px; width:6px; height:100%; cursor:col-resize; z-index:10;
  transition: background .15s ease;
}
.bio-resize-handle:hover, .bio-resize-handle.bio-resizing {
  background: rgba(201,169,106,0.45);
}
.bio-layout-panel {
  animation: bio-fadein 0.22s cubic-bezier(0.22,1,0.36,1) both;
}
.bio-focus .bio-header-extras { display:none !important; }
.bio-focus .bio-footer { display:none !important; }
.bio-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:40;
  -webkit-backdrop-filter:blur(2px); backdrop-filter:blur(2px);
  animation: bio-appfade 0.2s ease both; }
@media (max-width: 820px) {
  .bio-hamburger { display:inline-flex !important; }
  .bio-sidebar { position:fixed !important; top:0; left:0; bottom:0; height:100% !important;
    width:86% !important; max-width:330px !important; z-index:50;
    transform:translateX(-100%); transition:transform .25s ease;
    box-shadow:0 0 50px rgba(0,0,0,0.7); }
  .bio-sidebar.bio-open { transform:translateX(0); }
  .bio-header { padding:16px 18px 0 !important; }
  .bio-headrow { gap:12px !important; margin-bottom:14px !important; }
  .bio-title { font-size:21px !important; }
  .bio-content { padding:22px 18px 40px !important; }
  .bio-footer { padding:12px 18px !important; }
  .bio-md { font-size:15px !important; }
  .bio-md h1, .bio-md h2 { font-size:20px !important; }
  .bio-md h3 { font-size:17px !important; }
  .bio-md table { font-size:13px; }
  .bio-actbtn { padding:8px 12px !important; font-size:12px !important; }
}
@media (max-width: 480px) {
  .bio-content { padding:18px 14px 36px !important; }
  .bio-footer .bio-navlabel { display:none; }
}
`;
}

export default function App() {
  const [selId, setSelId]   = useState(() => loadJSON(LS_LAST, 1));
  const [tab, setTab]       = useState(0);
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [mode, setMode]     = useState(() => loadJSON(LS_MODE, "kratke"));
  const [layout, setLayout] = useState(loadLayout);
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [resizing, setResizing] = useState(false);
  const resizeRef = useRef({ startX: 0, startW: 310 });

  const t = T;
  const { sidebarVisible, sidebarWidth, showFooter, showHeaderExtras, focusMode } = layout;
  const effectiveSidebar = sidebarVisible && !focusMode;
  const showSidebarPanel = effectiveSidebar || navOpen;
  const effectiveHeaderExtras = showHeaderExtras && !focusMode;
  const effectiveFooter = showFooter && !focusMode;

  const patchLayout = useCallback((patch) => {
    setLayout(prev => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => { try { localStorage.setItem(LS_LAST, JSON.stringify(selId)); } catch {} }, [selId]);
  useEffect(() => { try { localStorage.setItem(LS_MODE, JSON.stringify(mode)); } catch {} }, [mode]);
  useEffect(() => {
    try { localStorage.setItem(LS_LAYOUT, JSON.stringify(layout)); } catch {}
  }, [layout]);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e) => {
      const dx = e.clientX - resizeRef.current.startX;
      patchLayout({ sidebarWidth: clamp(resizeRef.current.startW + dx, 220, 480) });
    };
    const onUp = () => setResizing(false);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing, patchLayout]);

  const startResize = useCallback((e) => {
    e.preventDefault();
    resizeRef.current = { startX: e.clientX, startW: sidebarWidth };
    setResizing(true);
  }, [sidebarWidth]);

  const zadanie  = ZADANIA.find(z => z.id === selId);
  const topic    = zadanie?.topics[tab];
  const cKey     = `${selId}-${tab}`;
  const hasLong  = !!R[cKey];
  const longMode = mode === "rozpravanie";
  const content  = (longMode && hasLong ? R[cKey] : E[cKey]) || "Obsah sa načítava…";
  const tagStyle = TAG_COLORS[topic?.k] || TAG_COLORS["teória"];

  const selectZadanie = useCallback((id) => { setSelId(id); setTab(0); setNavOpen(false); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ZADANIA;
    return ZADANIA.filter(z =>
      z.id.toString().includes(q) ||
      z.topics.some(tp => tp.n.toLowerCase().includes(q) || tp.a.toLowerCase().includes(q))
    );
  }, [search]);

  const renderedHtml = useMemo(() => mdToHtml(content), [content]);

  // Klávesová navigácia: ←/→ medzi zadaniami, 1/2/3 medzi záložkami, f = čítanie
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") { setNavOpen(false); setLayoutOpen(false); return; }
      if (e.key === "f" || e.key === "F") {
        const tag = (e.target.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        patchLayout({ focusMode: !focusMode });
        return;
      }
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.metaKey || e.ctrlKey || e.altKey) return;
      const idx = ZADANIA.findIndex(z => z.id === selId);
      if (e.key === "ArrowLeft" && idx > 0) { setSelId(ZADANIA[idx - 1].id); setTab(0); }
      else if (e.key === "ArrowRight" && idx < ZADANIA.length - 1) { setSelId(ZADANIA[idx + 1].id); setTab(0); }
      else if (["1", "2", "3"].includes(e.key)) {
        const ti = +e.key - 1;
        const z = ZADANIA.find(z => z.id === selId);
        if (z && ti < z.topics.length) setTab(ti);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selId, focusMode, patchLayout]);

  const LayoutToggle = ({ on, label, hint, onClick }) => (
    <button type="button" className="bio-actbtn" onClick={onClick}
      style={{
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:12,
        width:"100%", padding:"10px 12px", borderRadius:6, border:`1px solid ${on ? "rgba(201,169,106,0.45)" : t.border}`,
        background: on ? "rgba(201,169,106,0.1)" : "transparent",
        color: on ? t.text : t.textSec, cursor:"pointer", fontSize:12.5, textAlign:"left",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize:10, opacity:0.7, letterSpacing:"0.5px" }}>{on ? "Zap." : "Vyp."}{hint ? ` · ${hint}` : ""}</span>
    </button>
  );

  const idx = ZADANIA.findIndex(z => z.id === selId);
  const btn = (extra = {}) => ({
    padding: "8px 16px", borderRadius: 6, border: `1px solid ${t.border}`,
    background: "transparent", color: t.text, cursor: "pointer", fontSize: 13,
    letterSpacing: "0.3px", ...extra,
  });

  const Badge = ({ tk, size = 22 }) => {
    const ts = TAG_COLORS[tk] || TAG_COLORS["teória"];
    return (
      <span style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        width:size, height:size, flexShrink:0, borderRadius:5, fontSize:11, fontWeight:700,
        background:ts.bg, color:ts.text, border:`1px solid ${ts.border}`, letterSpacing:0,
      }}>{ts.badge}</span>
    );
  };

  return (
    <div className={`bio-root${focusMode ? " bio-focus" : ""}`} style={{ display:"flex", height:"100vh", fontFamily:SANS, background:t.base, color:t.text }}>
      <style>{mdStyles(t)}</style>

      {/* mobilný overlay */}
      {navOpen && <div className="bio-overlay bio-no-print" onClick={() => setNavOpen(false)} />}

      {/* ── LEFT SIDEBAR ── */}
      {showSidebarPanel && (
      <div className={`bio-no-print bio-sidebar bio-sidebar-enter${navOpen ? " bio-open" : ""}`} style={{ position:"relative", width: effectiveSidebar ? sidebarWidth : 310, minWidth:220, maxWidth:480, flexShrink:0, display:"flex", flexDirection:"column", borderRight:`1px solid ${t.border}`, background:t.elevated }}>
        {effectiveSidebar && (
        <div
          className={`bio-resize-handle${resizing ? " bio-resizing" : ""}`}
          onMouseDown={startResize}
          title="Potiahni pre zmenu šírky"
          role="separator"
          aria-orientation="vertical"
        />
        )}
        <div style={{ padding:"20px 18px 16px", borderBottom:`1px solid ${t.border}` }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontFamily:SERIF, fontWeight:600, fontSize:20, letterSpacing:"0.4px", color:t.text }}>Maturita Biológia</div>
            <div style={{ fontSize:11, color:t.textSec, textTransform:"uppercase", letterSpacing:"2px", marginTop:4 }}>Ústna maturita · 30 zadaní</div>
          </div>

          <div className="bio-input-wrap" style={{ width:"100%" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Hľadať tému…"
              style={{ width:"100%", padding:"9px 12px", border:`1px solid ${t.border}`, borderRadius:6, fontSize:13, background:t.base, color:t.text, boxSizing:"border-box", outline:"none", transition:"border-color .2s ease, box-shadow .2s ease" }}
            />
          </div>
        </div>

        <div className="bio-scroll" style={{ overflowY:"auto", flex:1 }}>
          {filtered.map(z => {
            const active = selId === z.id;
            return (
              <button
                key={z.id}
                className={`bio-zbtn${active ? " bio-active-item" : ""}`}
                onClick={() => selectZadanie(z.id)}
                style={{
                  display:"flex", alignItems:"flex-start", gap:10, width:"100%", textAlign:"left", padding:"13px 16px",
                  background: active ? t.active : "transparent",
                  border:"none", borderLeft: active ? `2px solid ${t.gold}` : "2px solid transparent",
                  borderBottom:`1px solid ${t.borderSoft}`,
                  cursor:"pointer", fontSize:12.5, color:t.text,
                  fontWeight: active ? 500 : 400, boxSizing:"border-box",
                }}
              >
                <span style={{ fontFamily:SERIF, fontSize:15, minWidth:22, flexShrink:0, color: active ? t.gold : t.textSec, fontWeight:600 }}>{z.id}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  {z.topics.map((tp, ti) => (
                    <div key={ti} style={{
                      display:"flex", alignItems:"flex-start", gap:6,
                      marginBottom: ti < z.topics.length - 1 ? 6 : 0,
                      lineHeight:1.35, wordBreak:"break-word",
                      opacity: active ? (tab === ti ? 1 : 0.72) : 0.8,
                    }}>
                      <Badge tk={tp.k} size={18} />
                      <span style={{ flex:1 }}>{tp.n}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && <div style={{ padding:18, color:t.textSec, fontSize:13 }}>Žiadne výsledky.</div>}
        </div>

        <div style={{ padding:"12px 18px", borderTop:`1px solid ${t.border}`, fontSize:10.5, color:t.textSec, letterSpacing:"0.5px", textTransform:"uppercase" }}>
          ←/→ zadania · 1/2/3 záložky · F čítanie
        </div>
      </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="bio-main" style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* header */}
        <div className="bio-no-print bio-header" style={{ padding: focusMode ? "12px 24px" : "22px 32px 0", paddingBottom: effectiveHeaderExtras ? 0 : 12, borderBottom:`1px solid ${t.border}`, background:t.elevated, position:"relative" }}>
          <div className="bio-headrow" style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom: effectiveHeaderExtras ? 18 : 0 }}>
            <button
              className="bio-hamburger bio-actbtn"
              onClick={() => { if (!sidebarVisible) patchLayout({ sidebarVisible: true }); setNavOpen(true); }}
              aria-label="Otvoriť zoznam zadaní"
              style={{ border:`1px solid ${t.border}`, background:"transparent", color:t.text, borderRadius:6, cursor:"pointer", padding:"7px 9px", flexShrink:0, lineHeight:0, marginTop:2 }}
            >
              <span style={{ display:"block", width:18, height:2, background:t.text, boxShadow:`0 5px 0 ${t.text}, 0 10px 0 ${t.text}` }} />
            </button>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:11, color:t.textSec, marginBottom:8, textTransform:"uppercase", letterSpacing:"2px" }}>Zadanie {selId} / 30</div>
              <div key={`title-${cKey}`} className="bio-title bio-title-enter" style={{ fontFamily:SERIF, fontWeight:600, fontSize: focusMode ? 22 : 26, lineHeight:1.3, wordBreak:"break-word", letterSpacing:"0.2px" }}>{topic?.n}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8, flexShrink:0 }}>
              <button
                type="button"
                className="bio-actbtn"
                onClick={() => setLayoutOpen(o => !o)}
                aria-label="Nastavenie rozloženia"
                title="Upraviť panely"
                style={{ ...btn(), padding:"7px 12px", fontSize:12, borderColor: layoutOpen ? "rgba(201,169,106,0.5)" : t.border }}
              >
                Rozloženie
              </button>
              {focusMode && (
                <span style={{ fontSize:10, color:t.gold, letterSpacing:"1px", textTransform:"uppercase" }}>Režim čítania</span>
              )}
            </div>
          </div>

          {layoutOpen && (
            <div className="bio-layout-panel bio-no-print" style={{
              position:"absolute", top:"100%", right:24, zIndex:60, marginTop:8,
              width:280, padding:14, borderRadius:10, border:`1px solid ${t.border}`,
              background:"#0d0d0d", boxShadow:"0 16px 48px rgba(0,0,0,0.55)",
            }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", color:t.textSec, marginBottom:12 }}>
                Upraviť panely
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <LayoutToggle label="Bočný panel" hint="B" on={sidebarVisible} onClick={() => patchLayout({ sidebarVisible: !sidebarVisible })} />
                <LayoutToggle label="Hlavička (záložky, režim)" on={showHeaderExtras} onClick={() => patchLayout({ showHeaderExtras: !showHeaderExtras })} />
                <LayoutToggle label="Pätička (navigácia)" on={showFooter} onClick={() => patchLayout({ showFooter: !showFooter })} />
                <LayoutToggle label="Režim čítania" hint="F" on={focusMode} onClick={() => patchLayout({ focusMode: !focusMode })} />
              </div>
              <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${t.borderSoft}`, fontSize:11, color:t.textSec, lineHeight:1.5 }}>
                Šírku bočného panelu zmeníš potiahnutím na jeho pravom okraji.
              </div>
              <button type="button" className="bio-actbtn" onClick={() => setLayout({ ...DEFAULT_LAYOUT })}
                style={{ ...btn(), width:"100%", marginTop:10, fontSize:11, color:t.textSec }}
              >Obnoviť predvolené</button>
            </div>
          )}

          <div className="bio-header-extras" style={{ display: effectiveHeaderExtras ? "block" : "none" }}>
          {/* prepínač režimu */}
          <div style={{ display:"flex", gap:0, marginTop:14, marginBottom:14, border:`1px solid ${t.border}`, borderRadius:8, overflow:"hidden", width:"fit-content", maxWidth:"100%" }}>
            {[
              { id:"kratke", label:"Stručne" },
              { id:"rozpravanie", label:"Rozprávanie (20 min)" },
            ].map((m, i) => {
              const act = mode === m.id;
              return (
                <button key={m.id} onClick={() => setMode(m.id)} className="bio-actbtn bio-mode-btn"
                  style={{
                    padding:"7px 16px", border:"none", cursor:"pointer", fontSize:12.5,
                    background: act ? t.text : "transparent",
                    color: act ? t.base : t.textSec,
                    fontWeight: act ? 700 : 500, letterSpacing:"0.3px",
                    borderLeft: i > 0 ? `1px solid ${t.border}` : "none",
                  }}
                >{m.label}</button>
              );
            })}
          </div>

          {longMode && !hasLong && (
            <div style={{ marginBottom:14, padding:"9px 14px", borderRadius:8, fontSize:12.5,
              background:"rgba(212,175,103,0.08)", border:`1px solid ${t.border}`, color:t.textSec, lineHeight:1.5 }}>
              Rozprávacia verzia tejto témy sa ešte pripravuje – zobrazujem zatiaľ <strong style={{ color:t.text }}>stručnú verziu</strong>.
            </div>
          )}

          {/* tabs */}
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {zadanie?.topics.map((tp, i) => {
              const act = tab === i;
              return (
                <button key={i} onClick={() => setTab(i)}
                  className={`bio-tab-btn${act ? " bio-tab-active" : ""}`}
                  style={{
                    padding:"10px 16px", border:"none", borderBottom:"2px solid transparent",
                    background:"transparent", cursor:"pointer", fontSize:13,
                    color: act ? t.text : t.textSec,
                    fontWeight: act ? 600 : 400,
                    marginBottom:-1,
                    display:"flex", alignItems:"flex-start", gap:8, textAlign:"left",
                    lineHeight:1.4, wordBreak:"break-word", maxWidth:"100%", flex:"1 1 220px",
                  }}
                >
                  <Badge tk={tp.k} size={20} />
                  <span style={{ flex:1 }}>{tp.n}</span>
                </button>
              );
            })}
          </div>
          </div>
        </div>

        {/* content */}
        <div className="bio-scroll bio-content" style={{ flex:1, overflowY:"auto", padding: focusMode ? "28px clamp(20px, 5vw, 64px) 56px" : "32px 40px 48px" }}>
          <div key={cKey} className="bio-content-enter">
            <div className="bio-no-print" style={{ display:"inline-flex", alignItems:"center", gap:9, marginBottom:24, fontSize:11, fontWeight:600, color:t.textSec, flexWrap:"wrap", lineHeight:1.4, maxWidth:"100%", textTransform:"uppercase", letterSpacing:"1px" }}>
              <Badge tk={topic?.k} size={20} />
              <span style={{ color:tagStyle.text }}>{tagStyle.label}</span>
              <span style={{ color:t.textSec, opacity:0.6 }}>·</span>
              <span style={{ color:t.textSec, wordBreak:"break-word" }}>{topic?.a}</span>
            </div>
            <div className="bio-md" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
          </div>
        </div>

        {/* footer nav */}
        {effectiveFooter && (
        <div className="bio-no-print bio-footer" style={{ padding:"14px 32px", borderTop:`1px solid ${t.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, background:t.elevated }}>
          <button
            className="bio-actbtn"
            onClick={() => { if (idx > 0) { setSelId(ZADANIA[idx - 1].id); setTab(0); } }}
            disabled={selId === 1}
            style={btn({ opacity: selId === 1 ? 0.3 : 1, cursor: selId === 1 ? "default" : "pointer" })}
          >← <span className="bio-navlabel">Predchádzajúce</span></button>
          <span style={{ fontSize:12, color:t.textSec, letterSpacing:"1px", flexShrink:0 }}>{selId} / 30</span>
          <button
            className="bio-actbtn"
            onClick={() => { if (idx < ZADANIA.length - 1) { setSelId(ZADANIA[idx + 1].id); setTab(0); } }}
            disabled={selId === 30}
            style={btn({ opacity: selId === 30 ? 0.3 : 1, cursor: selId === 30 ? "default" : "pointer" })}
          ><span className="bio-navlabel">Nasledujúce</span> →</button>
        </div>
        )}

        {/* plávajúce ovládanie v režime čítania */}
        {focusMode && (
          <div className="bio-no-print" style={{
            position:"fixed", bottom:20, right:20, zIndex:70, display:"flex", gap:8, flexWrap:"wrap", justifyContent:"flex-end",
          }}>
            <button type="button" className="bio-actbtn" onClick={() => patchLayout({ focusMode: false })}
              style={{ ...btn(), background:"rgba(10,10,10,0.92)", boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}
            >Ukončiť čítanie (F)</button>
            {!effectiveSidebar && (
              <button type="button" className="bio-actbtn" onClick={() => patchLayout({ sidebarVisible: true })}
                style={{ ...btn(), background:"rgba(10,10,10,0.92)", boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}
              >Zoznam zadaní</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
