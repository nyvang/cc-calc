
/**
 *  **** Languages.js ****
 * Contains localization specific strings for the CC Calculator.
 * Usage: The custom AngularJS service 'systemLanguage' decides which 
 * language the specific browser uses, and loads the coresponding localized resource object.
 *
 * Author       :   Nicolaj Nyvanng
 * Web          :   http://ccnn.dk
 * Contact      :   nicolajnyvang@gmail.com
 * Project URL  :   https://github.com/nyvang/cc-calc
 */

// Init
var resources = [];

    // English/US language strings (default values)
    resources['en-us'] = {
        "acc": {
            "name": "Accomplice",
            "none": "NO Chance!",
            "low": "Low Chance!",
            "medium": "Medium Chance!",
            "good": "You are epic!"
        },
        "kp": {
            "name": "Kingpin Power",
            "none": "Acc makes up for your KP",
            "low": "Low -> medium chance. You should stick to Acc only.",
            "medium": "Medium Chance! ",
            "good": "You are KP epic!",
            "highkp": "High Kp, please consider moving some points to Acc if possible",
            "veryhighkp": "Very high Kp, Move points to Acc. Your chances are decided by your target."
        },
        "wow": {
            "kpwarning": "Your KP is higher than your Acc, which in most cases won´t help you at all",
            "accwarn_1": "Your Acc is only: ",
            "accwarn_2": "and to have a medium chance, you should have at least:",
            "wow1": "The Accomplish system has been live for ",
            "wow2": " weeks now,",
            "wow3": "and your stats are rather low.",
            "wow4": "To preform successfull robbing, attacking (Wars included), you really have to shape up."
        }
    };

    // Danish language strings
    resources['da'] = {
        "acc": {
            "name": "Accomplice",
            "none": "Ingen chance!",
            "low": "Lav chance!",
            "medium": "Medium chance!",
            "good": "Sådan! Du styrer det show her!"
        },
        "kp": {
            "name": "Kingpin Power",
            "none": "Acc dækker over de manglende KP",
            "low": "Lav -> mellem chance. Overvej kun at opbygge Acc istedet for KP.",
            "medium": "Mellem chance! ",
            "good": "Sådan! Total i orden!",
            "highkp": "Høj KP, overvej at flytte nogle point til Acc istedet",
            "veryhighkp": "Meget høj KP, flyt points til Acc. Dine vinderchancer er ude af dine hænder."
        },
        "wow": {
            "kpwarning": "Dine KP er højere end dit Acc, dette er sjældent en god ide",
            "accwarn_1": "Dine Acc er kun: ",
            "accwarn_2": ". For blot at have em mellem chance skal du have mindst:",
            "wow1": "Accomplish versionen har været ude i ",
            "wow2": " uger nu,",
            "wow3": "og dine point er noget lave.",
            "wow4": "For at kunne vinde røverier, angreb (Events inkluderede), skal du stramme dig mere an."
        }
    };