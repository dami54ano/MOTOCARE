// Public demo information. Service-kit compatibility requires OEM verification.
export const boxes=[
 {id:1,code:'WASH',name:'THE WASH KIT',subtitle:'Der perfekte Reset.',type:'WASH',price:29.90,interval:'Monatlich',eyebrow:'01 / CLEAN',accent:'lime',items:['Motorradreiniger','Mikrofasertücher','Detailbürste','Kettenreiniger'],tag:'BESTSELLER',details:'Alles für den sauberen Ride. Universelle Pflegeprodukte für den regelmässigen Einsatz.'},
 {id:2,code:'SERVICE',name:'THE SERVICE KIT',subtitle:'Für den nächsten Service.',type:'SERVICE',price:59.90,interval:'Nach Bedarf',eyebrow:'02 / MAINTAIN',accent:'sand',items:['Passendes Motoröl*','Passender Ölfilter*','Dichtring*','Service-Checkliste'],tag:'BIKE-SPECIFIC',details:'Technische Teile werden nur nach bestätigter Hersteller-Kompatibilität angeboten.'},
 {id:3,code:'WINTER',name:'THE WINTER KIT',subtitle:'Bereit für die Pause.',type:'WINTER',price:39.90,interval:'Saisonal',eyebrow:'03 / PROTECT',accent:'steel',items:['Konservierungsspray','Batteriepflege-Guide','Abdeck-Zubehör','Winter-Checkliste'],tag:'SEASONAL',details:'Schutz und Vorbereitung für die Standzeit deiner Maschine.'},
 {id:4,code:'MYSTERY',name:'THE MYSTERY KIT',subtitle:'Jedes Mal etwas Neues.',type:'MYSTERY',price:24.90,interval:'Monatlich',eyebrow:'04 / DISCOVER',accent:'charcoal',items:['Pflege-Accessoires','Kleine Tools','Lifestyle-Extras','Überraschungsprodukt'],tag:'LIMITED',details:'Nur universelle, nicht sicherheitskritische Artikel. Keine zufälligen Öle oder Filter.'}
];
export const motorcycles=[{id:1,brand:'Husqvarna',model:'FE 450',year:2026},{id:2,brand:'KTM',model:'690 SMC R',year:2024},{id:3,brand:'Yamaha',model:'MT-07',year:2025},{id:4,brand:'BMW',model:'S 1000 RR',year:2025},{id:5,brand:'Honda',model:'CB650R',year:2024},{id:6,brand:'Kawasaki',model:'Z900',year:2025}];
export function money(v){return `CHF ${Number(v).toFixed(2)}`}
export function isDemoCompatible(type){return type!=='SERVICE'}
