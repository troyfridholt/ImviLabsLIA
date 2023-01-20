class Database {

    static getTextAndQuestions(level) {
        let text;
        let questions;
        level = parseInt(level)
        switch (level) {
            case 1:
                text = "En dag gick en snabb och smidig brun räv genom skogen. Räven var alltid på jakt efter något att äta och denna dag var ingen annorlunda. Plötsligt såg han en lat hund som låg och sov vid en bäck. Räven kände genast att han ville ha hunden till lunch. Han började smyga sig närmare och närmare tills han var bara några meter bort. Men precis när han skulle hoppa på hunden, så vaknade hunden och började skälla högt. Räven ryckte till och började springa så fort han kunde, hoppade över bäcken och fortsatte att springa tills han var utom synhåll av hunden. Han var glad över att ha undkommit fara, men besviken på att hans plan hade misslyckats.";
                questions = [            {                prompt: "Vad var rävens syfte?",                options: ["Att hitta mat", "Att sova", "Att promenera"]
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
                    text = "Det var en gång en snabb grön räv som sprang genom skogen. Räven var alltid på jakt efter nya äventyr och den här dagen var inget undantag. Plötsligt såg han ett staket som markerade gränsen till ett annat område. Räven började springa mot staketet och precis när han nådde det hoppade han högt upp i luften och landade på andra sidan. Han fortsatte att springa genom det nya området, utforskande och nyfiken över allt han kom över.";
                    questions = [        {            prompt: "Vilken färg hade räven?",            options: ["Röd", "Grön", "Brun"]
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
    questions = [        {            prompt: "Vem är huvudpersonen i texten?",            options: ["En pojke", "En flicka", "En gammal man"]
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
                text = "The quick brown fox jumps over the lazy dog.";
                questions = [
                    {
                        prompt: "What color is the fox?",
                        options: ["red", "green", "brown"]
                    },
                    {
                        prompt: "What is the fox doing?",
                        options: ["sleeping", "jumping", "running"]
                    },
                    {
                        prompt: "What is the fox jumping over?",
                        options: ["wall", "lazy dog", "fence"]
                    }
                ];
                break;
                }
            return { text, questions };
            }
        

        static getCorrectAnswers(level) {
            let correctAnswers;
            level = parseInt(level)
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
            return correctAnswers;
            }

}    

module.exports = Database;