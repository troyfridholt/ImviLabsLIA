class Database {

    static getTextAndQuestions(level, age) {
        let text;
        let questions;
        level = parseInt(level);
        age = parseInt(age);

        switch(true){
            case (age > 0 && age <= 12):
                switch (level) {
                    case 1:
                        text = "1En dag gick en snabb och smidig brun räv genom skogen. Räven var alltid på jakt efter något att äta och denna dag var ingen annorlunda. Plötsligt såg han en lat hund som låg och sov vid en bäck. Räven kände genast att han ville ha hunden till lunch. Han började smyga sig närmare och närmare tills han var bara några meter bort. Men precis när han skulle hoppa på hunden, så vaknade hunden och började skälla högt. Räven ryckte till och började springa så fort han kunde, hoppade över bäcken och fortsatte att springa tills han var utom synhåll av hunden. Han var glad över att ha undkommit fara, men besviken på att hans plan hade misslyckats.";
                        questions = [            
                            {   prompt: "Vad var rävens syfte?",                
                                options: ["Att hitta mat", "Att sova", "Att promenera"]
                            },
                            {
                                prompt: "Vad fann räven när han var ute och letade efter mat?",
                                options: ["En hund", "En fågel", "En fisk"]
                            },
                            {
                                prompt: "Vad hände när hunden vaknade?",
                                options: ["Räven hoppade på hunden", "Räven började skälla", "Räven började springa"]
                            }
                        ];
                        break;

                    case 2:
                        text = "Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över. Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över.";
                        questions = [        
                            {           
                                prompt: "Vilken färg hade räven?",            
                                options: ["Röd", "Grön", "Brun"]
                            },
                            {
                                prompt: "Vad gör räven?",
                                options: ["Sover", "Äter", "Utforskar"]
                            },
                            {
                                prompt: "Vad hoppar räven över?",
                                options: ["Vägg", "Hus", "Staket"]
                            }
                        ];
                        break;   
                    case 3:
                        text = "En vacker sommardag, en ung pojke beslutade sig för att gå ut och fiska i den närliggande sjön. Han packade sin fiskeutrustning och gav sig iväg. Efter en stunds gång, kom han fram till sjön och satte sig ner för att fiska. Han kastade ut sin linje och väntade på att någon fisk skulle bita. Efter bara några minuter, kände han ett ryck i linan och han drog upp en stor och vacker abborre. Han var så glad och han fortsatte att fiska resten av dagen och fångade flera andra fiskar också.";
                        questions = [        
                            {            
                            prompt: "Vem är huvudpersonen i texten?",            
                            options: ["En pojke", "En flicka", "En gammal man"]
                            },
                            {
                                prompt: "Vad gör huvudpersonen?",
                                options: ["Går ut för att fiska", "Går ut för att promenera", "Går ut för att plocka bär"]
                            },
                            {
                                prompt: "Vad fångar huvudpersonen i texten?",
                                options: ["En fisk", "En fågel", "En krabba"]
                            }
                        ];
                        break;
                    case 4:
                        text = "En liten flicka gick genom skogen med hennes hund. De gick längs en bäck där de hittade en liten grotta. Flickan var nyfiken och beslutade sig för att gå in i grottan tillsammans med sin hund. Inne i grottan hittade de en liten sjö och beslutade sig för att ta en fika. Efter en stunds vila gick de ut ur grottan och fortsatte sin promenad."
                        questions = [
                            {
                                prompt: "Vem är huvudpersonen i texten?",
                                options: ["En pojke", "En flicka", "En gammal man"]
                            },
                            {
                                prompt: "Vad hittade flickan och hennes hund?",
                                options: ["En grotta", "En bäck", "Ett träd"]
                            },
                            {
                                prompt: "Vad gör flickan och hennes hund efter att ha hittat grottan?",
                                options: ["Går in i grottan", "Fortsätter promenera", "Går tillbaka hem"]
                            }
                        ];
                        break;
                    case 5:
                        text = "En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                        questions = [
                            {
                                prompt: "Vem är huvudpersonen i texten?",
                                options: ["En pojke", "En ung man", "En gammal man"]
                            },
                            {
                                prompt: "Vad gör huvudpersonen på fredagkvällen?",
                                options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                            },
                            {
                                prompt: "Vem träffar han på fredagkvällen?",
                                options: ["En gammal vän", "En hund", "En katt"]
                            }
                        ];
                        break;
                    default:
                        text = "level 1 En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                        questions = [
                            {
                                prompt: "Vem är huvudpersonen i texten?",
                                options: ["En pojke", "En ung man", "En gammal man"]
                            },
                            {
                                prompt: "Vad gör huvudpersonen på fredagkvällen?",
                                options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                            },
                            {
                                prompt: "Vem träffar han på fredagkvällen?",
                                options: ["En gammal vän", "En hund", "En katt"]
                            }
                        ];
                        break;
                  }
                  break;
                  
                  

        case (age > 12 && age <= 15):
            switch (level) {
                case 1:
                    text = "2En dag gick en snabb och smidig brun räv genom skogen. Räven var alltid på jakt efter något att äta och denna dag var ingen annorlunda. Plötsligt såg han en lat hund som låg och sov vid en bäck. Räven kände genast att han ville ha hunden till lunch. Han började smyga sig närmare och närmare tills han var bara några meter bort. Men precis när han skulle hoppa på hunden, så vaknade hunden och började skälla högt. Räven ryckte till och började springa så fort han kunde, hoppade över bäcken och fortsatte att springa tills han var utom synhåll av hunden. Han var glad över att ha undkommit fara, men besviken på att hans plan hade misslyckats.";
                    questions = [            
                        {   prompt: "Vad var rävens syfte?",                
                            options: ["Att hitta mat", "Att sova", "Att promenera"]
                        },
                        {
                            prompt: "Vad fann räven när han var ute och letade efter mat?",
                            options: ["En hund", "En fågel", "En fisk"]
                        },
                        {
                            prompt: "Vad hände när hunden vaknade?",
                            options: ["Räven hoppade på hunden", "Räven började skälla", "Räven började springa"]
                        }
                    ];
                    break;

                case 2:
                    text = "Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över. Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över.";
                    questions = [        
                        {           
                            prompt: "Vilken färg hade räven?",            
                            options: ["Röd", "Grön", "Brun"]
                        },
                        {
                            prompt: "Vad gör räven?",
                            options: ["Sover", "Äter", "Utforskar"]
                        },
                        {
                            prompt: "Vad hoppar räven över?",
                            options: ["Vägg", "Hus", "Staket"]
                        }
                    ];
                    break;   
                case 3:
                    text = "En vacker sommardag, en ung pojke beslutade sig för att gå ut och fiska i den närliggande sjön. Han packade sin fiskeutrustning och gav sig iväg. Efter en stunds gång, kom han fram till sjön och satte sig ner för att fiska. Han kastade ut sin linje och väntade på att någon fisk skulle bita. Efter bara några minuter, kände han ett ryck i linan och han drog upp en stor och vacker abborre. Han var så glad och han fortsatte att fiska resten av dagen och fångade flera andra fiskar också.";
                    questions = [        
                        {            
                        prompt: "Vem är huvudpersonen i texten?",            
                        options: ["En pojke", "En flicka", "En gammal man"]
                        },
                        {
                            prompt: "Vad gör huvudpersonen?",
                            options: ["Går ut för att fiska", "Går ut för att promenera", "Går ut för att plocka bär"]
                        },
                        {
                            prompt: "Vad fångar huvudpersonen i texten?",
                            options: ["En fisk", "En fågel", "En krabba"]
                        }
                    ];
                    break;
                case 4:
                    text = "En liten flicka gick genom skogen med hennes hund. De gick längs en bäck där de hittade en liten grotta. Flickan var nyfiken och beslutade sig för att gå in i grottan tillsammans med sin hund. Inne i grottan hittade de en liten sjö och beslutade sig för att ta en fika. Efter en stunds vila gick de ut ur grottan och fortsatte sin promenad."
                    questions = [
                        {
                            prompt: "Vem är huvudpersonen i texten?",
                            options: ["En pojke", "En flicka", "En gammal man"]
                        },
                        {
                            prompt: "Vad hittade flickan och hennes hund?",
                            options: ["En grotta", "En bäck", "Ett träd"]
                        },
                        {
                            prompt: "Vad gör flickan och hennes hund efter att ha hittat grottan?",
                            options: ["Går in i grottan", "Fortsätter promenera", "Går tillbaka hem"]
                        }
                    ];
                    break;
                case 5:
                    text = "En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                    questions = [
                        {
                            prompt: "Vem är huvudpersonen i texten?",
                            options: ["En pojke", "En ung man", "En gammal man"]
                        },
                        {
                            prompt: "Vad gör huvudpersonen på fredagkvällen?",
                            options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                        },
                        {
                            prompt: "Vem träffar han på fredagkvällen?",
                            options: ["En gammal vän", "En hund", "En katt"]
                        }
                    ];
                    break;
                default:
                    text = "level 15 En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                    questions = [
                        {
                            prompt: "Vem är huvudpersonen i texten?",
                            options: ["En pojke", "En ung man", "En gammal man"]
                        },
                        {
                            prompt: "Vad gör huvudpersonen på fredagkvällen?",
                            options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                        },
                        {
                            prompt: "Vem träffar han på fredagkvällen?",
                            options: ["En gammal vän", "En hund", "En katt"]
                        }
                    ];
                    break;
                }
                break;
            

    case (age > 15 && age <= 18):
        switch (level) {
            case 1:
                text = "3En dag gick en snabb och smidig brun räv genom skogen. Räven var alltid på jakt efter något att äta och denna dag var ingen annorlunda. Plötsligt såg han en lat hund som låg och sov vid en bäck. Räven kände genast att han ville ha hunden till lunch. Han började smyga sig närmare och närmare tills han var bara några meter bort. Men precis när han skulle hoppa på hunden, så vaknade hunden och började skälla högt. Räven ryckte till och började springa så fort han kunde, hoppade över bäcken och fortsatte att springa tills han var utom synhåll av hunden. Han var glad över att ha undkommit fara, men besviken på att hans plan hade misslyckats.";
                questions = [            
                    {   prompt: "Vad var rävens syfte?",                
                        options: ["Att hitta mat", "Att sova", "Att promenera"]
                    },
                    {
                    prompt: "Vad fann räven när han var ute och letade efter mat?",
                    options: ["En hund", "En fågel", "En fisk"]
                    },
                    {
                    prompt: "Vad hände när hunden vaknade?",
                    options: ["Räven hoppade på hunden", "Hunden började skälla", "Hunden började springa"]
                    }
                ];
                break;

            case 2:
                text = "Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över. Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över.";
                questions = [        
                    {           
                        prompt: "Vilken färg hade räven?",            
                        options: ["Röd", "Grön", "Brun"]
                    },
                    {
                        prompt: "Vad gör räven?",
                        options: ["Sover", "Äter", "Utforskar"]
                    },
                    {
                        prompt: "Vad hoppar räven över?",
                        options: ["Vägg", "Hus", "Staket"]
                    }
                ];
                break;   
            case 3:
                text = "En vacker sommardag, en ung pojke beslutade sig för att gå ut och fiska i den närliggande sjön. Han packade sin fiskeutrustning och gav sig iväg. Efter en stunds gång, kom han fram till sjön och satte sig ner för att fiska. Han kastade ut sin linje och väntade på att någon fisk skulle bita. Efter bara några minuter, kände han ett ryck i linan och han drog upp en stor och vacker abborre. Han var så glad och han fortsatte att fiska resten av dagen och fångade flera andra fiskar också.";
                questions = [        
                    {            
                    prompt: "Vem är huvudpersonen i texten?",            
                    options: ["En pojke", "En flicka", "En gammal man"]
                    },
                    {
                        prompt: "Vad gör huvudpersonen?",
                        options: ["Går ut för att fiska", "Går ut för att promenera", "Går ut för att plocka bär"]
                    },
                    {
                        prompt: "Vad fångar huvudpersonen i texten?",
                        options: ["En fisk", "En fågel", "En krabba"]
                    }
                ];
                break;
            case 4:
                text = "En liten flicka gick genom skogen med hennes hund. De gick längs en bäck där de hittade en liten grotta. Flickan var nyfiken och beslutade sig för att gå in i grottan tillsammans med sin hund. Inne i grottan hittade de en liten sjö och beslutade sig för att ta en fika. Efter en stunds vila gick de ut ur grottan och fortsatte sin promenad."
                questions = [
                    {
                        prompt: "Vem är huvudpersonen i texten?",
                        options: ["En pojke", "En flicka", "En gammal man"]
                    },
                    {
                        prompt: "Vad hittade flickan och hennes hund?",
                        options: ["En grotta", "En bäck", "Ett träd"]
                    },
                    {
                        prompt: "Vad gör flickan och hennes hund efter att ha hittat grottan?",
                        options: ["Går in i grottan", "Fortsätter promenera", "Går tillbaka hem"]
                    }
                ];
                break;
            case 5:
                text = "En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                questions = [
                    {
                        prompt: "Vem är huvudpersonen i texten?",
                        options: ["En pojke", "En ung man", "En gammal man"]
                    },
                    {
                        prompt: "Vad gör huvudpersonen på fredagkvällen?",
                        options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                    },
                    {
                        prompt: "Vem träffar han på fredagkvällen?",
                        options: ["En gammal vän", "En hund", "En katt"]
                    }
                ];
                break;
            default:
                text = "Level 15 En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                questions = [
                    {
                        prompt: "Vem är huvudpersonen i texten?",
                        options: ["En pojke", "En ung man", "En gammal man"]
                    },
                    {
                        prompt: "Vad gör huvudpersonen på fredagkvällen?",
                        options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                    },
                    {
                        prompt: "Vem träffar han på fredagkvällen?",
                        options: ["En gammal vän", "En hund", "En katt"]
                    }
                ];
                break;        
                }
                break;



    case (age > 18):
        switch (level) {
            case 1:
                text = "4En dag gick en snabb och smidig brun räv genom skogen. Räven var alltid på jakt efter något att äta och denna dag var ingen annorlunda. Plötsligt såg han en lat hund som låg och sov vid en bäck. Räven kände genast att han ville ha hunden till lunch. Han började smyga sig närmare och närmare tills han var bara några meter bort. Men precis när han skulle hoppa på hunden, så vaknade hunden och började skälla högt. Räven ryckte till och började springa så fort han kunde, hoppade över bäcken och fortsatte att springa tills han var utom synhåll av hunden. Han var glad över att ha undkommit fara, men besviken på att hans plan hade misslyckats.";
                questions = [            
                    {   prompt: "Vad var rävens syfte?",                
                        options: ["Att hitta mat", "Att sova", "Att promenera"]
                    },
                    {
                        prompt: "Vad fann räven när han var ute och letade efter mat?",
                        options: ["En hund", "En fågel", "En fisk"]
                    },
                    {
                        prompt: "Vad hände när hunden vaknade?",
                        options: ["Räven hoppade på hunden", "Räven började skälla", "Räven började springa"]
                    }
                ];
                break;

            case 2:
                text = "Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över. Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över.";
                questions = [        
                    {           
                        prompt: "Vilken färg hade räven?",            
                        options: ["Röd", "Grön", "Brun"]
                    },
                    {
                        prompt: "Vad gör räven?",
                        options: ["Sover", "Äter", "Utforskar"]
                    },
                    {
                        prompt: "Vad hoppar räven över?",
                        options: ["Vägg", "Hus", "Staket"]
                    }
                ];
                break;   
            case 3:
                text = "En vacker sommardag, en ung pojke beslutade sig för att gå ut och fiska i den närliggande sjön. Han packade sin fiskeutrustning och gav sig iväg. Efter en stunds gång, kom han fram till sjön och satte sig ner för att fiska. Han kastade ut sin linje och väntade på att någon fisk skulle bita. Efter bara några minuter, kände han ett ryck i linan och han drog upp en stor och vacker abborre. Han var så glad och han fortsatte att fiska resten av dagen och fångade flera andra fiskar också.";
                questions = [        
                    {            
                    prompt: "Vem är huvudpersonen i texten?",            
                    options: ["En pojke", "En flicka", "En gammal man"]
                    },
                    {
                        prompt: "Vad gör huvudpersonen?",
                        options: ["Går ut för att fiska", "Går ut för att promenera", "Går ut för att plocka bär"]
                    },
                    {
                        prompt: "Vad fångar huvudpersonen i texten?",
                        options: ["En fisk", "En fågel", "En krabba"]
                    }
                ];
                break;
            case 4:
                text = "En liten flicka gick genom skogen med hennes hund. De gick längs en bäck där de hittade en liten grotta. Flickan var nyfiken och beslutade sig för att gå in i grottan tillsammans med sin hund. Inne i grottan hittade de en liten sjö och beslutade sig för att ta en fika. Efter en stunds vila gick de ut ur grottan och fortsatte sin promenad."
                questions = [
                    {
                        prompt: "Vem är huvudpersonen i texten?",
                        options: ["En pojke", "En flicka", "En gammal man"]
                    },
                    {
                        prompt: "Vad hittade flickan och hennes hund?",
                        options: ["En grotta", "En bäck", "Ett träd"]
                    },
                    {
                        prompt: "Vad gör flickan och hennes hund efter att ha hittat grottan?",
                        options: ["Går in i grottan", "Fortsätter promenera", "Går tillbaka hem"]
                    }
                ];
                break;
            case 5:
                text = "En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                questions = [
                    {
                        prompt: "Vem är huvudpersonen i texten?",
                        options: ["En pojke", "En ung man", "En gammal man"]
                    },
                    {
                        prompt: "Vad gör huvudpersonen på fredagkvällen?",
                        options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                    },
                    {
                        prompt: "Vem träffar han på fredagkvällen?",
                        options: ["En gammal vän", "En hund", "En katt"]
                    }
                ];
                break;

            default:
                text = "level 18 En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                questions = [
                    {
                        prompt: "Vem är huvudpersonen i texten?",
                        options: ["En pojke", "En ung man", "En gammal man"]
                    },
                    {
                        prompt: "Vad gör huvudpersonen på fredagkvällen?",
                        options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                    },
                    {
                        prompt: "Vem träffar han på fredagkvällen?",
                        options: ["En gammal vän", "En hund", "En katt"]
                    }
                ];
                break;
                    }
                    break;
                    default:
                        text = "default case i age En ung man var på väg till sin kompis en fredagkväll. Han bestämde sig för att ta en promenad genom parken på vägen dit. På vägen mötte han en gammal vän som han inte hade sett på länge. De började prata och minnas gamla tider tillsammans. När han kom fram till sin kompis var det sent men han var glad för att ha träffat sin vän igen."
                        questions = [
                            {
                                prompt: "Vem är huvudpersonen i texten?",
                                options: ["En pojke", "En ung man", "En gammal man"]
                            },
                            {
                                prompt: "Vad gör huvudpersonen på fredagkvällen?",
                                options: ["Går hem till sin kompis", "Ute och springer", "Köper läsk och godis"]
                            },
                            {
                                prompt: "Vem träffar han på fredagkvällen?",
                                options: ["En gammal vän", "En hund", "En katt"]
                            }
                        ];
  
    }
    return { text, questions };
}
     

        static getCorrectAnswers(level, age) {
            let correctAnswers;
            level = parseInt(level)
            age = parseInt(age)

            switch(true){
                case (age > 0 && age <= 12):
                    switch (level) {
                        case 1:
                        correctAnswers = {
                        'question-0': 'Att hitta mat',
                        'question-1': 'En hund',
                        'question-2': 'Räven började springa',
                        };
                        break;
                        case 2:
                        correctAnswers = {
                        'question-0': 'Grön',
                        'question-1': 'Utforskar',
                        'question-2': 'Staket',
                       
                        };
                        break;
                        case 3:
                        correctAnswers = {
                        'question-0': 'En pojke',
                        'question-1': 'Går ut för att fiska',
                        'question-2': 'En fisk',
                       
                        };
                        break;
                        case 4:
                        correctAnswers = {
                        'question-0': 'En flicka',
                        'question-1': 'En grotta',
                        'question-2': 'Går in i grottan',
                       
                        };
                        break;
                        case 5:
                        correctAnswers = {
                        'question-0': 'En ung man',
                        'question-1': 'Går hem till sin kompis',
                        'question-2': 'En gammal vän',
                       
                        };
                        
                        break;
                        default:
                        correctAnswers = {
                        'question-0': 'brown',
                        'question-1': 'jumping',
                        'question-2': 'lazy dog',
                        };
                        break;

                            }
                            break;
                            
                case (age > 12 && age <= 15):
                    switch (level) {
                        case 1:
                        correctAnswers = {
                        'question-0': 'Att hitta mat',
                        'question-1': 'En hund',
                        'question-2': 'Räven började springa',
                        };
                        break;
                        case 2:
                        correctAnswers = {
                        'question-0': 'Grön',
                        'question-1': 'Utforskar',
                        'question-2': 'Staket',
                       
                        };
                        break;
                        case 3:
                        correctAnswers = {
                        'question-0': 'En pojke',
                        'question-1': 'Går ut för att fiska',
                        'question-2': 'En fisk',
                       
                        };
                        break;
                        case 4:
                        correctAnswers = {
                        'question-0': 'En flicka',
                        'question-1': 'En grotta',
                        'question-2': 'Går in i grottan',
                       
                        };
                        break;
                        case 5:
                        correctAnswers = {
                        'question-0': 'En ung man',
                        'question-1': 'Går hem till sin kompis',
                        'question-2': 'En gammal vän',
                       
                        };
                        
                        break;
                        default:
                        correctAnswers = {
                        'question-0': 'brown',
                        'question-1': 'jumping',
                        'question-2': 'lazy dog',
                        };
                        break;

                            }
                            break;
                
                case (age > 15 && age <= 18):
                    switch (level) {
                        case 1:
                        correctAnswers = {
                        'question-0': 'Att hitta mat',
                        'question-1': 'En hund',
                        'question-2': 'Räven började springa',
                        };
                        break;
                        case 2:
                        correctAnswers = {
                        'question-0': 'Grön',
                        'question-1': 'Utforskar',
                        'question-2': 'Staket',
                       
                        };
                        break;
                        case 3:
                        correctAnswers = {
                        'question-0': 'En pojke',
                        'question-1': 'Går ut för att fiska',
                        'question-2': 'En fisk',
                       
                        };
                        break;
                        case 4:
                        correctAnswers = {
                        'question-0': 'En flicka',
                        'question-1': 'En grotta',
                        'question-2': 'Går in i grottan',
                       
                        };
                        break;
                        case 5:
                        correctAnswers = {
                        'question-0': 'En ung man',
                        'question-1': 'Går hem till sin kompis',
                        'question-2': 'En gammal vän',
                       
                        };
                        
                        break;
                        default:
                        correctAnswers = {
                        'question-0': 'brown',
                        'question-1': 'jumping',
                        'question-2': 'lazy dog',
                        };
                        break;

                            }
                            break;
                case(age > 18):
                switch (level) {
                    case 1:
                    correctAnswers = {
                    'question-0': 'Att hitta mat',
                    'question-1': 'En hund',
                    'question-2': 'Räven började springa',
                    };
                    break;
                    case 2:
                    correctAnswers = {
                    'question-0': 'Grön',
                    'question-1': 'Utforskar',
                    'question-2': 'Staket',
                   
                    };
                    break;
                    case 3:
                    correctAnswers = {
                    'question-0': 'En pojke',
                    'question-1': 'Går ut för att fiska',
                    'question-2': 'En fisk',
                   
                    };
                    break;
                    case 4:
                    correctAnswers = {
                    'question-0': 'En flicka',
                    'question-1': 'En grotta',
                    'question-2': 'Går in i grottan',
                   
                    };
                    break;
                    case 5:
                    correctAnswers = {
                    'question-0': 'En ung man',
                    'question-1': 'Går hem till sin kompis',
                    'question-2': 'En gammal vän',
                   
                    };
                    
                    break;


                    
                    }
                    break;
                    default:
                        correctAnswers = {
                        'question-0': 'brown',
                        'question-1': 'jumping',
                        'question-2': 'lazy dog',
                        };
                        break;
                            
                    
          }

          return correctAnswers;
    }    



    static getstatisticsInfo(age, wpm){
        let text = [];
        let ordIText;
        let timmarAttLäsaFärdigt;

        age = parseInt(age);
        wpm = parseInt(wpm)

        switch(true){
            case(age > 0 && age <= 12):
                ordIText = 76944;
                timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
                text.push("Genomsnitt ord per minut för din ålder är 100-130.");
                text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. 
                Ifall du läser ${wpm} ord per minut Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`)
                    break;

            case(age > 12 && age < 15):
                ordIText = 99750;
                timmarAttLäsaFärdigt = Math.round((ordIText / wpm) / 60);
                text.push("Genomsnitt ord per minut för din ålder är 130-150.");
                text.push(`Boken Hunger Games: Catching Fire innehåller 99,750 ord. 
                Ifall du läser ${wpm} ord per minut. Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`)               
                    break; 

            case(age >= 15 && age <= 18):
            let gymnasiumBooks = 4500/studyHoursPerBook1;
            let studyHoursPerBook1 = 150;
            let gymnasiumTimetable = Math.round((gymnasiumBooks * 100000) / wpm);
            text.push("Genomsnitt ord per minut för din ålder är 150-180.");
            text.push(`Att genomföra en gymnasial utbildning kräver ungefär 4500 studie timmar.
            Ifall du läser ${wpm} ord per minut, så skulle det ta dig ${gymnasiumTimetable} timmar att läsa ${gymnasiumBooks} läroböcker relaterade till en gymnasial utbildning`)
                break;  

            case(age > 18):
            let studyHoursPerBook = 150;
            let medSchoolHours = 12000
            let medSchoolBooks = medSchoolHours/studyHoursPerBook; 
            let medSchoolTimetable = Math.round((medSchoolBooks * 120000) / wpm);
            text.push("Genomsnitt ord per minut för din ålder är 200-300.");
            text.push(`Att genomföra en medicinsk utbildning kräver ungefär 12000 studie timmar.
            Ifall du läser ${wpm} ord per minut, så skulle det ta dig ${medSchoolTimetable} timmar att läsa 80 läroböcker relaterade till en medicinsk utbildning`)
                break;
            
            default:
                text.push("Genomsnitt ord per minut för din ålder är 100-130.");
                text.push(`Boken Harry Potter och de vises sten innehåller 76,944 ord. 
                Ifall du läser ${wpm} ord per minut Så hade det tagit dig ${timmarAttLäsaFärdigt} timmar att läsa färdigt boken!`)
                 break;
        }
        return text;
    }



 




                    static getUsers(name,lastname,age){
                    const {usersResults} = userDataBase(name,lastname,age)
                    return {userResults}
                    }

                    static addUsersAndResult(name,age,email,lastname,level,percentageCorrect,wpm){
                        this.userDataBase.add(name,age,email,lastname,level,percentageCorrect,wpm)
                        return
                    }

                    
                    
                    
                    
                    static userDataBase(name,age,email,lastname,level,percentageCorrect,wpm){
                    //Here some logic so you can both add users and retrive users result from the database array (users)
                            var a = 0;
                    const users =  
                            [
                            {
                                
                            }
                        ];
                        return users;
                    }




    
}  

module.exports = Database;