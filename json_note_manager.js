'use strict';
const fs = require('fs');
let store = JSON.parse(fs.readFileSync('store.json'));
let list = store.list;

if (process.argv[2]) {
    let command = process.argv.slice(2);
    console.log(command);
    switch (command[0]) {
        case 'list':
            console.log('printing ' + list.length + ' note(s)');
            list.map(el => {console.log('--');console.log('title: '+el.title);console.log('body: '+el.body);});
            break;
        case 'add':
            if (command[1]) {
                let note = {}
                if ((command[1] === '--title' || command[1] === '-t') && command[2]) {
                    note = { title: command[2] }
                    if ((command[3] === '--body' || command[3] === '-b') && command[4]) {
                        note = { ...note, body: command[4] };
                        list = [...list, note];
                        store = {...store, list};
                        fs.writeFileSync('store.json', JSON.stringify(store));
                    } else { console.log('incorrect command line: body command is missing') }
                } else { console.log('incorrect command line: title command is missing') }
            } else {
                console.log('options:');
                console.log('    --help         Show help           [boolean]');
                console.log('    --title, -t    Title of note       [required]');
                console.log('    --body, -b     Body of note        [required]');
                console.log();
                console.log('missing required arguments: title, body !!');
            }
            break;
        case 'read':
            if (command[1]) {
                if ((command[1] === '--title' || command[1] === '-t') && command[2]) {
                    let search = list.filter(el => el.title === command[2]);
                    console.log(search ? search : 'not found');
                } else { console.log('incorrect command line: title command (or content) is missing') }
            } else {
                console.log('options:');
                console.log('    --help         Show help           [boolean]');
                console.log('    --title, -t    Title of note       [required]');
                console.log();
                console.log('missing required arguments: title !!');
            }
            break;
        case 'remove':
            if (command[1]) {
                if ((command[1] === '--title' || command[1] === '-t') && command[2]) {
                    list = list.filter(el => el.title !== command[2]);
                    store = {...store, list};                    
                    fs.writeFileSync('store.json', JSON.stringify(store));
                    console.log('note removed');
                } else { console.log('incorrect command line: title command (or content) is missing') }
            } else {
                console.log('options:');
                console.log('    --help         Show help           [boolean]');
                console.log('    --title, -t    Title of note       [required]');
                console.log();
                console.log('missing required arguments: title !!');
            }
            break;
        default: console.log('pleese enter a valid command: list, add, read or remove')
    }
} else console.log('please enter a command')