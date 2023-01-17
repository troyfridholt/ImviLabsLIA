class Database {
    static getTextAndQuestions(level) {
        let text;
        let questions;
        switch (level) {
            case 1:
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
            case 2:
                text = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.";
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
                    },
                    {
                        prompt: "What is the subject of the sentence?",
                        options: ["fox", "dog", "quick"]
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
            switch (level) {
            case 1:
            correctAnswers = {
            'question-0': 'brown',
            'question-1': 'jumping',
            'question-2': 'lazy dog',
            };
            break;
            case 2:
            correctAnswers = {
            'question-0': 'brown',
            'question-1': 'jumping',
            'question-2': 'lazy dog',
            'question-3': 'fox'
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