const regName1 = new RegExp('^[a-zA-ZäöüßÄÖÜ]+$');
const regName2 = new RegExp('^[A-Za-zÄäÜüÖöß\\s]+$');
const regName3 = new RegExp('^(?!.* {2})[A-Za-zÄäÜüÖöß\\s]+$');
const regName4 = new RegExp('^(?!.* {2})[a-zA-Z][a-zA-Z]*([ ]+[a-zA-Z][a-zA-Z]*)+$');
const regPhone1 = new RegExp('^[0-9+]+$');
const regPhone2 = new RegExp('^[0-9+][0-9\\s]*$');
const regPhone3 = new RegExp('^(?!.* {2})[0-9+][0-9\\s]*$');
const regPhone4 = regPhone3;
const regEmail= new RegExp(`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`);
let contacts = [
    {
        'id' : 0,
        'name' : 'Salazar Slytherin',
        'email' : 'onlyreinblüter@web.de',
        'phone' : '6666 666666',
        'color' : 'rgb(78, 150, 61)'
    },
    {
        'id' : 1,
        'name' : 'Philipp Grabowski',
        'email' : 'swmmcboss90@web.de',
        'phone' : '0152 28166705',
        'color' : 'rgb(31, 215, 193)'
    },
    {
        'id' : 2,
        'name' : 'Tyrion Lennister',
        'email' : 'halbmann@gmail.de',
        'phone' : '02125 456121',
        'color' : 'rgb(1, 144, 224)'
    },
    {
        'id' : 3,
        'name' : 'Kilian Georgiew',
        'email' : 'kilian.georgiew@gmail.com',
        'phone' : '0172 1818181',
        'color' : 'rgb(252, 113, 255)'
    },
    {
        'id' : 4,
        'name' : 'Heidi Klum',
        'email' : 'gntm2023@gmx.de',
        'phone' : '0190 767676',
        'color' : 'rgb(147, 39, 255)'
    },
    {
        'id' : 5,
        'name' : 'Anton Mayer',
        'email' : 'antom@gmail.com',
        'phone' : '0111 1111111',
        'color' : 'rgb(255, 122, 0)'
    },
    {
        'id' : 6,
        'name' : 'Anja Schulz',
        'email' : 'schulz@hotmail.com',
        'phone' : '0174 5559283',
        'color' : 'rgb(78, 189, 161)'
    },
    {
        'id' : 7,
        'name' : 'Benedikt Ziegler',
        'email' : 'benedikt@gmail.com',
        'phone' : '0174 4395982',
        'color' : 'rgb(202, 117, 96)'
    },
    {
        'id' : 8,
        'name' : 'Leo Albert',
        'email' : 'fischa96@web.de',
        'phone' : '0162 4377721',
        'color' : 'rgb(174, 60, 33)'
    },
    {
        'id' : 9,
        'name' : 'Yvonne Claire',
        'email' : 'claireyv@t-online.de',
        'phone' : '0174 4395982',
        'color' : 'rgb(124, 141, 233)'
    }
];
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let contactInputs = [
    {
        'inputID' : 'contactNameInput',
        'inputlenght' : 2,
        'regex' : [regName1, regName2, regName3, regName4],
        'errorReportID' : 'nameError',
        'errorReportText' : ['error: first char must be a letter', 'error: only letters excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid firstname (secondname) lastname'
    },
    {
        'inputID' : 'contactEmailInput',
        'inputlenght' : 7,
        'regex' : [regEmail],
        'errorReportID' : 'emailError',
        'errorReportText' : ['error: email is not valid'],
        'validReportText' : 'valid email'
    },
    {
        'inputID' : 'contactPhoneInput',
        'inputlenght' : 9,
        'regex' : [regPhone1, regPhone2, regPhone3, regPhone4],
        'errorReportID' : 'phoneError',
        'errorReportText' : ['error: first char must be a number or +', 'error: only numbers excepted', 'error: spaces in row are not excepted'],
        'validReportText' : 'valid phone number'
    }
];
let errorReports = ['nameError', 'emailError', 'phoneError'];