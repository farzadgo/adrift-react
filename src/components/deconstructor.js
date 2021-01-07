import { allQuestions } from '../data/questions.js';

export const deconstructor = (inp) => {
    
  const getDest = (arr) => {
    let destArr = [];
    arr.forEach(e => {
      if (e.includes('arrive')) {
        destArr = e.slice(e.indexOf('location:') + 1);
      }
    });
    return destArr.join(' ')
  }

  const getOrgDirs = (arr) => {
    let dirArr = [];
    const args_main = ['head', 'turn', 'slight', 'sharp', 'keep', 'continue'];
    const args_alt = ['take', 'enter', 'exit', 'cross'];
    arr.forEach(e => {
      if (args_main.indexOf(e[1]) !== -1) {
        dirArr.push(e.slice(0, 3));
      }
      else if (args_alt.indexOf(e[1]) !== -1) {
        e = e.slice(0, 2);
        e.push('something');
        dirArr.push(e);
      }
      else if (e[1] === 'arrive') {
        e = e.slice(0, 3);
        e.push(destination);
        dirArr.push(e);
      }
      else {
        e = e.slice(0, 1);
        e.push('sth', 'happens');
        dirArr.push(e);
      }
    });
    const dirStr = dirArr.map(e => e.join(' '));
    return {
      dirArr: dirArr,
      dirStr: dirStr
    }
  }

  const getNewDirs = (arr) => {
    let dirArr = [];
    const arr_ = arr.map(e => [...e]);
    const args_turn = ['turn', 'slight', 'sharp', 'keep'];

    arr_.forEach((e, i) => {

      // HEAD
      if (e[1] === 'head') { 
        let nav;         
        switch(e[2]) {
          case 'northwest':
            nav = 'southeast';
            break;
          case 'north':
            nav = 'south';
            break;
          case 'northeast':
            nav = 'southwest'
            break;
          case 'east':
            nav = 'west';
            break;
          case 'southeast':
            nav = 'northwest';
            break;
          case 'south':
            nav = 'north';
            break;
          case 'southwest':
            nav = 'northeast';
            break;
          case 'west':
            nav = 'east';
            break;
          default:
            nav = 'any directions';
        }
        e.splice(2, 1, nav);
        dirArr = [...dirArr, e];
      }

      // TURN, SLIGHT, SHARP, KEEP
      else if (args_turn.indexOf(e[1]) !== -1) {
        let nav = [e[0], 'turn'];
        let args = ['1st', '2nd','3rd', '4th', '5th'];
        let ordNo = parseInt(e[0]);

        const selector = (arr, int) => {
          int % 2 === 0 ? arr = arr.filter((e, i) => i % 2 === 0) : arr = arr.filter((e, i) => i % 2 === 1);
          let word = arr[Math.floor(Math.random()*arr.length)];
          return word
        }

        if (e[2] === 'left') {
          nav = [...nav, selector(args, ordNo), 'right'];
        } else if (e[2] === 'right') {
          nav = [...nav, selector(args, ordNo), 'left'];
        }

        dirArr = [...dirArr, nav]
      }

      // CONTINUE
      else if (e[1] === 'continue') {
        let action = [e[0], 'cross', 'the', 'street'];
        // action = [...action, 'continue more'];
        dirArr = [...dirArr, action];
      }

      // ARRIVE
      else if (e[1] === 'arrive') {
        let action = [e[0], 'enjoy', 'getting', 'lost'];
        dirArr = [...dirArr, action];
      }

      // OTHER
      else {
        let action = [e[0], 'turn', 'any', 'direction'];
        dirArr = [...dirArr, action];
      }

    });
    const dirStr = dirArr.map(e => e.join(' '));
    return {
      dirArr: dirArr,
      dirStr: dirStr
    }
  }

  const getQuestions = (arr) => {
    
    const randomItem = (items) => {
      let item = items[Math.floor(Math.random() * items.length)];
      return item
    };

    
    let qArr = [];
    let index = allQuestions.length;

    while (index > 0) {
      let newItem = randomItem(allQuestions);
      if (qArr.indexOf(newItem) === -1) {
        qArr.push(newItem);
        index -= 1
      }
    }
    
    let qArr_ = [];
    let dif = arr.length - qArr.length;
    
    if (dif > 0) {
      if (dif > qArr.length) {
        while (dif > qArr.length) {
          qArr_ = [...qArr_, ...qArr];
          dif = arr.length - qArr_.length;
        };
        qArr_ = [...qArr_, ...qArr.slice(0, dif)];
        // console.log(qArr_);
        return qArr_
      } else {
        qArr = [...qArr, ...qArr.slice(0, dif)];
        // console.log(qArr);
        return qArr
      }
    } else if (dif < 0) {
      // console.log('case 2');
      qArr = qArr.slice(0, qArr.length + dif)
      // console.log('case 2', qArr);
      return qArr
    } else {
      return qArr
    }

  }

  
  // DECONSTRUCTING THE DIRECTIONS TEXT
  const allLines = inp.toLowerCase().split('\n').filter(Boolean);
  const allWords = allLines.map(e => e.split(' '));
  const dirWords = allWords.filter(e => e[0] === `${parseInt(e[0])}.`);
    // console.log('Directions Text:', dirWords);

  const destination = getDest(dirWords);
  // console.log('Destination:', destination);

  const orgDirs = getOrgDirs(dirWords);
    // console.log('Simplifed Directions:', orgDirs.dirArr);

  const newDirs = getNewDirs(orgDirs.dirArr);
    // console.log('New Directions:', newDirs.dirArr);

  const questions = getQuestions(orgDirs.dirStr);
  // console.log('Questions:', questions);
  
  return {
    destination: destination,
    orgDirs: orgDirs.dirStr,
    newDirs: newDirs.dirStr,
    questions: questions,
  }
}